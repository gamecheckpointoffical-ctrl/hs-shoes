export const metadata = { title: 'Privacy Policy — HS Shoes', description: 'HS Shoes privacy policy.' };
export default function PrivacyPage() {
  return (
    <div className="container-lux pt-32 pb-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Privacy Policy</h1>
      <div className="prose prose-sm text-ash space-y-4">
        <p>HS Shoes respects your privacy. This policy explains how we collect, use, and protect your information.</p>
        <h2 className="text-ink text-lg">Information We Collect</h2><p>We collect your name, email, shipping address, and payment information when you place an order.</p>
        <h2 className="text-ink text-lg">How We Use It</h2><p>We use your information to process orders, provide customer service, and send updates about products.</p>
        <h2 className="text-ink text-lg">Data Security</h2><p>We use secure, encrypted connections and never store raw payment card details. All payments are processed through secure third-party providers.</p>
        <h2 className="text-ink text-lg">Cookies</h2><p>We use minimal cookies to improve your shopping experience and analyze site traffic.</p>
        <h2 className="text-ink text-lg">Contact</h2><p>Questions? Email care@hsshoes.com.</p>
      </div>
    </div>
  );
}
