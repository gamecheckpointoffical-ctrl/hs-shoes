export default function TermsPage() {
  return (
    <div className="pt-20">
      <div className="container-lux py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-5 font-light">Legal</p>
          <h1 className="font-display text-3xl md:text-[44px] mb-12">Terms & Conditions</h1>
          <div className="space-y-8 text-ash text-[15px] leading-relaxed font-light">
            <p>By using the HS Shoes website and placing an order, you agree to the following terms.</p>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Orders</h2>
              <p>All orders are subject to availability. We reserve the right to refuse or cancel any order. Prices are listed in PKR and include applicable taxes.</p>
            </div>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Payment</h2>
              <p>We currently accept Cash on Delivery within Pakistan. Additional payment methods will be available soon.</p>
            </div>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Product Information</h2>
              <p>We strive to display products accurately. However, colors may vary slightly due to screen settings. All product images are the property of HS Shoes.</p>
            </div>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Contact</h2>
              <p>For any questions regarding these terms, contact us at +92 317 5477734 or hello@hsshoes.com.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
