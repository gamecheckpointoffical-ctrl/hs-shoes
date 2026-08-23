'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/format';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  const shippingCost = subtotal >= 15000 ? 0 : 300;
  const total = subtotal + shippingCost;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsOpen(false)} />}
      <div className={`fixed top-0 right-0 bottom-0 w-[440px] max-w-[90vw] bg-cream z-[80] transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-8 border-b border-stone/60">
          <h2 className="font-display text-xl text-ink">Your Cart <span className="text-sm text-ash">({itemCount})</span></h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart" className="text-ink hover:text-ash transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-5 text-ash"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              <p className="text-sm text-ash mb-8">Your cart is empty.</p>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="btn-primary"><span>Browse Collection</span></Link>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 h-24 bg-cream-warm flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <Link href={`/shop/${item.slug}`} onClick={() => setIsOpen(false)} className="text-sm font-medium text-ink hover:text-ash transition-colors">{item.name}</Link>
                    <p className="text-[11px] text-ash mt-1 uppercase tracking-wide">{item.size} · {item.color}</p>
                    <p className="text-sm mt-2 text-ink">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-4 mt-auto pt-2">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} className="text-xs text-ash hover:text-ink w-6 h-6 flex items-center justify-center border border-stone hover:border-ink transition-colors">−</button>
                        <span className="text-xs text-ink">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} className="text-xs text-ash hover:text-ink w-6 h-6 flex items-center justify-center border border-stone hover:border-ink transition-colors">+</button>
                      </div>
                      <button onClick={() => removeItem(index)} className="text-[10px] text-ash hover:text-ink uppercase tracking-wide ml-auto transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-stone/60 p-8">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-ash">Subtotal</span>
                <span className="text-sm text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-ash">Shipping</span>
                <span className="text-sm text-ink">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline border-t border-stone/60 pt-4 mb-6">
              <span className="text-sm font-medium text-ink">Total</span>
              <span className="text-lg font-medium text-ink font-display">{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" onClick={() => setIsOpen(false)} className="btn-primary w-full mb-3"><span>Checkout</span></Link>
            <p className="text-[11px] text-ash text-center font-light">Free shipping over PKR 15,000</p>
          </div>
        )}
      </div>
    </>
  );
}
