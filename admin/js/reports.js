
document.addEventListener('DOMContentLoaded', function () {
  // Global defaults for Chart.js matching Bootstrap theme
  const fontFamily = window.getComputedStyle(document.body).fontFamily;
  Chart.defaults.font.family = fontFamily || 'system-ui, sans-serif';
  Chart.defaults.color = '#6c757d';

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

            borderRadius: 4,
            maxBarThickness: 40
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { font: { size: 11 } },
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 200,
              callback: function (value) { return value + ' SAR'; }
            },
            grid: {
              color: '#e9ecef',
              borderDash: [5, 5]
            },
            border: { display: false }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.raw + ' SAR';
              }
            }
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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { boxWidth: 12, font: { size: 11 } }
          }
        },
        cutout: '70%'
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
            // Semantic colors based on rating
            backgroundColor: context => {
              const value = context.raw;
              if (value >= 4.0) return '#198754'; // Success (Green)
              if (value >= 2.5) return '#ffc107'; // Warning (Yellow)
              return '#dc3545'; // Danger (Red)
            },
            borderRadius: 4,
            maxBarThickness: 40
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { font: { size: 11 } },
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            max: 5,
            ticks: { stepSize: 1 },
            grid: {
              color: '#e9ecef',
              borderDash: [5, 5]
            },
            border: { display: false }
          }
        }
      }
    });
  }
});
