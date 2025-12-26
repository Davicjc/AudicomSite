/**
 * AUDICOM TELECOM - PillNav
 * Menu animado estilo pill com GSAP
 * Convertido de React para Vanilla JS
 */

(function() {
    'use strict';

    // Verifica configuração
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    if (SC.pillNav === false) return;

    // Configurações
    const CONFIG = {
        ease: 'power3.out',
        baseColor: '#081535',        // Azul Estrutura
        pillColor: '#F4F6F9',         // Branco Técnico
        hoveredPillTextColor: '#F4F6F9', // Branco Técnico
        pillTextColor: '#081535',     // Azul Estrutura
        initialLoadAnimation: true
    };

    // Items do menu
    const menuItems = [
        { label: 'Home', href: '#home' },
        { label: 'Produtos', href: '#produtos' },
        { label: 'Sobre', href: '#sobre' },
        { label: 'Cobertura', href: '#cobertura' },
        { label: 'Contato', href: '#contato' }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        const nav = document.querySelector('.pill-nav');
        if (!nav) return;

        // Elementos
        const logoImg = nav.querySelector('.pill-logo img');
        const logoLink = nav.querySelector('.pill-logo');
        const navItems = nav.querySelector('.pill-nav-items');
        const pills = nav.querySelectorAll('.pill');
        const hamburger = nav.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu-popover');

        // Estado
        let isMobileMenuOpen = false;

        // Arrays para animações
        const circleRefs = [];
        const tlRefs = [];
        const activeTweenRefs = [];
        let logoTween = null;

        // Pegar círculos
        pills.forEach((pill, i) => {
            const circle = pill.querySelector('.hover-circle');
            circleRefs[i] = circle;
        });

        // Função de layout - calcula geometria dos círculos
        function layout() {
            circleRefs.forEach((circle, index) => {
                if (!circle || !circle.parentElement) return;

                const pill = circle.parentElement;
                const rect = pill.getBoundingClientRect();
                const w = rect.width;
                const h = rect.height;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector('.pill-label');
                const white = pill.querySelector('.pill-label-hover');

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                // Matar timeline anterior
                if (tlRefs[index]) tlRefs[index].kill();

                // Criar nova timeline
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, { 
                    scale: 1.2, 
                    xPercent: -50, 
                    duration: 2, 
                    ease: CONFIG.ease, 
                    overwrite: 'auto' 
                }, 0);

                if (label) {
                    tl.to(label, { 
                        y: -(h + 8), 
                        duration: 2, 
                        ease: CONFIG.ease, 
                        overwrite: 'auto' 
                    }, 0);
                }

                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(white, { 
                        y: 0, 
                        opacity: 1, 
                        duration: 2, 
                        ease: CONFIG.ease, 
                        overwrite: 'auto' 
                    }, 0);
                }

                tlRefs[index] = tl;
            });
        }

        // Inicializar layout
        layout();

        // Resize handler
        window.addEventListener('resize', layout);

        // Fonts ready
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(layout).catch(() => {});
        }

        // Configurar menu mobile
        if (mobileMenu) {
            gsap.set(mobileMenu, { visibility: 'hidden', opacity: 0, y: 10 });
        }

        // Animação inicial
        if (CONFIG.initialLoadAnimation) {
            if (logoLink) {
                gsap.set(logoLink, { scale: 0 });
                gsap.to(logoLink, {
                    scale: 1,
                    duration: 0.6,
                    ease: CONFIG.ease
                });
            }

            if (navItems) {
                gsap.set(navItems, { width: 0, overflow: 'hidden' });
                gsap.to(navItems, {
                    width: 'auto',
                    duration: 0.6,
                    ease: CONFIG.ease
                });
            }
        }

        // ============================================
        // TOOLTIPS VERTICAIS (todos aparecem juntos)
        // ============================================
        const tooltips = [];
        
        // Criar um tooltip para cada pill
        pills.forEach((pill, i) => {
            const label = pill.getAttribute('aria-label');
            if (!label) return;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'pill-tooltip';
            tooltip.textContent = label;
            document.body.appendChild(tooltip);
            tooltips[i] = tooltip;
        });
        
        function positionAllTooltips() {
            pills.forEach((pill, i) => {
                if (!tooltips[i]) return;
                const rect = pill.getBoundingClientRect();
                const tooltipX = rect.left + rect.width / 2;
                const tooltipY = rect.bottom + 8;
                tooltips[i].style.left = tooltipX + 'px';
                tooltips[i].style.top = tooltipY + 'px';
                tooltips[i].style.transform = 'translateX(-50%)';
            });
        }
        
        function showAllTooltips() {
            positionAllTooltips();
            tooltips.forEach(t => t && t.classList.add('visible'));
        }
        
        function hideAllTooltips() {
            tooltips.forEach(t => {
                if (t) {
                    t.classList.remove('visible');
                    t.classList.remove('active');
                }
            });
        }
        
        function highlightTooltip(index) {
            tooltips.forEach((t, i) => {
                if (t) {
                    if (i === index) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                }
            });
        }
        
        // Mostrar todos quando hover em qualquer pill
        let navHoverTimeout = null;

        // Hover handlers para pills (apenas um expande por vez, com debounce anti-flicker)
        const leaveTimeouts = [];
        
        pills.forEach((pill, i) => {
            pill.addEventListener('mouseenter', () => {
                // Mostrar TODOS os tooltips e destacar o atual
                if (navHoverTimeout) clearTimeout(navHoverTimeout);
                showAllTooltips();
                highlightTooltip(i);
                
                // Cancelar timeout de saída deste pill
                if (leaveTimeouts[i]) {
                    clearTimeout(leaveTimeouts[i]);
                    leaveTimeouts[i] = null;
                }
                
                // Fechar todos os outros pills primeiro
                pills.forEach((otherPill, j) => {
                    if (j !== i) {
                        // Cancelar timeout do outro também
                        if (leaveTimeouts[j]) {
                            clearTimeout(leaveTimeouts[j]);
                            leaveTimeouts[j] = null;
                        }
                        const otherTl = tlRefs[j];
                        if (otherTl) {
                            if (activeTweenRefs[j]) activeTweenRefs[j].kill();
                            activeTweenRefs[j] = otherTl.tweenTo(0, {
                                duration: 0.15,
                                ease: CONFIG.ease,
                                overwrite: 'auto'
                            });
                        }
                    }
                });
                
                // Expandir este pill
                const tl = tlRefs[i];
                if (!tl) return;
                if (activeTweenRefs[i]) activeTweenRefs[i].kill();
                activeTweenRefs[i] = tl.tweenTo(tl.duration(), {
                    duration: 0.3,
                    ease: CONFIG.ease,
                    overwrite: 'auto'
                });
            });

            pill.addEventListener('mouseleave', () => {
                // Delay antes de esconder todos os tooltips
                navHoverTimeout = setTimeout(() => {
                    hideAllTooltips();
                }, 100);
                
                // Delay antes de fechar para evitar flickering
                leaveTimeouts[i] = setTimeout(() => {
                    const tl = tlRefs[i];
                    if (!tl) return;
                    if (activeTweenRefs[i]) activeTweenRefs[i].kill();
                    activeTweenRefs[i] = tl.tweenTo(0, {
                        duration: 0.2,
                        ease: CONFIG.ease,
                        overwrite: 'auto'
                    });
                }, 80); // 80ms de delay anti-flicker
            });
        });
        
        // Atualizar posição ao rolar a página
        window.addEventListener('scroll', () => {
            if (tooltips.some(t => t && t.classList.contains('visible'))) {
                positionAllTooltips();
            }
        });

        // Logo hover - rotação
        if (logoLink) {
            logoLink.addEventListener('mouseenter', () => {
                if (!logoImg) return;
                if (logoTween) logoTween.kill();
                gsap.set(logoImg, { rotate: 0 });
                logoTween = gsap.to(logoImg, {
                    rotate: 360,
                    duration: 0.4,
                    ease: CONFIG.ease,
                    overwrite: 'auto'
                });
            });
        }

        // Toggle menu mobile
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }

        function toggleMobileMenu() {
            isMobileMenuOpen = !isMobileMenuOpen;

            const lines = hamburger.querySelectorAll('.hamburger-line');
            
            if (isMobileMenuOpen) {
                // Animar hamburger para X
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease: CONFIG.ease });
                gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease: CONFIG.ease });

                // Mostrar menu
                if (mobileMenu) {
                    gsap.set(mobileMenu, { visibility: 'visible' });
                    gsap.fromTo(mobileMenu,
                        { opacity: 0, y: 10 },
                        { opacity: 1, y: 0, duration: 0.3, ease: CONFIG.ease }
                    );
                }
            } else {
                // Animar X para hamburger
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: CONFIG.ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: CONFIG.ease });

                // Esconder menu
                if (mobileMenu) {
                    gsap.to(mobileMenu, {
                        opacity: 0,
                        y: 10,
                        duration: 0.2,
                        ease: CONFIG.ease,
                        onComplete: () => {
                            gsap.set(mobileMenu, { visibility: 'hidden' });
                        }
                    });
                }
            }
        }

        // Fechar menu mobile ao clicar em link
        const mobileLinks = document.querySelectorAll('.mobile-menu-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMobileMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });

        // Smooth scroll para links internos
        const allNavLinks = document.querySelectorAll('.pill, .mobile-menu-link, .pill-logo');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        gsap.to(window, {
                            duration: 1,
                            scrollTo: { y: target, offsetY: 80 },
                            ease: 'power2.inOut'
                        });
                    }
                }
            });
        });
    });
})();
