import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    if (!q) return NextResponse.json({ products: [] });
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('hs_products')
      .select('id,name,slug,thumbnail_url,price,currency')
      .eq('status', 'active')
      .ilike('name', `%${q}%`)
      .limit(10);
    if (error) throw error;
    return NextResponse.json({ products: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
