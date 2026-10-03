import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "www.universterrassesbois.fr",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/contactez-nous",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/devis/contact",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
