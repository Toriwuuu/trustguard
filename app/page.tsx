import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteTopBar } from "@/components/layout/SiteTopBar";
import { Aurora } from "@/components/ui/aurora";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative isolate overflow-x-clip">
      <Aurora intensity="normal" />
      <SiteTopBar />

      <main className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Hero */}
        <section className="pt-24 pb-16">
          <Badge
            variant="outline"
            className="mb-6 font-mono animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            Web3 × Agentic AI · Portfolio Case Study
          </Badge>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6 max-w-3xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            AI 代理人的
            <br />
            <span className="text-primary">透明化駕駛艙</span>
          </h1>

          <p
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8 animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            當 AI 從「助理」變成「代理人」，UX 面臨一個新命題——
            如何讓使用者既能放手，又能隨時拉回控制權？
          </p>

          <div
            className="flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "280ms" }}
          >
            <Link href="/dashboard">
              <Button size="lg">
                進入 Dashboard
                <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
            <Link href="/design-system">
              <Button variant="outline" size="lg">
                查看 Design System
              </Button>
            </Link>
          </div>
        </section>

        {/* Divider pullquote */}
        <section className="py-16 border-t border-b border-border my-8">
          <blockquote className="max-w-3xl">
            <p className="text-2xl leading-relaxed font-medium">
              &ldquo;使用者最害怕的不是 AI 做錯選擇，而是自己
              <span className="text-primary">沒有機會知道、理解、或阻止</span>。&rdquo;
            </p>
            <footer className="mt-4 text-sm text-muted-foreground font-mono">
              — 使用者研究洞察 · Week 1
            </footer>
          </blockquote>
        </section>

        {/* Scenarios preview */}
        <section className="py-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">
            三個核心情境
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            TrustGuard 圍繞 AI Agent 可能進入的三種狀態展開設計。
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <ScenarioCard
              href="/dashboard"
              index="A"
              status="放心"
              title="Happy Path"
              desc="AI 在凌晨自動完成再平衡，使用者醒來查看成績單。"
              accent="success"
              thumb="/illustrations/scenario-a.svg"
              delay={0}
            />
            <ScenarioCard
              href="/dashboard/low-confidence"
              index="B"
              status="需介入"
              title="Low Confidence"
              desc="市場異常、AI 信心下降，主動徵詢使用者意見。"
              accent="warning"
              thumb="/illustrations/scenario-b.svg"
              delay={100}
            />
            <ScenarioCard
              href="/dashboard/panic"
              index="C"
              status="緊急"
              title="Panic"
              desc="偵測可疑活動，使用者按下緊急制動，所有授權即刻撤銷。"
              accent="panic"
              thumb="/illustrations/scenario-c.svg"
              delay={200}
            />
          </div>
        </section>

        {/* Before / After CTA band */}
        <section className="py-10">
          <Link
            href="/compare"
            className="group block rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/40 hover:bg-accent/30 transition-all"
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

          <div className="grid md:grid-cols-2 gap-4">
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
            ].map((p, i) => (
              <Principle key={p.number} {...p} delay={i * 80} />
            ))}
          </div>
        </section>

        {/* Progress */}
        <section className="py-16 border-t border-border">
          <h2 className="text-xl font-medium mb-6 text-muted-foreground">
            專案進度
          </h2>

          <div className="space-y-2">
            <ProgressItem day="Week 1" task="UX Research（訪談 · 競品 · Journey Map）" done />
            <ProgressItem day="Day 8" task="Design Tokens 建立" done />
            <ProgressItem day="Day 9" task="Design System 展示頁" done />
            <ProgressItem day="Day 10" task="核心元件 ①（Confidence · Status · Activity · Dialog）" done />
            <ProgressItem day="Day 11" task="核心元件 ②（PanicButton · TraceTimeline）" done />
            <ProgressItem day="Day 12-13" task="三大場景組裝（A / B / C）" done />
            <ProgressItem day="Day 14" task="首頁完成 + 完整串連" done />
            <ProgressItem day="Day 15" task="動畫打磨（entrance stagger · Panic slide-down · Confidence fill）" done />
            <ProgressItem day="Day 16" task="Living Spec 升級 · README 重寫" done />
            <ProgressItem day="Day 17" task="Before / After 對比頁（三組設計決策對照）" done current />
            <ProgressItem day="Later" task="OG image · 反思頁 · 無障礙細節" />
          </div>
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
  thumb,
  delay = 0,
}: {
  href: string;
  index: string;
  status: string;
  title: string;
  desc: string;
  accent: "success" | "warning" | "panic";
  thumb: string;
  delay?: number;
}) {
  const accentColor = {
    success: "var(--success)",
    warning: "var(--warning)",
    panic: "var(--panic)",
  }[accent];

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:-translate-y-0.5 transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Thumbnail — 5:3 aspect, bg 已內建於 SVG */}
      <div
        className="relative aspect-[5/3] overflow-hidden border-b border-border/60 bg-cover bg-center"
        style={{ backgroundImage: `url(${thumb})` }}
      >
        {/* Accent 色點：和 index 呼應，提示 tone */}
        <span
          aria-hidden="true"
          className="absolute top-3 left-3 size-1.5 rounded-full"
          style={{ backgroundColor: accentColor, opacity: 0.9 }}
        />
        <span
          className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/50"
        >
          Scenario {index}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">
          {status}
        </p>
        <h3 className="text-lg font-semibold mb-2 tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
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
  delay = 0,
}: {
  number: string;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <div
      className="rounded-xl border border-border bg-card p-6 animate-fade-up hover:border-primary/30 transition-colors"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Editorial mark：大字號碼 + 小 label */}
      <div className="flex items-baseline gap-2 mb-5">
        <span
          className="text-2xl font-mono leading-none"
          style={{ color: "var(--primary)" }}
        >
          {number}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          Principle
        </span>
        {/* 細線延伸 — 讓編號跟 label 之後有呼吸空間 */}
        <span
          aria-hidden="true"
          className="flex-1 h-px ml-1"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--border) 100%, transparent)",
          }}
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 tracking-tight">{title}</h3>
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
