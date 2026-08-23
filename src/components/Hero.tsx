'use client';
import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

export default function Hero({ image }: { image?: string }) {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      {image && (
        <div className="absolute inset-0" style={{
          transform: `translateY(${scrollY * 0.25}px) scale(${mounted ? 1 : 1.15})`,
          transition: 'transform 0.1s linear'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="HS Shoes Signature Collection" className="w-full h-full object-cover" style={{ filter: 'brightness(0.65) contrast(1.1) saturate(0.85)' }} />
          {/* Brown gradient overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(31,22,17,0.5) 0%, rgba(31,22,17,0.2) 30%, rgba(31,22,17,0.3) 50%, rgba(31,22,17,0.85) 100%)'
          }} />
        </div>
      )}
      <div className="film-grain" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div style={{
          animation: mounted ? 'fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          opacity: mounted ? 1 : 0
        }}>
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-8 h-px bg-gold/40" />
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80 font-light">
              Premium Luxury Footwear
            </p>
            <span className="w-8 h-px bg-gold/40" />
          </div>
          <h1 className="font-display text-hero text-cream mb-12 text-balance" style={{ lineHeight: '0.95' }}>
            Crafted to Be<br/>Remembered.
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton href="/shop" className="btn-primary" strength={0.35} data-cursor="shop">
              <span>Shop Collection</span>
            </MagneticButton>
            <MagneticButton href="/about" className="btn-outline" strength={0.25} data-cursor="explore">
              Explore HS
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10" style={{
        animation: mounted ? 'fadeIn 2s ease 1.5s both' : 'none'
      }}>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.35em] text-cream/30">Scroll</span>
          <div className="w-px h-20 bg-gradient-to-b from-gold/30 via-cream/15 to-transparent" />
        </div>
      </div>
    </section>
  );
}
