'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    if (!mq.matches) return;
    setIsDesktop(true);

    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;
    let raf: number;

    const animate = () => {
      // Smooth lerp follow
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      setPosition({ x: cursorX, y: cursorY });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor]');
      setIsPointer(!!interactive);

      if (target.closest('[data-cursor="view"]')) {
        document.body.style.cursor = 'none';
      }
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(scrolled / max, 1));
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!isDesktop) return null;

  // Cursor size changes based on scroll progress (smaller as you scroll deeper)
  const baseSize = isPointer ? 48 : 28;
  const scrollScale = 1 - scrollProgress * 0.3;
  const size = baseSize * scrollScale;

  // Color shifts subtly with scroll
  const hue = 0; // keep monochrome
  const lightness = 10 + scrollProgress * 20; // darkens slightly as you scroll

  return (
    <>
      {/* Outer ring */}
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)',
          border: `1px solid rgba(10, 10, 10, ${isPointer ? 0.6 : 0.3})`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: isHidden ? 'opacity 0.3s' : 'none',
          opacity: isHidden ? 0 : 1,
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '4px',
          height: '4px',
          transform: 'translate(-50%, -50%)',
          background: `hsl(${hue}, 0%, ${100 - lightness}%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: isHidden ? 'opacity 0.3s' : 'none',
          opacity: isHidden ? 0 : 1,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
