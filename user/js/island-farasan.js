(function () {
    'use strict';

  
    var container = document.getElementById('activitiesPlacesContainer');
    var filterPrice = document.getElementById('filterPrice');
    var filterRating = document.getElementById('filterRating');
    var filterWeather = document.getElementById('filterWeather');

    if (container) {
        function applyFilter() {
            var cards = [].slice.call(container.querySelectorAll('.activity-place-card'));
            cards.forEach(function (el) { el.classList.remove('d-none'); });

            if (filterPrice && filterPrice.value) {
                if (filterRating) filterRating.value = '';
                if (filterWeather) filterWeather.value = '';
                var lowFirst = filterPrice.value === 'low';
                cards.sort(function (a, b) {
                    var pa = parseFloat(a.getAttribute('data-price')) || 0;
                    var pb = parseFloat(b.getAttribute('data-price')) || 0;
                    return lowFirst ? pa - pb : pb - pa;
                });
            } else if (filterRating && filterRating.value) {
                if (filterPrice) filterPrice.value = '';
                if (filterWeather) filterWeather.value = '';
                var min = parseFloat(filterRating.value) || 0;
                cards.forEach(function (el) {
                    if ((parseFloat(el.getAttribute('data-rating')) || 0) < min) el.classList.add('d-none');
                });
            } else if (filterWeather && filterWeather.value) {
                if (filterPrice) filterPrice.value = '';
                if (filterRating) filterRating.value = '';
                var w = filterWeather.value;
                cards.forEach(function (el) {
                    if (el.getAttribute('data-weather') !== w) el.classList.add('d-none');
                });
            }
            cards.sort(function (a, b) {
                var na = parseInt((a.getAttribute('data-id') || '').split('-')[1], 10) || 0;
                var nb = parseInt((b.getAttribute('data-id') || '').split('-')[1], 10) || 0;
                return na - nb;
            });
            cards.forEach(function (el) { container.appendChild(el); });
        }
        if (filterPrice) filterPrice.addEventListener('change', applyFilter);
        if (filterRating) filterRating.addEventListener('change', applyFilter);
        if (filterWeather) filterWeather.addEventListener('change', applyFilter);
    }


    var btnIsland = document.getElementById('btnFavIsland');
    if (btnIsland) {
        var fav = [];
        try { fav = JSON.parse(localStorage.getItem('marsa_fav_islands') || '[]'); } catch (e) {}
        var inFav = fav.indexOf('farasan') !== -1;
        btnIsland.querySelector('i').className = inFav ? 'fa fa-heart text-danger' : 'fa fa-heart text-muted';
        var lbl = document.getElementById('favIslandLabel');
        if (lbl) lbl.textContent = inFav ? 'Island in favourites' : 'Add island to favourites';
        btnIsland.addEventListener('click', function () {
            var arr = [];
            try { arr = JSON.parse(localStorage.getItem('marsa_fav_islands') || '[]'); } catch (e) {}
            var i = arr.indexOf('farasan');
            if (i === -1) arr.push('farasan'); else arr.splice(i, 1);
            localStorage.setItem('marsa_fav_islands', JSON.stringify(arr));
            btnIsland.querySelector('i').className = arr.indexOf('farasan') !== -1 ? 'fa fa-heart text-danger' : 'fa fa-heart text-muted';
            if (lbl) lbl.textContent = arr.indexOf('farasan') !== -1 ? 'Island in favourites' : 'Add island to favourites';
        });
    }

    // Activity favourites
    document.querySelectorAll('.btn-fav-card').forEach(function (btn) {
        var id = btn.getAttribute('data-fav-id');
        if (!id) return;
        var icon = btn.querySelector('i');
        var arr = [];
        try { arr = JSON.parse(localStorage.getItem('marsa_fav_activities') || '[]'); } catch (e) {}
        if (icon) icon.className = arr.indexOf(id) !== -1 ? 'fa fa-heart text-danger' : 'fa fa-heart text-muted';
        btn.addEventListener('click', function () {
            var list = [];
            try { list = JSON.parse(localStorage.getItem('marsa_fav_activities') || '[]'); } catch (e) {}
            var idx = list.indexOf(id);
            if (idx === -1) list.push(id); else list.splice(idx, 1);
            localStorage.setItem('marsa_fav_activities', JSON.stringify(list));
            if (icon) icon.className = list.indexOf(id) !== -1 ? 'fa fa-heart text-danger' : 'fa fa-heart text-muted';
        });
    });

    // Booking
    var bookingForm = document.getElementById('bookingModalForm');
    var confirmForm = document.getElementById('confirmPayForm');
    var bookingModalEl = document.getElementById('bookingModal');
    var confirmModalEl = document.getElementById('confirmPayModal');
    var bookingActivityNameInput = document.getElementById('bookingActivityName');
    var bookingActivityPriceInput = document.getElementById('bookingActivityPrice');
    document.querySelectorAll('.btn-open-booking').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (!bookingActivityNameInput || !bookingActivityPriceInput) return;
            var name = this.getAttribute('data-activity-name') || '';
            var price = parseInt(this.getAttribute('data-activity-price'), 10);
            if (!name || isNaN(price)) return;

            bookingActivityNameInput.value = name;
            bookingActivityPriceInput.value = String(price);
        });
    });

    if (bookingForm && confirmForm && bookingModalEl && confirmModalEl) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var dateInput = document.getElementById('bookingDate');
            var guestsInput = document.getElementById('bookingGuests');
            var totalEl = document.getElementById('bookingTotal');
            var activityName = bookingActivityNameInput && bookingActivityNameInput.value.trim();
            var activityPrice = bookingActivityPriceInput ? parseInt(bookingActivityPriceInput.value, 10) : NaN;
            var tripDate = dateInput && dateInput.value;
            var guests = guestsInput ? parseInt(guestsInput.value, 10) : 0;

            if (!activityName) { alert('Please choose an activity from the cards.'); return; }
            if (isNaN(activityPrice)) { alert('Selected activity has no price.'); return; }
            if (!tripDate) { alert('Please select a trip date.'); return; }
            if (!guests || guests < 1) { alert('Please enter number of guests.'); return; }

            var dateStr = tripDate;
            try {
                dateStr = new Date(tripDate + 'T12:00:00').toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            } catch (err) {}

            document.getElementById('confirmActivityName').textContent =
                activityName + ' \u2013 ' + activityPrice + ' SAR/person';
            document.getElementById('confirmTripDate').textContent = dateStr;
            document.getElementById('confirmGuests').textContent = guests;
            document.getElementById('confirmTotal').textContent = totalEl ? totalEl.textContent : '0 SAR';
            (window.bootstrap.Modal.getInstance(bookingModalEl) || new window.bootstrap.Modal(bookingModalEl)).hide();
            new window.bootstrap.Modal(confirmModalEl).show();
        });

        confirmForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var confirmModal = window.bootstrap.Modal.getInstance(confirmModalEl);
            if (confirmModal) confirmModal.hide();
            var toastContainer = document.getElementById('bookingToastContainer');
            if (toastContainer && window.bootstrap) {
                var div = document.createElement('div');
                div.className = 'toast align-items-center text-bg-success border-0';
                div.setAttribute('role', 'alert');
                div.innerHTML = '<div class="d-flex"><div class="toast-body d-flex align-items-center gap-2"><i class="fa fa-check-circle fa-lg"></i><span>Booking confirmed!</span></div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>';
                toastContainer.appendChild(div);
                new window.bootstrap.Toast(div, { delay: 2500 }).show();
            }
        });
    }

    // Reviews
    var reviewForm = document.getElementById('addReviewForm');
    var reviewsList = document.getElementById('reviewsList');
    if (reviewForm && reviewsList) {
        var starsContainer = document.getElementById('reviewStars');
        var ratingInput = document.getElementById('reviewRating');
        var starsLabel = document.getElementById('reviewStarsLabel');
        if (starsContainer) {
            starsContainer.querySelectorAll('.review-star').forEach(function (s) {
                s.style.cursor = 'pointer';
                s.addEventListener('click', function () {
                    var v = parseInt(this.getAttribute('data-rating'), 10);
                    if (ratingInput) ratingInput.value = v;
                    if (starsLabel) starsLabel.textContent = v ? v + ' star' + (v > 1 ? 's' : '') : 'Click to rate';
                    starsContainer.querySelectorAll('.review-star').forEach(function (x) {
                        var icon = x.querySelector('i');
                        if (icon) icon.className = parseInt(x.getAttribute('data-rating'), 10) <= v ? 'fa fa-star fa-lg' : 'far fa-star fa-lg';
                    });
                });
            });
        }
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var rating = parseInt(document.getElementById('reviewRating').value, 10) || 0;
            var commentEl = document.getElementById('reviewComment');
            var comment = (commentEl && commentEl.value.trim()) || '';
            var imageInput = document.getElementById('reviewImage');
            if (rating < 1 || rating > 5) { alert('Please select 1–5 stars.'); return; }
            if (!comment) { alert('Please write your comment.'); return; }
            if (imageInput && imageInput.files && imageInput.files[0] && imageInput.files[0].size > 5 * 1024 * 1024) {
                alert('Image must be under 5 MB.');
                return;
            }
            function addCard(imgSrc) {
                var stars = '';
                for (var i = 1; i <= 5; i++) stars += '<i class="' + (i <= rating ? 'fa' : 'far') + ' fa-star"></i> ';
                var safe = comment.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                var imgHtml = imgSrc ? '<div class="row g-2 mb-2"><div class="col-12"><img src="' + imgSrc + '" class="img-fluid rounded" alt="Photo" style="height:120px;width:100%;object-fit:cover;cursor:pointer" onclick="window.open(this.src)"></div></div>' : '';
                var col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6';
                col.innerHTML = '<div class="card border-0 shadow-sm h-100"><div class="card-body p-4"><div class="d-flex align-items-center mb-3"><div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width:50px;height:50px"><span class="fw-bold">You</span></div><div class="ms-3"><h6 class="mb-0">You</h6><small class="text-muted">Farasan Islands</small></div></div><p class="mb-3">"' + safe + '"</p>' + imgHtml + '<div class="d-flex justify-content-between mt-2"><small class="text-muted"><i class="fa fa-calendar me-1"></i>' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '</small><span class="text-warning small">' + stars + '</span></div></div></div>';
                reviewsList.insertBefore(col, reviewsList.firstChild);
                if (ratingInput) ratingInput.value = '';
                if (commentEl) commentEl.value = '';
                if (imageInput) imageInput.value = '';
                if (starsLabel) starsLabel.textContent = 'Click to rate';
                if (starsContainer) starsContainer.querySelectorAll('.review-star i').forEach(function (icon) { icon.className = 'fa fa-star fa-lg'; });
                alert('Thank you! Your review has been added.');
            }
            if (imageInput && imageInput.files && imageInput.files[0]) {
                var r = new FileReader();
                r.onload = function () { addCard(r.result); };
                r.readAsDataURL(imageInput.files[0]);
            } else {
                addCard(null);
            }
        });
    }
})();
