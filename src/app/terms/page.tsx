export const metadata = { title: 'Terms & Conditions — HS Shoes', description: 'HS Shoes terms and conditions.' };
export default function TermsPage() {
  return (
    <div className="container-lux pt-32 pb-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Terms & Conditions</h1>
      <div className="prose prose-sm text-ash space-y-4">
        <p>By using this website, you agree to these terms and conditions.</p>
        <h2 className="text-ink text-lg">Products</h2><p>All products are subject to availability. We reserve the right to limit quantities.</p>
        <h2 className="text-ink text-lg">Pricing</h2><p>Prices are listed in USD and may change without notice. We are not responsible for pricing errors.</p>
        <h2 className="text-ink text-lg">Orders</h2><p>All orders are subject to acceptance and confirmation. We reserve the right to cancel any order.</p>
        <h2 className="text-ink text-lg">Intellectual Property</h2><p>All content on this site is owned by HS Shoes and may not be reproduced without permission.</p>
        <h2 className="text-ink text-lg">Liability</h2><p>HS Shoes is not liable for indirect or consequential damages arising from the use of our products.</p>
      </div>
    </div>
  );
}
