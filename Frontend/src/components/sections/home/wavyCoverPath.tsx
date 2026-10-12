import React from "react";

/**
 * Mathematical wavy cover path built once from seeded noise (3 octaves, amplitude ~4-6% viewport height,
 * 4 soft drips of different lengths with round ends, feathered 8px).
 */
const W = 1920;
const H = 180;
const baseline = 125;

function noise(x: number): number {
  const normX = x / W;
  const o1 = 18 * Math.sin(normX * Math.PI * 2 * 1.5 + 0.4);
  const o2 = 10 * Math.sin(normX * Math.PI * 2 * 3.5 + 1.8);
  const o3 = 5 * Math.sin(normX * Math.PI * 2 * 7.0 + 3.2);
  return o1 + o2 + o3;
}

const drips = [
  { x: 340, w: 56, length: 75 },   // Drip 1: left
  { x: 780, w: 70, length: 98 },   // Drip 2: center-left, longest
  { x: 1260, w: 60, length: 82 },  // Drip 3: center-right
  { x: 1640, w: 48, length: 60 },  // Drip 4: right
];

function generateWavyPath(): string {
  const samples = 240;
  const pts: { x: number; y: number }[] = [];

  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * W;
    let y = baseline + noise(x);

    for (const drip of drips) {
      const dist = Math.abs(x - drip.x);
      const halfW = drip.w / 2;
      if (dist < halfW) {
        const t = dist / halfW;
        const shape = Math.cos((t * Math.PI) / 2);
        const roundCap = Math.sqrt(Math.max(0, 1 - t * t));
        const dripExt = drip.length * (0.3 * shape + 0.7 * roundCap);
        y -= dripExt;
      }
    }

    pts.push({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
    });
  }

  let d = `M 0 ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x} ${prev.y}, ${midX} ${midY}`;
  }
  d += ` L ${W} ${pts[pts.length - 1].y}`;
  d += ` L ${W} ${H + 20} L 0 ${H + 20} Z`;

  return d;
}

export const WAVY_COVER_PATH_D = generateWavyPath();

interface WavyCoverApronProps {
  apronRef?: React.RefObject<HTMLDivElement | null>;
}

export const WavyCoverApron: React.FC<WavyCoverApronProps> = ({ apronRef }) => {
  return (
    <div
      ref={apronRef as any}
      id="legacy-wavy-cover-apron"
      aria-hidden="true"
      className="absolute bottom-[calc(100%-2px)] left-0 right-0 h-[160px] pointer-events-none select-none overflow-visible origin-bottom will-change-transform z-30"
      style={{ transform: "scaleY(0.7)" }}
    >
      <svg
        viewBox="0 0 1920 180"
        preserveAspectRatio="none"
        className="w-full h-full block overflow-visible"
        style={{ filter: "drop-shadow(0 2px 0 #060606)" }}
      >
        <defs>
          <filter id="wavy-feather-filter" x="-5%" y="-15%" width="110%" height="135%">
            {/* 8px gaussian blur feather */}
            <feGaussianBlur stdDeviation="3.5" result="blur" />
          </filter>
        </defs>

        {/* Soft feathered wavy mask edge */}
        <path
          d={WAVY_COVER_PATH_D}
          fill="#060606"
          filter="url(#wavy-feather-filter)"
        />

        {/* Solid backing strip at bottom to prevent any bottom feather blur leak */}
        <rect x="0" y="170" width="1920" height="30" fill="#060606" />
      </svg>
    </div>
  );
};
