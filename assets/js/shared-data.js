// shared-data.js - helper: seed demo users & orders & admins (idempotent)
(function(){
  if(!localStorage.getItem('andre_users')){
    const u = [
      { id:101, name:"Andre Dwi", email:"andre@example.com", password:"andre123" },
      { id:102, name:"Budi Santoso", email:"budi@example.com", password:"budi123" }
    ];
    localStorage.setItem('andre_users', JSON.stringify(u));
  }
  if(!localStorage.getItem('andre_orders')){
    const o = [
      { id:5001, customerEmail:'andre@example.com', createdAt:'2025-01-10T10:10:00', total:850000, status:'Completed', items:[{name:'Wireless Mouse', qty:1}] },
      { id:5002, customerEmail:'andre@example.com', createdAt:'2025-01-20T14:20:00', total:350000, status:'Pending', items:[{name:'USB Hub',qty:1}] }
    ];
    localStorage.setItem('andre_orders', JSON.stringify(o));
  }
  if(!localStorage.getItem('admins')){
    const a = [{ name:'Admin Andre', email:'admin@andre.com', password:'admin123' }];
    localStorage.setItem('admins', JSON.stringify(a));
  }
})();
