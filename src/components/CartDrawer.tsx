'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/format';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-ink/40 animate-fade-in" onClick={() => setIsOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-[90vw] bg-cream z-[80] transform transition-transform duration-400 ease-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone">
          <h2 className="font-display text-lg">Your Cart ({itemCount})</h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 text-ash">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-sm text-ash mb-6">Your cart is empty.</p>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="btn-primary">
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 h-24 bg-stone flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <Link href={`/shop/${item.slug}`} onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-ash transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-xs text-ash mt-1">{item.size} · {item.color}</p>
                    <p className="text-sm mt-2">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <button onClick={() => updateQuantity(index, item.quantity - 1)} className="text-xs text-ash hover:text-ink">−</button>
                      <span className="text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, item.quantity + 1)} className="text-xs text-ash hover:text-ink">+</button>
                      <button onClick={() => removeItem(index)} className="text-xs text-ash hover:text-ink ml-auto">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-ash">Subtotal</span>
              <span className="text-sm font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-ash">Shipping calculated at checkout. Cash on Delivery available.</p>
            <Link href="/checkout" onClick={() => setIsOpen(false)} className="btn-primary w-full">
              Checkout
            </Link>
            <Link href="/cart" onClick={() => setIsOpen(false)} className="btn-outline w-full text-center">
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
