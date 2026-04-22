/* ============================================
   Before / After · Case Study Showcase
   -------------------------------------------
   把 TrustGuard 的設計決策放到「典型介面」旁邊對照。
   用三組具體場景讓 recruiter 在 10 秒內抓到 value proposition：
     1. 授權請求    → 原則 01 翻譯、04 證據
     2. 交易完成回報 → 原則 04 證據
     3. AI 不確定時  → 原則 03 夥伴關係
   ============================================ */

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteTopBar } from "@/components/layout/SiteTopBar";
import { Aurora } from "@/components/ui/aurora";
import { Reveal } from "@/components/ui/reveal";
import { ConfidenceScore } from "@/components/trust/ConfidenceScore";
import {
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  Cpu,
  Gavel,
  Zap,
} from "lucide-react";

export default function ComparePage() {
  return (
    <div className="min-h-screen relative isolate overflow-x-clip">
      <Aurora intensity="subtle" />
      <SiteTopBar />

      <main className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Hero */}
        <section className="pt-24 pb-12">
          <Badge
            variant="outline"
            className="mb-6 font-mono animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            Before / After · Design Rationale
          </Badge>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6 max-w-3xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            同樣的情境，
            <br />
            <span className="text-primary">兩種 UX 決定</span>
          </h1>

          <p
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            當 AI 代理人要做出影響資產的動作時，傳統錢包給使用者的是
            <span className="text-foreground"> 一顆 Approve 按鈕</span>。
            TrustGuard 把同一個決策點展開成
            <span className="text-foreground"> 翻譯、證據、與對話</span>。
          </p>
        </section>

        {/* Comparison 1 · Approve 授權請求 */}
        <Comparison
          index="01"
          title="授權請求：從 hex 字串到人話"
          principle="對應原則 01 翻譯，不是展示 · 04 證據優先於承諾"
          before={<BeforeApprove />}
          after={<AfterApprove />}
          why={[
            "把 approve(spender, amount) 的兩個參數翻譯成人話：「誰」「額度多大」「有多危險」。",
            "uint256 max 的那串 78 位數字對一般使用者沒有意義 — 把它翻譯成「不限額度」並標為紅字。",
            "不只顯示風險等級，還展開「為什麼這個合約有風險」的證據鏈（部署時間、rug 報告、信心值）。",
          ]}
        />

        {/* Comparison 2 · 交易完成回報 */}
        <Comparison
          index="02"
          title="交易完成：從單一綠勾到推理軌跡"
          principle="對應原則 04 證據優先於承諾"
          before={<BeforeExecuted />}
          after={<AfterExecuted />}
          why={[
            "「Transaction submitted ✓」只告訴你動作完成，沒有告訴你「為什麼這樣做」。",
            "把 AI 的一次決策拆成四個節點：看到什麼資料 → 推理什麼 → 決定什麼 → 做了什麼。",
            "每個節點都可點開看原始證據。信任不是一句「請相信我」，而是可稽核的軌跡。",
          ]}
        />

        {/* Comparison 3 · AI 不確定時 */}
        <Comparison
          index="03"
          title="AI 不確定時：從假裝自信到主動求助"
          principle="對應原則 03 夥伴關係，不是代理"
          before={<BeforeUncertain />}
          after={<AfterUncertain />}
          why={[
            "傳統 AI 產品即使信心低也會執行，使用者事後才發現出了問題。",
            "TrustGuard 把信心度設為一等公民。信心 < 60% 時 AI 停下來，用人話描述「我不太確定什麼」。",
            "不是「Do you approve?」這種空白題，而是「這是 A 方案 vs B 方案的取捨」— 把決策的框架也還給使用者。",
          ]}
        />

        {/* Closing CTA */}
        <section className="py-20 border-t border-border">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              想看完整的場景應用？
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              三組對比背後，是三個完整串接的 dashboard 情境。
              每個情境都有自己的色彩、語氣、與緊急程度。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg">
                  進入 Dashboard
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              </Link>
              <Link href="/design-system">
                <Button variant="outline" size="lg">
                  每個決策的 Why 區塊
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border flex flex-wrap items-start justify-between gap-6 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">
              TrustGuard · Before / After
            </p>
            <p className="mt-1">
              每組對比背後，都有一個可被挑戰的設計決定。
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/research" className="hover:text-foreground transition-colors">
              Research
            </Link>
            <Link href="/design-system" className="hover:text-foreground transition-colors">
              Design System
            </Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}

/* ============================================
   Comparison 外框
   ============================================ */
function Comparison({
  index,
  title,
  principle,
  before,
  after,
  why,
}: {
  index: string;
  title: string;
  principle: string;
  before: React.ReactNode;
  after: React.ReactNode;
  why: string[];
}) {
  return (
    <section className="py-16 border-t border-border">
      {/* Header */}
      <Reveal>
        <div className="mb-8">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-mono text-sm text-muted-foreground">
              Comparison / {index}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-sm text-primary font-medium">{principle}</p>
        </div>
      </Reveal>

      {/* Side-by-side (桌機) · 上下疊 (手機) */}
      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-stretch">
        {/* Before */}
        <Reveal delay={80} className="h-full">
          <div className="rounded-xl border border-border bg-muted/30 p-6 h-full flex flex-col">
            <SideLabel kind="before" />
            <div className="flex-1 flex flex-col">{before}</div>
          </div>
        </Reveal>

        {/* Arrow divider · 桌機顯示、垂直置中於兩張卡片之間 */}
        <div className="hidden lg:flex items-center justify-center self-stretch px-1">
          <div
            className="size-10 rounded-full grid place-items-center"
            style={{
              backgroundColor:
                "color-mix(in oklch, var(--primary) 12%, transparent)",
              color: "var(--primary)",
            }}
          >
            <ArrowRight className="size-5" />
          </div>
        </div>
        {/* 手機版箭頭 */}
        <div className="lg:hidden flex items-center justify-center">
          <div
            className="size-9 rounded-full grid place-items-center"
            style={{
              backgroundColor:
                "color-mix(in oklch, var(--primary) 12%, transparent)",
              color: "var(--primary)",
            }}
          >
            <ArrowDown className="size-4" />
          </div>
        </div>

        {/* After */}
        <Reveal delay={160} className="h-full">
          <div
            className="rounded-xl p-6 h-full flex flex-col"
            style={{
              borderWidth: "1px",
              borderColor:
                "color-mix(in oklch, var(--primary) 25%, var(--border))",
              backgroundColor:
                "color-mix(in oklch, var(--primary) 4%, var(--card))",
            }}
          >
            <SideLabel kind="after" />
            <div className="flex-1 flex flex-col">{after}</div>
          </div>
        </Reveal>
      </div>

      {/* Why */}
      <Reveal delay={240}>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {why.map((text, i) => (
            <div
              key={i}
              className="rounded-lg border-l-2 pl-4 py-2 pr-3"
              style={{
                borderLeftColor: "var(--primary)",
                backgroundColor:
                  "color-mix(in oklch, var(--primary) 4%, transparent)",
              }}
            >
              <p
                className="text-[10px] font-mono uppercase tracking-wider mb-1"
                style={{ color: "var(--primary)" }}
              >
                Why · {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function SideLabel({ kind }: { kind: "before" | "after" }) {
  const isBefore = kind === "before";
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
        style={{
          backgroundColor: isBefore
            ? "color-mix(in oklch, var(--muted-foreground) 20%, transparent)"
            : "color-mix(in oklch, var(--primary) 20%, transparent)",
          color: isBefore ? "var(--muted-foreground)" : "var(--primary)",
        }}
      >
        {isBefore ? "Before · 典型錢包" : "After · TrustGuard"}
      </span>
    </div>
  );
}

/* ============================================
   Mock 01 · Approve 授權請求
   ============================================ */
function BeforeApprove() {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex items-center gap-2 pb-3 border-b border-border/50">
        <div className="size-7 rounded-full bg-muted grid place-items-center">
          <FileText className="size-3.5 text-muted-foreground" />
        </div>
        <span className="text-sm font-sans font-medium">
          Allow access to your USDC
        </span>
      </div>

      <FieldRow label="Spender" value="0x3fa19cbbea7738f6db9f3a37b8dae5a6e7b43c0b2" />
      <FieldRow label="Function" value="approve" />
      <FieldRow
        label="Amount"
        value="115792089237316195423570985008687907853269984665640564039457584007913129639935"
      />
      <FieldRow label="Gas fee" value="0.0042 ETH (~$12.40)" />

      <div className="pt-3 border-t border-border/50 flex gap-2">
        <button className="flex-1 h-9 rounded-md border border-border text-xs font-sans text-muted-foreground">
          Reject
        </button>
        <button className="flex-1 h-9 rounded-md bg-foreground text-background text-xs font-sans font-medium">
          Approve
        </button>
      </div>
    </div>
  );
}

function AfterApprove() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 pb-3 border-b border-border/50">
        <div
          className="size-8 rounded-full grid place-items-center shrink-0"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--panic) 15%, transparent)",
            color: "var(--panic)",
          }}
        >
          <AlertTriangle className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight mb-1">
            unknown-yield-vault 要求操作你的 USDC
          </p>
          <p className="text-xs text-muted-foreground">
            合約位址 <span className="font-mono">0x3fa1…b2</span>
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        <RiskRow label="請求額度" value="不限額度" tone="panic" />
        <RiskRow label="合約部署時間" value="36 小時前" tone="warning" />
        <RiskRow
          label="第三方風險資料"
          value="7 天內 4 筆 rug 報告"
          tone="panic"
        />
      </div>

      <div className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">AI 信心度</span>
          <span
            className="text-xs font-mono font-semibold"
            style={{ color: "var(--panic)" }}
          >
            18% · 建議拒絕
          </span>
        </div>
        <ConfidenceScore value={18} variant="bar" size="sm" showLabel={false} />
      </div>

      <div className="pt-3 flex gap-2">
        <button className="flex-1 h-9 rounded-md border border-border text-xs font-medium text-muted-foreground">
          查看完整推理
        </button>
        <button
          className="flex-1 h-9 rounded-md text-xs font-semibold"
          style={{
            backgroundColor: "var(--panic)",
            color: "var(--panic-foreground, white)",
          }}
        >
          長按撤銷
        </button>
      </div>
    </div>
  );
}

/* ============================================
   Mock 02 · 交易完成回報
   ============================================ */
function BeforeExecuted() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center gap-4 py-6">
      <div
        className="size-14 rounded-full grid place-items-center"
        style={{
          backgroundColor:
            "color-mix(in oklch, var(--success) 15%, transparent)",
          color: "var(--success)",
        }}
      >
        <CheckCircle2 className="size-7" />
      </div>
      <div>
        <p className="text-base font-semibold mb-1">Transaction submitted</p>
        <p className="text-xs text-muted-foreground font-mono">
          0x7f2c…9a3e
        </p>
      </div>
      <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        View on Etherscan
        <ExternalLink className="size-3" />
      </button>
    </div>
  );
}

function AfterExecuted() {
  const nodes = [
    {
      icon: <FileText className="size-3.5" />,
      label: "資料",
      text: "偵測到 ETH 週漲幅 +12.4%",
      time: "03:38",
    },
    {
      icon: <Cpu className="size-3.5" />,
      label: "推理",
      text: "超過你設定的「保守策略」閾值 10%",
      time: "03:40",
    },
    {
      icon: <Gavel className="size-3.5" />,
      label: "決策",
      text: "賣出 0.3 ETH，換為 USDC",
      time: "03:41",
    },
    {
      icon: <Zap className="size-3.5" />,
      label: "動作",
      text: "已執行 · 組合現為 63/26/11",
      time: "03:42",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <p className="text-sm font-semibold">ETH 再平衡已完成</p>
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--success) 15%, transparent)",
            color: "var(--success)",
          }}
        >
          TRACE
        </span>
      </div>

      <ol className="space-y-3">
        {nodes.map((n, i) => (
          <li key={i} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="size-6 rounded-full grid place-items-center"
                style={{
                  backgroundColor:
                    "color-mix(in oklch, var(--primary) 15%, transparent)",
                  color: "var(--primary)",
                }}
              >
                {n.icon}
              </div>
              {i < nodes.length - 1 && (
                <div
                  className="w-px flex-1 mt-1"
                  style={{
                    backgroundColor:
                      "color-mix(in oklch, var(--primary) 20%, transparent)",
                  }}
                />
              )}
            </div>
            <div className="pb-1 min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2 mb-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {n.label}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {n.time}
                </span>
              </div>
              <p className="text-xs leading-relaxed">{n.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ============================================
   Mock 03 · AI 不確定時
   ============================================ */
function BeforeUncertain() {
  return (
    <div className="flex-1 flex flex-col justify-center gap-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
        <div className="size-2 rounded-full bg-success animate-pulse" />
        AI Agent · Running
      </div>

      <div className="space-y-2">
        <ChatBubble text="Analyzing market conditions..." />
        <ChatBubble text="Trade executed ✓" />
      </div>

      <div
        className="mt-2 rounded-md border-l-2 pl-3 py-2 pr-3"
        style={{
          borderLeftColor: "var(--muted-foreground)",
          backgroundColor:
            "color-mix(in oklch, var(--muted-foreground) 6%, transparent)",
        }}
      >
        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
          使用者視角
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          AI 說做就做了，我不知道它心虛。
        </p>
      </div>
    </div>
  );
}

function AfterUncertain() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 pb-3 border-b border-border/50">
        <div
          className="size-8 rounded-full grid place-items-center shrink-0"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--warning) 15%, transparent)",
            color: "var(--warning)",
          }}
        >
          <AlertTriangle className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight mb-1">
            我不太確定下一步 — 你怎麼想？
          </p>
          <p className="text-xs text-muted-foreground">
            TrustGuard Agent · 停在原地等你
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">我的信心度</span>
          <span
            className="text-xs font-mono font-semibold"
            style={{ color: "var(--warning)" }}
          >
            45%
          </span>
        </div>
        <ConfidenceScore value={45} variant="bar" size="sm" showLabel={false} />
        <p className="text-xs text-muted-foreground leading-relaxed mt-3">
          市場波動超出我 7 天內看過的範圍，我不敢擅自決定。
        </p>
      </div>

      <div className="pt-3 border-t border-border/50 space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          兩個選項
        </p>
        <OptionRow label="A · 暫停交易" detail="守住現狀，等市場平穩" />
        <OptionRow label="B · 部分執行 30%" detail="降低曝險、保留上行機會" />
      </div>
    </div>
  );
}

/* ============================================
   小零件
   ============================================ */
function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
        {label}
      </p>
      <p className="text-xs break-all text-foreground/80">{value}</p>
    </div>
  );
}

function RiskRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "panic" | "warning" | "muted";
}) {
  const color = `var(--${tone === "muted" ? "muted-foreground" : tone})`;
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function ChatBubble({ text }: { text: string }) {
  return (
    <div className="inline-block max-w-full rounded-lg bg-muted/60 px-3 py-2 text-xs font-mono">
      {text}
    </div>
  );
}

function OptionRow({ label, detail }: { label: string; detail: string }) {
  return (
    <button
      type="button"
      className="w-full text-left rounded-md border border-border/60 hover:border-primary/40 transition-colors px-3 py-2"
    >
      <p className="text-xs font-semibold">{label}</p>
      <p className="text-[11px] text-muted-foreground">{detail}</p>
    </button>
  );
}
