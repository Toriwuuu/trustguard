import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteTopBar } from "@/components/layout/SiteTopBar";
import {
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Eye,
  Languages,
  Handshake,
  FileSearch,
  SlidersHorizontal,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteTopBar />

      <main className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Hero */}
        <section className="pt-24 pb-16">
          <Badge variant="outline" className="mb-6 font-mono">
            Web3 × Agentic AI · Portfolio Case Study
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6 max-w-3xl">
            AI 代理人的
            <br />
            <span className="text-primary">透明化駕駛艙</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
            當 AI 從「助理」變成「代理人」，UX 面臨一個新命題——
            如何讓使用者既能放手，又能隨時拉回控制權？
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
              icon={<Sparkles className="size-5" />}
            />
            <ScenarioCard
              href="/dashboard/low-confidence"
              index="B"
              status="需介入"
              title="Low Confidence"
              desc="市場異常、AI 信心下降，主動徵詢使用者意見。"
              accent="warning"
              icon={<Eye className="size-5" />}
            />
            <ScenarioCard
              href="/dashboard/panic"
              index="C"
              status="緊急"
              title="Panic"
              desc="偵測可疑活動，使用者按下緊急制動，所有授權即刻撤銷。"
              accent="panic"
              icon={<ShieldAlert className="size-5" />}
            />
          </div>
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
            <Principle
              number="01"
              title="翻譯，不是展示"
              desc="不把 API 回來的數字原封不動倒給使用者。把「3.42 USDC」翻譯成「過去 24 小時的質押收益」。"
              icon={<Languages className="size-5" />}
            />
            <Principle
              number="02"
              title="Panic 色是神聖的"
              desc="大面積紅色只為「必須立刻反應」的時刻保留。一旦濫用，使用者的警覺會鈍化。"
              icon={<ShieldAlert className="size-5" />}
            />
            <Principle
              number="03"
              title="夥伴關係，不是代理"
              desc="AI 不該假裝無所不知。信心度低就主動求助，把決策權還給使用者。"
              icon={<Handshake className="size-5" />}
            />
            <Principle
              number="04"
              title="證據優先於承諾"
              desc="不說「相信我」。說「這是我看到的資料、我的推理步驟、我做了什麼」。每一步都可追溯。"
              icon={<FileSearch className="size-5" />}
            />
            <Principle
              number="05"
              title="透明度要校準"
              desc="日常不需要攤開所有日誌，緊急時要把所有細節擺到眼前。透明度隨情境調整。"
              icon={<SlidersHorizontal className="size-5" />}
            />
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
            <ProgressItem day="Day 14" task="首頁完成 + 完整串連" done current />
            <ProgressItem day="Day 15" task="動畫打磨" />
            <ProgressItem day="Later" task="反向輸出 Figma Design Spec" />
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
  icon,
}: {
  href: string;
  index: string;
  status: string;
  title: string;
  desc: string;
  accent: "success" | "warning" | "panic";
  icon: React.ReactNode;
}) {
  const accentClasses = {
    success: "border-success/30 bg-success/5 text-success",
    warning: "border-warning/30 bg-warning/5 text-warning",
    panic: "border-panic/30 bg-panic/5 text-panic",
  }[accent];

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:bg-accent/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`size-10 rounded-lg border grid place-items-center ${accentClasses}`}
        >
          {icon}
        </div>
        <span className="text-4xl font-mono text-muted-foreground/30">
          {index}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
        {status}
      </p>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {desc}
      </p>
      <div className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
        進入場景
        <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

function Principle({
  number,
  title,
  desc,
  icon,
}: {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start gap-4 mb-3">
        <div
          className="size-10 rounded-lg grid place-items-center shrink-0"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--primary) 15%, transparent)",
            color: "var(--primary)",
          }}
        >
          {icon}
        </div>
        <span className="text-2xl font-mono text-muted-foreground/40 ml-auto leading-none">
          {number}
        </span>
      </div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
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
