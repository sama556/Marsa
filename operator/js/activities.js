
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
      const addBtn = document.getElementById('btnOperatorActivityAdd');
      const addModal = document.getElementById('modalActivityAdd');
      if (addBtn && addModal) {
        addBtn.addEventListener('click', function () {
          const island = document.getElementById('addIsland');
          const name = document.getElementById('addName');
          const kind = document.getElementById('addKind');
          const desc = document.getElementById('addDescription');
          const basePrice = document.getElementById('addBasePrice');
          const maxCap = document.getElementById('addMaxCapacity');
          const duration = document.getElementById('addDuration');
          const weatherEl = document.getElementById('addWeather');
          if (island && island.value === 'Farasan Islands' && name && name.value.trim()) {
            const list = (function () {
              try {
                const raw = localStorage.getItem('marsa_farasan_activities');
                return raw ? JSON.parse(raw) : [];
              } catch (e) { return []; }
            })();
            list.push({
              id: 'farasan-' + Date.now(),
              island: island.value,
              kind: (kind && kind.value) || 'Activity',
              name: name.value.trim(),
              description: (desc && desc.value.trim()) || '',
              basePrice: (basePrice && parseInt(basePrice.value, 10)) || 0,
              maxCapacity: (maxCap && parseInt(maxCap.value, 10)) || 0,
              duration: (duration && duration.value.trim()) || '',
              image: 'img/destination-2.jpg',
              weather: (weatherEl && weatherEl.value) || 'sunny',
              reviewsCount: 0
            });
            try {
              localStorage.setItem('marsa_farasan_activities', JSON.stringify(list));
            } catch (e) {}
          }
          if (addModal && window.bootstrap) {
            const modal = bootstrap.Modal.getInstance(addModal) || new bootstrap.Modal(addModal);
            modal.hide();
          }
          showOperatorToast('Activity saved. It will appear on the Farasan island page.', 'success');
        });
      } else {
        wire('btnOperatorActivityAdd', 'modalActivityAdd', 'Activity saved.');
      }
      wire('btnOperatorActivityEdit', 'modalActivityEdit', 'Activity changes saved.');
      wire('btnOperatorActivityDelete', 'modalActivityDelete', 'Activity deleted.');
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
      applyFilters();
    });
  