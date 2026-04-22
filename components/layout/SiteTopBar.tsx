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

const NAV = [
  { href: "/research", label: "Research", match: (p: string) => p === "/research" },
  { href: "/design-system", label: "Design System", match: (p: string) => p === "/design-system" },
  { href: "/dashboard", label: "Dashboard", match: (p: string) => p.startsWith("/dashboard") },
];

export function SiteTopBar({ sticky = true }: { sticky?: boolean }) {
  const pathname = usePathname();

  return (
    <header
      className={`${
        sticky ? "sticky top-0 z-50" : ""
      } border-b border-border bg-background/80 backdrop-blur-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold shrink-0">
          <span className="size-6 rounded-md bg-primary grid place-items-center">
            <ShieldAlert className="size-4 text-primary-foreground" />
          </span>
          TrustGuard
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm">
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
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
