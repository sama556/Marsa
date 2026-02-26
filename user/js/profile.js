
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('profileForm');
    if (form) {
        var userIdInput = form.elements['user_id'];
        var roleInput = form.elements['role'];
        var createdAtInput = form.elements['created_at'];
        var usernameInput = form.elements['username'];
        var emailInput = form.elements['email'];
        var firstNameInput = form.elements['first_name'];
        var lastNameInput = form.elements['last_name'];

        var userIdCell = document.getElementById('user-id-cell');
        var roleCell = document.getElementById('user-role-cell');
        var createdAtCell = document.getElementById('user-created-at-cell');
        var usernameCell = document.getElementById('user-username-cell');
        var emailCell = document.getElementById('user-email-cell');
        var firstNameCell = document.getElementById('user-first-name-cell');
        var lastNameCell = document.getElementById('user-last-name-cell');

        function syncUserRow() {
            if (userIdCell && userIdInput) {
                userIdCell.textContent = userIdInput.value || '';
            }
            if (roleCell && roleInput) {
                roleCell.textContent = roleInput.value || '';
            }
            if (createdAtCell && createdAtInput) {
                createdAtCell.textContent = createdAtInput.value || '';
            }
            if (usernameCell && usernameInput) {
                usernameCell.textContent = usernameInput.value || '';
            }
            if (emailCell && emailInput) {
                emailCell.textContent = emailInput.value || '';
            }
            if (firstNameCell && firstNameInput) {
                firstNameCell.textContent = firstNameInput.value || '';
            }
            if (lastNameCell && lastNameInput) {
                lastNameCell.textContent = lastNameInput.value || '';
            }
        }

        [usernameInput, emailInput, firstNameInput, lastNameInput].forEach(function (input) {
            if (input) {
                input.addEventListener('input', syncUserRow);
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            syncUserRow();
            alert('Profile updated.');
        });

        
        syncUserRow();
    }

    var passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        var newPasswordInput = passwordForm.elements['new_password'];
        var confirmPasswordInput = passwordForm.elements['confirm_password'];
        var passwordCell = document.getElementById('user-password-cell');

        passwordForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!newPasswordInput || !confirmPasswordInput) return;

            var newPwd = newPasswordInput.value;
            var confirmPwd = confirmPasswordInput.value;

            if (!newPwd || !confirmPwd) {
                alert('Please fill in the new password and confirmation.');
                return;
            }
            if (newPwd !== confirmPwd) {
                alert('New password and confirmation do not match.');
                return;
            }

            if (passwordCell) {
                passwordCell.textContent = '•••••••••••••••••• (updated)';
            }

            newPasswordInput.value = '';
            confirmPasswordInput.value = '';
            if (passwordForm.elements['current_password']) {
                passwordForm.elements['current_password'].value = '';
            }

            alert('Password updated .');
        });
    }
});
