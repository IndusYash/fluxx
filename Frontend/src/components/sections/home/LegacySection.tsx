import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ConstructionLines from "@/components/ui/ConstructionLines";
import Container from "@/components/layout/Container";
import FloatingPlane, {
  type FloatingPlaneHandle,
  computePos,
  photos,
} from "@/components/3d/FloatingPlane";
import { resetThemeToDark } from "@/hooks/useLightSectionObserver";
import { SectionDissolveRenderer } from "@/components/ui/SectionDissolveRenderer";

export default function LegacySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const dissolveCanvasRef = useRef<HTMLCanvasElement>(null);
  const dissolveRendererRef = useRef<SectionDissolveRenderer | null>(null);

  const wordRef = useRef<HTMLHeadingElement>(null);
  const planeRef = useRef<FloatingPlaneHandle>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIdxRef = useRef(0);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = dissolveCanvasRef.current;
    if (!section) return;

    if (canvas) {
      dissolveRendererRef.current = new SectionDissolveRenderer(canvas);
    }

    const onResize = () => {
      dissolveRendererRef.current?.resize();
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger for the entire Legacy Section:
      // pinSpacing: false ensures WhatWeDoSection can arrive seamlessly at top: 0 underneath.
      // - p in [0.00, 0.24]: entrance from Liquid dissolve, hold card 0 static
      // - p in [0.24, 0.73]: advance through archive cards 01 -> 04
      // - p in [0.73, 0.80]: hold card 04 static & readable
      // - p in [0.80, 1.00]: organic single-wave noise dissolve reveals WhatWeDoSection in-place at top: 0
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=410%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Card reel progression:
          let reelP = 0;
          if (p > 0.24) {
            reelP = Math.min(1.0, (p - 0.24) / 0.49);
          }
          planeRef.current?.updateProgress(reelP);

          // Update active step for interactive tabs
          const calculatedPos = computePos(reelP);
          const step = Math.min(3, Math.max(0, Math.round(calculatedPos)));

          // Mutate bar widths directly for 60fps without React re-render
          for (let i = 0; i < 4; i++) {
            const bar = barRefs.current[i];
            if (bar) {
              let pct = 0;
              if (calculatedPos >= i + 1) pct = 100;
              else if (calculatedPos > i) pct = Math.round((calculatedPos - i) * 100);
              bar.style.width = `${pct}%`;
            }
          }

          if (step !== activeIdxRef.current) {
            activeIdxRef.current = step;
            setActiveIdx(step);
          }

          // 2. Dissolve phase into WhatWeDoSection:
          if (p > 0.80) {
            const c = Math.min(1.0, Math.max(0.0, (p - 0.80) / 0.20));
            dissolveRendererRef.current?.render(c);

            if (contentWrapperRef.current) {
              if (c >= 0.999) {
                contentWrapperRef.current.style.opacity = "0";
                section.style.visibility = "hidden";
              } else {
                section.style.visibility = "visible";
                const dissolvePct = Math.min(100, Math.max(0, c * 115));
                contentWrapperRef.current.style.maskImage = `linear-gradient(to top, transparent ${dissolvePct}%, black ${Math.min(100, dissolvePct + 5)}%)`;
                contentWrapperRef.current.style.webkitMaskImage = `linear-gradient(to top, transparent ${dissolvePct}%, black ${Math.min(100, dissolvePct + 5)}%)`;
                contentWrapperRef.current.style.opacity = "1";
                contentWrapperRef.current.style.transform = `scale(${1.0 - 0.015 * c}) translateY(${-1.5 * c}vh)`;
              }
            }

            // Smoothly dissolve left-column narrative as wave advances to eliminate headline collision
            if (leftColRef.current) {
              if (c > 0.15) {
                const fadeNorm = Math.min(1.0, (c - 0.15) / 0.40);
                leftColRef.current.style.opacity = `${Math.max(0, 1 - fadeNorm)}`;
              } else {
                leftColRef.current.style.opacity = "1";
              }
            }
          } else {
            dissolveRendererRef.current?.render(0);
            section.style.visibility = "visible";
            if (contentWrapperRef.current) {
              contentWrapperRef.current.style.opacity = "1";
              contentWrapperRef.current.style.transform = "none";
              contentWrapperRef.current.style.maskImage = "none";
              contentWrapperRef.current.style.webkitMaskImage = "none";
            }
            if (leftColRef.current) {
              leftColRef.current.style.opacity = "1";
            }
          }
        },
        onLeave: () => {
          section.style.visibility = "hidden";
          dissolveRendererRef.current?.render(1.0);
          resetThemeToDark();
        },
        onEnterBack: () => {
          section.style.visibility = "visible";
        },
        onLeaveBack: () => {
          // Handled by LiquidTransition reversal
        },
      });
      stRef.current = st;

      // Parallax float on the script word
      if (wordRef.current) {
        gsap.fromTo(
          wordRef.current,
          { y: 50, opacity: 0.08 },
          {
            y: -50,
            opacity: 0.18,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      dissolveRendererRef.current?.dispose();
      resetThemeToDark();
    };
  }, []);

  const handleJumpTo = (idx: number) => {
    const st = stRef.current;
    if (!st) return;
    const targetNorm = idx === 0 ? 0.24 : idx === 1 ? 0.40 : idx === 2 ? 0.57 : 0.73;
    const targetScroll = st.start + targetNorm * (st.end - st.start);

    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      id="legacy-section"
      ref={sectionRef}
      className="relative z-[35] w-full h-[100svh] min-h-[100svh] bg-transparent overflow-hidden flex items-center justify-center select-none safe-fullscreen"
    >
      {/* Content Wrapper subjected to organic noise dissolve mask */}
      <div
        ref={contentWrapperRef}
        className="absolute inset-0 w-full h-full bg-[#060606] overflow-hidden flex items-center justify-center pt-[calc(var(--nav-h)+16px)] pb-[calc(var(--ticker-h)+24px)] safe-section-py will-change-transform"
      >
        {/* 1. Behind: Construction Lines drawn on scroll (hidden on mobile) */}
        <div className="hidden md:block pointer-events-none">
          <ConstructionLines />
        </div>

        {/* Persistent Logo Anchor */}
        <div
          data-logo-anchor="about"
          data-logo-scale="0.38"
          data-logo-opacity="0.26"
          className="hidden lg:block absolute top-24 left-[var(--gutter)] w-[140px] h-[140px] pointer-events-none z-[1]"
        />

        {/* 2. Huge Script Word centered on black (hidden on mobile) */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h2
            ref={wordRef}
            className="font-script text-[clamp(7rem,22vw,24rem)] text-white select-none whitespace-nowrap leading-none will-change-transform"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.22)",
              color: "rgba(255, 255, 255, 0.09)",
            }}
          >
            Legacy
          </h2>
        </div>

        {/* 3. Main Content Grid Inside Container */}
        <Container className="relative z-20 w-full h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Narrative, Mission Badges & Interactive Archive Step Cards */}
            <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-center text-left will-change-opacity">
              <span className="inline-block self-start font-mono text-[9px] sm:text-xs tracking-[0.35em] text-white/60 uppercase mb-2 sm:mb-3 px-2 sm:px-3 py-0.5 sm:py-1 border border-white/10 bg-black/60 backdrop-blur-sm rounded-sm">
                // OUR ORIGIN &amp; FOUNDATIONS
              </span>

              <h3 className="font-sans font-medium text-lg sm:text-3xl lg:text-[2.5rem] text-white tracking-tight leading-snug mb-2 sm:mb-3">
                Built inside the Department of CSE at MMMUT Gorakhpur.
              </h3>

              {/* Heading and paragraph first on mobile & desktop */}
              <p className="block font-sans text-xs sm:text-sm text-neutral-300 md:text-neutral-400 font-light leading-relaxed max-w-xl mb-3 md:mb-4">
                FLUX was founded on a singular conviction: university students should not merely consume technology — they must engineer it. Through hands-on prototypes, competitive hackathons, mechanistic AI workshops, and faculty-guided research, we push boundaries and turn theoretical computer science into production software.
              </p>

              <div className="hidden sm:flex flex-wrap items-center gap-2.5 sm:gap-4 text-[10px] sm:text-[11px] font-mono tracking-widest text-white/60 uppercase mb-4 sm:mb-6">
                <span className="px-2.5 py-0.5 border border-white/10 bg-white/[0.02] rounded-sm">+ RESEARCH FIRST</span>
                <span className="px-2.5 py-0.5 border border-white/10 bg-white/[0.02] rounded-sm">+ OPEN SOURCE</span>
                <span className="px-2.5 py-0.5 border border-white/10 bg-white/[0.02] rounded-sm">+ REAL IMPACT</span>
              </div>

              {/* 4 Interactive Archive Cards: full-width rows on mobile (no 2x2 truncated grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 max-w-xl mb-3 lg:mb-0 w-full">
                {photos.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleJumpTo(idx)}
                    className={`group relative text-left p-2.5 sm:p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                      activeIdx === idx
                        ? "bg-white/10 border-white/40 text-white shadow-[0_0_24px_rgba(255,255,255,0.08)] scale-[1.01]"
                        : "bg-white/[0.02] border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest mb-1">
                      <span className={activeIdx === idx ? "text-white font-medium" : "text-white/40"}>
                        0{idx + 1} / 04
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          activeIdx === idx ? "bg-white scale-125" : "bg-white/20"
                        }`}
                      />
                    </div>
                    <h4 className="font-sans font-bold text-xs sm:text-sm tracking-wide text-white mb-0.5">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[10px] sm:text-[11px] text-neutral-400 line-clamp-1 font-light">
                      {item.desc}
                    </p>

                    {/* Progress bar inside card mutated directly via ref */}
                    <div className="mt-2 w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        ref={(el) => {
                          barRefs.current[idx] = el;
                        }}
                        className="h-full bg-white transition-none"
                        style={{ width: `${idx === 0 ? 100 : 0}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: 3D Card Reel */}
            <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[36vh] sm:h-[46vh] lg:h-[58vh]">
              <FloatingPlane ref={planeRef} />
            </div>
          </div>
        </Container>
      </div>

      {/* Full-Screen WebGL Dissolve Canvas Overlay */}
      <canvas
        ref={dissolveCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      />
    </section>
  );
}
