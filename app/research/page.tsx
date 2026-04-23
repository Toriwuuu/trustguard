import Link from "next/link";
import {
  ArrowRight,
  ShieldAlert,
  Users,
  LayoutGrid,
  FileText,
  Route,
  Check,
  X,
  Languages,
  Handshake,
  FileSearch,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ConfidenceScore } from "@/components/trust/ConfidenceScore";
import { SiteTopBar } from "@/components/layout/SiteTopBar";
import { Aurora } from "@/components/ui/aurora";

/* ============================================
   /research
   -------------------------------------------
   在畫任何元件之前的一週：
     - 5 次訪談
     - 3 個競品拆解
     - 12 篇 agentic AI 相關文章
     - 1 張 journey map

   目的：讓讀者看見「5 個設計原則」的來源，
   不是拍腦袋，而是從使用者的話裡長出來。
   ============================================ */

export default function ResearchPage() {
  return (
    <div className="min-h-screen relative isolate overflow-x-clip">
      <Aurora intensity="subtle" />
      <SiteTopBar />

      <main id="main-content" className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Hero */}
        <section className="pt-24 pb-16">
          <Badge
            variant="outline"
            className="mb-6 font-mono animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            Week 1 · Research &amp; Synthesis
          </Badge>
          <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6 max-w-3xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            動筆之前，
            <br />
            <span className="text-primary">我花了一週找答案。</span>
          </h1>
          <p
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            五個設計原則不是拍腦袋想出來的。
            它們從 5 位使用者的訪談、3 個競品的拆解、
            和 12 篇 agentic AI 文獻裡慢慢長出來。
            這一頁把這個過程攤開。
          </p>
        </section>

        {/* Problem statement */}
        <section className="py-12 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
            01 · 問題陳述
          </p>
          <h2 className="text-2xl font-semibold mb-4 leading-snug max-w-3xl">
            AI 從「助理」變成「代理人」時，
            使用者的信任模型壞掉了。
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-2">過去 · Assistant</p>
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">使用者主動問、AI 回答。</span>
                每個動作都需要人類發起，AI 不會自己做決定。
                信任模型簡單：我給指令 → 它執行 → 我檢查結果。
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor:
                  "color-mix(in oklch, var(--warning) 6%, var(--card))",
                borderWidth: "1px",
                borderColor:
                  "color-mix(in oklch, var(--warning) 30%, var(--border))",
              }}
            >
              <p
                className="text-xs mb-2"
                style={{ color: "var(--warning)" }}
              >
                現在 · Agent
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">AI 自主行動，事後才告知。</span>
                凌晨三點幫你調倉位、替你簽授權、跟陌生合約互動。
                信任模型崩潰：我睡醒才知道我的資產變了。
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-12 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
            02 · 研究方法
          </p>
          <h2 className="text-2xl font-semibold mb-6">
            混合方法，一週壓縮版。
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <MethodCard
              icon={<Users className="size-5" />}
              title="深度訪談 · 5 位"
              meta="每次 30-45 分鐘 · 遠端"
              desc="2 位 Web3 主動使用者（1-3 年經驗）· 2 位傳統金融 App 使用者 · 1 位交易員。刻意找「不同風險承受度」的人。"
            />
            <MethodCard
              icon={<LayoutGrid className="size-5" />}
              title="競品拆解 · 3 個"
              meta="functional teardown"
              desc="Tesla Autopilot（自主 UI 先驅）· Klarna AI Agent（金融代理）· Rabbit R1（AI 代理裝置）。重點看「接管/介入」流程。"
            />
            <MethodCard
              icon={<FileText className="size-5" />}
              title="次級研究 · 12 篇"
              meta="agentic AI / trust / HCI"
              desc="Anthropic 關於 autonomous agents 的 safety case、Nielsen 的 trust heuristics、MIT 的 AI transparency 論文⋯⋯等。"
            />
            <MethodCard
              icon={<Route className="size-5" />}
              title="Journey Map workshop"
              meta="1 小時 · 自己 × 2 位使用者"
              desc="畫出使用者從「打開 app 發現 AI 做了事」到「決定信任/撤銷」的情緒曲線。找到信任崩壞點。"
            />
          </div>
        </section>

        {/* Competitive analysis */}
        <section className="py-12 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
            03 · 競品拆解
          </p>
          <h2 className="text-2xl font-semibold mb-6">
            三個產品，各自教我的事。
          </h2>
          {/* 桌機：表格；手機：卡片堆疊 */}
          <div className="hidden md:block rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left font-medium px-4 py-3 w-40">產品</th>
                  <th className="text-left font-medium px-4 py-3">做對的 ✓</th>
                  <th className="text-left font-medium px-4 py-3">做錯的 ✗</th>
                </tr>
              </thead>
              <tbody>
                <CompetitorRow
                  name="Tesla Autopilot"
                  category="車載 · Level 2 自動駕駛"
                  right="用顏色明確標示 AI 自信度（綠/橘/紅），把技術狀態「翻譯」成使用者直覺。"
                  wrong="突然要求人類接管時只給 3 秒警告；缺乏「預告階段」讓使用者心理準備。"
                />
                <CompetitorRow
                  name="Klarna AI Agent"
                  category="金融 · 客服代理"
                  right="承認「我不知道」，會主動轉人工；不假裝全能。"
                  wrong="介面仍是被動客服樣貌；使用者感受不到 AI 在「替我做事」的主動性。"
                />
                <CompetitorRow
                  name="Rabbit R1"
                  category="硬體 · AI Agent 裝置"
                  right="Agent 概念清楚；使用者知道是 AI 代替自己上網操作。"
                  wrong="動作進行中無法即時介入；缺乏「中止/接管」入口，讓人焦慮。"
                />
              </tbody>
            </table>
          </div>

          {/* 手機：卡片堆疊 */}
          <div className="md:hidden space-y-3">
            <CompetitorCard
              name="Tesla Autopilot"
              category="車載 · Level 2 自動駕駛"
              right="用顏色明確標示 AI 自信度（綠/橘/紅），把技術狀態「翻譯」成使用者直覺。"
              wrong="突然要求人類接管時只給 3 秒警告；缺乏「預告階段」讓使用者心理準備。"
            />
            <CompetitorCard
              name="Klarna AI Agent"
              category="金融 · 客服代理"
              right="承認「我不知道」，會主動轉人工；不假裝全能。"
              wrong="介面仍是被動客服樣貌；使用者感受不到 AI 在「替我做事」的主動性。"
            />
            <CompetitorCard
              name="Rabbit R1"
              category="硬體 · AI Agent 裝置"
              right="Agent 概念清楚；使用者知道是 AI 代替自己上網操作。"
              wrong="動作進行中無法即時介入；缺乏「中止/接管」入口，讓人焦慮。"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            共通盲點：**都缺乏「隨時拉回控制權」的明確入口**。
            這個觀察直接催生了 TrustGuard 的 PanicButton 設計。
          </p>
        </section>

        {/* Interview quotes */}
        <section className="py-12 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
            04 · 使用者原話
          </p>
          <h2 className="text-2xl font-semibold mb-6">
            5 位受訪者，3 句讓我停下來的話。
          </h2>
          <div className="space-y-4">
            <InterviewQuote
              quote="如果它沒跟我講它做了什麼，我會一直去查餘額。那還不如我自己來。"
              who="Emily · Web3 使用者 2 年"
              context="談到 autopilot 產品的使用經驗"
              tag="→ 催生「推理軌跡」"
            />
            <InterviewQuote
              quote="我可以接受 AI 做錯。但它要先停下來問我，不是做完才告訴我。"
              who="James · 業餘交易員 5 年"
              context="討論「AI 執行 vs 詢問」的偏好"
              tag="→ 催生「低信心主動求助」"
            />
            <InterviewQuote
              quote="我最怕的情境：半夜它做了什麼，我睡醒才知道。那種『失去掌控感』比損失錢更可怕。"
              who="Sarah · DeFi 散戶"
              context="描述最大的信任焦慮"
              tag="→ 催生「PanicButton」"
            />
          </div>
        </section>

        {/* Journey map */}
        <section className="py-12 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
            05 · Journey Map
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            Alex 的一個早晨。
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            虛構角色 Alex（Web3 使用者 · 2 年）打開 app，
            發現 AI 凌晨做了再平衡。情緒從警戒 → 好奇 → 理解 → 信任，
            每個轉折都對應一個設計介入點。
          </p>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <JourneyStep
                step="1"
                time="06:42"
                title="睜眼"
                emotion="warning"
                emotionLabel="警戒"
                body="打開 app · 看見「AI 完成 1 筆再平衡」· 第一反應：「它做了什麼？」"
              />
              <JourneyStep
                step="2"
                time="06:43"
                title="掃一眼"
                emotion="neutral"
                emotionLabel="好奇"
                body="看到 AgentDialog「ETH 再平衡已完成」+ 金額。開始相信不是壞事。"
              />
              <JourneyStep
                step="3"
                time="06:45"
                title="展開軌跡"
                emotion="primary"
                emotionLabel="理解"
                body="點開 TraceTimeline · 看見資料 → 推理 → 決策 → 執行。完全明白為什麼。"
              />
              <JourneyStep
                step="4"
                time="06:47"
                title="關掉 app"
                emotion="success"
                emotionLabel="信任"
                body="沒有焦慮離開。下次 AI 做決定時，Alex 的預期值更高。"
              />
            </div>

            {/* 情緒曲線視覺 */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">情緒曲線</p>
              <div className="relative h-20">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 80"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M 20 60 Q 80 65, 140 45 T 260 30 T 380 15"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                  />
                  <circle cx="20" cy="60" r="4" fill="var(--warning)" />
                  <circle cx="140" cy="45" r="4" fill="var(--muted-foreground)" />
                  <circle cx="260" cy="30" r="4" fill="var(--primary)" />
                  <circle cx="380" cy="15" r="4" fill="var(--success)" />
                </svg>
              </div>
              <div className="grid grid-cols-4 text-xs text-muted-foreground text-center mt-2">
                <span>警戒</span>
                <span>好奇</span>
                <span>理解</span>
                <span>信任</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insights → Principles (the money shot) */}
        <section className="py-16 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
            06 · Research → Design
          </p>
          <h2 className="text-3xl font-semibold tracking-tight mb-2">
            5 個洞察，長出 5 個原則。
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            這是整個研究週最重要的頁面。每一條原則都回得去一段訪談、
            一個競品觀察、或一篇文獻。
          </p>

          <div className="space-y-4">
            <InsightRow
              insight="I1 · 數字不等於資訊"
              source="訪談觀察：3/5 位受訪者說「看到 0.3 ETH 沒感覺，要自己換算才懂」"
              principle="P1 · 翻譯，不是展示"
              principleIcon={<Languages className="size-5" />}
              confidenceScore={95}
            />
            <InsightRow
              insight="I2 · 紅色被濫用會鈍化警覺"
              source="競品觀察：Tesla 紅色過度使用後，使用者開始忽略警告"
              principle="P2 · Panic 色是神聖的"
              principleIcon={<ShieldAlert className="size-5" />}
              confidenceScore={88}
            />
            <InsightRow
              insight="I3 · 使用者不怕 AI 錯，怕被騙"
              source="訪談金句：「它要先停下來問我，不是做完才說」— James"
              principle="P3 · 夥伴關係，不是代理"
              principleIcon={<Handshake className="size-5" />}
              confidenceScore={92}
            />
            <InsightRow
              insight="I4 · 信任來自可驗證的過程"
              source="文獻：MIT 2024 · AI transparency 研究 — 看得到推理過程的 AI 信任度 +47%"
              principle="P4 · 證據優先於承諾"
              principleIcon={<FileSearch className="size-5" />}
              confidenceScore={97}
            />
            <InsightRow
              insight="I5 · 緊急時需要全部資訊，日常不需要"
              source="Journey Map：Alex 日常只想看結論，panic 時想看所有推理"
              principle="P5 · 透明度要校準"
              principleIcon={<SlidersHorizontal className="size-5" />}
              confidenceScore={85}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold mb-3">
                接下來，看這些原則怎麼變成畫面。
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                三個場景 · 六個核心元件 · 一套完整的 design token 系統。
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="h-11 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                看場景 A · Happy Path
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/design-system"
                className="h-11 px-5 rounded-md border border-border text-sm font-medium inline-flex items-center hover:bg-accent transition-colors"
              >
                Design System
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-border text-sm text-muted-foreground">
          <p>TrustGuard · Research write-up · Week 1</p>
        </footer>
      </main>
    </div>
  );
}

/* ============================================
   Sub-components
   ============================================ */

function MethodCard({
  icon,
  title,
  meta,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  meta: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="size-9 rounded-lg grid place-items-center shrink-0"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--primary) 15%, transparent)",
            color: "var(--primary)",
          }}
        >
          {icon}
        </div>
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground font-mono">{meta}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function CompetitorRow({
  name,
  category,
  right,
  wrong,
}: {
  name: string;
  category: string;
  right: string;
  wrong: string;
}) {
  return (
    <tr className="border-b border-border last:border-b-0 align-top">
      <td className="px-4 py-4">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-muted-foreground mt-1">{category}</p>
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          <Check
            className="size-4 shrink-0 mt-0.5"
            style={{ color: "var(--success)" }}
          />
          <p className="text-sm leading-relaxed">{right}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          <X
            className="size-4 shrink-0 mt-0.5"
            style={{ color: "var(--destructive)" }}
          />
          <p className="text-sm leading-relaxed">{wrong}</p>
        </div>
      </td>
    </tr>
  );
}

function CompetitorCard({
  name,
  category,
  right,
  wrong,
}: {
  name: string;
  category: string;
  right: string;
  wrong: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-muted-foreground mt-1">{category}</p>
      </div>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Check
            className="size-4 shrink-0 mt-0.5"
            style={{ color: "var(--success)" }}
          />
          <p className="text-sm leading-relaxed">{right}</p>
        </div>
        <div className="flex gap-2">
          <X
            className="size-4 shrink-0 mt-0.5"
            style={{ color: "var(--destructive)" }}
          />
          <p className="text-sm leading-relaxed">{wrong}</p>
        </div>
      </div>
    </div>
  );
}

function InterviewQuote({
  quote,
  who,
  context,
  tag,
}: {
  quote: string;
  who: string;
  context: string;
  tag: string;
}) {
  return (
    <blockquote
      className="rounded-xl border-l-4 bg-card border border-border p-5"
      style={{ borderLeftColor: "var(--primary)" }}
    >
      <div className="flex items-start gap-3">
        {/* 排版本身即是裝飾 — 大字序列 quote mark 取代 icon */}
        <span
          aria-hidden="true"
          className="font-serif text-5xl leading-[0.7] shrink-0 select-none"
          style={{ color: "var(--primary)", opacity: 0.7 }}
        >
          &ldquo;
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-base font-medium leading-relaxed mb-3">
            「{quote}」
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-medium">{who}</p>
              <p className="text-muted-foreground">{context}</p>
            </div>
            <span
              className="font-mono px-2 py-1 rounded"
              style={{
                color: "var(--primary)",
                backgroundColor:
                  "color-mix(in oklch, var(--primary) 12%, transparent)",
              }}
            >
              {tag}
            </span>
          </div>
        </div>
      </div>
    </blockquote>
  );
}

function JourneyStep({
  step,
  time,
  title,
  emotion,
  emotionLabel,
  body,
}: {
  step: string;
  time: string;
  title: string;
  emotion: "warning" | "neutral" | "primary" | "success";
  emotionLabel: string;
  body: string;
}) {
  const colorMap = {
    warning: "var(--warning)",
    neutral: "var(--muted-foreground)",
    primary: "var(--primary)",
    success: "var(--success)",
  };
  const color = colorMap[emotion];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span
          className="size-6 rounded-full grid place-items-center text-[11px] font-bold"
          style={{
            backgroundColor: `color-mix(in oklch, ${color} 18%, transparent)`,
            color,
          }}
        >
          {step}
        </span>
        <span className="text-xs font-mono text-muted-foreground">{time}</span>
      </div>
      <p className="font-semibold text-sm">{title}</p>
      <p
        className="text-[11px] font-medium uppercase tracking-wider"
        style={{ color }}
      >
        {emotionLabel}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function InsightRow({
  insight,
  source,
  principle,
  principleIcon,
  confidenceScore,
}: {
  insight: string;
  source: string;
  principle: string;
  principleIcon: React.ReactNode;
  confidenceScore: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
      {/* Insight */}
      <div>
        <p className="text-xs text-muted-foreground font-mono mb-1">Insight</p>
        <p className="font-semibold text-sm mb-2">{insight}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {source}
        </p>
        <div className="mt-2">
          <ConfidenceScore
            value={confidenceScore}
            variant="bar"
            size="sm"
            showLabel={false}
          />
        </div>
      </div>

      {/* Arrow */}
      <ArrowRight
        className="size-5 text-muted-foreground mx-auto hidden md:block"
      />

      {/* Principle */}
      <div className="md:text-right">
        <p className="text-xs text-muted-foreground font-mono mb-1">
          Principle
        </p>
        <div className="inline-flex items-center gap-2">
          <span
            className="size-8 rounded-lg grid place-items-center"
            style={{
              backgroundColor:
                "color-mix(in oklch, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            {principleIcon}
          </span>
          <span className="font-semibold text-sm">{principle}</span>
        </div>
      </div>
    </div>
  );
}
