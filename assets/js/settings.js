// admin-settings.js - edit admin profile & change password
document.addEventListener('DOMContentLoaded', ()=>{
  const admins = JSON.parse(localStorage.getItem('admins')||'[]');
  const cur = JSON.parse(localStorage.getItem('currentAdmin')||'null');
  if(!cur) return;

  const nameEl = document.getElementById('adminName');
  const emailEl = document.getElementById('adminEmail');
  const profileMsg = document.getElementById('profileMsg');
  const passMsg = document.getElementById('passMsg');

  if(nameEl) nameEl.value = cur.name || '';
  if(emailEl) emailEl.value = cur.email || '';

  document.getElementById('profileForm')?.addEventListener('submit', e=>{
    e.preventDefault();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const idx = admins.findIndex(a=>a.email === cur.email);
    if(idx === -1) { profileMsg.textContent='Admin not found'; profileMsg.style.color='red'; return; }
    // check duplicate email
    if(admins.some((a,i)=> a.email === email && i !== idx)){ profileMsg.textContent='Email already used'; profileMsg.style.color='red'; return; }
    admins[idx].name = name; admins[idx].email = email;
    localStorage.setItem('admins', JSON.stringify(admins));
    // update session
    localStorage.setItem('currentAdmin', JSON.stringify(admins[idx]));
    profileMsg.textContent='Profile saved'; profileMsg.style.color='green';
  });

  document.getElementById('passForm')?.addEventListener('submit', e=>{
    e.preventDefault();
    const oldP = document.getElementById('oldPass').value.trim();
    const newP = document.getElementById('newPass').value.trim();
    const idx = admins.findIndex(a => a.email === cur.email);
    if(admins[idx].password !== oldP){ passMsg.textContent='Wrong old password'; passMsg.style.color='red'; return; }
    admins[idx].password = newP;
    localStorage.setItem('admins', JSON.stringify(admins));
    passMsg.textContent='Password updated'; passMsg.style.color='green';
  });
});
