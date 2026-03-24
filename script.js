// Custom Cursor Follower Enhanced
const cursor = document.querySelector('.cursor-follower');
let cursorActive = false;

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    if (!cursorActive) {
        cursor.style.opacity = '1';
        cursorActive = true;
    }
});

// Cursor Interactions
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .service-card, .skill-item, .testimonial-card, .stats-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-large');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-large');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Sequential animation for cards if needed
            const gridClasses = ['project-grid', 'services-grid', 'stats-container', 'testimonials-grid', 'skill-cloud'];
            if (gridClasses.some(cls => entry.target.classList.contains(cls))) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('section, .project-card, .service-card, .skill-item, .testimonial-card, .stats-card, .hero-content, .hero-visual, .form-container').forEach(el => {
    el.classList.add('reveal-item');
    observer.observe(el);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Navbar opacity
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    // Navbar effect
    if (window.scrollY > 50) {
        nav.style.padding = '15px 0';
        nav.style.background = 'rgba(5, 5, 5, 0.9)';
    } else {
        nav.style.padding = '25px 0';
        nav.style.background = 'rgba(5, 5, 5, 0.7)';
    }

    // Scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Prevent scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Force PDF viewing on live site
const cvLink = document.querySelector('.resume-btn');
if (cvLink) {
    cvLink.addEventListener('click', (e) => {
        const isLive = window.location.hostname.includes('github.io');
        if (isLive) {
            e.preventDefault();
            const pdfUrl = window.location.origin + window.location.pathname.replace(/\/$/, '') + '/resume.pdf';
            const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
            window.open(viewerUrl, '_blank');
        }
    });
}
