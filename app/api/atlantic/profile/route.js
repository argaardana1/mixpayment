import { NextResponse } from 'next/server';
import { atlantic } from '@/lib/atlantic';

export async function GET() {
  try {
    const res = await atlantic.getProfile();
    
    if (res.status) {
      return NextResponse.json({ 
        balance: res.data.balance,
        name: res.data.name,
        username: res.data.username 
      });
    }
    
    return NextResponse.json({ error: 'Gagal mengambil profil' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
