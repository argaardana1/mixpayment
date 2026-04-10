"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/dashboard');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xs"
      >
        <div className="bg-red-500/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-red-500/20">
          <ShieldAlert size={40} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Akses Ditolak</h1>
        <p className="text-slate-500 text-sm font-medium mb-8">Halaman tidak ditemukan. Mengalihkan Anda kembali ke zona aman...</p>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: '100%' }} 
            transition={{ duration: 3 }}
            className="bg-blue-600 h-full"
          />
        </div>
      </motion.div>
    </div>
  );
                 }
