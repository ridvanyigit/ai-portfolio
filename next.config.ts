import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // ✅ statik export değil, Node server function çalıştır
};

export default nextConfig;
