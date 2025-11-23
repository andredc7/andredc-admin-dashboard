// dashboard.js — for index.html (Overview)

// Sample sales data (monthly)
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [3200, 4100, 3800, 4500, 5200, 6100],
};

// Initialize Chart
const ctx = document.getElementById("salesChart");

if (ctx) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: salesData.labels,
      datasets: [
        {
          label: "Sales (IDR x1000)",
          data: salesData.values,
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}
