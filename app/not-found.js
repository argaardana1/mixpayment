"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/'); // Paksa kembali ke halaman utama jika URL ngawur
  }, [router]);
  return null;
}
