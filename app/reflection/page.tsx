/* ============================================
   Reflection · 把設計決策攤開來被挑戰
   -------------------------------------------
   UX 作品集的最後一塊拼圖：
   不是自我吹捧，而是誠實寫出每個決定的代價、
   學到什麼、下次會改什麼。
   ============================================ */

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteTopBar } from "@/components/layout/SiteTopBar";
import { Aurora } from "@/components/ui/aurora";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ReflectionPage() {
  return (
    <div className="min-h-screen relative isolate overflow-x-clip">
      <Aurora intensity="subtle" />
      <SiteTopBar />

      <main id="main-content" className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Hero */}
        <section className="pt-24 pb-16">
          <Badge
            variant="outline"
            className="mb-6 font-mono animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            Reflection · Post-mortem
          </Badge>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            每個設計決定，
            <br />
            <span className="text-primary">都有代價</span>
          </h1>

          <p
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            這頁不是作品成果展示 — 而是把 TrustGuard
            做下去的過程裡，我選了什麼、放棄了什麼、哪裡沒想清楚。
            作品集能看出一個設計師「做過什麼」，但 reflection
            才看得出「怎麼思考」。
          </p>
        </section>

        {/* Trade-offs */}
        <Reveal as="section" className="py-12 space-y-10">
          <SectionHeader
            eyebrow="01 · Trade-offs"
            title="我選了這邊，所以犧牲了那邊"
            lede="UX 沒有免費的決定。這裡列出三個最難割捨的。"
          />

          <div className="space-y-6">
            <TradeOff
              chose="長按確認，而不是一鍵授權"
              gave="日常小額操作會比原本多兩秒"
              reason={
                <>
                  對目標使用者（持有可觀資產的人）來說，
                  <span className="text-foreground">被搶走</span>
                  的代價遠大於
                  <span className="text-foreground">多等兩秒</span>
                  的摩擦。但這個決定會把「嘗試看看」的新手推開 —
                  如果產品要拉新，這個門檻要重做。
                </>
              }
            />
            <TradeOff
              chose="信心值用 0–100 的數字，不用「高/中/低」"
              gave="數字會給人一種假精確感（95% vs 92% 其實沒那麼不同）"
              reason={
                <>
                  高/中/低 會讓人停止思考 —
                  「高」就是「沒事」。
                  數字雖然不完美，但它邀請使用者去追問
                  <span className="text-foreground">「為什麼是這個數字」</span>，
                  而這正是 AI 透明化的核心動作。
                </>
              }
            />
            <TradeOff
              chose="Panic 按鈕放在顯眼位置"
              gave="大部分時候它只是一個紅色色塊，會讓介面看起來更緊張"
              reason={
                <>
                  訪談裡所有人都說過類似的話：
                  <span className="text-foreground">
                    「我不怕它出錯，我怕它出錯時我停不下來。」
                  </span>
                  這種「隨時可以退出」的保證，必須是視覺上最醒目的，
                  不能藏在第二層。代價是美學上的安靜 —
                  我選了安全感。
                </>
              }
            />
          </div>
        </Reveal>

        <Divider />

        {/* What I learned */}
        <Reveal as="section" className="py-12 space-y-10">
          <SectionHeader
            eyebrow="02 · What I learned"
            title="這個專案改變了我什麼"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <Learning
              number="01"
              title="「信任」不是一種感覺，是一組可觀察的動作"
              body="一開始我以為信任是文案或視覺氛圍的事。做到一半才發現：使用者信任 AI 代理人，是因為他們看得到 AI 做了什麼、改得了它的決定、隨時退得出來。Trust is a verb, not an adjective."
            />
            <Learning
              number="02"
              title="Web3 的 UX 債不是技術問題，是翻譯問題"
              body="approve(spender, uint256) 的簽章畫面技術上沒問題，是「對誰有意義」的問題寫錯了 — 那個畫面是寫給智能合約開發者看的。UX 設計師在這個領域的工作，大半是翻譯。"
            />
            <Learning
              number="03"
              title="Craft 在 AI 氾濫的年代變得更重要，不是更少"
              body="生成 UI 很便宜，但讓每個細節「感覺對」仍然需要手工。一個 focus ring 的顏色、一個 aurora 的漸層收尾、一個按鈕按下去的 100ms — 這些是 AI 目前還做不到的品味層。"
            />
            <Learning
              number="04"
              title="作品集要展示思考，不是展示成果"
              body="把所有研究、假設、失敗、trade-off 都寫出來，比把 UI 做得更漂亮更有說服力。這頁 reflection 本身，就是這個觀察的實踐。"
            />
          </div>
        </Reveal>

        <Divider />

        {/* What I'd do differently */}
        <Reveal as="section" className="py-12 space-y-10">
          <SectionHeader
            eyebrow="03 · Do differently"
            title="如果重做一次"
          />

          <ol className="space-y-6">
            <DoDifferent
              index="i"
              title="先做一個可點的 HTML 原型，再做 high-fidelity"
              body="我花了太多時間在 Figma 裡打磨視覺，結果到真的用 React 實作時，發現好幾個互動（長按、scroll 進場、panic 倒數）Figma 根本模擬不出來。下次會在 sketch 之後就直接跳 code prototype。"
            />
            <DoDifferent
              index="ii"
              title="把訪談腳本縮短一半"
              body="我訪談了 5 個人，每場 60 分鐘。結果有用的洞察集中在前 25 分鐘 — 後面都在重複。下次會用 30 分鐘腳本 + 找更多人，而不是少數人聊很久。"
            />
            <DoDifferent
              index="iii"
              title="更早邀請一個工程師朋友來 challenge"
              body="我對 signing 流程的理解有幾個地方是「設計師的一廂情願」 — 如果更早給懂鏈的人看，有些設計不會走到 high-fidelity 才被推翻。下一版會把 technical review 放進流程的第三週，而不是最後一週。"
            />
          </ol>
        </Reveal>

        <Divider />

        {/* Open questions */}
        <Reveal as="section" className="py-12 space-y-10">
          <SectionHeader
            eyebrow="04 · Still unresolved"
            title="還沒想清楚的問題"
            lede="把它們寫下來比假裝都想好了重要。"
          />

          <ul className="space-y-5">
            <OpenQuestion
              question="新手 vs 老手的門檻要不要分模式？"
              thought="目前的介面對新手太重（太多資訊要讀）、對老手太輕（很多檢查是他們不需要的）。加一個 expert mode 看起來很誘人，但會讓安全功能被「跳過」 — 我還沒想到好的平衡。"
            />
            <OpenQuestion
              question="AI 不確定時，該主動暫停還是問使用者？"
              thought="Scenario B 的設計是 AI 主動停下來問。但如果使用者正在忙、沒空回？放 24 小時？還是降級執行一個保守版本？這題牽涉到「AI 可以自主到哪裡」的哲學，不只是 UX。"
            />
            <OpenQuestion
              question="Panic 按鈕的「冷卻期」要多長？"
              thought="按了 panic 後，使用者可能冷靜下來反悔 — 要不要給他一個窗口可以「取消 panic」？窗口太長會降低 panic 的嚴肅感，太短會讓誤觸變成災難。目前是 10 秒，但我沒有研究支撐這個數字。"
            />
          </ul>
        </Reveal>

        {/* Closing */}
        <section className="py-20">
          <Reveal>
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-8 md:p-12">
              <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
                In closing
              </p>
              <p className="text-2xl md:text-3xl font-medium tracking-tight leading-snug mb-6">
                好的 UX 不是讓人
                <span className="text-primary">感覺安全</span>
                ， 而是讓人
                <span className="text-primary">真的可以停下來</span>
                。
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                TrustGuard 不會是我做過最美的作品，但它是我第一次
                認真思考「AI 時代的設計師，責任在哪裡」的練習。
                如果你看到這裡，謝謝。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    回到首頁
                  </Button>
                </Link>
                <Link href="/research">
                  <Button variant="outline">
                    看研究過程
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-border/50 flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-mono text-xs">
            TRUSTGUARD · REFLECTION · 2026
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/compare" className="hover:text-foreground transition-colors">
              Compare
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
   小元件
   ============================================ */

function SectionHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="space-y-3 max-w-2xl">
      <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
        {title}
      </h2>
      {lede && (
        <p className="text-muted-foreground leading-relaxed">{lede}</p>
      )}
    </div>
  );
}

function TradeOff({
  chose,
  gave,
  reason,
}: {
  chose: string;
  gave: string;
  reason: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 md:p-7">
      <div className="grid sm:grid-cols-[auto_1fr] gap-x-6 gap-y-3">
        <div className="text-xs font-mono text-muted-foreground tracking-wider uppercase sm:pt-1">
          Chose
        </div>
        <div className="font-medium text-lg leading-snug">{chose}</div>

        <div className="text-xs font-mono text-muted-foreground tracking-wider uppercase sm:pt-1">
          Gave up
        </div>
        <div className="text-muted-foreground leading-snug">{gave}</div>

        <div className="text-xs font-mono text-primary/80 tracking-wider uppercase sm:pt-1">
          Why
        </div>
        <div className="text-sm leading-relaxed text-muted-foreground">
          {reason}
        </div>
      </div>
    </div>
  );
}

function Learning({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative border-l-2 border-primary/30 pl-5 py-2">
      <div className="font-mono text-xs text-primary/80 tracking-wider mb-2">
        {number}
      </div>
      <h3 className="font-semibold text-base leading-snug mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function DoDifferent({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-baseline">
      <span className="font-mono text-sm text-muted-foreground tracking-wider italic">
        {index}.
      </span>
      <div>
        <div className="font-medium mb-1.5">{title}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

function OpenQuestion({
  question,
  thought,
}: {
  question: string;
  thought: string;
}) {
  return (
    <li className="group">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-primary font-mono text-sm">?</span>
        <h3 className="font-medium leading-snug">{question}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed pl-6">
        {thought}
      </p>
    </li>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 py-6">
      <div className="h-px flex-1 bg-border/50" />
      <div className="font-mono text-xs text-muted-foreground/60 tracking-widest">
        ·
      </div>
      <div className="h-px flex-1 bg-border/50" />
    </div>
  );
}
