// admin-forgot.js - create a reset token and redirect with token param
function getAdmins(){ return JSON.parse(localStorage.getItem('admins')||'[]') }
function saveReset(tokenObj){ localStorage.setItem('admin_reset_token', JSON.stringify(tokenObj)) }

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('forgotForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    const msg = document.getElementById('forgotMsg');
    const admins = getAdmins();
    const found = admins.find(a=>a.email===email);
    if(!found){ msg.textContent='Email not found'; msg.style.color='red'; return; }
    const token = Math.random().toString(36).slice(2,12);
    saveReset({ email, token, createdAt: Date.now() });
    msg.textContent='Reset link created (demo). Redirecting...'; msg.style.color='green';
    setTimeout(()=> location.href = `admin-reset-password.html?token=${token}`, 800);
  });
});
