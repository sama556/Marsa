
    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const islandItems = document.querySelectorAll('.island-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                islandItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    });
