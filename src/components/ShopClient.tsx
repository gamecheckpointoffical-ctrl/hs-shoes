'use client';

import ProductCard from './ProductCard';
import type { Product, Category } from '@/lib/types';
import Link from 'next/link';

export default function ShopClient({
  products,
  categories,
  imageMap,
  title,
  currentFilter,
  currentCategory,
}: {
  products: Product[];
  categories: Category[];
  imageMap: Record<string, string>;
  title: string;
  currentFilter: string;
  currentCategory: string;
}) {
  return (
    <div className="container-lux pt-12 pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-ash mb-3">HS Shoes</p>
        <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
        <p className="text-sm text-ash mt-3">{products.length} products</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <Link href="/shop" className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
          !currentFilter && !currentCategory ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink'
        }`}>All</Link>
        <Link href="/shop?filter=new" className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
          currentFilter === 'new' ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink'
        }`}>New Arrivals</Link>
        <Link href="/shop?filter=bestseller" className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
          currentFilter === 'bestseller' ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink'
        }`}>Bestsellers</Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/shop?category=${cat.slug}`} className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
            currentCategory === cat.slug ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink'
          }`}>{cat.name}</Link>
        ))}
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ash mb-4">No products found.</p>
          <Link href="/shop" className="text-xs uppercase tracking-widest link-underline">View all products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} image={imageMap[product.id] || product.thumbnail_url || ''} />
          ))}
        </div>
      )}
    </div>
  );
}
