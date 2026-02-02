/**
 * ============================================
 * AUDICOM - TESTIMONIOS (Versión en Español)
 * ============================================
 * Gestiona la sección de testimonios de clientes
 * 
 * Para agregar un nuevo testimonio:
 * 1. Agregue la foto del cliente a assets/depoimentos/
 * 2. El nombre del archivo debe seguir el patrón: Nombre_Apellido-Cargo-Empresa.jpg
 * 3. Agregue un nuevo objeto al array DEPOIMENTOS a continuación
 */

const DEPOIMENTOS = [
    {
        nome: "Carlos Henrique",
        cargo: "Coordinador de Conectividad y Redes",
        empresa: "Callink",
        foto: "assets/depoimentos/Carlos_Henrique-Coordenador_de_Conectividade_e_Redes-Callink.jpg",
        texto: `Audicom se ha destacado entre nuestros proveedores por la excelencia en la entrega de los servicios contratados por Callink. Más allá de la calidad, un gran diferencial es la cercanía con el cliente, lo que contribuye positivamente a la relación entre cliente y proveedor. El alto nivel de profesionalismo y compromiso del equipo aporta más estabilidad, agilidad y especialmente confianza en el mantenimiento de servicios críticos a través de los enlaces proporcionados por Audicom.`
    },
    {
        nome: "Vinícius Mundim",
        cargo: "Gerente",
        empresa: "Interfast Servicios y Almacenamiento",
        foto: "assets/depoimentos/Vinícius_Mundim-Gerente-Interfast_Serviços_e_Armazenamentos.jpg",
        texto: `En 2013, establecimos una asociación con Audicom, representada por el Sr. Edenilton, para abordar la falta de servicios de internet en la región, que era bastante deficiente en ese momento. Esta asociación, construida a lo largo de los años, ha demostrado ser sólida y confiable. Audicom siempre nos ha atendido con agilidad y eficiencia, asegurando que cualquier problema se resolviera rápidamente manteniendo un alto nivel de credibilidad. Estamos seguros de que esta relación continuará prosperando y reafirmamos nuestro compromiso de mantener esta asociación por muchos años. Donde haya necesidad de internet, nuestra elección siempre será Audicom.`
    }
    
    // Para agregar más testimonios, siga el modelo anterior:
    // {
    //     nome: "Nombre del Cliente",
    //     cargo: "Cargo del Cliente",
    //     empresa: "Nombre de la Empresa",
    //     foto: "assets/depoimentos/Nombre_Apellido-Cargo-Empresa.jpg",
    //     texto: `Texto del testimonio aquí...`
    // }
];

/**
 * Inicializa la sección de testimonios
 */
function initDepoimentos() {
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Verificar si los testimonios están habilitados
    if (SC.depoimentos === false) {
        const section = document.getElementById('depoimentos');
        if (section) section.style.display = 'none';
        return;
    }
    
    const container = document.querySelector('.depoimentos-container');
    if (!container) return;
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Renderizar testimonios
    DEPOIMENTOS.forEach((depoimento, index) => {
        const card = criarCardDepoimento(depoimento, index);
        container.appendChild(card);
    });
    
    // Inicializar navegación si hay más de un testimonio
    if (DEPOIMENTOS.length > 1) {
        initDepoimentosNavigation();
    }
    
    // Inicializar animación de entrada
    initDepoimentosAnimation();
}

/**
 * Crea una tarjeta de testimonio
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
 * Inicializa la navegación entre testimonios
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
    
    // Crear puntos de navegación
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        DEPOIMENTOS.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'depoimento-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Testimonio ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Navegación
    function goToSlide(index) {
        cards[currentIndex].classList.remove('active');
        currentIndex = index;
        if (currentIndex < 0) currentIndex = cards.length - 1;
        if (currentIndex >= cards.length) currentIndex = 0;
        cards[currentIndex].classList.add('active');
        
        // Actualizar puntos
        const dots = dotsContainer?.querySelectorAll('.depoimento-dot');
        dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Reiniciar reproducción automática
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
    
    // Soporte táctil/deslizamiento
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
    
    // Pausar reproducción automática al pasar el mouse
    container.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    container.addEventListener('mouseleave', () => {
        if (SC.depoimentosAutoplay !== false) {
            startAutoplay();
        }
    });
    
    // Iniciar reproducción automática
    if (SC.depoimentosAutoplay !== false) {
        startAutoplay();
    }
}

/**
 * Inicializa la animación de entrada - eliminada ya que ahora usa display:none/block
 */
function initDepoimentosAnimation() {
    // La animación ahora se realiza a través de keyframes CSS en la propia tarjeta
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initDepoimentos);
