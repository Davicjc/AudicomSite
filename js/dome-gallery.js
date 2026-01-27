/**
 * ============================================
 * DOME GALLERY - Galeria 3D Esférica
 * ============================================
 * Baseado no ReactBits DomeGallery, convertido para vanilla JS
 * Exibe logos/imagens em uma esfera 3D interativa
 */

(function() {
    'use strict';
    
    // Ler configurações do SiteConfig
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    
    // Verificar se a galeria está ativada
    if (SC.domeGallery === false) return;
    
    // Detectar dispositivo
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 480;
    
    // Função para obter configurações baseadas no tamanho de tela
    // Mobile (<=480px): Configurações específicas para telefone
    // Demais tamanhos (>480px): Mesmas configurações do PC
    function getResponsiveConfig() {
        if (isMobile) {
            // Configurações específicas para telefone - NÃO ALTERAR
            return {
                segments: 20,
                fit: 0.9,
                minRadius: 200,
                maxRadius: 300
            };
        } else {
            // Configurações PC para TODOS os outros tamanhos (tablet, laptop, desktop)
            return {
                segments: SC.domeGallerySegments || 34,
                fit: SC.domeGalleryFit || 0.8,
                minRadius: SC.domeGalleryMinRadius || 350,
                maxRadius: SC.domeGalleryMaxRadius || 600
            };
        }
    }
    
    const responsiveConfig = getResponsiveConfig();
    
    // Configurações padrão - ajustadas dinamicamente
    const CONFIG = {
        segments: responsiveConfig.segments,
        fit: responsiveConfig.fit,
        minRadius: responsiveConfig.minRadius,
        maxRadius: responsiveConfig.maxRadius,
        padFactor: SC.domeGalleryPadFactor || 0.25,
        overlayBlurColor: SC.domeGalleryBlurColor || '#081535',
        maxVerticalRotationDeg: SC.domeGalleryMaxVerticalRotation || 5,
        dragSensitivity: SC.domeGalleryDragSensitivity || 20,
        dragEnabled: SC.domeGalleryDragEnabled !== false ? SC.domeGalleryDragEnabled : false,
        enlargeTransitionMs: SC.domeGalleryEnlargeTransition || 300,
        dragDampening: SC.domeGalleryDragDampening || 2,
        imageBorderRadius: SC.domeGalleryImageBorderRadius || '12px',
        openedImageBorderRadius: SC.domeGalleryOpenedBorderRadius || '20px',
        openedImageWidth: SC.domeGalleryOpenedWidth || '250px',
        openedImageHeight: SC.domeGalleryOpenedHeight || '300px',
        grayscale: SC.domeGalleryGrayscale !== false,
        autoRotate: SC.domeGalleryAutoRotate !== false,
        autoRotateSpeed: SC.domeGalleryAutoRotateSpeed || 0.15,
        // Container/Wrapper:
        background: SC.domeGalleryBackground || 'rgba(8, 21, 53, 0.8)',
        borderRadius: SC.domeGalleryBorderRadius || 18,
        // Contorno Neon:
        neonBorder: SC.domeGalleryNeonBorder || false,
        neonColor: SC.domeGalleryNeonColor || '#00249C',
        neonIntensity: SC.domeGalleryNeonIntensity || 0.5,
        neonPulse: SC.domeGalleryNeonPulse !== false,
        neonPulseSpeed: SC.domeGalleryNeonPulseSpeed || 3,
        // Tiles:
        tileBorder: SC.domeGalleryTileBorder !== false,
        tileBorderColor: SC.domeGalleryTileBorderColor || 'rgba(0, 36, 156, 0.4)',
        tileBackground: SC.domeGalleryTileBackground || 'rgba(8, 21, 53, 0.8)',
        tileHoverGlow: SC.domeGalleryTileHoverGlow !== false,
        tileHoverGlowColor: SC.domeGalleryTileHoverGlowColor || 'rgba(0, 36, 156, 0.4)',
        // Neon nas imagens:
        tileNeon: SC.domeGalleryTileNeon || false,
        tileNeonColor: SC.domeGalleryTileNeonColor || '#00249C',
        tileNeonIntensity: SC.domeGalleryTileNeonIntensity || 0.3,
        tileNeonPulse: SC.domeGalleryTileNeonPulse || false
    };
    
    /**
     * Injeta estilos dinâmicos da Dome Gallery
     */
    function injectDynamicStyles() {
        const existingStyle = document.getElementById('dome-gallery-dynamic-styles');
        if (existingStyle) existingStyle.remove();
        
        const style = document.createElement('style');
        style.id = 'dome-gallery-dynamic-styles';
        
        // Converter cor hex para rgba
        const hexToRgba = (hex, alpha) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        
        // Neon keyframes
        const neonKeyframes = CONFIG.neonPulse ? `
            @keyframes domeNeonPulse {
                0%, 100% {
                    box-shadow: 
                        0 0 20px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity)},
                        0 0 40px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity * 0.6)},
                        0 0 60px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity * 0.4)};
                }
                50% {
                    box-shadow: 
                        0 0 30px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity * 1.4)},
                        0 0 60px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity)},
                        0 0 90px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity * 0.6)};
                }
            }
        ` : '';
        
        // Keyframes para neon das imagens
        const tileNeonKeyframes = CONFIG.tileNeonPulse ? `
            @keyframes domeTileNeonPulse {
                0%, 100% {
                    box-shadow: 
                        0 0 8px ${hexToRgba(CONFIG.tileNeonColor, CONFIG.tileNeonIntensity)},
                        0 0 16px ${hexToRgba(CONFIG.tileNeonColor, CONFIG.tileNeonIntensity * 0.5)};
                }
                50% {
                    box-shadow: 
                        0 0 12px ${hexToRgba(CONFIG.tileNeonColor, CONFIG.tileNeonIntensity * 1.5)},
                        0 0 24px ${hexToRgba(CONFIG.tileNeonColor, CONFIG.tileNeonIntensity)};
                }
            }
        ` : '';
        
        // Estilo do neon border
        const neonStyle = CONFIG.neonBorder ? `
            .dome-gallery-neon-border {
                background: linear-gradient(135deg, 
                    ${CONFIG.neonColor} 0%, 
                    transparent 25%, 
                    transparent 75%, 
                    ${CONFIG.neonColor} 100%);
                box-shadow: 
                    0 0 20px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity)},
                    0 0 40px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity * 0.6)},
                    0 0 60px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity * 0.4)},
                    inset 0 0 20px ${hexToRgba(CONFIG.neonColor, CONFIG.neonIntensity * 0.2)};
                ${CONFIG.neonPulse ? `animation: domeNeonPulse ${CONFIG.neonPulseSpeed}s ease-in-out infinite;` : ''}
            }
            .dome-gallery-neon-border::before {
                background: linear-gradient(45deg, 
                    ${CONFIG.neonColor}, 
                    transparent, 
                    ${CONFIG.neonColor});
            }
        ` : `
            .dome-gallery-neon-border {
                background: transparent !important;
                box-shadow: none !important;
                animation: none !important;
            }
            .dome-gallery-neon-border::before {
                display: none !important;
            }
        `;
        
        // Estilo do container
        const containerStyle = `
            #dome-gallery-container {
                background: ${CONFIG.background};
                border-radius: ${CONFIG.borderRadius}px;
            }
        `;
        
        // Estilo dos tiles
        const tileNeonStyle = CONFIG.tileNeon ? `
            box-shadow: 
                0 0 8px ${hexToRgba(CONFIG.tileNeonColor, CONFIG.tileNeonIntensity)},
                0 0 16px ${hexToRgba(CONFIG.tileNeonColor, CONFIG.tileNeonIntensity * 0.5)};
            border-color: ${CONFIG.tileNeonColor};
            ${CONFIG.tileNeonPulse ? `animation: domeTileNeonPulse 2s ease-in-out infinite;` : ''}
        ` : '';
        
        const tileStyle = `
            .dome-gallery-item-image {
                background: ${CONFIG.tileBackground};
                border: ${CONFIG.tileBorder ? `1px solid ${CONFIG.tileBorderColor}` : 'none'};
                border-radius: ${CONFIG.imageBorderRadius};
                ${tileNeonStyle}
            }
            ${CONFIG.tileHoverGlow ? `
                .dome-gallery-item-image:hover {
                    box-shadow: 0 0 20px ${CONFIG.tileHoverGlowColor};
                    border-color: ${CONFIG.tileNeonColor || CONFIG.neonColor};
                }
            ` : `
                .dome-gallery-item-image:hover {
                    box-shadow: none;
                }
            `}
        `;
        
        style.textContent = neonKeyframes + tileNeonKeyframes + neonStyle + containerStyle + tileStyle;
        document.head.appendChild(style);
    }
    
    // Utilitários
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const normalizeAngle = d => ((d % 360) + 360) % 360;
    const wrapAngleSigned = deg => {
        const a = (((deg + 180) % 360) + 360) % 360;
        return a - 180;
    };
    const getDataNumber = (el, name, fallback) => {
        const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
        const n = attr == null ? NaN : parseFloat(attr);
        return Number.isFinite(n) ? n : fallback;
    };
    
    // Construir itens da grade - com distribuição aleatória
    function buildItems(pool, seg) {
        // Mais colunas para mais imagens visíveis
        const numCols = Math.min(seg, 34);
        const xCols = Array.from({ length: numCols }, (_, i) => -Math.floor(numCols) + i * 2);
        const evenYs = [-3, -1, 1, 3];   // 4 linhas
        const oddYs = [-2, 0, 2, 4];     // 4 linhas
        
        const coords = xCols.flatMap((x, c) => {
            const ys = c % 2 === 0 ? evenYs : oddYs;
            return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
        });
        
        const totalSlots = coords.length;
        console.log(`[DomeGallery] Criando ${totalSlots} slots para ${pool.length} imagens`);
        
        if (pool.length === 0) {
            return coords.map(c => ({ ...c, src: '', alt: '' }));
        }
        
        const normalizedImages = pool.map(image => {
            if (typeof image === 'string') {
                return { src: image, alt: '' };
            }
            return { src: image.src || '', alt: image.alt || '' };
        });
        
        // Embaralhar as imagens para distribuição mais aleatória
        const shuffleArray = (arr) => {
            const shuffled = [...arr];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };
        
        // Criar pool embaralhado múltiplas vezes para preencher todos os slots
        let imagePool = [];
        const repetitions = Math.ceil(totalSlots / normalizedImages.length);
        for (let r = 0; r < repetitions; r++) {
            imagePool = imagePool.concat(shuffleArray(normalizedImages));
        }
        
        // Pegar apenas os necessários
        const usedImages = imagePool.slice(0, totalSlots);
        
        // Função para verificar se uma imagem é vizinha de outra igual
        const isNearDuplicate = (arr, index, range = 3) => {
            const current = arr[index].src;
            for (let offset = 1; offset <= range; offset++) {
                if (index - offset >= 0 && arr[index - offset].src === current) return true;
                if (index + offset < arr.length && arr[index + offset].src === current) return true;
            }
            return false;
        };
        
        // Múltiplas passadas para minimizar repetições próximas
        for (let pass = 0; pass < 3; pass++) {
            for (let i = 0; i < usedImages.length; i++) {
                if (isNearDuplicate(usedImages, i, 2)) {
                    // Procurar uma imagem diferente para trocar
                    for (let j = i + 3; j < usedImages.length; j++) {
                        // Verificar se a troca melhora a situação
                        const currentSrc = usedImages[i].src;
                        const candidateSrc = usedImages[j].src;
                        
                        // Verificar se o candidato não causará problema na posição i
                        let candidateOk = true;
                        for (let k = 1; k <= 2; k++) {
                            if (i - k >= 0 && usedImages[i - k].src === candidateSrc) candidateOk = false;
                            if (i + k < usedImages.length && i + k !== j && usedImages[i + k].src === candidateSrc) candidateOk = false;
                        }
                        
                        // Verificar se mover o atual para j não causa problema
                        let currentOk = true;
                        for (let k = 1; k <= 2; k++) {
                            if (j - k >= 0 && j - k !== i && usedImages[j - k].src === currentSrc) currentOk = false;
                            if (j + k < usedImages.length && usedImages[j + k].src === currentSrc) currentOk = false;
                        }
                        
                        if (candidateOk && currentOk) {
                            [usedImages[i], usedImages[j]] = [usedImages[j], usedImages[i]];
                            break;
                        }
                    }
                }
            }
        }
        
        return coords.map((c, i) => ({
            ...c,
            src: usedImages[i].src,
            alt: usedImages[i].alt
        }));
    }
    
    function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
        const unit = 360 / segments / 2;
        const rotateY = unit * (offsetX + (sizeX - 1) / 2);
        const rotateX = unit * (offsetY - (sizeY - 1) / 2);
        return { rotateX, rotateY };
    }
    
    class DomeGallery {
        constructor(container, images) {
            this.container = container;
            this.images = images;
            this.config = CONFIG;
            
            // Refs
            this.rootEl = null;
            this.mainEl = null;
            this.sphereEl = null;
            this.frameEl = null;
            this.viewerEl = null;
            this.scrimEl = null;
            
            // Estado
            this.rotation = { x: 0, y: 0 };
            this.startRot = { x: 0, y: 0 };
            this.startPos = null;
            this.dragging = false;
            this.moved = false;
            this.inertiaRAF = null;
            this.opening = false;
            this.openStartedAt = 0;
            this.lastDragEndAt = 0;
            this.focusedEl = null;
            this.originalTilePosition = null;
            this.scrollLocked = false;
            this.lockedRadius = null;
            this.autoRotateRAF = null;
            
            this.init();
        }
        
        init() {
            this.createDOM();
            this.setupResizeObserver();
            this.setupDragHandlers();
            this.setupCloseHandlers();
            this.applyTransform(0, 0);
            
            if (this.config.autoRotate) {
                this.startAutoRotate();
            }
        }
        
        createDOM() {
            const items = buildItems(this.images, this.config.segments);
            console.log(`[DomeGallery] Criando DOM com ${items.length} itens`);
            
            this.rootEl = document.createElement('div');
            this.rootEl.className = 'dome-gallery-root';
            this.rootEl.style.cssText = `
                --segments-x: ${this.config.segments};
                --segments-y: ${this.config.segments};
                --overlay-blur-color: ${this.config.overlayBlurColor};
                --tile-radius: ${this.config.imageBorderRadius};
                --enlarge-radius: ${this.config.openedImageBorderRadius};
                --image-filter: ${this.config.grayscale ? 'grayscale(1)' : 'none'};
            `;
            
            this.mainEl = document.createElement('main');
            this.mainEl.className = 'dome-gallery-main';
            
            const stage = document.createElement('div');
            stage.className = 'dome-gallery-stage';
            
            this.sphereEl = document.createElement('div');
            this.sphereEl.className = 'dome-gallery-sphere';
            
            // Criar itens
            items.forEach((it, i) => {
                const item = document.createElement('div');
                item.className = 'dome-gallery-item';
                item.dataset.src = it.src;
                item.dataset.offsetX = it.x;
                item.dataset.offsetY = it.y;
                item.dataset.sizeX = it.sizeX;
                item.dataset.sizeY = it.sizeY;
                item.style.cssText = `
                    --offset-x: ${it.x};
                    --offset-y: ${it.y};
                    --item-size-x: ${it.sizeX};
                    --item-size-y: ${it.sizeY};
                `;
                
                const imageDiv = document.createElement('div');
                imageDiv.className = 'dome-gallery-item-image';
                imageDiv.setAttribute('role', 'button');
                imageDiv.setAttribute('tabindex', '0');
                imageDiv.setAttribute('aria-label', it.alt || 'Abrir imagem');
                
                const img = document.createElement('img');
                img.src = it.src;
                img.alt = it.alt;
                img.draggable = false;
                
                imageDiv.appendChild(img);
                item.appendChild(imageDiv);
                this.sphereEl.appendChild(item);
                
                // Event listeners
                imageDiv.addEventListener('click', (e) => this.onTileClick(e));
                imageDiv.addEventListener('pointerup', (e) => this.onTilePointerUp(e));
            });
            
            stage.appendChild(this.sphereEl);
            this.mainEl.appendChild(stage);
            
            // Overlays
            const overlay = document.createElement('div');
            overlay.className = 'dome-gallery-overlay';
            this.mainEl.appendChild(overlay);
            
            const overlayBlur = document.createElement('div');
            overlayBlur.className = 'dome-gallery-overlay dome-gallery-overlay-blur';
            this.mainEl.appendChild(overlayBlur);
            
            // Edge fades
            const edgeFadeTop = document.createElement('div');
            edgeFadeTop.className = 'dome-gallery-edge-fade dome-gallery-edge-fade-top';
            this.mainEl.appendChild(edgeFadeTop);
            
            const edgeFadeBottom = document.createElement('div');
            edgeFadeBottom.className = 'dome-gallery-edge-fade dome-gallery-edge-fade-bottom';
            this.mainEl.appendChild(edgeFadeBottom);
            
            // Viewer
            this.viewerEl = document.createElement('div');
            this.viewerEl.className = 'dome-gallery-viewer';
            
            this.scrimEl = document.createElement('div');
            this.scrimEl.className = 'dome-gallery-scrim';
            this.viewerEl.appendChild(this.scrimEl);
            
            this.frameEl = document.createElement('div');
            this.frameEl.className = 'dome-gallery-frame';
            this.viewerEl.appendChild(this.frameEl);
            
            this.mainEl.appendChild(this.viewerEl);
            this.rootEl.appendChild(this.mainEl);
            
            this.container.appendChild(this.rootEl);
        }
        
        applyTransform(xDeg, yDeg) {
            if (this.sphereEl) {
                this.sphereEl.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
            }
        }
        
        setupResizeObserver() {
            // Definir raio inicial
            const initialRadius = this.config.minRadius || 400;
            this.rootEl.style.setProperty('--radius', `${initialRadius}px`);
            this.rootEl.style.setProperty('--viewer-pad', '40px');
            console.log(`[DomeGallery] Raio inicial: ${initialRadius}px`);
            
            const ro = new ResizeObserver(entries => {
                const cr = entries[0].contentRect;
                const w = Math.max(1, cr.width);
                const h = Math.max(1, cr.height);
                console.log(`[DomeGallery] Resize: ${w}x${h}`);
                
                const minDim = Math.min(w, h);
                const aspect = w / h;
                
                let basis = aspect >= 1.3 ? w : minDim;
                let radius = basis * this.config.fit;
                const heightGuard = h * 1.35;
                radius = Math.min(radius, heightGuard);
                radius = clamp(radius, this.config.minRadius, this.config.maxRadius);
                this.lockedRadius = Math.round(radius);
                
                const viewerPad = Math.max(8, Math.round(minDim * this.config.padFactor));
                
                this.rootEl.style.setProperty('--radius', `${this.lockedRadius}px`);
                this.rootEl.style.setProperty('--viewer-pad', `${viewerPad}px`);
                console.log(`[DomeGallery] Novo raio: ${this.lockedRadius}px`);
                
                this.applyTransform(this.rotation.x, this.rotation.y);
            });
            
            ro.observe(this.rootEl);
        }
        
        setupDragHandlers() {
            // Se drag está desabilitado, não configurar handlers de arraste
            if (!this.config.dragEnabled) {
                console.log('[DomeGallery] Arraste com mouse desativado');
                return;
            }
            
            let velocity = { x: 0, y: 0 };
            let lastTime = 0;
            let lastPos = { x: 0, y: 0 };
            
            const onPointerDown = (e) => {
                if (this.focusedEl) return;
                this.stopInertia();
                this.stopAutoRotate();
                
                this.dragging = true;
                this.moved = false;
                this.startRot = { ...this.rotation };
                this.startPos = { x: e.clientX, y: e.clientY };
                lastPos = { x: e.clientX, y: e.clientY };
                lastTime = performance.now();
                velocity = { x: 0, y: 0 };
            };
            
            const onPointerMove = (e) => {
                if (this.focusedEl || !this.dragging || !this.startPos) return;
                
                const dxTotal = e.clientX - this.startPos.x;
                const dyTotal = e.clientY - this.startPos.y;
                
                if (!this.moved) {
                    const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
                    if (dist2 > 16) this.moved = true;
                }
                
                // Calcular velocidade
                const now = performance.now();
                const dt = now - lastTime;
                if (dt > 0) {
                    velocity.x = (e.clientX - lastPos.x) / dt * 16;
                    velocity.y = (e.clientY - lastPos.y) / dt * 16;
                }
                lastPos = { x: e.clientX, y: e.clientY };
                lastTime = now;
                
                const nextX = clamp(
                    this.startRot.x - dyTotal / this.config.dragSensitivity,
                    -this.config.maxVerticalRotationDeg,
                    this.config.maxVerticalRotationDeg
                );
                const nextY = wrapAngleSigned(this.startRot.y + dxTotal / this.config.dragSensitivity);
                
                if (this.rotation.x !== nextX || this.rotation.y !== nextY) {
                    this.rotation = { x: nextX, y: nextY };
                    this.applyTransform(nextX, nextY);
                }
            };
            
            const onPointerUp = (e) => {
                if (!this.dragging) return;
                this.dragging = false;
                
                if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
                    this.startInertia(velocity.x / this.config.dragSensitivity, velocity.y / this.config.dragSensitivity);
                } else if (this.config.autoRotate) {
                    this.startAutoRotate();
                }
                
                if (this.moved) {
                    this.lastDragEndAt = performance.now();
                }
                this.moved = false;
            };
            
            this.mainEl.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
        }
        
        stopInertia() {
            if (this.inertiaRAF) {
                cancelAnimationFrame(this.inertiaRAF);
                this.inertiaRAF = null;
            }
        }
        
        startInertia(vx, vy) {
            const MAX_V = 1.4;
            let vX = clamp(vx, -MAX_V, MAX_V) * 80;
            let vY = clamp(vy, -MAX_V, MAX_V) * 80;
            let frames = 0;
            const d = clamp(this.config.dragDampening ?? 0.6, 0, 1);
            const frictionMul = 0.94 + 0.055 * d;
            const stopThreshold = 0.015 - 0.01 * d;
            const maxFrames = Math.round(90 + 270 * d);
            
            const step = () => {
                vX *= frictionMul;
                vY *= frictionMul;
                
                if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
                    this.inertiaRAF = null;
                    if (this.config.autoRotate) this.startAutoRotate();
                    return;
                }
                if (++frames > maxFrames) {
                    this.inertiaRAF = null;
                    if (this.config.autoRotate) this.startAutoRotate();
                    return;
                }
                
                const nextX = clamp(
                    this.rotation.x - vY / 200,
                    -this.config.maxVerticalRotationDeg,
                    this.config.maxVerticalRotationDeg
                );
                const nextY = wrapAngleSigned(this.rotation.y + vX / 200);
                this.rotation = { x: nextX, y: nextY };
                this.applyTransform(nextX, nextY);
                
                this.inertiaRAF = requestAnimationFrame(step);
            };
            
            this.stopInertia();
            this.inertiaRAF = requestAnimationFrame(step);
        }
        
        startAutoRotate() {
            if (this.autoRotateRAF) return;
            
            const rotate = () => {
                if (this.dragging || this.focusedEl) {
                    this.autoRotateRAF = null;
                    return;
                }
                
                this.rotation.y = wrapAngleSigned(this.rotation.y + this.config.autoRotateSpeed);
                this.applyTransform(this.rotation.x, this.rotation.y);
                
                this.autoRotateRAF = requestAnimationFrame(rotate);
            };
            
            this.autoRotateRAF = requestAnimationFrame(rotate);
        }
        
        stopAutoRotate() {
            if (this.autoRotateRAF) {
                cancelAnimationFrame(this.autoRotateRAF);
                this.autoRotateRAF = null;
            }
        }
        
        setupCloseHandlers() {
            const close = () => {
                if (performance.now() - this.openStartedAt < 250) return;
                
                const el = this.focusedEl;
                if (!el) return;
                
                const parent = el.parentElement;
                const overlay = this.viewerEl.querySelector('.dome-gallery-enlarge');
                if (!overlay) return;
                
                const refDiv = parent.querySelector('.dome-gallery-item-image-reference');
                const originalPos = this.originalTilePosition;
                
                if (!originalPos) {
                    overlay.remove();
                    if (refDiv) refDiv.remove();
                    parent.style.setProperty('--rot-y-delta', '0deg');
                    parent.style.setProperty('--rot-x-delta', '0deg');
                    el.style.visibility = '';
                    el.style.zIndex = 0;
                    this.focusedEl = null;
                    this.rootEl.removeAttribute('data-enlarging');
                    this.opening = false;
                    this.unlockScroll();
                    return;
                }
                
                const currentRect = overlay.getBoundingClientRect();
                const rootRect = this.rootEl.getBoundingClientRect();
                
                const originalPosRelativeToRoot = {
                    left: originalPos.left - rootRect.left,
                    top: originalPos.top - rootRect.top,
                    width: originalPos.width,
                    height: originalPos.height
                };
                
                const overlayRelativeToRoot = {
                    left: currentRect.left - rootRect.left,
                    top: currentRect.top - rootRect.top,
                    width: currentRect.width,
                    height: currentRect.height
                };
                
                const animatingOverlay = document.createElement('div');
                animatingOverlay.className = 'dome-gallery-enlarge-closing';
                animatingOverlay.style.cssText = `
                    position: absolute;
                    left: ${overlayRelativeToRoot.left}px;
                    top: ${overlayRelativeToRoot.top}px;
                    width: ${overlayRelativeToRoot.width}px;
                    height: ${overlayRelativeToRoot.height}px;
                    z-index: 9999;
                    border-radius: var(--enlarge-radius, 20px);
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,.35);
                    transition: all ${this.config.enlargeTransitionMs}ms ease-out;
                    pointer-events: none;
                    margin: 0;
                    transform: none;
                `;
                
                const originalImg = overlay.querySelector('img');
                if (originalImg) {
                    const img = originalImg.cloneNode();
                    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
                    animatingOverlay.appendChild(img);
                }
                
                overlay.remove();
                this.rootEl.appendChild(animatingOverlay);
                
                void animatingOverlay.getBoundingClientRect();
                
                requestAnimationFrame(() => {
                    animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';
                    animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';
                    animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';
                    animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';
                    animatingOverlay.style.opacity = '0';
                });
                
                const cleanup = () => {
                    animatingOverlay.remove();
                    this.originalTilePosition = null;
                    if (refDiv) refDiv.remove();
                    parent.style.transition = 'none';
                    el.style.transition = 'none';
                    parent.style.setProperty('--rot-y-delta', '0deg');
                    parent.style.setProperty('--rot-x-delta', '0deg');
                    
                    requestAnimationFrame(() => {
                        el.style.visibility = '';
                        el.style.opacity = '0';
                        el.style.zIndex = 0;
                        this.focusedEl = null;
                        this.rootEl.removeAttribute('data-enlarging');
                        
                        requestAnimationFrame(() => {
                            parent.style.transition = '';
                            el.style.transition = 'opacity 300ms ease-out';
                            
                            requestAnimationFrame(() => {
                                el.style.opacity = '1';
                                setTimeout(() => {
                                    el.style.transition = '';
                                    el.style.opacity = '';
                                    this.opening = false;
                                    if (!this.dragging && this.rootEl.getAttribute('data-enlarging') !== 'true') {
                                        document.body.classList.remove('dome-gallery-scroll-lock');
                                    }
                                    if (this.config.autoRotate) this.startAutoRotate();
                                }, 300);
                            });
                        });
                    });
                };
                
                animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
            };
            
            this.scrimEl.addEventListener('click', close);
            
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') close();
            });
        }
        
        lockScroll() {
            if (this.scrollLocked) return;
            this.scrollLocked = true;
            document.body.classList.add('dome-gallery-scroll-lock');
        }
        
        unlockScroll() {
            if (!this.scrollLocked) return;
            if (this.rootEl?.getAttribute('data-enlarging') === 'true') return;
            this.scrollLocked = false;
            document.body.classList.remove('dome-gallery-scroll-lock');
        }
        
        onTileClick(e) {
            if (this.dragging) return;
            if (this.moved) return;
            if (performance.now() - this.lastDragEndAt < 80) return;
            if (this.opening) return;
            this.openItemFromElement(e.currentTarget);
        }
        
        onTilePointerUp(e) {
            if (e.pointerType !== 'touch') return;
            if (this.dragging) return;
            if (this.moved) return;
            if (performance.now() - this.lastDragEndAt < 80) return;
            if (this.opening) return;
            this.openItemFromElement(e.currentTarget);
        }
        
        openItemFromElement(el) {
            if (this.opening) return;
            this.opening = true;
            this.openStartedAt = performance.now();
            this.lockScroll();
            this.stopAutoRotate();
            
            const parent = el.parentElement;
            this.focusedEl = el;
            el.setAttribute('data-focused', 'true');
            
            const offsetX = getDataNumber(parent, 'offsetX', 0);
            const offsetY = getDataNumber(parent, 'offsetY', 0);
            const sizeX = getDataNumber(parent, 'sizeX', 2);
            const sizeY = getDataNumber(parent, 'sizeY', 2);
            
            const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, this.config.segments);
            const parentY = normalizeAngle(parentRot.rotateY);
            const globalY = normalizeAngle(this.rotation.y);
            
            let rotY = -(parentY + globalY) % 360;
            if (rotY < -180) rotY += 360;
            const rotX = -parentRot.rotateX - this.rotation.x;
            
            parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
            parent.style.setProperty('--rot-x-delta', `${rotX}deg`);
            
            const refDiv = document.createElement('div');
            refDiv.className = 'dome-gallery-item-image dome-gallery-item-image-reference';
            refDiv.style.opacity = '0';
            refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
            parent.appendChild(refDiv);
            
            void refDiv.offsetHeight;
            
            const tileR = refDiv.getBoundingClientRect();
            const mainR = this.mainEl.getBoundingClientRect();
            const frameR = this.frameEl.getBoundingClientRect();
            
            if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
                this.opening = false;
                this.focusedEl = null;
                parent.removeChild(refDiv);
                this.unlockScroll();
                return;
            }
            
            this.originalTilePosition = { 
                left: tileR.left, 
                top: tileR.top, 
                width: tileR.width, 
                height: tileR.height 
            };
            
            el.style.visibility = 'hidden';
            el.style.zIndex = 0;
            
            const overlay = document.createElement('div');
            overlay.className = 'dome-gallery-enlarge';
            overlay.style.cssText = `
                position: absolute;
                left: ${frameR.left - mainR.left}px;
                top: ${frameR.top - mainR.top}px;
                width: ${frameR.width}px;
                height: ${frameR.height}px;
                opacity: 0;
                z-index: 30;
                will-change: transform, opacity;
                transform-origin: top left;
                transition: transform ${this.config.enlargeTransitionMs}ms ease, opacity ${this.config.enlargeTransitionMs}ms ease;
            `;
            
            const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
            const img = document.createElement('img');
            img.src = rawSrc;
            overlay.appendChild(img);
            
            // Adicionar título embaixo da imagem
            const titulo = typeof getDomeGalleryTitulo === 'function' ? getDomeGalleryTitulo(rawSrc) : '';
            if (titulo) {
                const tituloEl = document.createElement('div');
                tituloEl.className = 'dome-gallery-enlarge-titulo';
                tituloEl.textContent = titulo;
                overlay.appendChild(tituloEl);
            }
            
            this.viewerEl.appendChild(overlay);
            
            const tx0 = tileR.left - frameR.left;
            const ty0 = tileR.top - frameR.top;
            const sx0 = tileR.width / frameR.width;
            const sy0 = tileR.height / frameR.height;
            
            const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
            const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;
            
            overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;
            
            setTimeout(() => {
                if (!overlay.parentElement) return;
                overlay.style.opacity = '1';
                overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
                this.rootEl.setAttribute('data-enlarging', 'true');
            }, 16);
            
            const wantsResize = this.config.openedImageWidth || this.config.openedImageHeight;
            if (wantsResize) {
                const onFirstEnd = (ev) => {
                    if (ev.propertyName !== 'transform') return;
                    overlay.removeEventListener('transitionend', onFirstEnd);
                    
                    const prevTransition = overlay.style.transition;
                    overlay.style.transition = 'none';
                    
                    const tempWidth = this.config.openedImageWidth || `${frameR.width}px`;
                    const tempHeight = this.config.openedImageHeight || `${frameR.height}px`;
                    
                    overlay.style.width = tempWidth;
                    overlay.style.height = tempHeight;
                    
                    const newRect = overlay.getBoundingClientRect();
                    
                    overlay.style.width = frameR.width + 'px';
                    overlay.style.height = frameR.height + 'px';
                    
                    void overlay.offsetWidth;
                    
                    overlay.style.transition = `left ${this.config.enlargeTransitionMs}ms ease, top ${this.config.enlargeTransitionMs}ms ease, width ${this.config.enlargeTransitionMs}ms ease, height ${this.config.enlargeTransitionMs}ms ease`;
                    
                    const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
                    const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
                    
                    requestAnimationFrame(() => {
                        overlay.style.left = `${centeredLeft}px`;
                        overlay.style.top = `${centeredTop}px`;
                        overlay.style.width = tempWidth;
                        overlay.style.height = tempHeight;
                    });
                    
                    const cleanupSecond = () => {
                        overlay.removeEventListener('transitionend', cleanupSecond);
                        overlay.style.transition = prevTransition;
                    };
                    overlay.addEventListener('transitionend', cleanupSecond, { once: true });
                };
                overlay.addEventListener('transitionend', onFirstEnd);
            }
        }
    }
    
    // Inicializar quando DOM estiver pronto
    function initDomeGallery() {
        const container = document.getElementById('dome-gallery-container');
        if (!container) {
            console.warn('[DomeGallery] Container não encontrado');
            return;
        }
        
        console.log('[DomeGallery] Inicializando galeria...');
        
        // Injetar estilos dinâmicos
        injectDynamicStyles();
        
        // Coletar imagens da pasta assets/logos
        const images = [
            { src: 'assets/logos/1.png', alt: 'Cliente 1' },
            { src: 'assets/logos/2.png', alt: 'Cliente 2' },
            { src: 'assets/logos/3.png', alt: 'Cliente 3' },
            { src: 'assets/logos/4.png', alt: 'Cliente 4' },
            { src: 'assets/logos/5.png', alt: 'Cliente 5' },
            { src: 'assets/logos/6.png', alt: 'Cliente 6' },
            { src: 'assets/logos/7.png', alt: 'Cliente 7' },
            { src: 'assets/logos/8.png', alt: 'Cliente 8' },
            { src: 'assets/logos/9.png', alt: 'Cliente 9' },
            { src: 'assets/logos/10.png', alt: 'Cliente 10' },
            { src: 'assets/logos/11.png', alt: 'Cliente 11' },
            { src: 'assets/logos/12.png', alt: 'Cliente 12' },
            { src: 'assets/logos/13.png', alt: 'Cliente 13' },
            { src: 'assets/logos/14.png', alt: 'Cliente 14' },
            { src: 'assets/logos/15.png', alt: 'Cliente 15' },
            { src: 'assets/logos/16.jpg', alt: 'Cliente 16' },
            { src: 'assets/logos/17.png', alt: 'Cliente 17' },
            { src: 'assets/logos/18.png', alt: 'Cliente 18' },
            { src: 'assets/logos/19.jpg', alt: 'Cliente 19' },
            { src: 'assets/logos/20.png', alt: 'Cliente 20' },
            { src: 'assets/logos/21.png', alt: 'Cliente 21' }
        ];
        
        const gallery = new DomeGallery(container, images);
        console.log('[DomeGallery] Galeria criada com sucesso!');
    }
    
    // Aguardar DOM e também um pequeno delay para garantir que SiteConfig foi carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initDomeGallery, 100);
        });
    } else {
        setTimeout(initDomeGallery, 100);
    }
})();
