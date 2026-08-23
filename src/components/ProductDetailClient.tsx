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
  product: Product; images: ProductImage[]; variants: ProductVariant[];
  reviews: Review[]; relatedProducts: Product[]; relatedImageMap: Record<string, string>;
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
  const sizes = Array.from(new Set(variants.map(v => v.size).filter(Boolean))) as string[];
  const colors = Array.from(new Set(variants.map(v => v.color).filter(Boolean))) as string[];
  const selectedVariant = variants.find(v => v.size === selectedSize && v.color === selectedColor);
  const inStock = selectedVariant ? selectedVariant.stock > 0 : variants.some(v => v.stock > 0);
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  const handleAddToCart = () => {
    setError('');
    if (sizes.length > 0 && !selectedSize) { setError('Please select a size'); return; }
    if (colors.length > 0 && !selectedColor) { setError('Please select a color'); return; }
    const mainImage = images.find(i => i.image_type === 'main') || images[0];
    addItem({
      product_id: product.id, name: product.name, slug: product.slug, price: product.price,
      image: mainImage?.url || product.thumbnail_url || '',
      size: selectedSize || 'Default', color: selectedColor || 'Default', quantity,
      variant_id: selectedVariant?.id || '',
    });
  };

  return (
    <div className="pt-20">
      <div className="container-lux py-6">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-ash">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span className="text-stone">/</span>
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <span className="text-stone">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="container-lux grid md:grid-cols-2 gap-8 md:gap-20 pb-32">
        <div className="md:sticky md:top-24 md:self-start">
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

          <div className="flex gap-3 mt-5">
            <button onClick={() => setShowViewer(false)} className={`text-[10px] uppercase tracking-[0.15em] px-5 py-3 border transition-all duration-300 ${!showViewer ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink text-ash'}`}>
              Gallery
            </button>
            <button onClick={() => setShowViewer(true)} className={`text-[10px] uppercase tracking-[0.15em] px-5 py-3 border transition-all duration-300 ${showViewer ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink text-ash'}`}>
              Interactive 3D View
            </button>
          </div>

          {!showViewer && (
            <div className="flex gap-2 mt-5 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button key={img.id} onClick={() => setGalleryIndex(idx)} className={`w-16 h-20 flex-shrink-0 border overflow-hidden transition-all ${idx === galleryIndex ? 'border-ink' : 'border-stone hover:border-ash'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt_text || ''} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:pt-4">
          {product.featured && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4 font-light">Signature Collection</p>
          )}
          <h1 className="font-display text-3xl md:text-[40px] mb-5" style={{ lineHeight: 1.15 }}>{product.name}</h1>

          {avgRating && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-sm">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={n <= Math.round(parseFloat(avgRating)) ? 'text-ink' : 'text-stone'}>★</span>
                ))}
              </div>
              <span className="text-[11px] text-ash uppercase tracking-wide">{avgRating} · {reviews.length} reviews</span>
            </div>
          )}

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-2xl font-medium">{formatPrice(product.price, product.currency)}</span>
            {hasSale && <span className="text-base text-ash line-through">{formatPrice(product.compare_at_price!, product.currency)}</span>}
          </div>

          <p className="text-ash leading-relaxed mb-10 text-[15px] font-light">{product.short_description}</p>

          <div className="w-full h-px bg-stone mb-10" />

          {colors.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-4">Color: <span className="text-ash normal-case tracking-normal">{selectedColor || 'Select'}</span></p>
              <div className="flex gap-2">
                {colors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)} className={`px-5 py-3 text-[11px] tracking-wide border transition-all duration-300 ${selectedColor === c ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink text-ash hover:text-ink'}`}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] uppercase tracking-[0.2em]">Size: <span className="text-ash normal-case tracking-normal">{selectedSize || 'Select'}</span></p>
                <button className="text-[10px] uppercase tracking-[0.15em] text-ash underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} className={`w-12 h-12 text-sm border transition-all duration-300 ${selectedSize === s ? 'border-ink bg-ink text-cream' : 'border-stone hover:border-ink text-ash hover:text-ink'}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] mb-4">Quantity</p>
            <div className="flex items-center gap-5">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-stone hover:border-ink text-ash hover:text-ink transition-all">−</button>
              <span className="text-sm min-w-[24px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border border-stone hover:border-ink text-ash hover:text-ink transition-all">+</button>
            </div>
          </div>

          {error && <p className="text-xs text-red-600 mb-5">{error}</p>}
          <p className={`text-[11px] uppercase tracking-wide mb-8 ${inStock ? 'text-green-700' : 'text-red-600'}`}>
            {inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </p>

          <div className="flex flex-col gap-3 mb-10">
            <button onClick={handleAddToCart} disabled={!inStock} className="btn-primary w-full disabled:opacity-30 disabled:cursor-not-allowed"><span>Add to Cart</span></button>
            <Link href="/checkout" onClick={handleAddToCart} className="btn-outline w-full text-center">Buy Now</Link>
            <button className="text-[10px] text-ash uppercase tracking-[0.15em] hover:text-ink transition-colors mt-2 self-start">♡ Add to Wishlist</button>
          </div>

          <div className="border-t border-stone pt-8 space-y-3">
            <div className="flex items-center gap-3 text-[11px] text-ash">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 13l4 4L19 7" /></svg>
              <span>Free shipping on orders over PKR 15,000</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-ash">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 13l4 4L19 7" /></svg>
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-ash">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 13l4 4L19 7" /></svg>
              <span>Cash on Delivery available across Pakistan</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-ash">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 13l4 4L19 7" /></svg>
              <span>Hand-finished premium materials</span>
            </div>
          </div>

          <div className="mt-16 border-t border-stone pt-10">
            <div className="flex gap-10 mb-8">
              {(['details', 'materials', 'reviews'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`text-[10px] uppercase tracking-[0.2em] pb-2 border-b transition-all duration-300 ${activeTab === tab ? 'border-ink text-ink' : 'border-transparent text-ash hover:text-ink'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'details' && (
              <div className="text-sm text-ash leading-relaxed font-light text-[14px]">
                <p>{product.description}</p>
                {product.care_instructions && <p className="mt-5"><span className="text-ink font-medium">Care:</span> {product.care_instructions}</p>}
              </div>
            )}
            {activeTab === 'materials' && (
              <div className="text-sm text-ash leading-relaxed font-light text-[14px]">
                <p>{product.materials || 'Premium materials sourced from the finest tanneries. Each component is carefully selected for durability, comfort, and aesthetic excellence.'}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-sm text-ash font-light">No reviews yet. Be the first to review this product.</p>
                ) : (
                  reviews.map(r => (
                    <div key={r.id} className="border-b border-stone pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex text-sm">{[1,2,3,4,5].map(n => <span key={n} className={n <= r.rating ? 'text-ink' : 'text-stone'}>★</span>)}</div>
                        {r.verified && <span className="text-[9px] uppercase tracking-[0.15em] text-green-700">Verified Purchase</span>}
                      </div>
                      <p className="text-sm font-medium text-ink mb-2">{r.title}</p>
                      <p className="text-sm text-ash font-light leading-relaxed">{r.body}</p>
                      <p className="text-[10px] text-ash mt-3 uppercase tracking-wide">— {r.customer_name}</p>
                    </div>
                  ))
                )}
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    product_id: product.id,
                    customer_name: (form.elements[0] as HTMLInputElement).value,
                    customer_email: (form.elements[1] as HTMLInputElement).value,
                    rating: (form.elements[2] as HTMLSelectElement).value,
                    title: (form.elements[3] as HTMLInputElement).value,
                    body: (form.elements[4] as HTMLTextAreaElement).value,
                  }) });
                  form.reset();
                  alert('Thank you! Your review is pending approval.');
                }} className="border-t border-stone pt-8 space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-4">Write a Review</p>
                  <input required placeholder="Your name" className="w-full border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
                  <input required type="email" placeholder="Email" className="w-full border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
                  <select required className="w-full border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink">
                    <option value="">Rating</option>
                    <option value="5">★★★★★</option><option value="4">★★★★</option>
                    <option value="3">★★★</option><option value="2">★★</option><option value="1">★</option>
                  </select>
                  <input required placeholder="Review title" className="w-full border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
                  <textarea required placeholder="Your review" rows={3} className="w-full border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
                  <button type="submit" className="btn-outline text-[10px]">Submit Review</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="section-pad border-t border-stone">
          <div className="container-lux">
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-4 font-light">Continue Exploring</p>
              <h2 className="font-display text-3xl md:text-[40px]">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
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
