
// Init AOS animations
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
  const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
  toast.show();
}

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!signupForm.checkValidity()) {
    signupForm.classList.add('was-validated');
    showToast('Please fill all required fields correctly.', false);
    return;
  }

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    showToast('Passwords do not match.', false);
    return;
  }

  showToast('Account created successfully! Redirecting to dashboard...', true);
  signupForm.reset();
  signupForm.classList.remove('was-validated');
});
