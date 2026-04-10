import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata = {
  title: 'MixPay Premium Gateway',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#0F172A] selection:bg-blue-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
