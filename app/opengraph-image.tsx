import { ImageResponse } from "next/og";

export const alt = "TrustGuard — A UX case study on making AI agents trustworthy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (next/og) 不支援 oklch，改用 hex。顏色對應 globals.css 的 dark token
const BG = "#1f1c19";
const FG = "#f2ecdf";
const PRIMARY = "#e9833d";
const MUTED = "#8a8275";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* 背景 radial 暈光 */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            background: `radial-gradient(circle, ${PRIMARY}22 0%, transparent 60%)`,
            display: "flex",
          }}
        />

        {/* Top row: label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: MUTED,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 32,
              height: 2,
              background: PRIMARY,
              display: "flex",
            }}
          />
          <span>Case Study · Web3 × Agentic AI</span>
        </div>

        {/* Middle: title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 24,
          }}
        >
          <div
            style={{
              color: FG,
              fontSize: 128,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -3,
              display: "flex",
            }}
          >
            TrustGuard
          </div>
          <div
            style={{
              color: FG,
              fontSize: 40,
              lineHeight: 1.3,
              letterSpacing: -0.5,
              maxWidth: 960,
              display: "flex",
            }}
          >
            Designing trust for AI agents that act on your behalf.
          </div>
        </div>

        {/* Bottom row: footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 48,
            paddingTop: 28,
            borderTop: `1px solid ${MUTED}33`,
            color: MUTED,
            fontSize: 22,
          }}
        >
          <span style={{ display: "flex" }}>
            Confidence · Consent · Panic
          </span>
          <span style={{ color: PRIMARY, display: "flex" }}>
            trustguard.design
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
