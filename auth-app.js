import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  updatePassword, EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getDatabase, ref, get, update, push, remove
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const app = initializeApp(window.FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getDatabase(app);

const ACCESS_DAYS = 30; // 學員自第一次登入起算的使用期限（天）

const $ = (id) => document.getElementById(id);

const screens = {
  authScreen: $('auth-screen'),
  forcePwScreen: $('force-pw-screen'),
  userBar: $('user-bar'),
  profileScreen: $('profile-screen'),
  changePwScreen: $('change-pw-screen'),
  historyScreen: $('history-screen'),
  wrongbookScreen: $('wrongbook-screen'),
  setupScreen: $('setup-screen'),
  quizScreen: $('quiz-screen'),
  resultScreen: $('result-screen')
};
const platformCredit = $('platform-credit');

let currentProfile = null; // cached profile data for the logged-in student

function hide(el){ el.classList.add('hidden'); }
function show(el){ el.classList.remove('hidden'); }

function showLoggedOutState(){
  hide(screens.forcePwScreen);
  hide(screens.userBar);
  hide(screens.profileScreen);
  hide(screens.changePwScreen);
  hide(screens.historyScreen);
  hide(screens.wrongbookScreen);
  hide(screens.setupScreen);
  hide(screens.quizScreen);
  hide(screens.resultScreen);
  hide(platformCredit);
  show(screens.authScreen);
}

function showMainApp(){
  hide(screens.authScreen);
  hide(screens.forcePwScreen);
  hide(screens.profileScreen);
  hide(screens.changePwScreen);
  hide(screens.historyScreen);
  hide(screens.wrongbookScreen);
  hide(screens.quizScreen);
  hide(screens.resultScreen);
  show(screens.userBar);
  show(platformCredit);
  show(screens.setupScreen);
  $('user-bar-name').textContent = '歡迎，' + (currentProfile && currentProfile.name ? currentProfile.name : auth.currentUser.email);
}

function setError(id, msg){
  const el = $(id);
  if(msg){ el.textContent = msg; el.classList.add('show'); }
  else { el.textContent = ''; el.classList.remove('show'); }
}
function setSuccess(id, msg){
  const el = $(id);
  if(msg){ el.textContent = msg; el.classList.add('show'); }
  else { el.textContent = ''; el.classList.remove('show'); }
}

function friendlyAuthError(err){
  const code = err && err.code;
  if(code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found'){
    return '帳號或密碼錯誤，請確認後再試一次。忘記密碼請點下方連結重設。';
  }
  if(code === 'auth/too-many-requests'){
    return '嘗試次數過多，請稍後再試。';
  }
  if(code === 'auth/invalid-email'){
    return 'Email 格式不正確。';
  }
  return '登入時發生問題（' + code + '），請稍後再試或聯絡協會。';
}

async function loadProfile(uid){
  const snap = await get(ref(db, 'students/' + uid));
  return snap.exists() ? snap.val() : null;
}

function fillProfileForm(profile){
  $('profile-name').value = profile.name || '';
  $('profile-email').value = auth.currentUser.email || '';
  $('profile-phone').value = profile.phone || '';
  $('profile-birthday').value = profile.birthday || '';
  $('profile-org').value = profile.org || '';
  $('profile-title').value = profile.title || '';
  $('profile-cert-expiry').value = profile.certExpiry || '';
}

function formatDate(ts){
  if(!ts) return '';
  const d = new Date(ts);
  return d.getFullYear() + '/' + String(d.getMonth()+1).padStart(2,'0') + '/' + String(d.getDate()).padStart(2,'0');
}

// ---------- Auth state ----------
onAuthStateChanged(auth, async (user) => {
  if(!user){
    currentProfile = null;
    showLoggedOutState();
    return;
  }
  let profile;
  try{
    profile = await loadProfile(user.uid);
  } catch(e){
    setError('login-error', '讀取資料時發生問題，請稍後再試。');
    await signOut(auth);
    return;
  }
  if(!profile){
    setError('login-error', '找不到你的基本資料，請聯絡協會確認帳號是否已建立。');
    await signOut(auth);
    return;
  }

  // First-login timestamp starts the 30-day access window.
  if(!profile.firstLoginAt){
    const now = Date.now();
    try{ await update(ref(db, 'students/' + user.uid), { firstLoginAt: now }); }catch(e){ /* non-fatal */ }
    profile.firstLoginAt = now;
  }
  const expiresAt = profile.firstLoginAt + ACCESS_DAYS*24*60*60*1000;
  if(Date.now() > expiresAt){
    setError('login-error', '此帳號使用期限已於 ' + formatDate(expiresAt) + ' 到期，如需延長使用請聯絡協會。');
    await signOut(auth);
    return;
  }

  currentProfile = profile;
  if(profile.mustChangePassword){
    hide(screens.authScreen);
    hide(screens.userBar);
    hide(platformCredit);
    show(screens.forcePwScreen);
    return;
  }
  showMainApp();
});

// ---------- Login ----------
$('login-btn').addEventListener('click', async () => {
  setError('login-error', '');
  const email = $('login-email').value.trim();
  const password = $('login-password').value;
  if(!email || !password){
    setError('login-error', '請輸入 Email 與密碼。');
    return;
  }
  try{
    await signInWithEmailAndPassword(auth, email, password);
    $('login-password').value = '';
  } catch(err){
    setError('login-error', friendlyAuthError(err));
  }
});
$('login-password').addEventListener('keydown', (e)=>{ if(e.key==='Enter') $('login-btn').click(); });

// ---------- Forgot password ----------
$('forgot-pw-link').addEventListener('click', () => {
  setError('forgot-pw-error', ''); setSuccess('forgot-pw-success', '');
  $('forgot-pw-email').value = $('login-email').value.trim();
  show($('forgot-pw-box'));
});
$('forgot-pw-cancel').addEventListener('click', () => {
  hide($('forgot-pw-box'));
});
$('forgot-pw-submit').addEventListener('click', async () => {
  setError('forgot-pw-error', ''); setSuccess('forgot-pw-success', '');
  const email = $('forgot-pw-email').value.trim();
  if(!email){ setError('forgot-pw-error', '請輸入 Email。'); return; }
  try{
    await sendPasswordResetEmail(auth, email);
    setSuccess('forgot-pw-success', '已寄出重設密碼信件，請至信箱查收並點擊連結設定新密碼（請留意垃圾郵件匣）。');
  } catch(err){
    setError('forgot-pw-error', friendlyAuthError(err));
  }
});

// ---------- Forced password change (first login) ----------
$('force-pw-submit').addEventListener('click', async () => {
  setError('force-pw-error', '');
  const pw1 = $('force-pw-new').value;
  const pw2 = $('force-pw-confirm').value;
  if(pw1.length < 8){ setError('force-pw-error', '新密碼至少需要 8 碼。'); return; }
  if(pw1 !== pw2){ setError('force-pw-error', '兩次輸入的新密碼不一致。'); return; }
  try{
    await updatePassword(auth.currentUser, pw1);
    await update(ref(db, 'students/' + auth.currentUser.uid), { mustChangePassword: false });
    currentProfile.mustChangePassword = false;
    $('force-pw-new').value = '';
    $('force-pw-confirm').value = '';
    showMainApp();
  } catch(err){
    if(err.code === 'auth/requires-recent-login'){
      setError('force-pw-error', '登入時間較久，請重新登入一次後再設定新密碼。');
      await signOut(auth);
    } else {
      setError('force-pw-error', '設定密碼失敗，請稍後再試。');
    }
  }
});

// ---------- Profile screen ----------
$('open-profile-link').addEventListener('click', async () => {
  setSuccess('profile-success', '');
  setError('profile-error', '');
  try{
    const profile = await loadProfile(auth.currentUser.uid);
    currentProfile = profile || {};
  } catch(e){ /* fall back to cached profile */ }
  fillProfileForm(currentProfile || {});
  hide(screens.setupScreen); hide(screens.quizScreen); hide(screens.resultScreen);
  show(screens.profileScreen);
});

$('profile-save-btn').addEventListener('click', async () => {
  setError('profile-error', ''); setSuccess('profile-success', '');
  const updates = {
    name: $('profile-name').value.trim(),
    phone: $('profile-phone').value.trim(),
    birthday: $('profile-birthday').value,
    org: $('profile-org').value.trim(),
    title: $('profile-title').value.trim(),
    certExpiry: $('profile-cert-expiry').value
  };
  try{
    await update(ref(db, 'students/' + auth.currentUser.uid), updates);
    currentProfile = Object.assign({}, currentProfile, updates);
    setSuccess('profile-success', '已儲存。');
  } catch(err){
    setError('profile-error', '儲存失敗，請稍後再試。');
  }
});

$('profile-back-btn').addEventListener('click', () => {
  hide(screens.profileScreen);
  show(screens.setupScreen);
});

// ---------- Voluntary change password ----------
$('open-changepw-link').addEventListener('click', () => {
  setError('change-pw-error', ''); setSuccess('change-pw-success', '');
  $('change-pw-current').value = '';
  $('change-pw-new').value = '';
  $('change-pw-confirm').value = '';
  hide(screens.setupScreen); hide(screens.quizScreen); hide(screens.resultScreen);
  show(screens.changePwScreen);
});

$('change-pw-back-btn').addEventListener('click', () => {
  hide(screens.changePwScreen);
  show(screens.setupScreen);
});

$('change-pw-submit').addEventListener('click', async () => {
  setError('change-pw-error', ''); setSuccess('change-pw-success', '');
  const current = $('change-pw-current').value;
  const pw1 = $('change-pw-new').value;
  const pw2 = $('change-pw-confirm').value;
  if(!current){ setError('change-pw-error', '請輸入目前密碼。'); return; }
  if(pw1.length < 8){ setError('change-pw-error', '新密碼至少需要 8 碼。'); return; }
  if(pw1 !== pw2){ setError('change-pw-error', '兩次輸入的新密碼不一致。'); return; }
  try{
    const cred = EmailAuthProvider.credential(auth.currentUser.email, current);
    await reauthenticateWithCredential(auth.currentUser, cred);
    await updatePassword(auth.currentUser, pw1);
    setSuccess('change-pw-success', '密碼已更新。');
    $('change-pw-current').value = '';
    $('change-pw-new').value = '';
    $('change-pw-confirm').value = '';
  } catch(err){
    if(err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'){
      setError('change-pw-error', '目前密碼不正確。');
    } else {
      setError('change-pw-error', '更新密碼失敗，請稍後再試。');
    }
  }
});

// ---------- Score history ----------
const MODE_LABEL = { practice: '練習模式', exam: '模擬考模式' };

$('open-history-link').addEventListener('click', async () => {
  hide(screens.setupScreen); hide(screens.quizScreen); hide(screens.resultScreen);
  show(screens.historyScreen);
  const listEl = $('history-list');
  const emptyEl = $('history-empty');
  listEl.innerHTML = '載入中…';
  try{
    const snap = await get(ref(db, 'students/' + auth.currentUser.uid + '/history'));
    if(!snap.exists()){
      listEl.innerHTML = '';
      show(emptyEl);
      return;
    }
    hide(emptyEl);
    const entries = [];
    snap.forEach(child => { entries.push(child.val()); });
    entries.sort((a,b) => (b.ts||0) - (a.ts||0));
    listEl.innerHTML = entries.map(e => {
      return '<div class="wq"><div class="q">' + formatDate(e.ts) + '　' + (MODE_LABEL[e.mode] || e.mode) + '</div>' +
        '<div class="ans">得分：<strong>' + e.pct + '%</strong>　（答對 ' + e.correct + ' / ' + e.total + ' 題）</div></div>';
    }).join('');
  } catch(err){
    listEl.innerHTML = '';
    emptyEl.textContent = '讀取成績紀錄時發生問題，請稍後再試。';
    show(emptyEl);
  }
});

$('history-back-btn').addEventListener('click', () => {
  hide(screens.historyScreen);
  show(screens.setupScreen);
});

// ---------- Wrong question notebook ----------
$('open-wrongbook-link').addEventListener('click', async () => {
  hide(screens.setupScreen); hide(screens.quizScreen); hide(screens.resultScreen);
  show(screens.wrongbookScreen);
  const listEl = $('wrongbook-list');
  const emptyEl = $('wrongbook-empty');
  const practiceBtn = $('wrongbook-practice-btn');
  listEl.innerHTML = '載入中…';
  practiceBtn.disabled = true;
  try{
    const snap = await get(ref(db, 'students/' + auth.currentUser.uid + '/wrongQuestions'));
    if(!snap.exists()){
      listEl.innerHTML = '';
      show(emptyEl);
      wrongbookQuestionIds = [];
      return;
    }
    hide(emptyEl);
    const ids = Object.keys(snap.val()).map(s => parseInt(s, 10));
    const questions = ids.map(id => window.ACLS_QUESTIONS.find(q => q.id === id)).filter(Boolean);
    wrongbookQuestionIds = questions.map(q => q.id);
    if(questions.length === 0){
      show(emptyEl);
      listEl.innerHTML = '';
      return;
    }
    practiceBtn.disabled = false;
    listEl.innerHTML = questions.map(q => {
      return '<div class="wq"><div class="q">' + q.question + '</div>' +
        '<div class="ans">正確答案：<span class="correct-ans">' + q.answer + '. ' + q.options[q.answer] + '</span></div>' +
        '<div class="ans" style="color:var(--muted);">' + q.explanation + '</div></div>';
    }).join('');
  } catch(err){
    listEl.innerHTML = '';
    emptyEl.textContent = '讀取錯題本時發生問題，請稍後再試。';
    show(emptyEl);
  }
});

let wrongbookQuestionIds = [];

$('wrongbook-practice-btn').addEventListener('click', () => {
  if(wrongbookQuestionIds.length === 0) return;
  const questions = wrongbookQuestionIds.map(id => window.ACLS_QUESTIONS.find(q => q.id === id)).filter(Boolean);
  hide(screens.wrongbookScreen);
  if(typeof window.ACLS_startWithQuestions === 'function'){
    window.ACLS_startWithQuestions(questions);
  }
});

$('wrongbook-back-btn').addEventListener('click', () => {
  hide(screens.wrongbookScreen);
  show(screens.setupScreen);
});

// ---------- Persist quiz results (called from the quiz app in index.html) ----------
window.ACLS_onQuizComplete = async function(result){
  const uid = auth.currentUser && auth.currentUser.uid;
  if(!uid) return;
  try{
    await push(ref(db, 'students/' + uid + '/history'), {
      ts: Date.now(),
      mode: result.mode,
      total: result.total,
      correct: result.correct,
      pct: result.pct
    });
    const updates = {};
    result.userAnswers.forEach(a => {
      if(a.correct){
        updates['wrongQuestions/' + a.id] = null; // resolved -> remove from notebook
      } else {
        updates['wrongQuestions/' + a.id] = { ts: Date.now() };
      }
    });
    if(Object.keys(updates).length){
      await update(ref(db, 'students/' + uid), updates);
    }
  } catch(err){
    // Non-fatal: quiz result UI already shown to the student regardless of persistence.
    console.error('Failed to save quiz result', err);
  }
};

// ---------- Logout ----------
$('logout-link').addEventListener('click', async () => {
  await signOut(auth);
  $('login-email').value = '';
  $('login-password').value = '';
});
