# TrustGuard

**AI 代理人的透明化駕駛艙** — Web3 × Agentic AI 的信任 UX 探索

> 當 AI 從「助理」變成「代理人」，UX 面臨一個新命題 —
> 如何讓使用者既能放手，又能隨時拉回控制權？

作品集案例 · 設計師主導 · Research-first · Dark mode native

---

## 這個案例在解什麼

Web3 + Agentic AI 的結合有個核心悖論：

- **要 AI 自主，才有價值** — 睡覺時自動再平衡、攔截可疑合約
- **要使用者放心，需要透明** — 但大多數錢包 / dApp 只給一個「Approve」按鈕就要你簽下去

Week 1 訪談得到一句核心洞察：

> 「使用者最害怕的不是 AI 做錯選擇，而是自己**沒有機會知道、理解、或阻止**。」

TrustGuard 圍繞這個洞察展開設計 — 針對 AI Agent 可能進入的三個狀態，各做一套完整畫面。

---

## 三個核心情境

| 場景 | 情境 | 重點 |
|------|------|------|
| **A · Happy Path** (`/dashboard`) | AI 凌晨自動再平衡，使用者醒來看成績單 | 簡潔、不打擾、但可追溯每一步 |
| **B · Low Confidence** (`/dashboard/low-confidence`) | 市場異常、AI 信心 45%，主動求助 | Partnership 而非盲目代理；把決策權還給人 |
| **C · Panic** (`/dashboard/panic`) | 偵測可疑合約互動 → 自動攔截 + 使用者一鍵撤銷全部授權 | 長按 1.5 秒確認；紅色色彩神聖不可侵犯 |

---

## 五個設計原則

| # | 原則 | 白話 |
|---|------|------|
| 01 | Translate, Don't Display | 把「3.42 USDC」翻譯成「過去 24 小時的質押收益」 |
| 02 | Panic Color is Sacred | 大面積紅色只給緊急時刻，濫用會鈍化警覺 |
| 03 | Partnership, Not Delegation | AI 信心低就主動求助，不假裝無所不知 |
| 04 | Evidence Over Promises | 不說「相信我」，說「這是我的資料、推理、動作」 |
| 05 | Calibrated Transparency | 日常簡潔、緊急時攤開所有細節 |

每條原則在 `/design-system` 都有對應的元件與 **Why 區塊**（設計決策紀錄）。

---

## 頁面索引

- `/` · 首頁（Hero + 三情境導覽 + 原則）
- `/research` · Week 1 UX 研究過程
- `/design-system` · Living Spec · Tokens、元件庫、每個決策的「Why」
- `/dashboard` · Scenario A · Happy Path
- `/dashboard/low-confidence` · Scenario B
- `/dashboard/panic` · Scenario C

---

## Tech Stack

- **Next.js 16** App Router + Turbopack
- **React 19** · TypeScript strict
- **Tailwind CSS v4** · oklch 色彩空間
- **shadcn/ui** + Base UI Primitives
- **framer-motion** / CSS keyframes (混用，以 CSS 為主)
- 字體：Inter (拉丁) · Noto Sans TC (中文) · Geist Mono (hash / 數字)

---

## 本地開發

```bash
npm install
npm run dev
```

然後打開 [http://localhost:3000](http://localhost:3000)。

```bash
npm run build   # 產出 production build
npm run lint    # ESLint
```

---

## 專案結構

```
app/
├── page.tsx                    # 首頁
├── research/page.tsx           # UX 研究過程
├── design-system/page.tsx      # Living Spec
└── dashboard/
    ├── page.tsx                # Scenario A · Happy Path
    ├── low-confidence/page.tsx # Scenario B
    └── panic/page.tsx          # Scenario C

components/
├── layout/                     # SiteTopBar · DashboardTopBar
├── trust/                      # 6 個核心信任元件
│   ├── AgentHeader
│   ├── ConfidenceScore         # 4 種 variant：bar / ring / dot / badge
│   ├── StatusIndicator
│   ├── ActivityCard
│   ├── AgentDialog             # 4 種語氣：info / question / alert / success
│   ├── PanicButton             # 長按 1.5s 撤銷
│   └── TraceTimeline           # 4 種節點：data / reasoning / decision / action
└── ui/                         # shadcn/ui 基礎元件 + Reveal (stagger wrapper)
```

---

## 設計決策的可追溯性

`/design-system` 頁的每個 token、每個元件旁邊都有 **Why 區塊** — 記錄的是：

> 「為什麼這樣設計，而不是那樣？」

不是規範文件，是**設計爭議時的仲裁紀錄**。下次改版時能看懂每個決策的成本與交易。

例如：
- Why 暖橙而非冷色系？→ 對應原則 03，顏色本身就是立場宣言
- Why PanicButton 長按 1.5 秒，不是確認對話框？→ 恐慌時會秒點確認框
- Why Confidence 4 階不是 3 階？→ 對應四種不同動作（自主 / 通知 / 請示 / 拒絕）

---

## Credits

Designed & built by **Ching-Wu** · 2026

單人設計 + 實作 · 從使用者訪談到前端 pixel 全部自包辦 · 作為 UI/UX Designer → Design Engineer 轉型的作品集案例。
