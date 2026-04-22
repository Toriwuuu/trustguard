"use client";

/* ============================================
   TrustGuard · AgentDialog
   -------------------------------------------
   AI Agent 主動向使用者「說話」的訊息框。
   強調「夥伴 (partnership)」語氣，而非冷冰冰通知。

   四種語氣 (tone)：
     - info      中性陳述（我做了什麼）
     - question  徵詢意見（需要你決定）
     - alert     警示（有風險）
     - success   成果告知（完成了）

   元件提供：頭像（狀態燈）· 標題 · 訊息 · 子節點（按鈕/內容）
   ============================================ */

import { Sparkles, HelpCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { StatusIndicator } from "./StatusIndicator";
import type { AgentStatus } from "@/lib/mock-data";

type Tone = "info" | "question" | "alert" | "success";

type AgentDialogProps = {
  tone?: Tone;
  title?: string;
  message: string;
  agentName?: string;
  agentStatus?: AgentStatus;
  timestamp?: string;
  children?: React.ReactNode; // 放按鈕、金額明細等
  className?: string;
};

type ToneMeta = {
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string; // 左側 border accent
};

const toneMeta: Record<Tone, ToneMeta> = {
  info: {
    color: "var(--info)",
    Icon: Sparkles,
    accent: "var(--primary)",
  },
  question: {
    color: "var(--warning)",
    Icon: HelpCircle,
    accent: "var(--warning)",
  },
  alert: {
    color: "var(--panic)",
    Icon: AlertTriangle,
    accent: "var(--panic)",
  },
  success: {
    color: "var(--success)",
    Icon: CheckCircle2,
    accent: "var(--success)",
  },
};

export function AgentDialog({
  tone = "info",
  title,
  message,
  agentName = "TrustGuard Agent",
  agentStatus,
  timestamp,
  children,
  className = "",
}: AgentDialogProps) {
  const meta = toneMeta[tone];
  const { Icon } = meta;

  return (
    <div
      className={`relative rounded-2xl border bg-card p-5 pl-6 ${className}`}
      style={{
        borderColor: `color-mix(in oklch, ${meta.accent} 25%, var(--border))`,
      }}
    >
      {/* Left accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
        style={{ backgroundColor: meta.accent }}
      />

      {/* Header: avatar + name + status */}
      <header className="flex items-center gap-3 mb-3">
        <div
          className="size-9 rounded-full grid place-items-center shrink-0"
          style={{
            backgroundColor: `color-mix(in oklch, ${meta.color} 18%, transparent)`,
            color: meta.color,
          }}
        >
          <Icon className="size-4.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold">{agentName}</span>
            {agentStatus && (
              <StatusIndicator status={agentStatus} size="sm" />
            )}
          </div>
          {timestamp && (
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
              {timestamp}
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      {title && (
        <h4
          className="text-base font-semibold mb-2 leading-snug"
          style={{ color: meta.color }}
        >
          {title}
        </h4>
      )}
      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
        {message}
      </p>

      {/* Extra content (buttons / receipts / etc.) */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
