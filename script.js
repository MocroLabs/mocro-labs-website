/* ============================================
   MOCRO LABS - JavaScript
   ============================================ */

// ---- Particles Background ----
function createParticles() {
    const container = document.getElementById('particles');
    const count = 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = (1 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ---- Navbar Scroll Effect ----
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ---- Mobile Menu ----
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ---- Counter Animation ----
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let started = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
}

// ---- Scroll Reveal Animations ----
function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.about-card, .service-card, .script-card, .team-card, .contact-item, .contact-form, .section-header'
    );

    elements.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ---- Active Nav Link on Scroll ----
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = '#ff3333';
            }
        });
    });
}

// ---- Form Handler ----
function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message envoye !';
            btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2500);
        }, 1500);
    });
}

// ---- Smooth Scroll for Anchor Links ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ---- Typing Effect for Code Window ----
function initTypingEffect() {
    const codeBody = document.querySelector('.code-body code');
    if (!codeBody) return;

    const html = codeBody.innerHTML;
    codeBody.innerHTML = '';
    codeBody.style.opacity = '1';

    let i = 0;
    let isTag = false;
    let buffer = '';

    function typeChar() {
        if (i < html.length) {
            const char = html[i];

            if (char === '<') isTag = true;
            if (isTag) {
                buffer += char;
                if (char === '>') {
                    isTag = false;
                    codeBody.innerHTML += buffer;
                    buffer = '';
                }
            } else {
                codeBody.innerHTML += char;
            }

            i++;
            const delay = isTag ? 0 : (char === '\n' ? 80 : 20);
            setTimeout(typeChar, delay);
        }
    }

    setTimeout(typeChar, 1000);
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initNavbar();
    initMobileMenu();
    initCounters();
    initScrollReveal();
    initActiveNav();
    initForm();
    initSmoothScroll();
    initTypingEffect();
});
