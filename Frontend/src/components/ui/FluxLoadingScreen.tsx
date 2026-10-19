import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FluxLoadingScreenProps {
  text?: string;
  subText?: string;
  fullScreen?: boolean;
}

export default function FluxLoadingScreen({
  text = "BYTEBRAWL X HACKTOBERFEST",
  subText = "MMMUT COMPUTER SCIENCE & ENGINEERING // ECOSYSTEM TELEMETRY",
  fullScreen = true,
}: FluxLoadingScreenProps) {
  const [progress, setProgress] = useState(15);
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Smooth progress tick
    const pTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const jump = Math.floor(Math.random() * 12) + 5;
        return Math.min(95, prev + jump);
      });
    }, 180);

    // Monospace animated ellipsis
    const dTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 280);

    return () => {
      clearInterval(pTimer);
      clearInterval(dTimer);
    };
  }, []);

  // Compute number of filled blocks in the 20-segment cyber bar
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const progressBarString = "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);

  const containerClasses = fullScreen
    ? "fixed inset-0 z-[99999] w-screen h-screen min-h-[100svh] bg-[#050508] flex flex-col items-center justify-center select-none overflow-hidden"
    : "relative w-full min-h-[360px] py-16 bg-[#050508] flex flex-col items-center justify-center select-none overflow-hidden rounded-2xl border border-white/10";

  return (
    <div className={containerClasses}>
      {/* 1. Subtle High-Tech Cyber Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* 2. Soft Neutral Silver Radial Core Glow (No Blue) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none blur-[90px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(200,200,200,0.04) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Center Cyber Animation Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* Holographic Stepped FLUX Emblem */}
        <div className="relative w-24 h-24 mb-7 flex items-center justify-center">
          {/* Pulsing Outer Rings */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-2xl border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
          />

          <motion.div
            animate={{
              scale: [1.12, 1, 1.12],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute -inset-2 rounded-3xl border border-white/15"
          />

          {/* SVG Animated Geometric FLUX Mark */}
          <svg
            viewBox="0 0 250 250"
            className="w-14 h-14 relative z-10 drop-shadow-[0_0_16px_rgba(255,255,255,0.7)]"
            fill="none"
          >
            {/* 7 Animated Pixel Rectangles */}
            {[
              { x: 0, y: 0, w: 50, h: 50, delay: 0 },
              { x: 100, y: 0, w: 150, h: 50, delay: 0.15 },
              { x: 50, y: 50, w: 50, h: 50, delay: 0.3 },
              { x: 0, y: 100, w: 50, h: 50, delay: 0.45 },
              { x: 150, y: 100, w: 100, h: 50, delay: 0.6 },
              { x: 100, y: 150, w: 50, h: 50, delay: 0.75 },
              { x: 0, y: 200, w: 100, h: 50, delay: 0.9 },
            ].map((r, idx) => (
              <motion.rect
                key={idx}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={2}
                initial={{ fill: "#ffffff", opacity: 0.4 }}
                animate={{
                  fill: ["#ffffff", "#e5e5e5", "#ffffff"],
                  opacity: [0.45, 1, 0.45],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: r.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>

          {/* Horizontal Laser Scanning Line sweeping across the emblem (Monochrome) */}
          <motion.div
            animate={{
              y: [-38, 38, -38],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 -translate-x-1/2 w-28 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_#ffffff] pointer-events-none"
          />
        </div>

        {/* Dynamic Target Section / Page Header */}
        <h2 className="font-mono font-bold text-sm sm:text-base tracking-[0.24em] text-white uppercase mb-3">
          {text}
          <span className="inline-block w-4 text-white/90 text-left">{dots}</span>
        </h2>

        {/* Monospace Cyber Progress Bar (Pure Monochrome White/Silver - No Blue) */}
        <div className="w-full max-w-xs mb-3 font-mono text-xs text-neutral-300">
          <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1.5 font-mono tracking-widest uppercase">
            <span>[ INITIALIZING ]</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/20">
            <motion.div
              className="h-full bg-gradient-to-r from-white/40 via-white to-white/95 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.85)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
          <div className="mt-1.5 text-[10px] tracking-widest text-neutral-500 text-center font-mono select-none">
            {progressBarString}
          </div>
        </div>

        {/* Institutional Sub-caption */}
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-neutral-400/80 uppercase">
          {subText}
        </p>
      </div>

      {/* Cyber Corner Decals */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-white/20 select-none hidden sm:block">
        ┌─ [SEC://NODE_01]
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-white/20 select-none hidden sm:block text-right">
        [SYS://VER_2026] ─┐
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-white/20 select-none hidden sm:block">
        └─ [DEPT://CSED_MMMUT]
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/20 select-none hidden sm:block text-right">
        [PROTOCOL://TLS_READY] ─┘
      </div>
    </div>
  );
}
