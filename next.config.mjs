/** @type {import('next').NextConfig} */
// Vercel menyajikan dari root domain; GitHub Pages dari sub-path repo.
const isVercel = !!process.env.VERCEL;
const basePath = isVercel ? '' : '/website-kita-punya-project';

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
