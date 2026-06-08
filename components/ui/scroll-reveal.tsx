"use client";

/* ============================================
   ScrollReveal · 滾動進場包裝器（GSAP ScrollTrigger）
   -------------------------------------------
   把包住的內容在「捲動進入視窗」時才淡入上移，
   而不是頁面一載入就全部播完。

   兩種用法：
     - 不給 stagger → 整塊一起進場（適合單一區塊，如引言、CTA）
     - 給 stagger    → 改成對「直接子元素」逐一錯開進場（適合卡片網格）

   無障礙：prefers-reduced-motion: reduce 時完全不做動畫，
           內容直接顯示（對齊 globals.css 既有原則）。

   清理：useGSAP 會在元件卸載時自動 revert，
        另外明確 revert matchMedia 以防殘留的 ScrollTrigger。
   ============================================ */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 註冊一次即可（重複註冊安全）
gsap.registerPlugin(useGSAP, ScrollTrigger);

type ScrollRevealProps = {
  as?: "div" | "section" | "ul" | "li" | "article" | "header";
  /** 上移距離（px），預設 16 */
  y?: number;
  /** 給定時改為對「直接子元素」做錯開進場（秒），例如 0.1 */
  stagger?: number;
  /** 進場前的等待（秒），預設 0。觸發後等這段時間才播，可做區塊間節奏 */
  delay?: number;
  /** 進場時長（秒），預設 0.6 */
  duration?: number;
  /** 觸發點：trigger 位置 viewport 位置，預設 "top 85%" */
  start?: string;
  /** 進場一次後就不再反轉，預設 true */
  once?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ScrollReveal({
  as = "div",
  y = 16,
  stagger,
  delay = 0,
  duration = 0.6,
  start = "top 85%",
  once = true,
  className = "",
  children,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as React.ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // 只有「沒有指定減少動態」時才建立動畫；
      // reduce 模式下不碰元素，內容保持原本可見狀態。
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets =
          stagger != null ? Array.from(el.children) : el;

        // 先設隱藏起點（layout effect 在繪製前套用 → 不閃爍），
        // 再用 .to() 進場。終點是「可見」，所以即使 once 提前 kill、
        // 或使用者快速捲過整段，也不會彈回隱藏狀態（比 from() 穩健）。
        gsap.set(targets, { autoAlpha: 0, y });
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          delay,
          duration,
          ease: "power3.out", // = 設計系統 cubic-bezier(0.22,1,0.36,1)
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
