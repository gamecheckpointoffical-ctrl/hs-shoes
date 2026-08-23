import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    const supabase = createServerClient();
    const { error } = await supabase.from('hs_newsletter').insert({ email });
    if (error?.code === '23505') {
      return NextResponse.json({ success: true, message: 'Already subscribed' });
    }
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Newsletter error:', err.message);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
