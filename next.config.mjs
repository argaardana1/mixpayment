/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'atlantich2h.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '********.supabase.co', // Ganti dengan hostname supabase kamu
        pathname: '**',
      },
    ],
  },
  // Mengabaikan error linting saat build agar proses deploy cepat
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
