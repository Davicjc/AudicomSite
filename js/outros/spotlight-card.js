/**
 * ============================================
 * SPOTLIGHT CARD - VANILLA JS
 * ============================================
 * Efeito de holofote que segue o mouse nos cards
 * Convertido de React para JavaScript puro
 */

(function() {
    'use strict';
    
    // Ler configurações do SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    const CONFIG = {
        enabled: SC.spotlightCard !== undefined ? SC.spotlightCard : true,
        spotlightColor: SC.spotlightCardColor || 'rgba(0, 36, 156, 0.2)'
    };
    
    // Verificar se está habilitado
    if (!CONFIG.enabled) {
        console.log('SpotlightCard: Desabilitado via SiteConfig');
        return;
    }
    
    /**
     * Inicializa o efeito spotlight em um card
     * @param {HTMLElement} card - O elemento do card
     */
    function initSpotlightCard(card) {
        // Configurar variáveis CSS
        card.style.setProperty('--spotlight-color', CONFIG.spotlightColor);
        
        // Handler para movimento do mouse
        function handleMouseMove(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
        
        // Adicionar listener
        card.addEventListener('mousemove', handleMouseMove);
    }
    
    /**
     * Inicializa todos os cards com a classe .feature-item
     */
    function initAllSpotlightCards() {
        const cards = document.querySelectorAll('.feature-item');
        
        if (cards.length === 0) {
            console.warn('SpotlightCard: Nenhum card .feature-item encontrado');
            return;
        }
        
        cards.forEach(card => {
            initSpotlightCard(card);
        });
        
        console.log(`SpotlightCard: ${cards.length} card(s) inicializado(s)`);
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllSpotlightCards);
    } else {
        initAllSpotlightCards();
    }
    
})();
