'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/format';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const shipping = subtotal > 300 ? 0 : 15;

  return (
    <div className="container-lux pt-32 pb-20">
      <h1 className="font-display text-4xl md:text-5xl mb-12">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ash mb-6">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary">Browse Collection</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-6 border-b border-stone pb-6">
                <div className="w-24 h-32 bg-stone flex-shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/shop/${item.slug}`} className="text-sm font-medium hover:text-ash">{item.name}</Link>
                  <p className="text-xs text-ash mt-1">{item.size} · {item.color}</p>
                  <p className="text-sm mt-2">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(idx, item.quantity - 1)} className="w-8 h-8 border border-stone">−</button>
                      <span className="text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(idx, item.quantity + 1)} className="w-8 h-8 border border-stone">+</button>
                    </div>
                    <button onClick={() => removeItem(idx)} className="text-xs text-ash hover:text-ink ml-auto">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-stone p-6 h-fit space-y-4">
            <h2 className="text-xs uppercase tracking-widest mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm"><span className="text-ash">Subtotal ({itemCount} items)</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-ash">Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-medium pt-4 border-t border-stone"><span>Total</span><span>{formatPrice(subtotal + shipping)}</span></div>
            <Link href="/checkout" className="btn-primary w-full text-center">Checkout</Link>
            <Link href="/shop" className="btn-outline w-full text-center">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}
