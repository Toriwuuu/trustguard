import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 全站是純靜態 — 產生 out/ 供 Cloudflare Pages 部署
  output: "export",

  // 允許本機區網 IP 連 dev server 的 HMR resource
  // （Next.js 16 預設擋跨來源，手機測試時會被攔）
  allowedDevOrigins: ["192.168.60.113"],
};

export default nextConfig;
