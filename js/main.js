document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const primaryNav = document.getElementById('primary-nav');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('nav-open');
        });
    }

    // 2. Interactive Category Filter (Services / Menu Page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const foodCards = document.querySelectorAll('.food-card');

    if (filterButtons.length > 0 && foodCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                foodCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Client-Side Form Validation (Enquiry Page)
    const enquiryForm = document.getElementById('enquiryForm');
    const formFeedback = document.getElementById('formFeedback');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const serviceType = document.getElementById('serviceType').value;
            const message = document.getElementById('message').value.trim();

            let errors = [];

            if (fullName.length < 2) {
                errors.push('Please enter a valid full name.');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push('Please enter a valid email address.');
            }

            if (!serviceType) {
                errors.push('Please select a service option.');
            }

            if (message.length < 10) {
                errors.push('Your message must be at least 10 characters long.');
            }

            if (errors.length > 0) {
                formFeedback.className = 'feedback-box feedback-error';
                formFeedback.innerHTML = errors.join('<br>');
                formFeedback.style.display = 'block';
            } else {
                formFeedback.className = 'feedback-box feedback-success';
                formFeedback.innerHTML = 'Thank you! Your enquiry has been successfully submitted. Temi\'s Kitchen will contact you soon.';
                formFeedback.style.display = 'block';
                enquiryForm.reset();
            }
        });
    }
});