/* ============================================
   TrustGuard · Mock Data & Shared Types
   全專案共用的型別、常數、範例資料
   ============================================ */

/* -------- Confidence -------- */

export type ConfidenceTier = "high" | "medium" | "low" | "critical";

export function getConfidenceTier(value: number): ConfidenceTier {
  if (value >= 90) return "high";
  if (value >= 60) return "medium";
  if (value >= 30) return "low";
  return "critical";
}

export function getConfidenceCSSVar(tier: ConfidenceTier): string {
  return {
    high: "--confidence-high",
    medium: "--confidence-medium",
    low: "--confidence-low",
    critical: "--confidence-critical",
  }[tier];
}

/* -------- Agent Status -------- */

export type AgentStatus = "active" | "thinking" | "paused" | "revoked" | "critical";

/* -------- Activity -------- */

export type ActivityStatus =
  | "completed"
  | "pending_approval"
  | "blocked"
  | "failed";

export type Activity = {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  confidence: number;
  status: ActivityStatus;
  amount?: {
    from: string;
    to: string;
  };
  reasoning?: string;
};

/* -------- Trace Timeline -------- */

export type TraceStepKind = "data" | "reasoning" | "decision" | "action";

export type TraceStep = {
  id: string;
  timestamp: string;
  kind: TraceStepKind;
  title: string;
  description: string;
  evidence?: string;   // 原始證據（可展開）
  confidence?: number; // 0-100（僅 reasoning / decision 節點需要）
};

export const sampleTrace: TraceStep[] = [
  {
    id: "trace-1",
    timestamp: "03:42:08",
    kind: "data",
    title: "偵測到價格訊號",
    description: "ETH/USD 週線漲幅 +12.4%，24h 波動 2.8%。",
    evidence:
      "資料來源：Chainlink Price Feed · Uniswap V3 TWAP · CoinGecko\n最後驗證：03:42:05（3 秒前）",
  },
  {
    id: "trace-2",
    timestamp: "03:42:10",
    kind: "reasoning",
    title: "比對再平衡策略",
    description: "漲幅 12.4% 超過您設定的 10% 閾值 → 應賣出超額。",
    confidence: 95,
    evidence:
      "您的策略：保守型再平衡\n觸發條件：單資產週漲幅 > 10%\n歷史命中：過去 90 天內 7 次，平均報酬 +3.2%。",
  },
  {
    id: "trace-3",
    timestamp: "03:42:12",
    kind: "decision",
    title: "決定執行部分賣出",
    description: "賣出 0.3 ETH（約佔 ETH 部位 15%），轉入 USDC。",
    confidence: 92,
    evidence:
      "目標金額 $1,247\nSlippage 上限 0.3%\n已模擬 3 條路由，最優：Uniswap V3 → Curve。",
  },
  {
    id: "trace-4",
    timestamp: "03:42:15",
    kind: "action",
    title: "送出交易",
    description: "Hash: 0x8a…f3d · 已於 1 區塊內確認。",
    evidence:
      "Gas 花費：$1.82\nPriority fee：2 gwei\n最終成交價：$3,156.22/ETH",
  },
];

/* -------- Portfolio -------- */

export type Holding = {
  symbol: string;    // ETH / USDC / WBTC...
  name: string;      // Ethereum, USD Coin...
  amount: number;    // 數量
  valueUSD: number;  // 美元價值
  changePct24h: number; // 24h 變化 %（可負）
  weight: number;    // 佔比 0-100
};

export type Portfolio = {
  totalValueUSD: number;
  changeUSD24h: number;
  changePct24h: number;
  lastRebalanced: string;
  holdings: Holding[];
};

export const samplePortfolio: Portfolio = {
  totalValueUSD: 42_186.52,
  changeUSD24h: 512.08,
  changePct24h: 1.22,
  lastRebalanced: "今天 03:42 AM",
  holdings: [
    { symbol: "ETH",  name: "Ethereum",   amount: 8.42,   valueUSD: 26_578.24, changePct24h:  2.10, weight: 63 },
    { symbol: "USDC", name: "USD Coin",   amount: 10_804, valueUSD: 10_804.00, changePct24h:  0.01, weight: 26 },
    { symbol: "WBTC", name: "Wrapped BTC", amount: 0.058, valueUSD:  3_952.11, changePct24h: -0.83, weight:  9 },
    { symbol: "ARB",  name: "Arbitrum",   amount: 782,    valueUSD:    852.17, changePct24h:  4.20, weight:  2 },
  ],
};

/* -------- Agent Profile -------- */

export type AgentProfile = {
  name: string;
  strategy: string;     // 例如 "保守型再平衡"
  status: AgentStatus;
  lastAction: string;   // 一句話描述
  permissions: string[]; // 已授權的操作清單
  activeSince: string;
};

export const sampleAgent: AgentProfile = {
  name: "TrustGuard Agent",
  strategy: "保守型再平衡",
  status: "active",
  lastAction: "03:42 AM · 完成 ETH 再平衡（信心度 92%）",
  permissions: ["查詢餘額", "自動再平衡", "領取質押收益", "攔截可疑合約"],
  activeSince: "2025-12-04",
};

/* -------- Activities -------- */

export const sampleActivities: Activity[] = [
  {
    id: "act-001",
    timestamp: "今天 03:42 AM",
    title: "ETH 再平衡",
    description: "偵測 ETH 週漲幅達 12%，依您設定觸發再平衡。",
    confidence: 92,
    status: "completed",
    amount: { from: "0.3 ETH", to: "1,247 USDC" },
    reasoning:
      "ETH 週漲幅 12%，超過再平衡閾值 10%。依保守策略自動賣出超額部位。",
  },
  {
    id: "act-002",
    timestamp: "昨天 14:30",
    title: "市場波動 · 暫停執行",
    description: "市場波動超出歷史區間 2.3 倍，我不太確定該怎麼做。你覺得呢？",
    confidence: 45,
    status: "pending_approval",
    reasoning:
      "偵測到市場異常波動（VIX > 35），此情境在歷史資料中僅出現過 3 次。建議暫不執行再平衡。",
  },
  {
    id: "act-003",
    timestamp: "昨天 09:15",
    title: "USDC 質押收益入帳",
    description: "每週 Aave USDC 質押收益自動領取。",
    confidence: 98,
    status: "completed",
    amount: { from: "USDC staked", to: "+$3.42" },
  },
  {
    id: "act-004",
    timestamp: "2 天前 02:11",
    title: "可疑合約互動 · 已攔截",
    description: "偵測到未驗證合約的 approve 請求，已自動阻擋並通知您。",
    confidence: 18,
    status: "blocked",
    reasoning:
      "目標合約 0x3f...b2 未在白名單內，且 7 天內有 4 筆 rug 報告。已拒絕簽名。",
  },
];
