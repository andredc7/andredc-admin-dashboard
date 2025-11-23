// reports.js - render a basic monthly revenue chart and sample report cards
document.addEventListener('DOMContentLoaded', ()=>{
  const orders = JSON.parse(localStorage.getItem('andre_orders')||'[]');
  const canvas = document.getElementById('reportChart');
  if(canvas && typeof Chart !== 'undefined'){
    const monthly = {};
    orders.forEach(o=>{
      const d = new Date(o.createdAt);
      const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      monthly[k] = (monthly[k]||0) + (o.total || 0);
    });
    const labels = Object.keys(monthly).sort();
    const data = labels.map(l=>monthly[l]);

    new Chart(canvas.getContext('2d'), {
      type:'bar',
      data:{ labels, datasets:[{ label:'Revenue', data }]},
      options:{ responsive:true }
    });
  }

  // sample cards
  const list = document.getElementById('report-list');
  if(list){
    list.innerHTML = '';
    const totals = orders.reduce((s,o)=> s + (o.total||0),0);
    const pending = orders.filter(o=>o.status==='Pending').length;
    const completed = orders.filter(o=>o.status==='Completed').length;
    const html = `
      <div class="card"><h4>Total Revenue</h4><p>Rp ${totals.toLocaleString()}</p></div>
      <div class="card"><h4>Pending Orders</h4><p>${pending}</p></div>
      <div class="card"><h4>Completed Orders</h4><p>${completed}</p></div>
    `;
    list.innerHTML = html;
  }
});
