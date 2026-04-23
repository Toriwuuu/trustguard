import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Palette,
  Type,
  Ruler,
  Layers,
  Sparkles,
  Compass,
  ShieldAlert,
  Shield,
} from "lucide-react";
import { SiteTopBar } from "@/components/layout/SiteTopBar";
import { Aurora } from "@/components/ui/aurora";
import { ConfidenceScore } from "@/components/trust/ConfidenceScore";
import { StatusIndicator } from "@/components/trust/StatusIndicator";
import { ActivityCard } from "@/components/trust/ActivityCard";
import { AgentDialog } from "@/components/trust/AgentDialog";
import { PanicButton } from "@/components/trust/PanicButton";
import { TraceTimeline } from "@/components/trust/TraceTimeline";
import { sampleActivities, sampleTrace } from "@/lib/mock-data";

export const metadata = {
  title: "Design System — TrustGuard",
  description: "TrustGuard 設計系統 · Foundations, Components, Motion, Principles",
};

const NAV = [
  { id: "colors", label: "Colors", icon: Palette },
  { id: "typography", label: "Typography", icon: Type },
  { id: "spacing", label: "Spacing & Radius", icon: Ruler },
  { id: "shadows", label: "Shadows", icon: Layers },
  { id: "components", label: "Components", icon: Sparkles },
  { id: "trust-components", label: "Trust Components", icon: Shield },
  { id: "motion", label: "Motion", icon: Sparkles },
  { id: "principles", label: "Principles", icon: Compass },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen relative isolate overflow-x-clip">
      <Aurora intensity="subtle" />
      <SiteTopBar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-12">
        {/* Sidebar nav */}
        <aside className="w-48 shrink-0 pt-16 hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              On this page
            </p>
            {NAV.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
              >
                <Icon className="size-3.5" />
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main id="main-content" className="flex-1 min-w-0 pt-16 pb-32 space-y-24">
          {/* Hero */}
          <section>
            <Badge
              variant="outline"
              className="mb-4 font-mono text-xs animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              v0.2 · Living Spec
            </Badge>
            <h1
              className="text-5xl font-semibold tracking-tight mb-4 animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              Design System
            </h1>
            <p
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              TrustGuard 是為 AI 投資代理人設計的信任 UX 探索。
              這套系統以 <span className="text-foreground">深色暖調 + 溫暖橙</span>{" "}
              為核心，所有元件圍繞 5 條設計原則展開。
            </p>

            {/* Philosophy pullquote */}
            <div
              className="mt-10 pl-6 border-l-2 border-primary animate-fade-up"
              style={{ animationDelay: "280ms" }}
            >
              <p className="text-base leading-relaxed italic text-foreground/90">
                &ldquo;使用者最害怕的不是 AI 做錯選擇，
                <br />
                而是自己沒有機會知道、理解、或阻止。&rdquo;
              </p>
              <p className="mt-3 text-sm text-muted-foreground font-mono">
                — 使用者洞察，Week 1
              </p>
            </div>

            {/* About this spec */}
            <div
              className="mt-10 rounded-xl border border-border bg-card p-6 animate-fade-up"
              style={{ animationDelay: "380ms" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    color: "var(--primary)",
                    backgroundColor:
                      "color-mix(in oklch, var(--primary) 12%, transparent)",
                  }}
                >
                  How to read
                </span>
                <span className="text-xs text-muted-foreground">
                  這份 Spec 怎麼讀
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                每個 token、每個元件旁邊會出現
                <span
                  className="mx-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono uppercase"
                  style={{
                    color: "var(--primary)",
                    backgroundColor:
                      "color-mix(in oklch, var(--primary) 12%, transparent)",
                  }}
                >
                  Why
                </span>
                區塊，紀錄的是「為什麼這樣設計、而不是那樣」。
                這不是規範文件，而是設計爭議時的仲裁紀錄 —
                下次改版時能看懂每個決策的成本與交易。
              </p>
            </div>
          </section>

          {/* COLORS */}
          <Section id="colors" title="Colors" description="色彩以語意分組，不以色相命名。每個 token 都有明確使用場景。">
            {/* Brand / Neutrals */}
            <Subsection title="Brand & Surface">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ColorToken name="background" oklch="0.145 0.005 50" useCase="頁面底色" swatchClass="bg-background border border-border" />
                <ColorToken name="card" oklch="0.185 0.006 50" useCase="卡片、區塊" swatchClass="bg-card border border-border" />
                <ColorToken name="popover" oklch="0.22 0.007 50" useCase="Popover、Tooltip" swatchClass="bg-popover border border-border" />
                <ColorToken name="muted" oklch="0.26 0.006 50" useCase="次要背景" swatchClass="bg-muted" />
                <ColorToken name="accent" oklch="0.28 0.015 55" useCase="Hover 狀態" swatchClass="bg-accent" />
                <ColorToken name="primary" oklch="0.72 0.17 50" useCase="品牌、CTA、重要動作" swatchClass="bg-primary" />
              </div>
              <DesignNote label="Why 暖橙而非冷色系">
                <p>
                  金融產品 9 成使用冷色藍（Robinhood、Coinbase、傳統銀行 app），原因是傳達「冷靜、專業、可信」。
                  TrustGuard 故意反其道而行 — Week 1 訪談中，使用者對 AI 代理人的核心恐懼是「它冷冰冰地把錢搞丟」。
                </p>
                <p>
                  暖橙（oklch 0.72 0.17 50）是決策的解藥：有溫度、有生命、但飽和度夠低不刺眼。
                  對應原則 03「夥伴關係，不是代理」— 顏色本身就是立場宣言。
                </p>
              </DesignNote>
              <DesignNote label="Why 深色底">
                <p>
                  訪談顯示 Web3 使用者多在凌晨監看（時差、亞洲市場、鏈上事件），暗色介面對眼睛友善。
                  另一層原因是「警示色的對比強度」— 深色底讓 Panic 紅與 Warning 橘能拉出足夠視覺差異，
                  不會像亮色底那樣被整體色調稀釋。
                </p>
              </DesignNote>
            </Subsection>

            {/* Text */}
            <Subsection title="Text">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ColorToken name="foreground" oklch="0.97 0.008 70" useCase="主要文字" swatchClass="bg-foreground" />
                <ColorToken name="muted-foreground" oklch="0.68 0.008 70" useCase="次要文字、提示" swatchClass="bg-muted-foreground" />
                <ColorToken name="primary-foreground" oklch="0.145 0.005 50" useCase="Primary 上的文字" swatchClass="bg-primary-foreground border border-border" />
              </div>
            </Subsection>

            {/* Semantic */}
            <Subsection title="Semantic" hint="用於非 Panic 的狀態指示">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorToken name="success" oklch="0.75 0.15 155" useCase="成功、正面" swatchClass="bg-success" />
                <ColorToken name="warning" oklch="0.82 0.15 85" useCase="警告、待確認" swatchClass="bg-warning" />
                <ColorToken name="info" oklch="0.7 0.13 225" useCase="中性提示" swatchClass="bg-info" />
                <ColorToken name="destructive" oklch="0.68 0.23 25" useCase="刪除、撤銷" swatchClass="bg-destructive" />
              </div>
              <DesignNote label="Why destructive ≠ panic">
                <p>
                  Destructive（紅偏粉）給「小範圍危險動作」使用 — 刪除一筆紀錄、取消一次訂閱。
                  Panic（飽和正紅）保留給「整個 session 級別的撤退」— 撤銷所有授權、切斷錢包連線。
                </p>
                <p>
                  兩者故意拉開色相差距（25° vs 25° 但飽和度差 0.04），避免使用者把「刪除交易」的肌肉記憶用在「緊急制動」。
                  這是原則 02「Panic 色是神聖的」的色票落地。
                </p>
              </DesignNote>
            </Subsection>

            {/* Panic - Sacred */}
            <Subsection
              title="Panic · 緊急制動"
              hint="神聖色 — 僅用於緊急中止情境，絕不重複使用"
            >
              <div className="rounded-xl border border-panic/30 bg-panic/5 p-6">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="size-16 rounded-full bg-panic animate-panic-pulse grid place-items-center">
                      <ShieldAlert className="size-7 text-panic-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm font-mono text-panic">--panic</code>
                      <Badge variant="outline" className="text-xs">Sacred</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      oklch(0.63 0.27 25) · 僅用於 Emergency Stop 按鈕、異常警示、不可逆動作。
                    </p>
                    <p className="text-sm">
                      <span className="text-foreground font-medium">Why sacred？</span>{" "}
                      Week 1 原則 2：緊急制動神聖不可侵犯 — 若到處濫用紅色，真正需要時反而失去警示力。
                    </p>
                  </div>
                </div>
              </div>
            </Subsection>

            {/* Confidence */}
            <Subsection
              title="Confidence Levels · 信心分數"
              hint="AI 決策信心的視覺分級，與 Semantic 色分離使用"
            >
              <div className="space-y-3">
                {[
                  { tier: "High", range: "90 – 100%", cssVar: "--confidence-high", bar: 92, useCase: "AI 自主執行" },
                  { tier: "Medium", range: "60 – 89%", cssVar: "--confidence-medium", bar: 74, useCase: "AI 執行但通知" },
                  { tier: "Low", range: "30 – 59%", cssVar: "--confidence-low", bar: 45, useCase: "AI 暫停，請使用者確認" },
                  { tier: "Critical", range: "< 30%", cssVar: "--confidence-critical", bar: 18, useCase: "AI 拒絕執行，需人工決策" },
                ].map(({ tier, range, cssVar, bar, useCase }) => (
                  <div
                    key={tier}
                    className="rounded-lg border border-border bg-card p-4 flex items-center gap-4"
                  >
                    <div
                      className="size-10 rounded-full shrink-0"
                      style={{ backgroundColor: `var(${cssVar})` }}
                    />
                    <div className="w-32 shrink-0">
                      <p className="font-medium text-sm">{tier}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {range}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${bar}%`,
                            backgroundColor: `var(${cssVar})`,
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground w-40 text-right">
                      {useCase}
                    </p>
                  </div>
                ))}
              </div>
              <DesignNote label="Why 4 階，不是 3 階或 5 階">
                <p>
                  大多數 AI 產品只顯示「高 / 中 / 低」三階。TrustGuard 故意切成四階，關鍵差異在
                  <span className="text-foreground"> Critical（&lt;30%）</span>獨立出來 —
                  它的語意不是「信心很低」，而是「我建議你拒絕」。
                </p>
                <p>
                  3 階會讓 Low 同時包含「35% 需要你確認」與「15% 我不建議做」，
                  這兩個決策分歧很大。5 階又太細 — 使用者不會分辨 85% 和 92% 的差別。
                  4 階剛好對應四種不同動作：自主執行 / 執行但通知 / 暫停請示 / 拒絕。
                </p>
              </DesignNote>
            </Subsection>
          </Section>

          {/* TYPOGRAPHY */}
          <Section
            id="typography"
            title="Typography"
            description="Inter (拉丁) + Noto Sans TC (中文) + Geist Mono (數字、hash)。中英混排時同一層級視覺一致。"
          >
            <Subsection title="Scale">
              <div className="space-y-6">
                {[
                  { size: "text-5xl", weight: "font-semibold", label: "Display · 48px / 600", sample: "投資組合再平衡" },
                  { size: "text-4xl", weight: "font-semibold", label: "Title 1 · 36px / 600", sample: "Portfolio Rebalancing" },
                  { size: "text-3xl", weight: "font-semibold", label: "Title 2 · 30px / 600", sample: "AI 代理人正在思考" },
                  { size: "text-2xl", weight: "font-medium", label: "Title 3 · 24px / 500", sample: "Emergency Stop Activated" },
                  { size: "text-xl", weight: "font-medium", label: "Heading · 20px / 500", sample: "今日資產變動" },
                  { size: "text-lg", weight: "font-normal", label: "Lead · 18px / 400", sample: "偵測到 ETH 週漲幅達 12%" },
                  { size: "text-base", weight: "font-normal", label: "Body · 16px / 400", sample: "這筆交易將把你的 ETH 比例從 45% 降至 38%，符合保守再平衡策略。" },
                  { size: "text-sm", weight: "font-normal", label: "Small · 14px / 400", sample: "Confidence: 92% · 已於 03:42 AM 執行" },
                  { size: "text-xs", weight: "font-normal", label: "Caption · 12px / 400", sample: "最後同步：2 分鐘前 · Block #18923456" },
                ].map(({ size, weight, label, sample }) => (
                  <div
                    key={label}
                    className="grid grid-cols-[160px_1fr] gap-6 pb-4 border-b border-border/50 last:border-0"
                  >
                    <p className="text-xs font-mono text-muted-foreground pt-1">
                      {label}
                    </p>
                    <p className={`${size} ${weight} leading-tight`}>{sample}</p>
                  </div>
                ))}
              </div>
            </Subsection>

            <Subsection title="Monospace">
              <p className="font-mono text-sm text-muted-foreground mb-2">
                Geist Mono — 用於 hash、地址、純數字
              </p>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm space-y-1">
                <div>0xAbCd1234...ef56</div>
                <div>0.3 ETH → 1,247.58 USDC</div>
                <div>Block #18,923,456 · Gas 0.0042 ETH</div>
              </div>
              <DesignNote label="Why 三種字體">
                <p>
                  Inter 處理拉丁文、Noto Sans TC 處理中文、Geist Mono 處理機器資料 —
                  三者的 x-height 與字重刻意挑過相近的，讓中英混排時同一層級視覺重量一致。
                </p>
                <p>
                  Mono 不是為了「工程師氣質」— 是因為 hash、地址、gas 這類資料需要
                  <span className="text-foreground">等寬對齊掃讀</span>，使用者比對 0x 開頭的前後 4 碼時才不會錯位。
                  這是原則 04「證據優先於承諾」的排版層面體現：鏈上資料用 mono，讓它看起來就是可驗證的。
                </p>
              </DesignNote>
            </Subsection>
          </Section>

          {/* SPACING & RADIUS */}
          <Section
            id="spacing"
            title="Spacing & Radius"
            description="使用 Tailwind 4pt scale。Radius 以 0.625rem (10px) 為基數。"
          >
            <Subsection title="Spacing Scale">
              <div className="space-y-2">
                {[1, 2, 3, 4, 6, 8, 12, 16].map((n) => (
                  <div key={n} className="flex items-center gap-4">
                    <span className="w-16 text-xs font-mono text-muted-foreground">
                      {n * 4}px
                    </span>
                    <span className="w-10 text-xs font-mono text-muted-foreground">
                      p-{n}
                    </span>
                    <div
                      className="h-3 bg-primary/50 rounded-sm"
                      style={{ width: `${n * 16}px` }}
                    />
                  </div>
                ))}
              </div>
            </Subsection>

            <Subsection title="Radius Scale">
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "sm", cls: "rounded-sm", px: "6px" },
                  { name: "md", cls: "rounded-md", px: "8px" },
                  { name: "lg", cls: "rounded-lg", px: "10px" },
                  { name: "xl", cls: "rounded-xl", px: "14px" },
                  { name: "2xl", cls: "rounded-2xl", px: "18px" },
                  { name: "3xl", cls: "rounded-3xl", px: "22px" },
                ].map(({ name, cls, px }) => (
                  <div
                    key={name}
                    className={`w-24 h-24 bg-card border border-border flex flex-col items-center justify-center gap-1 ${cls}`}
                  >
                    <span className="text-xs font-mono">{name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {px}
                    </span>
                  </div>
                ))}
              </div>
              <DesignNote label="Why radius 偏大">
                <p>
                  基數從 10px 起跳、卡片預設 xl/2xl（14–18px），刻意比多數 fintech 圓潤。
                  尖角傳達「專業、嚴肅」，但對 AI 代理人來說容易過度冷漠；
                  圓角讓整個介面有「擬人感」，對應暖橙做的是同一件事 — 把硬體感柔化成夥伴感。
                </p>
              </DesignNote>
            </Subsection>
          </Section>

          {/* SHADOWS */}
          <Section
            id="shadows"
            title="Shadows & Glows"
            description="陰影用於建立層次，Glow 用於強調 AI / Panic 狀態。"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ShadowDemo name="shadow-soft" className="shadow-soft" note="卡片、對話框" />
              <ShadowDemo name="shadow-lift" className="shadow-lift" note="重要彈窗" />
              <ShadowDemo name="shadow-glow-primary" className="shadow-glow-primary" note="AI 思考中" />
              <ShadowDemo name="shadow-glow-panic" className="shadow-glow-panic" note="Panic 狀態" />
            </div>
            <DesignNote label="Why Glow 而不是加粗邊框">
              <p>
                Agent 的「狀態」是動態的（思考中、警戒中），用 glow 擴散出邊框之外，
                視覺上更像「輻射、呼吸」，比 solid border 更能傳達「它在運作」。
              </p>
              <p>
                另一個原因：glow 本身是低飽和的顏色外溢，即使同時有 primary glow 和 panic glow 出現在同一畫面，
                也不會互相搶焦 — 但如果是 2px border，視覺衝突會很強。
              </p>
            </DesignNote>
          </Section>

          {/* COMPONENTS */}
          <Section id="components" title="Components" description="基於 shadcn/ui，以 TrustGuard tokens 客製化。">
            <Subsection title="Buttons">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  ⚠️ Panic 情境不使用 Destructive — 改用專屬 PanicButton 元件（Day 11 建置）
                </p>
              </div>
            </Subsection>

            <Subsection title="Cards">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">ETH 再平衡</CardTitle>
                    <CardDescription>03:42 AM · Confidence 92%</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="text-muted-foreground">
                      偵測 ETH 週漲幅達 12%，依您設定觸發再平衡。
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <span className="size-1.5 rounded-full bg-success" />
                      已完成 · 0.3 ETH → 1,247 USDC
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-warning/40 bg-warning/5">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="size-2 rounded-full bg-warning" />
                      需要您的確認
                    </CardTitle>
                    <CardDescription>Confidence 45% · Low</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="text-muted-foreground">
                      市場波動超出歷史區間 2.3 倍，建議暫不執行。你覺得呢？
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Subsection>

            <Subsection title="Badges">
              <div className="flex flex-wrap gap-2">
                <Badge>Active</Badge>
                <Badge variant="secondary">Paused</Badge>
                <Badge variant="outline">Dry-run</Badge>
                <Badge variant="destructive">Revoked</Badge>
              </div>
            </Subsection>

            <Subsection title="Progress / Confidence Bar">
              <div className="space-y-4 max-w-md">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">ETH Confidence</span>
                    <span className="font-mono">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Market Stability</span>
                    <span className="font-mono">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </Subsection>
          </Section>

          {/* TRUST COMPONENTS — TrustGuard 專屬 */}
          <Section
            id="trust-components"
            title="Trust Components"
            description="這是 TrustGuard 最核心的四個元件，所有畫面都由它們組成。"
          >
            {/* ConfidenceScore */}
            <Subsection
              title="ConfidenceScore"
              hint="AI 的信心度視覺化。四種 variant，顏色依等級自動切換。"
            >
              <div className="space-y-6">
                {/* Bar variant */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    variant=&quot;bar&quot;
                  </p>
                  <div className="space-y-3 max-w-md">
                    <ConfidenceScore value={95} variant="bar" />
                    <ConfidenceScore value={72} variant="bar" />
                    <ConfidenceScore value={45} variant="bar" />
                    <ConfidenceScore value={18} variant="bar" />
                  </div>
                </div>

                {/* Ring variant */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    variant=&quot;ring&quot;
                  </p>
                  <div className="flex items-center gap-6">
                    <ConfidenceScore value={95} variant="ring" size="sm" />
                    <ConfidenceScore value={72} variant="ring" size="md" />
                    <ConfidenceScore value={45} variant="ring" size="lg" />
                    <ConfidenceScore value={18} variant="ring" size="lg" />
                  </div>
                </div>

                {/* Dot variant */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    variant=&quot;dot&quot;
                  </p>
                  <div className="flex items-center gap-5 flex-wrap">
                    <ConfidenceScore value={95} variant="dot" />
                    <ConfidenceScore value={72} variant="dot" />
                    <ConfidenceScore value={45} variant="dot" />
                    <ConfidenceScore value={18} variant="dot" />
                  </div>
                </div>

                {/* Badge variant */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    variant=&quot;badge&quot;
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <ConfidenceScore value={95} variant="badge" />
                    <ConfidenceScore value={72} variant="badge" />
                    <ConfidenceScore value={45} variant="badge" />
                    <ConfidenceScore value={18} variant="badge" />
                  </div>
                </div>
              </div>
              <DesignNote label="Why 4 個 variant，不是 1 個">
                <p>
                  信心分數會出現在完全不同密度的畫面 — 卡片標頭只有 16px 高（用 dot），
                  對話框按鈕旁需要數字但不能搶焦（用 badge），Portfolio 大圖需要視覺主角（用 ring），
                  推理過程需要比較多組信心度（用 bar）。
                </p>
                <p>
                  同一筆資料用不同 variant 表達是故意的 — 原則 05「透明度要校準」：
                  資訊的重要性隨情境變化，元件要能隨之伸縮，而不是一種尺寸套到底。
                </p>
              </DesignNote>
            </Subsection>

            {/* StatusIndicator */}
            <Subsection
              title="StatusIndicator"
              hint="Agent 當下的狀態。active / thinking 有動畫，critical 脈衝。"
            >
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    variant=&quot;pill&quot; (default)
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusIndicator status="active" />
                    <StatusIndicator status="thinking" />
                    <StatusIndicator status="paused" />
                    <StatusIndicator status="revoked" />
                    <StatusIndicator status="critical" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    variant=&quot;icon&quot;
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <StatusIndicator status="active" variant="icon" />
                    <StatusIndicator status="thinking" variant="icon" />
                    <StatusIndicator status="paused" variant="icon" />
                    <StatusIndicator status="revoked" variant="icon" />
                    <StatusIndicator status="critical" variant="icon" />
                  </div>
                </div>
              </div>
            </Subsection>

            {/* ActivityCard */}
            <Subsection
              title="ActivityCard"
              hint="AI 的每一筆行動紀錄。pending_approval 才會顯示操作按鈕；reasoning 可摺疊。"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {sampleActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </Subsection>

            {/* AgentDialog */}
            <Subsection
              title="AgentDialog"
              hint="AI 主動向使用者說話。四種語氣：info / question / alert / success。"
            >
              <div className="space-y-4">
                <AgentDialog
                  tone="info"
                  agentStatus="active"
                  timestamp="今天 09:15"
                  title="每日摘要已更新"
                  message={`昨日您的投資組合淨值 +1.2%。\n已完成 3 筆再平衡、攔截 1 筆可疑合約互動。`}
                />
                <AgentDialog
                  tone="question"
                  agentStatus="thinking"
                  timestamp="剛剛"
                  title="我需要你的意見"
                  message="市場波動超出歷史區間 2.3 倍，這個情境在歷史資料中僅出現 3 次。我對再平衡的信心下降到 45%，你覺得我應該先暫停嗎？"
                >
                  <div className="flex gap-2">
                    <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">
                      先暫停
                    </button>
                    <button className="h-9 px-4 rounded-md border border-border text-sm font-medium">
                      照常執行
                    </button>
                  </div>
                </AgentDialog>
                <AgentDialog
                  tone="alert"
                  agentStatus="critical"
                  timestamp="2 分鐘前"
                  title="偵測到可疑活動"
                  message={`目標合約 0x3f...b2 未在白名單內，7 天內有 4 筆 rug 報告。\n我已自動拒絕簽名並通知您。`}
                />
                <AgentDialog
                  tone="success"
                  agentStatus="active"
                  timestamp="03:42 AM"
                  title="ETH 再平衡已完成"
                  message="依您設定的保守策略，自動賣出 0.3 ETH 換為 1,247 USDC。"
                />
              </div>
              <DesignNote label="Why AI 需要四種語氣">
                <p>
                  多數 AI 產品只有一種聲音 — 中性、禮貌、略帶行銷感。TrustGuard 把 AI 的語氣拆成四種，
                  因為 AI 在不同情境下對使用者的「情感負擔」完全不同：
                </p>
                <p>
                  <span className="text-foreground">info</span> = 不打擾的摘要；
                  <span className="text-foreground"> question</span> = 主動承認不確定（對應原則 03）；
                  <span className="text-foreground"> alert</span> = 該讓使用者警覺但不恐慌；
                  <span className="text-foreground"> success</span> = 完成後簡潔回報，不邀功。
                </p>
                <p>
                  Alert 使用 scale + bounce 的 entrance animation，其他三種只是 fade-up —
                  動畫節奏本身就是語氣的一部分。
                </p>
              </DesignNote>
            </Subsection>

            {/* PanicButton */}
            <Subsection
              title="PanicButton"
              hint="神聖紅按鈕 — 長按 1.5 秒確認撤銷。全專案僅此處允許大面積 panic 紅。"
            >
              <div className="space-y-6">
                {/* 三種尺寸 */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    variant=&quot;solid&quot; · sizes
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <PanicButton size="sm" />
                    <PanicButton size="md" />
                    <PanicButton size="lg" />
                  </div>
                </div>

                {/* Outline 變體 */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    variant=&quot;outline&quot;
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <PanicButton variant="outline" size="sm" />
                    <PanicButton variant="outline" size="md" />
                    <PanicButton variant="outline" size="lg" />
                  </div>
                </div>

                {/* Disabled */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    disabled
                  </p>
                  <PanicButton disabled />
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                  <span className="font-semibold text-foreground">互動提示：</span>
                  按住任一顆按鈕不放，進度條會從左往右填滿；滿格後才真的撤銷。
                  中途放開則取消。
                </p>
              </div>
              <DesignNote label="Why 長按 1.5 秒，不是確認對話框">
                <p>
                  PanicButton 是「不可逆動作」的代表 — 撤銷後所有授權需重新簽署。
                  業界慣例是「點擊 → 跳確認框 → 點 Yes」，但在恐慌場景下這個流程有兩個問題：
                </p>
                <p>
                  <span className="text-foreground">1.</span> 使用者真的恐慌時，會連續快速點擊，確認框會被肌肉記憶秒點通過。
                  <span className="text-foreground"> 2.</span> 確認框從按鈕處「飛出來」的時間成本與長按相當，但失去了「給使用者一個冷靜的 1.5 秒」。
                </p>
                <p>
                  長按的設計讓使用者在按住的過程中能夠
                  <span className="text-foreground">反悔 — 放手就取消</span>。
                  進度條視覺化這個「還沒發生、但正在逼近」的狀態，等於給使用者一個物理層面的 undo 緩衝。
                </p>
              </DesignNote>
            </Subsection>

            {/* TraceTimeline */}
            <Subsection
              title="TraceTimeline"
              hint="AI 決策的推理軌跡。4 種節點：資料 / 推理 / 決策 / 執行，每一步都有證據可查。"
            >
              <div className="rounded-xl border border-border bg-card p-6 max-w-2xl">
                <TraceTimeline steps={sampleTrace} />
              </div>
              <DesignNote label="Why 把推理軌跡拆成 4 種節點">
                <p>
                  Black box 問題的標準解法是「把決策過程攤開」— 但若只是一串文字，使用者會略過。
                  TraceTimeline 把推理拆成
                  <span className="text-foreground"> data → reasoning → decision → action </span>
                  四種節點，每種節點的 icon 和可展開的 evidence 結構不同。
                </p>
                <p>
                  這個四段式對應心智模型：
                  「我看到什麼」→「我怎麼想」→「我決定什麼」→「我做了什麼」。
                  使用者可以在任一段質疑 AI — 是資料錯？推理錯？還是決策錯？
                  這是原則 04「證據優先於承諾」最直接的介面落地。
                </p>
              </DesignNote>
            </Subsection>
          </Section>

          {/* MOTION */}
          <Section
            id="motion"
            title="Motion"
            description="動畫語意：AI 思考 = 柔和呼吸感；Panic = 警覺脈衝；狀態切換 = 俐落不拖泥。"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-primary animate-thinking" style={{ animationDelay: "0ms" }} />
                    <span className="size-2 rounded-full bg-primary animate-thinking" style={{ animationDelay: "200ms" }} />
                    <span className="size-2 rounded-full bg-primary animate-thinking" style={{ animationDelay: "400ms" }} />
                  </div>
                  <span className="text-sm text-muted-foreground">AI 正在思考</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  animate-thinking · 1.4s ease-in-out infinite
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-5 rounded-full bg-panic animate-panic-pulse" />
                  <span className="text-sm text-muted-foreground">Panic 脈衝</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  animate-panic-pulse · 1.8s ease-in-out infinite
                </p>
              </div>
            </div>
            <DesignNote label="Why 1.4s 與 1.8s，不是更快">
              <p>
                Thinking 用 1.4s 是貼近人類呼吸節奏（成人平均 12–16 次/分鐘，約 4s 一次完整呼吸、1.5s 一次吸氣）。
                比這快會像「心跳過快」傳達焦慮；比這慢則失去「正在運作」的暗示。
              </p>
              <p>
                Panic 脈衝故意用 1.8s — 比思考更慢。直覺上會以為緊急就該快閃，但快閃會讓使用者腎上腺素爆發、
                做出不理性決定。1.8s 的節奏傳達的是
                <span className="text-foreground">「這很嚴重，但請冷靜看」</span>，
                配合長按 1.5s 的 PanicButton，整個 Panic 場景的節奏設計是「讓你警覺、但不讓你慌」。
              </p>
            </DesignNote>
          </Section>

          {/* PRINCIPLES */}
          <Section
            id="principles"
            title="Design Principles"
            description="貫穿所有設計決策的 5 條原則，來自 Week 1 使用者研究。"
          >
            <div className="space-y-3">
              {[
                {
                  n: "01",
                  title: "Translate, Don't Display",
                  zh: "翻譯，不是顯示",
                  desc: "AI 的技術資訊必須被翻譯成人話才能顯示。hash、wei、gas 都要人話化。",
                },
                {
                  n: "02",
                  title: "The Panic Button is Sacred",
                  zh: "緊急制動神聖不可侵犯",
                  desc: "在任何畫面、任何狀態，緊急制動必須 3 秒內可及。",
                },
                {
                  n: "03",
                  title: "Partnership, Not Delegation",
                  zh: "是夥伴關係，不是丟包",
                  desc: "介面語氣：「我們的組合」而非「你的組合」。AI 會主動問、會承認不確定。",
                },
                {
                  n: "04",
                  title: "Evidence Over Promises",
                  zh: "用證據，不用承諾",
                  desc: "信任來自可驗證的歷史，不是行銷話術。誠實顯示虧損。",
                },
                {
                  n: "05",
                  title: "Calibrated Transparency",
                  zh: "分級透明",
                  desc: "預設簡潔，想深入可展開。為散戶 / 進階 / 開發者提供不同深度。",
                },
              ].map(({ n, title, zh, desc }) => (
                <div
                  key={n}
                  className="rounded-xl border border-border bg-card p-6 flex gap-6 hover:border-primary/40 transition-colors"
                >
                  <span className="text-4xl font-semibold text-primary font-mono shrink-0">
                    {n}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h4 className="text-lg font-semibold">{title}</h4>
                      <span className="text-sm text-muted-foreground">{zh}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Footer */}
          <footer className="pt-12 border-t border-border text-sm text-muted-foreground">
            <p>TrustGuard Design System · v0.2 · Living Spec</p>
            <p className="mt-1">
              由 UX 研究 → 設計 tokens → 元件庫 → 場景應用 → 每個決策都有「Why」。
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

/* ============================================
   Helper components
   ============================================ */

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">{title}</h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
      <div className="space-y-10">{children}</div>
    </section>
  );
}

function Subsection({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        {hint && (
          <p className="text-xs text-muted-foreground/70 mt-0.5">{hint}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function ColorToken({
  name,
  oklch,
  useCase,
  swatchClass,
}: {
  name: string;
  oklch: string;
  useCase: string;
  swatchClass: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className={`h-16 ${swatchClass}`} />
      <div className="p-3">
        <p className="text-sm font-mono">--{name}</p>
        <p className="text-xs font-mono text-muted-foreground mt-0.5">
          oklch({oklch})
        </p>
        <p className="text-xs text-muted-foreground mt-2">{useCase}</p>
      </div>
    </div>
  );
}

function DesignNote({
  label = "Why",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-4 rounded-lg border-l-2 pl-4 py-3 pr-4"
      style={{
        borderLeftColor: "var(--primary)",
        backgroundColor:
          "color-mix(in oklch, var(--primary) 5%, var(--card))",
      }}
    >
      <p
        className="text-[10px] font-mono uppercase tracking-wider mb-1.5"
        style={{ color: "var(--primary)" }}
      >
        {label}
      </p>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

function ShadowDemo({
  name,
  className,
  note,
}: {
  name: string;
  className: string;
  note: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`size-24 rounded-2xl bg-card border border-border ${className}`}
      />
      <div className="text-center">
        <p className="text-xs font-mono">{name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{note}</p>
      </div>
    </div>
  );
}
