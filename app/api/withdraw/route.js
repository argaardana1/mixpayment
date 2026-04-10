import { NextResponse } from 'next/server';
import { atlantic } from '@/lib/atlantic';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const { userId, bankCode, accountNum, amount, name } = await req.json();

    // 1. Cek Saldo Merchant di DB MixPay
    const { data: profile } = await supabase.from('profiles').select('balance').eq('id', userId).single();
    
    if (profile.balance < amount) {
      return NextResponse.json({ status: false, message: 'Saldo tidak cukup' }, { status: 400 });
    }

    // 2. Eksekusi Transfer di Atlantic
    const res = await atlantic.createTransfer({
      ref_id: `WD-${Date.now()}`,
      kode_bank: bankCode,
      nomor_akun: accountNum,
      nama_pemilik: name,
      nominal: amount
    });

    if (res.status) {
      // 3. Potong Saldo di DB
      await supabase.rpc('increment_balance', { user_id: userId, amount: -amount });
      return NextResponse.json({ status: true, data: res.data });
    }

    return NextResponse.json({ status: false, message: res.message }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
