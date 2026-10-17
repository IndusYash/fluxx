import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { LiquidShaderRenderer } from "./LiquidShader";
import { liquidController } from "./liquidController";
import { resetThemeToDark, setCoverProgress } from "@/hooks/useLightSectionObserver";

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

    // Scroll progress object for counting up stats
    const scrollObj = {
      fillProgress: 0,
      countEvents: 0,
      countMembers: 0,
      countHackathons: 0,
      countProjects: 0,
    };

    // 2. GSAP ScrollTrigger timeline pinned at top top with pinSpacing: false
    // Total distance: 200% (~200vh of scroll)
    // - Entry fill range: 0.0 to 0.22 (~44vh): liquid fills (0 -> 1), stats fade in and count up
    // - Hold range: 0.22 to 0.50 (~56vh): hold readable stats on solid white while About aligns underneath
    // - Dissolve range: 0.50 to 1.0 (~100vh): organic FBM noise dissolve reveals stationary About section underneath
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Liquid Fill: 0.0 -> 0.22 (~44vh of scroll)
          let currentLiquidP = 0;
          if (p <= 0.22) {
            currentLiquidP = p / 0.22;
          } else {
            currentLiquidP = 1.0;
          }

          scrollObj.fillProgress = currentLiquidP;

          // Direct count calculation: finish counting by p = 0.22, hold steady at full target values afterwards
          let countE = 25;
          let countM = 500;
          let countH = 12;
          let countP = 18;

          if (p < 0.22) {
            const t = p / 0.22;
            const easeT = 1 - (1 - t) * (1 - t);
            countE = Math.round(25 * easeT);
            countM = Math.round(500 * easeT);
            countH = Math.round(12 * easeT);
            countP = Math.round(18 * easeT);
          }

          // Zero-rerender DOM mutations directly into stat elements
          if (eventsNumRef.current) {
            eventsNumRef.current.textContent = `${countE}+`;
          }
          if (membersNumRef.current) {
            membersNumRef.current.textContent = `${countM}+`;
          }
          if (hackathonsNumRef.current) {
            hackathonsNumRef.current.textContent = `${countH}+`;
          }
          if (projectsNumRef.current) {
            projectsNumRef.current.textContent = `${countP}+`;
          }

          // Stats container fade in during liquid fill (0.08 to 0.22)
          if (p <= 0.22) {
            liquidController.setProgress(currentLiquidP, 0);
            if (statsContainerRef.current) {
              statsContainerRef.current.style.visibility = "visible";
              statsContainerRef.current.style.maskImage = "none";
              statsContainerRef.current.style.webkitMaskImage = "none";
              if (p < 0.08) {
                statsContainerRef.current.style.opacity = "0";
                statsContainerRef.current.style.transform = "scale(1) translateY(24px)";
              } else {
                const fadeInNorm = (p - 0.08) / 0.14;
                statsContainerRef.current.style.opacity = `${fadeInNorm}`;
                statsContainerRef.current.style.transform = `scale(1) translateY(${24 * (1 - fadeInNorm)}px)`;
              }
            }
          }

          // 2. Hold range: 0.22 to 0.50 (~56vh of scroll)
          // Solid white, static readable numbers
          if (p > 0.22 && p <= 0.50) {
            liquidController.setProgress(1.0, 0);
            setCoverProgress(0.0);
            if (statsContainerRef.current) {
              statsContainerRef.current.style.visibility = "visible";
              statsContainerRef.current.style.opacity = "1";
              statsContainerRef.current.style.transform = "scale(1) translateY(0vh)";
              statsContainerRef.current.style.maskImage = "none";
              statsContainerRef.current.style.webkitMaskImage = "none";
            }
          }

          // 3. Dissolve range: 0.50 to 1.0 (~100vh of scroll)
          // White Stats screen and numbers dissolve away via organic FBM noise shader,
          // revealing the stationary About section underneath at top: 0
          if (p > 0.50) {
            const c = Math.min(1.0, Math.max(0.0, (p - 0.50) / 0.50));
            liquidController.setProgress(1.0, c);
            setCoverProgress(c);

            if (statsContainerRef.current) {
              if (c >= 0.999) {
                statsContainerRef.current.style.opacity = "0";
                statsContainerRef.current.style.visibility = "hidden";
              } else {
                statsContainerRef.current.style.visibility = "visible";
                const dissolvePct = Math.min(100, Math.max(0, c * 115));
                statsContainerRef.current.style.maskImage = `linear-gradient(to top, transparent ${dissolvePct}%, black ${Math.min(100, dissolvePct + 15)}%)`;
                statsContainerRef.current.style.webkitMaskImage = `linear-gradient(to top, transparent ${dissolvePct}%, black ${Math.min(100, dissolvePct + 15)}%)`;
                statsContainerRef.current.style.opacity = `${Math.max(0, 1 - c * 1.15)}`;
                statsContainerRef.current.style.transform = `scale(${1.0 - 0.02 * c}) translateY(${-2 * c}vh)`;
              }
            }
          }
        },
        onLeave: () => {
          liquidController.setProgress(1.0, 1.0);
          setCoverProgress(1.0);
          if (statsContainerRef.current) {
            statsContainerRef.current.style.visibility = "hidden";
          }
        },
        onLeaveBack: () => {
          liquidController.forceState(0);
          setCoverProgress(0.0);
          resetThemeToDark();
        },
        onEnterBack: () => {
          if (statsContainerRef.current) {
            statsContainerRef.current.style.visibility = "visible";
          }
        },
      },
    });

    return () => {
      window.removeEventListener("resize", onResize);
      tl.kill();
      liquidController.forceState(0);
      resetThemeToDark();
      liquidController.unregister(renderer);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="liquid-transition-section"
      ref={containerRef}
      className="relative z-[40] w-full h-screen bg-transparent overflow-hidden select-none safe-fullscreen"
    >
      {/* Background hint before liquid fills */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <span className="font-mono text-xs tracking-[0.4em] uppercase text-white/40">
          // SCROLL TO DISCOVER CLUB METRICS
        </span>
      </div>

      {/* Full-Screen WebGL Liquid & Dissolve Mask Overlay */}
      <div
        id="flux-liquid-portal"
        className="fixed inset-0 pointer-events-none z-[38] overflow-hidden"
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
        className="relative z-[39] w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center pointer-events-none pt-[calc(var(--nav-h)+24px)] pb-[calc(var(--ticker-h)+24px)]"
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
        <div id="stats-grid-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-[clamp(24px,4vw,72px)] w-full max-w-6xl mx-auto">
          {/* Stat 1: Events */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative flex items-center justify-center mb-1 md:mb-2">
              {/* Invisible placeholder reserving final width to eliminate layout shift */}
              <span
                aria-hidden="true"
                className="font-poiret text-[clamp(40px,5.6vw,96px)] md:text-[clamp(48px,5.6vw,96px)] leading-none drop-shadow-sm tracking-[0.02em] invisible select-none"
              >
                25+
              </span>
              <span
                ref={eventsNumRef}
                className="font-poiret text-[clamp(40px,5.6vw,96px)] md:text-[clamp(48px,5.6vw,96px)] text-black leading-none drop-shadow-sm tracking-[0.02em] absolute inset-0 flex items-center justify-center"
              >
                0+
              </span>
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black max-md:whitespace-normal whitespace-nowrap text-center max-md:max-w-xs">
              TECH CONCLAVES &amp; EVENTS
            </span>
            <span className="font-mono text-[11px] sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1 md:mt-1.5 max-md:whitespace-normal whitespace-nowrap text-center max-md:max-w-xs max-md:line-clamp-2">
              INCLUDING ATAL FDP &amp; SHE LEADS
            </span>
          </div>

          {/* Stat 2: Members */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative flex items-center justify-center mb-1 md:mb-2">
              <span
                aria-hidden="true"
                className="font-poiret text-[clamp(40px,5.6vw,96px)] md:text-[clamp(48px,5.6vw,96px)] leading-none drop-shadow-sm tracking-[0.02em] invisible select-none"
              >
                500+
              </span>
              <span
                ref={membersNumRef}
                className="font-poiret text-[clamp(40px,5.6vw,96px)] md:text-[clamp(48px,5.6vw,96px)] text-black leading-none drop-shadow-sm tracking-[0.02em] absolute inset-0 flex items-center justify-center"
              >
                0+
              </span>
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black max-md:whitespace-normal whitespace-nowrap text-center max-md:max-w-xs">
              STUDENT DEVELOPERS
            </span>
            <span className="font-mono text-[11px] sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1 md:mt-1.5 max-md:whitespace-normal whitespace-nowrap text-center max-md:max-w-xs max-md:line-clamp-2">
              ACROSS B.TECH &amp; M.TECH
            </span>
          </div>

          {/* Stat 3: Hackathons */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative flex items-center justify-center mb-1 md:mb-2">
              <span
                aria-hidden="true"
                className="font-poiret text-[clamp(40px,5.6vw,96px)] md:text-[clamp(48px,5.6vw,96px)] leading-none drop-shadow-sm tracking-[0.02em] invisible select-none"
              >
                12+
              </span>
              <span
                ref={hackathonsNumRef}
                className="font-poiret text-[clamp(40px,5.6vw,96px)] md:text-[clamp(48px,5.6vw,96px)] text-black leading-none drop-shadow-sm tracking-[0.02em] absolute inset-0 flex items-center justify-center"
              >
                0+
              </span>
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black max-md:whitespace-normal whitespace-nowrap text-center max-md:max-w-xs">
              HACKATHONS &amp; SPRINTS
            </span>
            <span className="font-mono text-[11px] sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1 md:mt-1.5 max-md:whitespace-normal whitespace-nowrap text-center max-md:max-w-xs max-md:line-clamp-2">
              IDEATHON, BYTEBRAWL &amp; MORE
            </span>
          </div>

          {/* Stat 4: Projects & Papers */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative flex items-center justify-center mb-1 md:mb-2">
              <span
                aria-hidden="true"
                className="font-poiret text-[clamp(40px,5.6vw,96px)] md:text-[clamp(48px,5.6vw,96px)] leading-none drop-shadow-sm tracking-[0.02em] invisible select-none"
              >
                18+
              </span>
              <span
                ref={projectsNumRef}
                className="font-poiret text-[clamp(40px,5.6vw,96px)] md:text-[clamp(48px,5.6vw,96px)] text-black leading-none drop-shadow-sm tracking-[0.02em] absolute inset-0 flex items-center justify-center"
              >
                0+
              </span>
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black max-md:whitespace-normal whitespace-nowrap text-center max-md:max-w-xs">
              RESEARCH BUILDS &amp; PAPERS
            </span>
            <span className="font-mono text-[11px] sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1 md:mt-1.5 max-md:whitespace-normal whitespace-nowrap text-center max-md:max-w-xs max-md:line-clamp-2">
              AI, MECHANISTIC INT. &amp; SYSTEMS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
