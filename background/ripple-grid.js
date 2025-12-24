/**
 * AUDICOM TELECOM - Ripple Grid Animation
 * Grade com efeito ripple animado (WebGL Puro)
 * Convertido de React para Vanilla JS sem dependências
 */

(function() {
    'use strict';

    // Verifica se o rippleGrid está ativado no SiteConfig
    if (typeof SiteConfig !== 'undefined' && !SiteConfig.rippleGrid) {
        return;
    }

    // Lê configurações do SiteConfig ou usa valores padrão
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    const CONFIG = {
        enableRainbow: SC.rippleGridRainbow || false,
        gridColor: SC.rippleGridColor || '#00249C',
        rippleIntensity: SC.rippleGridRippleIntensity || 0.05,
        gridSize: SC.rippleGridSize || 10.0,
        gridThickness: SC.rippleGridThickness || 15.0,
        fadeDistance: SC.rippleGridFadeDistance || 1.5,
        vignetteStrength: SC.rippleGridVignetteStrength || 2.0,
        glowIntensity: SC.rippleGridGlowIntensity || 0.1,
        opacity: SC.rippleGridOpacity || 0.8,
        gridRotation: SC.rippleGridRotation || 0,
        mouseInteraction: SC.rippleGridMouseInteraction !== false,
        mouseInteractionRadius: SC.rippleGridMouseRadius || 1.2
    };

    // Converter hex para RGB normalizado (aceita #RGB, #RRGGBB e #RRGGBBAA)
    function hexToRgb(hex) {
        // Remover # se existir
        hex = hex.replace('#', '');
        
        // Converter formato curto (#RGB) para longo (#RRGGBB)
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        // Se tiver alpha (#RRGGBBAA), ignorar os últimos 2 caracteres
        if (hex.length === 8) {
            hex = hex.substring(0, 6);
        }
        
        const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
            : [0, 0.14, 0.61]; // Fallback: Azul Conexão #00249C
    }

    let canvas, gl, program;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };
    let mouseInfluence = 0;
    let animationId;

    // Vertex Shader
    const vertexShaderSource = `
        attribute vec2 a_position;
        varying vec2 vUv;
        void main() {
            vUv = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    // Fragment Shader
    const fragmentShaderSource = `
        precision highp float;
        
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_enableRainbow;
        uniform vec3 u_gridColor;
        uniform float u_rippleIntensity;
        uniform float u_gridSize;
        uniform float u_gridThickness;
        uniform float u_fadeDistance;
        uniform float u_vignetteStrength;
        uniform float u_glowIntensity;
        uniform float u_opacity;
        uniform float u_gridRotation;
        uniform float u_mouseInteraction;
        uniform vec2 u_mousePosition;
        uniform float u_mouseInfluence;
        uniform float u_mouseInteractionRadius;
        
        varying vec2 vUv;

        const float PI = 3.141592653589793;

        mat2 rotate(float angle) {
            float s = sin(angle);
            float c = cos(angle);
            return mat2(c, -s, s, c);
        }

        void main() {
            vec2 uv = vUv * 2.0 - 1.0;
            uv.x *= u_resolution.x / u_resolution.y;

            if (u_gridRotation != 0.0) {
                uv = rotate(u_gridRotation * PI / 180.0) * uv;
            }

            float dist = length(uv);
            float func = sin(PI * (u_time - dist));
            vec2 rippleUv = uv + uv * func * u_rippleIntensity;

            if (u_mouseInteraction > 0.5 && u_mouseInfluence > 0.0) {
                vec2 mouseUv = (u_mousePosition * 2.0 - 1.0);
                mouseUv.x *= u_resolution.x / u_resolution.y;
                float mouseDist = length(uv - mouseUv);
                
                float influence = u_mouseInfluence * exp(-mouseDist * mouseDist / (u_mouseInteractionRadius * u_mouseInteractionRadius));
                
                float mouseWave = sin(PI * (u_time * 2.0 - mouseDist * 3.0)) * influence;
                vec2 dir = uv - mouseUv;
                if (length(dir) > 0.001) {
                    rippleUv += normalize(dir) * mouseWave * u_rippleIntensity * 0.3;
                }
            }

            vec2 a = sin(u_gridSize * 0.5 * PI * rippleUv - PI / 2.0);
            vec2 b = abs(a);

            float aaWidth = 0.5;
            vec2 smoothB = vec2(
                smoothstep(0.0, aaWidth, b.x),
                smoothstep(0.0, aaWidth, b.y)
            );

            vec3 color = vec3(0.0);
            color += exp(-u_gridThickness * smoothB.x * (0.8 + 0.5 * sin(PI * u_time)));
            color += exp(-u_gridThickness * smoothB.y);
            color += 0.5 * exp(-(u_gridThickness / 4.0) * sin(smoothB.x));
            color += 0.5 * exp(-(u_gridThickness / 3.0) * smoothB.y);

            if (u_glowIntensity > 0.0) {
                color += u_glowIntensity * exp(-u_gridThickness * 0.5 * smoothB.x);
                color += u_glowIntensity * exp(-u_gridThickness * 0.5 * smoothB.y);
            }

            float ddd = exp(-2.0 * clamp(pow(dist, u_fadeDistance), 0.0, 1.0));
            
            vec2 vignetteCoords = vUv - 0.5;
            float vignetteDistance = length(vignetteCoords);
            float vignette = 1.0 - pow(vignetteDistance * 2.0, u_vignetteStrength);
            vignette = clamp(vignette, 0.0, 1.0);
            
            vec3 t;
            if (u_enableRainbow > 0.5) {
                t = vec3(
                    uv.x * 0.5 + 0.5 * sin(u_time),
                    uv.y * 0.5 + 0.5 * cos(u_time),
                    pow(cos(u_time), 4.0)
                ) + 0.5;
            } else {
                t = u_gridColor;
            }

            float finalFade = ddd * vignette;
            float alpha = length(color) * finalFade * u_opacity;
            gl_FragColor = vec4(color * t * finalFade * u_opacity, alpha);
        }
    `;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('RippleGrid shader error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('RippleGrid program error:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        return program;
    }

    function init() {
        // Criar canvas
        canvas = document.createElement('canvas');
        canvas.id = 'ripple-grid-canvas';
        canvas.style.cssText = `
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 0 !important;
            pointer-events: none !important;
        `;
        
        // Inserir na hero section para rolar junto
        const hero = document.querySelector('.hero') || document.body;
        hero.style.position = 'relative';
        hero.insertBefore(canvas, hero.firstChild);

        // Inicializar WebGL
        gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
        if (!gl) {
            console.warn('RippleGrid: WebGL não suportado');
            return;
        }

        // Criar shaders
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        // Criar geometria (fullscreen quad)
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
            -1,  1,
             1, -1,
             1,  1
        ]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Configurar blending
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Event listeners
        window.addEventListener('resize', resize);
        
        if (CONFIG.mouseInteraction) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseenter', () => { mouseInfluence = 1.0; });
            document.addEventListener('mouseleave', () => { mouseInfluence = 0.0; });
        }

        resize();
        render(0);
        
        console.log('✅ RippleGrid inicializado!');
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio, 1.5);
        const container = canvas.parentElement || document.body;
        const width = container.offsetWidth || window.innerWidth;
        const height = container.offsetHeight || window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function handleMouseMove(e) {
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    }

    function render(time) {
        const t = time * 0.001;

        // Lerp mouse
        mousePosition.x += (targetMouse.x - mousePosition.x) * 0.1;
        mousePosition.y += (targetMouse.y - mousePosition.y) * 0.1;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);

        // Set uniforms
        const rgb = hexToRgb(CONFIG.gridColor);
        
        gl.uniform1f(gl.getUniformLocation(program, 'u_time'), t);
        gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), canvas.width, canvas.height);
        gl.uniform1f(gl.getUniformLocation(program, 'u_enableRainbow'), CONFIG.enableRainbow ? 1.0 : 0.0);
        gl.uniform3f(gl.getUniformLocation(program, 'u_gridColor'), rgb[0], rgb[1], rgb[2]);
        gl.uniform1f(gl.getUniformLocation(program, 'u_rippleIntensity'), CONFIG.rippleIntensity);
        gl.uniform1f(gl.getUniformLocation(program, 'u_gridSize'), CONFIG.gridSize);
        gl.uniform1f(gl.getUniformLocation(program, 'u_gridThickness'), CONFIG.gridThickness);
        gl.uniform1f(gl.getUniformLocation(program, 'u_fadeDistance'), CONFIG.fadeDistance);
        gl.uniform1f(gl.getUniformLocation(program, 'u_vignetteStrength'), CONFIG.vignetteStrength);
        gl.uniform1f(gl.getUniformLocation(program, 'u_glowIntensity'), CONFIG.glowIntensity);
        gl.uniform1f(gl.getUniformLocation(program, 'u_opacity'), CONFIG.opacity);
        gl.uniform1f(gl.getUniformLocation(program, 'u_gridRotation'), CONFIG.gridRotation);
        gl.uniform1f(gl.getUniformLocation(program, 'u_mouseInteraction'), CONFIG.mouseInteraction ? 1.0 : 0.0);
        gl.uniform2f(gl.getUniformLocation(program, 'u_mousePosition'), mousePosition.x, mousePosition.y);
        gl.uniform1f(gl.getUniformLocation(program, 'u_mouseInfluence'), mouseInfluence);
        gl.uniform1f(gl.getUniformLocation(program, 'u_mouseInteractionRadius'), CONFIG.mouseInteractionRadius);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        animationId = requestAnimationFrame(render);
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
