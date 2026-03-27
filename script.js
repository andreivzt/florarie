// DOM Elements
const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const cursorGlow = document.querySelector('.cursor-glow');

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Custom Cursor Glow effect (runs only on non-touch devices)
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;

        // Enhance glow when hovering over interactive elements
        const target = e.target;
        if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
            cursorGlow.style.opacity = '0.8';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(240, 142, 165, 0.5) 0%, transparent 60%)';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
        } else {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(240, 142, 165, 0.3) 0%, transparent 70%)';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
} else {
    // Hide totally on mobile
    cursorGlow.style.display = 'none';
}

// Intersection Observer for Scroll Animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optional: Stop observing after animation triggers once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    const elementsToAnimate = document.querySelectorAll('.fade-up, .fade-in, .fade-left, .fade-right');
    elementsToAnimate.forEach(el => observer.observe(el));
};

// Start observe after DOM load
document.addEventListener('DOMContentLoaded', () => {
    observeElements();

    // Simulate image loading for hero section
    const bgImgUrl = 'hero_bg.webp'; // We will map the generated image here

    // Form submission - Redirect to WhatsApp
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Format WhatsApp text
            const waNumber = '40770141977';
            const waText = `Bună ziua! Mă numesc ${name} (${phone}). Vă scriu de pe site:%0A%0A${message}`;
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText).replace(/%250A/g, '%0A')}`;

            // Change button visual state temporarily
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Se redirecționează...';
            btn.style.opacity = '0.7';

            // Open WhatsApp in a new tab
            window.open(waUrl, '_blank');

            // Reset form and button after a short delay
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.opacity = '1';
            }, 2000);
        });
    }
});
