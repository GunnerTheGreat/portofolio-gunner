import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'Unknown IP';
    
    await kv.sadd('unique_visitors', ip);
    
    const uniqueViews = await kv.scard('unique_visitors');
    
    return NextResponse.json({ views: uniqueViews });
  } catch (error) {
    console.error('Failed to increment views. Vercel KV might not be configured:', error.message);
    return NextResponse.json({ views: null });
  }
}

export async function GET() {
  try {
    const views = await kv.scard('unique_visitors');
    return NextResponse.json({ views: views || 0 });
  } catch (error) {
    return NextResponse.json({ views: null });
  }
}
