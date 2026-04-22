"use client";

/* ============================================
   TrustGuard · ConfidenceScore
   -------------------------------------------
   顯示 AI 信心度 (0–100) 的元件。
   四種呈現方式：
     - bar    水平條（儀表板主要用）
     - ring   圓環（數字 + 圓環，用在卡片 / hero）
     - dot    小點（清單列高資訊密度）
     - badge  徽章（搭配文字使用）

   色彩依信心等級自動切換：
     high ≥ 90  / medium ≥ 60 / low ≥ 30 / critical < 30
   ============================================ */

import { getConfidenceTier, getConfidenceCSSVar } from "@/lib/mock-data";
import type { ConfidenceTier } from "@/lib/mock-data";

type Size = "sm" | "md" | "lg";
type Variant = "bar" | "ring" | "dot" | "badge";

type ConfidenceScoreProps = {
  value: number; // 0 – 100
  variant?: Variant;
  size?: Size;
  showLabel?: boolean;
  className?: string;
};

const tierLabel: Record<ConfidenceTier, string> = {
  high: "高信心",
  medium: "中等信心",
  low: "低信心",
  critical: "極低信心",
};

export function ConfidenceScore({
  value,
  variant = "bar",
  size = "md",
  showLabel = true,
  className = "",
}: ConfidenceScoreProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const tier = getConfidenceTier(clamped);
  const cssVar = getConfidenceCSSVar(tier);
  const color = `var(${cssVar})`;

  if (variant === "bar") {
    return (
      <BarVariant
        value={clamped}
        color={color}
        tier={tier}
        size={size}
        showLabel={showLabel}
        className={className}
      />
    );
  }

  if (variant === "ring") {
    return (
      <RingVariant
        value={clamped}
        color={color}
        size={size}
        showLabel={showLabel}
        className={className}
      />
    );
  }

  if (variant === "dot") {
    return (
      <DotVariant
        value={clamped}
        color={color}
        tier={tier}
        size={size}
        showLabel={showLabel}
        className={className}
      />
    );
  }

  return (
    <BadgeVariant
      value={clamped}
      color={color}
      tier={tier}
      size={size}
      className={className}
    />
  );
}

/* ---------- Bar ---------- */

function BarVariant({
  value,
  color,
  tier,
  size,
  showLabel,
  className,
}: {
  value: number;
  color: string;
  tier: ConfidenceTier;
  size: Size;
  showLabel: boolean;
  className: string;
}) {
  const heightClass = { sm: "h-1", md: "h-1.5", lg: "h-2" }[size];
  const textClass = { sm: "text-[10px]", md: "text-xs", lg: "text-sm" }[size];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className={`flex items-baseline justify-between mb-1.5 ${textClass}`}>
          <span className="text-muted-foreground">{tierLabel[tier]}</span>
          <span className="font-mono font-medium tabular-nums" style={{ color }}>
            {value}
          </span>
        </div>
      )}
      <div
        className={`w-full rounded-full bg-muted/60 overflow-hidden ${heightClass}`}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

/* ---------- Ring ---------- */

function RingVariant({
  value,
  color,
  size,
  showLabel,
  className,
}: {
  value: number;
  color: string;
  size: Size;
  showLabel: boolean;
  className: string;
}) {
  const dim = { sm: 40, md: 56, lg: 80 }[size];
  const stroke = { sm: 4, md: 5, lg: 6 }[size];
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const textClass = { sm: "text-[11px]", md: "text-sm", lg: "text-lg" }[size];

  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{ width: dim, height: dim }}
    >
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
          opacity={0.6}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 500ms ease-out",
          }}
        />
      </svg>
      {showLabel && (
        <div
          className={`absolute font-mono font-semibold tabular-nums ${textClass}`}
          style={{ color }}
        >
          {value}
        </div>
      )}
    </div>
  );
}

/* ---------- Dot ---------- */

function DotVariant({
  value,
  color,
  tier,
  size,
  showLabel,
  className,
}: {
  value: number;
  color: string;
  tier: ConfidenceTier;
  size: Size;
  showLabel: boolean;
  className: string;
}) {
  const dotClass = { sm: "size-1.5", md: "size-2", lg: "size-2.5" }[size];
  const textClass = { sm: "text-[11px]", md: "text-xs", lg: "text-sm" }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className={`rounded-full shrink-0 ${dotClass}`}
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
        }}
        aria-label={tierLabel[tier]}
      />
      {showLabel && (
        <span
          className={`font-mono font-medium tabular-nums ${textClass}`}
          style={{ color }}
        >
          {value}
        </span>
      )}
    </div>
  );
}

/* ---------- Badge ---------- */

function BadgeVariant({
  value,
  color,
  tier,
  size,
  className,
}: {
  value: number;
  color: string;
  tier: ConfidenceTier;
  size: Size;
  className: string;
}) {
  const padding = {
    sm: "px-1.5 py-0.5 text-[10px]",
    md: "px-2 py-0.5 text-xs",
    lg: "px-2.5 py-1 text-sm",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-mono font-medium border ${padding} ${className}`}
      style={{
        color,
        borderColor: `color-mix(in oklch, ${color} 35%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)`,
      }}
    >
      <span className="tabular-nums">{value}</span>
      <span className="opacity-70">· {tierLabel[tier]}</span>
    </span>
  );
}
