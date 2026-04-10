import { NextResponse } from 'next/server';
import { atlantic } from '@/lib/atlantic';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const { userId, reff_id, nominal, method, type } = await req.json();

    // 1. Buat Permintaan ke AtlanticH2H
    const resAtlantic = await atlantic.createDeposit({
      reff_id: reff_id,
      nominal: nominal,
      type: type, // ewallet, bank, atau va
      metode: method // qris, bca, dll
    });

    if (!resAtlantic.status) {
      return NextResponse.json({ error: resAtlantic.message }, { status: 400 });
    }

    // 2. Simpan Transaksi ke Database Supabase
    const { error: dbError } = await supabase.from('transactions').insert({
      user_id: userId,
      atlantic_id: resAtlantic.data.id,
      reff_id: reff_id,
      amount: nominal,
      total_amount: resAtlantic.data.nominal, // Nominal akhir dari Atlantic (termasuk kode unik jika bank)
      status: 'pending'
    });

    if (dbError) throw dbError;

    return NextResponse.json({ status: true, data: resAtlantic.data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
