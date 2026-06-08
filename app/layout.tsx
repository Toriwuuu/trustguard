import type { Metadata } from "next";
import { Geist, Noto_Sans_TC, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const notoTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trustguard.design"),
  title: "TrustGuard — AI 代理人的透明化駕駛艙",
  description: "為 AI 投資代理人設計的信任 UX 探索專案",
  openGraph: {
    title: "TrustGuard — A UX case study",
    description: "Designing trust for AI agents that act on your behalf.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustGuard — A UX case study",
    description: "Designing trust for AI agents that act on your behalf.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geist.variable} ${notoTC.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative isolate">
        {/* 鍵盤使用者的跳過導航：只有 Tab 聚焦時才現身 */}
        <a href="#main-content" className="skip-to-content">
          跳至主要內容
        </a>
        {/* 全站底紋：細點陣 + 上方 radial mask */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 10%, black 30%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 10%, black 30%, transparent 85%)",
          }}
        />
        {/* Grain noise：讓畫面有紙質觸感 */}
        <div aria-hidden="true" className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
