import { createServerClient } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();
  const { data: products } = await supabase.from('hs_products').select('slug,updated_at').eq('status', 'active');
  const base = 'https://hs-shoes.vercel.app';
  const staticPages = ['', '/shop', '/about', '/contact', '/shipping', '/returns', '/privacy', '/terms'].map(p => ({
    url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.8,
  }));
  const productPages = (products || []).map((p: any) => ({
    url: `${base}/shop/${p.slug}`, lastModified: new Date(p.updated_at), changeFrequency: 'monthly' as const, priority: 0.6,
  }));
  return [...staticPages, ...productPages];
}
