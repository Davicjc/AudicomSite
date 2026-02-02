/**
 * ============================================
 * AUDICOM - TESTIMONIALS (English Version)
 * ============================================
 * Manages the client testimonials section
 * 
 * To add a new testimonial:
 * 1. Add the client photo to assets/depoimentos/
 * 2. File name should follow the pattern: Name_Surname-Position-Company.jpg
 * 3. Add a new object to the DEPOIMENTOS array below
 */

const DEPOIMENTOS = [
    {
        nome: "Carlos Henrique",
        cargo: "Connectivity & Networks Coordinator",
        empresa: "Callink",
        foto: "assets/depoimentos/Carlos_Henrique-Coordenador_de_Conectividade_e_Redes-Callink.jpg",
        texto: `Audicom has really set themselves apart from our other vendors. The service quality speaks for itself, but what makes the biggest difference is how approachable they are—it's made our partnership so much smoother. Their professionalism and dedication bring stability, speed, and above all, the confidence we need to keep our critical services running on Audicom's links.`
    },
    {
        nome: "Vinícius Mundim",
        cargo: "Manager",
        empresa: "Interfast Services and Storage",
        foto: "assets/depoimentos/Vinícius_Mundim-Gerente-Interfast_Serviços_e_Armazenamentos.jpg",
        texto: `We started working with Audicom back in 2013, when Edenilton helped us solve our internet challenges in a region that was seriously underserved. Over the years, this partnership has proven to be rock-solid. Audicom has always delivered fast, efficient support—whenever something came up, they fixed it quickly while maintaining a high level of trust. We're confident this relationship will keep growing, and wherever we need internet, Audicom is our first call.`
    }
    
    // To add more testimonials, follow the model above:
    // {
    //     nome: "Client Name",
    //     cargo: "Client Position",
    //     empresa: "Company Name",
    //     foto: "assets/depoimentos/Name_Surname-Position-Company.jpg",
    //     texto: `Testimonial text here...`
    // }
];

/**
 * Initializes the testimonials section
 */
function initDepoimentos() {
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Check if testimonials are enabled
    if (SC.depoimentos === false) {
        const section = document.getElementById('depoimentos');
        if (section) section.style.display = 'none';
        return;
    }
    
    const container = document.querySelector('.depoimentos-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Render testimonials
    DEPOIMENTOS.forEach((depoimento, index) => {
        const card = criarCardDepoimento(depoimento, index);
        container.appendChild(card);
    });
    
    // Initialize navigation if there's more than one testimonial
    if (DEPOIMENTOS.length > 1) {
        initDepoimentosNavigation();
    }
    
    // Initialize entry animation
    initDepoimentosAnimation();
}

/**
 * Creates a testimonial card
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
 * Initializes navigation between testimonials
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
    
    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        DEPOIMENTOS.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'depoimento-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Testimonial ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Navigation
    function goToSlide(index) {
        cards[currentIndex].classList.remove('active');
        currentIndex = index;
        if (currentIndex < 0) currentIndex = cards.length - 1;
        if (currentIndex >= cards.length) currentIndex = 0;
        cards[currentIndex].classList.add('active');
        
        // Update dots
        const dots = dotsContainer?.querySelectorAll('.depoimento-dot');
        dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Restart autoplay
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
    
    // Pause autoplay on mouse hover
    container.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    container.addEventListener('mouseleave', () => {
        if (SC.depoimentosAutoplay !== false) {
            startAutoplay();
        }
    });
    
    // Start autoplay
    if (SC.depoimentosAutoplay !== false) {
        startAutoplay();
    }
}

/**
 * Initializes entry animation - removed as it now uses display:none/block
 */
function initDepoimentosAnimation() {
    // Animation is now done via CSS keyframes in the card itself
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initDepoimentos);
