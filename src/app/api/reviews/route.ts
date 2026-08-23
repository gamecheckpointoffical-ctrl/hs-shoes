import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.product_id || !body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json({ error: 'Invalid review data' }, { status: 400 });
    }
    const supabase = createServerClient();
    const { data, error } = await supabase.from('hs_reviews').insert({
      product_id: body.product_id,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      rating: parseInt(body.rating),
      title: body.title,
      body: body.body,
      verified: false,
      approved: false,
    }).select('id').single();
    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id });
  } catch (err: any) {
    console.error('Review error:', err.message);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
