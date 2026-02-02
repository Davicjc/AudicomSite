/**
 * ============================================
 * INSTITUCIONAL CARDS - VANILLA JS
 * ============================================
 * Efeito de spotlight nos cards institucionais
 */

(function() {
    'use strict';
    
    // Ler configurações do SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    const CONFIG = {
        enabled: SC.institucionalCards !== undefined ? SC.institucionalCards : true
    };
    
    if (!CONFIG.enabled) {
        console.log('InstitucionalCards: Desabilitado via SiteConfig');
        return;
    }
    
    /**
     * Inicializa efeito spotlight em um card
     */
    function initCard(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    }
    
    /**
     * Inicializa todos os cards
     */
    function init() {
        const cards = document.querySelectorAll('.institucional-card');
        
        if (cards.length === 0) return;
        
        cards.forEach(card => initCard(card));
        
        console.log(`InstitucionalCards: ${cards.length} card(s) inicializado(s)`);
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
