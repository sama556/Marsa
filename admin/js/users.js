
// Simple admin toast helper
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
  // Save operator (add)
  const btnSaveUser = document.getElementById('btnAdminSaveUser');
  if (btnSaveUser) {
    btnSaveUser.addEventListener('click', function () {
      const modalEl = document.getElementById('modalUserAdd');
      if (modalEl && window.bootstrap) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
      showAdminToast('Operator saved ', 'success');
    });
  }

  // Save operator licence number
  const btnSaveLicence = document.getElementById('btnAdminSaveLicence');
  if (btnSaveLicence) {
    btnSaveLicence.addEventListener('click', function () {
      const modalEl = document.getElementById('modalLicence');
      if (modalEl && window.bootstrap) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
      showAdminToast('Licence number updated .', 'success');
    });
  }

  // Block / unblock operator
  const btnBlockConfirm = document.getElementById('btnAdminBlockConfirm');
  if (btnBlockConfirm) {
    btnBlockConfirm.addEventListener('click', function () {
      const modalEl = document.getElementById('modalBlockUser');
      if (modalEl && window.bootstrap) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
      showAdminToast('Operator status changed successfully', 'success');
    });
  }

  // Toggle password visibility
  const btnTogglePassword = document.getElementById('btnTogglePassword');
  const passwordInput = document.getElementById('adminNewUserPassword');

  if (btnTogglePassword && passwordInput) {
    btnTogglePassword.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      }
    });
  }
});
