import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream pt-24 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-20">
          <div className="col-span-2 md:col-span-2">
            <h3 className="font-display text-3xl mb-5">HS Shoes</h3>
            <p className="text-sm text-cream/50 leading-relaxed max-w-xs">
              Crafted to Be Remembered. Premium luxury footwear, hand-finished from the finest materials.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-cream/30">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-cream/70 hover:text-cream transition-colors">All Products</Link></li>
              <li><Link href="/shop?filter=new" className="text-sm text-cream/70 hover:text-cream transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?filter=bestseller" className="text-sm text-cream/70 hover:text-cream transition-colors">Bestsellers</Link></li>
              <li><Link href="/shop?category=sneakers" className="text-sm text-cream/70 hover:text-cream transition-colors">Sneakers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-cream/30">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-cream/70 hover:text-cream transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-cream/70 hover:text-cream transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-sm text-cream/70 hover:text-cream transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-cream/70 hover:text-cream transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-cream/30">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-cream/70 hover:text-cream transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-cream/70 hover:text-cream transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-16 mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h4 className="font-display text-2xl mb-3">Join the HS Circle</h4>
              <p className="text-sm text-cream/50">Be the first to know about new arrivals and exclusive offers.</p>
            </div>
            <div className="max-w-md w-full"><NewsletterForm /></div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[11px] text-cream/30 tracking-wide">© {new Date().getFullYear()} HS Shoes. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <span className="text-[11px] text-cream/30 tracking-wide">Cash on Delivery</span>
            <span className="text-[11px] text-cream/30 tracking-wide">Secure Checkout</span>
            <span className="text-[11px] text-cream/30 tracking-wide">Free Shipping over $300</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
