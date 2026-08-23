import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-ink-soft text-cream pt-28 pb-12 px-6 md:px-16 relative overflow-hidden border-t border-stone/60">
      <div className="film-grain" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-24">
          <div className="col-span-2 md:col-span-5">
            <h3 className="font-display text-3xl md:text-4xl mb-5 text-cream">HS Shoes</h3>
            <p className="text-sm text-cream/40 leading-relaxed max-w-sm font-light mb-6">
              Crafted to Be Remembered. Premium luxury footwear, hand-finished from the finest materials.
            </p>
            <div className="space-y-2">
              <a href="tel:003175477734" className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <span>+92 317 5477734</span>
              </a>
            </div>
          </div>
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-[10px] uppercase tracking-[0.25em] mb-6 text-gold/60">Shop</h4>
            <ul className="space-y-3.5">
              <li><Link href="/shop" className="text-sm text-cream/60 hover:text-gold transition-colors">All Products</Link></li>
              <li><Link href="/shop?filter=new" className="text-sm text-cream/60 hover:text-gold transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?filter=bestseller" className="text-sm text-cream/60 hover:text-gold transition-colors">Bestsellers</Link></li>
              <li><Link href="/shop?category=boots" className="text-sm text-cream/60 hover:text-gold transition-colors">Boots</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] mb-6 text-gold/60">Company</h4>
            <ul className="space-y-3.5">
              <li><Link href="/about" className="text-sm text-cream/60 hover:text-gold transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-cream/60 hover:text-gold transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-sm text-cream/60 hover:text-gold transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-cream/60 hover:text-gold transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] mb-6 text-gold/60">Legal</h4>
            <ul className="space-y-3.5">
              <li><Link href="/privacy" className="text-sm text-cream/60 hover:text-gold transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-cream/60 hover:text-gold transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone/60 pt-20 mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <h4 className="font-display text-2xl md:text-3xl mb-4 text-cream">Join the HS Circle</h4>
              <p className="text-sm text-cream/40 font-light">Be the first to know about new arrivals and exclusive offers.</p>
            </div>
            <div className="max-w-md w-full"><NewsletterForm dark /></div>
          </div>
        </div>

        <div className="border-t border-stone/60 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[10px] text-cream/20 tracking-[0.15em] uppercase">© {new Date().getFullYear()} HS Shoes — Pakistan</p>
          <div className="flex items-center gap-10">
            <span className="text-[10px] text-cream/20 tracking-[0.15em] uppercase">Cash on Delivery</span>
            <span className="text-[10px] text-cream/20 tracking-[0.15em] uppercase">Secure Checkout</span>
            <span className="text-[10px] text-cream/20 tracking-[0.15em] uppercase">Free Shipping over PKR 15,000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
