import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteTopBar } from "@/components/layout/SiteTopBar";
import { Aurora } from "@/components/ui/aurora";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative isolate overflow-x-clip">
      <Aurora intensity="normal" parallax />
      <SiteTopBar />

      <main id="main-content" className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Hero */}
        <section className="pt-24 pb-16">
          <ScrollReveal stagger={0.1}>
            <Badge variant="outline" className="mb-6 font-mono">
              Web3 × Agentic AI · Portfolio Case Study
            </Badge>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.0] mb-6 max-w-3xl">
              AI 代理人的
              <br />
              <span className="text-primary">透明化駕駛艙</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              當 AI 從「助理」變成「代理人」，UX 面臨一個新命題——
              如何讓使用者既能放手，又能隨時拉回控制權？
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg" className="active:scale-[0.97] transition-transform">
                  進入 Dashboard
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              </Link>
              <Link href="/design-system">
                <Button variant="outline" size="lg" className="active:scale-[0.97] transition-transform">
                  查看 Design System
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Divider pullquote */}
        <section className="py-16 border-t border-b border-border my-8">
          <ScrollReveal>
            <blockquote className="max-w-4xl">
              <p className="text-2xl leading-relaxed font-medium">
                &ldquo;使用者最害怕的不是 AI 做錯選擇，而是自己
                <span className="text-primary">沒有機會知道、理解、或阻止</span>。&rdquo;
              </p>
              <footer className="mt-4 text-sm text-muted-foreground font-mono">
                — 使用者研究洞察 · Week 1
              </footer>
            </blockquote>
          </ScrollReveal>
        </section>

        {/* Scenarios preview */}
        <section className="py-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">
            三個核心情境
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            TrustGuard 圍繞 AI Agent 可能進入的三種狀態展開設計。
          </p>

          <ScrollReveal as="div" stagger={0.12}>
            <div className="grid md:grid-cols-[1fr_340px] gap-4">
              {/* Scenario A：主角卡，完整高度 */}
              <ScenarioCard
                href="/dashboard"
                index="A"
                status="放心"
                title="Happy Path"
                desc="AI 在凌晨自動完成再平衡，使用者醒來查看成績單——一切正常，帳戶微幅成長。"
                accent="success"
                featured
              />
              {/* B + C 垂直疊放 */}
              <div className="flex flex-col gap-4">
                <ScenarioCard
                  href="/dashboard/low-confidence"
                  index="B"
                  status="需介入"
                  title="Low Confidence"
                  desc="市場異常、AI 信心下降，主動徵詢使用者意見。"
                  accent="warning"
                />
                <ScenarioCard
                  href="/dashboard/panic"
                  index="C"
                  status="緊急"
                  title="Panic"
                  desc="偵測可疑活動，所有授權即刻撤銷。"
                  accent="panic"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Before / After CTA band */}
        <section className="py-10">
          <ScrollReveal>
            <Link
              href="/compare"
              className="group block rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/40 hover:bg-accent/30 active:scale-[0.99] transition-all"
            >
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                  Before / After · Design Rationale
                </p>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                  同樣的情境，兩種 UX 決定
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  把 TrustGuard 放到「典型錢包介面」旁邊 —— 三組具體對比，
                  每組背後都有一個可被挑戰的設計決定。
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                查看三組對比
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            </Link>
          </ScrollReveal>
        </section>

        {/* Five Principles */}
        <section className="py-16 border-t border-border">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">
            五個設計原則
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            每一個元件、每一個畫面，都回到這五條原則。
            它們不是規範，而是設計爭議時的仲裁。
          </p>

          <ScrollReveal
            as="div"
            className="grid md:grid-cols-2 gap-4"
            stagger={0.08}
          >
            {[
              {
                number: "01",
                title: "翻譯，不是展示",
                desc: "不把 API 回來的數字原封不動倒給使用者。把「3.42 USDC」翻譯成「過去 24 小時的質押收益」。",
              },
              {
                number: "02",
                title: "Panic 色是神聖的",
                desc: "大面積紅色只為「必須立刻反應」的時刻保留。一旦濫用，使用者的警覺會鈍化。",
              },
              {
                number: "03",
                title: "夥伴關係，不是代理",
                desc: "AI 不該假裝無所不知。信心度低就主動求助，把決策權還給使用者。",
              },
              {
                number: "04",
                title: "證據優先於承諾",
                desc: "不說「相信我」。說「這是我看到的資料、我的推理步驟、我做了什麼」。每一步都可追溯。",
              },
              {
                number: "05",
                title: "透明度要校準",
                desc: "日常不需要攤開所有日誌，緊急時要把所有細節擺到眼前。透明度隨情境調整。",
              },
            ].map((p) => (
              <Principle key={p.number} {...p} />
            ))}
          </ScrollReveal>
        </section>

        {/* Progress */}
        <section className="py-16 border-t border-border">
          <h2 className="text-xl font-medium mb-6 text-muted-foreground">
            專案進度
          </h2>

          <ScrollReveal as="div" className="space-y-2" stagger={0.04}>
            <ProgressItem day="Week 1" task="UX Research（訪談 · 競品 · Journey Map）" done />
            <ProgressItem day="Day 8" task="Design Tokens 建立" done />
            <ProgressItem day="Day 9" task="Design System 展示頁" done />
            <ProgressItem day="Day 10" task="核心元件 ①（Confidence · Status · Activity · Dialog）" done />
            <ProgressItem day="Day 11" task="核心元件 ②（PanicButton · TraceTimeline）" done />
            <ProgressItem day="Day 12-13" task="三大場景組裝（A / B / C）" done />
            <ProgressItem day="Day 14" task="首頁完成 + 完整串連" done />
            <ProgressItem day="Day 15" task="動畫打磨（entrance stagger · Panic slide-down · Confidence fill）" done />
            <ProgressItem day="Day 16" task="Living Spec 升級 · README 重寫" done />
            <ProgressItem day="Day 17" task="Before / After 對比頁（三組設計決策對照）" done />
            <ProgressItem day="Day 18" task="無障礙細節（focus-visible · skip link · panic 焦點色）" done />
            <ProgressItem day="Day 19" task="OG image（1200×630 · 英文版，避開中文字體載入）" done />
            <ProgressItem day="Day 20" task="反思頁（trade-offs · 學到什麼 · 下次會改什麼）" done current />
          </ScrollReveal>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border flex flex-wrap items-start justify-between gap-6 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">
              TrustGuard · Portfolio case study
            </p>
            <p className="mt-1">
              Designed &amp; built by Ching-Wu · Research-first UX · Dark mode native
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/design-system" className="hover:text-foreground transition-colors">
              Design System
            </Link>
            <Link href="/reflection" className="hover:text-foreground transition-colors">
              Reflection
            </Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}

function ScenarioCard({
  href,
  index,
  status,
  title,
  desc,
  accent,
  featured = false,
}: {
  href: string;
  index: string;
  status: string;
  title: string;
  desc: string;
  accent: "success" | "warning" | "panic";
  featured?: boolean;
}) {
  const accentColor = {
    success: "var(--success)",
    warning: "var(--warning)",
    panic: "var(--panic)",
  }[accent];

  const accentBg = {
    success: "color-mix(in oklch, var(--success) 8%, transparent)",
    warning: "color-mix(in oklch, var(--warning) 8%, transparent)",
    panic: "color-mix(in oklch, var(--panic) 8%, transparent)",
  }[accent];

  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 ${featured ? "h-full" : ""}`}
    >
      {/* 色塊 header — 取代空白縮圖 */}
      <div
        className={`relative overflow-hidden border-b border-border/50 ${featured ? "min-h-[160px]" : "min-h-[90px]"} flex items-end p-5`}
        style={{ backgroundColor: accentBg }}
      >
        {/* 大字號 index 作為裝飾 */}
        <span
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[80px] font-bold leading-none opacity-[0.07] select-none"
          style={{ color: accentColor }}
        >
          {index}
        </span>
        <div className="relative flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-2 rounded-full shrink-0"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: accentColor }}>
            Scenario {index} · {status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className={`font-semibold mb-2 tracking-tight group-hover:text-primary transition-colors ${featured ? "text-xl" : "text-base"}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {desc}
        </p>
        <div className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
          進入場景
          <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function Principle({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-xl p-6 hover:bg-card/80 transition-colors cursor-default">
      {/* 號碼 + 分隔線 */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-[13px] font-mono font-semibold tabular-nums"
          style={{ color: "var(--primary)" }}
        >
          {number}
        </span>
        <span
          aria-hidden="true"
          className="flex-1 h-px"
          style={{ backgroundColor: "var(--border)" }}
        />
      </div>
      <h3 className="text-base font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function ProgressItem({
  day,
  task,
  done,
  current,
}: {
  day: string;
  task: string;
  done?: boolean;
  current?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 py-2 px-3 rounded-md ${
        current ? "bg-primary/5 border border-primary/20" : ""
      }`}
    >
      <span
        className={`size-2 rounded-full shrink-0 ${
          done ? "bg-success" : "bg-muted-foreground/30"
        }`}
      />
      <span className="font-mono text-xs text-muted-foreground w-20 shrink-0">
        {day}
      </span>
      <span
        className={`text-sm ${
          done ? "" : "text-muted-foreground"
        } ${current ? "font-medium" : ""}`}
      >
        {task}
      </span>
      {current && (
        <Badge variant="outline" className="ml-auto text-xs">
          Now
        </Badge>
      )}
    </div>
  );
}
