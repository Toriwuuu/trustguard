"use client";

/* ============================================
   RevealSections · 整頁區塊滾動進場
   -------------------------------------------
   放一個 <RevealSections /> 在頁面裡，就會讓該頁所有頂層
   <section>（預設 `#main-content > section`）在捲動進入視窗時
   逐一淡入上移。適合「一連串 section、本身沒有內層動畫」的長頁
   （如 research、design-system），不必逐個區塊手動包 ScrollReveal。

   機制與 ScrollReveal 一致：gsap.set() 設隱藏 + gsap.to() 進場
   （比 from() 穩健，快速捲過不會卡在隱藏），尊重 reduced-motion，
   useGSAP 自動清理。
   ============================================ */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealSectionsProps = {
  /** 要進場的元素選擇器，預設頁面主內容的頂層 section */
  selector?: string;
  /** 上移距離（px），預設 16 */
  y?: number;
};

export function RevealSections({
  selector = "#main-content > section",
  y = 16,
}: RevealSectionsProps) {
  useGSAP(() => {
    const els = gsap.utils.toArray<HTMLElement>(selector);
    if (!els.length) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      els.forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
