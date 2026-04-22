"use client";

/* ============================================
   Scenario B · Low Confidence
   -------------------------------------------
   市場波動超出歷史區間 2.3 倍。
   Agent 判斷信心只有 45%，沒有貿然執行，
   而是把決策權還給使用者：「你覺得我該暫停嗎？」
   強調 Partnership 而非盲目代理。
   ============================================ */

import { useState } from "react";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { AgentHeader } from "@/components/trust/AgentHeader";
import { PortfolioSummary } from "@/components/trust/PortfolioSummary";
import { ActivityCard } from "@/components/trust/ActivityCard";
import { AgentDialog } from "@/components/trust/AgentDialog";
import { TraceTimeline } from "@/components/trust/TraceTimeline";
import { ConfidenceScore } from "@/components/trust/ConfidenceScore";
import { Reveal } from "@/components/ui/reveal";
import {
  sampleAgent,
  samplePortfolio,
  sampleActivities,
  type AgentProfile,
  type TraceStep,
} from "@/lib/mock-data";

// Scenario B 專屬 agent state — thinking
const thinkingAgent: AgentProfile = {
  ...sampleAgent,
  status: "thinking",
  lastAction: "剛剛 · 正在重新評估市場訊號…",
};

// Scenario B 專屬推理軌跡 — 信心度偏低
const uncertainTrace: TraceStep[] = [
  {
    id: "b-trace-1",
    timestamp: "14:28:40",
    kind: "data",
    title: "偵測到市場異常",
    description: "VIX 指數跳升至 38.2，高出 30 日均值 2.3 倍。",
    evidence:
      "資料來源：CBOE VIX Index · Deribit IV\n最後驗證：14:28:38（2 秒前）",
  },
  {
    id: "b-trace-2",
    timestamp: "14:29:05",
    kind: "reasoning",
    title: "歷史資料比對",
    description: "此情境在過去 3 年僅出現過 3 次，樣本不足以做出高信心判斷。",
    confidence: 45,
    evidence:
      "過往 3 次案例：\n2022-05-12：後續 24h 跌 8%\n2023-03-10：後續 24h 跌 3%\n2024-08-05：後續 24h 漲 2%\n樣本數過少，可信區間大。",
  },
  {
    id: "b-trace-3",
    timestamp: "14:29:20",
    kind: "decision",
    title: "暫不自動執行",
    description: "信心度低於 60% 閾值，依設定應回報人類決策者。",
    confidence: 45,
    evidence:
      "您的策略：保守型再平衡\n保守模式下，信心 < 60% 應請求人類批准。",
  },
];

export default function LowConfidencePage() {
  const [decision, setDecision] = useState<"pending" | "paused" | "proceed">(
    "pending"
  );

  const pendingActivity = sampleActivities.find(
    (a) => a.status === "pending_approval"
  );

  const handleApprove = () => setDecision("proceed");
  const handleReject = () => setDecision("paused");

  return (
    <div className="min-h-screen">
      <DashboardTopBar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <Reveal delay={0}>
          <AgentHeader agent={thinkingAgent} />
        </Reveal>

        {/* 顯眼的求助對話框 — 置頂強調 */}
        {decision === "pending" && (
          <AgentDialog
            tone="question"
            agentName={thinkingAgent.name}
            agentStatus="thinking"
            timestamp="剛剛"
            title="我需要你的意見"
            message={
              "市場波動已超出歷史區間 2.3 倍，這個情境在過去 3 年只出現過 3 次。\n\n依照再平衡規則我應該賣出部分 ETH，但我對這個判斷的信心只有 45% — 樣本太少，我不確定是不是應該照常執行。你覺得呢？"
            }
          >
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleReject}
                className="h-10 px-5 rounded-md text-sm font-medium border-2 transition-colors"
                style={{
                  borderColor: "var(--warning)",
                  color: "var(--warning)",
                  backgroundColor:
                    "color-mix(in oklch, var(--warning) 10%, transparent)",
                }}
              >
                先暫停 · 等我看完再決定
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                照常執行
              </button>
              <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <span>我的信心度</span>
                <ConfidenceScore value={45} variant="badge" size="sm" />
              </div>
            </div>
          </AgentDialog>
        )}

        {decision === "paused" && (
          <AgentDialog
            tone="info"
            agentStatus="paused"
            timestamp="剛剛"
            title="已依你的決定暫停"
            message="我會繼續觀察市場，等波動回到正常區間再提醒你。這段期間不會自動執行任何交易。"
          />
        )}

        {decision === "proceed" && (
          <AgentDialog
            tone="success"
            agentStatus="active"
            timestamp="剛剛"
            title="好的，我繼續執行"
            message="依原策略執行再平衡。過程中如果訊號再度異常，我會再停下來回報你。"
          />
        )}

        {/* 兩欄佈局 */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6 min-w-0">
            <Reveal delay={120}>
              <PortfolioSummary portfolio={samplePortfolio} />
            </Reveal>

            <Reveal as="section" delay={200}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">等待中的決策</h2>
                <span className="text-xs text-muted-foreground">
                  1 筆需要你的意見
                </span>
              </div>
              {pendingActivity && (
                <ActivityCard
                  activity={pendingActivity}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              )}
            </Reveal>
          </div>

          <aside className="space-y-6 min-w-0">
            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">為什麼我不確定</h3>
                <ConfidenceScore value={45} variant="dot" />
              </div>
              <TraceTimeline steps={uncertainTrace} />
            </section>

            <div
              className="rounded-2xl p-5 text-sm leading-relaxed"
              style={{
                backgroundColor:
                  "color-mix(in oklch, var(--warning) 8%, var(--card))",
                borderLeft: "3px solid var(--warning)",
              }}
            >
              <p className="font-semibold mb-1">為什麼要問你？</p>
              <p className="text-muted-foreground">
                你把「信心 {"<"} 60% 必須人類批准」寫進了策略。
                我遵守它 — 透明比速度重要。
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
