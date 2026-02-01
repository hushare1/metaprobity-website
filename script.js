// Metaprobity Website JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            role: document.getElementById('role').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send this to your backend
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your interest! We will contact you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .value-card, .case-card, .price-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Auto-refresh dashboard iframe
function refreshDashboard() {
    const iframe = document.getElementById('dashboard-frame');
    if (iframe) {
        // Check if we're pointing to a live server
        const currentSrc = iframe.src;
        if (currentSrc.includes('localhost') || currentSrc.includes('127.0.0.1')) {
            // Don't force refresh if dashboard has its own auto-refresh
            console.log('Dashboard running at:', currentSrc);
        }
    }
}

// Call on page load
window.addEventListener('load', refreshDashboard);

// Pricing card hover effects
const priceCards = document.querySelectorAll('.price-card');
priceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature card animations
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Dashboard info update (simulated)
function updateDashboardStatus() {
    // This could fetch real status from your API
    const statusElements = document.querySelectorAll('.info-card');
    statusElements.forEach(card => {
        card.style.animation = 'pulse 2s infinite';
    });
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.95;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        // Add hamburger menu for mobile
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--gray-700);
            `;
            
            hamburger.addEventListener('click', function() {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '1rem';
                navMenu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            });
            
            navbar.appendChild(hamburger);
        }
    }
}

window.addEventListener('resize', createMobileMenu);
window.addEventListener('load', createMobileMenu);

// Log website analytics (placeholder)
console.log('Metaprobity GridSense-AI Pro website loaded');
console.log('For support, contact: [email protected]');
