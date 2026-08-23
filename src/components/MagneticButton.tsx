'use client';

import { useRef, useState, ReactNode } from 'react';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  ...props
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  [key: string]: any;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const Tag = props.href ? 'a' : 'button';

  return (
    <Tag
      ref={ref as any}
      className={`relative inline-flex transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
