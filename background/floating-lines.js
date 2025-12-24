/**
 * AUDICOM TELECOM - Floating Lines Background
 * Animated wave lines effect with WebGL
 * Based on ReactBits FloatingLines, converted to vanilla JS
 */

(function() {
    'use strict';

    // Verifica se o floatingLines está ativado no SiteConfig
    if (typeof SiteConfig !== 'undefined' && SiteConfig.floatingLines === false) {
        return;
    }

    const vertexShader = `
        precision highp float;
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const fragmentShader = `
        precision highp float;

        uniform float iTime;
        uniform vec2 iResolution;
        uniform float animationSpeed;

        uniform bool enableTop;
        uniform bool enableMiddle;
        uniform bool enableBottom;

        uniform int topLineCount;
        uniform int middleLineCount;
        uniform int bottomLineCount;

        uniform float topLineDistance;
        uniform float middleLineDistance;
        uniform float bottomLineDistance;

        uniform vec3 topWavePosition;
        uniform vec3 middleWavePosition;
        uniform vec3 bottomWavePosition;

        uniform vec2 iMouse;
        uniform bool interactive;
        uniform float bendRadius;
        uniform float bendStrength;
        uniform float bendInfluence;

        uniform vec3 lineColor1;
        uniform vec3 lineColor2;

        const vec3 BLACK = vec3(0.0);

        mat2 rotate(float r) {
            return mat2(cos(r), sin(r), -sin(r), cos(r));
        }

        vec3 getLineColor(float t) {
            return mix(lineColor1, lineColor2, t) * 0.6;
        }

        float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
            float time = iTime * animationSpeed;

            float x_offset = offset;
            float x_movement = time * 0.1;
            float amp = sin(offset + time * 0.2) * 0.3;
            float y = sin(uv.x + x_offset + x_movement) * amp;

            if (shouldBend) {
                vec2 d = screenUv - mouseUv;
                float influence = exp(-dot(d, d) * bendRadius);
                float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
                y += bendOffset;
            }

            float m = uv.y - y;
            return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
        }

        void main() {
            vec2 baseUv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
            baseUv.y *= -1.0;

            vec3 col = vec3(0.0);

            vec2 mouseUv = vec2(0.0);
            if (interactive) {
                mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
                mouseUv.y *= -1.0;
            }

            // Bottom wave
            if (enableBottom) {
                for (int i = 0; i < 30; ++i) {
                    if (i >= bottomLineCount) break;
                    float fi = float(i);
                    float t = fi / max(float(bottomLineCount - 1), 1.0);
                    vec3 lineCol = getLineColor(t);
                    
                    float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
                    vec2 ruv = baseUv * rotate(angle);
                    col += lineCol * wave(
                        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
                        1.5 + 0.2 * fi,
                        baseUv,
                        mouseUv,
                        interactive
                    ) * 0.2;
                }
            }

            // Middle wave
            if (enableMiddle) {
                for (int i = 0; i < 30; ++i) {
                    if (i >= middleLineCount) break;
                    float fi = float(i);
                    float t = fi / max(float(middleLineCount - 1), 1.0);
                    vec3 lineCol = getLineColor(t);
                    
                    float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
                    vec2 ruv = baseUv * rotate(angle);
                    col += lineCol * wave(
                        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
                        2.0 + 0.15 * fi,
                        baseUv,
                        mouseUv,
                        interactive
                    );
                }
            }

            // Top wave
            if (enableTop) {
                for (int i = 0; i < 30; ++i) {
                    if (i >= topLineCount) break;
                    float fi = float(i);
                    float t = fi / max(float(topLineCount - 1), 1.0);
                    vec3 lineCol = getLineColor(t);
                    
                    float angle = topWavePosition.z * log(length(baseUv) + 1.0);
                    vec2 ruv = baseUv * rotate(angle);
                    ruv.x *= -1.0;
                    col += lineCol * wave(
                        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
                        1.0 + 0.2 * fi,
                        baseUv,
                        mouseUv,
                        interactive
                    ) * 0.1;
                }
            }

            // Usar intensidade das linhas como alpha para fundo transparente
            float alpha = length(col) * 2.0;
            alpha = clamp(alpha, 0.0, 1.0);
            gl_FragColor = vec4(col, alpha);
        }
    `;

    // Configurações - lê do SiteConfig ou usa valores padrão
    const getConfig = () => {
        const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
        
        // Montar array de waves habilitadas
        const enabledWaves = [];
        if (SC.floatingLinesTopWave !== false) enabledWaves.push('top');
        if (SC.floatingLinesMiddleWave !== false) enabledWaves.push('middle');
        if (SC.floatingLinesBottomWave !== false) enabledWaves.push('bottom');
        
        return {
            enabledWaves: enabledWaves,
            lineCount: SC.floatingLinesLineCount || 4,
            lineDistance: SC.floatingLinesLineDistance || 5,
            animationSpeed: SC.floatingLinesAnimationSpeed || 1.5,
            interactive: SC.floatingLinesInteractive || false,
            bendRadius: SC.floatingLinesBendRadius || 5.0,
            bendStrength: SC.floatingLinesBendStrength || -0.5,
            mouseDamping: 0.05,
            // Cores da paleta Audicom
            lineColor1: [0.0, 0.14, 0.61],    // #00249C - Azul Conexão
            lineColor2: [0.56, 0.6, 0.66]     // #8F99A8 - Cinza Operacional
        };
    };
    
    const CONFIG = getConfig();

    let canvas, gl, program;
    let animationId;
    let startTime;
    let targetMouse = { x: -1000, y: -1000 };
    let currentMouse = { x: -1000, y: -1000 };
    let targetInfluence = 0;
    let currentInfluence = 0;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function createProgram(gl, vertexSource, fragmentSource) {
        const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
        const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        
        if (!vertShader || !fragShader) return null;

        const program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return null;
        }
        return program;
    }

    function getLineCount(waveType) {
        if (typeof CONFIG.lineCount === 'number') return CONFIG.lineCount;
        const index = CONFIG.enabledWaves.indexOf(waveType);
        if (index === -1) return 0;
        return CONFIG.lineCount[index] || 6;
    }

    function getLineDistance(waveType) {
        if (typeof CONFIG.lineDistance === 'number') return CONFIG.lineDistance;
        const index = CONFIG.enabledWaves.indexOf(waveType);
        if (index === -1) return 0.1;
        return (CONFIG.lineDistance[index] || 5) * 0.01;
    }

    function init() {
        // Criar container
        const container = document.createElement('div');
        container.id = 'floating-lines-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        `;

        // Criar canvas
        canvas = document.createElement('canvas');
        canvas.id = 'floating-lines-canvas';
        canvas.style.cssText = `
            width: 100%;
            height: 100%;
            display: block;
        `;
        container.appendChild(canvas);

        // Inserir atrás de todo o conteúdo
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.insertBefore(container, heroSection.firstChild);
            container.style.position = 'absolute';
            container.style.zIndex = '0';
            container.style.pointerEvents = 'none';
        } else {
            document.body.insertBefore(container, document.body.firstChild);
        }

        // Inicializar WebGL com alpha
        gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) || 
             canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false });
        if (!gl) {
            console.warn('WebGL not supported for FloatingLines');
            return;
        }

        // Habilitar blending para transparência
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Criar programa
        program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        gl.useProgram(program);

        // Criar quad fullscreen
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        // Configurar uniforms
        setUniforms();

        // Resize
        resize();
        window.addEventListener('resize', resize);

        // Mouse events
        if (CONFIG.interactive) {
            container.style.pointerEvents = 'auto';
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseleave', handleMouseLeave);
        }

        startTime = performance.now();
        render();
    }

    function setUniforms() {
        const uniforms = {
            animationSpeed: CONFIG.animationSpeed,
            enableTop: CONFIG.enabledWaves.includes('top'),
            enableMiddle: CONFIG.enabledWaves.includes('middle'),
            enableBottom: CONFIG.enabledWaves.includes('bottom'),
            topLineCount: getLineCount('top'),
            middleLineCount: getLineCount('middle'),
            bottomLineCount: getLineCount('bottom'),
            topLineDistance: getLineDistance('top'),
            middleLineDistance: getLineDistance('middle'),
            bottomLineDistance: getLineDistance('bottom'),
            animationSpeed: CONFIG.animationSpeed,
            interactive: CONFIG.interactive,
            bendRadius: CONFIG.bendRadius,
            bendStrength: CONFIG.bendStrength
        };

        for (const [name, value] of Object.entries(uniforms)) {
            const loc = gl.getUniformLocation(program, name);
            if (loc === null) continue;

            if (typeof value === 'boolean') {
                gl.uniform1i(loc, value ? 1 : 0);
            } else if (typeof value === 'number') {
                if (Number.isInteger(value)) {
                    gl.uniform1i(loc, value);
                } else {
                    gl.uniform1f(loc, value);
                }
            }
        }

        // Wave positions
        gl.uniform3f(gl.getUniformLocation(program, 'topWavePosition'), 10.0, 0.5, -0.4);
        gl.uniform3f(gl.getUniformLocation(program, 'middleWavePosition'), 5.0, 0.0, 0.2);
        gl.uniform3f(gl.getUniformLocation(program, 'bottomWavePosition'), 2.0, -0.7, 0.4);

        // Colors
        gl.uniform3f(gl.getUniformLocation(program, 'lineColor1'), ...CONFIG.lineColor1);
        gl.uniform3f(gl.getUniformLocation(program, 'lineColor2'), ...CONFIG.lineColor2);
    }

    function resize() {
        // Usar pixel ratio menor para melhor performance
        const dpr = Math.min(window.devicePixelRatio || 1, 1) * 0.75;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(gl.getUniformLocation(program, 'iResolution'), canvas.width, canvas.height);
    }

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        targetMouse.x = (e.clientX - rect.left) * dpr;
        targetMouse.y = (rect.height - (e.clientY - rect.top)) * dpr;
        targetInfluence = 1.0;
    }

    function handleMouseLeave() {
        targetInfluence = 0.0;
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function render() {
        const time = (performance.now() - startTime) / 1000;

        // Limpar com cor transparente
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Update uniforms
        gl.uniform1f(gl.getUniformLocation(program, 'iTime'), time);

        // Smooth mouse
        if (CONFIG.interactive) {
            currentMouse.x = lerp(currentMouse.x, targetMouse.x, CONFIG.mouseDamping);
            currentMouse.y = lerp(currentMouse.y, targetMouse.y, CONFIG.mouseDamping);
            currentInfluence = lerp(currentInfluence, targetInfluence, CONFIG.mouseDamping);

            gl.uniform2f(gl.getUniformLocation(program, 'iMouse'), currentMouse.x, currentMouse.y);
            gl.uniform1f(gl.getUniformLocation(program, 'bendInfluence'), currentInfluence);
        }

        // Render
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        animationId = requestAnimationFrame(render);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });

})();
