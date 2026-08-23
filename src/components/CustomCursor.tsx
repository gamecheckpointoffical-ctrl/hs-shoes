'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    if (!mq.matches) return;
    setIsDesktop(true);

    const animate = () => {
      // Dot follows almost instantly (very high lerp)
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.5;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.5;

      // Ring follows with smooth, slightly delayed lerp for trailing effect
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor]');
      setIsPointer(!!interactive);
      
      // Check for custom cursor labels
      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl) {
        const label = cursorEl.getAttribute('data-cursor');
        if (label === 'view') setCursorLabel('View');
        else if (label === 'drag') setCursorLabel('Drag');
        else if (label === 'shop') setCursorLabel('Shop');
        else if (label === 'cart') setCursorLabel('Cart');
        else if (label === 'search') setCursorLabel('Search');
        else setCursorLabel('');
      } else {
        setCursorLabel('');
      }

      // Check if hovering a drag element
      if (target.closest('.cursor-grab')) {
        setIsDragging(true);
      } else {
        setIsDragging(false);
      }
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);
    const onDown = () => { if (ringRef.current) ringRef.current.style.opacity = '0.5'; };
    const onUp = () => { if (ringRef.current) ringRef.current.style.opacity = '1'; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (!isDesktop) return null;

  const ringSize = isDragging ? 64 : isPointer ? 56 : 36;

  return (
    <>
      {/* Outer ring — smooth trailing */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `1px solid rgba(10, 10, 10, ${isPointer ? 0.5 : 0.25})`,
          borderRadius: isDragging ? '12px' : '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isHidden ? 0 : 1,
          mixBlendMode: 'difference',
          filter: 'invert(1)',
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), height 0.3s cubic-bezier(0.4,0,0.2,1), border-radius 0.3s ease, opacity 0.3s ease',
        }}
      >
        {cursorLabel && (
          <span style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '8px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#fff',
            whiteSpace: 'nowrap',
            fontFamily: 'Inter, sans-serif',
          }}>
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Inner dot — near-instant follow */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isPointer ? '0px' : '5px',
          height: isPointer ? '0px' : '5px',
          background: '#0A0A0A',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isHidden ? 0 : (isPointer ? 0 : 1),
          mixBlendMode: 'difference',
          filter: 'invert(1)',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}
