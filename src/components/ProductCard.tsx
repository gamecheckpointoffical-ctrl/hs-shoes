'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/format';

export default function ProductCard({ product, image }: { product: Product; image?: string }) {
  const hasSale = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <Link href={`/shop/${product.slug}`} className="product-card group block">
      <div className="img-hover aspect-[3/4] bg-stone mb-4 relative overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
          />
        )}
        {hasSale && (
          <span className="absolute top-3 left-3 bg-ink text-cream text-[10px] uppercase tracking-widest px-2 py-1">
            Sale
          </span>
        )}
        {product.new_arrival && !hasSale && (
          <span className="absolute top-3 left-3 bg-cream text-ink text-[10px] uppercase tracking-widest px-2 py-1">
            New
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-xs text-ash">{product.short_description || product.brand}</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-medium">{formatPrice(product.price, product.currency)}</span>
          {hasSale && (
            <span className="text-xs text-ash line-through">{formatPrice(product.compare_at_price!, product.currency)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
