import { createServerClient } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
import type { Product, ProductImage, ProductVariant, Review } from '@/lib/types';
import ProductDetailClient from '@/components/ProductDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: product } = await supabase.from('hs_products').select('*').eq('slug', params.slug).single();
  if (!product) return { title: 'Product Not Found — HS Shoes' };
  return {
    title: product.seo_title || `${product.name} — HS Shoes`,
    description: product.seo_description || product.short_description || '',
    openGraph: {
      title: product.seo_title || product.name,
      description: product.seo_description || '',
      images: product.thumbnail_url ? [{ url: product.thumbnail_url }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient();
  const { data: product } = await supabase.from('hs_products').select('*').eq('slug', params.slug).single();
  if (!product) notFound();

  const { data: images } = await supabase.from('hs_product_images').select('*').eq('product_id', product.id).order('sort_order');
  const { data: variants } = await supabase.from('hs_product_variants').select('*').eq('product_id', product.id);
  const { data: reviews } = await supabase.from('hs_reviews').select('*').eq('product_id', product.id).eq('approved', true).order('created_at', { ascending: false });

  const { data: related } = await supabase.from('hs_products').select('*').neq('id', product.id).eq('status', 'active').limit(4);
  const relatedIds = (related || []).map((p: Product) => p.id);
  const { data: relatedImages } = await supabase.from('hs_product_images').select('*').in('product_id', relatedIds).order('sort_order');
  const relatedImageMap: Record<string, string> = {};
  (relatedImages || []).forEach((img: ProductImage) => { if (!relatedImageMap[img.product_id]) relatedImageMap[img.product_id] = img.url; });

  return (
    <ProductDetailClient
      product={product as Product}
      images={(images || []) as ProductImage[]}
      variants={(variants || []) as ProductVariant[]}
      reviews={(reviews || []) as Review[]}
      relatedProducts={(related || []) as Product[]}
      relatedImageMap={relatedImageMap}
    />
  );
}
