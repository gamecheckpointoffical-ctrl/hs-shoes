'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-stone' : 'bg-transparent'
      }`}>
        <div className="container-lux flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-px bg-ink" />
            <span className="block w-5 h-px bg-ink" />
            <span className="block w-5 h-px bg-ink" />
          </button>

          {/* Desktop nav left */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-xs uppercase tracking-widest link-underline">Shop</Link>
            <Link href="/shop?filter=new" className="text-xs uppercase tracking-widest link-underline">New Arrivals</Link>
            <Link href="/shop?filter=bestseller" className="text-xs uppercase tracking-widest link-underline">Bestsellers</Link>
            <Link href="/about" className="text-xs uppercase tracking-widest link-underline">About</Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-display text-xl md:text-2xl tracking-tight">HS Shoes</span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/shop" className="hidden md:block" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </Link>
            <Link href="/account" className="hidden md:block" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <button onClick={() => setIsOpen(true)} className="relative" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ink text-cream text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-ink/40 animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-cream p-8 animate-slide-in flex flex-col">
            <div className="flex items-center justify-between mb-12">
              <span className="font-display text-lg">HS Shoes</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              <Link href="/shop" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest">Shop</Link>
              <Link href="/shop?filter=new" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest">New Arrivals</Link>
              <Link href="/shop?filter=bestseller" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest">Bestsellers</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest">About</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest">Contact</Link>
              <Link href="/shipping" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest">Shipping</Link>
              <Link href="/returns" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest">Returns</Link>
            </nav>
            <div className="mt-auto pt-8 border-t border-stone">
              <Link href="/account" onClick={() => setMobileOpen(false)} className="text-xs uppercase tracking-widest text-ash">Account</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
