"use client";
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
      <div className="absolute top-0 w-full h-[300px] bg-emerald-500/10 blur-[100px]" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-sm relative z-10"
      >
        <div className="bg-emerald-500/20 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          >
            <CheckCircle2 size={48} className="text-emerald-500" />
          </motion.div>
        </div>
        
        <h1 className="text-3xl font-black text-white mb-3 tracking-tighter">PEMBAYARAN BERHASIL</h1>
        <p className="text-slate-400 font-medium mb-10 leading-relaxed">
          Transaksi Anda telah diverifikasi secara otomatis. Saldo merchant akan segera diperbarui.
        </p>
        
        <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all active:scale-95">
          <ArrowLeft size={18} /> KEMBALI KE DASHBOARD
        </Link>
      </motion.div>
    </div>
  );
                 }
          
