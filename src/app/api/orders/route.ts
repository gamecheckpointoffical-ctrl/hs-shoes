import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { generateOrderNumber } from '@/lib/utils/format';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = createServerClient();
    const orderNumber = generateOrderNumber();

    const { data, error } = await supabase.from('hs_orders').insert({
      order_number: orderNumber,
      customer_email: body.customer_email,
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      shipping_address: body.shipping_address,
      billing_address: body.billing_address,
      items: body.items,
      subtotal: body.subtotal,
      shipping_cost: body.shipping_cost,
      tax: body.tax,
      total: body.total,
      status: 'pending',
      payment_status: body.payment_provider === 'cash_on_delivery' ? 'pending_cod' : 'pending',
      payment_provider: body.payment_provider,
    }).select('order_number').single();

    if (error) throw error;
    return NextResponse.json({ order_number: data.order_number, success: true });
  } catch (err: any) {
    console.error('Order creation error:', err.message);
    return NextResponse.json({ error: 'Failed to create order', details: err.message }, { status: 500 });
  }
}
