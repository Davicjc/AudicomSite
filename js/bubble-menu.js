/**
 * ============================================
 * BUBBLE MENU - Vanilla JS (Versão Inline)
 * ============================================
 * Convertido de React para vanilla JS
 * Versão compacta que aparece dentro do card ao scroll
 */

(function() {
    'use strict';
    
    // Verificar configuração no SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    if (SC.bubbleMenuValores === false) return;
    
    // Configurações
    const CONFIG = {
        animationEase: SC.bubbleMenuAnimationEase || 'back.out(1.5)',
        animationDuration: SC.bubbleMenuAnimationDuration || 0.5,
        staggerDelay: SC.bubbleMenuStaggerDelay || 0.08
    };

    // Itens do menu - Valores da empresa
    const VALORES_ITEMS = [
        {
            label: 'Foco no cliente',
            rotation: -4,
            hoverStyles: { bgColor: '#00249C', textColor: '#ffffff' }
        },
        {
            label: 'Transparência',
            rotation: 3,
            hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
        },
        {
            label: 'Inovação',
            rotation: -2,
            hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
        },
        {
            label: 'Colaboração',
            rotation: 4,
            hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
        },
        {
            label: 'Impacto positivo',
            rotation: -3,
            hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
        }
    ];

    class BubbleValores {
        constructor(container) {
            this.container = container;
            this.items = VALORES_ITEMS;
            this.bubbles = [];
            this.hasAnimated = false;
            
            this.init();
        }
        
        init() {
            this.render();
            this.setupScrollObserver();
        }
        
        render() {
            // Criar container dos pills
            const pillsContainer = document.createElement('div');
            pillsContainer.className = 'valores-pills-inline';
            
            this.items.forEach((item, idx) => {
                const pill = document.createElement('span');
                pill.className = 'valor-pill';
                pill.textContent = item.label;
                pill.style.setProperty('--item-rot', `${item.rotation || 0}deg`);
                pill.style.setProperty('--hover-bg', item.hoverStyles?.bgColor || '#00249C');
                pill.style.setProperty('--hover-color', item.hoverStyles?.textColor || '#ffffff');
                
                // Estado inicial: invisível
                pill.style.opacity = '0';
                pill.style.transform = 'scale(0.5) translateY(20px)';
                
                pillsContainer.appendChild(pill);
                this.bubbles.push(pill);
            });
            
            this.container.appendChild(pillsContainer);
            this.pillsContainer = pillsContainer;
        }
        
        setupScrollObserver() {
            // Usar Intersection Observer para detectar quando o card está visível
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.animateIn();
                        this.hasAnimated = true;
                    }
                });
            }, {
                threshold: 0.3, // Animar quando 30% do card estiver visível
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(this.container);
        }
        
        animateIn() {
            // Verificar se GSAP está disponível
            if (typeof gsap === 'undefined') {
                // Fallback sem GSAP
                this.bubbles.forEach((pill, i) => {
                    setTimeout(() => {
                        pill.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        pill.style.opacity = '1';
                        pill.style.transform = `scale(1) rotate(var(--item-rot))`;
                    }, i * 100);
                });
                return;
            }
            
            // Animação com GSAP
            this.bubbles.forEach((pill, i) => {
                const delay = i * CONFIG.staggerDelay + gsap.utils.random(-0.02, 0.02);
                
                gsap.to(pill, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotation: parseFloat(pill.style.getPropertyValue('--item-rot')) || 0,
                    duration: CONFIG.animationDuration,
                    delay: delay,
                    ease: CONFIG.animationEase
                });
            });
        }
    }

    // Inicializar quando DOM estiver pronto
    function initBubbleValores() {
        const container = document.querySelector('.valores-bubble-container');
        if (!container) return;
        
        new BubbleValores(container);
    }

    // Aguardar DOM e scripts carregarem
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBubbleValores);
    } else {
        setTimeout(initBubbleValores, 100);
    }

    // Exportar para uso global
    window.BubbleValores = BubbleValores;
})();
