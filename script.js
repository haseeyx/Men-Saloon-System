document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // View services buttons
    const viewServiceButtons = document.querySelectorAll('.view-services');
    const serviceModal = new bootstrap.Modal(document.getElementById('serviceModal'));
    
    viewServiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            const modalTitle = document.getElementById('serviceModalTitle');
            const modalBody = document.getElementById('serviceModalBody');
            
            let title = '';
            let content = '';
            
            switch(serviceType) {
                case 'hair':
                    title = 'Hair Services';
                    content = `
                        <div class="service-details">
                            <h4>Hair Cutting Styles</h4>
                            <div class="service-option"><span>Classic Cut</span><span>Rs. 300</span></div>
                            <div class="service-option"><span>Modern Fade</span><span>Rs. 400</span></div>
                            <div class="service-option"><span>Premium Styling</span><span>Rs. 500</span></div>
                            <div class="service-option"><span>Executive Cut</span><span>Rs. 450</span></div>
                            <div class="service-option"><span>Designer Cut</span><span>Rs. 600</span></div>
                            
                            <h4 class="mt-4">Hair Polish</h4>
                            <div class="service-option"><span>Basic Polish</span><span>Rs. 300</span></div>
                            <div class="service-option"><span>Premium Polish</span><span>Rs. 450</span></div>
                            <div class="service-option"><span>Color Polish</span><span>Rs. 500</span></div>
                            <div class="service-option"><span>Deluxe Polish</span><span>Rs. 600</span></div>
                            
                            <h4 class="mt-4">Hair Treatments</h4>
                            <div class="service-option"><span>Hair Straightening</span><span>Rs. 600</span></div>
                            <div class="service-option"><span>Hair Spa</span><span>Rs. 500</span></div>
                            <div class="service-option"><span>Keratin Treatment</span><span>Rs. 800</span></div>
                        </div>
                    `;
                    break;
                    
                case 'beard':
                    title = 'Beard Services';
                    content = `
                        <div class="service-details">
                            <h4>Beard Cutting Styles</h4>
                            <div class="service-option"><span>Basic Trim</span><span>Rs. 200</span></div>
                            <div class="service-option"><span>Designer Beard</span><span>Rs. 350</span></div>
                            <div class="service-option"><span>Royal Styling</span><span>Rs. 450</span></div>
                            <div class="service-option"><span>Executive Beard</span><span>Rs. 400</span></div>
                            <div class="service-option"><span>Full Grooming</span><span>Rs. 500</span></div>
                            
                            <h4 class="mt-4">Beard Treatments</h4>
                            <div class="service-option"><span>Beard Polish</span><span>Rs. 300</span></div>
                            <div class="service-option"><span>Beard Coloring</span><span>Rs. 400</span></div>
                            <div class="service-option"><span>Beard Spa</span><span>Rs. 450</span></div>
                            <div class="service-option"><span>Beard Massage</span><span>Rs. 350</span></div>
                        </div>
                    `;
                    break;
                    
                case 'makeup':
                    title = 'Makeup Services';
                    content = `
                        <div class="service-details">
                            <h4>Makeup Packages</h4>
                            <div class="service-option"><span>Simple Makeup</span><span>Rs. 2,000</span></div>
                            <div class="service-option"><span>Party Makeup</span><span>Rs. 5,000</span></div>
                            <div class="service-option"><span>Bridal Makeup</span><span>Rs. 15,000</span></div>
                            <div class="service-option"><span>Premium Bridal</span><span>Rs. 20,000</span></div>
                            <div class="service-option"><span>Groom Makeup</span><span>Rs. 10,000</span></div>
                            
                            <h4 class="mt-4">Additional Services</h4>
                            <div class="service-option"><span>Hairstyling</span><span>Rs. 3,000</span></div>
                            <div class="service-option"><span>Mehndi Application</span><span>Rs. 2,500</span></div>
                            <div class="service-option"><span>Bridal Dressing</span><span>Rs. 5,000</span></div>
                        </div>
                    `;
                    break;
            }
            
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            serviceModal.show();
        });
    });

    // Book service buttons from pricing cards
    const bookServiceButtons = document.querySelectorAll('.book-service');
    bookServiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            document.getElementById('service').value = service;
            
            // Scroll to booking section
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const notes = document.getElementById('notes').value || 'No special requests';
        
        // Extract service name and price
        const serviceName = service.split(' - ')[0];
        const servicePrice = service.split(' - ')[1];
        
        // Show confirmation alert
        Swal.fire({
            title: 'Booking Confirmed!',
            html: `<p>Dear ${name},</p>
                  <p>Your booking for <strong>${serviceName}</strong> has been confirmed.</p>
                  <p>Total Payment: <strong>${servicePrice}</strong></p>
                  <p>Date: <strong>${date}</strong> at <strong>${time}</strong></p>
                  <small>We'll contact you shortly to confirm your appointment.</small>`,
            icon: 'success',
            confirmButtonColor: 'var(--gold-color)',
            confirmButtonText: 'Great!',
            background: 'var(--white)',
            backdrop: `
                rgba(26, 26, 46, 0.8)
                url("https://i.pinimg.com/originals/8a/02/1a/8a021aa7c8f8f8f1a93a1b0e4e0c0000.gif")
                center top
                no-repeat
            `
        });
        
        // Reset form
        this.reset();
    });

    // Initialize carousels
    $('.gallery-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    $('.testimonial-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    // Initialize animations
    function initAnimations() {
        const animateElements = document.querySelectorAll('.animate__animated');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    initAnimations();

    // Add SweetAlert library
    const sweetAlertScript = document.createElement('script');
    sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    document.head.appendChild(sweetAlertScript);
});