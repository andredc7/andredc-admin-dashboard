// dashboard.js - populate overview metrics and chart
document.addEventListener('DOMContentLoaded', ()=>{
  // summary elements
  const users = JSON.parse(localStorage.getItem('andre_users')||'[]');
  const orders = JSON.parse(localStorage.getItem('andre_orders')||'[]');

  document.getElementById('summary-users').textContent = users.length;
  document.getElementById('summary-orders').textContent = orders.filter(o=>o.status!=='Cancelled').length;
  const revenue = orders.reduce((s,o)=> s + (o.total||0), 0);
  document.getElementById('summary-revenue').textContent = 'Rp ' + revenue.toLocaleString();

  // render chart if Chart available
  const canvas = document.getElementById('salesChart');
  if(canvas && typeof Chart !== 'undefined'){
    // months labels from orders
    const monthly = {};
    orders.forEach(o=>{
      const d = new Date(o.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      monthly[key] = (monthly[key]||0) + (o.total || 0);
    });
    const labels = Object.keys(monthly).sort();
    const data = labels.map(k=>monthly[k]);

    new Chart(canvas.getContext('2d'), {
      type: 'line',
      data:{ labels, datasets:[{ label:'Revenue', data, tension:0.3, fill:true }] },
      options:{ responsive:true, plugins:{ legend:{ display:false } } }
    });
  }
});
