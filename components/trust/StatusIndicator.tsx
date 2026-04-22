"use client";

/* ============================================
   TrustGuard · StatusIndicator
   -------------------------------------------
   顯示 AI Agent 當前狀態：
     - active    正在工作（綠色呼吸燈）
     - thinking  思考中（橙色三點動畫）
     - paused    使用者已暫停（灰）
     - revoked   已撤銷授權（紅 / 靜態）
     - critical  緊急狀態（panic 紅色脈衝）

   兩種呈現：
     - pill  標準圖徽（圓點 + 文字）
     - icon  單純圓點（放在頭像右下等小空間）
   ============================================ */

import type { AgentStatus } from "@/lib/mock-data";

type Variant = "pill" | "icon";
type Size = "sm" | "md" | "lg";

type StatusIndicatorProps = {
  status: AgentStatus;
  variant?: Variant;
  size?: Size;
  label?: string; // 覆蓋預設文字
  className?: string;
};

type StatusConfig = {
  label: string;
  color: string; // CSS color value
  glow: boolean;
  animate: "pulse" | "thinking" | "panic" | "none";
};

const statusMap: Record<AgentStatus, StatusConfig> = {
  active: {
    label: "運作中",
    color: "var(--success)",
    glow: true,
    animate: "pulse",
  },
  thinking: {
    label: "分析中",
    color: "var(--primary)",
    glow: true,
    animate: "thinking",
  },
  paused: {
    label: "已暫停",
    color: "var(--muted-foreground)",
    glow: false,
    animate: "none",
  },
  revoked: {
    label: "已撤銷",
    color: "var(--destructive)",
    glow: false,
    animate: "none",
  },
  critical: {
    label: "緊急狀態",
    color: "var(--panic)",
    glow: true,
    animate: "panic",
  },
};

export function StatusIndicator({
  status,
  variant = "pill",
  size = "md",
  label,
  className = "",
}: StatusIndicatorProps) {
  const cfg = statusMap[status];
  const displayLabel = label ?? cfg.label;

  if (variant === "icon") {
    return <Dot cfg={cfg} size={size} className={className} />;
  }

  const textClass = { sm: "text-[11px]", md: "text-xs", lg: "text-sm" }[size];
  const padding = {
    sm: "px-2 py-0.5",
    md: "px-2.5 py-1",
    lg: "px-3 py-1.5",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${padding} ${textClass} ${className}`}
      style={{
        borderColor: `color-mix(in oklch, ${cfg.color} 30%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${cfg.color} 10%, transparent)`,
        color: cfg.color,
      }}
      role="status"
    >
      <Dot cfg={cfg} size={size} />
      <span className="font-medium">{displayLabel}</span>
      {status === "thinking" && <ThinkingDots />}
    </span>
  );
}

function Dot({
  cfg,
  size,
  className = "",
}: {
  cfg: StatusConfig;
  size: Size;
  className?: string;
}) {
  const dotClass = { sm: "size-1.5", md: "size-2", lg: "size-2.5" }[size];

  if (cfg.animate === "panic") {
    return (
      <span
        className={`relative inline-grid place-items-center shrink-0 ${className}`}
      >
        <span
          className={`rounded-full animate-panic-pulse ${dotClass}`}
          style={{ backgroundColor: cfg.color }}
        />
      </span>
    );
  }

  if (cfg.animate === "pulse") {
    return (
      <span
        className={`relative inline-grid place-items-center shrink-0 ${className}`}
      >
        <span
          className={`absolute rounded-full animate-ping ${dotClass}`}
          style={{ backgroundColor: cfg.color, opacity: 0.4 }}
        />
        <span
          className={`relative rounded-full ${dotClass}`}
          style={{
            backgroundColor: cfg.color,
            boxShadow: cfg.glow ? `0 0 8px ${cfg.color}` : undefined,
          }}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-block rounded-full shrink-0 ${dotClass} ${className}`}
      style={{
        backgroundColor: cfg.color,
        boxShadow: cfg.glow ? `0 0 6px ${cfg.color}` : undefined,
      }}
    />
  );
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-end gap-0.5 ml-0.5">
      <span
        className="size-1 rounded-full bg-current animate-thinking"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="size-1 rounded-full bg-current animate-thinking"
        style={{ animationDelay: "160ms" }}
      />
      <span
        className="size-1 rounded-full bg-current animate-thinking"
        style={{ animationDelay: "320ms" }}
      />
    </span>
  );
}
