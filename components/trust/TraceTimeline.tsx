"use client";

/* ============================================
   TrustGuard · TraceTimeline
   -------------------------------------------
   呈現 AI Agent 的「完整思考軌跡」。
   把一次決策拆解為 4 種節點：

     - data       偵測到什麼資料（藍）
     - reasoning  如何解讀（主色橘）
     - decision   做了什麼決定（黃）
     - action     最後的執行（綠）

   每個節點：
     kind 徽章 · 時間戳 · 標題 · 描述 · 信心度（選擇性）
     · 原始證據（可展開，等寬字呈現 raw data）

   設計意圖：讓使用者看到 AI 的推理痕跡
   （Evidence Over Promises 原則）。
   ============================================ */

import { useState } from "react";
import {
  Database,
  Brain,
  GitBranch,
  Zap,
  ChevronDown,
} from "lucide-react";
import { ConfidenceScore } from "./ConfidenceScore";
import type { TraceStep, TraceStepKind } from "@/lib/mock-data";

type TraceTimelineProps = {
  steps: TraceStep[];
  className?: string;
};

type KindMeta = {
  label: string;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const kindMeta: Record<TraceStepKind, KindMeta> = {
  data:      { label: "資料", color: "var(--info)",    Icon: Database  },
  reasoning: { label: "推理", color: "var(--primary)", Icon: Brain     },
  decision:  { label: "決策", color: "var(--warning)", Icon: GitBranch },
  action:    { label: "執行", color: "var(--success)", Icon: Zap       },
};

export function TraceTimeline({ steps, className = "" }: TraceTimelineProps) {
  return (
    <ol className={`relative ${className}`}>
      {steps.map((step, i) => (
        <TraceNode
          key={step.id}
          step={step}
          isLast={i === steps.length - 1}
          index={i}
        />
      ))}
    </ol>
  );
}

function TraceNode({
  step,
  isLast,
  index,
}: {
  step: TraceStep;
  isLast: boolean;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const meta = kindMeta[step.kind];
  const { Icon } = meta;

  return (
    <li
      className="relative pl-12 pb-6 last:pb-0 animate-fade-up"
      style={{ animationDelay: `${index * 140}ms` }}
    >
      {/* 連接線 — 最後一個節點不畫 */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[18px] top-10 bottom-0 w-px"
          style={{ backgroundColor: "var(--border)" }}
        />
      )}

      {/* 節點圓點 */}
      <span
        aria-hidden
        className="absolute left-0 top-0 size-9 rounded-full grid place-items-center"
        style={{
          backgroundColor: `color-mix(in oklch, ${meta.color} 18%, var(--card))`,
          color: meta.color,
          boxShadow: `inset 0 0 0 1px ${meta.color}`,
        }}
      >
        <Icon className="size-4" />
      </span>

      {/* 內容區 */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="text-[11px] font-medium px-1.5 py-0.5 rounded"
            style={{
              color: meta.color,
              backgroundColor: `color-mix(in oklch, ${meta.color} 12%, transparent)`,
            }}
          >
            {meta.label}
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {step.timestamp}
          </span>
        </div>

        <h4 className="text-sm font-semibold mb-1 leading-snug">
          {step.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.description}
        </p>

        {/* 信心度（選擇性） */}
        {typeof step.confidence === "number" && (
          <div className="mt-2">
            <ConfidenceScore
              value={step.confidence}
              variant="bar"
              size="sm"
            />
          </div>
        )}

        {/* 原始證據（可展開） */}
        {step.evidence && (
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
              {expanded ? "收起證據" : "查看證據"}
            </button>
            {expanded && (
              <pre
                className="mt-2 p-3 rounded-lg bg-muted/40 text-xs text-muted-foreground leading-relaxed border-l-2 whitespace-pre-wrap font-mono"
                style={{ borderColor: meta.color }}
              >
                {step.evidence}
              </pre>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
