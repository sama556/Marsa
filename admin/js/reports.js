
document.addEventListener('DOMContentLoaded', function () {
  // Export button (static demo)
  const btnExport = document.getElementById('btnExportReports');
  if (btnExport) {
    btnExport.addEventListener('click', function () {
      alert('Export started: reports data would be downloaded as CSV.');
    });
  }

  if (typeof Chart === 'undefined') {
   
    return;
  }

  // Activities chart – base price per activity (bar)
  const activitiesCtx = document.getElementById('activitiesChart');
  if (activitiesCtx) {
    new Chart(activitiesCtx, {
      type: 'bar',
      data: {
        labels: ['#201 Snorkeling reef tour', '#202 Sunset boat cruise', '#203 Full-day diving trip'],
        datasets: [
          {
            label: 'Base price (SAR)',
            data: [350, 420, 950],
            backgroundColor: ['#0d6efd', '#0dcaf0', '#198754'],
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 200 }
          }
        }
      }
    });
  }

  // Bookings chart – status distribution (doughnut)
  const bookingsCtx = document.getElementById('bookingsChart');
  if (bookingsCtx) {
    new Chart(bookingsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Confirmed', 'Pending', 'Cancelled'],
        datasets: [
          {
            data: [1, 1, 1],
            backgroundColor: ['#198754', '#ffc107', '#6c757d'],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 10 } }
          }
        },
        cutout: '60%'
      }
    });
  }

  // Reviews chart – rating per activity (bar)
  const reviewsCtx = document.getElementById('reviewsChart');
  if (reviewsCtx) {
    new Chart(reviewsCtx, {
      type: 'bar',
      data: {
        labels: ['#201 Snorkeling', '#202 Sunset cruise', '#203 Diving trip'],
        datasets: [
          {
            label: 'Rating (/5)',
            data: [4.5, 4.0, 2.0],
            backgroundColor: '#ffc107',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: {
            beginAtZero: true,
            max: 5,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }
});
