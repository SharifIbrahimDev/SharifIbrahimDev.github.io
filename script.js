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
const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-item');
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
            if(entry.target.classList.contains('project-grid') || entry.target.classList.contains('services-grid')) {
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
document.querySelectorAll('section, .project-card, .service-card, .skill-item, .hero-content, .hero-visual').forEach(el => {
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
    if (window.scrollY > 50) {
        nav.style.padding = '15px 0';
        nav.style.background = 'rgba(5, 5, 5, 0.9)';
    } else {
        nav.style.padding = '25px 0';
        nav.style.background = 'rgba(5, 5, 5, 0.7)';
    }
});
