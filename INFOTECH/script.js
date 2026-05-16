/* 
    Project: Compliance for Research Analysts
    Description: Production-quality Vanilla JS for advanced UI interactions.
*/

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');
    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('#nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 1. Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 2. Scroll-Spy: Highlight active link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // 3. Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate bars
            const bars = menuToggle.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // 4. Scroll Reveal Animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-padding, .hero-container, .features-grid, .pricing-grid, .blog-grid, .contact-wrapper').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 5. Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Create notification element if it doesn't exist
            let notification = document.querySelector('.form-notification');
            if (!notification) {
                notification = document.createElement('div');
                notification.className = 'form-notification';
                notification.innerHTML = 'Message sent successfully! We\'ll get back to you soon.';
                document.body.appendChild(notification);
            }
            
            // Show notification
            setTimeout(() => notification.classList.add('show'), 100);
            
            // Reset form
            contactForm.reset();
            
            // Hide notification after 4 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        });
    }
});
