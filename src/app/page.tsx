import { createServerClient } from '@/lib/supabase/server';
import type { Product, ProductImage } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import NewsletterForm from '@/components/NewsletterForm';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = createServerClient();

  const { data: featuredProducts } = await supabase.from('hs_products').select('*').eq('featured', true).eq('status', 'active').limit(4);
  const { data: newArrivals } = await supabase.from('hs_products').select('*').eq('new_arrival', true).eq('status', 'active').limit(4);
  const { data: bestsellers } = await supabase.from('hs_products').select('*').eq('bestseller', true).eq('status', 'active').limit(4);

  const featuredIds = (featuredProducts || []).map((p: Product) => p.id);
  const { data: featuredImages } = await supabase.from('hs_product_images').select('*').in('product_id', featuredIds).order('sort_order');
  const imageMap: Record<string, string> = {};
  (featuredImages || []).forEach((img: ProductImage) => { if (!imageMap[img.product_id]) imageMap[img.product_id] = img.url; });

  const newArrivalIds = (newArrivals || []).map((p: Product) => p.id);
  const { data: newArrivalImages } = await supabase.from('hs_product_images').select('*').in('product_id', newArrivalIds).order('sort_order');
  const newArrivalImageMap: Record<string, string> = {};
  (newArrivalImages || []).forEach((img: ProductImage) => { if (!newArrivalImageMap[img.product_id]) newArrivalImageMap[img.product_id] = img.url; });

  const bestsellerIds = (bestsellers || []).map((p: Product) => p.id);
  const { data: bestsellerImages } = await supabase.from('hs_product_images').select('*').in('product_id', bestsellerIds).order('sort_order');
  const bestsellerImageMap: Record<string, string> = {};
  (bestsellerImages || []).forEach((img: ProductImage) => { if (!bestsellerImageMap[img.product_id]) bestsellerImageMap[img.product_id] = img.url; });

  return (
    <div>
      <Hero image={featuredProducts?.[0]?.thumbnail_url || imageMap[featuredProducts?.[0]?.id || '']} />

      <section className="section-pad">
        <div className="container-lux">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-ash mb-3">Signature Collection</p>
            <h2 className="font-display text-3xl md:text-5xl text-balance">Crafted for those who notice the details.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {(featuredProducts || []).map((product: Product) => (
              <ProductCard key={product.id} product={product} image={imageMap[product.id] || product.thumbnail_url || ''} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-cream/40 mb-4">Interactive Experience</p>
          <h2 className="font-display text-3xl md:text-5xl mb-6 text-balance">Explore every angle. Hold the shoe in your hands—virtually.</h2>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">Our interactive viewer lets you rotate, zoom, and examine each pair from every perspective.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-12">
            <div><p className="text-xs uppercase tracking-widest text-ash mb-2">Just Arrived</p><h2 className="font-display text-3xl md:text-4xl">New Arrivals</h2></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {(newArrivals || []).map((product: Product) => (
              <ProductCard key={product.id} product={product} image={newArrivalImageMap[product.id] || product.thumbnail_url || ''} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-ash mb-4">Craftsmanship</p>
            <h2 className="font-display text-3xl md:text-4xl mb-6 text-balance">Every stitch tells a story.</h2>
            <p className="text-ash leading-relaxed mb-6">Each pair of HS Shoes is hand-finished by master craftsmen using time-honored techniques. From premium full-grain leather to the final hand-burnished finish, every step is an act of dedication.</p>
            <div className="grid grid-cols-2 gap-6">
              <div><p className="font-display text-3xl mb-1">72h</p><p className="text-xs text-ash uppercase tracking-widest">Per Pair</p></div>
              <div><p className="font-display text-3xl mb-1">100%</p><p className="text-xs text-ash uppercase tracking-widest">Hand-Finished</p></div>
            </div>
          </div>
          <div className="aspect-[4/5] bg-ink/10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://auuhlwrasczevtflpfmu.supabase.co/storage/v1/object/public/hs-shoes/products/c7ce50d0b_WhatsAppImage2026-04-25at102445AM.jpg" alt="HS Shoes craftsmanship" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-12">
            <div><p className="text-xs uppercase tracking-widest text-ash mb-2">Most Loved</p><h2 className="font-display text-3xl md:text-4xl">Bestsellers</h2></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {(bestsellers || []).map((product: Product) => (
              <ProductCard key={product.id} product={product} image={bestsellerImageMap[product.id] || product.thumbnail_url || ''} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream py-20 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-cream/40 mb-6">Our Story</p>
          <h2 className="font-display text-3xl md:text-5xl mb-8 text-balance leading-tight">We believe a shoe is more than footwear. It is a statement, a memory, a companion on the journeys that define us.</h2>
          <p className="text-cream/60 leading-relaxed mb-8">HS Shoes was founded on a simple principle: that luxury should not be loud, but felt. Every pair we create is an expression of restraint, quality, and timeless design—crafted to be remembered.</p>
          <a href="/about" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-cream/40 pb-1 hover:border-cream transition-colors">Discover Our Story</a>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 border-b border-stone">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-ash mb-4">Stay Connected</p>
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-balance">Join the HS Circle</h2>
          <p className="text-ash mb-8">Be the first to know about new arrivals, exclusive offers, and stories from the workshop.</p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
