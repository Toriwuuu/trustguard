"use client";

/* ============================================
   Reveal · 入場動畫包裝器
   -------------------------------------------
   把子內容在「捲動進入視窗」時以 fade-up 呈現，
   可透過 delay (ms) 做多個區塊的 stagger 節奏。

   2026-06 升級：底層改用 GSAP ScrollTrigger（委派給 ScrollReveal），
   所以折線下方的內容會等捲到才進場，而不是一載入就全播。
   API 與舊版相容（as / delay(ms) / duration(ms) / className），
   既有頁面不需修改。仍尊重 prefers-reduced-motion。
   ============================================ */

import { ScrollReveal } from "@/components/ui/scroll-reveal";

type RevealProps = {
  as?: "div" | "section" | "article" | "li" | "header";
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  children: React.ReactNode;
};

export function Reveal({
  as = "div",
  delay = 0,
  duration,
  className = "",
  children,
}: RevealProps) {
  return (
    <ScrollReveal
      as={as}
      delay={delay / 1000}
      duration={duration ? duration / 1000 : undefined}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
}
