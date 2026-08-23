'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/format';

export default function ProductCard({ product, image }: { product: Product; image?: string }) {
  const hasSale = product.compare_at_price && product.compare_at_price > product.price;
  return (
    <Link href={`/shop/${product.slug}`} className="product-card group block">
      <div className="img-hover aspect-[3/4] bg-stone mb-5 relative overflow-hidden">
        {image && (
          <Image src={image} alt={product.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" className="object-cover" />
        )}
        <div className="card-overlay" />
        {(hasSale || product.new_arrival) && (
          <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 ${hasSale ? 'bg-ink text-cream' : 'bg-cream/90 text-ink backdrop-blur-sm'}`}>
            {hasSale ? 'Sale' : 'New'}
          </span>
        )}
        <div className="card-quickview">
          <span className="text-[10px] uppercase tracking-[0.15em] text-cream border-b border-cream/60 pb-0.5">View Product</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium tracking-tight">{product.name}</h3>
        <p className="text-xs text-ash mt-1">{product.short_description || product.brand}</p>
        <div className="flex items-baseline gap-2.5 mt-2.5">
          <span className="text-sm font-medium">{formatPrice(product.price, product.currency)}</span>
          {hasSale && <span className="text-xs text-ash line-through">{formatPrice(product.compare_at_price!, product.currency)}</span>}
        </div>
      </div>
    </Link>
  );
}
