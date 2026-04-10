"use client";
import { useEffect, useState } from 'react';
import { Wallet, Zap, History, ArrowUpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBalance() {
      const res = await fetch('/api/atlantic/profile');
      const data = await res.json();
      setBalance(data.balance || 0);
      setLoading(false);
    }
    getBalance();
  }, []);

  return (
    <div className="min-h-screen p-5 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">Mix<span className="text-blue-500">Pay.</span></h1>
        <div className="bg-slate-800 p-3 rounded-2xl"><Zap size={20} className="text-yellow-400" fill="currentColor" /></div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="bg-blue-600 p-8 rounded-[3rem] shadow-2xl shadow-blue-500/40 mb-10 relative overflow-hidden"
      >
        <p className="text-blue-100 text-sm font-bold opacity-80 mb-2 uppercase tracking-widest">Saldo Atlantic</p>
        <h2 className="text-4xl font-black">
          {loading ? "••••••" : `Rp ${Number(balance).toLocaleString('id-ID')}`}
        </h2>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <button className="premium-card p-6 flex flex-col items-center gap-2">
          <ArrowUpCircle className="text-blue-400" size={32} />
          <span className="text-xs font-bold uppercase text-slate-400">Withdraw</span>
        </button>
        <button className="premium-card p-6 flex flex-col items-center gap-2">
          <History className="text-slate-400" size={32} />
          <span className="text-xs font-bold uppercase text-slate-400">Riwayat</span>
        </button>
      </div>

      <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em] mb-4">Transaksi Terakhir</h3>
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="premium-card p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-slate-800 h-12 w-12 rounded-2xl flex items-center justify-center"><Wallet size={20} /></div>
              <div>
                <p className="font-bold text-sm">QRIS Payment</p>
                <p className="text-[10px] text-slate-500">Sukses • 12:45 WIB</p>
              </div>
            </div>
            <p className="font-black text-emerald-400">+10.000</p>
          </div>
        ))}
      </div>
    </div>
  );
                 }
          
