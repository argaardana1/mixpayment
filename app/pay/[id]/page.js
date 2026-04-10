"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, CreditCard, Info, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage({ params }) {
  const [data, setData] = useState(null);

  return (
    <div className="min-h-screen bg-[#020617] p-4 flex items-center justify-center">
      <div className="w-full max-w-[450px]">
        {/* Header Invoice */}
        <div className="bg-slate-900 border border-slate-800 rounded-t-[2.5rem] p-8 text-center border-b-0">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Pembayaran</p>
          <h1 className="text-4xl font-black text-white italic">Rp 50.000</h1>
        </div>

        {/* QR Section */}
        <div className="bg-white rounded-b-[2.5rem] p-10 flex flex-col items-center">
          <div className="relative p-4 bg-slate-50 rounded-[2rem] border-4 border-slate-100 mb-6">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ContohQRIS" alt="QRIS" className="w-64 h-64" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
               <QrCode size={100} />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-full font-bold text-sm mb-8">
            <Info size={18} />
            Scan QRIS dengan Aplikasi Apapun
          </div>

          {/* Payment Steps */}
          <div className="w-full space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
              <p className="text-sm text-slate-600 font-medium">Buka aplikasi E-Wallet (DANA, OVO, GoPay) atau Mobile Banking.</p>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
              <p className="text-sm text-slate-600 font-medium">Scan QR Code di atas dan masukkan PIN Anda.</p>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-xs font-bold uppercase tracking-tighter">
          Powered by <span className="text-blue-500">MixPay Gateway</span>
        </p>
      </div>
    </div>
  );
    }
                             
