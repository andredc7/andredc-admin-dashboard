/* assets/js/admin-app.js */
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    const users = SHARED.getUsers();
    const orders = SHARED.getOrders();
    const products = SHARED.getProducts();
    const rev = orders.reduce((s,o)=> s + (o.total||0), 0);

    const su = document.getElementById('stat-users-value');
    const so = document.getElementById('stat-orders-value');
    const sr = document.getElementById('stat-revenue-value');

    if(su) su.textContent = users.length;
    if(so) so.textContent = orders.length;
    if(sr) sr.textContent = rev.toLocaleString();

    const recentEl = document.getElementById('admin-recent-orders');
    if(recentEl){
      if(!orders.length) recentEl.innerHTML = '<p>No orders yet.</p>';
      else recentEl.innerHTML = '<ul>' + orders.slice(-6).reverse().map(o=>`<li>${o.customer} — Rp ${ (o.total||0).toLocaleString() } — ${o.createdAt.split('T')[0]}</li>`).join('') + '</ul>';
    }

    // show/hide nav login/profile based on admin auth
    const curAdmin = SHARED.getCurrentAdmin();
    const navProfile = document.getElementById('nav-admin-profile');
    const navLogin = document.getElementById('nav-admin-login');
    if(curAdmin){ if(navProfile) navProfile.style.display='inline-block'; if(navLogin){ navLogin.textContent='Logout'; navLogin.href='#'; navLogin.onclick = (e)=>{ e.preventDefault(); SHARED.setCurrentAdmin(null); location.href='login.html'; } } }
    else{ if(navProfile) navProfile.style.display='none'; if(navLogin){ navLogin.textContent='Login'; navLogin.href='login.html'; navLogin.onclick = null; } }
  });
})();
