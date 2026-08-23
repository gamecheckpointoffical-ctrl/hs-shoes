'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils/format';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);
  const [error, setError] = useState('');

  const shippingCost = subtotal >= 15000 ? 0 : 300;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      customer_phone: formData.get('phone'),
      shipping_address: {
        line1: formData.get('address'),
        city: formData.get('city'),
        postal_code: formData.get('postal'),
        country: 'Pakistan',
      },
      billing_address: {
        line1: formData.get('address'),
        city: formData.get('city'),
        postal_code: formData.get('postal'),
        country: 'Pakistan',
      },
      items: items.map(i => ({
        product_id: i.product_id, name: i.name, slug: i.slug, price: i.price,
        image: i.image, size: i.size, color: i.color, quantity: i.quantity, variant_id: i.variant_id,
      })),
      subtotal, shipping_cost: shippingCost, tax: 0, total,
      payment_provider: 'cash_on_delivery',
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setOrderComplete(result.order_number);
        clearCart();
        (form as HTMLFormElement).reset();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setProcessing(false);
  };

  if (orderComplete) {
    return (
      <div className="pt-32 pb-32 container-lux">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 border border-stone rounded-full flex items-center justify-center mx-auto mb-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-5 font-light">Order Confirmed</p>
          <h1 className="font-display text-3xl md:text-[40px] mb-6">Thank You</h1>
          <p className="text-ash mb-10 font-light text-[15px]">
            Your order <span className="text-cream font-medium">{orderComplete}</span> has been placed successfully.
            We'll contact you shortly to confirm delivery.
          </p>
          <Link href="/shop" className="btn-primary inline-flex"><span>Continue Shopping</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="container-lux py-12 md:py-20">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-5 font-light">Checkout</p>
          <h1 className="font-display text-3xl md:text-[40px]">Complete Your Order</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-ash mb-8 text-lg font-light">Your cart is empty.</p>
            <Link href="/shop" className="btn-primary inline-flex"><span>Browse Collection</span></Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 max-w-6xl mx-auto">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] mb-6 font-light">Contact Information</h2>
                <div className="space-y-4">
                  <input name="name" required placeholder="Full name" className="w-full border border-stone px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors" />
                  <input name="email" type="email" required placeholder="Email address" className="w-full border border-stone px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors" />
                  <input name="phone" type="tel" required placeholder="Phone number" className="w-full border border-stone px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>

              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] mb-6 font-light">Shipping Address</h2>
                <div className="space-y-4">
                  <input name="address" required placeholder="Street address" className="w-full border border-stone px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="city" required placeholder="City" className="border border-stone px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors" />
                    <input name="postal" required placeholder="Postal code" className="border border-stone px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <input value="Pakistan" readOnly className="w-full border border-stone px-5 py-4 text-sm text-ash bg-stone/30" />
                </div>
              </div>

              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] mb-6 font-light">Payment Method</h2>
                <div className="border border-stone p-5 flex items-center gap-4">
                  <input type="radio" id="cod" checked readOnly className="accent-ink" />
                  <label htmlFor="cod" className="text-sm">Cash on Delivery</label>
                  <span className="text-[10px] text-ash uppercase tracking-wide ml-auto">Available</span>
                </div>
                <p className="text-[11px] text-ash mt-3 font-light">Pay with cash when your order arrives. Additional payment methods coming soon.</p>
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button type="submit" disabled={processing} className="btn-primary w-full disabled:opacity-30">
                <span>{processing ? 'Processing...' : 'Place Order'}</span>
              </button>
            </form>

            {/* Summary */}
            <div className="md:pt-12">
              <div className="bg-stone/40 p-8">
                <h2 className="text-[10px] uppercase tracking-[0.25em] mb-8 font-light">Order Summary</h2>
                <div className="space-y-5 mb-8">
                  {items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-16 h-20 bg-stone flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-[10px] text-ash mt-1 uppercase tracking-wide">{item.size} · {item.color} · Qty {item.quantity}</p>
                        <p className="text-sm mt-2">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-ash">Subtotal</span>
                    <span className="text-sm">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-ash">Shipping</span>
                    <span className="text-sm">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-stone">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-lg font-medium">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-ash mt-5 font-light text-center">
                Free shipping on orders over PKR 15,000
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
