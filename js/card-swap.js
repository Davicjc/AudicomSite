/**
 * AUDICOM TELECOM - Card Swap Animation
 * Cards animados com troca automática (GSAP)
 * Convertido de React para Vanilla JS
 */

(function() {
    'use strict';

    // Verifica se o cardSwap está ativado no SiteConfig
    if (typeof SiteConfig !== 'undefined' && !SiteConfig.cardSwap) {
        return;
    }

    // Lê configurações do SiteConfig ou usa valores padrão
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Detectar mobile
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Configurações responsivas
    const CONFIG = {
        width: isSmallMobile ? 280 : (isMobile ? 320 : (SC.cardSwapWidth || 500)),
        height: isSmallMobile ? 240 : (isMobile ? 260 : (SC.cardSwapHeight || 300)),
        cardDistance: isSmallMobile ? 25 : (isMobile ? 35 : (SC.cardSwapCardDistance || 50)),
        verticalDistance: isSmallMobile ? 30 : (isMobile ? 40 : (SC.cardSwapVerticalDistance || 60)),
        delay: SC.cardSwapDelay || 5000,
        pauseOnHover: SC.cardSwapPauseOnHover || false,
        skewAmount: isMobile ? 4 : (SC.cardSwapSkewAmount || 6),
        easing: SC.cardSwapEasing || 'elastic',
        hitboxEnabled: SC.cardSwapHitboxEnabled !== undefined ? SC.cardSwapHitboxEnabled : true,
        clickToAdvance: SC.cardSwapClickToAdvance !== undefined ? SC.cardSwapClickToAdvance : true,
        // Laser/Borda superior:
        laser: SC.cardSwapLaser !== undefined ? SC.cardSwapLaser : true,
        laserColor: SC.cardSwapLaserColor || '#00249C',
        laserColorSecondary: SC.cardSwapLaserColorSecondary || '#8F99A8',
        laserHeight: SC.cardSwapLaserHeight || 4,
        laserAnimated: SC.cardSwapLaserAnimated !== undefined ? SC.cardSwapLaserAnimated : true,
        laserAnimationSpeed: SC.cardSwapLaserAnimationSpeed || 2,
        // Visual do card:
        background: SC.cardSwapBackground || 'linear-gradient(135deg, #0a1a3a 0%, #081535 100%)',
        border: SC.cardSwapBorder !== undefined ? SC.cardSwapBorder : true,
        borderColor: SC.cardSwapBorderColor || 'rgba(255, 255, 255, 0.1)',
        borderRadius: SC.cardSwapBorderRadius || 16
    };

    // Configuração de easing
    const easingConfig = CONFIG.easing === 'elastic'
        ? {
            ease: 'elastic.out(0.6,0.9)',
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05
        }
        : {
            ease: 'power1.inOut',
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2
        };

    let container, cards, order, intervalId, currentTl, hitbox;

    /**
     * Injeta estilos dinâmicos do laser e visual dos cards
     */
    function injectDynamicStyles() {
        // Remove estilo anterior se existir
        const existingStyle = document.getElementById('card-swap-dynamic-styles');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'card-swap-dynamic-styles';
        
        // Keyframe para animação do laser
        const laserAnimation = CONFIG.laserAnimated ? `
            @keyframes cardSwapLaserShimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
        ` : '';
        
        // Estilo do laser (::before)
        const laserStyle = CONFIG.laser ? `
            .swap-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: ${CONFIG.laserHeight}px;
                background: linear-gradient(90deg, 
                    ${CONFIG.laserColor}, 
                    ${CONFIG.laserColorSecondary}, 
                    ${CONFIG.laserColor});
                background-size: 200% 100%;
                ${CONFIG.laserAnimated ? `animation: cardSwapLaserShimmer ${CONFIG.laserAnimationSpeed}s linear infinite;` : ''}
                z-index: 1;
            }
        ` : `
            .swap-card::before {
                display: none;
            }
        `;
        
        // Estilo do card
        const cardStyle = `
            .swap-card {
                background: ${CONFIG.background};
                border: ${CONFIG.border ? `1px solid ${CONFIG.borderColor}` : 'none'};
                border-radius: ${CONFIG.borderRadius}px;
            }
        `;
        
        style.textContent = laserAnimation + laserStyle + cardStyle;
        document.head.appendChild(style);
    }

    function makeSlot(i, distX, distY, total) {
        return {
            x: i * distX,
            y: -i * distY,
            z: -i * distX * 1.5,
            zIndex: total - i
        };
    }

    /**
     * Cria hitbox invisível para capturar eventos do mouse
     * Resolve o bug de hover nos cantos dos cards
     */
    function createHitbox() {
        if (!CONFIG.hitboxEnabled) return;
        
        hitbox = document.createElement('div');
        hitbox.className = 'card-swap-hitbox';
        
        // Calcular tamanho total incluindo todos os cards empilhados
        const totalWidth = CONFIG.width + (cards.length * CONFIG.cardDistance) + 60;
        const totalHeight = CONFIG.height + (cards.length * CONFIG.verticalDistance) + 60;
        
        hitbox.style.width = totalWidth + 'px';
        hitbox.style.height = totalHeight + 'px';
        
        // Inserir no container
        container.insertBefore(hitbox, container.firstChild);
        
        // Eventos de hover na hitbox
        if (CONFIG.pauseOnHover) {
            hitbox.addEventListener('mouseenter', () => {
                if (currentTl) currentTl.pause();
                clearInterval(intervalId);
            });
            hitbox.addEventListener('mouseleave', () => {
                if (currentTl) currentTl.play();
                intervalId = setInterval(swap, CONFIG.delay);
            });
        }
        
        // Click na hitbox avança o card
        if (CONFIG.clickToAdvance) {
            hitbox.addEventListener('click', () => {
                if (currentTl) currentTl.progress(1);
                clearInterval(intervalId);
                swap();
                intervalId = setInterval(swap, CONFIG.delay);
            });
        }
    }

    function placeNow(el, slot, skew) {
        gsap.set(el, {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            xPercent: -50,
            yPercent: -50,
            skewY: skew,
            transformOrigin: 'center center',
            zIndex: slot.zIndex,
            force3D: true
        });
    }

    function swap() {
        if (order.length < 2) return;

        const [front, ...rest] = order;
        const elFront = cards[front];
        const tl = gsap.timeline();
        currentTl = tl;

        // Drop front card
        tl.to(elFront, {
            y: '+=500',
            duration: easingConfig.durDrop,
            ease: easingConfig.ease
        });

        // Promote remaining cards
        tl.addLabel('promote', `-=${easingConfig.durDrop * easingConfig.promoteOverlap}`);
        rest.forEach((idx, i) => {
            const el = cards[idx];
            const slot = makeSlot(i, CONFIG.cardDistance, CONFIG.verticalDistance, cards.length);
            tl.set(el, { zIndex: slot.zIndex }, 'promote');
            tl.to(el, {
                x: slot.x,
                y: slot.y,
                z: slot.z,
                duration: easingConfig.durMove,
                ease: easingConfig.ease
            }, `promote+=${i * 0.15}`);
        });

        // Return front card to back
        const backSlot = makeSlot(cards.length - 1, CONFIG.cardDistance, CONFIG.verticalDistance, cards.length);
        tl.addLabel('return', `promote+=${easingConfig.durMove * easingConfig.returnDelay}`);
        tl.call(() => {
            gsap.set(elFront, { zIndex: backSlot.zIndex });
        }, undefined, 'return');
        tl.to(elFront, {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            duration: easingConfig.durReturn,
            ease: easingConfig.ease
        }, 'return');

        // Update order
        tl.call(() => {
            order = [...rest, front];
        });
    }

    function init() {
        container = document.querySelector('.card-swap-container');
        if (!container) return;

        // Verificar se GSAP está disponível
        if (typeof gsap === 'undefined') {
            console.warn('CardSwap: GSAP não encontrado');
            return;
        }

        // Injetar estilos dinâmicos do laser e visual
        injectDynamicStyles();

        cards = Array.from(container.querySelectorAll('.swap-card'));
        if (cards.length === 0) return;

        order = Array.from({ length: cards.length }, (_, i) => i);

        // Aplicar tamanho aos cards
        cards.forEach((card, i) => {
            card.style.width = CONFIG.width + 'px';
            card.style.height = CONFIG.height + 'px';
            placeNow(card, makeSlot(i, CONFIG.cardDistance, CONFIG.verticalDistance, cards.length), CONFIG.skewAmount);
        });

        // Aplicar tamanho ao container
        container.style.width = CONFIG.width + 'px';
        container.style.height = CONFIG.height + 'px';

        // Criar hitbox invisível para capturar hover
        createHitbox();

        // Iniciar animação
        swap();
        intervalId = setInterval(swap, CONFIG.delay);

        // Botão de navegação manual
        const nextBtn = document.getElementById('card-swap-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                // Parar animação atual e intervalo
                if (currentTl) currentTl.progress(1);
                clearInterval(intervalId);
                
                // Executar swap
                swap();
                
                // Reiniciar intervalo
                intervalId = setInterval(swap, CONFIG.delay);
            });
        }

        console.log('✅ CardSwap inicializado com hitbox!');
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
