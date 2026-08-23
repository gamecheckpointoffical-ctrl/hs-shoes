export default function ShippingPage() {
  return (
    <div className="pt-20">
      <div className="container-lux py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-5 font-light">Information</p>
          <h1 className="font-display text-3xl md:text-[44px] mb-12">Shipping Policy</h1>
          <div className="space-y-8 text-ash text-[15px] leading-relaxed font-light">
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Pakistan Standard Shipping</h2>
              <p>Orders within Pakistan are shipped via reliable courier services. Standard delivery takes 3-5 business days. Shipping cost is PKR 300, or free on orders above PKR 15,000.</p>
            </div>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Processing Time</h2>
              <p>All orders are processed within 24-48 hours of placement. You will receive a confirmation call before dispatch.</p>
            </div>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Cash on Delivery</h2>
              <p>Cash on Delivery is available across Pakistan. Please have the exact amount ready when your order arrives.</p>
            </div>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Tracking</h2>
              <p>A tracking number will be provided once your order has been dispatched. You can track your shipment through the courier's website.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
