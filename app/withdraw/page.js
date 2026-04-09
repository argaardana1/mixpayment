"use client";
import { useState } from 'react';
import Swal from 'sweetalert2';
import { atlantic } from '@/lib/atlantic';

export default function Withdraw() {
  const [bank, setBank] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [accName, setAccName] = useState('');
  const [loading, setLoading] = useState(false);

  const checkRekening = async () => {
    setLoading(true);
    // Logic tembak API Atlantic cek_rekening
    const res = await fetch('/api/withdraw/check', { 
        method: 'POST', 
        body: JSON.stringify({ bank, accNumber }) 
    });
    const result = await res.json();
    
    if (result.status) {
      setAccName(result.data.nama_pemilik);
      Swal.fire({ title: 'Valid!', text: `Nama: ${result.data.nama_pemilik}`, icon: 'success' });
    } else {
      Swal.fire('Error', 'Rekening tidak ditemukan', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-black text-slate-800 mb-8">Withdrawal</h1>
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-50 space-y-6">
        <div>
          <label className="text-xs font-bold uppercase text-slate-400 ml-2">Pilih Bank/E-Wallet</label>
          <select onChange={(e) => setBank(e.target.value)} className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium">
            <option value="dana">DANA</option>
            <option value="gopay">GOPAY</option>
            <option value="bca">BCA</option>
          </select>
        </div>
        
        <div>
          <label className="text-xs font-bold uppercase text-slate-400 ml-2">Nomor Rekening</label>
          <div className="flex gap-2">
            <input type="text" value={accNumber} onChange={(e) => setAccNumber(e.target.value)} className="flex-1 mt-2 p-4 bg-slate-50 rounded-2xl border-none outline-none font-medium" placeholder="0812xxxx" />
            <button onClick={checkRekening} className="mt-2 px-6 bg-blue-600 text-white rounded-2xl font-bold text-sm">Cek</button>
          </div>
        </div>

        {accName && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <p className="text-xs text-emerald-600 font-bold uppercase">Nama Pemilik:</p>
            <p className="text-lg font-black text-emerald-700">{accName}</p>
          </motion.div>
        )}

        <button className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg shadow-2xl hover:bg-blue-600 transition-all">
          Tarik Saldo Sekarang
        </button>
      </div>
    </div>
  );
    }
    
