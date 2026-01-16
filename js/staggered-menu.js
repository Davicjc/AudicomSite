/**
 * AUDICOM TELECOM - Staggered Menu
 * Menu animado com GSAP
 */

(function() {
    'use strict';

    // Verifica se o staggeredMenu está ativado no SiteConfig
    if (typeof SiteConfig !== 'undefined' && SiteConfig.staggeredMenu === false) {
        return;
    }

    // Aguarda o DOM carregar
    document.addEventListener('DOMContentLoaded', function() {
        
        // ========== ELEMENTOS ==========
        const wrapper = document.querySelector('.staggered-menu-wrapper');
        const toggle = document.querySelector('.sm-toggle');
        const panel = document.querySelector('.staggered-menu-panel');
        const prelayer1 = document.querySelector('.sm-prelayer-1');
        const prelayer2 = document.querySelector('.sm-prelayer-2');
        const menuItems = document.querySelectorAll('.sm-panel-item');
        const socialsTitle = document.querySelector('.sm-socials-title');
        const socialLinks = document.querySelectorAll('.sm-socials-link');
        const toggleTextInner = document.querySelector('.sm-toggle-textInner');
        const iconLine1 = document.querySelector('.sm-icon-line-1');
        const iconLine2 = document.querySelector('.sm-icon-line-2');
        const logo = document.querySelector('.sm-logo-img');

        if (!wrapper || !toggle || !panel) return;

        // ========== ESTADO ==========
        let menuState = {
            isOpen: false,
            isAnimating: false
        };

        // ========== CORES (Paleta Oficial Audicom) ==========
        const colors = {
            accent: '#00249C',      // Azul Conexão
            prelayer1: '#8F99A8',   // Cinza Operacional
            prelayer2: '#2A2F36'    // Grafite Infra
        };

        document.documentElement.style.setProperty('--sm-accent', colors.accent);

        // ========== ESTADO INICIAL ==========
        gsap.set(panel, { xPercent: 100, visibility: 'hidden' });
        gsap.set(prelayer1, { xPercent: 100, backgroundColor: colors.prelayer1 });
        gsap.set(prelayer2, { xPercent: 100, backgroundColor: colors.prelayer2 });
        gsap.set(menuItems, { yPercent: 100, opacity: 0 });
        gsap.set([socialsTitle, socialLinks], { yPercent: 50, opacity: 0 });
        gsap.set('.sm-panel-itemWrap', { overflow: 'hidden' });

        // ========== FUNÇÕES ==========
        
        function openMenu() {
            if (menuState.isAnimating || menuState.isOpen) return;
            
            menuState.isAnimating = true;
            menuState.isOpen = true;

            wrapper.setAttribute('data-open', '');
            toggle.setAttribute('aria-expanded', 'true');
            panel.setAttribute('aria-hidden', 'false');

            const tl = gsap.timeline({
                onComplete: function() { menuState.isAnimating = false; }
            });

            // Texto e ícone do toggle
            tl.to(toggleTextInner, { y: '-1em', duration: 0.3, ease: 'power2.inOut' }, 0);
            tl.to(iconLine1, { rotation: 45, y: 0, duration: 0.3, ease: 'power2.inOut' }, 0);
            tl.to(iconLine2, { rotation: -45, y: 0, duration: 0.3, ease: 'power2.inOut' }, 0);
            tl.to(toggle, { color: '#081535', duration: 0.3 }, 0.2);
            tl.to(logo, { filter: 'invert(1)', duration: 0.3 }, 0.2);

            // Camadas de fundo
            tl.to(prelayer1, { xPercent: 0, duration: 0.5, ease: 'power3.inOut' }, 0);
            tl.to(prelayer2, { xPercent: 0, duration: 0.5, ease: 'power3.inOut' }, 0.08);

            // Painel
            tl.set(panel, { visibility: 'visible' }, 0.15);
            tl.to(panel, { xPercent: 0, duration: 0.5, ease: 'power3.inOut' }, 0.15);

            // Itens do menu
            tl.to(menuItems, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 0.4);
            tl.to(document.documentElement, { '--sm-num-opacity': 1, duration: 0.3 }, 0.6);

            // Redes sociais
            tl.to(socialsTitle, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.7);
            tl.to(socialLinks, { yPercent: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0.75);
        }

        function closeMenu(callback) {
            if (menuState.isAnimating || !menuState.isOpen) return;
            
            menuState.isAnimating = true;
            menuState.isOpen = false;

            wrapper.removeAttribute('data-open');
            toggle.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');

            const tl = gsap.timeline({
                onComplete: function() {
                    menuState.isAnimating = false;
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });

            // Esconde elementos
            tl.to(document.documentElement, { '--sm-num-opacity': 0, duration: 0.2 }, 0);
            tl.to([socialLinks, socialsTitle], { yPercent: 50, opacity: 0, duration: 0.3, stagger: 0.03, ease: 'power2.in' }, 0);
            tl.to(menuItems, { yPercent: 100, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power3.in' }, 0.1);

            // Painel e camadas
            tl.to(panel, { xPercent: 100, duration: 0.5, ease: 'power3.inOut' }, 0.3);
            tl.set(panel, { visibility: 'hidden' }, 0.8);
            tl.to(prelayer2, { xPercent: 100, duration: 0.5, ease: 'power3.inOut' }, 0.35);
            tl.to(prelayer1, { xPercent: 100, duration: 0.5, ease: 'power3.inOut' }, 0.4);

            // Toggle
            tl.to(toggleTextInner, { y: 0, duration: 0.3, ease: 'power2.inOut' }, 0.3);
            tl.to(iconLine1, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' }, 0.3);
            tl.to(iconLine2, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' }, 0.3);
            tl.to(toggle, { color: '#F4F6F9', duration: 0.3 }, 0.4);
            tl.to(logo, { filter: 'invert(0)', duration: 0.3 }, 0.4);
        }

        function scrollToSection(href) {
            if (!href || !href.startsWith('#')) return;
            
            const target = document.querySelector(href);
            if (!target) return;

            const targetY = target.getBoundingClientRect().top + window.pageYOffset;
            const startY = window.pageYOffset;
            const diff = targetY - startY;
            const duration = 1200;
            const startTime = performance.now();

            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startY + diff * ease);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
        }

        // ========== EVENT LISTENERS ==========

        // Botão toggle (abre/fecha)
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (menuState.isAnimating) return;
            
            if (menuState.isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Itens do menu - usando event delegation no painel
        panel.addEventListener('click', function(e) {
            // Encontra o item do menu clicado (ou seu pai)
            const menuItem = e.target.closest('.sm-panel-item');
            
            if (!menuItem) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            if (menuState.isAnimating) return;
            if (!menuState.isOpen) return;
            
            const href = menuItem.getAttribute('href');
            
            closeMenu(function() {
                scrollToSection(href);
            });
        });

        // Fechar com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuState.isOpen && !menuState.isAnimating) {
                closeMenu();
            }
        });

        // Efeito hover nos itens (se ativado)
        if (typeof SiteConfig === 'undefined' || SiteConfig.staggeredMenuHoverGrow !== false) {
            menuItems.forEach(function(item) {
                const label = item.querySelector('.sm-panel-itemLabel');
                if (!label) return;

                item.addEventListener('mouseenter', function() {
                    gsap.to(label, { scale: 1.08, x: 15, duration: 0.3, ease: 'power2.out' });
                });

                item.addEventListener('mouseleave', function() {
                    gsap.to(label, { scale: 1, x: 0, duration: 0.3, ease: 'power2.out' });
                });
            });
        }

        console.log('✅ Staggered Menu inicializado!');
    });
})();
