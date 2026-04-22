import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { AgentHeader } from "@/components/trust/AgentHeader";
import { PortfolioSummary } from "@/components/trust/PortfolioSummary";
import { ActivityCard } from "@/components/trust/ActivityCard";
import { AgentDialog } from "@/components/trust/AgentDialog";
import { TraceTimeline } from "@/components/trust/TraceTimeline";
import {
  sampleAgent,
  samplePortfolio,
  sampleActivities,
  sampleTrace,
} from "@/lib/mock-data";

/* ============================================
   Scenario A · Happy Path
   -------------------------------------------
   AI 正常運作、投資組合小漲、最近剛完成一次再平衡。
   使用者打開 dashboard 看到「一切照常」的安心感，
   同時可以追溯每一個動作的脈絡。
   ============================================ */

export default function DashboardPage() {
  // Happy Path 只展示「已完成」類的活動
  const activities = sampleActivities.filter((a) => a.status !== "blocked");

  return (
    <div className="min-h-screen">
      <DashboardTopBar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* Agent 身份列 */}
        <AgentHeader agent={sampleAgent} />

        {/* 兩欄佈局：左大 右小 */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* 左欄：組合 + 活動 */}
          <div className="space-y-6 min-w-0">
            <PortfolioSummary portfolio={samplePortfolio} />

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">最近活動</h2>
                <span className="text-xs text-muted-foreground">
                  過去 7 天
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </section>
          </div>

          {/* 右欄：Agent 對話 + 推理軌跡 */}
          <aside className="space-y-6 min-w-0">
            <AgentDialog
              tone="success"
              agentName={sampleAgent.name}
              agentStatus={sampleAgent.status}
              timestamp="今天 03:42 AM"
              title="ETH 再平衡已完成"
              message={
                "昨晚偵測到 ETH 週漲幅達 12.4%，依您設定的保守策略自動賣出 0.3 ETH 換為 1,247 USDC。\n\n整體組合現為 ETH 63% / USDC 26% / 其他 11%。"
              }
            />

            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">最近一次決策軌跡</h3>
                <span className="text-[11px] text-muted-foreground font-mono">
                  03:42 AM
                </span>
              </div>
              <TraceTimeline steps={sampleTrace} />
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
