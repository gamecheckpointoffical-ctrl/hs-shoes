'use client';
import ProductCard from './ProductCard';
import type { Product, Category } from '@/lib/types';
import Link from 'next/link';

export default function ShopClient({
  products, categories, imageMap, title, currentFilter, currentCategory,
}: {
  products: Product[]; categories: Category[]; imageMap: Record<string, string>;
  title: string; currentFilter: string; currentCategory: string;
}) {
  return (
    <div className="container-lux pt-16 pb-32">
      <div className="text-center mb-16 pt-8">
        <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-5 font-light">HS Shoes</p>
        <h1 className="font-display text-4xl md:text-[48px] mb-4">{title}</h1>
        <div className="flex items-center justify-center gap-3">
          <span className="w-6 h-px bg-stone" />
          <p className="text-xs text-ash">{products.length} products</p>
          <span className="w-6 h-px bg-stone" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 mb-16">
        <Link href="/shop" className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
          !currentFilter && !currentCategory ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink text-ash hover:text-ink'
        }`}>All</Link>
        <Link href="/shop?filter=new" className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
          currentFilter === 'new' ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink text-ash hover:text-ink'
        }`}>New Arrivals</Link>
        <Link href="/shop?filter=bestseller" className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
          currentFilter === 'bestseller' ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink text-ash hover:text-ink'
        }`}>Bestsellers</Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/shop?category=${cat.slug}`} className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
            currentCategory === cat.slug ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink text-ash hover:text-ink'
          }`}>{cat.name}</Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-ash mb-6 text-lg font-light">No products found.</p>
          <Link href="/shop" className="text-[10px] uppercase tracking-[0.15em] link-underline">View all products</Link>
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
