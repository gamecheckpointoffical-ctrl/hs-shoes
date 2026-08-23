'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero({ image }: { image?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-cream">
      {/* Background image */}
      {image && (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="HS Shoes Signature Collection"
            className="w-full h-full object-cover"
            style={{
              transform: mounted ? 'scale(1)' : 'scale(1.1)',
              transition: 'transform 2s ease-out',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream/60" />
          <div className="absolute inset-0 bg-cream/20" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div style={{ animation: mounted ? 'fadeUp 1s ease-out' : 'none' }}>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/60 mb-6">
            Premium Luxury Footwear
          </p>
          <h1 className="font-display text-hero text-ink mb-8 text-balance">
            Crafted to Be<br />Remembered.
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary">Shop Collection</Link>
            <Link href="/about" className="btn-outline">Explore HS</Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-ink/40">Scroll</span>
          <div className="w-px h-12 bg-ink/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
