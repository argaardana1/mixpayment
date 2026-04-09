import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

export async function POST(req) {
  const body = await req.json();
  const { event, status, data } = body;

  try {
    // 1. Cari transaksi berdasarkan ID Atlantic
    const { data: trx } = await supabase
      .from('transactions')
      .select('*, profiles(webhook_url)')
      .eq('atlantic_id', data.id)
      .single();

    if (!trx) return NextResponse.json({ message: 'Not Found' }, { status: 404 });

    // 2. Logic Status: Jika success atau processing (untuk QRIS biasanya processing dulu)
    if (status === 'success' || status === 'processing') {
      // Update status di DB MixPay
      await supabase.from('transactions').update({ status: 'success' }).eq('id', trx.id);

      // Tambah saldo ke akun merchant MixPay
      // Markup Anda otomatis sudah tersimpan karena total_pay > nominal_raw
      await supabase.rpc('increment_balance', { 
        user_id: trx.user_id, 
        amount: trx.total_pay - 100 // Contoh potong biaya sistem dikit
      });

      // 3. Kirim Webhook ke website client yang masang MixPay
      if (trx.profiles.webhook_url) {
        await fetch(trx.profiles.webhook_url, {
          method: 'POST',
          body: JSON.stringify({ event: 'PAYMENT_SUCCESS', reff_id: trx.reff_id })
        });
      }
    }

    return NextResponse.json({ status: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  }
