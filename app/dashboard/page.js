"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, CheckCircle, XCircle, LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Desktop Only */}
      <aside className="w-64 bg-white border-r border-slate-100 p-6 hidden md:block">
        <h1 className="text-2xl font-black text-blue-600 mb-10">MixPay</h1>
        <nav className="space-y-4">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          {/* Menu lainnya... */}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Overview</h2>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
        </header>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Saldo" val="Rp 2.500.000" icon={<Wallet className="text-blue-500" />} color="bg-blue-500" />
          <StatCard title="Total Transaksi" val="142" icon={<ArrowUpRight className="text-indigo-500" />} color="bg-indigo-500" />
          <StatCard title="Berhasil" val="130" icon={<CheckCircle className="text-emerald-500" />} color="bg-emerald-500" />
          <StatCard title="Gagal" val="12" icon={<XCircle className="text-rose-500" />} color="bg-rose-500" />
        </div>

        {/* Transaksi Terbaru */}
        <div className="mt-12 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold mb-6 text-slate-800">Transaksi Terbaru</h3>
           <div className="space-y-4">
              {/* Contoh Row */}
              <div className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl transition-all">
                 <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">QR</div>
                    <div>
                       <p className="font-bold text-slate-700">#MXP-992812</p>
                       <p className="text-xs text-slate-400">12 Okt 2026, 14:20</p>
                    </div>
                 </div>
                 <p className="font-black text-slate-800">Rp 50.350</p>
                 <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">Berhasil</span>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, val, icon, color }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
      <div className="flex justify-between mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
      </div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-black text-slate-800 mt-1 tracking-tight">{val}</h3>
    </motion.div>
  );
          }
          
