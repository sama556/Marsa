
(function () {
 
    var filterBtns = document.querySelectorAll('#bookingFilter [data-filter]');
    var cards = document.querySelectorAll('.booking-card');
    if (filterBtns.length && cards.length) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filter = this.getAttribute('data-filter');
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                cards.forEach(function (card) {
                    var status = card.getAttribute('data-status');
                    var show = filter === 'all' || status === filter;
                    card.style.display = show ? '' : 'none';
                });
            });
        });
    }

    var complaintButtons = document.querySelectorAll('.btn-complaint');
    var complaintBookingInput = document.getElementById('complaintBookingId');
    var complaintSubjectInput = document.getElementById('complaintSubject');
    var complaintMessageInput = document.getElementById('complaintMessage');
    var submitComplaintBtn = document.getElementById('submitComplaintBtn');
    var complaintModalEl = document.getElementById('complaintModal');

    if (complaintButtons.length && complaintBookingInput && submitComplaintBtn && complaintModalEl) {
        complaintButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var bookingId = this.getAttribute('data-booking-id') || '';
                complaintBookingInput.value = bookingId;
                if (complaintSubjectInput) complaintSubjectInput.value = '';
                if (complaintMessageInput) complaintMessageInput.value = '';
            });
        });

        submitComplaintBtn.addEventListener('click', function () {
            var subject = complaintSubjectInput ? complaintSubjectInput.value.trim() : '';
            var message = complaintMessageInput ? complaintMessageInput.value.trim() : '';
            if (!subject || !message) {
                if (typeof showMyBookingsToast === 'function') {
                    showMyBookingsToast('Please enter a subject and details for your complaint.');
                } else {
                    alert('Please enter a subject and details for your complaint.');
                }
                return;
            }

            if (typeof showMyBookingsToast === 'function') {
                showMyBookingsToast('Your complaint has been submitted. Our support team will contact you soon.');
            } else {
                alert('Your complaint has been submitted. Our support team will contact you soon.');
            }
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal.getInstance(complaintModalEl)) {
                bootstrap.Modal.getInstance(complaintModalEl).hide();
            }
        });
    }

    // Helper: show toast on this page
    function showMyBookingsToast(message) {
        var container = document.getElementById('myBookingsToastContainer');
        if (!container || typeof bootstrap === 'undefined' || !bootstrap.Toast) {
            return;
        }
        var div = document.createElement('div');
        div.className = 'toast align-items-center text-bg-success border-0 mb-2';
        div.setAttribute('role', 'alert');
        div.setAttribute('aria-live', 'assertive');
        div.setAttribute('aria-atomic', 'true');
        div.innerHTML =
            '<div class="d-flex">' +
            '<div class="toast-body d-flex align-items-center gap-2">' +
            '<i class="fa fa-check-circle fa-lg"></i>' +
            '<span>' + message + '</span>' +
            '</div>' +
            '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
            '</div>';
        container.appendChild(div);
        new bootstrap.Toast(div, { delay: 2500 }).show();
    }

    // Receive confirmation & receipt button: show toast + receipt modal
    var receiveButtons = document.querySelectorAll('.btn-receive-confirmation');
    var receiptModalEl = document.getElementById('receiptModal');
    var receiptBookingId = document.getElementById('receiptBookingId');
    var receiptActivity = document.getElementById('receiptActivity');
    var receiptDate = document.getElementById('receiptDate');
    var receiptGuests = document.getElementById('receiptGuests');
    var receiptTotal = document.getElementById('receiptTotal');

    if (receiveButtons.length && receiptModalEl && receiptBookingId && receiptActivity && receiptDate && receiptGuests && receiptTotal) {
        receiveButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var bookingId = this.getAttribute('data-booking-id') || '';
                var activity = this.getAttribute('data-activity') || '';
                var date = this.getAttribute('data-date') || '';
                var guests = this.getAttribute('data-guests') || '';
                var total = this.getAttribute('data-total') || '';

                receiptBookingId.textContent = bookingId || '—';
                receiptActivity.textContent = activity || '—';
                receiptDate.textContent = date || '—';
                receiptGuests.textContent = guests || '—';
                receiptTotal.textContent = total || '—';

                if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                    new bootstrap.Modal(receiptModalEl).show();
                }

                var toastMessage = bookingId
                    ? 'Confirmation and receipt for booking ' + bookingId + ' are now displayed.'
                    : 'Your confirmation and receipt are now displayed.';
                showMyBookingsToast(toastMessage);
            });
        });
    }
})();
    