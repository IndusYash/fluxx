import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { LiquidShaderRenderer } from "./LiquidShader";
import { liquidController } from "./liquidController";

export default function LiquidTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  const eventsNumRef = useRef<HTMLSpanElement>(null);
  const membersNumRef = useRef<HTMLSpanElement>(null);
  const hackathonsNumRef = useRef<HTMLSpanElement>(null);
  const projectsNumRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Initialize WebGL Liquid Shader Renderer & register with liquidController
    const renderer = new LiquidShaderRenderer(canvas);
    liquidController.register(renderer);

    const onResize = () => {
      renderer.resize();
    };
    window.addEventListener("resize", onResize);

    // Scroll progress object
    const scrollObj = {
      fillProgress: 0,
      countEvents: 0,
      countMembers: 0,
      countHackathons: 0,
      countProjects: 0,
    };

    // 2. GSAP ScrollTrigger timeline pinned at top top
    // Entry range (0.0 to 0.40, ~48vh): fill (0 -> 1)
    // Hold range (0.40 to 1.0): hold at 1 while stats are visible
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          // Fill (0 -> 1) over first 40% of pinned distance; hold at 1 afterwards
          let currentLiquidP = 0;
          if (p <= 0.40) {
            currentLiquidP = p / 0.40;
          } else {
            currentLiquidP = 1.0;
          }

          scrollObj.fillProgress = currentLiquidP;
          liquidController.setProgress(currentLiquidP);

          // Zero-rerender DOM mutations directly into stat elements
          if (eventsNumRef.current) {
            eventsNumRef.current.textContent = `${Math.round(scrollObj.countEvents)}+`;
          }
          if (membersNumRef.current) {
            membersNumRef.current.textContent = `${Math.round(scrollObj.countMembers)}+`;
          }
          if (hackathonsNumRef.current) {
            hackathonsNumRef.current.textContent = `${Math.round(scrollObj.countHackathons)}+`;
          }
          if (projectsNumRef.current) {
            projectsNumRef.current.textContent = `${Math.round(scrollObj.countProjects)}+`;
          }
        },
        onLeave: () => {
          // Keep solid white when transitioning into LegacySection drain
          liquidController.forceState(1);
        },
        onLeaveBack: () => {
          // Returning back up into ScrollTextSection: strictly zero white pixels & hide overlay
          liquidController.forceState(0);
        },
        onEnterBack: () => {
          liquidController.forceState(1);
        },
      },
    });

    // Stats counter count-up while screen is solid white (0.38 to 0.82)
    tl.to(
      scrollObj,
      {
        countEvents: 25,
        countMembers: 500,
        countHackathons: 12,
        countProjects: 18,
        duration: 0.44,
        ease: "power2.out",
      },
      0.38
    );

    // Fade in and out stats container
    if (statsContainerRef.current) {
      tl.fromTo(
        statsContainerRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
        0.35
      );
      tl.to(
        statsContainerRef.current,
        { opacity: 0, y: -24, duration: 0.12, ease: "power2.in" },
        0.88
      );
    }

    return () => {
      window.removeEventListener("resize", onResize);
      tl.kill();
      liquidController.unregister(renderer);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="liquid-transition-section"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060606] overflow-hidden select-none safe-fullscreen"
    >
      {/* Background hint before liquid fills */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <span className="font-mono text-xs tracking-[0.4em] uppercase text-white/40">
          // SCROLL TO DISCOVER CLUB METRICS
        </span>
      </div>

      {/* Full-Screen WebGL Liquid Mask Overlay */}
      <div
        id="flux-liquid-portal"
        className="fixed inset-0 pointer-events-none z-[25] overflow-hidden"
        style={{ visibility: "hidden" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none"
        />
      </div>

      {/* Stats container appearing on top of the solid white liquid */}
      <div
        ref={statsContainerRef}
        data-theme="light"
        className="relative z-30 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center pointer-events-none pt-[calc(var(--nav-h)+24px)] pb-[calc(var(--ticker-h)+24px)]"
        style={{ opacity: 0 }}
      >
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-600 mb-2">
            DEPARTMENT OF CSE // MMMUT GORAKHPUR
          </p>
          <h3 className="font-sans font-black text-2xl sm:text-4xl tracking-tight uppercase text-black">
            PROVEN STUDENT IMPACT
          </h3>
        </div>

        {/* 
          Fixed-width column CSS grid: 
          4 equal columns on desktop, 2x2 on narrow screens.
          Gap: clamp(24px, 4vw, 72px)
        */}
        <div id="stats-grid-container" className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(24px,4vw,72px)] w-full max-w-6xl mx-auto">
          {/* Stat 1: Events */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative flex items-center justify-center mb-2">
              {/* Invisible placeholder reserving final width to eliminate layout shift */}
              <span
                aria-hidden="true"
                className="font-script text-[clamp(48px,5.4vw,96px)] leading-none drop-shadow-sm tracking-[0.02em] invisible select-none"
              >
                25+
              </span>
              <span
                ref={eventsNumRef}
                className="font-script text-[clamp(48px,5.4vw,96px)] text-black leading-none drop-shadow-sm tracking-[0.02em] absolute inset-0 flex items-center justify-center"
              >
                0+
              </span>
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black whitespace-nowrap">
              TECH CONCLAVES &amp; EVENTS
            </span>
            <span className="font-mono text-[11px] sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1.5 whitespace-nowrap">
              INCLUDING ATAL FDP &amp; SHE LEADS
            </span>
          </div>

          {/* Stat 2: Members */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative flex items-center justify-center mb-2">
              <span
                aria-hidden="true"
                className="font-script text-[clamp(48px,5.4vw,96px)] leading-none drop-shadow-sm tracking-[0.02em] invisible select-none"
              >
                500+
              </span>
              <span
                ref={membersNumRef}
                className="font-script text-[clamp(48px,5.4vw,96px)] text-black leading-none drop-shadow-sm tracking-[0.02em] absolute inset-0 flex items-center justify-center"
              >
                0+
              </span>
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black whitespace-nowrap">
              STUDENT DEVELOPERS
            </span>
            <span className="font-mono text-[11px] sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1.5 whitespace-nowrap">
              ACROSS B.TECH &amp; M.TECH
            </span>
          </div>

          {/* Stat 3: Hackathons */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative flex items-center justify-center mb-2">
              <span
                aria-hidden="true"
                className="font-script text-[clamp(48px,5.4vw,96px)] leading-none drop-shadow-sm tracking-[0.02em] invisible select-none"
              >
                12+
              </span>
              <span
                ref={hackathonsNumRef}
                className="font-script text-[clamp(48px,5.4vw,96px)] text-black leading-none drop-shadow-sm tracking-[0.02em] absolute inset-0 flex items-center justify-center"
              >
                0+
              </span>
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black whitespace-nowrap">
              HACKATHONS &amp; SPRINTS
            </span>
            <span className="font-mono text-[11px] sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1.5 whitespace-nowrap">
              IDEATHON, BYTEBRAWL &amp; MORE
            </span>
          </div>

          {/* Stat 4: Projects & Papers */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative flex items-center justify-center mb-2">
              <span
                aria-hidden="true"
                className="font-script text-[clamp(48px,5.4vw,96px)] leading-none drop-shadow-sm tracking-[0.02em] invisible select-none"
              >
                18+
              </span>
              <span
                ref={projectsNumRef}
                className="font-script text-[clamp(48px,5.4vw,96px)] text-black leading-none drop-shadow-sm tracking-[0.02em] absolute inset-0 flex items-center justify-center"
              >
                0+
              </span>
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black whitespace-nowrap">
              RESEARCH BUILDS &amp; PAPERS
            </span>
            <span className="font-mono text-[11px] sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1.5 whitespace-nowrap">
              AI, MECHANISTIC INT. &amp; SYSTEMS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
