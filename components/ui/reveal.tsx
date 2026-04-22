/* ============================================
   Reveal · 入場動畫包裝器
   -------------------------------------------
   把子內容在 mount 時以 fade-up 呈現，
   可透過 delay (ms) 做多個區塊的 stagger 節奏。
   以純 CSS 動畫實作 — 比 framer-motion 省；
   尊重 prefers-reduced-motion。
   ============================================ */

type RevealProps = {
  as?: "div" | "section" | "article" | "li" | "header";
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  children: React.ReactNode;
};

export function Reveal({
  as: Tag = "div",
  delay = 0,
  duration,
  className = "",
  children,
}: RevealProps) {
  return (
    <Tag
      className={`animate-fade-up ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        ...(duration ? { animationDuration: `${duration}ms` } : {}),
      }}
    >
      {children}
    </Tag>
  );
}
