"use client";

/* ============================================
   Scenario C · Panic
   -------------------------------------------
   Agent 偵測到可疑合約互動，已自動攔截。
   同時使用者獲得「一鍵撤銷所有授權」的顯眼入口，
   整個畫面轉為紅色警示調性 —
   但這正是 Panic 色唯一該被大量使用的時刻。
   ============================================ */

import { useState } from "react";
import { ShieldAlert, Zap } from "lucide-react";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { AgentHeader } from "@/components/trust/AgentHeader";
import { PortfolioSummary } from "@/components/trust/PortfolioSummary";
import { ActivityCard } from "@/components/trust/ActivityCard";
import { AgentDialog } from "@/components/trust/AgentDialog";
import { TraceTimeline } from "@/components/trust/TraceTimeline";
import { PanicButton } from "@/components/trust/PanicButton";
import { StatusIndicator } from "@/components/trust/StatusIndicator";
import {
  sampleAgent,
  samplePortfolio,
  sampleActivities,
  type AgentProfile,
  type TraceStep,
} from "@/lib/mock-data";

// Scenario C 專屬 agent state — critical
const criticalAgent: AgentProfile = {
  ...sampleAgent,
  status: "critical",
  lastAction: "2 分鐘前 · 攔截可疑合約 0x3f...b2",
};

// Scenario C 專屬推理軌跡 — 攔截流程
const interceptTrace: TraceStep[] = [
  {
    id: "c-trace-1",
    timestamp: "02:11:02",
    kind: "data",
    title: "偵測到 approve 請求",
    description: "dApp 請求批准合約 0x3f…b2 操作您的 USDC。",
    evidence:
      "請求來源：unknown-yield-vault.xyz\n合約位址：0x3fa19c...b2\n請求額度：unlimited",
  },
  {
    id: "c-trace-2",
    timestamp: "02:11:03",
    kind: "reasoning",
    title: "合約風險評估",
    description: "目標合約未在白名單內，7 天內有 4 筆 rug 報告。",
    confidence: 18,
    evidence:
      "白名單：❌ 不在 Etherscan 驗證白名單\nRug 報告：4 筆（來自 GoPlus · ScamSniffer）\n部署時間：36 小時前\n合約 owner 擁有 upgrade 權限（紅旗）",
  },
  {
    id: "c-trace-3",
    timestamp: "02:11:04",
    kind: "decision",
    title: "拒絕簽名",
    description: "綜合風險過高，依攔截策略自動阻擋。",
    confidence: 98,
    evidence:
      "您的策略：嚴格防護\n規則：unknown + rug > 1 → 自動拒絕\n備用方案：通知使用者並封存請求",
  },
  {
    id: "c-trace-4",
    timestamp: "02:11:05",
    kind: "action",
    title: "已阻擋並通知",
    description: "未動用您的任何資產。現在等待您的最終決定。",
    evidence:
      "已執行：\n1. 拒絕 approve 交易簽名\n2. 封存請求 72 小時\n3. 推送告警到您的裝置",
  },
];

export default function PanicPage() {
  const [revoked, setRevoked] = useState(false);

  const blockedActivity = sampleActivities.find((a) => a.status === "blocked");

  const handleRevoke = () => setRevoked(true);

  return (
    <div className="min-h-screen">
      <DashboardTopBar />

      {/* 頂部紅色警示條 */}
      <div
        className="border-b"
        style={{
          backgroundColor:
            "color-mix(in oklch, var(--panic) 12%, var(--background))",
          borderColor: "color-mix(in oklch, var(--panic) 30%, var(--border))",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--panic)" }}>
            <ShieldAlert className="size-4" />
            偵測到可疑活動 · 2 分鐘前
          </span>
          <span className="text-xs text-muted-foreground">
            已自動攔截 · 等待你的最終決定
          </span>
          <StatusIndicator status="critical" size="sm" className="ml-auto" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <AgentHeader agent={criticalAgent} onRevoke={handleRevoke} />

        {/* 警示對話框 */}
        <AgentDialog
          tone="alert"
          agentName={criticalAgent.name}
          agentStatus="critical"
          timestamp="2 分鐘前"
          title="我攔截了一筆可疑合約請求"
          message={
            "目標合約 0x3f…b2 不在白名單，且 7 天內被 4 筆 rug 報告標記。\n\n我已經拒絕簽名、沒有動用你的任何資產。你可以：\n1. 信任我、暫時什麼都不做（建議）\n2. 進入更嚴格的防護模式\n3. 撤銷我的所有授權（下方紅色按鈕，長按 1.5 秒）"
          }
        />

        {/* 三欄控制區 */}
        <section className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="size-4" style={{ color: "var(--success)" }} />
              <span className="text-sm font-semibold">繼續照常</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              相信我的判斷，我會繼續運作、同時加強對該合約的監控。
            </p>
            <button
              type="button"
              disabled={revoked}
              className="mt-3 w-full h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
            >
              維持現狀
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="size-4" style={{ color: "var(--warning)" }} />
              <span className="text-sm font-semibold">升級防護</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              進入嚴格模式：所有非白名單合約都需你親自確認。
            </p>
            <button
              type="button"
              disabled={revoked}
              className="mt-3 w-full h-9 rounded-md text-sm font-medium border-2 transition-colors disabled:opacity-50"
              style={{
                borderColor: "var(--warning)",
                color: "var(--warning)",
                backgroundColor:
                  "color-mix(in oklch, var(--warning) 10%, transparent)",
              }}
            >
              啟用嚴格模式
            </button>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              borderWidth: "1px",
              borderColor:
                "color-mix(in oklch, var(--panic) 35%, var(--border))",
              backgroundColor:
                "color-mix(in oklch, var(--panic) 6%, var(--card))",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="size-4" style={{ color: "var(--panic)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--panic)" }}>
                緊急撤銷
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              撤銷所有授權，切斷 Agent 與錢包的連線。此動作不可逆。
            </p>
            <PanicButton
              size="md"
              className="w-full"
              onRevoke={handleRevoke}
              disabled={revoked}
              label={revoked ? "已撤銷" : "長按撤銷所有授權"}
            />
          </div>
        </section>

        {/* 兩欄：攔截紀錄 + 推理軌跡 */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6 min-w-0">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">此次攔截紀錄</h2>
                <span className="text-xs text-muted-foreground font-mono">
                  02:11 AM
                </span>
              </div>
              {blockedActivity && <ActivityCard activity={blockedActivity} />}
            </section>

            <PortfolioSummary portfolio={samplePortfolio} />
          </div>

          <aside className="space-y-6 min-w-0">
            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">攔截過程的推理軌跡</h3>
                <span className="text-[11px] text-muted-foreground font-mono">
                  02:11 AM
                </span>
              </div>
              <TraceTimeline steps={interceptTrace} />
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
