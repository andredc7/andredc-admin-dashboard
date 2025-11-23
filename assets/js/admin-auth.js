/* admin-auth.js
 - login
 - register
 - logout
 - session helpers
*/
function getAdmins(){ return JSON.parse(localStorage.getItem('admins')||'[]') }
function saveAdmins(arr){ localStorage.setItem('admins', JSON.stringify(arr)) }
function setCurrentAdmin(a){ localStorage.setItem('currentAdmin', JSON.stringify(a)) }
function getCurrentAdmin(){ return JSON.parse(localStorage.getItem('currentAdmin')||'null') }
function adminLogout(){ localStorage.removeItem('currentAdmin'); location.href='admin-login.html' }

// Toggle password helper
function togglePassword(id){ const el = document.getElementById(id); if(!el) return; el.type = el.type === 'password' ? 'text' : 'password'; }

// Remember admin email on login page
document.addEventListener('DOMContentLoaded', ()=>{
  // login handler
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', e=>{
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const pass = loginForm.password.value.trim();
      const msg = document.getElementById('loginMsg');
      const admins = getAdmins();
      const found = admins.find(a=>a.email===email && a.password===pass);
      if(!found){
        if(msg){ msg.textContent='Invalid credentials'; msg.style.color='red'; loginForm.classList.add('shake'); setTimeout(()=>loginForm.classList.remove('shake'),300); }
        return;
      }
      setCurrentAdmin(found);
      if(document.getElementById('rememberAdmin')?.checked) localStorage.setItem('admin_remember_email', email);
      else localStorage.removeItem('admin_remember_email');
      if(msg){ msg.textContent='Login successful'; msg.style.color='green' }
      setTimeout(()=> location.href='index.html',700);
    });

    // fill remembered email
    const rem = localStorage.getItem('admin_remember_email');
    if(rem && document.getElementById('rememberAdmin')){ document.getElementById('rememberAdmin').checked = true; loginForm.email.value = rem; }
  }

  // register handler
  const regForm = document.getElementById('registerForm');
  if(regForm){
    regForm.addEventListener('submit', e=>{
      e.preventDefault();
      const name = regForm.name.value.trim();
      const email = regForm.email.value.trim();
      const pass = regForm.password.value.trim();
      const msg = document.getElementById('regMsg');
      const admins = getAdmins();
      if(admins.some(a=>a.email===email)){
        if(msg){ msg.textContent='Email already exists'; msg.style.color='red' }
        return;
      }
      const newAdmin = { name, email, password:pass };
      admins.push(newAdmin);
      saveAdmins(admins);
      setCurrentAdmin(newAdmin);
      if(msg){ msg.textContent='Account created'; msg.style.color='green' }
      setTimeout(()=> location.href='index.html',700);
    });
  }

  // profile edit (in admin-settings.js will handle updates)
});
