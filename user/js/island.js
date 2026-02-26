
    (function() {
        var modal = document.getElementById('bookingModal');
        if (!modal) return;
        var priceInput = document.getElementById('bookingActivityPrice');
        var guests = document.getElementById('bookingGuests');
        var totalEl = document.getElementById('bookingTotal');
        function updateTotal() {
            var price = priceInput ? parseInt(priceInput.value, 10) : NaN;
            var n = guests ? parseInt(guests.value, 10) : 1;
            if (!isNaN(price) && !isNaN(n) && n > 0) {
                totalEl.textContent = (price * n) + ' SAR';
            } else {
                totalEl.textContent = '0 SAR';
            }
        }
        if (guests) guests.addEventListener('input', updateTotal);
        modal.addEventListener('show.bs.modal', updateTotal);
    })();