import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Zap, Sparkles } from "lucide-react";
import { introManager } from "@/lib/introState";

interface ByteBrawlHeroPopupProps {
  isMobile?: boolean;
}

export default function ByteBrawlHeroPopup({ isMobile = false }: ByteBrawlHeroPopupProps) {
  const navigate = useNavigate();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isWebsiteReady, setIsWebsiteReady] = useState(() => introManager.isDone());
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Show ONLY after the landing intro animation completely opens
  useEffect(() => {
    if (introManager.isDone()) {
      setIsWebsiteReady(true);
      return;
    }
    const unsub = introManager.subscribe((st) => {
      if (st === "done") {
        setTimeout(() => setIsWebsiteReady(true), 300);
      }
    });
    return unsub;
  }, []);

  // 3D Mouse Parallax Tilt (Desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rY = (x / (rect.width / 2)) * 10;
    const rX = -(y / (rect.height / 2)) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  if (!isWebsiteReady) {
    return null;
  }

  const containerClasses = isMobile
    ? "relative w-full max-w-[325px] mx-auto pointer-events-auto select-none mb-1"
    : "hidden lg:block absolute bottom-7 sm:bottom-9 xl:bottom-11 left-[39.5%] xl:left-[39.5%] 2xl:left-[40.5%] z-[30] pointer-events-auto w-[295px] xl:w-[300px] 2xl:w-[305px] select-none";

  const pillContainerClasses = isMobile
    ? "relative flex justify-center w-full pointer-events-auto my-2"
    : "hidden lg:block absolute bottom-7 sm:bottom-9 xl:bottom-11 left-[39.5%] xl:left-[39.5%] 2xl:left-[40.5%] z-[30] pointer-events-auto";

  return (
    <div className={isMobile ? "w-full flex justify-center" : "contents"}>
      <AnimatePresence>
        {!isDismissed ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={containerClasses}
            style={{ perspective: 1000 }}
          >
            {/* 3D Floating & Tilt Container */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              animate={{
                y: isHovered ? [0, -3, 0] : [0, -6, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transform: !isMobile
                  ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
                  : "none",
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out",
              }}
              className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-orange-500/60 via-amber-500/30 to-red-600/60 shadow-[0_12px_44px_rgba(0,0,0,0.9),0_0_32px_rgba(249,115,22,0.32)] backdrop-blur-2xl"
            >
              {/* Inner Cyber HUD Box */}
              <div className="relative rounded-2xl bg-[#0b0c13]/95 p-3.5 sm:p-4 overflow-hidden border border-orange-500/40">
                {/* 4 Cyber Tech Corner Brackets */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-orange-500 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-orange-500 pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-orange-500 pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-orange-500 pointer-events-none" />

                {/* Subtle Amber Glow Background */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none blur-3xl opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(249,115,22,0.9) 0%, rgba(239,68,68,0.4) 60%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Cyber Scanline Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)]"
                  style={{ backgroundSize: "100% 4px" }}
                  aria-hidden="true"
                />

                {/* TOP HEADER: Registrations Live + Heartbeat ECG + Reticle Red Close */}
                <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
                  {/* Left: Registrations Live Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-950/50 border border-orange-500/70 shadow-[0_0_10px_rgba(249,115,22,0.35)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 shadow-[0_0_6px_#f97316]" />
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] font-black text-amber-300 uppercase">
                      REGISTRATIONS LIVE
                    </span>
                  </div>

                  {/* Center: Amber Heartbeat Trace */}
                  <svg
                    className="w-8 sm:w-10 h-3 text-amber-400/80 stroke-current drop-shadow-[0_0_6px_rgba(249,115,22,0.5)] select-none pointer-events-none"
                    viewBox="0 0 50 16"
                    fill="none"
                  >
                    <path
                      d="M0 8h10l3-6 4 12 4-8 3 4h26"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Right: Red Reticle Crosshair Close Button */}
                  <div className="relative p-0.5">
                    <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-red-500 pointer-events-none" />
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-red-500 pointer-events-none" />
                    <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-red-500 pointer-events-none" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-red-500 pointer-events-none" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDismissed(true);
                      }}
                      aria-label="Minimize ByteBrawl Alert"
                      className="w-6 h-6 min-w-[24px] min-h-[24px] rounded bg-red-950/60 border border-red-500/70 hover:bg-red-900/70 hover:border-red-400 flex items-center justify-center text-red-400 hover:text-red-200 transition-all shadow-[0_0_8px_rgba(239,68,68,0.4)] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* CATEGORY: >_ [ FLAGSHIP HACKATHON ] */}
                <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase mb-1 relative z-10">
                  <span className="text-orange-500 font-bold">&gt;_</span>
                  <span className="px-1.5 py-0.5 rounded border border-orange-500/40 bg-orange-500/10 text-orange-300 font-bold">
                    [ FLAGSHIP HACKATHON ]
                  </span>
                </div>

                {/* TITLE ROW: ByteBrawl × Hacktoberfest with Tech lines and 01 indicator */}
                <div className="relative z-10 mb-1.5 text-left">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                      <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">ByteBrawl</span>{" "}
                      <span className="text-orange-500 font-normal">×</span>{" "}
                      <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]">
                        Hacktoberfest
                      </span>
                    </h3>
                    <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-orange-500/70 select-none">
                      <span>─</span>
                      <span>01</span>
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-300/85 mt-0.5 line-clamp-2 font-normal leading-relaxed">
                    Hackathon & Open-source sprint. Build, innovate, and compete for exciting awards.
                  </p>
                </div>

                {/* METADATA PILLS: Oct 2026 | Online + Onsite | Free Entry */}
                <div className="relative z-10 flex flex-wrap gap-1.5 mb-2.5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-orange-950/40 border border-orange-500/60 text-orange-300 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" /> Oct 2026
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-950/40 border border-purple-500/60 text-purple-200 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-300" /> Online + Onsite
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/60 text-emerald-300">
                    Free Entry
                  </span>
                </div>

                {/* ACTION BUTTONS: Sci-Fi Hazard Caution Mecha Button + Reticle Explore Button */}
                <div className="relative z-10 flex items-center gap-2">
                  {/* Primary CTA: Futuristic Sci-Fi Mecha Register Button with Caution Stripes */}
                  <button
                    onClick={() => navigate("/events/bytebrawl-hacktoberfest/register")}
                    className="flex-1 h-11 min-h-[44px] rounded-lg p-[1px] bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 shadow-[0_0_22px_rgba(249,115,22,0.6)] hover:shadow-[0_0_30px_rgba(249,115,22,0.85)] transition-all transform active:scale-95 cursor-pointer group flex items-center overflow-hidden"
                  >
                    {/* Left Hazard Stripes */}
                    <div className="w-4 h-full flex items-center justify-center bg-black/40 border-r border-orange-500/40 font-mono text-[8px] font-bold text-amber-400 select-none tracking-tighter">
                      ///
                    </div>

                    {/* Center Stepped Glowing Core */}
                    <div className="flex-1 h-full bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 flex items-center justify-center gap-1.5 px-2 text-white font-mono text-xs font-black tracking-wider uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      <span>REGISTER NOW ↗</span>
                      <span className="text-amber-200 font-extrabold">&gt;&gt;&gt;</span>
                    </div>

                    {/* Right Hazard Stripes */}
                    <div className="w-4 h-full flex items-center justify-center bg-black/40 border-l border-orange-500/40 font-mono text-[8px] font-bold text-amber-400 select-none tracking-tighter">
                      ///
                    </div>
                  </button>

                  {/* Secondary CTA: Reticle Wireframe Explore Button (No White Dot) */}
                  <button
                    onClick={() => navigate("/events/bytebrawl-hacktoberfest")}
                    className="relative px-3.5 h-11 min-h-[44px] rounded-lg bg-black/70 border border-neutral-700 hover:border-orange-500/70 flex items-center justify-center text-neutral-300 hover:text-white font-mono text-xs font-bold tracking-[0.16em] uppercase transition-colors cursor-pointer group"
                  >
                    {/* Corner Crosshairs */}
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-neutral-500 group-hover:border-orange-400" />
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-neutral-500 group-hover:border-orange-400" />
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-neutral-500 group-hover:border-orange-400" />
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-neutral-500 group-hover:border-orange-400" />
                    <span>EXPLORE</span>
                  </button>
                </div>

                {/* BOTTOM RIGHT DECAL: [SYS://BYTEBRAWL_v2] */}
                <div className="font-mono text-[8px] text-orange-500/60 select-none pointer-events-none text-right mt-1.5 mr-0.5 tracking-wider">
                  [SYS://BYTEBRAWL_v2]
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Minimized Floating Cyber Pill */
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={pillContainerClasses}
          >
            <button
              onClick={() => setIsDismissed(false)}
              className="group flex items-center gap-2 px-3.5 py-2 min-h-[44px] rounded-full bg-[#0a0a0e]/95 border border-orange-500/60 hover:border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.35)] backdrop-blur-xl text-white font-mono text-xs tracking-wider transition-all transform hover:scale-105 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-amber-300 font-semibold">BYTEBRAWL LIVE</span>
              <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
