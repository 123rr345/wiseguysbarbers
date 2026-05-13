document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll-triggered fade-in animations
    const fadeEls = document.querySelectorAll(
        '.section-header, .service-card, .review-card, .about-text-block, .about-hero-image, .contact-card, .gallery-item, .cta-content, .experience-intro, .experience-feature, .about-stats, .footer-brand, .footer-links, .footer-social'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    fadeEls.forEach((el, i) => {
        el.classList.add('fade-in');
        // Stagger elements within the same section
        const parent = el.closest('.section') || el.closest('footer');
        const siblings = parent ? parent.querySelectorAll('.fade-in') : [el];
        const index = Array.from(siblings).indexOf(el);
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
