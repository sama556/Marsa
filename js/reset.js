// Init AOS if available
if (window.AOS) {
  AOS.init({
    once: true,
    easing: 'ease-out-cubic',
    duration: 800
  });
}

function showToast(message, isSuccess) {
  const toastArea = document.getElementById('toastArea');

  const bgClass = isSuccess ? 'text-bg-success' : 'text-bg-danger';
  const iconClass = isSuccess ? 'fa-circle-check' : 'fa-circle-xmark';
  const toastId = 'toast-' + Date.now();

  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 mb-2" role="alert"
         aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="fa-solid ${iconClass}"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  toastArea.insertAdjacentHTML('beforeend', toastHtml);
  const toastEl = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();
}

const resetForm = document.getElementById('resetForm');

if (resetForm) {
  resetForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!resetForm.checkValidity()) {
      resetForm.classList.add('was-validated');
      showToast('Please fill both password fields correctly.', false);
      return;
    }

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', false);
      return;
    }

    showToast('Password updated successfully! You can now log in.', true);
    resetForm.reset();
    resetForm.classList.remove('was-validated');
  });
}