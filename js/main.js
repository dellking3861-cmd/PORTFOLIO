/* ============================================
   main.js - Optimized Portfolio Script
   Merged from main.js + script.js with performance improvements
   ============================================ */

// ==========================================
// 0. PRELOADER - Simplified
// ==========================================
(function initPreloader() {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloaderBar');
    if (!preloader || !preloaderBar) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            preloaderBar.style.width = '100%';
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
        preloaderBar.style.width = progress + '%';
    }, 150);

    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloaderBar.style.width = '100%';
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 200);
        }
    }, 2500);
})();

// ==========================================
// 0b. TYPEWRITER EFFECT - Delayed start
// ==========================================
(function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const phrases = [
        'AI-powered SaaS tools',
        'intelligent EdTech platforms',
        'automated learning systems',
        'the future of education'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isPaused) {
            setTimeout(type, 2000);
            isPaused = false;
            isDeleting = true;
            return;
        }
        if (!isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isPaused = true;
                setTimeout(type, 2500);
                return;
            }
            setTimeout(type, 60 + Math.random() * 40);
        } else {
            el.textContent = currentPhrase.substring(0, charIndex);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                charIndex = 0;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
                return;
            }
            setTimeout(type, 30 + Math.random() * 20);
        }
    }
    setTimeout(type, 2000);
})();

// ==========================================
// 1. MOBILE DETECTION
// ==========================================
const isMobile = 'ontouchstart' in window || window.innerWidth < 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==========================================
// 2. CURSOR GLOW - Desktop only
// ==========================================
(function initCursorGlow() {
    if (isMobile || prefersReducedMotion) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.08;
        cursorY += (mouseY - cursorY) * 0.08;
        cursor.style.transform = `translate(${cursorX - cursor.offsetWidth / 2}px, ${cursorY - cursor.offsetHeight / 2}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .exp-card, .contact-card, .nav-toggle, .timeline-content').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-glow--active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-glow--active'));
    });
})();

// ==========================================
// 3. FLOATING BACKGROUND PARTICLES - Desktop only
// ==========================================
(function initParticles() {
    if (isMobile || prefersReducedMotion) return;

    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let isVisible = true;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
    }
    resizeCanvas();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 200);
    }, { passive: true });

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.3 + 0.05;
            const colors = ['6, 182, 212', '59, 130, 246', '139, 92, 246'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    const particleCount = Math.min(Math.floor(window.innerWidth * 0.025), 40);
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - distance / 100) * 0.1})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        if (!isVisible) { animationId = requestAnimationFrame(animateParticles); return; }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animationId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    document.addEventListener('visibilitychange', () => { isVisible = !document.hidden; });
})();

// ==========================================
// 4. NAVBAR - Combined scroll state + active link
// ==========================================
(function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    if (!navbar) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        if (scrollY > 80) navbar.classList.add('navbar--scrolled');
        else navbar.classList.remove('navbar--scrolled');

        if (scrollY > lastScrollY && scrollY > 300) navbar.classList.add('navbar--hidden');
        else navbar.classList.remove('navbar--hidden');
        lastScrollY = scrollY;

        if (navLinks.length && sections.length) {
            let currentSection = '';
            const scrollPos = scrollY + 120;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('nav-link--active');
                if (link.getAttribute('href') === `#${currentSection}`) link.classList.add('nav-link--active');
            });
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(updateNavbar); ticking = true; }
    }, { passive: true });
    window.addEventListener('load', updateNavbar);
})();

// ==========================================
// 5. MOBILE NAVIGATION TOGGLE
// ==========================================
(function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
})();

// ==========================================
// 6. INTERSECTION OBSERVER - Single observer
// ==========================================
(function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('hero-stats')) {
                    entry.target.querySelectorAll('.stat-number').forEach(stat => {
                        if (stat.dataset.count) animateCounter(stat);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
    document.querySelectorAll('.skills-grid, .experience-grid, .projects-grid, .contact-channels').forEach(g => observer.observe(g));

    window.addEventListener('load', () => {
        const hero = document.querySelector('.hero');
        if (hero) setTimeout(() => hero.classList.add('visible'), 100);
    });
})();

// ==========================================
// 7. ANIMATED COUNTER
// ==========================================
function animateCounter(element) {
    const text = element.textContent;
    const count = parseInt(text);
    if (isNaN(count)) return;
    const duration = 1500;
    const startTime = performance.now();
    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.floor(0 + (count - 0) * eased) + '+';
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ==========================================
// 8. STAT COUNTERS - Initialize
// ==========================================
(function initStatCounters() {
    document.querySelectorAll('.hero-stats .stat-number').forEach(stat => {
        const match = stat.textContent.trim().match(/(\d+)/);
        if (match && !stat.dataset.count) stat.dataset.count = match[1];
    });
})();

// ==========================================
// 9. SCROLL PROGRESS INDICATOR
// ==========================================
(function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
                bar.style.transform = `scaleX(${pct})`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

// ==========================================
// 10. TIMELINE SCROLL REVEAL
// ==========================================
(function initTimelineScroll() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('timeline-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    items.forEach(item => obs.observe(item));
})();

// ==========================================
// 11. SKILLS FILTER
// ==========================================
(function initSkillsFilter() {
    const btns = document.querySelectorAll('.skill-filter-btn');
    const cards = document.querySelectorAll('.skill-card');
    if (!btns.length || !cards.length) return;
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            cards.forEach((card, i) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0) scale(1)'; }, i * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px) scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
})();

// ==========================================
// 12. SKILL CARDS - PULSE ON HIGH-PROGRESS
// ==========================================
(function initSkillPulse() {
    document.querySelectorAll('.skill-card').forEach(card => {
        const progress = card.querySelector('.skill-progress');
        if (!progress) return;
        const val = Array.from(progress.classList).reduce((v, cls) => {
            const m = cls.match(/progress-(\d+)/);
            return m ? parseInt(m[1]) : v;
        }, 0);
        if (val >= 90) card.classList.add('skill-card--premium');
    });
})();

// ==========================================
// 13. PROJECT CARDS - TILT (Desktop only)
// ==========================================
(function initProjectTilt() {
    if (isMobile) return;
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const cx = rect.width / 2, cy = rect.height / 2;
            const glow = card.querySelector('.project-card-glow');
            if (glow) glow.style.transform = `translate(${(x - cx) * 0.3}px, ${(y - cy) * 0.3}px)`;
            card.style.transform = `perspective(1000px) rotateX(${(y - cy) / cy * -8}deg) rotateY(${(x - cx) / cx * 8}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            const glow = card.querySelector('.project-card-glow');
            if (glow) glow.style.transform = 'translate(0, 0)';
        });
    });
})();

// ==========================================
// 14. EXPERIENCE CARDS - STAGGERED REVEAL
// ==========================================
(function initExpReveal() {
    const cards = document.querySelectorAll('.exp-card');
    cards.forEach((c, i) => c.classList.add(i % 2 === 0 ? 'exp-card--left' : 'exp-card--right'));
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('exp-card--visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    cards.forEach(c => obs.observe(c));
})();

// ==========================================
// 15. BUTTONS - RIPPLE EFFECT
// ==========================================
(function initButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() { this.classList.add('btn--hover'); });
        btn.addEventListener('mouseleave', function() { this.classList.remove('btn--hover'); });
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
})();

// ==========================================
// 16. FOOTER - FADE IN
// ==========================================
(function initFooterReveal() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('footer--visible'); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.15 });
    obs.observe(footer);
})();

// ==========================================
// 17. CONTACT CARDS - HOVER SCALE
// ==========================================
(function initContactHover() {
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() { const i = this.querySelector('.contact-card-icon'); if (i) i.style.transform = 'scale(1.1)'; });
        card.addEventListener('mouseleave', function() { const i = this.querySelector('.contact-card-icon'); if (i) i.style.transform = 'scale(1)'; });
    });
})();

// ==========================================
// 18. VISION QUOTE REVEAL
// ==========================================
(function initVisionReveal() {
    const q = document.querySelector('.vision-quote');
    if (!q) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { q.classList.add('vision-quote--reveal'); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.3 });
    obs.observe(q);
})();

// ==========================================
// 19. EXPERTISE TAGS REVEAL
// ==========================================
(function initTagsReveal() {
    const container = document.querySelector('.expertise-tags');
    if (!container) return;
    container.querySelectorAll('span').forEach((tag, i) => tag.style.setProperty('--tag-delay', `${i * 0.05}s`));
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('expertise-tags--visible'); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.3 });
    obs.observe(container);
})();

// ==========================================
// 20. HERO PARALLAX (Desktop only)
// ==========================================
(function initHeroParallax() {
    if (isMobile) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        hero.querySelectorAll('.gradient-sphere, .gradient-sphere-2, .gradient-sphere-3').forEach((s, i) => {
            s.style.transform = `translate(${x * (i + 1) * 10}px, ${y * (i + 1) * 10}px)`;
        });
    });
    hero.addEventListener('mouseleave', () => {
        hero.querySelectorAll('.gradient-sphere, .gradient-sphere-2, .gradient-sphere-3').forEach(s => { s.style.transform = 'translate(0, 0)'; });
    });
})();

// ==========================================
// 21. BADGE GLOW PULSE
// ==========================================
(function initBadgeGlow() {
    const badge = document.querySelector('.hero-badge');
    if (!badge) return;
    setInterval(() => {
        badge.classList.add('hero-badge--pulse');
        setTimeout(() => badge.classList.remove('hero-badge--pulse'), 1500);
    }, 4000);
})();

// ==========================================
// 22. EXP CARD GLOW (Desktop only)
// ==========================================
(function initExpCardGlow() {
    if (isMobile) return;
    document.querySelectorAll('.exp-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
})();

// ==========================================
// 23. ABOUT IMAGE PARALLAX (Desktop only)
// ==========================================
(function initAboutFloat() {
    if (isMobile) return;
    const img = document.querySelector('.about-image-wrapper');
    const section = document.querySelector('.about');
    if (!img || !section) return;
    img.classList.add('about-image--float');
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    section.addEventListener('mouseleave', () => { img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'; });
})();

// ==========================================
// 24. PERFORMANCE OPTIMIZATIONS
// ==========================================
(function initPerformanceOptimizations() {
    if (prefersReducedMotion) {
        document.querySelectorAll('.skill-progress').forEach(el => el.style.transition = 'none');
        return;
    }
    document.querySelectorAll('.gradient-sphere, .gradient-sphere-2, .gradient-sphere-3, .about-image-glow').forEach(el => el.style.willChange = 'transform');
})();

console.log('✅ Portfolio optimized — Muhammad Wasi');