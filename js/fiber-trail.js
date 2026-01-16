/**
 * FIBER TRAIL - Rastro de Fibra Ótica seguindo o mouse
 * Efeito visual que cria uma trilha luminosa atrás do cursor
 */

(function() {
    'use strict';

    // Ler configuração do onoff.js
    const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
    const CONFIG = {
        enabled: SC.fiberTrail !== false,
        maxPoints: SC.fiberTrailMaxPoints || 20,
        lineWidth: SC.fiberTrailLineWidth || 2,
        color: SC.fiberTrailColor || '#00249C',
        glowColor: SC.fiberTrailGlowColor || 'rgba(0, 36, 156, 0.6)',
        fadeSpeed: SC.fiberTrailFadeSpeed || 0.15
    };

    if (!CONFIG.enabled) return;

    // Canvas setup
    const canvas = document.createElement('canvas');
    canvas.id = 'fiber-trail-canvas';
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Trail points
    const trail = [];
    let mouseX = 0;
    let mouseY = 0;

    // Resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Add new point
        trail.push({
            x: mouseX,
            y: mouseY,
            life: 1.0
        });

        // Limit trail length
        if (trail.length > CONFIG.maxPoints) {
            trail.shift();
        }
    });

    // Animation loop
    function animate() {
        // Clear canvas (transparente)
        ctx.clearRect(0, 0, width, height);

        // Update and draw trail
        for (let i = trail.length - 1; i >= 0; i--) {
            const point = trail[i];
            
            // Fade out
            point.life -= CONFIG.fadeSpeed;
            
            // Remove dead points
            if (point.life <= 0) {
                trail.splice(i, 1);
                continue;
            }

            // Draw line segments
            if (i > 0) {
                const prevPoint = trail[i - 1];
                const opacity = point.life;
                
                // Glow effect
                ctx.strokeStyle = CONFIG.glowColor.replace(/[\d.]+\)/, `${opacity * 0.1})`);
                ctx.lineWidth = CONFIG.lineWidth + 2;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();

                // Main line (fibra)
                const gradient = ctx.createLinearGradient(
                    prevPoint.x, prevPoint.y,
                    point.x, point.y
                );
                gradient.addColorStop(0, `rgba(0, 36, 156, ${opacity * 0.3})`);
                gradient.addColorStop(0.5, `rgba(0, 100, 255, ${opacity * 0.4})`);
                gradient.addColorStop(1, `rgba(143, 153, 168, ${opacity * 0.2})`);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = CONFIG.lineWidth;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();

                // Bright core (núcleo da fibra)
                ctx.strokeStyle = `rgba(244, 246, 249, ${opacity * 0.3})`;
                ctx.lineWidth = CONFIG.lineWidth * 0.3;
                ctx.beginPath();
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }

            // Draw glow particles
            if (i % 3 === 0) {
                const particleSize = 1 + point.life * 2;
                const gradient = ctx.createRadialGradient(
                    point.x, point.y, 0,
                    point.x, point.y, particleSize
                );
                gradient.addColorStop(0, `rgba(244, 246, 249, ${point.life * 0.3})`);
                gradient.addColorStop(0.3, `rgba(0, 36, 156, ${point.life * 0.2})`);
                gradient.addColorStop(1, 'rgba(0, 36, 156, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(point.x, point.y, particleSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    console.log('✨ Fiber Trail ativado');
})();
