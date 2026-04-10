"use client";
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Globe, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />

      {/* Nav */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-5xl mx-auto">
        <div className="text-2xl font-black tracking-tighter italic">
          MIX<span className="text-blue-500">PAY.</span>
        </div>
        <Link href="/dashboard" className="bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-full border border-white/10 text-sm font-bold transition-all">
          Dashboard
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-8"
        >
          <Star size={14} className="text-blue-400" fill="currentColor" />
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Next Generation Gateway</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
        >
          BAYAR CEPAT.<br />GAK PAKE <span className="text-blue-500">RIBET.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 font-medium"
        >
          Integrasi QRIS dan Bank Transfer otomatis dengan settlement instan. 
          Dirancang untuk merchant yang menghargai kecepatan dan keamanan.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <Link href="/dashboard" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-3 group transition-all">
            MULAI SEKARANG <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left">
          {[
            { icon: Zap, title: "Instant Settled", desc: "Dana masuk ke saldo saat itu juga." },
            { icon: ShieldCheck, title: "Enterprise Security", desc: "Enkripsi tingkat tinggi untuk setiap TRX." },
            { icon: Globe, title: "Global Reach", desc: "Support semua E-Wallet & Bank Lokal." }
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/[0.08] transition-colors">
              <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                <f.icon size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
