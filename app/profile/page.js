"use client";
import { useState } from 'react';
import { Shield, Globe, Save } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-black text-slate-400">
          MP
        </div>
        <h2 className="text-2xl font-bold">MixPay Merchant</h2>
      </div>

      <div className="space-y-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase ml-2">Server IP (Whitelist ini di Atlantic)</label>
          <div className="mt-2 p-4 bg-blue-50 text-blue-700 rounded-2xl font-mono font-bold flex justify-between">
            <span>103.123.45.67</span> {/* IP Vercel Kamu */}
            <Shield size={18} />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase ml-2">Webhook Notification URL</label>
          <input type="text" placeholder="https://web-kamu.com/api/callback" className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
        </div>

        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
          <Save size={20} /> Simpan Perubahan
        </button>
      </div>
    </div>
  );
    }
