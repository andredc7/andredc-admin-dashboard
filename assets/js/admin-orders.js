/* assets/js/admin-orders.js */
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    const el = document.getElementById('admin-orders-list');
    if(!el) return;
    const orders = SHARED.getOrders();
    if(!orders.length){ el.innerHTML = '<p>No orders yet.</p>'; return; }
    el.innerHTML = orders.map(o=>`<div class="card" style="margin-bottom:10px">
      <div><strong>Order ${o.id}</strong> — ${o.customer}</div>
      <div class="muted">Total: Rp ${ (o.total||0).toLocaleString() } • ${o.createdAt.split('T')[0]}</div>
      <div style="margin-top:8px"><select class="order-status" data-id="${o.id}"><option ${o.status==='pending'?'selected':''} value="pending">Pending</option><option ${o.status==='processing'?'selected':''} value="processing">Processing</option><option ${o.status==='completed'?'selected':''} value="completed">Completed</option></select></div>
    </div>`).join('');

    el.querySelectorAll('.order-status').forEach(s=>{
      s.addEventListener('change', ()=>{
        const id = Number(s.dataset.id);
        const arr = SHARED.getOrders().map(o=> { if(o.id===id) o.status = s.value; return o; });
        SHARED.saveOrders(arr);
        alert('Status updated');
      });
    });
  });
})();
