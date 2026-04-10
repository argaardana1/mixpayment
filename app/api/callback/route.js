export const dynamic = 'force-dynamic';
import { supabase } from '@/lib/supabase';
import { atlantic } from '@/lib/atlantic';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { event, status, data } = body;

    // Menangani Callback Deposit Atlantic
    if (event === 'deposit' && (status === 'processing' || status === 'success')) {
      const { data: trx } = await supabase
        .from('transactions')
        .select('*, profiles(webhook_url)')
        .eq('atlantic_id', data.id)
        .single();

      if (!trx || trx.status === 'success') return NextResponse.json({ status: 'ignored' });

      // TRIGGER INSTANT SETTLEMENT (Langsung cair ke saldo Atlantic)
      const settle = await atlantic.instantSettlement(data.id);
      
      if (settle.status || status === 'success') {
        // Update DB MixPay
        await supabase.from('transactions').update({ status: 'success' }).eq('id', trx.id);
        
        // Tambah Saldo Merchant di Supabase
        await supabase.rpc('increment_balance', { 
          user_id: trx.user_id, 
          amount: trx.total_amount 
        });

        // Forward Webhook ke Merchant (Realtime)
        if (trx.profiles?.webhook_url) {
          await fetch(trx.profiles.webhook_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              event: 'PAYMENT_SUCCESS', 
              reff_id: trx.reff_id, 
              amount: trx.total_amount 
            })
          });
        }
      }
    }
    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
