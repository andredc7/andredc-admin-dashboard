/* assets/js/admin-products.js */
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    const list = document.getElementById('admin-products-list');
    const addBtn = document.getElementById('admin-add-product');

    function render(){
      const arr = SHARED.getProducts();
      if(!list) return;
      if(!arr.length) list.innerHTML = '<p>No products.</p>';
      else list.innerHTML = arr.map(p=>`
        <div class="product-card">
          <img src="${p.img||'https://via.placeholder.com/260x160'}" alt="${p.name}">
          <h4>${p.name}</h4>
          <div class="muted">Rp ${ (p.price||0).toLocaleString() }</div>
          <div style="margin-top:8px">
            <a class="btn btn-outline" href="product-detail.html?id=${p.id}">View</a>
            <button class="btn delete-product" data-id="${p.id}" style="margin-left:6px">Delete</button>
          </div>
        </div>`).join('');

      list.querySelectorAll('.delete-product').forEach(b=>{
        b.addEventListener('click', ()=> {
          if(!confirm('Delete product?')) return;
          const id = Number(b.dataset.id);
          SHARED.saveProducts(SHARED.getProducts().filter(x=>x.id!==id));
          render();
        });
      });
    }

    if(addBtn){
      addBtn.addEventListener('click', ()=>{
        const name = prompt('Product name');
        if(!name) return;
        const price = Number(prompt('Price (numbers only)', '0')) || 0;
        const cat = prompt('Category', 'misc') || 'misc';
        const id = Date.now();
        const p = { id, name, price, cat, img:'https://via.placeholder.com/800x500', description:'', sku:'', reviews:0 };
        const arr = SHARED.getProducts(); arr.push(p); SHARED.saveProducts(arr);
        render();
      });
    }

    render();
  });
})();
