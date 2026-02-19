
    // Simple toast helper for operator activities
    function showOperatorToast(message, type) {
      const container = document.getElementById('operatorToastContainer');
      if (!container || !window.bootstrap) return;

      const toastId = 'operator-toast-' + Date.now();
      const bgClass = type === 'error' ? 'text-bg-danger' : 'text-bg-success';
      const icon = type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check';

      const html = `
        <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body d-flex align-items-center gap-2">
              <i class="fa-solid ${icon}"></i>
              <span>${message}</span>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', html);
      const toastEl = document.getElementById(toastId);
      const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
      toast.show();
    }

    document.addEventListener('DOMContentLoaded', function () {
      // Toast wiring for static actions
      function wire(btnId, modalId, msg) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        btn.addEventListener('click', function () {
          const modalEl = document.getElementById(modalId);
          if (modalEl && window.bootstrap) {
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
          }
          showOperatorToast(msg, 'success');
        });
      }

      wire('btnOperatorActivityAdd', 'modalActivityAdd', 'Activity saved.');
      wire('btnOperatorActivityEdit', 'modalActivityEdit', 'Activity changes saved.');
      wire('btnOperatorActivityDelete', 'modalActivityDelete', 'Activity deleted.');

      // Simple client-side filters for activities table
      const table = document.getElementById('activitiesTable');
      const islandSelect = document.getElementById('filterIsland');
      const kindSelect = document.getElementById('filterKind');
      const searchInput = document.getElementById('searchActivity');
      const clearBtn = document.getElementById('btnClearFilters');

      function applyFilters() {
        if (!table) return;
        const rows = table.querySelectorAll('tbody tr');
        const islandValue = islandSelect ? islandSelect.value : '';
        const kindValue = kindSelect ? kindSelect.value : '';
        const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

        rows.forEach((row) => {
          const rowIsland = (row.getAttribute('data-island') || '').trim();
          const rowKind = (row.getAttribute('data-kind') || '').trim();
          const nameCell = row.querySelector('td:nth-child(5)');
          const nameText = nameCell ? nameCell.textContent.trim().toLowerCase() : '';

          let visible = true;

          if (islandValue && rowIsland !== islandValue) {
            visible = false;
          }
          if (visible && kindValue && rowKind !== kindValue) {
            visible = false;
          }
          if (visible && searchTerm && !nameText.includes(searchTerm)) {
            visible = false;
          }

          row.style.display = visible ? '' : 'none';
        });
      }

      if (islandSelect) {
        islandSelect.addEventListener('change', applyFilters);
      }
      if (kindSelect) {
        kindSelect.addEventListener('change', applyFilters);
      }
      if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
      }
      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          if (islandSelect) islandSelect.value = '';
          if (kindSelect) kindSelect.value = '';
          if (searchInput) searchInput.value = '';
          applyFilters();
        });
      }

      // Run once on load to make sure everything is consistent
      applyFilters();
    });
  