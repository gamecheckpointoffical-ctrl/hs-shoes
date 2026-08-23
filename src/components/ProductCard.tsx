'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/format';

export default function ProductCard({ product, image }: { product: Product; image?: string }) {
  const hasSale = product.compare_at_price && product.compare_at_price > product.price;
  return (
    <Link href={`/shop/${product.slug}`} className="product-card group block" data-cursor="view">
      <div className="img-hover aspect-[3/4] bg-cream-warm mb-6 relative overflow-hidden">
        {image && (
          <Image src={image} alt={product.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" className="object-cover" />
        )}
        <div className="card-overlay" />
        {hasSale && (
          <span className="absolute top-5 left-5 text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 bg-ink text-cream">
            Sale
          </span>
        )}
        {!hasSale && product.new_arrival && (
          <span className="absolute top-5 left-5 text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 bg-cream/90 text-ink backdrop-blur-sm">
            New
          </span>
        )}
        <div className="card-quickview">
          <span className="text-[10px] uppercase tracking-[0.2em] text-cream border-b border-cream/50 pb-1">View Product</span>
        </div>
      </div>
      <div className="space-y-1.5">
        <h3 className="text-[15px] font-medium tracking-tight text-ink">{product.name}</h3>
        <p className="text-xs text-ash leading-relaxed">{product.short_description || product.brand}</p>
        <div className="flex items-baseline gap-3 pt-1">
          <span className="text-[15px] font-medium text-ink">{formatPrice(product.price, product.currency)}</span>
          {hasSale && <span className="text-xs text-ash line-through">{formatPrice(product.compare_at_price!, product.currency)}</span>}
        </div>
      </div>
    </Link>
  );
}
