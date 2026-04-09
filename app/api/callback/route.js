export const dynamic = 'force-dynamic';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Perhatikan: Gunakan NEXT_PUBLIC_SUPABASE_URL supaya sinkron dengan .env kamu
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

// Inisialisasi di dalam export atau dengan pengecekan supaya build aman
const supabase = (supabaseUrl && supabaseServiceRole) 
  ? createClient(supabaseUrl, supabaseServiceRole) 
  : null;

export async function POST(req) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { status, data } = body;

    // 1. Cari transaksi berdasarkan ID Atlantic
    const { data: trx, error: fetchError } = await supabase
      .from('transactions')
      .select('*, profiles(webhook_url)')
      .eq('atlantic_id', data.id)
      .single();

    if (fetchError || !trx) {
      return NextResponse.json({ message: 'Transaction Not Found' }, { status: 404 });
    }

    // 2. Jika status pembayaran Sukses
    if (status === 'success') {
      // Update status di DB MixPay
      await supabase.from('transactions').update({ status: 'success' }).eq('id', trx.id);

      // Tambah saldo ke akun merchant MixPay
      // Gunakan field total_amount (sesuaikan dengan nama kolom di tabel kamu)
      await supabase.rpc('increment_balance', { 
        user_id: trx.user_id, 
        amount: trx.total_amount
      });

      // 3. Kirim Webhook ke website client (Forwarder)
      if (trx.profiles && trx.profiles.webhook_url) {
        try {
          await fetch(trx.profiles.webhook_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              event: 'PAYMENT_SUCCESS', 
              reff_id: trx.reff_id,
              amount: trx.total_amount 
            })
          });
        } catch (webhookErr) {
          console.error("Webhook Forwarding Failed", webhookErr);
        }
      }
    }

    return NextResponse.json({ status: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  }
              
