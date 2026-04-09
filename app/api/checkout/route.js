import { atlantic } from '@/lib/atlantic';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { user_id, amount, reff_id_client } = await req.json();

  // Markup Fee Acak (Naik dikit sesuai permintaan)
  const markup = Math.floor(Math.random() * (350 - 150 + 1)) + 150;
  const total_bayar = parseInt(amount) + markup;

  // 1. Tembak ke AtlanticH2H
  const resAtlantic = await atlantic.createQRIS(Date.now().toString(), amount);

  if (!resAtlantic.status) {
    return NextResponse.json({ message: 'Gagal ke provider' }, { status: 500 });
  }

  // 2. Simpan ke Database Supabase
  const { data, error } = await supabase.from('transactions').insert([{
    user_id,
    reff_id: reff_id_client,
    atlantic_id: resAtlantic.data.id,
    amount_raw: amount,
    fee_markup: markup,
    total_amount: total_bayar,
    qr_string: resAtlantic.data.qr_string,
    qr_image: resAtlantic.data.qr_image,
    status: 'pending'
  }]).select().single();

  return NextResponse.json({ checkout_url: `/pay/${data.id}` });
    }
