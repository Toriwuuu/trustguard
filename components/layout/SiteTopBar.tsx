"use client";

/* ============================================
   TrustGuard · SiteTopBar
   -------------------------------------------
   全站共用頂部列。Home / Research / Design System / Dashboard
   都使用此元件以確保導覽一致。active 狀態依 pathname 自動判定。
   ============================================ */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  shortLabel?: string; // 窄螢幕用的縮短文案
  match: (p: string) => boolean;
};

const NAV: NavItem[] = [
  { href: "/research",      label: "Research",      match: (p) => p === "/research" },
  { href: "/compare",       label: "Compare",       match: (p) => p === "/compare" },
  { href: "/design-system", label: "Design System", shortLabel: "Design", match: (p) => p === "/design-system" },
  { href: "/dashboard",     label: "Dashboard",     match: (p) => p.startsWith("/dashboard") },
];

export function SiteTopBar({ sticky = true }: { sticky?: boolean }) {
  const pathname = usePathname();

  return (
    <header
      className={`${
        sticky ? "sticky top-0 z-50" : ""
      } border-b border-border bg-background/80 backdrop-blur-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold shrink-0"
          aria-label="TrustGuard"
        >
          <span className="size-6 rounded-md bg-primary grid place-items-center">
            <ShieldAlert className="size-4 text-primary-foreground" />
          </span>
          <span className="hidden sm:inline">TrustGuard</span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6 text-sm whitespace-nowrap">
          {NAV.map((item) => {
            const isActive = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {item.shortLabel ? (
                  <>
                    <span className="sm:hidden">{item.shortLabel}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </>
                ) : (
                  item.label
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
