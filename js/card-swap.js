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
        easing: SC.cardSwapEasing || 'elastic'
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

    let container, cards, order, intervalId, currentTl;

    function makeSlot(i, distX, distY, total) {
        return {
            x: i * distX,
            y: -i * distY,
            z: -i * distX * 1.5,
            zIndex: total - i
        };
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

        // Iniciar animação
        swap();
        intervalId = setInterval(swap, CONFIG.delay);

        // Pause on hover
        if (CONFIG.pauseOnHover) {
            container.addEventListener('mouseenter', () => {
                if (currentTl) currentTl.pause();
                clearInterval(intervalId);
            });
            container.addEventListener('mouseleave', () => {
                if (currentTl) currentTl.play();
                intervalId = setInterval(swap, CONFIG.delay);
            });
        }

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

        console.log('✅ CardSwap inicializado!');
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
