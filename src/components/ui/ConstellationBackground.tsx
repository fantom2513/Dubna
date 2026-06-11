import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  gold: boolean;
}

const BLUE = '79, 195, 247';
const GOLD = '232, 184, 75';

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function buildParticles() {
      // Density scales with viewport area, capped for performance
      const area = width * height;
      const target = Math.min(110, Math.max(40, Math.round(area / 16000)));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        baseSize: Math.random() * 1.6 + 0.6,
        gold: Math.random() < 0.18,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }

    const LINK_DIST = 130;
    const MOUSE_DIST = 180;

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reduceMotion) {
          // Drift
          p.x += p.vx;
          p.y += p.vy;

          // Cursor repulsion
          const dxm = p.x - mouse.current.x;
          const dym = p.y - mouse.current.y;
          const distM = Math.hypot(dxm, dym);
          if (distM < MOUSE_DIST && distM > 0) {
            const force = (MOUSE_DIST - distM) / MOUSE_DIST;
            p.x += (dxm / distM) * force * 1.6;
            p.y += (dym / distM) * force * 1.6;
          }

          // Wrap around edges
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx!.strokeStyle = `rgba(${BLUE}, ${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }

        // Line to cursor (highlighted)
        const dxc = p.x - mouse.current.x;
        const dyc = p.y - mouse.current.y;
        const distC = Math.hypot(dxc, dyc);
        if (distC < MOUSE_DIST) {
          const alpha = (1 - distC / MOUSE_DIST) * 0.4;
          ctx!.strokeStyle = `rgba(${BLUE}, ${alpha})`;
          ctx!.lineWidth = 0.8;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouse.current.x, mouse.current.y);
          ctx!.stroke();
        }

        // Particle dot — brightens near cursor
        const glow = distC < MOUSE_DIST ? 1 - distC / MOUSE_DIST : 0;
        const size = p.baseSize + glow * 1.6;
        const color = p.gold ? GOLD : BLUE;
        ctx!.fillStyle = `rgba(${color}, ${0.5 + glow * 0.5})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduceMotion) rafRef.current = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseout', onMouseLeave);

    if (reduceMotion) {
      draw(); // single static frame
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
