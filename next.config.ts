import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "api.dicebear.com",
      "res.cloudinary.com",
      "ik.imagekit.io",
      "placehold.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com", // ✅ Add pattern
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Add pattern
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true, // ✅ Needed for SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // ✅ (Optional but recommended)
  },
};

export default nextConfig;
