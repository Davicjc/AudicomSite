/**
 * ============================================
 * AUDICOM - CONFIGURAÇÕES ON/OFF
 * ============================================
 * Ative ou desative recursos do site alterando true/false
 * Salve o arquivo e atualize a página para ver as mudanças
 */

const SiteConfig = {
    
    // ============================================
    // ANIMAÇÕES DE FUNDO (pasta /background)
    // ============================================
    
    // ---- FIBER CANVAS (teia de conexões) ----
    fiberCanvas: true,
        // Subfunções do Fiber Canvas:
        fiberCanvasParticleCount: 80,        // Quantidade de partículas
        fiberCanvasConnectionDistance: 150,  // Distância de conexão
        fiberCanvasParticleSpeed: 0.3,       // Velocidade das partículas
        fiberCanvasFlowSpeed: 0.002,         // Velocidade do fluxo de dados
        fiberCanvasGlowIntensity: 0.8,       // Intensidade do brilho
    
    // ---- FLOATING LINES (ondas animadas WebGL) ----
    floatingLines: false,
        // Subfunções do Floating Lines:
        floatingLinesTopWave: true,          // Onda superior
        floatingLinesMiddleWave: false,       // Onda do meio
        floatingLinesBottomWave: true,       // Onda inferior
        floatingLinesLineCount: 10,           // Quantidade de linhas por onda
        floatingLinesLineDistance: 5,        // Distância entre linhas
        floatingLinesAnimationSpeed: 1.5,    // Velocidade da animação
        floatingLinesInteractive: false,     // Reação ao mouse
        floatingLinesBendRadius: 0.2,        // Raio de curvatura (mouse)
        floatingLinesBendStrength: -0.1,     // Força de curvatura (mouse)
    
    // ---- MOUSE BLUR (blur que segue mouse) ----
    mouseBlur: false,
        // Subfunções do Mouse Blur:
        mouseBlurSize: 300,                  // Tamanho do blur
        mouseBlurIntensity: 0.5,             // Intensidade

        // ---- RIPPLE GRID (grade com ondas WebGL) ----
    rippleGrid: false,
        // Subfunções do Ripple Grid:
        rippleGridRainbow: false,            // Modo arco-íris
        rippleGridColor: '#3700ff38',          // Cor da grade (Azul Conexão)
        rippleGridRippleIntensity: 0.009,     // Intensidade do ripple
        rippleGridSize: 20.0,                // Tamanho da grade
        rippleGridThickness: 15.0,           // Espessura das linhas
        rippleGridFadeDistance: 1,         // Distância de fade
        rippleGridVignetteStrength: 5.0,     // Força da vinheta
        rippleGridGlowIntensity: 0.1,        // Intensidade do brilho
        rippleGridOpacity: 0.7,              // Opacidade geral
        rippleGridRotation: 0,               // Rotação da grade (graus)
        rippleGridMouseInteraction: false,    // Interação com mouse
        rippleGridMouseRadius: 1.2,          // Raio de interação do mouse
    
    // ---- ORB (esfera fluida animada WebGL) ----
    orb: true,
        // Subfunções do Orb:
        orbSize: 1100,                        // Tamanho da esfera (px)
        orbColor1: '#8F99A8',                // Cor primária (roxo)
        orbColor2: '#081535',                // Cor secundária (ciano)
        orbColor3: '#00249C',                // Cor de profundidade (azul escuro)
        orbHue: 0,                           // Ajuste de matiz (0-360)
        orbMouseEffect: false,               // Efeito de distorção ao passar mouse
        orbHoverIntensity: 0.5,              // Intensidade do efeito hover
        orbRotateOnHover: false,              // Rotacionar ao passar mouse
        orbForceHoverState: false,           // Forçar estado de hover
        orbBackgroundColor: '#081535',       // Cor de fundo (Azul Estrutura)
    
    // ============================================
    // PILL NAV (MENU ANIMADO)
    // ============================================
    
    // ---- PILL NAV (menu estilo pílula) ----
    pillNav: false,
        // Subfunções do Pill Nav:
        pillNavInitialAnimation: true,       // Animação ao carregar página
    
    // ---- HAMBURGER NAV (menu hambúrguer 3 barras) ----
    hamburgerNav: true,
        // Subfunções do Hamburger Nav:
        hamburgerNavAnimation: true,         // Animação ao abrir/fechar
        hamburgerNavPosition: 'left',       // Posição: 'left' ou 'right'
    
    // ============================================
    // HERO (TELA PRINCIPAL)
    // ============================================
    
    // Logo grande de fundo atrás do título
    heroBackgroundLogo: true,
    
    // Glow (brilho) atrás da logo de fundo
    heroBackgroundGlow: true,
    
    // Animação de flutuar da logo de fundo
    heroLogoFloat: true,
    
    // Badge "Conexão de Alta Performance"
    heroBadge: false,
    
    // Título "Audicom" na hero
    heroTitleAudicom: true,
    
    // Título "Telecom" na hero
    heroTitleTelecom: true,
    
    // Subtítulo na hero
    heroSubtitle: true,
    
    // Botão "Ver Planos"
    heroBtnPlanos: true,
    
    // Botão WhatsApp na hero
    heroBtnWhatsapp: true,
    
    // Indicador de scroll (Scroll + linha)
    scrollIndicator: false,
    
    // ============================================
    // CARDS DE PLANOS
    // ============================================
    
    // Card do Plano Rural
    planoRural: true,
    
    // Card do Plano Residencial
    planoResidencial: true,
    
    // Card do Plano Empresarial
    planoEmpresarial: true,
    
    // Badge "Mais Popular" no plano residencial
    planoBadgeMaisPopular: true,
    
    // ============================================
    // SEÇÃO INSTITUCIONAL (Missão, Valores, Visão)
    // ============================================
    
    // ---- CARDS INSTITUCIONAIS (efeito spotlight) ----
    institucionalCards: true,
    
    // ---- BUBBLE MENU VALORES (pills animados no card Valores) ----
    bubbleMenuValores: true,
        // Subfunções do Bubble Menu:
        bubbleMenuAnimationEase: 'back.out(1.5)',    // Tipo de easing da animação
        bubbleMenuAnimationDuration: 0.5,            // Duração da animação (segundos)
        bubbleMenuStaggerDelay: 0.08,                // Delay entre cada item
    
    // ============================================
    // SEÇÃO SOBRE
    // ============================================
    
    // Grid de features (Infraestrutura, Suporte 24h, Alta Velocidade)
    sobreFeaturesGrid: true,
    
    // ---- SPOTLIGHT CARD (efeito holofote nos cards) ----
    spotlightCard: true,
        // Subfunções do Spotlight Card:
        spotlightCardColor: 'rgba(0, 36, 156, 0.2)',    // Cor do holofote (Azul Conexão)
    
    // ============================================
    // SEÇÃO INSIGHTS
    // ============================================
    
    // ---- CARD SWAP (cards animados) ----
    cardSwap: true,
        // Subfunções do Card Swap:
        cardSwapWidth: 500,                  // Largura dos cards (px)
        cardSwapHeight: 300,                 // Altura dos cards (px)
        cardSwapCardDistance: 50,            // Distância horizontal entre cards
        cardSwapVerticalDistance: 60,        // Distância vertical entre cards
        cardSwapDelay: 5000,                 // Intervalo de troca (ms)
        cardSwapPauseOnHover: false,          // Pausar ao passar mouse
        cardSwapSkewAmount: 6,               // Inclinação dos cards
        cardSwapEasing: 'elastic',           // Tipo de animação (elastic/smooth)
        cardSwapHitboxEnabled: true,         // Hitbox invisível (resolve bug nos cantos)
        cardSwapClickToAdvance: true,        // Clicar no card avança para próximo
    
    // ============================================
    // SEÇÃO COBERTURA
    // ============================================
    
    // Grid de cidades
    coberturaCidadesGrid: true,
    
    // ============================================
    // SEÇÃO CONTATO
    // ============================================
    
    // Telefone fixo
    contatoTelefone: true,
    
    // WhatsApp no contato
    contatoWhatsapp: true,
    
    // Email
    contatoEmail: true,
    
    // Endereço
    contatoEndereco: true,
    
    // Links rápidos (Central do Assinante, Teste de Velocidade)
    contatoLinksRapidos: true,
    
    // Links de redes sociais
    contatoRedesSociais: true,
    
    // ============================================
    // FOOTER
    // ============================================
    
    // Logo no footer
    footerLogo: true,
    
    // Número ASN
    footerAsn: true,
    
    // Links técnicos (PeeringDB, Looking Glass, RADb)
    footerLinksTecnicos: true,
    
    // Copyright
    footerCopyright: true,
    
    // ============================================
    // BOTÕES E ELEMENTOS FLUTUANTES
    // ============================================
    
    // Botão flutuante do WhatsApp
    whatsappFloat: false,
    
    // ============================================
    // SEÇÕES DA PÁGINA
    // ============================================
    
    // ---- FUNDO ALTERNADO (cinza entre seções) ----
    fundoAlternadoSecoes: false,          // Fundo cinza alternado em seções
    
    // ---- SEÇÃO PRODUTOS (soluções corporativas) ----
    secaoProdutos: true,
        // Subfunções do Produtos:
        produtosModalAtivo: true,            // Ativar popup de detalhes ao clicar "Ver mais"
    
    // Seção Insights
    secaoInsights: true,
    
    // ---- FERRAMENTAS DE REDE (seção dedicada) ----
    secaoFerramentas: true,              // Mostrar seção Ferramentas de Rede
        // Subfunções do Ferramentas de Rede:
        // Speed Test:
        ferramentasSpeedTestHeight: 700,     // Altura do iframe Speed Test (px)
        ferramentasSpeedTestZoom: 100,       // Zoom do Speed Test (%)
        ferramentasSpeedTestBloquearScroll: true, // Bloquear rolagem (mas permite cliques)
        // Looking Glass:
        ferramentasLookingGlassHeight: 700,  // Altura do iframe Looking Glass (px)
        ferramentasLookingGlassZoom: 80,     // Zoom do Looking Glass (%)
        ferramentasLookingGlassBloquearScroll: true, // Bloquear rolagem (mas permite cliques)
    
    // Seção Sobre
    secaoSobre: true,
    
    // ---- SEÇÃO COBERTURA / ONDE ESTAMOS ----
    secaoCobertura: true,
        // Subfunções do Mapa de Cobertura:
        mapaCobertura: true,                 // Mostrar mapa interativo
        mapaCoberturaZoomInicial: 8,         // Zoom inicial do mapa
        mapaCoberturaMostrarMarcadores: true, // Mostrar marcadores das cidades
    
    // Seção Contato
    secaoContato: true,
    
    // Footer
    footer: true
};

// ============================================
// NÃO EDITE ABAIXO DESTA LINHA
// Aplicação das configurações
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Fundo Alternado (cinza entre seções)
    if (!SiteConfig.fundoAlternadoSecoes) {
        const secoesAlt = document.querySelectorAll('.section-alt');
        secoesAlt.forEach(secao => secao.classList.remove('section-alt'));
    }
    
    // Fiber Canvas (teia de fundo)
    if (!SiteConfig.fiberCanvas) {
        const fiberCanvas = document.getElementById('fiber-canvas');
        if (fiberCanvas) fiberCanvas.style.display = 'none';
    }
    
    // Hyperspeed
    if (!SiteConfig.hyperspeed) {
        const hyperspeed = document.getElementById('hyperspeed-container');
        if (hyperspeed) hyperspeed.style.display = 'none';
    }
    
    // Mouse Blur
    if (!SiteConfig.mouseBlur) {
        const mouseBlur = document.getElementById('mouse-blur');
        if (mouseBlur) mouseBlur.style.display = 'none';
    }
    
    // Staggered Menu (menu inteiro)
    if (!SiteConfig.staggeredMenu) {
        const staggeredMenu = document.querySelector('.staggered-menu-wrapper');
        if (staggeredMenu) staggeredMenu.style.display = 'none';
    }
    
    // Staggered Menu Logo
    if (!SiteConfig.staggeredMenuLogo) {
        const smLogo = document.querySelector('.sm-logo');
        if (smLogo) smLogo.style.display = 'none';
    }
    
    // Staggered Menu Toggle
    if (!SiteConfig.staggeredMenuToggle) {
        const smToggle = document.querySelector('.sm-toggle');
        if (smToggle) smToggle.style.display = 'none';
    }
    
    // Staggered Menu Socials
    if (!SiteConfig.staggeredMenuSocials) {
        const smSocials = document.querySelector('.sm-socials');
        if (smSocials) smSocials.style.display = 'none';
    }
    
    // Header Logo (antigo - mantido para compatibilidade)
    if (!SiteConfig.headerLogo) {
        const headerLogo = document.querySelector('.header-logo');
        if (headerLogo) headerLogo.style.display = 'none';
    }
    
    // Header Nav
    if (!SiteConfig.headerNav) {
        const headerNav = document.querySelector('.nav');
        if (headerNav) headerNav.style.display = 'none';
    }
    
    // Hero Background Logo
    if (!SiteConfig.heroBackgroundLogo) {
        const heroBgLogo = document.querySelector('.hero-bg-logo');
        if (heroBgLogo) heroBgLogo.style.display = 'none';
    }
    
    // Hero Background Glow
    if (!SiteConfig.heroBackgroundGlow) {
        const heroGlow = document.querySelector('.hero-bg-glow');
        if (heroGlow) heroGlow.style.display = 'none';
    }
    
    // Hero Logo Float Animation
    if (!SiteConfig.heroLogoFloat) {
        const heroBgLogo = document.querySelector('.hero-bg-logo');
        if (heroBgLogo) heroBgLogo.style.animation = 'none';
    }
    
    // Hero Badge
    if (!SiteConfig.heroBadge) {
        const heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) heroBadge.style.display = 'none';
    }
    
    // Hero Title Audicom
    if (!SiteConfig.heroTitleAudicom) {
        const titleAudicom = document.querySelector('.title-audicom');
        if (titleAudicom) titleAudicom.style.display = 'none';
    }
    
    // Hero Title Telecom
    if (!SiteConfig.heroTitleTelecom) {
        const titleTelecom = document.querySelector('.title-telecom');
        if (titleTelecom) titleTelecom.style.display = 'none';
    }
    
    // Hero Subtitle
    if (!SiteConfig.heroSubtitle) {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.style.display = 'none';
    }
    
    // Hero Button Planos
    if (!SiteConfig.heroBtnPlanos) {
        const btnPlanos = document.querySelector('.hero-cta .btn-primary');
        if (btnPlanos) btnPlanos.style.display = 'none';
    }
    
    // Hero Button WhatsApp
    if (!SiteConfig.heroBtnWhatsapp) {
        const btnWhatsapp = document.querySelector('.hero-cta .btn-secondary');
        if (btnWhatsapp) btnWhatsapp.style.display = 'none';
    }
    
    // Scroll Indicator
    if (!SiteConfig.scrollIndicator) {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) scrollIndicator.style.display = 'none';
    }
    
    // Plano Rural
    if (!SiteConfig.planoRural) {
        const cards = document.querySelectorAll('.plan-card');
        if (cards[0]) cards[0].style.display = 'none';
    }
    
    // Plano Residencial
    if (!SiteConfig.planoResidencial) {
        const card = document.querySelector('.plan-card.featured');
        if (card) card.style.display = 'none';
    }
    
    // Plano Empresarial
    if (!SiteConfig.planoEmpresarial) {
        const cards = document.querySelectorAll('.plan-card');
        if (cards[2]) cards[2].style.display = 'none';
    }
    
    // Badge Mais Popular
    if (!SiteConfig.planoBadgeMaisPopular) {
        const badge = document.querySelector('.plan-badge');
        if (badge) badge.style.display = 'none';
    }
    
    // Sobre Features Grid
    if (!SiteConfig.sobreFeaturesGrid) {
        const featuresGrid = document.querySelector('.features-grid');
        if (featuresGrid) featuresGrid.style.display = 'none';
    }
    
    // Cobertura Cidades Grid
    if (!SiteConfig.coberturaCidadesGrid) {
        const citiesGrid = document.querySelector('.cities-grid');
        if (citiesGrid) citiesGrid.style.display = 'none';
    }
    
    // Contato Telefone
    if (!SiteConfig.contatoTelefone) {
        const tel = document.querySelector('a[href^="tel:"]');
        if (tel) tel.style.display = 'none';
    }
    
    // Contato WhatsApp
    if (!SiteConfig.contatoWhatsapp) {
        const items = document.querySelectorAll('.contact-items .contact-item');
        if (items[1]) items[1].style.display = 'none';
    }
    
    // Contato Email
    if (!SiteConfig.contatoEmail) {
        const email = document.querySelector('a[href^="mailto:"]');
        if (email) email.style.display = 'none';
    }
    
    // Contato Endereço
    if (!SiteConfig.contatoEndereco) {
        const items = document.querySelectorAll('.contact-items .contact-item');
        if (items[3]) items[3].style.display = 'none';
    }
    
    // Contato Links Rápidos
    if (!SiteConfig.contatoLinksRapidos) {
        const quickLinks = document.querySelector('.quick-links');
        if (quickLinks) quickLinks.style.display = 'none';
        const h3 = document.querySelector('.contato-links h3');
        if (h3) h3.style.display = 'none';
    }
    
    // Contato Redes Sociais
    if (!SiteConfig.contatoRedesSociais) {
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) socialLinks.style.display = 'none';
    }
    
    // Footer Logo
    if (!SiteConfig.footerLogo) {
        const footerLogo = document.querySelector('.footer-logo');
        if (footerLogo) footerLogo.style.display = 'none';
    }
    
    // Footer ASN
    if (!SiteConfig.footerAsn) {
        const footerAsn = document.querySelector('.footer-asn');
        if (footerAsn) footerAsn.style.display = 'none';
    }
    
    // Footer Links Técnicos
    if (!SiteConfig.footerLinksTecnicos) {
        const footerLinks = document.querySelector('.footer-links');
        if (footerLinks) footerLinks.style.display = 'none';
    }
    
    // Footer Copyright
    if (!SiteConfig.footerCopyright) {
        const copyright = document.querySelector('.footer-copyright');
        if (copyright) copyright.style.display = 'none';
    }
    
    // WhatsApp Float
    if (!SiteConfig.whatsappFloat) {
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) whatsappFloat.style.display = 'none';
    }
    
    // Seção Produtos
    if (!SiteConfig.secaoProdutos) {
        const secaoProdutos = document.getElementById('produtos');
        if (secaoProdutos) secaoProdutos.style.display = 'none';
    }
    
    // Seção Insights
    if (!SiteConfig.secaoInsights) {
        const secaoInsights = document.getElementById('insights');
        if (secaoInsights) secaoInsights.style.display = 'none';
    }
    
    // Seção Sobre
    if (!SiteConfig.secaoSobre) {
        const secaoSobre = document.getElementById('sobre');
        if (secaoSobre) secaoSobre.style.display = 'none';
    }
    
    // Seção Cobertura
    if (!SiteConfig.secaoCobertura) {
        const secaoCobertura = document.getElementById('cobertura');
        if (secaoCobertura) secaoCobertura.style.display = 'none';
    }
    
    // Seção Contato
    if (!SiteConfig.secaoContato) {
        const secaoContato = document.getElementById('contato');
        if (secaoContato) secaoContato.style.display = 'none';
    }
    
    // Footer
    if (!SiteConfig.footer) {
        const footer = document.querySelector('.footer');
        if (footer) footer.style.display = 'none';
    }
    
    console.log(' SiteConfig carregado com sucesso!');
});

// Exportar para uso global
window.SiteConfig = SiteConfig;
