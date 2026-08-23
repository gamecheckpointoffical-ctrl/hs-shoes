'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils/format';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');

  const shipping = subtotal > 300 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    
    const orderData = {
      customer_name: fd.get('name'),
      customer_email: fd.get('email'),
      customer_phone: fd.get('phone'),
      shipping_address: {
        line1: fd.get('address1'),
        line2: fd.get('address2'),
        city: fd.get('city'),
        state: fd.get('state'),
        postal_code: fd.get('postal'),
        country: fd.get('country'),
      },
      billing_address: {
        line1: fd.get('address1'),
        city: fd.get('city'),
        postal_code: fd.get('postal'),
        country: fd.get('country'),
      },
      items,
      subtotal,
      shipping_cost: shipping,
      tax,
      total,
      payment_provider: paymentMethod,
    };

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    setLoading(false);
    if (data.order_number) {
      setOrderNumber(data.order_number);
      setSuccess(true);
      clearCart();
    }
  };

  if (items.length === 0 && !success) {
    return (
      <div className="container-lux pt-32 pb-20 text-center">
        <h1 className="font-display text-4xl mb-6">Checkout</h1>
        <p className="text-ash mb-6">Your cart is empty.</p>
        <Link href="/shop" className="btn-primary">Browse Collection</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container-lux pt-32 pb-20 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 mx-auto mb-8 border-2 border-ink rounded-full flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h1 className="font-display text-4xl mb-4">Order Confirmed</h1>
        <p className="text-ash mb-2">Thank you for your order.</p>
        <p className="text-sm text-ash mb-8">Order Number: <span className="text-ink font-medium">{orderNumber}</span></p>
        <p className="text-sm text-ash mb-8">
          {paymentMethod === 'cash_on_delivery' 
            ? 'Pay with cash when your order arrives.' 
            : 'You will receive a confirmation email shortly.'}
        </p>
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-lux pt-32 pb-20">
      <h1 className="font-display text-4xl mb-12">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          {/* Contact */}
          <div>
            <h2 className="text-xs uppercase tracking-widest mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input required name="name" placeholder="Full name" className="border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input required type="email" name="email" placeholder="Email" className="border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input required name="phone" placeholder="Phone" className="border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
            </div>
          </div>
          {/* Shipping */}
          <div>
            <h2 className="text-xs uppercase tracking-widest mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input required name="address1" placeholder="Address line 1" className="col-span-2 border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input name="address2" placeholder="Address line 2 (optional)" className="col-span-2 border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input required name="city" placeholder="City" className="border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input name="state" placeholder="State/Province" className="border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input required name="postal" placeholder="Postal code" className="border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input required name="country" placeholder="Country" defaultValue="" className="border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
            </div>
          </div>
          {/* Payment */}
          <div>
            <h2 className="text-xs uppercase tracking-widest mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className={`flex items-center gap-3 border p-4 cursor-pointer transition-colors ${paymentMethod === 'cash_on_delivery' ? 'border-ink' : 'border-stone'}`}>
                <input type="radio" name="payment" value="cash_on_delivery" checked={paymentMethod === 'cash_on_delivery'} onChange={() => setPaymentMethod('cash_on_delivery')} />
                <div><p className="text-sm font-medium">Cash on Delivery</p><p className="text-xs text-ash">Pay with cash when your order arrives.</p></div>
              </label>
              <label className={`flex items-center gap-3 border p-4 cursor-pointer transition-colors opacity-50 ${paymentMethod === 'stripe' ? 'border-ink' : 'border-stone'}`}>
                <input type="radio" name="payment" value="stripe" disabled onChange={() => setPaymentMethod('stripe')} />
                <div><p className="text-sm font-medium">Credit Card (Stripe)</p><p className="text-xs text-ash">Coming soon — requires Stripe configuration.</p></div>
              </label>
              <label className={`flex items-center gap-3 border p-4 cursor-pointer transition-colors opacity-50 ${paymentMethod === 'paypal' ? 'border-ink' : 'border-stone'}`}>
                <input type="radio" name="payment" value="paypal" disabled onChange={() => setPaymentMethod('paypal')} />
                <div><p className="text-sm font-medium">PayPal</p><p className="text-xs text-ash">Coming soon — requires PayPal configuration.</p></div>
              </label>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border border-stone p-6 h-fit space-y-4">
          <h2 className="text-xs uppercase tracking-widest mb-4">Order Summary</h2>
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-3 text-sm">
              <div className="w-12 h-16 bg-stone flex-shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">{item.name}</p>
                <p className="text-xs text-ash">{item.size} · {item.color} · Qty {item.quantity}</p>
                <p className="text-xs">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-stone pt-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-ash">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-ash">Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-ash">Tax (8%)</span><span>{formatPrice(tax)}</span></div>
            <div className="flex justify-between font-medium pt-2 border-t border-stone"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
