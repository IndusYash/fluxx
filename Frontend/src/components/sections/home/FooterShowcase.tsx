import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Container from "@/components/layout/Container";

export default function FooterShowcase() {
  const navigate = useNavigate();
  const scriptTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const track = scriptTrackRef.current;
    if (!track) return;

    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let pos = 0;
    let animId: number;

    const tick = () => {
      pos -= 0.65;
      const half = track.scrollWidth / 2;
      if (half > 0 && Math.abs(pos) >= half) {
        pos = 0;
      }
      track.style.transform = `translate3d(${pos}px, 0, 0)`;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const scriptMarqueeText =
    "Future Leaders of Unbound Xperiments — Innovate . Interact . Impact — ";

  return (
    <section
      id="footer-showcase-section"
      className="relative w-full min-h-[100svh] bg-[#060606] overflow-hidden flex flex-col items-center justify-center select-none pt-[calc(var(--nav-h)+48px)] pb-[calc(var(--ticker-h)+56px)] safe-section-py"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HUGE SCRIPT TEXT SCROLLING CONTINUOUSLY BEHIND (Desktop only)
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex absolute inset-0 items-center pointer-events-none z-0 overflow-hidden opacity-25">
        <div
          ref={scriptTrackRef}
          className="inline-flex whitespace-nowrap will-change-transform font-script text-[clamp(6rem,18vw,18rem)] text-white/50 leading-none"
          style={{
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
            color: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <span className="pr-12">{scriptMarqueeText}</span>
          <span className="pr-12">{scriptMarqueeText}</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. GRADIENT GLOW RISING FROM BOTTOM IN GREY/WHITE
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-[65vh] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 45%, transparent 85%)",
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. PERSISTENT GIANT CHROME 3D FLUX LOGO ANCHOR CENTERED (Desktop only)
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex relative z-10 w-full max-w-xl h-[36vh] min-h-[240px] items-center justify-center pointer-events-none mb-4 sm:mb-8">
        <div
          data-logo-anchor="footer"
          data-logo-scale="0.85"
          data-logo-opacity="1.0"
          className="w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] pointer-events-none"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. "LET'S CONNECT" BUTTON/CHIP & CONTACT LINKS BELOW
      ───────────────────────────────────────────────────────────── */}
      <Container className="relative z-20 flex flex-col items-center gap-6 mt-4 md:mt-6 pointer-events-auto">
        <button
          onClick={() => navigate("/contact")}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 bg-black/80 hover:bg-white hover:text-black text-white text-xs sm:text-sm font-mono uppercase tracking-[0.22em] backdrop-blur-md transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.15)] cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <span className="font-semibold">LET&apos;S CONNECT</span>
          <span className="transition-transform group-hover:translate-x-1">↗</span>
        </button>

        {/* Quick Contact Links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs md:text-[11px] font-mono tracking-widest text-white/70 uppercase">
          <a
            href="mailto:flux@mmmut.ac.in"
            className="hover:text-white transition-colors py-1.5 md:py-0 min-h-[44px] md:min-h-0 flex items-center"
          >
            FLUX@MMMUT.AC.IN
          </a>
          <span className="hidden md:inline text-white/30">•</span>
          <a
            href="https://www.linkedin.com/company/flux-mmm/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors py-1.5 md:py-0 min-h-[44px] md:min-h-0 flex items-center"
          >
            LINKEDIN
          </a>
          <span className="hidden md:inline text-white/30">•</span>
          <a
            href="https://www.instagram.com/flux.mmmut"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors py-1.5 md:py-0 min-h-[44px] md:min-h-0 flex items-center"
          >
            INSTAGRAM
          </a>
        </div>
      </Container>
    </section>
  );
}

