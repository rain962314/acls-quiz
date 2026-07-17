// 批次建立學員帳號（Firebase Auth + Realtime Database 基本資料）。
// 只能在自己電腦上執行，需要 serviceAccountKey.json（絕對不能提交到 git / 放到網站上）。
//
// 用法：
//   node bulk_create_students.js roster_taichung.json
//
// roster JSON 格式（parse_beclass_xlsx.js 的輸出，或手動撰寫）：
//   [{ name, email, birthday, phone, org, title, password }, ...]
//
// 行為：
//   - email 已存在的帳號會略過建立帳號，但仍會更新 Realtime Database 裡的基本資料。
//   - 新帳號會設定 mustChangePassword: true，強制學員第一次登入後必須改密碼。
//   - firstLoginAt 留空，由網站在學員第一次登入時自動寫入（起算 30 天使用期限）。

const fs = require('fs');
const path = require('path');

const rosterPath = process.argv[2];
if (!rosterPath) {
  console.error('用法：node bulk_create_students.js <roster.json>');
  process.exit(1);
}

const keyPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(keyPath)) {
  console.error('找不到 admin-tools/serviceAccountKey.json');
  console.error('請到 Firebase Console → 專案設定 → Service accounts → Generate new private key，');
  console.error('把下載的檔案改名為 serviceAccountKey.json 放在 admin-tools/ 資料夾下（此檔案已加入 .gitignore，不會被提交）。');
  process.exit(1);
}

let admin;
try {
  admin = require('firebase-admin');
} catch (e) {
  console.error('缺少 firebase-admin 套件，請先在 admin-tools/ 資料夾執行：npm install firebase-admin');
  process.exit(1);
}

const serviceAccount = require(keyPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tpimda-acls-quiz-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

const auth = admin.auth();
const db = admin.database();

const roster = JSON.parse(fs.readFileSync(rosterPath, 'utf8'));

async function upsertStudent(entry) {
  const { name, email, birthday, phone, org, title, password } = entry;
  if (!email || !password) {
    console.log(`[略過] ${name || '(無姓名)'}：缺少 email 或密碼`);
    return;
  }

  let userRecord;
  let isNew = false;
  try {
    userRecord = await auth.getUserByEmail(email);
    console.log(`[已存在] ${name} <${email}>，只更新基本資料，不動密碼`);
  } catch (e) {
    if (e.code !== 'auth/user-not-found') throw e;
    userRecord = await auth.createUser({ email, password, displayName: name });
    isNew = true;
    console.log(`[已建立] ${name} <${email}>`);
  }

  const profileUpdate = { name, email, phone: phone || '', birthday: birthday || '', org: org || '', title: title || '' };
  if (isNew) profileUpdate.mustChangePassword = true;

  await db.ref('students/' + userRecord.uid).update(profileUpdate);
}

(async () => {
  let ok = 0, fail = 0;
  for (const entry of roster) {
    try {
      await upsertStudent(entry);
      ok++;
    } catch (e) {
      fail++;
      console.error(`[失敗] ${entry.name} <${entry.email}>：${e.message}`);
    }
  }
  console.log(`\n完成。成功 ${ok} 筆，失敗 ${fail} 筆。`);
  process.exit(0);
})();
