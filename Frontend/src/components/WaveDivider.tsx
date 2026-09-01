/**
 * WaveDivider — Ellipsus-style wavy SVG separator between sections.
 *
 * Place this between two sections whose backgrounds alternate
 * between two colours (e.g. white ↔ #f5f5f5). The SVG is
 * rendered full-width with zero height so it visually overlaps
 * the boundary. The `flip` prop mirrors the wave for the
 * reverse colour transition.
 */
interface WaveDividerProps {
  /** The colour the wave is coming FROM (top section bg) */
  topColor?: string;
  /** The colour the wave is going TO (bottom section bg) */
  bottomColor?: string;
  /** Flip the wave vertically (mirror) */
  flip?: boolean;
  /** Extra className on the wrapper */
  className?: string;
}

export default function WaveDivider({
  topColor = "#ffffff",
  bottomColor = "#f5f5f5",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{
        backgroundColor: topColor,
        marginTop: "-1px", // eliminates sub-pixel gap
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full"
        style={{
          height: "clamp(40px, 6vw, 100px)",
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        <path
          d="M0,0 C360,120 1080,0 1440,100 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
