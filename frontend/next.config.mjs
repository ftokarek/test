/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
  // When building for production, this creates a standalone folder that can be deployed without
  // the entire node_modules directory, making the final Docker image much smaller
  output: "standalone",
};

export default nextConfig;
