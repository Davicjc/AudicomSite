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
    let iframesLoaded = false;

    // ============================================
    // FUNÇÃO DE INICIALIZAÇÃO
    // ============================================
    function init() {
        section = document.querySelector('.ferramentas-rede');
        toggleBtn = document.getElementById('ferramentas-toggle');
        closeBtn = document.getElementById('ferramentas-close');
        expandedContent = document.getElementById('ferramentas-expanded');
        
        if (!toggleBtn || !section) return;
        
        // Clique para expandir
        toggleBtn.addEventListener('click', expand);
        
        // Clique para recolher
        if (closeBtn) {
            closeBtn.addEventListener('click', collapse);
        }
        
        console.log('Network Tools: Pronto (modo compacto)');
    }

    // ============================================
    // EXPANDIR SEÇÃO
    // ============================================
    function expand() {
        section.classList.add('expanded');
        
        // Lazy load: Carrega iframes apenas na primeira expansão
        if (!iframesLoaded) {
            loadIframes();
            iframesLoaded = true;
        }
        
        // Scroll suave para a seção
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    // ============================================
    // RECOLHER SEÇÃO
    // ============================================
    function collapse() {
        section.classList.remove('expanded');
    }

    // ============================================
    // CARREGAR IFRAMES (LAZY LOAD)
    // ============================================
    function loadIframes() {
        const iframes = expandedContent.querySelectorAll('iframe[data-src]');
        
        iframes.forEach(iframe => {
            const src = iframe.getAttribute('data-src');
            if (src) {
                iframe.setAttribute('src', src);
                iframe.removeAttribute('data-src');
            }
        });
        
        // Aplicar configurações após carregar
        setTimeout(applyConfig, 100);
    }

    // ============================================
    // APLICAR CONFIGURAÇÕES NOS IFRAMES
    // ============================================
    function applyConfig() {
        applyIframeConfig('#speedtest-iframe', CONFIG.speedTestHeight, CONFIG.speedTestZoom, CONFIG.speedTestBloquearScroll);
        applyIframeConfig('#lookingglass-iframe', CONFIG.lookingGlassHeight, CONFIG.lookingGlassZoom, CONFIG.lookingGlassBloquearScroll);
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
