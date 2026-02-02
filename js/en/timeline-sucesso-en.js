/**
 * ============================================
 * SUCCESS TIMELINE - Audicom Route (English)
 * ============================================
 * Expandable interactive timeline with fiber optic effect
 * connecting the company's historical milestones
 */

(function() {
    'use strict';
    
    // Read SiteConfig settings
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Check if the feature is enabled
    if (SC.timelineSucesso === false) {
        const section = document.getElementById('timeline-sucesso');
        if (section) section.style.display = 'none';
        return;
    }
    
    // Settings
    const CONFIG = {
        animationDuration: SC.timelineSucessoAnimationDuration || 0.6,
        fiberSpeed: SC.timelineSucessoFiberSpeed || 2,
        particleCount: SC.timelineSucessoParticleCount || 50,
        glowIntensity: SC.timelineSucessoGlowIntensity || 0.8,
        autoCollapse: SC.timelineSucessoAutoCollapse !== false
    };
    
    // Timeline data
    const timelineData = [
        {
            year: '2002-2015',
            title: 'The Beginning: IT Roots',
            description: 'Started with enterprise technology solutions—timekeeping systems, access control, and broadband links for select rural clients around Uberlândia (MG). Quickly earned recognition for delivering practical, efficient solutions in a competitive market.',
            icon: 'foundation'
        },
        {
            year: '2016',
            title: 'Entering the Telecom Game',
            description: 'Launched wireless internet operations serving rural Uberlândia (MG). Our first major step beyond traditional IT services.',
            icon: 'launch'
        },
        {
            year: '2017',
            title: 'Building Momentum',
            description: 'Delivered high bandwidth with low latency, setting a new standard for rural connectivity. Quickly became the regional go-to for reliable internet.',
            icon: 'speed'
        },
        {
            year: '2018',
            title: 'Regional Expansion',
            description: 'Grew our wireless network with new towers in Indianópolis, Araguari, Tupaciguara, and Uberaba. Extended coverage and strengthened our regional footprint.',
            icon: 'tower'
        },
        {
            year: '2019',
            title: 'Scaling Up',
            description: 'Strategic fiber investments expanded bandwidth capacity at access points. Launched more robust plans while keeping the quality that sets Audicom apart.',
            icon: 'scale'
        },
        {
            year: '2020',
            title: 'Rising to the Pandemic Challenge',
            description: 'COVID-19 accelerated the need for reliable connectivity. We completely restructured our backbone, quadrupling capacity and implementing multiple routes for resilience when it mattered most.',
            icon: 'resilience'
        },
        {
            year: '2021',
            title: 'Fiber Optic Pioneer',
            description: 'Connected towers via fiber optic, dramatically improving network quality. Began fiber expansion to rural areas and neighboring cities. Made history as the first to deliver end-to-end fiber to Tapuirama.',
            icon: 'fiber'
        },
        {
            year: '2022',
            title: 'Corporate Market Breakthrough',
            description: 'With solid infrastructure in place, we moved strategically into the corporate market. Created custom solutions for businesses and large-scale events, becoming the first choice for enterprise connectivity.',
            icon: 'corporate'
        },
        {
            year: '2023',
            title: 'New HQ, New Chapter',
            description: 'Moved into modern headquarters designed for our team, clients, and partners. The new space reinforces our culture of innovation and sets the stage for continued growth.',
            icon: 'building'
        },
        {
            year: '2024',
            title: 'Investing in the Future',
            description: 'Modernized our backbone with advanced technologies. Increased availability and added support for new products—keeping Audicom one step ahead in quality and innovation.',
            icon: 'innovation'
        },
        {
            year: '2025',
            title: 'Going National',
            description: 'Recognized as a quality and service leader. Expanded operations to Uberaba and São Paulo, serving strategic clients with mission-critical operations. A milestone in our national journey.',
            icon: 'national'
        }
    ];
    
    // SVG icons for each milestone type
    const icons = {
        foundation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
            <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>
        </svg>`,
        launch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
            <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>`,
        speed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>`,
        tower: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2a5 5 0 010-8.4"/>
            <circle cx="12" cy="12" r="2"/>
            <path d="M16.2 7.8a5 5 0 010 8.4M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
            <path d="M12 14v8"/>
        </svg>`,
        scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3"/>
            <path d="M7 14l4-4 4 4 6-6"/>
            <path d="M17 8h4v4"/>
        </svg>`,
        resilience: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
        </svg>`,
        fiber: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="6" cy="6" r="3"/>
            <circle cx="18" cy="18" r="3"/>
            <path d="M6 9v4c0 2 1 3 3 3h6c2 0 3-1 3-3V9"/>
            <path d="M6 9c0-1.5.5-3 3-3h6c2.5 0 3 1.5 3 3"/>
        </svg>`,
        corporate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1"/>
            <path d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/>
        </svg>`,
        building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18"/>
            <path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/>
            <path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>
        </svg>`,
        innovation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            <circle cx="12" cy="12" r="4"/>
        </svg>`,
        national: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>`
    };
    
    class TimelineSucesso {
        constructor() {
            this.section = document.getElementById('timeline-sucesso');
            if (!this.section) return;
            
            this.isExpanded = false;
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.dataPackets = [];
            this.animationFrame = null;
            this.cards = [];
            
            this.init();
        }
        
        init() {
            this.createTimeline();
            this.setupCanvas();
            this.bindEvents();
            this.setupIntersectionObserver();
        }
        
        createTimeline() {
            const container = this.section.querySelector('.timeline-container');
            if (!container) return;
            
            let html = '';
            
            timelineData.forEach((item, index) => {
                html += `
                    <div class="timeline-card" data-index="${index}" style="--delay: ${index * 0.1}s">
                        <div class="timeline-card-connector">
                            <div class="connector-line"></div>
                            <div class="connector-node">
                                <div class="node-pulse"></div>
                                <div class="node-core"></div>
                            </div>
                            <div class="connector-particles"></div>
                        </div>
                        <div class="timeline-card-content">
                            <div class="timeline-card-icon">
                                ${icons[item.icon] || icons.foundation}
                            </div>
                            <div class="timeline-card-header">
                                <span class="timeline-year">${item.year}</span>
                                <h3 class="timeline-title">${item.title}</h3>
                            </div>
                            <p class="timeline-description">${item.description}</p>
                            <div class="timeline-card-glow"></div>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = html;
            this.cards = container.querySelectorAll('.timeline-card');
        }
        
        setupCanvas() {
            this.canvas = this.section.querySelector('.timeline-fiber-canvas');
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            
            // Create initial particles
            this.initParticles();
            this.initDataPackets();
        }
        
        resizeCanvas() {
            if (!this.canvas) return;
            
            const container = this.section.querySelector('.timeline-wrapper');
            if (!container) return;
            
            const rect = container.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = container.scrollHeight || rect.height;
        }
        
        initParticles() {
            this.particles = [];
            
            for (let i = 0; i < CONFIG.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: Math.random() * CONFIG.fiberSpeed + 1,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.3,
                    hue: Math.random() * 30 + 210 // Blue
                });
            }
        }
        
        initDataPackets() {
            this.dataPackets = [];
            
            // Create data packets that flow through the center line
            for (let i = 0; i < 8; i++) {
                this.dataPackets.push({
                    y: Math.random() * this.canvas.height,
                    speed: Math.random() * 3 + 2,
                    size: Math.random() * 6 + 4,
                    opacity: Math.random() * 0.5 + 0.5,
                    trail: []
                });
            }
        }
        
        animateParticles() {
            if (!this.ctx || !this.isExpanded) return;
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            const centerX = this.canvas.width * 0.08;
            
            // Draw center fiber line with more elaborate effect
            this.drawFiberLine(centerX);
            
            // Draw data packets
            this.drawDataPackets(centerX);
            
            // Update and draw particles
            this.drawParticles(centerX);
            
            this.animationFrame = requestAnimationFrame(() => this.animateParticles());
        }
        
        drawFiberLine(centerX) {
            // Main line with gradient
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, 'rgba(0, 36, 156, 0)');
            gradient.addColorStop(0.05, 'rgba(0, 212, 255, 0.4)');
            gradient.addColorStop(0.5, 'rgba(0, 36, 156, 0.6)');
            gradient.addColorStop(0.95, 'rgba(0, 212, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 36, 156, 0)');
            
            // External glow
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
            this.ctx.lineWidth = 20;
            this.ctx.moveTo(centerX, 0);
            this.ctx.lineTo(centerX, this.canvas.height);
            this.ctx.stroke();
            
            // Medium line
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0, 36, 156, 0.3)';
            this.ctx.lineWidth = 8;
            this.ctx.moveTo(centerX, 0);
            this.ctx.lineTo(centerX, this.canvas.height);
            this.ctx.stroke();
            
            // Thin center line
            this.ctx.beginPath();
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 3;
            this.ctx.moveTo(centerX, 0);
            this.ctx.lineTo(centerX, this.canvas.height);
            this.ctx.stroke();
        }
        
        drawDataPackets(centerX) {
            const time = Date.now() * 0.001;
            
            this.dataPackets.forEach(packet => {
                // Move packet
                packet.y += packet.speed;
                
                // Reset when leaving screen
                if (packet.y > this.canvas.height + 20) {
                    packet.y = -20;
                    packet.speed = Math.random() * 3 + 2;
                }
                
                // Add position to trail
                packet.trail.unshift({ x: centerX, y: packet.y });
                if (packet.trail.length > 15) packet.trail.pop();
                
                // Draw trail
                packet.trail.forEach((pos, i) => {
                    const alpha = (1 - i / packet.trail.length) * packet.opacity * 0.5;
                    const size = packet.size * (1 - i / packet.trail.length * 0.5);
                    
                    this.ctx.beginPath();
                    const trailGradient = this.ctx.createRadialGradient(
                        pos.x, pos.y, 0,
                        pos.x, pos.y, size
                    );
                    trailGradient.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
                    trailGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
                    
                    this.ctx.fillStyle = trailGradient;
                    this.ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
                    this.ctx.fill();
                });
                
                // Draw main packet with pulsation
                const pulse = Math.sin(time * 5 + packet.y * 0.01) * 0.3 + 0.7;
                
                this.ctx.beginPath();
                const packetGradient = this.ctx.createRadialGradient(
                    centerX, packet.y, 0,
                    centerX, packet.y, packet.size * 1.5 * pulse
                );
                packetGradient.addColorStop(0, `rgba(0, 212, 255, ${packet.opacity})`);
                packetGradient.addColorStop(0.5, 'rgba(0, 36, 156, 0.5)');
                packetGradient.addColorStop(1, 'rgba(0, 36, 156, 0)');
                
                this.ctx.fillStyle = packetGradient;
                this.ctx.arc(centerX, packet.y, packet.size * 1.5 * pulse, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }
        
        drawParticles(centerX) {
            this.particles.forEach(p => {
                // Movement
                p.x += p.vx;
                p.y += p.vy;
                
                // Reset when leaving screen
                if (p.y > this.canvas.height) {
                    p.y = 0;
                    p.x = centerX + (Math.random() - 0.5) * 60;
                }
                
                // Attraction to center line
                const dx = centerX - p.x;
                p.vx += dx * 0.002;
                p.vx *= 0.98;
                
                // Draw particle
                this.ctx.beginPath();
                const particleGradient = this.ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.size * 2
                );
                particleGradient.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${p.opacity})`);
                particleGradient.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);
                
                this.ctx.fillStyle = particleGradient;
                this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }
        
        bindEvents() {
            const toggleBtn = this.section.querySelector('.timeline-toggle-btn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }
            
            // Resize handler
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (this.isExpanded) {
                        this.resizeCanvas();
                        this.initParticles();
                        this.initDataPackets();
                    }
                }, 100);
            });
            
            // Hover on cards for extra effect
            this.cards.forEach(card => {
                card.addEventListener('mouseenter', () => this.onCardHover(card, true));
                card.addEventListener('mouseleave', () => this.onCardHover(card, false));
            });
        }
        
        onCardHover(card, isHovering) {
            const node = card.querySelector('.node-core');
            if (node) {
                if (isHovering) {
                    node.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    node.style.boxShadow = '0 0 20px rgba(0, 212, 255, 1), 0 0 40px rgba(0, 36, 156, 0.8)';
                } else {
                    node.style.transform = 'translate(-50%, -50%) scale(1)';
                    node.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.8), 0 0 20px rgba(0, 36, 156, 0.6)';
                }
            }
        }
        
        setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && this.isExpanded) {
                        this.animateParticles();
                    } else {
                        cancelAnimationFrame(this.animationFrame);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(this.section);
        }
        
        toggle() {
            this.isExpanded = !this.isExpanded;
            
            const wrapper = this.section.querySelector('.timeline-wrapper');
            const toggleBtn = this.section.querySelector('.timeline-toggle-btn');
            const toggleText = toggleBtn?.querySelector('.toggle-text');
            
            if (this.isExpanded) {
                // Expand
                wrapper?.classList.add('expanded');
                toggleBtn?.classList.add('expanded');
                if (toggleText) toggleText.textContent = 'Collapse History';
                
                // Resize canvas after expanding
                setTimeout(() => {
                    this.resizeCanvas();
                    this.initParticles();
                    this.initDataPackets();
                    this.animateParticles();
                    this.animateCardsIn();
                }, 100);
                
                // Smooth scroll to timeline
                setTimeout(() => {
                    const wrapperRect = wrapper?.getBoundingClientRect();
                    if (wrapperRect && wrapperRect.top < 100) {
                        this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            } else {
                // Collapse
                wrapper?.classList.remove('expanded');
                toggleBtn?.classList.remove('expanded');
                if (toggleText) toggleText.textContent = 'View Our History';
                
                cancelAnimationFrame(this.animationFrame);
                this.animateCardsOut();
            }
        }
        
        animateCardsIn() {
            if (typeof gsap === 'undefined') {
                // Fallback without GSAP
                this.cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
                return;
            }
            
            gsap.fromTo(this.cards, 
                {
                    opacity: 0,
                    x: -50,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: CONFIG.animationDuration,
                    stagger: 0.1,
                    ease: 'power3.out',
                    onComplete: () => {
                        this.cards.forEach(card => card.classList.add('visible'));
                    }
                }
            );
            
            // Animate nodes
            const nodes = this.section.querySelectorAll('.connector-node');
            gsap.fromTo(nodes,
                { scale: 0 },
                {
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'back.out(2)',
                    delay: 0.2
                }
            );
        }
        
        animateCardsOut() {
            if (typeof gsap === 'undefined') {
                this.cards.forEach(card => card.classList.remove('visible'));
                return;
            }
            
            gsap.to(this.cards, {
                opacity: 0,
                x: -30,
                duration: 0.3,
                stagger: 0.03,
                ease: 'power2.in',
                onComplete: () => {
                    this.cards.forEach(card => card.classList.remove('visible'));
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new TimelineSucesso());
    } else {
        new TimelineSucesso();
    }
})();
