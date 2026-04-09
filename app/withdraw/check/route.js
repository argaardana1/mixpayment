import { atlantic } from '@/lib/atlantic';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { bank, accNumber } = await req.json();
    const result = await atlantic.cekRekening(bank, accNumber);

    if (result.status && result.data.status === 'valid') {
      return NextResponse.json({ status: true, data: result.data });
    }
    return NextResponse.json({ status: false, message: 'Rekening tidak valid' });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message });
  }
}
