/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['p21-ad-sg.ibyteimg.com', 'lh3.googleusercontent.com', 'res.cloudinary.com', 'cf.bstatic.com', 'res-console.cloudinary.com', 'console.cloudinary.com', 'img.vietqr.io'],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'], 
    });

    return config;
  },
};

export default nextConfig;
