/**
 * ============================================
 * HAMBURGER NAV - Menu com 3 barras
 * ============================================
 * Menu hambúrguer minimalista com animação
 * Compatível com o estilo Audicom
 */

(function() {
    'use strict';
    
    // Verificar configuração no SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    if (SC.hamburgerNav === false) return;
    
    // Configurações
    const CONFIG = {
        animation: SC.hamburgerNavAnimation !== false,
        position: SC.hamburgerNavPosition || 'right',
        hideOnScroll: SC.hamburgerNavHideOnScroll === true
    };

    document.addEventListener('DOMContentLoaded', function() {
        const nav = document.getElementById('hamburgerNav');
        const toggle = document.getElementById('hamburgerToggle');
        const overlay = document.getElementById('hamburgerOverlay');
        const menuLinks = document.querySelectorAll('.hamburger-menu-link');
        
        if (!nav || !toggle || !overlay) return;
        
        // Aplicar posição
        if (CONFIG.position === 'left') {
            nav.classList.add('hamburger-nav--left');
        }
        
        let isOpen = false;
        
        // Toggle menu
        function toggleMenu() {
            isOpen = !isOpen;
            
            if (isOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        }
        
        // Abrir menu
        function openMenu() {
            toggle.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animar links com stagger
            if (CONFIG.animation && typeof gsap !== 'undefined') {
                gsap.fromTo(menuLinks, 
                    { 
                        opacity: 0, 
                        x: 50 
                    },
                    { 
                        opacity: 1, 
                        x: 0, 
                        duration: 0.4,
                        stagger: 0.08,
                        ease: 'power3.out',
                        delay: 0.2
                    }
                );
            }
        }
        
        // Fechar menu
        function closeMenu() {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            isOpen = false;
        }
        
        // Event listeners
        toggle.addEventListener('click', toggleMenu);
        
        // Fechar ao clicar no overlay
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeMenu();
            }
        });
        
        // Fechar ao clicar em um link
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                closeMenu();
                
                // Smooth scroll após fechar
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.scrollTo) {
                            gsap.to(window, {
                                duration: 1,
                                scrollTo: { y: target, offsetY: 80 },
                                ease: 'power3.inOut'
                            });
                        } else {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 300);
            });
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        });
        
        // Esconder/mostrar nav no scroll (somente se habilitado)
        if (CONFIG.hideOnScroll) {
            let lastScroll = 0;
            let scrollThreshold = 100;
            
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    nav.classList.remove('hamburger-nav--hidden');
                    return;
                }
                
                if (currentScroll > lastScroll && currentScroll > scrollThreshold && !isOpen) {
                    // Scrolling down
                    nav.classList.add('hamburger-nav--hidden');
                } else {
                    // Scrolling up
                    nav.classList.remove('hamburger-nav--hidden');
                }
                
                lastScroll = currentScroll;
            });
        }
    });
})();
