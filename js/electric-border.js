/**
 * ============================================
 * ELECTRIC BORDER - Borda animada elétrica
 * Convertido de React para Vanilla JS
 * Crédito: @BalintFerenczy - codepen.io/BalintFerenczy/pen/KwdoyEN
 * ============================================
 */

(function() {
    'use strict';
    
    // Ler configuração do SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Se desabilitado, não executa
    if (SC.electricBorder === false) return;
    
    const CONFIG = {
        color: SC.electricBorderColor || '#00249C',
        speed: SC.electricBorderSpeed || 1,
        chaos: SC.electricBorderChaos || 0.12,
        borderRadius: SC.electricBorderRadius || 16
    };
    
    class ElectricBorder {
        constructor(element, options = {}) {
            this.element = element;
            this.options = {
                color: options.color || CONFIG.color,
                speed: options.speed || CONFIG.speed,
                chaos: options.chaos || CONFIG.chaos,
                borderRadius: options.borderRadius || CONFIG.borderRadius
            };
            
            this.canvas = null;
            this.ctx = null;
            this.animationId = null;
            this.time = 0;
            this.lastFrameTime = 0;
            
            this.init();
        }
        
        init() {
            // Criar estrutura do wrapper
            this.wrapper = document.createElement('div');
            this.wrapper.className = 'electric-border-wrapper';
            this.wrapper.style.setProperty('--electric-border-color', this.options.color);
            this.wrapper.style.borderRadius = this.options.borderRadius + 'px';
            
            // Mover elemento para dentro do wrapper
            this.element.parentNode.insertBefore(this.wrapper, this.element);
            
            // Criar canvas container
            this.canvasContainer = document.createElement('div');
            this.canvasContainer.className = 'eb-canvas-container';
            
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'eb-canvas';
            this.canvasContainer.appendChild(this.canvas);
            
            // Criar layers de glow
            this.layers = document.createElement('div');
            this.layers.className = 'eb-layers';
            this.layers.innerHTML = `
                <div class="eb-glow-1"></div>
                <div class="eb-glow-2"></div>
                <div class="eb-background-glow"></div>
            `;
            
            // Criar container de conteúdo
            this.content = document.createElement('div');
            this.content.className = 'eb-content';
            this.content.appendChild(this.element);
            
            // Montar estrutura
            this.wrapper.appendChild(this.canvasContainer);
            this.wrapper.appendChild(this.layers);
            this.wrapper.appendChild(this.content);
            
            // Inicializar canvas
            this.ctx = this.canvas.getContext('2d');
            this.updateSize();
            
            // Observar redimensionamento
            this.resizeObserver = new ResizeObserver(() => this.updateSize());
            this.resizeObserver.observe(this.wrapper);
            
            // Iniciar animação
            this.animate(performance.now());
        }
        
        // Funções de ruído
        random(x) {
            return (Math.sin(x * 12.9898) * 43758.5453) % 1;
        }
        
        noise2D(x, y) {
            const i = Math.floor(x);
            const j = Math.floor(y);
            const fx = x - i;
            const fy = y - j;
            
            const a = this.random(i + j * 57);
            const b = this.random(i + 1 + j * 57);
            const c = this.random(i + (j + 1) * 57);
            const d = this.random(i + 1 + (j + 1) * 57);
            
            const ux = fx * fx * (3.0 - 2.0 * fx);
            const uy = fy * fy * (3.0 - 2.0 * fy);
            
            return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
        }
        
        octavedNoise(x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) {
            let y = 0;
            let amplitude = baseAmplitude;
            let frequency = baseFrequency;
            
            for (let i = 0; i < octaves; i++) {
                let octaveAmplitude = amplitude;
                if (i === 0) {
                    octaveAmplitude *= baseFlatness;
                }
                y += octaveAmplitude * this.noise2D(frequency * x + seed * 100, time * frequency * 0.3);
                frequency *= lacunarity;
                amplitude *= gain;
            }
            
            return y;
        }
        
        getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
            const angle = startAngle + progress * arcLength;
            return {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            };
        }
        
        getRoundedRectPoint(t, left, top, width, height, radius) {
            const straightWidth = width - 2 * radius;
            const straightHeight = height - 2 * radius;
            const cornerArc = (Math.PI * radius) / 2;
            const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
            const distance = t * totalPerimeter;
            
            let accumulated = 0;
            
            // Top edge
            if (distance <= accumulated + straightWidth) {
                const progress = (distance - accumulated) / straightWidth;
                return { x: left + radius + progress * straightWidth, y: top };
            }
            accumulated += straightWidth;
            
            // Top-right corner
            if (distance <= accumulated + cornerArc) {
                const progress = (distance - accumulated) / cornerArc;
                return this.getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
            }
            accumulated += cornerArc;
            
            // Right edge
            if (distance <= accumulated + straightHeight) {
                const progress = (distance - accumulated) / straightHeight;
                return { x: left + width, y: top + radius + progress * straightHeight };
            }
            accumulated += straightHeight;
            
            // Bottom-right corner
            if (distance <= accumulated + cornerArc) {
                const progress = (distance - accumulated) / cornerArc;
                return this.getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
            }
            accumulated += cornerArc;
            
            // Bottom edge
            if (distance <= accumulated + straightWidth) {
                const progress = (distance - accumulated) / straightWidth;
                return { x: left + width - radius - progress * straightWidth, y: top + height };
            }
            accumulated += straightWidth;
            
            // Bottom-left corner
            if (distance <= accumulated + cornerArc) {
                const progress = (distance - accumulated) / cornerArc;
                return this.getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
            }
            accumulated += cornerArc;
            
            // Left edge
            if (distance <= accumulated + straightHeight) {
                const progress = (distance - accumulated) / straightHeight;
                return { x: left, y: top + height - radius - progress * straightHeight };
            }
            accumulated += straightHeight;
            
            // Top-left corner
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
        }
        
        updateSize() {
            const borderOffset = 60;
            const rect = this.wrapper.getBoundingClientRect();
            this.width = rect.width + borderOffset * 2;
            this.height = rect.height + borderOffset * 2;
            
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.canvas.width = this.width * dpr;
            this.canvas.height = this.height * dpr;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
            this.ctx.scale(dpr, dpr);
            this.dpr = dpr;
        }
        
        animate(currentTime) {
            const deltaTime = (currentTime - this.lastFrameTime) / 1000;
            this.time += deltaTime * this.options.speed;
            this.lastFrameTime = currentTime;
            
            this.draw();
            
            this.animationId = requestAnimationFrame((t) => this.animate(t));
        }
        
        draw() {
            const ctx = this.ctx;
            const borderOffset = 60;
            
            // Configuração
            const octaves = 10;
            const lacunarity = 1.6;
            const gain = 0.7;
            const amplitude = this.options.chaos;
            const frequency = 10;
            const baseFlatness = 0;
            const displacement = 60;
            
            // Limpar canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.scale(this.dpr, this.dpr);
            
            ctx.strokeStyle = this.options.color;
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            const scale = displacement;
            const left = borderOffset;
            const top = borderOffset;
            const borderWidth = this.width - 2 * borderOffset;
            const borderHeight = this.height - 2 * borderOffset;
            const maxRadius = Math.min(borderWidth, borderHeight) / 2;
            const radius = Math.min(this.options.borderRadius, maxRadius);
            
            const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
            const sampleCount = Math.floor(approximatePerimeter / 2);
            
            ctx.beginPath();
            
            for (let i = 0; i <= sampleCount; i++) {
                const progress = i / sampleCount;
                
                const point = this.getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
                
                const xNoise = this.octavedNoise(
                    progress * 8, octaves, lacunarity, gain, amplitude, frequency, this.time, 0, baseFlatness
                );
                
                const yNoise = this.octavedNoise(
                    progress * 8, octaves, lacunarity, gain, amplitude, frequency, this.time, 1, baseFlatness
                );
                
                const displacedX = point.x + xNoise * scale;
                const displacedY = point.y + yNoise * scale;
                
                if (i === 0) {
                    ctx.moveTo(displacedX, displacedY);
                } else {
                    ctx.lineTo(displacedX, displacedY);
                }
            }
            
            ctx.closePath();
            ctx.stroke();
        }
        
        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
        }
    }
    
    // Função para aplicar o efeito
    function applyElectricBorder(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Evitar aplicar duas vezes
            if (el.closest('.electric-border-wrapper')) return;
            new ElectricBorder(el, options);
        });
    }
    
    // Inicializar quando DOM estiver pronto
    function init() {
        // Título "Principais Produtos"
        if (SC.electricBorderTitulo !== false) {
            applyElectricBorder('#produtos .section-tag-large', { borderRadius: 50 });
        }
        
        // Cards do carrossel de produtos
        if (SC.electricBorderProductCards !== false) {
            applyElectricBorder('.products-track .product-card.active', { borderRadius: 16 });
        }
        
        // Ícones dos cards de produtos
        if (SC.electricBorderProductIcons !== false) {
            applyElectricBorder('.product-icon', { borderRadius: 12, chaos: 0.08 });
        }
        
        // Cards Missão, Valores, Visão
        if (SC.electricBorderInstitucional !== false) {
            applyElectricBorder('.institucional-item', { borderRadius: 16 });
        }
        
        // Seção Contato
        if (SC.electricBorderContato !== false) {
            applyElectricBorder('.contato .contact-card', { borderRadius: 16 });
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expor globalmente para uso manual
    window.ElectricBorder = ElectricBorder;
    window.applyElectricBorder = applyElectricBorder;
})();
