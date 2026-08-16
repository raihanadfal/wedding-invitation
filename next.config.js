/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Disable Image Optimization untuk static export
  images: {
    unoptimized: true,
  },
  // Trailing slash untuk compatibility
  trailingSlash: true,
  // Skip validation untuk dynamic routes di static export
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  // Suppress hydration errors
  reactStrictMode: false,
};

module.exports = nextConfig;
