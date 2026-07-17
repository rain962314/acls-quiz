// 將 Beclass 匯出的報名 Excel（標準格式）轉成學員名單 JSON。
// 用法：node parse_beclass_xlsx.js "<Beclass 匯出的 .xlsx 路徑>" > roster.json
//
// 只依賴 Windows 內建的 PowerShell（用來解壓 .xlsx 這個 zip 容器）與 Node 內建模組，
// 不需要額外安裝任何 npm 套件。
//
// 預期的 Beclass 標準欄位（依表頭文字比對，不依賴欄位順序）：
//   姓名 / Email / 出生年 / 月 / 日 / 行動電話 / 目前工作單位或學校年級 / 身份

const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const xlsxPath = process.argv[2];
if (!xlsxPath) {
  console.error('用法：node parse_beclass_xlsx.js "<xlsx路徑>"');
  process.exit(1);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'beclass-'));
const sheetOut = path.join(tmpDir, 'sheet1.xml');
const stringsOut = path.join(tmpDir, 'sharedStrings.xml');

const psScript = `
$path = '${xlsxPath.replace(/'/g, "''")}'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($path)
foreach($name in @('xl/worksheets/sheet1.xml','xl/sharedStrings.xml')){
  $entry = $zip.GetEntry($name)
  $dest = if($name -like '*sharedStrings*'){'${stringsOut.replace(/\\/g, '\\\\')}'} else {'${sheetOut.replace(/\\/g, '\\\\')}'}
  if($entry){ [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $dest, $true) }
}
$zip.Dispose()
`;
execFileSync('powershell.exe', ['-NoProfile', '-Command', psScript]);

function parseSharedStrings(xml) {
  const strs = [];
  const siRe = /<si>([\s\S]*?)<\/si>/g;
  let m;
  while ((m = siRe.exec(xml))) {
    const texts = [...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(x => x[1]);
    strs.push(decodeXml(texts.join('')));
  }
  return strs;
}
function decodeXml(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'").replace(/&amp;/g, '&');
}
function parseSheet(xml, sharedStrings) {
  const rows = [];
  const rowRe = /<row[^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g;
  let rm;
  while ((rm = rowRe.exec(xml))) {
    const cellRe = /<c[^>]*r="([A-Z]+)\d+"[^>]*?(?:\st="([a-z]+)")?[^>]*>(?:<v>([^<]*)<\/v>)?(?:<is><t[^>]*>([^<]*)<\/t><\/is>)?<\/c>/g;
    let cm;
    const row = {};
    while ((cm = cellRe.exec(rm[2]))) {
      const [, col, type, val, inlineStr] = cm;
      let value = val;
      if (type === 's' && val !== undefined) value = sharedStrings[parseInt(val, 10)];
      else if (inlineStr !== undefined) value = decodeXml(inlineStr);
      else if (value !== undefined) value = decodeXml(value);
      row[col] = value;
    }
    rows.push(row);
  }
  return rows;
}

const sharedStrings = parseSharedStrings(fs.readFileSync(stringsOut, 'utf8'));
const rows = parseSheet(fs.readFileSync(sheetOut, 'utf8'), sharedStrings);
fs.rmSync(tmpDir, { recursive: true, force: true });

if (rows.length < 2) {
  console.error('讀不到資料列，請確認檔案是 Beclass 匯出的標準 .xlsx');
  process.exit(1);
}

// 依表頭文字找欄位代號（例如 "姓名" 對應到 "E" 欄），不依賴固定欄位順序。
const header = rows[0];
function findCol(label) {
  for (const col in header) {
    if (header[col] === label) return col;
  }
  return null;
}
const colName = findCol('姓名');
const colEmail = findCol('Email');
const colYear = findCol('出生年');
const colMonth = findCol('月');
const colDay = findCol('日');
const colPhone = findCol('行動電話');
const colOrg = findCol('目前工作單位或學校年級');
const colRole = findCol('身份');

const missing = [];
if (!colName) missing.push('姓名');
if (!colEmail) missing.push('Email');
if (!colYear || !colMonth || !colDay) missing.push('出生年/月/日');
if (!colPhone) missing.push('行動電話');
if (missing.length) {
  console.error('這份 Excel 缺少必要欄位：' + missing.join('、') + '，請確認是 Beclass 標準匯出格式。');
  process.exit(1);
}

function cleanTitle(role) {
  if (!role) return '';
  return role
    .replace(/\s*[（(][^）)]*[）)]\s*$/, '')
    .replace(/^\[其它\]/, '')
    .trim();
}
function pad2(n) { return String(n).padStart(2, '0'); }

const roster = rows.slice(1)
  .filter(r => r[colName] && r[colEmail])
  .map(r => {
    const year = r[colYear], month = r[colMonth], day = r[colDay];
    const birthday = year ? `${year}-${pad2(month)}-${pad2(day)}` : '';
    const phone = (r[colPhone] || '').trim();
    const mmdd = month && day ? pad2(month) + pad2(day) : '';
    const phoneLast4 = phone.replace(/\D/g, '').slice(-4);
    return {
      name: r[colName],
      email: r[colEmail].trim(),
      birthday,
      phone,
      org: colOrg ? (r[colOrg] || '') : '',
      title: colRole ? cleanTitle(r[colRole]) : '',
      password: mmdd + phoneLast4 // 預設密碼：生日 MMDD ＋ 手機末4碼
    };
  });

console.log(JSON.stringify(roster, null, 2));
