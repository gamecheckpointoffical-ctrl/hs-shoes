'use client';
import ProductCard from './ProductCard';
import type { Product, Category } from '@/lib/types';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

export default function ShopClient({
  products, categories, imageMap, title, currentFilter, currentCategory,
}: {
  products: Product[]; categories: Category[]; imageMap: Record<string, string>;
  title: string; currentFilter: string; currentCategory: string;
}) {
  return (
    <div className="container-lux pt-16 pb-32">
      <div className="text-center mb-16 pt-8">
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold mb-5 font-light">HS Shoes</p>
        <h1 className="font-display text-4xl md:text-[48px] mb-4 text-cream">{title}</h1>
        <div className="flex items-center justify-center gap-3">
          <span className="w-6 h-px bg-stone/60" />
          <p className="text-xs text-ash">{products.length} products</p>
          <span className="w-6 h-px bg-stone/60" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 mb-16">
        <MagneticButton href="/shop" strength={0.2} className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
          !currentFilter && !currentCategory ? 'border-gold bg-gold text-ink' : 'border-stone/60 hover:border-gold text-ash hover:text-cream'
        }`}>All</MagneticButton>
        <MagneticButton href="/shop?filter=new" strength={0.2} className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
          currentFilter === 'new' ? 'border-gold bg-gold text-ink' : 'border-stone/60 hover:border-gold text-ash hover:text-cream'
        }`}>New Arrivals</MagneticButton>
        <MagneticButton href="/shop?filter=bestseller" strength={0.2} className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
          currentFilter === 'bestseller' ? 'border-gold bg-gold text-ink' : 'border-stone/60 hover:border-gold text-ash hover:text-cream'
        }`}>Bestsellers</MagneticButton>
        {categories.map((cat) => (
          <MagneticButton key={cat.id} href={`/shop?category=${cat.slug}`} strength={0.2} className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
            currentCategory === cat.slug ? 'border-gold bg-gold text-ink' : 'border-stone/60 hover:border-gold text-ash hover:text-cream'
          }`}>{cat.name}</MagneticButton>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-ash mb-6 text-lg font-light">No products found.</p>
          <Link href="/shop" className="text-[10px] uppercase tracking-[0.15em] link-underline text-gold">View all products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} image={imageMap[product.id] || product.thumbnail_url || ''} />
          ))}
        </div>
      )}
    </div>
  );
}
