import { createServerClient } from '@/lib/supabase/server';
import type { Product, ProductImage, Category } from '@/lib/types';
export const dynamic = 'force-dynamic';
import ProductCard from '@/components/ProductCard';
import ShopClient from '@/components/ShopClient';

export default async function ShopPage({ searchParams }: { searchParams: { filter?: string; category?: string; sort?: string } }) {
  const supabase = createServerClient();

  let query = supabase.from('hs_products').select('*').eq('status', 'active');

  if (searchParams.filter === 'new') {
    query = query.eq('new_arrival', true);
  } else if (searchParams.filter === 'bestseller') {
    query = query.eq('bestseller', true);
  } else if (searchParams.filter === 'featured') {
    query = query.eq('featured', true);
  }

  if (searchParams.category) {
    const { data: cat } = await supabase
      .from('hs_categories')
      .select('id')
      .eq('slug', searchParams.category)
      .single();
    if (cat) query = query.eq('category_id', cat.id);
  }

  if (searchParams.sort === 'price-low') {
    query = query.order('price', { ascending: true });
  } else if (searchParams.sort === 'price-high') {
    query = query.order('price', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data: products } = await query;

  // Fetch categories for filter
  const { data: categories } = await supabase.from('hs_categories').select('*');

  // Fetch images
  const productIds = (products || []).map((p: Product) => p.id);
  const { data: images } = await supabase
    .from('hs_product_images')
    .select('*')
    .in('product_id', productIds)
    .order('sort_order');

  const imageMap: Record<string, string> = {};
  (images || []).forEach((img: ProductImage) => {
    if (!imageMap[img.product_id]) imageMap[img.product_id] = img.url;
  });

  const title = searchParams.filter === 'new' ? 'New Arrivals'
    : searchParams.filter === 'bestseller' ? 'Bestsellers'
    : searchParams.filter === 'featured' ? 'Featured'
    : searchParams.category ? `Shop ${searchParams.category}`
    : 'Shop All';

  return (
    <div className="pt-20">
      <ShopClient
        products={products as Product[] || []}
        categories={categories as Category[] || []}
        imageMap={imageMap}
        title={title}
        currentFilter={searchParams.filter || ''}
        currentCategory={searchParams.category || ''}
      />
    </div>
  );
}
