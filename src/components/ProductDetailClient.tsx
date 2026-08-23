'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils/format';
import type { Product, ProductImage, ProductVariant, Review } from '@/lib/types';
import ProductViewer3D from './ProductViewer3D';
import ProductCard from './ProductCard';

export default function ProductDetailClient({
  product, images, variants, reviews, relatedProducts, relatedImageMap,
}: {
  product: Product;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews: Review[];
  relatedProducts: Product[];
  relatedImageMap: Record<string, string>;
}) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'reviews'>('details');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  const hasSale = product.compare_at_price && product.compare_at_price > product.price;
  const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))] as string[];
  const colors = [...new Set(variants.map(v => v.color).filter(Boolean))] as string[];

  const selectedVariant = variants.find(v => v.size === selectedSize && v.color === selectedColor);
  const inStock = selectedVariant ? selectedVariant.stock > 0 : variants.some(v => v.stock > 0);

  const handleAddToCart = () => {
    setError('');
    if (sizes.length > 0 && !selectedSize) { setError('Please select a size'); return; }
    if (colors.length > 0 && !selectedColor) { setError('Please select a color'); return; }
    
    const mainImage = images.find(i => i.image_type === 'main') || images[0];
    addItem({
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: mainImage?.url || product.thumbnail_url || '',
      size: selectedSize || 'Default',
      color: selectedColor || 'Default',
      quantity,
      variant_id: selectedVariant?.id || '',
    });
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="container-lux py-4">
        <nav className="flex items-center gap-2 text-xs text-ash">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="container-lux grid md:grid-cols-2 gap-8 md:gap-16 pb-20">
        {/* Left: Gallery / 3D Viewer */}
        <div>
          {showViewer ? (
            <ProductViewer3D
              images={images.map(i => ({ url: i.url, alt_text: i.alt_text }))}
              modelType={product.model_type}
              productName={product.name}
            />
          ) : (
            <div className="aspect-square bg-stone overflow-hidden relative">
              {images[galleryIndex] && (
                <Image src={images[galleryIndex].url} alt={images[galleryIndex].alt_text || product.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-contain" />
              )}
            </div>
          )}

          {/* Toggle */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowViewer(false)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${!showViewer ? 'border-ink bg-ink text-cream' : 'border-stone'}`}
            >Gallery</button>
            <button
              onClick={() => setShowViewer(true)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${showViewer ? 'border-ink bg-ink text-cream' : 'border-stone'}`}
            >Interactive 3D View</button>
          </div>

          {/* Thumbnails */}
          {!showViewer && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setGalleryIndex(idx)}
                  className={`w-16 h-20 flex-shrink-0 border-2 overflow-hidden ${idx === galleryIndex ? 'border-ink' : 'border-stone'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt_text || ''} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product info */}
        <div className="md:pt-0">
          {product.featured && <p className="text-xs uppercase tracking-widest text-gold mb-2">Signature Collection</p>}
          <h1 className="font-display text-3xl md:text-4xl mb-4">{product.name}</h1>
          
          {/* Rating */}
          {avgRating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={n <= Math.round(parseFloat(avgRating)) ? 'text-ink' : 'text-stone'}>★</span>
                ))}
              </div>
              <span className="text-xs text-ash">{avgRating} ({reviews.length} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-medium">{formatPrice(product.price, product.currency)}</span>
            {hasSale && <span className="text-lg text-ash line-through">{formatPrice(product.compare_at_price!, product.currency)}</span>}
          </div>

          <p className="text-ash leading-relaxed mb-8">{product.short_description}</p>

          {/* Color selector */}
          {colors.length > 0 && (
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest mb-3">Color: <span className="text-ash">{selectedColor || 'Select'}</span></p>
              <div className="flex gap-2">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-xs border transition-colors ${selectedColor === c ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink'}`}
                  >{c}</button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-widest">Size: <span className="text-ash">{selectedSize || 'Select'}</span></p>
                <button className="text-xs text-ash underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 text-sm border transition-colors ${selectedSize === s ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink'}`}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest mb-3">Quantity</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-stone hover:border-ink">−</button>
              <span className="text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border border-stone hover:border-ink">+</button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          {/* Stock */}
          <p className={`text-xs mb-6 ${inStock ? 'text-green-700' : 'text-red-600'}`}>
            {inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3 mb-8">
            <button onClick={handleAddToCart} disabled={!inStock} className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed">
              Add to Cart
            </button>
            <Link href="/checkout" onClick={handleAddToCart} className="btn-outline w-full text-center">
              Buy Now
            </Link>
            <button className="text-xs text-ash uppercase tracking-widest hover:text-ink transition-colors">
              ♡ Add to Wishlist
            </button>
          </div>

          {/* Shipping & Returns info */}
          <div className="border-t border-stone pt-6 space-y-2 text-xs text-ash">
            <p>✓ Free shipping on orders over $300</p>
            <p>✓ 30-day returns</p>
            <p>✓ Cash on Delivery available</p>
            <p>✓ Hand-finished premium materials</p>
          </div>

          {/* Tabs */}
          <div className="mt-12 border-t border-stone pt-8">
            <div className="flex gap-6 mb-6">
              {(['details', 'materials', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs uppercase tracking-widest pb-2 border-b-2 transition-colors ${activeTab === tab ? 'border-ink text-ink' : 'border-transparent text-ash'}`}
                >{tab}</button>
              ))}
            </div>

            {activeTab === 'details' && (
              <div className="text-sm text-ash leading-relaxed">
                <p>{product.description}</p>
                {product.care_instructions && (
                  <p className="mt-4"><strong className="text-ink">Care:</strong> {product.care_instructions}</p>
                )}
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="text-sm text-ash leading-relaxed">
                <p>{product.materials || 'Premium materials sourced from the finest tanneries.'}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-sm text-ash">No reviews yet. Be the first to review this product.</p>
                ) : (
                  reviews.map(r => (
                    <div key={r.id} className="border-b border-stone pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{[1,2,3,4,5].map(n => <span key={n} className={n <= r.rating ? 'text-ink' : 'text-stone'}>★</span>)}</div>
                        {r.verified && <span className="text-[10px] uppercase tracking-widest text-green-700">Verified</span>}
                      </div>
                      <p className="text-sm font-medium text-ink mb-1">{r.title}</p>
                      <p className="text-sm text-ash">{r.body}</p>
                      <p className="text-xs text-ash mt-2">— {r.customer_name}</p>
                    </div>
                  ))
                )}
                {/* Review form */}
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  await fetch('/api/reviews', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      product_id: product.id,
                      customer_name: (form.elements[0] as HTMLInputElement).value,
                      customer_email: (form.elements[1] as HTMLInputElement).value,
                      rating: (form.elements[2] as HTMLSelectElement).value,
                      title: (form.elements[3] as HTMLInputElement).value,
                      body: (form.elements[4] as HTMLTextAreaElement).value,
                    }),
                  });
                  form.reset();
                  alert('Thank you! Your review is pending approval.');
                }} className="border-t border-stone pt-4 space-y-3">
                  <p className="text-xs uppercase tracking-widest">Write a Review</p>
                  <input required placeholder="Your name" className="w-full border border-stone px-3 py-2 text-sm" />
                  <input required type="email" placeholder="Email" className="w-full border border-stone px-3 py-2 text-sm" />
                  <select required className="w-full border border-stone px-3 py-2 text-sm">
                    <option value="">Rating</option>
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★</option>
                    <option value="3">★★★</option>
                    <option value="2">★★</option>
                    <option value="1">★</option>
                  </select>
                  <input required placeholder="Review title" className="w-full border border-stone px-3 py-2 text-sm" />
                  <textarea required placeholder="Your review" rows={3} className="w-full border border-stone px-3 py-2 text-sm" />
                  <button type="submit" className="btn-outline text-xs">Submit Review</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="section-pad">
          <div className="container-lux">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} image={relatedImageMap[p.id] || p.thumbnail_url || ''} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
