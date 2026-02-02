/**
 * ============================================
 * LÍNEA DE TIEMPO DEL ÉXITO - Ruta Audicom (Español)
 * ============================================
 * Línea de tiempo interactiva expandible con efecto de fibra óptica
 * conectando los hitos históricos de la empresa
 */

(function() {
    'use strict';
    
    // Leer configuraciones de SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Verificar si la función está habilitada
    if (SC.timelineSucesso === false) {
        const section = document.getElementById('timeline-sucesso');
        if (section) section.style.display = 'none';
        return;
    }
    
    // Configuraciones
    const CONFIG = {
        animationDuration: SC.timelineSucessoAnimationDuration || 0.6,
        fiberSpeed: SC.timelineSucessoFiberSpeed || 2,
        particleCount: SC.timelineSucessoParticleCount || 50,
        glowIntensity: SC.timelineSucessoGlowIntensity || 0.8,
        autoCollapse: SC.timelineSucessoAutoCollapse !== false
    };
    
    // Datos de la línea de tiempo
    const timelineData = [
        {
            year: '2002-2015',
            title: 'Origen y Consolidación de TI',
            description: 'Enfoque en soluciones de tecnología corporativa: sistemas de control de horario y acceso, así como enlaces de internet de banda ancha para clientes específicos en áreas rurales de Uberlândia (MG). Reconocimiento por la capacidad de ofrecer soluciones prácticas y eficientes en un mercado crítico y competitivo.',
            icon: 'foundation'
        },
        {
            year: '2016',
            title: 'Entrada Oficial al Mercado Telecom',
            description: 'Lanzamiento de operaciones de internet por radio para áreas rurales de Uberlândia (MG). Primera gran expansión más allá de las soluciones tradicionales de TI.',
            icon: 'launch'
        },
        {
            year: '2017',
            title: 'Consolidación del Rendimiento',
            description: 'Entrega de alto ancho de banda con baja latencia, asegurando una experiencia superior para clientes rurales. Rápida consolidación como referencia regional en conectividad.',
            icon: 'speed'
        },
        {
            year: '2018',
            title: 'Expansión Regional',
            description: 'Expansión de la red de radio con nuevas torres en Indianópolis, Araguari, Tupaciguara y Uberaba. Mayor cobertura y presencia regional fortalecida.',
            icon: 'tower'
        },
        {
            year: '2019',
            title: 'Escalabilidad y Robustez',
            description: 'Inversiones estratégicas en fibra óptica para expandir la capacidad de ancho de banda en puntos de acceso. Lanzamiento de planes más robustos manteniendo el estándar de calidad que diferencia a Audicom en el mercado.',
            icon: 'scale'
        },
        {
            year: '2020',
            title: 'Respuesta Rápida a la Pandemia',
            description: 'COVID-19 aceleró la necesidad de conectividad confiable. Reestructuración completa del backbone, cuadruplicando la capacidad de ancho de banda. Implementación de múltiples rutas y protecciones para garantizar resiliencia y continuidad del servicio durante un momento crítico.',
            icon: 'resilience'
        },
        {
            year: '2021',
            title: 'Pioneros en Fibra Óptica',
            description: 'Interconexión de torres vía fibra óptica, elevando la calidad y estabilidad de la red. Inicio de la expansión de fibra óptica a áreas rurales y municipios vecinos. Destacado por Tapuirama, donde Audicom fue pionera en entregar fibra óptica de extremo a extremo.',
            icon: 'fiber'
        },
        {
            year: '2022',
            title: 'Avance en el Mercado Corporativo',
            description: 'Estructura consolidada que permitió la entrada estratégica al mercado corporativo. Creación de soluciones personalizadas para empresas y eventos a gran escala. Reconocimiento como primera opción para enlaces corporativos.',
            icon: 'corporate'
        },
        {
            year: '2023',
            title: 'Nueva Sede y Crecimiento',
            description: 'Migración a una nueva sede moderna y funcional. Espacio diseñado para empleados, clientes y socios, reforzando la cultura de innovación y productividad. Expansión del equipo altamente calificado.',
            icon: 'building'
        },
        {
            year: '2024',
            title: 'Inversión en Resiliencia',
            description: 'Modernización del backbone con tecnologías avanzadas. Mayor disponibilidad y soporte para nuevos productos. Estrategia enfocada en mantener a Audicom siempre un paso adelante en calidad e innovación.',
            icon: 'innovation'
        },
        {
            year: '2025',
            title: 'Expansión Nacional',
            description: 'Reconocimiento del mercado como referencia en calidad y servicio. Expansión de operaciones a Uberaba y São Paulo, atendiendo clientes estratégicos con operaciones críticas. Hito de consolidación nacional.',
            icon: 'national'
        }
    ];
    
    // Iconos SVG para cada tipo de hito
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
            
            // Crear partículas iniciales
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
            
            // Crear paquetes de datos que fluyen por la línea central
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
            
            // Dibujar línea de fibra central con efecto más elaborado
            this.drawFiberLine(centerX);
            
            // Dibujar paquetes de datos
            this.drawDataPackets(centerX);
            
            // Actualizar y dibujar partículas
            this.drawParticles(centerX);
            
            this.animationFrame = requestAnimationFrame(() => this.animateParticles());
        }
        
        drawFiberLine(centerX) {
            // Línea principal con gradiente
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, 'rgba(0, 36, 156, 0)');
            gradient.addColorStop(0.05, 'rgba(0, 212, 255, 0.4)');
            gradient.addColorStop(0.5, 'rgba(0, 36, 156, 0.6)');
            gradient.addColorStop(0.95, 'rgba(0, 212, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 36, 156, 0)');
            
            // Brillo externo
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
            this.ctx.lineWidth = 20;
            this.ctx.moveTo(centerX, 0);
            this.ctx.lineTo(centerX, this.canvas.height);
            this.ctx.stroke();
            
            // Línea media
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0, 36, 156, 0.3)';
            this.ctx.lineWidth = 8;
            this.ctx.moveTo(centerX, 0);
            this.ctx.lineTo(centerX, this.canvas.height);
            this.ctx.stroke();
            
            // Línea central delgada
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
                // Mover paquete
                packet.y += packet.speed;
                
                // Reiniciar al salir de la pantalla
                if (packet.y > this.canvas.height + 20) {
                    packet.y = -20;
                    packet.speed = Math.random() * 3 + 2;
                }
                
                // Agregar posición a la estela
                packet.trail.unshift({ x: centerX, y: packet.y });
                if (packet.trail.length > 15) packet.trail.pop();
                
                // Dibujar estela
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
                
                // Dibujar paquete principal con pulsación
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
                // Movimiento
                p.x += p.vx;
                p.y += p.vy;
                
                // Reiniciar al salir de la pantalla
                if (p.y > this.canvas.height) {
                    p.y = 0;
                    p.x = centerX + (Math.random() - 0.5) * 60;
                }
                
                // Atracción a la línea central
                const dx = centerX - p.x;
                p.vx += dx * 0.002;
                p.vx *= 0.98;
                
                // Dibujar partícula
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
            
            // Manejador de redimensionamiento
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
            
            // Hover en tarjetas para efecto extra
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
                if (toggleText) toggleText.textContent = 'Contraer Historia';
                
                // Redimensionar canvas después de expandir
                setTimeout(() => {
                    this.resizeCanvas();
                    this.initParticles();
                    this.initDataPackets();
                    this.animateParticles();
                    this.animateCardsIn();
                }, 100);
                
                // Desplazamiento suave a la línea de tiempo
                setTimeout(() => {
                    const wrapperRect = wrapper?.getBoundingClientRect();
                    if (wrapperRect && wrapperRect.top < 100) {
                        this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            } else {
                // Contraer
                wrapper?.classList.remove('expanded');
                toggleBtn?.classList.remove('expanded');
                if (toggleText) toggleText.textContent = 'Ver Nuestra Historia';
                
                cancelAnimationFrame(this.animationFrame);
                this.animateCardsOut();
            }
        }
        
        animateCardsIn() {
            if (typeof gsap === 'undefined') {
                // Fallback sin GSAP
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
            
            // Animar nodos
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
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new TimelineSucesso());
    } else {
        new TimelineSucesso();
    }
})();
