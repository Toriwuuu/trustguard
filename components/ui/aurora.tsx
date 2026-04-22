/* ============================================
   Aurora · Hero 背景環境光暈
   -------------------------------------------
   參考 Linear 的 hero 光效 + Anthropic 的暖色調。

   架構重點：
     · 放在「頁面根部」而非 section 裡 —— 避免被 section 切斷
     · 自帶 mask linear-gradient，從上往下自然淡出
     · 容器高度 1400px，已足夠覆蓋 hero 並溢入下一個 section
     · overflow 交由父層 `overflow-x-clip` 處理水平捲動

   使用方式：
     <div className="min-h-screen relative isolate overflow-x-clip">
       <Aurora />
       <SiteTopBar />
       <main>...</main>
     </div>
   ============================================ */

type AuroraProps = {
  /**
   * 強度層級：
   * - normal  首頁 hero 用（視覺主角）
   * - subtle  內頁 hero 用（不搶戲）
   */
  intensity?: "normal" | "subtle";
};

export function Aurora({ intensity = "normal" }: AuroraProps) {
  const mix =
    intensity === "subtle"
      ? { a: 10, b: 6, c: 7 }
      : { a: 18, b: 10, c: 13 };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[1400px] -z-10"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 30%, transparent 95%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 30%, transparent 95%)",
      }}
    >
      {/* 主光源：右上，大而柔 — 模擬從角落灑下的光 */}
      <div
        className="absolute -top-40 -right-32 size-[720px] rounded-full blur-3xl"
        style={{
          backgroundColor: `color-mix(in oklch, var(--primary) ${mix.a}%, transparent)`,
        }}
      />
      {/* 輔光源：左中，補暗面 — 放在 hero 下方一點，延伸進下一個 section */}
      <div
        className="absolute top-[360px] -left-48 size-[620px] rounded-full blur-3xl"
        style={{
          backgroundColor: `color-mix(in oklch, var(--primary) ${mix.b}%, transparent)`,
        }}
      />
      {/* 點光源：畫面中央偏上，聚焦視覺重心 */}
      <div
        className="absolute top-[120px] left-[38%] size-[420px] rounded-full blur-3xl"
        style={{
          backgroundColor: `color-mix(in oklch, var(--primary) ${mix.c}%, transparent)`,
        }}
      />
    </div>
  );
}
