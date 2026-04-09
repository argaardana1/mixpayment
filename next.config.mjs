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
        hostname: 'bzyuoiibybmujvpnvlsa.supabase.co', // <-- SUDAH SAYA PERBAIKI
        pathname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
