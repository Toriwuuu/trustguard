"use client";

/* ============================================
   TrustGuard · ActivityCard
   -------------------------------------------
   呈現 AI Agent 的一筆行動紀錄。
   四種狀態：
     - completed         已完成（綠）
     - pending_approval  等待使用者決定（橙 / 互動）
     - blocked           已攔截（紅 / 資訊）
     - failed            執行失敗（紅）

   每張卡片包含：
     時間戳 · 狀態徽章 · 標題 · 描述 · 金流
     · 信心度 · reasoning 摺疊 · 操作按鈕
   ============================================ */

import { useState } from "react";
import {
  Check,
  AlertTriangle,
  ShieldAlert,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { ConfidenceScore } from "./ConfidenceScore";
import type { Activity, ActivityStatus } from "@/lib/mock-data";

type ActivityCardProps = {
  activity: Activity;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  className?: string;
};

type StatusMeta = {
  label: string;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const statusMeta: Record<ActivityStatus, StatusMeta> = {
  completed: {
    label: "已完成",
    color: "var(--success)",
    Icon: Check,
  },
  pending_approval: {
    label: "等待決定",
    color: "var(--warning)",
    Icon: AlertTriangle,
  },
  blocked: {
    label: "已攔截",
    color: "var(--panic)",
    Icon: ShieldAlert,
  },
  failed: {
    label: "執行失敗",
    color: "var(--destructive)",
    Icon: X,
  },
};

export function ActivityCard({
  activity,
  onApprove,
  onReject,
  className = "",
}: ActivityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const meta = statusMeta[activity.status];
  const { Icon } = meta;

  return (
    <article
      className={`group rounded-xl border border-border bg-card p-5 transition-colors hover:border-border/80 ${className}`}
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>{activity.timestamp}</span>
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium border shrink-0"
          style={{
            color: meta.color,
            borderColor: `color-mix(in oklch, ${meta.color} 30%, transparent)`,
            backgroundColor: `color-mix(in oklch, ${meta.color} 12%, transparent)`,
          }}
        >
          <Icon className="size-3" />
          {meta.label}
        </span>
      </header>

      {/* Title & description */}
      <h3 className="text-base font-semibold mb-1.5 leading-snug">
        {activity.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {activity.description}
      </p>

      {/* Amount (optional) */}
      {activity.amount && (
        <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-muted/40 text-sm font-mono">
          <span className="text-muted-foreground">{activity.amount.from}</span>
          <ArrowRight className="size-3.5 text-muted-foreground" />
          <span className="font-medium">{activity.amount.to}</span>
        </div>
      )}

      {/* Confidence */}
      <div className="mb-3">
        <ConfidenceScore value={activity.confidence} variant="bar" size="sm" />
      </div>

      {/* Reasoning (collapsible) */}
      {activity.reasoning && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-expanded={expanded}
          >
            <ChevronDown
              className={`size-3 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
            {expanded ? "收起判斷依據" : "查看判斷依據"}
          </button>
          {expanded && (
            <p className="mt-2 p-3 rounded-lg bg-muted/40 text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/40">
              {activity.reasoning}
            </p>
          )}
        </div>
      )}

      {/* Actions (only for pending_approval) */}
      {activity.status === "pending_approval" && (
        <footer className="mt-4 pt-4 border-t border-border flex items-center gap-2">
          <button
            type="button"
            onClick={() => onApprove?.(activity.id)}
            className="flex-1 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            同意執行
          </button>
          <button
            type="button"
            onClick={() => onReject?.(activity.id)}
            className="flex-1 h-9 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors"
          >
            維持現狀
          </button>
        </footer>
      )}
    </article>
  );
}
