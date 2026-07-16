import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  updatePassword, EmailAuthProvider, reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getDatabase, ref, get, update
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const app = initializeApp(window.FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getDatabase(app);

const $ = (id) => document.getElementById(id);

const screens = {
  authScreen: $('auth-screen'),
  forcePwScreen: $('force-pw-screen'),
  userBar: $('user-bar'),
  profileScreen: $('profile-screen'),
  changePwScreen: $('change-pw-screen'),
  setupScreen: $('setup-screen'),
  quizScreen: $('quiz-screen'),
  resultScreen: $('result-screen')
};

let currentProfile = null; // cached profile data for the logged-in student

function hide(el){ el.classList.add('hidden'); }
function show(el){ el.classList.remove('hidden'); }

function showLoggedOutState(){
  hide(screens.forcePwScreen);
  hide(screens.userBar);
  hide(screens.profileScreen);
  hide(screens.changePwScreen);
  hide(screens.setupScreen);
  hide(screens.quizScreen);
  hide(screens.resultScreen);
  show(screens.authScreen);
}

function showMainApp(){
  hide(screens.authScreen);
  hide(screens.forcePwScreen);
  hide(screens.profileScreen);
  hide(screens.changePwScreen);
  hide(screens.quizScreen);
  hide(screens.resultScreen);
  show(screens.userBar);
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
    return '帳號或密碼錯誤，請確認後再試一次。忘記密碼請聯絡協會協助重設。';
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
  currentProfile = profile;
  if(profile.mustChangePassword){
    hide(screens.authScreen);
    hide(screens.userBar);
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

// ---------- Logout ----------
$('logout-link').addEventListener('click', async () => {
  await signOut(auth);
  $('login-email').value = '';
  $('login-password').value = '';
});
