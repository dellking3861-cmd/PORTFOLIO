/* ============================================
   script.js - Premium Animations & Interactivity
   ============================================
   Enhanced for Muhammad Wasi | AI-Powered EdTech Entrepreneur
   ============================================ */

// ==========================================
// 0. PRELOADER
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
            }, 500);
        }
        preloaderBar.style.width = progress + '%';
    }, 200);

    // Fallback: hide after 3 seconds max
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloaderBar.style.width = '100%';
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    }, 3000);
})();

// ==========================================
// 0b. TYPEWRITER EFFECT
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

    setTimeout(type, 1500);
})();

// ==========================================
// 1. CURSOR GLOW EFFECT
// ==========================================
(function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.08;
        cursorY += (mouseY - cursorY) * 0.08;
        cursor.style.transform = `translate(${cursorX - cursor.offsetWidth / 2}px, ${cursorY - cursor.offsetHeight / 2}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }

    const interactiveElements = document.querySelectorAll(
        'a, button, .btn, .skill-card, .project-card, .exp-card, .contact-card, .nav-toggle, .timeline-content'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-glow--active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-glow--active'));
    });
})();

// ==========================================
// 2. FLOATING BACKGROUND PARTICLES (Canvas)
// ==========================================
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('scroll', () => {
        const newHeight = document.documentElement.scrollHeight;
        if (Math.abs(canvas.height - newHeight) > 100) {
            canvas.height = newHeight;
        }
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.color = this.getColor();
        }
        getColor() {
            const colors = ['6, 182, 212', '59, 130, 246', '139, 92, 246'];
            return colors[Math.floor(Math.random() * colors.length)];
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

    const particleCount = Math.min(Math.floor(window.innerWidth * 0.04), 60);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => { particle.update(); particle.draw(); });
        drawConnections();
        animationId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    let scrollTimeout = null;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => { canvas.height = document.documentElement.scrollHeight; }, 500);
    });
})();

// ==========================================
// 3. NAVBAR ACTIVE LINK HIGHLIGHT ON SCROLL
// ==========================================
(function initNavHighlighter() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    function updateActiveLink() {
        let currentSection = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-link--active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('nav-link--active');
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { updateActiveLink(); ticking = false; });
            ticking = true;
        }
    });
    window.addEventListener('load', updateActiveLink);
})();

// ==========================================
// 4. NAVBAR SCROLL STATE TRANSITIONS
// ==========================================
(function initNavbarScrollState() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
        if (scrollY > lastScrollY && scrollY > 300) {
            navbar.classList.add('navbar--hidden');
        } else {
            navbar.classList.remove('navbar--hidden');
        }
        lastScrollY = scrollY;
    });
})();

// ==========================================
// 5. ABOUT SECTION - FLOATING IMAGE
// ==========================================
(function initAboutFloat() {
    const aboutImage = document.querySelector('.about-image-wrapper');
    if (!aboutImage) return;
    aboutImage.classList.add('about-image--float');

    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    aboutSection.addEventListener('mousemove', (e) => {
        const rect = aboutSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * 2;
        const rotateY = (x - centerX) / centerX * 2;
        aboutImage.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });

    aboutSection.addEventListener('mouseleave', () => {
        aboutImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
})();

// ==========================================
// 6. SKILL CARDS - PULSE ON HIGH-PROGRESS
// ==========================================
(function initSkillPulse() {
    document.querySelectorAll('.skill-card').forEach(card => {
        const progress = card.querySelector('.skill-progress');
        if (!progress) return;
        const classes = Array.from(progress.classList);
        const progressValue = classes.reduce((val, cls) => {
            const match = cls.match(/progress-(\d+)/);
            return match ? parseInt(match[1]) : val;
        }, 0);
        if (progressValue >= 90) {
            card.classList.add('skill-card--premium');
        }
    });
})();

// ==========================================
// 7. PROJECT CARDS - TILT EFFECT ON HOVER
// ==========================================
(function initProjectTilt() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;
            const glow = card.querySelector('.project-card-glow');
            if (glow) {
                glow.style.transform = `translate(${(x - centerX) * 0.3}px, ${(y - centerY) * 0.3}px)`;
            }
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            const glow = card.querySelector('.project-card-glow');
            if (glow) glow.style.transform = 'translate(0, 0)';
        });
    });
})();

// ==========================================
// 8. EXPERIENCE CARDS - STAGGERED SCROLL REVEAL
// ==========================================
(function initTimelineReveal() {
    const expCards = document.querySelectorAll('.exp-card');
    expCards.forEach((card, index) => {
        if (index % 2 === 0) card.classList.add('exp-card--left');
        else card.classList.add('exp-card--right');
    });

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('exp-card--visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    expCards.forEach(card => cardObserver.observe(card));
})();

// ==========================================
// 9. BUTTONS - GLOW & SCALE EFFECTS
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
// 10. FOOTER - FADE IN ON SCROLL
// ==========================================
(function initFooterReveal() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('footer--visible');
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    footerObserver.observe(footer);
})();

// ==========================================
// 11. SOCIAL ICONS / CONTACT CARDS - SCALE ON HOVER
// ==========================================
(function initContactHover() {
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-card-icon');
            if (icon) icon.style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-card-icon');
            if (icon) icon.style.transform = 'scale(1)';
        });
    });
})();

// ==========================================
// 12. VISION SECTION - TEXT REVEAL
// ==========================================
(function initVisionReveal() {
    const visionQuote = document.querySelector('.vision-quote');
    if (!visionQuote) return;
    const visionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visionQuote.classList.add('vision-quote--reveal');
                visionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    visionObserver.observe(visionQuote);
})();

// ==========================================
// 13. PERFORMANCE OPTIMIZATIONS
// ==========================================
(function initPerformanceOptimizations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.skill-progress').forEach(el => { el.style.transition = 'none'; });
        return;
    }
    const continuousElements = document.querySelectorAll(
        '.gradient-sphere, .gradient-sphere-2, .gradient-sphere-3, .about-image-glow'
    );
    continuousElements.forEach(el => { el.style.willChange = 'transform'; });
    window.addEventListener('beforeunload', () => {
        continuousElements.forEach(el => { el.style.willChange = 'auto'; });
    });
})();

// ==========================================
// 14. EXPERTISE TAGS - STAGGERED REVEAL
// ==========================================
(function initTagsReveal() {
    const expertiseTags = document.querySelector('.expertise-tags');
    if (!expertiseTags) return;
    const tags = expertiseTags.querySelectorAll('span');
    tags.forEach((tag, index) => { tag.style.setProperty('--tag-delay', `${index * 0.05}s`); });
    const tagsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('expertise-tags--visible');
                tagsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    tagsObserver.observe(expertiseTags);
})();

// ==========================================
// 15. STAT COUNTERS - ANIMATE ON SCROLL
// ==========================================
(function initStatCounters() {
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent.trim();
        const numMatch = text.match(/(\d+)/);
        if (numMatch && !stat.dataset.count) {
            stat.dataset.count = numMatch[1];
        }
    });
})();

// ==========================================
// 16. HERO SECTION - SMOOTH ZOOM ON IMAGE
// ==========================================
(function initHeroImageEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const spheres = hero.querySelectorAll('.gradient-sphere, .gradient-sphere-2, .gradient-sphere-3');
        spheres.forEach((sphere, i) => {
            const speed = (i + 1) * 10;
            sphere.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
    hero.addEventListener('mouseleave', () => {
        const spheres = hero.querySelectorAll('.gradient-sphere, .gradient-sphere-2, .gradient-sphere-3');
        spheres.forEach(sphere => { sphere.style.transform = 'translate(0, 0)'; });
    });
})();

// ==========================================
// 17. SCROLL PROGRESS INDICATOR
// ==========================================
(function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
    });
})();

// ==========================================
// 18. HERO BADGE GLOW PULSE
// ==========================================
(function initBadgeGlow() {
    const badge = document.querySelector('.hero-badge');
    if (!badge) return;
    setInterval(() => {
        badge.classList.add('hero-badge--pulse');
        setTimeout(() => { badge.classList.remove('hero-badge--pulse'); }, 1500);
    }, 4000);
})();

// ==========================================
// 19. EXP CARDS - HOVER GLOW ENHANCEMENT
// ==========================================
(function initExpCardGlow() {
    document.querySelectorAll('.exp-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
})();

// ==========================================
// 20. TIMELINE SCROLL REVEAL
// ==========================================
(function initTimelineScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('timeline-visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    timelineItems.forEach(item => timelineObserver.observe(item));
})();

// ==========================================
// 21. SKILLS FILTER
// ==========================================
(function initSkillsFilter() {
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    if (!filterBtns.length || !skillCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;

            skillCards.forEach((card, index) => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
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
// LOG: script.js loaded successfully
// ==========================================
console.log('✅ Premium animations loaded — Muhammad Wasi Portfolio');