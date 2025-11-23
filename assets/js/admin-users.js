// --------------------------------------------------
// USERS MODULE (Load, Search, Edit, Delete, Add)
// --------------------------------------------------

console.log("users.js loaded");

// STORAGE HELPERS ------------------------------
function getUsers() {
  return JSON.parse(localStorage.getItem("admin_users") || "[]");
}
function saveUsers(list) {
  localStorage.setItem("admin_users", JSON.stringify(list));
}

// DOM ELEMENTS --------------------------------
const tbody = document.getElementById("userTableBody");
const searchInput = document.getElementById("searchUser");
const addUserBtn = document.getElementById("addUserBtn");

// modal
const editModal = document.getElementById("editModal");
const closeModalBtn = document.getElementById("closeModal");

const editForm = document.getElementById("editUserForm");
const editId = document.getElementById("editId");
const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editRole = document.getElementById("editRole");

// --------------------------------------------------
// RENDER USERS TABLE
// --------------------------------------------------
function renderUsers(filter = "") {
  const users = getUsers();
  tbody.innerHTML = "";

  const filtered = users.filter(
    u =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="5" style="text-align:center; padding:20px;" class="muted">
        No users found
      </td></tr>`;
    return;
  }

  filtered.forEach((u, i) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.role}</td>
      <td>
        <button class="btn small edit-btn" data-id="${u.id}">Edit</button>
        <button class="btn danger small delete-btn" data-id="${u.id}">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  attachActions();
}

// --------------------------------------------------
// ATTACH EDIT & DELETE BUTTON EVENTS
// --------------------------------------------------
function attachActions() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", openEditModal);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", deleteUser);
  });
}

// --------------------------------------------------
// OPEN EDIT MODAL
// --------------------------------------------------
function openEditModal(e) {
  const id = e.target.dataset.id;
  const users = getUsers();
  const user = users.find(u => u.id == id);

  if (!user) return;

  editId.value = user.id;
  editName.value = user.name;
  editEmail.value = user.email;
  editRole.value = user.role;

  editModal.classList.remove("hidden");
}

// --------------------------------------------------
// CLOSE MODAL
// --------------------------------------------------
closeModalBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

// --------------------------------------------------
// EDIT USER SUBMIT
// --------------------------------------------------
editForm.addEventListener("submit", e => {
  e.preventDefault();

  const id = Number(editId.value);
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return;

  users[index].name = editName.value.trim();
  users[index].email = editEmail.value.trim();
  users[index].role = editRole.value;

  saveUsers(users);

  editModal.classList.add("hidden");
  renderUsers(searchInput.value);
});

// --------------------------------------------------
// DELETE USER
// --------------------------------------------------
function deleteUser(e) {
  const id = Number(e.target.dataset.id);

  if (!confirm("Delete this user?")) return;

  let users = getUsers();
  users = users.filter(u => u.id !== id);

  saveUsers(users);
  renderUsers(searchInput.value);
}

// --------------------------------------------------
// ADD USER
// --------------------------------------------------
addUserBtn.addEventListener("click", () => {
  const name = prompt("User name:");
  if (!name) return;

  const email = prompt("User email:");
  if (!email) return;

  const role = prompt("Role (User/Admin/Moderator):", "User") || "User";

  const users = getUsers();
  users.push({
    id: Date.now(),
    name,
    email,
    role
  });

  saveUsers(users);
  renderUsers(searchInput.value);
});

// --------------------------------------------------
// SEARCH
// --------------------------------------------------
searchInput.addEventListener("input", () => {
  renderUsers(searchInput.value);
});

// Load initial
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("admin_users")) {
    // seed default users
    saveUsers([
      { id: 1, name: "Andre Dwi", email: "andre@example.com", role: "Admin" },
      { id: 2, name: "Budi Santoso", email: "budi@example.com", role: "User" },
      { id: 3, name: "Citra Lestari", email: "citra@example.com", role: "User" },
      { id: 4, name: "Dewi Pratiwi", email: "dewi@example.com", role: "Moderator" },
    ]);
  }

  renderUsers();
});

