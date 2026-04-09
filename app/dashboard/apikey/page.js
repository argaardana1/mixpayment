"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Copy, RefreshCcw, Code } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ApiKeyPage() {
  const [key, setKey] = useState('mch_live_xxxxxxxxxxxx');

  const handleRefresh = () => {
    Swal.fire({
      title: 'Regenerate Key?',
      text: "API Key lama tidak akan bisa digunakan lagi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Ganti',
      customClass: { popup: 'rounded-3xl' }
    }).then((res) => {
      if(res.isConfirmed) { /* Logic update key di Supabase */ }
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black text-slate-800 mb-8">API Documentation</h1>
      
      {/* API Key Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white mb-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Your Merchant Key</p>
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
            <code className="flex-1 font-mono text-blue-300">{key}</code>
            <button onClick={() => { navigator.clipboard.writeText(key); Swal.fire('Copied!', '', 'success'); }}>
              <Copy size={20} />
            </button>
            <button onClick={handleRefresh}><RefreshCcw size={20} /></button>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
      </div>

      {/* Docs Section */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <Code className="text-blue-600" />
          <h3 className="text-xl font-bold">Integrasi Endpoint</h3>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold text-slate-700 mb-2 underline">Create Transaction</p>
            <pre className="bg-slate-50 p-4 rounded-xl text-xs font-mono overflow-x-auto text-slate-600">
              POST https://mixpay.vercel.app/api/checkout {"\n"}
              Header: X-MixPay-Key: {key} {"\n"}
              Body: &#123; "amount": 10000, "reff_id": "INV-001" &#125;
            </pre>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700 mb-2 underline">Response Success</p>
            <pre className="bg-slate-50 p-4 rounded-xl text-xs font-mono text-blue-600">
              &#123; "status": true, "checkout_url": "https://mixpay.vercel.app/pay/ID_TRX" &#125;
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
        }
        
