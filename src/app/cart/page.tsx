'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils/format';
import Link from 'next/link';

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const shippingCost = subtotal >= 15000 ? 0 : 300;
  const total = subtotal + shippingCost;

  return (
    <div className="pt-20">
      <div className="container-lux py-12 md:py-20">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-5 font-light">Your Selection</p>
          <h1 className="font-display text-3xl md:text-[40px]">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-32">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-8 text-ash"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            <p className="text-ash mb-10 text-lg font-light">Your cart is empty.</p>
            <Link href="/shop" className="btn-primary inline-flex"><span>Browse Collection</span></Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-12 md:gap-20 max-w-6xl mx-auto">
            {/* Items */}
            <div className="md:col-span-2 space-y-8">
              {items.map((item, i) => (
                <div key={i} className="flex gap-6 pb-8 border-b border-stone last:border-b-0">
                  <Link href={`/shop/${item.slug}`} className="w-24 h-32 bg-stone flex-shrink-0 overflow-hidden img-hover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <Link href={`/shop/${item.slug}`} className="text-base font-medium hover:text-ash transition-colors">{item.name}</Link>
                    <p className="text-[11px] text-ash mt-1 uppercase tracking-wide">{item.size} · {item.color}</p>
                    <p className="text-sm mt-2">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-5 mt-auto pt-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(i, item.quantity - 1)} className="w-8 h-8 border border-stone hover:border-gold text-ash hover:text-gold transition-all flex items-center justify-center">−</button>
                        <span className="text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(i, item.quantity + 1)} className="w-8 h-8 border border-stone hover:border-gold text-ash hover:text-gold transition-all flex items-center justify-center">+</button>
                      </div>
                      <button onClick={() => removeItem(i)} className="text-[10px] text-ash hover:text-gold uppercase tracking-wide ml-auto transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="md:pt-2">
              <div className="bg-stone/40 p-8 sticky top-24">
                <h2 className="text-[10px] uppercase tracking-[0.25em] mb-8 font-light">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between"><span className="text-sm text-ash">Subtotal</span><span className="text-sm">{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-ash">Shipping</span><span className="text-sm">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span></div>
                </div>
                <div className="border-t border-stone pt-6 flex justify-between items-baseline mb-8">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-2xl font-medium font-display">{formatPrice(total)}</span>
                </div>
                <Link href="/checkout" className="btn-primary w-full mb-4"><span>Checkout</span></Link>
                <Link href="/shop" className="btn-outline w-full text-center">Continue Shopping</Link>
                <p className="text-[11px] text-ash mt-5 font-light text-center">Free shipping on orders over PKR 15,000</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
