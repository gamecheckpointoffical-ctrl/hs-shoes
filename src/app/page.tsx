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

  const allProducts = (featuredProducts || []) as Product[];
  const heroImage = allProducts[0]?.thumbnail_url || imageMap[allProducts[0]?.id || ''];

  return (
    <div>
      <Hero image={heroImage} />

      {/* Philosophy Quote */}
      <section className="py-24 md:py-40 px-6 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-display text-5xl text-ash/30 leading-none mb-8 block">"</span>
          <blockquote className="font-display text-2xl md:text-[34px] text-ink text-balance leading-[1.3] mb-10">
            A gentleman is known by the shoes he wears — and the silence with which he wears them.
          </blockquote>
          <p className="text-[10px] uppercase tracking-[0.3em] text-ash font-light">— The HS Philosophy</p>
        </div>
      </section>

      {/* Featured */}
      <section className="section-pad border-t border-stone">
        <div className="container-lux">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-6 h-px bg-stone" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-ash font-light">Signature Collection</p>
              <span className="w-6 h-px bg-stone" />
            </div>
            <h2 className="font-display text-3xl md:text-[44px] text-balance leading-tight max-w-2xl mx-auto">
              Crafted for those who notice the details.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {allProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} image={imageMap[product.id] || product.thumbnail_url || ''} />
            ))}
          </div>
        </div>
      </section>

      {/* 3D Experience */}
      <section className="bg-ink text-cream py-28 md:py-44 px-6 relative overflow-hidden">
        <div className="film-grain" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-px bg-cream/20" />
            <p className="text-[10px] uppercase tracking-[0.35em] text-cream/30 font-light">Interactive Experience</p>
            <span className="w-6 h-px bg-cream/20" />
          </div>
          <h2 className="font-display text-3xl md:text-[44px] mb-10 text-balance leading-tight">
            Explore every angle.<br/>Hold the shoe in your hands—virtually.
          </h2>
          <p className="text-cream/40 text-[15px] max-w-2xl mx-auto leading-relaxed font-light">
            Our interactive viewer lets you rotate, zoom, and examine each pair from every perspective.
            Because true luxury deserves to be seen from all sides.
          </p>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-pad">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-4 font-light">Just Arrived</p>
              <h2 className="font-display text-3xl md:text-[40px]">New Arrivals</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {(newArrivals || []).map((product: Product) => (
              <ProductCard key={product.id} product={product} image={newArrivalImageMap[product.id] || product.thumbnail_url || ''} />
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-stone py-28 md:py-44 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-28 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-6 font-light">Craftsmanship</p>
            <h2 className="font-display text-3xl md:text-[40px] mb-10 text-balance leading-tight">
              Every stitch tells a story.
            </h2>
            <p className="text-ash leading-relaxed mb-12 font-light text-[15px]">
              Each pair of HS Shoes is hand-finished by master craftsmen using time-honored techniques.
              From premium full-grain leather to the final hand-burnished finish, every step is an act of dedication.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="font-display text-5xl mb-2">72h</p>
                <p className="text-[10px] text-ash uppercase tracking-[0.25em]">Per Pair</p>
              </div>
              <div>
                <p className="font-display text-5xl mb-2">100%</p>
                <p className="text-[10px] text-ash uppercase tracking-[0.25em]">Hand-Finished</p>
              </div>
            </div>
          </div>
          <div className="aspect-[4/5] bg-ink/10 overflow-hidden img-hover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://auuhlwrasczevtflpfmu.supabase.co/storage/v1/object/public/hs-shoes/products/c7ce50d0b_WhatsAppImage2026-04-25at102445AM.jpg" alt="HS Shoes craftsmanship" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-pad">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-4 font-light">Most Loved</p>
              <h2 className="font-display text-3xl md:text-[40px]">Bestsellers</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {(bestsellers || []).map((product: Product) => (
              <ProductCard key={product.id} product={product} image={bestsellerImageMap[product.id] || product.thumbnail_url || ''} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-ink text-cream py-28 md:py-44 px-6 relative overflow-hidden">
        <div className="film-grain" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-[10px] uppercase tracking-[0.35em] text-cream/25 mb-10 font-light">Our Story</p>
          <h2 className="font-display text-3xl md:text-[44px] mb-12 text-balance leading-tight">
            We believe a shoe is more than footwear. It is a statement, a memory, a companion on the journeys that define us.
          </h2>
          <p className="text-cream/40 leading-relaxed mb-12 font-light text-[15px]">
            HS Shoes was founded on a simple principle: that luxury should not be loud, but felt.
            Every pair we create is an expression of restraint, quality, and timeless design—crafted to be remembered.
          </p>
          <a href="/about" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] border-b border-cream/20 pb-2 hover:border-cream transition-colors">
            Discover Our Story
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-28 md:py-44 px-6 border-b border-stone">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-6 font-light">Stay Connected</p>
          <h2 className="font-display text-3xl md:text-[40px] mb-6 text-balance">Join the HS Circle</h2>
          <p className="text-ash mb-12 font-light text-[15px]">Be the first to know about new arrivals, exclusive offers, and stories from the workshop.</p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
