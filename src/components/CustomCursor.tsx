'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isDown, setIsDown] = useState(false);

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
      // Dot: near-instant follow (0.35 lerp — smooth but barely trailing)
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.35;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.35;

      // Ring: smooth trailing (0.10 lerp — creates the luxury lag effect)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.10;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.10;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${isDown ? 0.85 : 1})`;
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

      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl) {
        const label = cursorEl.getAttribute('data-cursor');
        if (label === 'view') setCursorLabel('View');
        else if (label === 'drag') setCursorLabel('Drag');
        else if (label === 'shop') setCursorLabel('Shop');
        else if (label === 'cart') setCursorLabel('Cart');
        else if (label === 'search') setCursorLabel('Search');
        else if (label === 'explore') setCursorLabel('Explore');
        else if (label === 'checkout') setCursorLabel('Buy');
        else if (label === 'account') setCursorLabel('Account');
        else setCursorLabel('');
      } else {
        setCursorLabel('');
      }

      setIsDragging(!!target.closest('.cursor-grab'));
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);
    const onDown = () => setIsDown(true);
    const onUp = () => setIsDown(false);

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
  }, [isDown]);

  if (!isDesktop) return null;

  const ringSize = isDragging ? 64 : isPointer ? 56 : 36;
  const ringBorderWidth = isPointer ? '1.5px' : '1px';

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `${ringBorderWidth} solid rgba(255, 255, 255, 0.4)`,
          borderRadius: isDragging ? '10px' : '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isHidden ? 0 : 1,
          mixBlendMode: 'difference',
          transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1), height 0.35s cubic-bezier(0.4,0,0.2,1), border-radius 0.35s ease, opacity 0.3s ease, border-width 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {cursorLabel && (
          <span style={{
            fontSize: '8px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: '#fff',
            whiteSpace: 'nowrap',
            fontFamily: 'Inter, system-ui, sans-serif',
            opacity: isPointer ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}>
            {cursorLabel}
          </span>
        )}
      </div>

      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isPointer ? '0px' : '5px',
          height: isPointer ? '0px' : '5px',
          background: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isHidden ? 0 : (isPointer ? 0 : 0.9),
          mixBlendMode: 'difference',
          transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1), height 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
        }}
      />
    </>
  );
}
