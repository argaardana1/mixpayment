"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

export default function CheckoutPage({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Real-time listener: Cek perubahan status di Supabase
    const sub = supabase.channel('realtime_pay')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'transactions', filter: `id=eq.${params.id}` }, 
      (payload) => {
        if (payload.new.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Pembayaran Berhasil',
            showConfirmButton: false,
            timer: 2000
          }).then(() => window.location.href = '/success');
        }
      }).subscribe();

    return () => supabase.removeChannel(sub);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-blue-600 font-black text-2xl tracking-tighter">MixPay</h1>
          <div className="mt-4 bg-blue-50 py-2 rounded-full inline-block px-6">
            <p className="text-blue-600 font-bold text-sm">Menunggu Pembayaran</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border-2 border-dashed border-slate-200 text-center">
          <p className="text-xs text-slate-400 font-bold uppercase mb-4 tracking-widest">Scan QRIS</p>
          <img src={data?.qr_image || '/api/placeholder/300/300'} className="w-64 h-64 mx-auto rounded-xl shadow-lg" />
          <h3 className="mt-6 text-2xl font-black text-slate-800 tracking-tight">Rp {data?.amount?.toLocaleString()}</h3>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Order ID</span>
            <span className="font-bold text-slate-700">#MXP-{params.id.slice(0,8)}</span>
          </div>
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl">
            Cek Status Manual
          </button>
        </div>
      </div>
    </div>
  );
    }
    
