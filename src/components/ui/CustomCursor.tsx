import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassPlus, Hand } from '@phosphor-icons/react';

type CursorMode = 'default' | 'link' | 'zoom' | 'grab' | 'text';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const ringPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      // Lerp ring toward mouse
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check data-cursor attribute first
      const dataCursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (dataCursorEl) {
        const mode = dataCursorEl.dataset.cursor as CursorMode;
        setCursorMode(mode ?? 'default');
        setHovering(true);
        return;
      }

      // Existing hover logic for interactive elements
      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setCursorMode('link');
        setHovering(true);
      }
    };

    const onLeave = () => {
      setHovering(false);
      setCursorMode('default');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const ringStyle: React.CSSProperties = (() => {
    switch (cursorMode) {
      case 'link':
        return { transform: 'translate(-50%, -50%) scale(1.5)', mixBlendMode: 'difference' };
      case 'text':
        return { width: '2px', height: '24px', borderRadius: '1px' };
      default:
        return {};
    }
  })();

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'hovering' : ''}`}
        style={ringStyle}
      >
        {cursorMode === 'zoom' && (
          <MagnifyingGlassPlus
            size={16}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent-primary"
          />
        )}
        {cursorMode === 'grab' && (
          <Hand
            size={16}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent-primary"
          />
        )}
      </div>
    </>
  );
}
