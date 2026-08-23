'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    <section className="relative h-screen w-full overflow-hidden bg-cream">
      {image && (
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px) scale(${mounted ? 1 : 1.1})`, transition: 'transform 0.1s linear' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="HS Shoes Signature Collection" className="w-full h-full object-cover" style={{ filter: 'brightness(0.9)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-cream" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/50 via-transparent to-cream/20" />
        </div>
      )}
      <div className="film-grain" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div style={{ animation: mounted ? 'fadeUp 1.2s ease-out' : 'none', opacity: mounted ? 1 : 0 }}>
          <p className="text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-8 font-light">
            Premium Luxury Footwear
          </p>
          <h1 className="font-display text-hero text-ink mb-10 text-balance leading-[0.95]">
            Crafted to Be<br/>Remembered.
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn-primary"><span>Shop Collection</span></Link>
            <Link href="/about" className="btn-outline">Explore HS</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-ink/30">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-ink/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
