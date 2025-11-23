// reports.js
document.addEventListener("DOMContentLoaded", () => {
  const reportContainer = document.querySelector("#report-list");

  const reports = [
    { id: 101, title: "User Growth Report", date: "2025-01-15", status: "Completed" },
    { id: 102, title: "Monthly Revenue", date: "2025-01-10", status: "In Progress" },
    { id: 103, title: "Traffic Analytics", date: "2025-01-08", status: "Completed" },
    { id: 104, title: "System Audit", date: "2025-01-05", status: "Pending" }
  ];

  function loadReports() {
    reportContainer.innerHTML = "";
    reports.forEach((report) => {
      const div = document.createElement("div");
      div.classList.add("report-card");
      div.innerHTML = `
        <h3>${report.title}</h3>
        <p><strong>ID:</strong> ${report.id}</p>
        <p><strong>Date:</strong> ${report.date}</p>
        <p><strong>Status:</strong> ${report.status}</p>
      `;
      reportContainer.appendChild(div);
    });
  }

  loadReports();
});
