export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <div className="container-lux py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-5 font-light">Legal</p>
          <h1 className="font-display text-3xl md:text-[44px] mb-12">Privacy Policy</h1>
          <div className="space-y-8 text-ash text-[15px] leading-relaxed font-light">
            <p>HS Shoes respects your privacy. We collect only the information necessary to process your orders and provide you with the best possible service.</p>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Information We Collect</h2>
              <p>Your name, email, phone number, and shipping address — used solely for order processing and delivery.</p>
            </div>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">How We Use It</h2>
              <p>We use your information to process orders, communicate about deliveries, and — only with your consent — send you updates about new arrivals and offers.</p>
            </div>
            <div>
              <h2 className="text-ink text-base font-medium mb-3">Data Security</h2>
              <p>Your data is stored securely and never shared with third parties except as required for order fulfillment (courier services).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
