import React from "react";

interface PaintEdgeDividerProps {
  topColor?: string;
  bottomColor?: string;
  flip?: boolean;
  className?: string;
}

/**
 * PaintEdgeDivider — Organic rough paint / torn edge divider
 * Matches the FLUX dark metallic aesthetics between sections.
 */
export default function PaintEdgeDivider({
  topColor = "#060606",
  bottomColor = "#0d0d0d",
  flip = false,
  className = "",
}: PaintEdgeDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] pointer-events-none select-none z-10 ${className}`}
      style={{
        backgroundColor: topColor,
        marginTop: "-1px",
        marginBottom: "-1px",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full"
        style={{
          height: "clamp(24px, 4vw, 56px)",
          transform: flip ? "scaleY(-1) scaleX(-1)" : undefined,
        }}
      >
        <path
          d="M0,0 C90,32 180,12 270,38 C360,60 450,22 540,46 C630,68 720,16 810,42 C900,64 990,26 1080,48 C1170,68 1260,18 1350,40 C1395,50 1440,24 1440,24 L1440,72 L0,72 Z"
          fill={bottomColor}
        />
        {/* Subtle accent highlight line */}
        <path
          d="M0,0 C90,32 180,12 270,38 C360,60 450,22 540,46 C630,68 720,16 810,42 C900,64 990,26 1080,48 C1170,68 1260,18 1350,40 C1395,50 1440,24 1440,24"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

