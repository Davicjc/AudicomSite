/**
 * AUDICOM TELECOM - Main JavaScript
 * Handles navigation, interactions, and UI enhancements
 */

(function() {
    'use strict';

    // Força scroll para o topo ao carregar a página (evita restauração automática)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // DOM Elements
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mouseBlur = document.getElementById('mouse-blur');

    /**
     * Smooth scroll customizado com controle de duração
     */
    function smoothScrollTo(targetY, duration = 1200) {
        const startY = window.scrollY;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        function easeInOutCubic(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + difference * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }

    /**
     * Smooth scroll to section when clicking nav links
     */
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    smoothScrollTo(offsetTop, 1200);
                }
            });
        });
        
        // Interceptar todos os links âncora da página
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    const offsetTop = targetSection.offsetTop - 80;
                    smoothScrollTo(offsetTop, 1200);
                }
            });
        });
    }

    /**
     * Update active navigation link based on scroll position
     */
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /**
     * Header scroll effect - add background when scrolled
     */
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /**
     * Mouse blur effect - follows cursor
     */
    function initMouseBlur() {
        if (!mouseBlur) return;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        const ease = 0.08;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateBlur() {
            // Smooth interpolation
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            mouseBlur.style.left = `${currentX}px`;
            mouseBlur.style.top = `${currentY}px`;

            requestAnimationFrame(animateBlur);
        }

        animateBlur();
    }

    /**
     * Scroll reveal animation for elements
     */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.plan-card, .feature-item, .city-item, .contact-item');
        
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Set initial state
        revealElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        });

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check
    }

    /**
     * Add hover effects to plan cards
     */
    function initPlanCardEffects() {
        const planCards = document.querySelectorAll('.plan-card');

        planCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                // Create ripple effect on hover
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, rgba(0, 36, 156, 0.1) 0%, transparent 50%);
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                card.appendChild(ripple);
                
                requestAnimationFrame(() => {
                    ripple.style.opacity = '1';
                });

                card.addEventListener('mouseleave', () => {
                    ripple.style.opacity = '0';
                    setTimeout(() => ripple.remove(), 300);
                }, { once: true });
            });
        });
    }

    /**
     * Animate numbers in speed values
     */
    function animateSpeedValues() {
        const speedValues = document.querySelectorAll('.speed-value');
        
        const animateValue = (element, start, end, duration) => {
            const startTime = performance.now();
            
            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (end - start) * easeOut);
                
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };
            
            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const value = parseInt(entry.target.textContent);
                    animateValue(entry.target, 0, value, 1500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        speedValues.forEach(value => observer.observe(value));
    }

    /**
     * Add magnetic effect to buttons
     */
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Parallax effect for hero section
     */
    function initParallax() {
        const heroContent = document.querySelector('.hero-content');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    /**
     * Throttle function for performance
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Apply hero element offsets from SiteConfig
     */
    function applyHeroOffsets() {
        const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
        const root = document.documentElement;
        const heroContent = document.querySelector('.hero-content');
        
        // Offset do título "audicom telecom" (move todo o bloco hero-content)
        if (heroContent && typeof SC.heroTitleOffset === 'number') {
            heroContent.style.marginTop = `${SC.heroTitleOffset}px`;
        }
        
        // Offset do subtítulo "Compromisso inabalável..."
        if (typeof SC.heroSubtitleOffset === 'number') {
            root.style.setProperty('--hero-subtitle-offset', `${SC.heroSubtitleOffset}px`);
        }
        
        // Offset dos botões
        if (typeof SC.heroButtonsOffset === 'number') {
            root.style.setProperty('--hero-buttons-offset', `${SC.heroButtonsOffset}px`);
        }
    }

    /**
     * Initialize all functionality
     */
    function init() {
        initSmoothScroll();
        initMouseBlur();
        initScrollReveal();
        initPlanCardEffects();
        animateSpeedValues();
        initMagneticButtons();
        initParallax();
        applyHeroOffsets();

        // Scroll events with throttling
        const throttledScroll = throttle(() => {
            updateActiveNav();
            handleHeaderScroll();
        }, 100);

        window.addEventListener('scroll', throttledScroll);

        // Initial calls
        updateActiveNav();
        handleHeaderScroll();

        console.log('Audicom Telecom site initialized');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
