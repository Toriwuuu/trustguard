"use client";

/* ============================================
   Aurora · Hero 背景環境光暈
   -------------------------------------------
   參考 Linear 的 hero 光效 + Anthropic 的暖色調。

   架構重點：
     · 放在「頁面根部」而非 section 裡 —— 避免被 section 切斷
     · 自帶 mask linear-gradient，從上往下自然淡出
     · 容器高度 1400px，已足夠覆蓋 hero 並溢入下一個 section
     · overflow 交由父層 `overflow-x-clip` 處理水平捲動

   parallax（選用）：
     · 開啟後，三層光暈會隨捲動以「不同速度」微幅上移，做出景深
     · 純背景裝飾，位移量克制（≤12%），不搶內容
     · 用 GSAP ScrollTrigger scrub；尊重 prefers-reduced-motion

   使用方式：
     <div className="min-h-screen relative isolate overflow-x-clip">
       <Aurora parallax />        // 首頁：有 parallax
       <SiteTopBar />
       <main>...</main>
     </div>
   ============================================ */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AuroraProps = {
  /**
   * 強度層級：
   * - normal  首頁 hero 用（視覺主角）
   * - subtle  內頁 hero 用（不搶戲）
   */
  intensity?: "normal" | "subtle";
  /** 是否啟用捲動視差，預設關閉（內頁靜態） */
  parallax?: boolean;
};

export function Aurora({ intensity = "normal", parallax = false }: AuroraProps) {
  const mix =
    intensity === "subtle"
      ? { a: 10, b: 6, c: 7 }
      : { a: 18, b: 10, c: 13 };

  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!parallax) return;
      const el = ref.current;
      if (!el) return;
      const layers = gsap.utils.toArray<HTMLElement>(el.children);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 三層各自不同速度 → 景深；數字越大移得越多（越「近」）
        gsap.to(layers, {
          yPercent: (i) => [-6, -12, -9][i] ?? -8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [parallax] },
  );

  return (
    <div
      ref={ref}
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
