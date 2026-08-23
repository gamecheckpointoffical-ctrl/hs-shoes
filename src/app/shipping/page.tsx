export const metadata = { title: 'Shipping Policy — HS Shoes', description: 'HS Shoes shipping information.' };
export default function ShippingPage() {
  return (
    <div className="container-lux pt-32 pb-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Shipping Policy</h1>
      <div className="prose prose-sm text-ash space-y-6">
        <div><h2 className="text-ink text-lg mb-2">Free Shipping</h2><p>Free standard shipping on all orders over $300.</p></div>
        <div><h2 className="text-ink text-lg mb-2">Standard Shipping</h2><p>Flat rate of $15 for orders under $300. Delivery within 5–7 business days.</p></div>
        <div><h2 className="text-ink text-lg mb-2">Express Shipping</h2><p>$30 flat rate. Delivery within 2–3 business days.</p></div>
        <div><h2 className="text-ink text-lg mb-2">International Shipping</h2><p>We ship worldwide. Rates calculated at checkout based on destination.</p></div>
        <div><h2 className="text-ink text-lg mb-2">Cash on Delivery</h2><p>COD available in select regions. Pay with cash when your order arrives.</p></div>
        <div><h2 className="text-ink text-lg mb-2">Tracking</h2><p>All orders include tracking. You will receive a tracking number via email once your order ships.</p></div>
      </div>
    </div>
  );
}
