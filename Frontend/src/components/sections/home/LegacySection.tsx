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

export default function LegacySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const planeRef = useRef<FloatingPlaneHandle>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [posValue, setPosValue] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Pinned ScrollTrigger for the entire Legacy Section:
      // Pins the section to scrub through all 4 archive photos before moving to the next section
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=260%",
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          // Update the 3D card reel
          planeRef.current?.updateProgress(p);

          // Update active step for interactive tabs
          const calculatedPos = computePos(p);
          setPosValue(calculatedPos);
          const step = Math.min(3, Math.max(0, Math.round(calculatedPos)));
          setActiveIdx(step);
        },
      });
      stRef.current = st;

      // 2. Parallax float on the huge script word
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

    // Refresh triggers and notify Lenis
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      if ((window as any).__lenis) {
        (window as any).__lenis.resize();
      }
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleJumpTo = (idx: number) => {
    const st = stRef.current;
    if (!st) return;
    // Map idx to scrub progress:
    // idx 0 -> 0.04, idx 1 -> 0.38, idx 2 -> 0.71, idx 3 -> 0.96
    const targetP = idx === 0 ? 0.04 : idx === 1 ? 0.38 : idx === 2 ? 0.71 : 0.96;
    const targetScroll = st.start + targetP * (st.end - st.start);

    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const getBarProgress = (idx: number) => {
    if (posValue < idx) return 0;
    if (posValue >= idx + 1) return 100;
    return Math.round((posValue - idx) * 100);
  };

  return (
    <section
      id="legacy-section"
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[100svh] bg-[#060606] overflow-hidden flex items-center justify-center select-none pt-[calc(var(--nav-h)+16px)] pb-[calc(var(--ticker-h)+24px)] safe-section-py"
    >
      {/* 1. Behind: Construction Lines drawn on scroll */}
      <ConstructionLines />

      {/* Persistent Logo Anchor: parked subtly in the upper area */}
      <div
        data-logo-anchor="about"
        data-logo-scale="0.38"
        data-logo-opacity="0.26"
        className="hidden lg:block absolute top-24 left-[var(--gutter)] w-[140px] h-[140px] pointer-events-none z-[1]"
      />

      {/* 2. Huge Script Word centered on black (15% opacity range) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
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
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="inline-block self-start font-mono text-[9px] sm:text-xs tracking-[0.35em] text-white/60 uppercase mb-2 sm:mb-3 px-2 sm:px-3 py-0.5 sm:py-1 border border-white/10 bg-black/60 backdrop-blur-sm rounded-sm">
              // OUR ORIGIN & FOUNDATIONS
            </span>

            <h3 className="font-sans font-medium text-lg sm:text-3xl lg:text-[2.5rem] text-white tracking-tight leading-snug mb-2 sm:mb-3">
              Built inside the Department of CSE at MMMUT Gorakhpur.
            </h3>

            <p className="hidden md:block font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl mb-4">
              FLUX was founded on a singular conviction: university students should not merely consume technology — they must engineer it. Through hands-on prototypes, competitive hackathons, mechanistic AI workshops, and faculty-guided research, we push boundaries and turn theoretical computer science into production software.
            </p>

            <div className="hidden sm:flex flex-wrap items-center gap-2.5 sm:gap-4 text-[10px] sm:text-[11px] font-mono tracking-widest text-white/60 uppercase mb-4 sm:mb-6">
              <span className="px-2.5 py-0.5 border border-white/10 bg-white/[0.02] rounded-sm">+ RESEARCH FIRST</span>
              <span className="px-2.5 py-0.5 border border-white/10 bg-white/[0.02] rounded-sm">+ OPEN SOURCE</span>
              <span className="px-2.5 py-0.5 border border-white/10 bg-white/[0.02] rounded-sm">+ REAL IMPACT</span>
            </div>

            {/* 4 Interactive Archive Cards synced to Scroll */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-xl mb-3 lg:mb-0">
              {photos.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpTo(idx)}
                  className={`group relative text-left p-2.5 sm:p-3 rounded-lg border transition-all duration-300 ${
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
                        activeIdx === idx ? "bg-white ring-2 ring-white/40" : "bg-white/20"
                      }`}
                    />
                  </div>
                  <div className="font-sans font-medium text-xs sm:text-sm tracking-tight truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-mono text-white/50 tracking-wider truncate mt-0.5">
                    {item.label.split("//")[0]?.trim()}
                  </div>
                  {/* Real-time scrub progress bar */}
                  <div className="mt-2 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100 ease-out"
                      style={{ width: `${getBarProgress(idx)}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: 3D FloatingPlane image reel */}
          <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
            <FloatingPlane ref={planeRef} />
          </div>
        </div>
      </Container>
    </section>
  );
}
