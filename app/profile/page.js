import { NextResponse } from 'next/server';

export async function GET() {
  const payload = {
    key: process.env.ATLANTIC_API_KEY,
    action: 'profile'
  };

  try {
    const res = await fetch('https://atlantich2h.com/api/v1', {
      method: 'POST',
      body: new URLSearchParams(payload)
    });
    const result = await res.json();
    
    // Sesuaikan dengan struktur respon Atlantic (biasanya data.balance)
    return NextResponse.json({ balance: result.data.balance || 0 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to connect Atlantic' }, { status: 500 });
  }
}
