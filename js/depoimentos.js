/**
 * ============================================
 * AUDICOM - DEPOIMENTOS
 * ============================================
 * Gerencia a seção de depoimentos de clientes
 * 
 * Para adicionar um novo depoimento:
 * 1. Adicione a foto do cliente na pasta assets/depoimentos/
 * 2. O nome do arquivo deve seguir o padrão: Nome_Sobrenome-Cargo-Empresa.jpg
 * 3. Adicione um novo objeto no array DEPOIMENTOS abaixo
 */

const DEPOIMENTOS = [
    {
        nome: "Carlos Henrique",
        cargo: "Coordenador de Conectividade e Redes",
        empresa: "Callink",
        foto: "assets/depoimentos/Carlos_Henrique-Coordenador_de_Conectividade_e_Redes-Callink.jpg",
        texto: `A Audicom tem se destacado entre nossos fornecedores pela excelência na prestação dos serviços contratados pela Callink. Além da qualidade, um grande diferencial é a proximidade com o cliente, que contribui positivamente no relacionamento entre cliente e fornecedor. O alto nível de profissionalismo e comprometimento do time traz mais estabilidade, agilidade e principalmente confiança no mantimento dos serviços críticos nos links fornecidos pela Audicom.`
    },
    {
        nome: "Vinícius Mundim",
        cargo: "Gerente",
        empresa: "Interfast Serviços e Armazenamentos",
        foto: "assets/depoimentos/Vinícius_Mundim-Gerente-Interfast_Serviços_e_Armazenamentos.jpg",
        texto: `Em 2013, estabelecemos uma parceria com a Audicom, representada pelo senhor Edenilton, para suprir a carência de serviços de internet na região, que até então era bastante deficitária. Essa parceria, construída ao longo dos anos, tem se mostrado sólida e confiável. A Audicom sempre nos atendeu com agilidade e eficiência, garantindo que eventuais problemas fossem solucionados rapidamente e mantendo um padrão elevado de credibilidade. Estamos certos de que essa relação continuará prosperando e reafirmamos nosso compromisso em manter essa parceria por muitos anos. Onde houver necessidade de internet, nossa escolha será sempre a Audicom.`
    }
    
    // Para adicionar mais depoimentos, siga o modelo acima:
    // {
    //     nome: "Nome do Cliente",
    //     cargo: "Cargo do Cliente",
    //     empresa: "Nome da Empresa",
    //     foto: "assets/depoimentos/Nome_Sobrenome-Cargo-Empresa.jpg",
    //     texto: `Texto do depoimento aqui...`
    // }
];

/**
 * Inicializa a seção de depoimentos
 */
function initDepoimentos() {
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Verificar se depoimentos está habilitado
    if (SC.depoimentos === false) {
        const section = document.getElementById('depoimentos');
        if (section) section.style.display = 'none';
        return;
    }
    
    const container = document.querySelector('.depoimentos-container');
    if (!container) return;
    
    // Limpar container
    container.innerHTML = '';
    
    // Renderizar depoimentos
    DEPOIMENTOS.forEach((depoimento, index) => {
        const card = criarCardDepoimento(depoimento, index);
        container.appendChild(card);
    });
    
    // Inicializar navegação se houver mais de um depoimento
    if (DEPOIMENTOS.length > 1) {
        initDepoimentosNavigation();
    }
    
    // Inicializar animação de entrada
    initDepoimentosAnimation();
}

/**
 * Cria um card de depoimento
 */
function criarCardDepoimento(depoimento, index) {
    const card = document.createElement('article');
    card.className = 'depoimento-card' + (index === 0 ? ' active' : '');
    card.dataset.index = index;
    
    card.innerHTML = `
        <div class="depoimento-content">
            <div class="depoimento-quote-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
            </div>
            <blockquote class="depoimento-texto">
                "${depoimento.texto}"
            </blockquote>
            <div class="depoimento-autor">
                <div class="depoimento-foto">
                    <img src="${depoimento.foto}" alt="${depoimento.nome}" loading="lazy">
                </div>
                <div class="depoimento-info">
                    <h4 class="depoimento-nome">${depoimento.nome}</h4>
                    <p class="depoimento-cargo">${depoimento.cargo}</p>
                    <p class="depoimento-empresa">${depoimento.empresa}</p>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Inicializa a navegação entre depoimentos
 */
function initDepoimentosNavigation() {
    const container = document.querySelector('.depoimentos-container');
    const cards = container.querySelectorAll('.depoimento-card');
    const prevBtn = document.querySelector('.depoimento-nav-prev');
    const nextBtn = document.querySelector('.depoimento-nav-next');
    const dotsContainer = document.querySelector('.depoimentos-dots');
    
    let currentIndex = 0;
    let autoplayInterval = null;
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    const autoplayDelay = SC.depoimentosAutoplayDelay || 8000;
    
    // Criar dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        DEPOIMENTOS.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'depoimento-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Depoimento ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Navegação
    function goToSlide(index) {
        cards[currentIndex].classList.remove('active');
        currentIndex = index;
        if (currentIndex < 0) currentIndex = cards.length - 1;
        if (currentIndex >= cards.length) currentIndex = 0;
        cards[currentIndex].classList.add('active');
        
        // Atualizar dots
        const dots = dotsContainer?.querySelectorAll('.depoimento-dot');
        dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Reiniciar autoplay
        if (SC.depoimentosAutoplay !== false) {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Pausar autoplay ao passar mouse
    container.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    container.addEventListener('mouseleave', () => {
        if (SC.depoimentosAutoplay !== false) {
            startAutoplay();
        }
    });
    
    // Iniciar autoplay
    if (SC.depoimentosAutoplay !== false) {
        startAutoplay();
    }
}

/**
 * Inicializa animação de entrada - removida pois agora usa display:none/block
 */
function initDepoimentosAnimation() {
    // Animação agora é feita via CSS keyframes no próprio card
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', initDepoimentos);
