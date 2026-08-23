export const metadata = { title: 'Returns Policy — HS Shoes', description: 'HS Shoes returns and exchanges.' };
export default function ReturnsPage() {
  return (
    <div className="container-lux pt-32 pb-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Returns & Exchanges</h1>
      <div className="prose prose-sm text-ash space-y-6">
        <div><h2 className="text-ink text-lg mb-2">30-Day Returns</h2><p>We accept returns within 30 days of delivery. Items must be unworn and in original packaging.</p></div>
        <div><h2 className="text-ink text-lg mb-2">How to Return</h2><p>Email care@hsshoes.com with your order number. We will send a return label and instructions.</p></div>
        <div><h2 className="text-ink text-lg mb-2">Exchanges</h2><p>Need a different size or color? We offer free exchanges within 30 days.</p></div>
        <div><h2 className="text-ink text-lg mb-2">Refunds</h2><p>Refunds are processed within 5–7 business days of receiving your return.</p></div>
      </div>
    </div>
  );
}
