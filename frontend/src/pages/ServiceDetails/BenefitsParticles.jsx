import React, { useRef, useEffect } from 'react';

const BenefitsParticles = ({ hoveredCardIndex, accentColor = '#3b82f6' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: 500 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 1.5 + 0.5, // Return to firefly size
        baseVx: (Math.random() - 0.5) * 1.5,
        baseVy: (Math.random() - 0.5) * 1.5,
        targetX: null,
        targetY: null,
      }));
    }

    const particles = particlesRef.current;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = accentColor;

      particles.forEach(p => {
        if (p.targetX !== null && p.targetY !== null) {
          // Seeking logic (spring-like towards target)
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          
          p.x += dx * 0.12; // Faster snap for text formation
          p.y += dy * 0.12;

          // Tiny jitter so it feels alive
          p.x += (Math.random() - 0.5) * 0.4;
          p.y += (Math.random() - 0.5) * 0.4;
        } else {
          // Gently return to base drift velocity
          p.vx += (p.baseVx - p.vx) * 0.05;
          p.vy += (p.baseVy - p.vy) * 0.05;
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around bounds only when drifting
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Update targets when hoveredCardIndex changes via pixel scanning
  useEffect(() => {
    const particles = particlesRef.current;
    if (particles.length === 0) return;

    if (hoveredCardIndex !== null) {
      const cards = document.querySelectorAll('.benefits-card');
      const targetCard = cards[hoveredCardIndex];
      if (targetCard) {
        const spans = targetCard.querySelectorAll('.particle-target');
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const newTargets = [];

        // Revert to robust bounding-box scattering for perfect text visibility
        const particlesPerTarget = Math.floor(500 / (spans.length || 1));
        spans.forEach(span => {
          const rect = span.getBoundingClientRect();
          const centerX = rect.left - canvasRect.left + rect.width / 2;
          const centerY = rect.top - canvasRect.top + rect.height / 2;
          const radius = Math.max(rect.width, rect.height) / 2 + 12; // Circle radius slightly larger than icon

          for (let i = 0; i < particlesPerTarget; i++) {
            // Distribute particles evenly in a perfect circle ring
            const angle = (i / particlesPerTarget) * Math.PI * 2;
            newTargets.push({
              x: centerX + Math.cos(angle) * radius,
              y: centerY + Math.sin(angle) * radius,
            });
          }
        });

        // Shuffle targets for randomness
        for (let i = newTargets.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newTargets[i], newTargets[j]] = [newTargets[j], newTargets[i]];
        }

        // Assign targets to particles
        particles.forEach((p, i) => {
          if (newTargets.length > 0) {
            const target = newTargets[i % newTargets.length];
            p.targetX = target.x;
            p.targetY = target.y;
          } else {
            p.targetX = null;
            p.targetY = null;
          }
        });
      }
    } else {
      // Clear targets so they drift again
      particles.forEach(p => {
        p.targetX = null;
        p.targetY = null;
      });
    }
  }, [hoveredCardIndex]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 10
      }} 
    />
  );
};

export default BenefitsParticles;
