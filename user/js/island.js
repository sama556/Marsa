
    (function() {
        var modal = document.getElementById('bookingModal');
        if (!modal) return;
        var activity = document.getElementById('bookingActivity');
        var guests = document.getElementById('bookingGuests');
        var totalEl = document.getElementById('bookingTotal');
        function updateTotal() {
            var opt = activity && activity.options[activity.selectedIndex];
            var price = opt && opt.getAttribute('data-price');
            var n = guests ? parseInt(guests.value, 10) : 1;
            if (price && !isNaN(n)) totalEl.textContent = (parseInt(price, 10) * n) + ' SAR';
            else totalEl.textContent = '0 SAR';
        }
        if (activity) activity.addEventListener('change', updateTotal);
        if (guests) guests.addEventListener('input', updateTotal);
        modal.addEventListener('show.bs.modal', updateTotal);
    })();