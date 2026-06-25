import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;
    
    if (!kvUrl || !kvToken) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const res = await fetch(`${kvUrl}/lrange/guestbook_entries/0/50`, {
      headers: { Authorization: `Bearer ${kvToken}` },
      cache: 'no-store'
    });
    const data = await res.json();
    
    const entries = (data.result || []).map(str => {
      try { 
        let parsed = JSON.parse(str);
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        return parsed;
      } catch { 
        return null; 
      }
    }).filter(Boolean);

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching guestbook:", error);
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }
    
    if (name.length > 50 || message.length > 500) {
      return NextResponse.json({ error: 'Message or name too long' }, { status: 400 });
    }

    const newEntry = {
      _id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    const res = await fetch(`${kvUrl}/lpush/guestbook_entries`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JSON.stringify(newEntry))
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return NextResponse.json({ error: error.message || 'Failed to post message' }, { status: 500 });
  }
}
