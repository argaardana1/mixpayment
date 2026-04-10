"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShieldCheck, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function PaymentPage({ params }) {
  const [status, setStatus] = useState('pending');

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 flex flex-col items-center">
      {/* Glow effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/20 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header Invoice */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-black italic tracking-tighter">MIX<span className="text-blue-500">PAY.</span></div>
          <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Menunggu Pembayaran</span>
          </div>
        </div>

        {/* Premium Payment Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/10 mb-6"
        >
          <div className="bg-slate-50 p-8 border-b border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Total Tagihan</p>
            <h1 className="text-4xl font-black text-slate-900 italic">Rp 50.000</h1>
          </div>

          <div className="p-10 flex flex-col items-center">
            {/* QRIS Container */}
            <div className="relative p-3 bg-white border-8 border-slate-50 rounded-[2.5rem] mb-8 group transition-transform hover:scale-105">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MIX-PAY-EXAMPLE" 
                alt="QRIS" 
                className="w-60 h-60 rounded-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/80 transition-opacity rounded-[1.8rem]">
                 <p className="text-slate-900 font-black text-sm">SCAN ME</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-600 p-4 rounded-2xl w-full text-white shadow-lg shadow-blue-600/30">
              <QrCode size={24} />
              <div className="text-left">
                <p className="text-[10px] font-bold opacity-70 leading-none mb-1">METODE PEMBAYARAN</p>
                <p className="text-sm font-black italic tracking-wider">QRIS ALL PAYMENT</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 flex justify-around">
             <div className="text-center"><p className="text-[8px] text-slate-500 font-bold uppercase">Keamanan</p><ShieldCheck size={18} className="mx-auto text-blue-500 mt-1" /></div>
             <div className="text-center"><p className="text-[8px] text-slate-500 font-bold uppercase">Settlement</p><Clock size={18} className="mx-auto text-blue-500 mt-1" /></div>
             <div className="text-center"><p className="text-[8px] text-slate-500 font-bold uppercase">Verifikasi</p><CheckCircle2 size={18} className="mx-auto text-blue-500 mt-1" /></div>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/20 p-3 rounded-xl"><Clock size={20} className="text-blue-500" /></div>
            <div>
              <p className="text-xs font-bold text-white">Batas Waktu</p>
              <p className="text-[10px] text-slate-500 font-medium">Berakhir dalam 15:00 menit</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-slate-700 group-hover:text-blue-500 transition-all" />
        </div>
      </div>
    </div>
  );
          }
                  
