/**
 * ============================================
 * BUBBLE MENU - Vanilla JS (English Version)
 * ============================================
 * Converted from React to vanilla JS
 * Compact version that appears inside the card on scroll
 */

(function() {
    'use strict';
    
    // Check configuration in SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    if (SC.bubbleMenuValores === false) return;
    
    // Settings
    const CONFIG = {
        animationEase: SC.bubbleMenuAnimationEase || 'back.out(1.5)',
        animationDuration: SC.bubbleMenuAnimationDuration || 0.5,
        staggerDelay: SC.bubbleMenuStaggerDelay || 0.08
    };

    // Menu items - Company Values (English)
    const VALORES_ITEMS = [
        {
            label: 'Customer First',
            rotation: 0,
            hoverStyles: { bgColor: '#00249C', textColor: '#ffffff' }
        },
        {
            label: 'Transparency',
            rotation: 0,
            hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
        },
        {
            label: 'Innovation',
            rotation: 0,
            hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
        },
        {
            label: 'Teamwork',
            rotation: 0,
            hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
        },
        {
            label: 'Making a Difference',
            rotation: 0,
            hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
        }
    ];

    class BubbleValores {
        constructor(container) {
            this.container = container;
            this.items = VALORES_ITEMS;
            this.bubbles = [];
            this.hasAnimated = false;
            
            this.init();
        }
        
        init() {
            this.render();
            this.setupScrollObserver();
        }
        
        render() {
            // Create pills container
            const pillsContainer = document.createElement('div');
            pillsContainer.className = 'valores-pills-inline';
            
            this.items.forEach((item, idx) => {
                const pill = document.createElement('span');
                pill.className = 'valor-pill';
                pill.textContent = item.label;
                pill.style.setProperty('--item-rot', `${item.rotation || 0}deg`);
                pill.style.setProperty('--hover-bg', item.hoverStyles?.bgColor || '#00249C');
                pill.style.setProperty('--hover-color', item.hoverStyles?.textColor || '#ffffff');
                
                // Initial state: invisible
                pill.style.opacity = '0';
                pill.style.transform = 'scale(0.5) translateY(20px)';
                
                pillsContainer.appendChild(pill);
                this.bubbles.push(pill);
            });
            
            this.container.appendChild(pillsContainer);
            this.pillsContainer = pillsContainer;
        }
        
        setupScrollObserver() {
            // Use Intersection Observer to detect when the card is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.animateIn();
                        this.hasAnimated = true;
                    }
                });
            }, {
                threshold: 0.3, // Animate when 30% of the card is visible
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(this.container);
        }
        
        animateIn() {
            // Check if GSAP is available
            if (typeof gsap === 'undefined') {
                // Fallback without GSAP
                this.bubbles.forEach((pill, i) => {
                    setTimeout(() => {
                        pill.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        pill.style.opacity = '1';
                        pill.style.transform = `scale(1) rotate(var(--item-rot))`;
                    }, i * 100);
                });
                return;
            }
            
            // Animation with GSAP
            this.bubbles.forEach((pill, i) => {
                const delay = i * CONFIG.staggerDelay + gsap.utils.random(-0.02, 0.02);
                
                gsap.to(pill, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotation: parseFloat(pill.style.getPropertyValue('--item-rot')) || 0,
                    duration: CONFIG.animationDuration,
                    delay: delay,
                    ease: CONFIG.animationEase
                });
            });
        }
    }

    // Initialize when DOM is ready
    function initBubbleValores() {
        const container = document.querySelector('.valores-bubble-container');
        if (!container) return;
        
        new BubbleValores(container);
    }

    // Wait for DOM and scripts to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBubbleValores);
    } else {
        setTimeout(initBubbleValores, 100);
    }

    // Export for global use
    window.BubbleValores = BubbleValores;
})();
