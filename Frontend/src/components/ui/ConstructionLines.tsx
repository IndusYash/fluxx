import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ConstructionLinesProps {
  className?: string;
}

export default function ConstructionLines({ className = "" }: ConstructionLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll(".anim-line");
    if (paths.length === 0) return;

    paths.forEach((path) => {
      const length = (path as SVGGeometryElement).getTotalLength?.() || 800;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Large X Diagonal construction lines */}
      <line
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
        stroke="rgba(255, 255, 255, 0.10)"
        strokeWidth="1"
        className="anim-line"
      />
      <line
        x1="100%"
        y1="0%"
        x2="0%"
        y2="100%"
        stroke="rgba(255, 255, 255, 0.10)"
        strokeWidth="1"
        className="anim-line"
      />

      {/* Center crosshair lines */}
      <line
        x1="50%"
        y1="5%"
        x2="50%"
        y2="95%"
        stroke="rgba(255, 255, 255, 0.10)"
        strokeWidth="1"
        strokeDasharray="4 8"
      />
      <line
        x1="5%"
        y1="50%"
        x2="95%"
        y2="50%"
        stroke="rgba(255, 255, 255, 0.10)"
        strokeWidth="1"
        strokeDasharray="4 8"
      />

      {/* Nested Squares / Rectangles */}
      <rect
        x="15%"
        y="12%"
        width="70%"
        height="76%"
        fill="none"
        stroke="rgba(255, 255, 255, 0.10)"
        strokeWidth="1"
        className="anim-line"
      />
      <rect
        x="28%"
        y="22%"
        width="44%"
        height="56%"
        fill="none"
        stroke="rgba(255, 255, 255, 0.09)"
        strokeWidth="1"
        className="anim-line"
      />

      {/* Corner crosshair ticks (+) */}
      {[
        { x: "15%", y: "12%" },
        { x: "85%", y: "12%" },
        { x: "15%", y: "88%" },
        { x: "85%", y: "88%" },
        { x: "50%", y: "50%" },
      ].map((pt, i) => (
        <g key={i} style={{ transform: `translate(${pt.x}, ${pt.y})` }}>
          <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

