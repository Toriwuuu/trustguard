"use client";

/* ============================================
   TrustGuard · DashboardTopBar
   -------------------------------------------
   Dashboard 專用頂部列 = 共用 SiteTopBar + 場景切換列。
   場景 pill 獨立放第二列，桌機／手機都以相同結構呈現，避免 RWD 錯位。
   ============================================ */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteTopBar } from "./SiteTopBar";

const scenarios = [
  { href: "/dashboard",                 label: "A · 日常",    tone: "neutral" as const },
  { href: "/dashboard/low-confidence",  label: "B · 低信心",  tone: "warning" as const },
  { href: "/dashboard/panic",           label: "C · 緊急",    tone: "panic"   as const },
];

const toneColor: Record<"neutral" | "warning" | "panic", string> = {
  neutral: "var(--primary)",
  warning: "var(--warning)",
  panic:   "var(--panic)",
};

export function DashboardTopBar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50">
      <SiteTopBar sticky={false} />

      {/* 第二列：場景切換 pill */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 overflow-x-auto">
          <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-card w-max">
            {scenarios.map((s) => {
              const isActive = pathname === s.href;
              const color = toneColor[s.tone];
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="relative px-3 h-8 rounded-full text-xs font-medium inline-flex items-center transition-colors whitespace-nowrap"
                  style={
                    isActive
                      ? {
                          backgroundColor: `color-mix(in oklch, ${color} 18%, transparent)`,
                          color,
                        }
                      : {
                          color: "var(--muted-foreground)",
                        }
                  }
                >
                  {s.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
