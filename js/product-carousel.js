/**
 * ============================================
 * PRODUCT CAROUSEL - Carrossel estilo coverflow
 * ============================================
 */

(function() {
    'use strict';
    
    // Configuração
    const CONFIG = {
        autoplayInterval: 5000,  // 5 segundos entre cada slide
        transitionDuration: 500, // 500ms de transição
        pauseOnHover: true       // Pausa quando mouse está em cima
    };
    
    let carousel, track, cards, dots;
    let currentIndex = 0;
    let autoplayTimer = null;
    let isHovered = false;
    
    function init() {
        carousel = document.querySelector('.products-carousel');
        if (!carousel) return;
        
        track = carousel.querySelector('.products-track');
        cards = carousel.querySelectorAll('.product-card');
        
        if (cards.length === 0) return;
        
        // Criar navegação
        createNavigation();
        
        // Event listeners
        setupEventListeners();
        
        // Iniciar autoplay
        startAutoplay();
        
        // Atualizar estado inicial
        updateCarousel();
    }
    
    function createNavigation() {
        // Setas nas laterais
        const navArrows = document.createElement('div');
        navArrows.className = 'carousel-nav';
        
        // Seta esquerda
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn carousel-prev';
        prevBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        `;
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        });
        
        // Seta direita
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn carousel-next';
        nextBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        });
        
        navArrows.appendChild(prevBtn);
        navArrows.appendChild(nextBtn);
        carousel.appendChild(navArrows);
    }
    
    function setupEventListeners() {
        // Pause on hover
        if (CONFIG.pauseOnHover) {
            carousel.addEventListener('mouseenter', () => {
                isHovered = true;
                stopAutoplay();
            });
            
            carousel.addEventListener('mouseleave', () => {
                isHovered = false;
                startAutoplay();
            });
        }
        
        // Clique nos cards laterais
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== currentIndex) {
                    goToSlide(index);
                    resetAutoplay();
                }
            });
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
                resetAutoplay();
            }
        }
    }
    
    function goToSlide(index) {
        // Loop infinito
        if (index < 0) {
            currentIndex = cards.length - 1;
        } else if (index >= cards.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        updateCarousel();
    }
    
    function updateCarousel() {
        const total = cards.length;
        
        cards.forEach((card, index) => {
            // Remover todas as classes
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            
            // Calcular posição relativa ao atual
            let diff = index - currentIndex;
            
            // Ajustar para loop
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;
            
            // Aplicar classe baseada na posição
            if (diff === 0) {
                card.classList.add('active');
            } else if (diff === -1) {
                card.classList.add('prev');
            } else if (diff === 1) {
                card.classList.add('next');
            } else if (diff < -1) {
                card.classList.add('far-prev');
            } else {
                card.classList.add('far-next');
            }
        });
        
        // Atualizar dots
        if (dots) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    }
    
    function startAutoplay() {
        if (autoplayTimer || isHovered) return;
        
        autoplayTimer = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, CONFIG.autoplayInterval);
    }
    
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    
    function resetAutoplay() {
        stopAutoplay();
        if (!isHovered) {
            startAutoplay();
        }
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
