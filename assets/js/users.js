// users.js - show table, edit, delete, search, export csv
document.addEventListener('DOMContentLoaded', ()=>{
  const wrap = document.getElementById('usersTableWrap');
  let users = JSON.parse(localStorage.getItem('andre_users')||'[]');

  function render(list){
    if(!wrap) return;
    if(list.length === 0){ wrap.innerHTML = '<p class="muted">No users</p>'; return; }
    let html = '<table><thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead><tbody>';
    list.forEach((u,i)=>{
      html += `<tr>
        <td>${i+1}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role||'User'}</td>
        <td>
          <button class="btn" data-action="edit" data-email="${u.email}">Edit</button>
          <button class="btn ghost" data-action="delete" data-email="${u.email}">Delete</button>
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    wrap.innerHTML = html;
    bindActions();
  }

  function bindActions(){
    wrap.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const action = btn.getAttribute('data-action');
        const email = btn.getAttribute('data-email');
        if(action === 'delete') doDelete(email);
        if(action === 'edit') openEdit(email);
      });
    });
  }

  function doDelete(email){
    if(!confirm('Delete user?')) return;
    users = users.filter(u=>u.email!==email);
    localStorage.setItem('andre_users', JSON.stringify(users));
    render(users);
  }

  function openEdit(email){
    const u = users.find(x=>x.email===email);
    if(!u) return alert('User not found');
    const newName = prompt('Edit name', u.name);
    if(newName === null) return;
    u.name = newName.trim() || u.name;
    localStorage.setItem('andre_users', JSON.stringify(users));
    render(users);
  }

  // search
  const input = document.getElementById('userSearch');
  if(input){
    input.addEventListener('input', ()=>{
      const q = input.value.trim().toLowerCase();
      render(users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
    });
  }

  // export csv
  const exportBtn = document.getElementById('exportCsv');
  if(exportBtn){
    exportBtn.addEventListener('click', ()=>{
      const csv = ['Name,Email,Role'].concat(users.map(u=>`${u.name},${u.email},${u.role||'User'}`)).join('\n');
      const blob = new Blob([csv], {type:'text/csv'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'users.csv'; a.click(); URL.revokeObjectURL(url);
    });
  }

  render(users);
});
