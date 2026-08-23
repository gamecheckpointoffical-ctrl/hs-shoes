import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream pt-20 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-2xl mb-4">HS Shoes</h3>
            <p className="text-sm text-cream/60 leading-relaxed">Crafted to Be Remembered. Premium luxury footwear hand-finished from the finest materials.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-cream/40">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-sm text-cream/80 hover:text-cream transition-colors">All Products</Link></li>
              <li><Link href="/shop?filter=new" className="text-sm text-cream/80 hover:text-cream transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?filter=bestseller" className="text-sm text-cream/80 hover:text-cream transition-colors">Bestsellers</Link></li>
              <li><Link href="/shop?category=sneakers" className="text-sm text-cream/80 hover:text-cream transition-colors">Sneakers</Link></li>
              <li><Link href="/shop?category=boots" className="text-sm text-cream/80 hover:text-cream transition-colors">Boots</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-cream/40">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-cream/80 hover:text-cream transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-cream/80 hover:text-cream transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-sm text-cream/80 hover:text-cream transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-cream/80 hover:text-cream transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-cream/40">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-cream/80 hover:text-cream transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-cream/80 hover:text-cream transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10 pt-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-2">Join the HS Circle</h4>
              <p className="text-sm text-cream/60">Be the first to know about new arrivals and exclusive offers.</p>
            </div>
            <div className="max-w-md w-full"><NewsletterForm /></div>
          </div>
        </div>
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-cream/40">© {new Date().getFullYear()} HS Shoes. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-cream/40">Cash on Delivery Available</span>
            <span className="text-xs text-cream/40">Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
