'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ExtraversoBlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getTarget = () => ({
      x: canvas.width / 2,
      y: canvas.height * 0.55
    });

    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 250 + Math.random() * 400;
      const target = getTarget();
      
      return {
        x: target.x + Math.cos(angle) * distance,
        y: target.y + Math.sin(angle) * distance,
        vx: 0,
        vy: 0,
        size: 0.6 + Math.random() * 1.0, // smaller circles 0.6-1.6px
        opacity: 0.3 + Math.random() * 0.5, // Reduced opacity: 0.3-0.8 (was 0.4-0.9)
      };
    };

    const particleCount = 200;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle());
    }

    const getEdgeFade = (x: number, y: number, w: number, h: number): number => {
      const edge = 50;
      const minDist = Math.min(x, w - x, y, h - y);
      return minDist < edge ? minDist / edge : 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const target = getTarget();

      particlesRef.current.forEach((p, i) => {
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const force = 0.15 + (80 / (dist + 30)) * 0.2;
        p.vx += (dx / dist) * force * 0.015;
        p.vy += (dy / dist) * force * 0.015;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        if (dist < 120) {
          p.opacity *= 0.94;
        }

        if (dist < 50 || p.opacity < 0.05) {
          particlesRef.current[i] = createParticle();
        }

        const edgeFade = getEdgeFade(p.x, p.y, canvas.width, canvas.height);
        const finalOpacity = p.opacity * edgeFade;

        if (finalOpacity > 0.02) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
