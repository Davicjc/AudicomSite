/**
 * ============================================
 * TIMELINE DE SUCESSO - Rota Audicom
 * ============================================
 * Timeline interativa expansível com efeito de fibra óptica
 * conectando os marcos históricos da empresa
 */

(function() {
    'use strict';
    
    // Ler configurações do SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Verificar se o recurso está habilitado
    if (SC.timelineSucesso === false) {
        const section = document.getElementById('timeline-sucesso');
        if (section) section.style.display = 'none';
        return;
    }
    
    // Configurações
    const CONFIG = {
        animationDuration: SC.timelineSucessoAnimationDuration || 0.6,
        fiberSpeed: SC.timelineSucessoFiberSpeed || 2,
        particleCount: SC.timelineSucessoParticleCount || 50,
        glowIntensity: SC.timelineSucessoGlowIntensity || 0.8,
        autoCollapse: SC.timelineSucessoAutoCollapse !== false
    };
    
    // Dados da timeline
    const timelineData = [
        {
            year: '2002-2015',
            title: 'Origem e Consolidação em TI',
            description: 'Atuação voltada para soluções tecnológicas corporativas: sistemas de controle de ponto e acesso, além de links de internet banda larga para clientes pontuais em zonas rurais de Uberlândia (MG). Reconhecimento pela capacidade de oferecer soluções práticas e eficientes em um mercado crítico e competitivo.',
            icon: 'foundation'
        },
        {
            year: '2016',
            title: 'Entrada Oficial no Mercado de Telecom',
            description: 'Início das operações com internet via rádio para áreas rurais de Uberlândia (MG). Primeira grande expansão para além das soluções de TI tradicionais.',
            icon: 'launch'
        },
        {
            year: '2017',
            title: 'Consolidação da Performance',
            description: 'Entrega de alta largura de banda com baixa latência, garantindo experiência superior aos clientes rurais. Rápida consolidação como referência regional em conectividade.',
            icon: 'speed'
        },
        {
            year: '2018',
            title: 'Expansão Regional',
            description: 'Expansão da rede de rádios com novas torres em Indianópolis, Araguari, Tupaciguara e Uberaba. Ampliação da cobertura e fortalecimento da presença regional.',
            icon: 'tower'
        },
        {
            year: '2019',
            title: 'Escalabilidade e Robustez',
            description: 'Investimentos estratégicos com Fibra Óptica para ampliar a capacidade de largura de banda nos pontos de acesso. Lançamento de planos mais robustos, mantendo o padrão de qualidade que diferencia a Audicom no mercado.',
            icon: 'scale'
        },
        {
            year: '2020',
            title: 'Resposta Rápida à Pandemia',
            description: 'A COVID-19 acelerou a necessidade de conectividade confiável. Reestruturação completa do backbone, quadruplicando a capacidade de banda. Implementação de múltiplas rotas e proteções para garantir resiliência e continuidade de serviço em um momento crítico.',
            icon: 'resilience'
        },
        {
            year: '2021',
            title: 'Fibra Óptica com Pioneirismo',
            description: 'Interligação das torres via fibra óptica, elevando a qualidade e estabilidade da rede. Início da expansão da fibra óptica para zonas rurais e municípios vizinhos. Destaque para Tapuirama, onde a Audicom foi pioneira ao entregar fibra óptica ponta a ponta.',
            icon: 'fiber'
        },
        {
            year: '2022',
            title: 'Avanço no Mercado Corporativo',
            description: 'Estrutura consolidada permitiu entrada estratégica no mercado corporativo. Criação de soluções personalizadas para empresas e eventos de grande porte. Reconhecimento como primeira escolha em links corporativos.',
            icon: 'corporate'
        },
        {
            year: '2023',
            title: 'Nova Sede e Crescimento',
            description: 'Migração para uma nova sede moderna e funcional. Espaço projetado para colaboradores, clientes e parceiros, reforçando a cultura de inovação e produtividade. Expansão da equipe altamente qualificada.',
            icon: 'building'
        },
        {
            year: '2024',
            title: 'Investimento em Resiliência',
            description: 'Modernização do backbone com tecnologias avançadas. Aumento da disponibilidade e suporte para novos produtos. Estratégia voltada para manter a Audicom sempre um passo à frente em qualidade e inovação.',
            icon: 'innovation'
        },
        {
            year: '2025',
            title: 'Expansão Nacional',
            description: 'Reconhecimento pelo mercado como referência em qualidade e atendimento. Expansão das operações para Uberaba e São Paulo, atendendo clientes estratégicos com operações críticas. Marco de consolidação nacional.',
            icon: 'national'
        }
    ];
    
    // Ícones SVG para cada tipo de marco
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
            
            // Criar partículas iniciais
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
                    hue: Math.random() * 30 + 210 // Azul
                });
            }
        }
        
        initDataPackets() {
            this.dataPackets = [];
            
            // Criar pacotes de dados que fluem pela linha central
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
            
            // Desenhar linha central de fibra com efeito mais elaborado
            this.drawFiberLine(centerX);
            
            // Desenhar pacotes de dados
            this.drawDataPackets(centerX);
            
            // Atualizar e desenhar partículas
            this.drawParticles(centerX);
            
            this.animationFrame = requestAnimationFrame(() => this.animateParticles());
        }
        
        drawFiberLine(centerX) {
            // Linha principal com gradiente
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, 'rgba(0, 36, 156, 0)');
            gradient.addColorStop(0.05, 'rgba(0, 212, 255, 0.4)');
            gradient.addColorStop(0.5, 'rgba(0, 36, 156, 0.6)');
            gradient.addColorStop(0.95, 'rgba(0, 212, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 36, 156, 0)');
            
            // Glow externo
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
            this.ctx.lineWidth = 20;
            this.ctx.moveTo(centerX, 0);
            this.ctx.lineTo(centerX, this.canvas.height);
            this.ctx.stroke();
            
            // Linha média
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0, 36, 156, 0.3)';
            this.ctx.lineWidth = 8;
            this.ctx.moveTo(centerX, 0);
            this.ctx.lineTo(centerX, this.canvas.height);
            this.ctx.stroke();
            
            // Linha central fina
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
                // Mover pacote
                packet.y += packet.speed;
                
                // Reset quando sair da tela
                if (packet.y > this.canvas.height + 20) {
                    packet.y = -20;
                    packet.speed = Math.random() * 3 + 2;
                }
                
                // Adicionar posição ao trail
                packet.trail.unshift({ x: centerX, y: packet.y });
                if (packet.trail.length > 15) packet.trail.pop();
                
                // Desenhar trail
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
                
                // Desenhar pacote principal com pulsação
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
                // Movimento
                p.x += p.vx;
                p.y += p.vy;
                
                // Reset quando sair da tela
                if (p.y > this.canvas.height) {
                    p.y = 0;
                    p.x = centerX + (Math.random() - 0.5) * 60;
                }
                
                // Atração para a linha central
                const dx = centerX - p.x;
                p.vx += dx * 0.002;
                p.vx *= 0.98;
                
                // Desenhar partícula
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
            
            // Hover nos cards para efeito extra
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
                // Expandir
                wrapper?.classList.add('expanded');
                toggleBtn?.classList.add('expanded');
                if (toggleText) toggleText.textContent = 'Recolher História';
                
                // Resize canvas depois de expandir
                setTimeout(() => {
                    this.resizeCanvas();
                    this.initParticles();
                    this.initDataPackets();
                    this.animateParticles();
                    this.animateCardsIn();
                }, 100);
                
                // Scroll suave para a timeline
                setTimeout(() => {
                    const wrapperRect = wrapper?.getBoundingClientRect();
                    if (wrapperRect && wrapperRect.top < 100) {
                        this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            } else {
                // Recolher
                wrapper?.classList.remove('expanded');
                toggleBtn?.classList.remove('expanded');
                if (toggleText) toggleText.textContent = 'Ver Nossa História';
                
                cancelAnimationFrame(this.animationFrame);
                this.animateCardsOut();
            }
        }
        
        animateCardsIn() {
            if (typeof gsap === 'undefined') {
                // Fallback sem GSAP
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
            
            // Animar os nodes
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
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new TimelineSucesso());
    } else {
        new TimelineSucesso();
    }
})();
