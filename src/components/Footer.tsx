import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream pt-28 pb-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-24">
          <div className="col-span-2 md:col-span-5">
            <h3 className="font-display text-3xl md:text-4xl mb-5">HS Shoes</h3>
            <p className="text-sm text-cream/40 leading-relaxed max-w-sm font-light">
              Crafted to Be Remembered. Premium luxury footwear, hand-finished from the finest materials.
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-[10px] uppercase tracking-[0.25em] mb-6 text-cream/25">Shop</h4>
            <ul className="space-y-3.5">
              <li><Link href="/shop" className="text-sm text-cream/65 hover:text-cream transition-colors">All Products</Link></li>
              <li><Link href="/shop?filter=new" className="text-sm text-cream/65 hover:text-cream transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?filter=bestseller" className="text-sm text-cream/65 hover:text-cream transition-colors">Bestsellers</Link></li>
              <li><Link href="/shop?category=sneakers" className="text-sm text-cream/65 hover:text-cream transition-colors">Sneakers</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] mb-6 text-cream/25">Company</h4>
            <ul className="space-y-3.5">
              <li><Link href="/about" className="text-sm text-cream/65 hover:text-cream transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-cream/65 hover:text-cream transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-sm text-cream/65 hover:text-cream transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-cream/65 hover:text-cream transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] mb-6 text-cream/25">Legal</h4>
            <ul className="space-y-3.5">
              <li><Link href="/privacy" className="text-sm text-cream/65 hover:text-cream transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-cream/65 hover:text-cream transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-cream/8 pt-20 mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <h4 className="font-display text-2xl md:text-3xl mb-4">Join the HS Circle</h4>
              <p className="text-sm text-cream/40 font-light">Be the first to know about new arrivals and exclusive offers.</p>
            </div>
            <div className="max-w-md w-full"><NewsletterForm /></div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/8 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[10px] text-cream/25 tracking-[0.15em] uppercase">© {new Date().getFullYear()} HS Shoes</p>
          <div className="flex items-center gap-10">
            <span className="text-[10px] text-cream/25 tracking-[0.15em] uppercase">Cash on Delivery</span>
            <span className="text-[10px] text-cream/25 tracking-[0.15em] uppercase">Secure Checkout</span>
            <span className="text-[10px] text-cream/25 tracking-[0.15em] uppercase">Free Shipping over $300</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
