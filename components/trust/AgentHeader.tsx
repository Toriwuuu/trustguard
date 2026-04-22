"use client";

/* ============================================
   TrustGuard · AgentHeader
   -------------------------------------------
   Dashboard 頂部的 Agent 身份列。
   告訴使用者：「誰」正在替你工作、「現在」在做什麼。

   左：Agent avatar + 名字 + 策略 + StatusIndicator
   右：最後行動一句話 + PanicButton（快速撤銷入口）
   ============================================ */

import { Bot } from "lucide-react";
import { StatusIndicator } from "./StatusIndicator";
import { PanicButton } from "./PanicButton";
import type { AgentProfile } from "@/lib/mock-data";

type AgentHeaderProps = {
  agent: AgentProfile;
  onRevoke?: () => void;
  className?: string;
};

export function AgentHeader({
  agent,
  onRevoke,
  className = "",
}: AgentHeaderProps) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card p-5 flex items-center gap-4 flex-wrap ${className}`}
    >
      {/* Agent 身份 */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className="size-11 rounded-full grid place-items-center shrink-0"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--primary) 18%, transparent)",
            color: "var(--primary)",
          }}
        >
          <Bot className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-base truncate">
              {agent.name}
            </span>
            <StatusIndicator status={agent.status} size="sm" />
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <span>策略：{agent.strategy}</span>
            <span className="text-border">·</span>
            <span className="font-mono">{agent.lastAction}</span>
          </div>
        </div>
      </div>

      {/* 快速撤銷 */}
      <PanicButton
        size="sm"
        variant="outline"
        label="撤銷授權"
        onRevoke={onRevoke}
      />
    </section>
  );
}
