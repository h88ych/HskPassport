/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
// หมายเหตุ: ถ้าไฟล์ของคุณเป็น .js ธรรมดา บรรทัดสุดท้ายอาจเป็น module.exports = nextConfig;
