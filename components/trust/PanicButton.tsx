"use client";

/* ============================================
   TrustGuard · PanicButton
   -------------------------------------------
   「神聖紅按鈕」— 緊急撤銷 AI Agent 授權。
   全專案只有這一處允許大面積使用 panic 紅色。

   互動：
     - idle      靜止（輕微 panic-pulse 呼吸動畫）
     - holding   按住中（進度條從左往右填滿）
     - confirmed 撤銷完成（轉為綠勾，2 秒後回到 idle）

   為什麼要長按？避免誤觸 — 撤銷是極高成本動作，
   需要使用者「刻意」的動作才會觸發。
   ============================================ */

import { useEffect, useRef, useState } from "react";
import { ShieldOff, Check } from "lucide-react";

type Size = "sm" | "md" | "lg";
type Variant = "solid" | "outline";

type PanicButtonProps = {
  onRevoke?: () => void;
  label?: string;
  size?: Size;
  variant?: Variant;
  holdDuration?: number; // 長按毫秒數（預設 1500）
  disabled?: boolean;
  className?: string;
};

type State = "idle" | "holding" | "confirmed";

const sizeMap: Record<Size, { h: string; text: string; icon: string; px: string; gap: string }> = {
  sm: { h: "h-9",  text: "text-sm",   icon: "size-4",       px: "px-4", gap: "gap-2"   },
  md: { h: "h-12", text: "text-base", icon: "size-[18px]",  px: "px-5", gap: "gap-2.5" },
  lg: { h: "h-14", text: "text-lg",   icon: "size-5",       px: "px-6", gap: "gap-3"   },
};

export function PanicButton({
  onRevoke,
  label = "立即撤銷授權",
  size = "md",
  variant = "solid",
  holdDuration = 1500,
  disabled = false,
  className = "",
}: PanicButtonProps) {
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Unmount 時清空所有 timer
  useEffect(() => {
    return () => {
      cleanup();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const start = () => {
    if (disabled || state !== "idle") return;
    setState("holding");
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(elapsed / holdDuration, 1);
      setProgress(pct);
      if (pct >= 1) {
        // 讓填滿紅條多停留一瞬間，再切到 confirmed 綠色
        // 否則進度條還沒視覺化填滿就被綠色覆蓋
        timeoutRef.current = setTimeout(() => {
          setState("confirmed");
          onRevoke?.();
          timeoutRef.current = setTimeout(() => {
            setState("idle");
            setProgress(0);
          }, 2000);
        }, 180);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const cancel = () => {
    cleanup();
    // 若 grace period 的 timeout 還在排程中，也要清掉，
    // 否則使用者已放手，confirmed 仍會觸發
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (state === "holding") {
      setState("idle");
      setProgress(0);
    }
  };

  const s = sizeMap[size];
  const isConfirmed = state === "confirmed";
  const isHolding = state === "holding";
  const isIdle = state === "idle";

  // 顏色處理 — 撤銷完成轉綠，其餘一律 panic 紅
  const activeColor = isConfirmed ? "var(--success)" : "var(--panic)";

  const bgStyle: React.CSSProperties =
    variant === "solid"
      ? {
          backgroundColor: activeColor,
          color: "var(--panic-foreground)",
          borderColor: "transparent",
        }
      : {
          backgroundColor: "transparent",
          color: activeColor,
          borderColor: activeColor,
        };

  const idlePulseClass =
    isIdle && !disabled && variant === "solid" ? "animate-panic-pulse" : "";

  return (
    <button
      type="button"
      disabled={disabled || isConfirmed}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
          e.preventDefault();
          start();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") cancel();
      }}
      aria-pressed={isHolding}
      aria-label={label}
      className={[
        "relative overflow-hidden inline-flex items-center justify-center rounded-xl border-2 font-semibold select-none",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        idlePulseClass,
        s.h,
        s.text,
        s.px,
        s.gap,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...bgStyle,
        boxShadow: isHolding
          ? `0 0 0 4px color-mix(in oklch, var(--panic) 25%, transparent)`
          : undefined,
      }}
    >
      {/* 長按進度條 — 從左往右填滿
          不加 CSS transition：RAF 每幀都更新 progress，
          靠瀏覽器自己的 16ms 節奏就很順，多加 transition 反而會追不上。 */}
      {isHolding && (
        <span
          aria-hidden
          className="absolute inset-0 origin-left"
          style={{
            backgroundColor:
              variant === "solid"
                ? "color-mix(in oklch, white 18%, transparent)"
                : "color-mix(in oklch, var(--panic) 15%, transparent)",
            transform: `scaleX(${progress})`,
          }}
        />
      )}

      {/* 文字內容 — 依狀態切換 */}
      <span className={`relative inline-flex items-center ${s.gap}`}>
        {isConfirmed ? (
          <Check className={s.icon} />
        ) : (
          <ShieldOff className={s.icon} />
        )}
        <span>
          {isConfirmed
            ? "已撤銷授權"
            : isHolding
              ? "按住以確認…"
              : label}
        </span>
      </span>
    </button>
  );
}
