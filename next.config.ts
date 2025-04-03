import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // turbo: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apex.artspace.support",
        pathname: "/uploads/**",
      },
    ],
    domains: ["apex.artspace.support"],
  },
};

export default withNextIntl(nextConfig);
