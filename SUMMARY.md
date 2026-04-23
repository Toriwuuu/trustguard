# TrustGuard 專案完整摘要

> Web3 × Agentic AI 主題的 UX 案例研究 side project
> 作品集用 · 2026 年 3–4 月開發

---

## 一、專案簡介

**TrustGuard** 是一個 Web3 × Agentic AI 主題的 UX 案例研究。

**核心命題**：當 AI 代理人可以自己動手操作（下單、轉帳、調倉）時，使用者怎麼還能保有信任？

**設計 Thesis**：用三個 UX 設計原則回應這個問題 —
- **Confidence**（信心）
- **Consent**（同意）
- **Panic**（緊急煞車）

**專案定位**：不是真的要做 AI 投顧產品，而是一份「設計案例研究」，展示設計師如何把抽象的 AI 信任議題拆成可操作的介面模式。

---

## 二、技術選型

| 層級 | 技術 |
|---|---|
| 框架 | Next.js 16.2.4（App Router + Turbopack） |
| 語言 | TypeScript strict + React 19 |
| 樣式 | Tailwind CSS v4 + shadcn/ui |
| 字體 | Inter + Noto Sans TC + Geist Mono |
| 動畫 | Framer Motion |
| 部署 | Cloudflare Pages（靜態匯出 `output: "export"`） |
| CI/CD | GitHub Actions |

**關鍵架構決策**：全站純靜態，避開 Server Components / API Routes / Next Image 優化，方便零成本部署。

---

## 三、開發時程

| Day | 主題 | 產出 |
|---|---|---|
| Day 1–5 | 研究頁骨架 | `/research` 訪談摘要 + 三原則框架 |
| Day 6–10 | 儀表板 MVP | `/dashboard` — Confidence Score / Activity Timeline / Panic Button |
| Day 11–13 | Design System 頁 | `/design-system` — Tokens / Type scale / Components |
| Day 14–16 | 動畫與細節 | Framer Motion Reveal、Aurora 漸層、背景點陣 |
| Day 17 | Before/After 對比頁 | `/compare` — 三組設計決策對照 |
| Day 18 | 無障礙細節 | `:focus-visible`、Skip link、Panic 焦點色 |
| Day 19 | OG Image | 1200×630 PNG（Satori 生成，英文版） |
| Day 20 | 反思頁 | `/reflection` — Trade-offs / Learnings / Open questions |
| Day 21 | 部署上線 | Cloudflare Pages 靜態匯出 |

---

## 四、檔案結構

```
trustguard/
├── app/
│   ├── layout.tsx              # 根佈局 + Skip link + metadata
│   ├── page.tsx                # 首頁 Progress timeline
│   ├── research/               # 研究頁
│   ├── dashboard/              # 儀表板 Demo
│   ├── compare/                # Before/After 對比
│   ├── design-system/          # 設計系統
│   ├── reflection/             # 反思頁
│   ├── opengraph-image.tsx     # OG 圖（Satori）
│   └── globals.css             # Tokens + :focus-visible
├── components/
│   ├── layout/                 # SiteTopBar、DashboardTopBar
│   ├── trust/                  # 8 個信任相關元件
│   │   ├── ActivityCard.tsx
│   │   ├── AgentDialog.tsx
│   │   ├── AgentHeader.tsx
│   │   ├── ConfidenceScore.tsx
│   │   ├── PanicButton.tsx
│   │   ├── PortfolioSummary.tsx
│   │   ├── StatusIndicator.tsx
│   │   └── TraceTimeline.tsx
│   └── ui/                     # 11 個 shadcn 元件
├── public/_headers             # Cloudflare Pages headers
└── .github/workflows/          # 自動部署
```

---

## 五、三大設計原則

### 1. Confidence（信心）
- AI 每次行動都標註「信心百分比」
- < 60% 時介面自動警示、要求人類確認
- 相關元件：`ConfidenceScore.tsx`

### 2. Consent（同意）
- 高風險操作彈出 Dialog 讓使用者 Approve / Reject
- 顯示「AI 想做什麼 + 為什麼 + 預期結果」
- 相關元件：`AgentDialog.tsx`、`ActivityCard.tsx`

### 3. Panic（緊急煞車）
- 紅色大按鈕，任何時候可以「凍結 AI 所有行動」
- 獨立焦點色（不吃全域 ring token）
- 相關元件：`PanicButton.tsx`

---

## 六、技術挑戰與解法

| 挑戰 | 解法 |
|---|---|
| Satori 不支援 oklch 色彩 | OG image 改用 hex 色（#1f1c19 等） |
| 靜態匯出模式下 OG route 報錯 | 加 `export const dynamic = "force-static"` |
| OG 檔名沒副檔名 → 社群平台抓不到 MIME | `public/_headers` 強制 `Content-Type: image/png` |
| 手機版 navbar 5 個項目擠在一起 | 加 `shortLabel`（Dashboard→Demo、Reflection→Reflect） |
| shadcn Button 沒有 `asChild` prop | 改用 `<Link><Button/></Link>` 包裝寫法 |
| Vercel 安全疑慮 | 改用 Cloudflare Pages + 靜態匯出 |
| 自動部署 | GitHub Actions workflow 推上 Cloudflare Pages |

---

## 七、無障礙（Day 18 重點）

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
.skip-to-content {
  position: fixed;
  transform: translateY(-200%);  /* 平常藏起來 */
  transition: transform 150ms;
}
.skip-to-content:focus-visible {
  transform: translateY(0);       /* Tab 聚焦時才現身 */
}
```

- 全站 `<main>` 加 `id="main-content"` 作為 skip link 目標
- Panic Button 獨立焦點色（紅色，不吃全域 ring token）
- 全站統一 `:focus-visible` 樣式 — 只有鍵盤使用者看到

---

## 八、OG Image 設計

**規格**：1200×630 PNG（Satori Runtime 生成）

**視覺**：
- 深色背景 #1f1c19
- 右上角 radial glow（橘色 #e9833d × 22% 透明）
- Eyebrow：`Case Study · Web3 × Agentic AI`
- Title：`TrustGuard`（128px, -3 letter-spacing）
- Tagline：`Designing trust for AI agents that act on your behalf.`
- Footer：`Confidence · Consent · Panic` / `trustguard.design`

**為什麼做英文版**：中文字體在 Satori 要載字檔，會拖慢建置 + 增加 Bundle 體積。

---

## 九、部署架構

```
GitHub (main branch)
    │
    │ push
    ▼
GitHub Actions workflow
    │
    │ npx next build
    ▼
out/ 目錄（10 個靜態 HTML + PNG）
    │
    │ wrangler
    ▼
Cloudflare Pages CDN
    │
    ▼
trustguard-xxx.pages.dev
```

**為什麼不用 Vercel**：使用者安全疑慮，改走 Cloudflare 免費方案。專案 100% 靜態，連 Workers adapter 都不用。

---

## 十、使用者溝通模式

### 溝通風格
- **語言**：全程繁體中文，偏好直接、簡短的指令
- **訊息長度**：通常一句話內（「好」「這樣可以嗎」「修一下」）
- **設計師視角**：關心視覺、互動、文案；寫 CSS / HTML 熟練，JS 程度有限

### 互動模式
1. **先講目標，不給規格** — 例如「做一個反思頁」，不指定用什麼元件
2. **看到結果再回饋** — 視覺優先，看到實機效果才說「這邊要改」
3. **直覺性反對** — 不喜歡某個方案直接說「但是 Vercel 最近好像被駭客入侵」等重新提案
4. **信任 AI 判斷** — 「你幫我選一個最適合的」而不是逐項討論
5. **一句話確認** — 同意時打「好」，不解釋細節

### 協作節奏
- 使用者把 AI 當「會寫 code 的設計助理」— 自己主導設計方向、由 AI 實作
- 每天累積 1–2 個 milestone
- 每做完一個功能就 commit + push，commit 訊息常用中文

### 具體對話例子
| 使用者訊息 | AI 處理方式 |
|---|---|
| 「nav bar 沒顯示出來 reflection，再檢查一下有啥問題」 | 補上 NAV 陣列 + 手機 shortLabel |
| 「這個適合部署到 Zeabur 還是 Cloudflare？」 | 比較兩者優劣，推薦 Cloudflare |
| 「但是 Vercel 最近好像被駭客入侵」 | 不硬推 Vercel，直接轉 Cloudflare 方案 |
| 「好」 | 立刻執行上一個提案 |
| 「把這個專案從頭到尾做成摘要」 | 產出這份文件 |

---

## 十一、作品集可以強調的亮點

1. **明確的設計 Thesis** — 三原則不是抽象口號，每個都對應具體元件
2. **Design System 真的建起來** — 不是 Mock 頁，而是實際用 Tokens 驅動
3. **考慮了無障礙** — Skip link、focus-visible、語意標籤
4. **反思頁誠實** — 有一頁專門寫「trade-offs / 做錯了什麼 / 下次會改什麼」
5. **部署上線** — 不是 Figma 截圖，是真的可互動的 URL
6. **OG image + metadata 完整** — 分享到 Twitter / Slack 有預覽圖
7. **用 AI 協作開發** — 設計師主導、AI 寫 code 的實戰紀錄

---

## 十二、可延伸方向

- 實際接一個 AI SDK（目前 Dashboard 是 Mock 資料）
- 加上 i18n（拆成 `/zh` `/en`）
- Lighthouse 跑分、Web Vitals 監控
- 真的做使用者訪談（目前 `/research` 是模擬內容）

---

## 簡報投影片建議順序

1. **封面** — TrustGuard / Designing trust for AI agents that act on your behalf
2. **問題** — 當 AI 可以自己操作時，信任怎麼辦？
3. **研究** — 訪談摘要 + 三個關鍵發現
4. **設計 Thesis** — Confidence / Consent / Panic
5. **Design System** — Tokens / Type / Components
6. **Dashboard Demo** — 截圖 + 互動錄影
7. **Before / After** — 三組對比展示決策
8. **無障礙** — Skip link / focus-visible 示範
9. **技術挑戰** — Satori 色彩、OG MIME、靜態匯出
10. **反思** — Trade-offs / Learnings / Open questions
11. **下一步** — 延伸方向
12. **結語** — Live URL + GitHub

---

*本摘要由 Claude Code 協作產出 · 2026-04-23*
