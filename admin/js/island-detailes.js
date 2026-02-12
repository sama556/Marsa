
    // Simple toast helper for island detail page
    function showAdminToast(message, type) {
      const container = document.getElementById('adminToastContainer');
      if (!container || !window.bootstrap) return;

      const toastId = 'admin-toast-' + Date.now();
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
      function wireModalButton(btnId, modalId, message) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        btn.addEventListener('click', function () {
          const modalEl = document.getElementById(modalId);
          if (modalEl && window.bootstrap) {
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
          }
          showAdminToast(message, 'success');
        });
      }

      // Alerts
      wireModalButton('btnIslandAlertEdit', 'modalAlertEdit', 'Alert changes saved .');
      wireModalButton('btnIslandAlertDelete', 'modalAlertDelete', 'Alert deleted .');

      // Policies

      wireModalButton('btnIslandPolicyEdit', 'modalPolicyEdit', 'Policy changes saved .');
      wireModalButton('btnIslandPolicyDelete', 'modalPolicyDelete', 'Policy deleted .');
    });
  