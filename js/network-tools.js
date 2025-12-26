/**
 * ============================================
 * AUDICOM TELECOM - Ferramentas de Rede
 * ============================================
 * 
 * Script que gerencia a seção expansível de ferramentas
 * de rede (Speed Test e Looking Glass).
 * 
 * Funcionalidades:
 * - Card compacto que expande ao clicar
 * - Lazy loading dos iframes (só carrega quando expande)
 * - Altura e zoom customizáveis via onoff.js
 * - Bloquear scroll nos iframes
 * - Acordeão: apenas um card expande por vez
 * 
 * Configurações são lidas do arquivo js/onoff.js (SiteConfig)
 */

(function() {
    'use strict';

    // ============================================
    // VERIFICAÇÃO INICIAL
    // ============================================
    if (typeof SiteConfig !== 'undefined' && SiteConfig.secaoFerramentas === false) {
        const section = document.querySelector('.ferramentas-rede');
        if (section) section.style.display = 'none';
        return;
    }

    // ============================================
    // LEITURA DAS CONFIGURAÇÕES
    // ============================================
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    const CONFIG = {
        speedTestHeight: SC.ferramentasSpeedTestHeight ?? 700,
        speedTestZoom: SC.ferramentasSpeedTestZoom || 100,
        speedTestBloquearScroll: SC.ferramentasSpeedTestBloquearScroll === true,
        lookingGlassHeight: SC.ferramentasLookingGlassHeight ?? 700,
        lookingGlassZoom: SC.ferramentasLookingGlassZoom || 100,
        lookingGlassBloquearScroll: SC.ferramentasLookingGlassBloquearScroll === true
    };

    // ============================================
    // ELEMENTOS DO DOM
    // ============================================
    let section, toggleBtn, closeBtn, expandedContent;
    let toolCards = [];
    let loadedIframes = {}; // Track which iframes are loaded

    // ============================================
    // FUNÇÃO DE INICIALIZAÇÃO
    // ============================================
    function init() {
        section = document.querySelector('.ferramentas-rede');
        toggleBtn = document.getElementById('ferramentas-toggle');
        closeBtn = document.getElementById('ferramentas-close');
        expandedContent = document.getElementById('ferramentas-expanded');
        
        if (!toggleBtn || !section) return;
        
        // Clique para expandir seção principal
        toggleBtn.addEventListener('click', expand);
        
        // Clique para recolher seção principal
        if (closeBtn) {
            closeBtn.addEventListener('click', collapse);
        }
        
        // Configurar acordeão nos cards individuais
        toolCards = document.querySelectorAll('.ferramenta-card');
        toolCards.forEach(card => {
            const header = card.querySelector('.ferramenta-header[data-toggle]');
            if (header) {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => toggleCard(card));
            }
        });
        
        console.log('Network Tools: Pronto (modo acordeão - apenas um expande)');
    }

    // ============================================
    // EXPANDIR SEÇÃO PRINCIPAL
    // ============================================
    function expand() {
        section.classList.add('expanded');
        
        // Scroll suave para a seção
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    // ============================================
    // RECOLHER SEÇÃO PRINCIPAL
    // ============================================
    function collapse() {
        section.classList.remove('expanded');
        // Fechar todos os cards
        toolCards.forEach(card => card.classList.remove('expanded'));
    }

    // ============================================
    // TOGGLE CARD INDIVIDUAL (ACORDEÃO)
    // ============================================
    function toggleCard(card) {
        const toolId = card.getAttribute('data-tool');
        const isExpanded = card.classList.contains('expanded');
        
        // Fechar todos os outros cards (acordeão - só um aberto)
        toolCards.forEach(c => {
            if (c !== card) {
                c.classList.remove('expanded');
            }
        });
        
        // Toggle do card clicado
        if (isExpanded) {
            card.classList.remove('expanded');
        } else {
            card.classList.add('expanded');
            
            // Lazy load do iframe apenas quando expandir pela primeira vez
            if (!loadedIframes[toolId]) {
                loadIframeForCard(card, toolId);
                loadedIframes[toolId] = true;
            }
            
            // Scroll suave para o card
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // ============================================
    // CARREGAR IFRAME DO CARD (LAZY LOAD)
    // ============================================
    function loadIframeForCard(card, toolId) {
        const iframe = card.querySelector('iframe[data-src]');
        if (iframe) {
            const src = iframe.getAttribute('data-src');
            if (src) {
                iframe.setAttribute('src', src);
                iframe.removeAttribute('data-src');
            }
        }
        
        // Aplicar configuração específica
        setTimeout(() => {
            if (toolId === 'speedtest') {
                applyIframeConfig('#speedtest-iframe', CONFIG.speedTestHeight, CONFIG.speedTestZoom, CONFIG.speedTestBloquearScroll);
            } else if (toolId === 'lookingglass') {
                applyIframeConfig('#lookingglass-iframe', CONFIG.lookingGlassHeight, CONFIG.lookingGlassZoom, CONFIG.lookingGlassBloquearScroll);
            }
        }, 100);
    }

    // ============================================
    // CONFIGURAR IFRAME INDIVIDUAL
    // ============================================
    function applyIframeConfig(selector, height, zoom, bloquearScroll) {
        const container = document.querySelector(selector);
        if (!container) return;

        const iframe = container.querySelector('iframe');
        if (!iframe) return;

        // Altura
        if (height > 0) {
            container.style.setProperty('height', height + 'px', 'important');
        } else {
            container.style.setProperty('height', '600px', 'important');
        }
        container.style.overflow = 'hidden';

        // Zoom
        const scale = zoom / 100;
        if (zoom !== 100) {
            iframe.style.transform = `scale(${scale})`;
            iframe.style.transformOrigin = 'top left';
            iframe.style.width = `${100 / scale}%`;
            iframe.style.height = `${100 / scale}%`;
        } else {
            iframe.style.transform = '';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
        }

        // Sempre permite cliques
        iframe.style.pointerEvents = 'auto';

        // Bloquear scroll
        if (bloquearScroll) {
            container.addEventListener('wheel', function(e) {
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });
            
            container.addEventListener('touchmove', function(e) {
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });
        }
    }

    // ============================================
    // EXECUTAR QUANDO DOM ESTIVER PRONTO
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
