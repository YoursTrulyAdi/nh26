/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true, // Keep your experimental React Compiler on
  
  // You MUST have this part for Cloudinary to work:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;