import { NextResponse } from 'next/server';
import { atlantic } from '@/lib/atlantic';
import { supabase } from '@/lib/supabase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // ID dari Atlantic

  if (!id) return NextResponse.json({ error: 'ID Required' }, { status: 400 });

  try {
    const result = await atlantic.checkStatus(id);
    
    // Jika status di Atlantic sudah success, pastikan di DB kita juga success
    if (result.status && result.data.status === 'success') {
      await supabase.from('transactions').update({ status: 'success' }).eq('atlantic_id', id);
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
      }
