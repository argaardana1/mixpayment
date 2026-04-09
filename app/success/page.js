"use client";
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_20px_40px_rgba(16,185,129,0.3)]"
      >
        <Check size={48} strokeWidth={4} />
      </motion.div>
      <h1 className="text-3xl font-black text-slate-800 tracking-tight">Pembayaran Lunas</h1>
      <p className="text-slate-400 mt-2 font-medium">Terima kasih, transaksi Anda telah berhasil diproses oleh MixPay.</p>
    </div>
  );
}
