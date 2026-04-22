"use client";

/* ============================================
   TrustGuard · PortfolioSummary
   -------------------------------------------
   投資組合的「一眼看完」總覽：
     - 總值（大數字，會依漲跌染色）
     - 24h 變化（金額 + %）
     - 上次再平衡時間
     - 各資產明細（含佔比條）

   設計原則：讓漲跌色優先傳達，不靠讀文字。
   ============================================ */

import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import type { Portfolio } from "@/lib/mock-data";

type PortfolioSummaryProps = {
  portfolio: Portfolio;
  className?: string;
};

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

function formatAmount(n: number): string {
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n < 1) return n.toFixed(4);
  return n.toLocaleString("en-US", { maximumFractionDigits: 3 });
}

export function PortfolioSummary({
  portfolio,
  className = "",
}: PortfolioSummaryProps) {
  const { totalValueUSD, changeUSD24h, changePct24h, lastRebalanced, holdings } =
    portfolio;
  const isUp = changePct24h >= 0;
  const changeColor = isUp ? "var(--success)" : "var(--destructive)";
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <section
      className={`rounded-2xl border border-border bg-card p-6 ${className}`}
    >
      {/* 頂部：總值 */}
      <header className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">投資組合總值</p>
          <p className="text-3xl font-semibold tracking-tight font-mono">
            {formatUSD(totalValueUSD)}
          </p>
          <div
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: changeColor }}
          >
            <TrendIcon className="size-4" />
            <span>
              {isUp ? "+" : ""}
              {formatUSD(changeUSD24h)}
            </span>
            <span className="opacity-70">
              ({isUp ? "+" : ""}
              {changePct24h.toFixed(2)}%)
            </span>
            <span className="text-muted-foreground font-normal ml-1">
              · 24h
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">上次再平衡</p>
          <div className="inline-flex items-center gap-1.5 text-sm font-medium">
            <RefreshCw className="size-3.5 text-muted-foreground" />
            <span className="font-mono">{lastRebalanced}</span>
          </div>
        </div>
      </header>

      {/* 資產明細 */}
      <div className="space-y-3">
        <div className="text-xs text-muted-foreground flex items-center justify-between px-1">
          <span>資產</span>
          <span>佔比 / 價值</span>
        </div>
        <ul className="space-y-2.5">
          {holdings.map((h) => {
            const assetUp = h.changePct24h >= 0;
            const assetColor = assetUp
              ? "var(--success)"
              : "var(--destructive)";
            return (
              <li
                key={h.symbol}
                className="rounded-lg bg-muted/30 p-3 flex items-center gap-3"
              >
                <div
                  className="size-8 rounded-full grid place-items-center text-[11px] font-bold shrink-0"
                  style={{
                    backgroundColor:
                      "color-mix(in oklch, var(--primary) 15%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  {h.symbol.slice(0, 3)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">{h.symbol}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {h.name}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${h.weight}%`,
                        backgroundColor: "var(--primary)",
                      }}
                    />
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-mono font-medium">
                    {formatUSD(h.valueUSD)}
                  </div>
                  <div
                    className="text-xs font-mono"
                    style={{ color: assetColor }}
                  >
                    {assetUp ? "+" : ""}
                    {h.changePct24h.toFixed(2)}%
                    <span className="text-muted-foreground ml-1">
                      · {formatAmount(h.amount)} {h.symbol}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
