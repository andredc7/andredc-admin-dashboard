function getAdmins() {
  return JSON.parse(localStorage.getItem("admins")) || [];
}

function saveAdmins(a) {
  localStorage.setItem("admins", JSON.stringify(a));
}

function loadResetToken() {
  return JSON.parse(localStorage.getItem("resetToken")) || null;
}

document.getElementById("resetForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const newPass = document.getElementById("newPass").value.trim();
  const msg = document.getElementById("resetMsg");

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const saved = loadResetToken();

  if (!saved || saved.token !== token) {
    msg.textContent = "Invalid or expired token!";
    msg.style.color = "red";
    return;
  }

  // UPDATE PASSWORD
  const admins = getAdmins();
  const idx = admins.findIndex(a => a.email === saved.email);

  admins[idx].password = newPass;
  saveAdmins(admins);

  // DELETE TOKEN
  localStorage.removeItem("resetToken");

  msg.textContent = "Password updated successfully!";
  msg.style.color = "green";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 900);
});
