import { Inter } from "next/font/google";
import "./globals.css";

// Menggunakan font Inter untuk kesan profesional dan bersih
const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'] 
});

export const metadata = {
  title: "MixPay - Premium Payment Gateway",
  description: "Solusi pembayaran QRIS dan Bank Transfer tercepat untuk merchant modern.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
