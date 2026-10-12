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
    // Total distance: 215% (~215vh of scroll)
    // - Entry fill range: 0.0 to 0.21 (~45vh): liquid fills (0 -> 1), stats fade in and count up
    // - Hold range: 0.21 to 0.465 (~55vh): hold readable stats on solid white
    // - Cover range: 0.465 to 1.0 (~115vh): Stats section stays fixed at top: 0 while About rises over it
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=215%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          // Liquid Fill: 0.0 -> 0.21 (~45vh of scroll)
          let currentLiquidP = 0;
          if (p <= 0.21) {
            currentLiquidP = p / 0.21;
          } else {
            currentLiquidP = 1.0;
          }

          scrollObj.fillProgress = currentLiquidP;
          liquidController.setProgress(currentLiquidP);

          // Direct count calculation: finish counting by p = 0.21, hold steady at full target values afterwards
          let countE = 25;
          let countM = 500;
          let countH = 12;
          let countP = 18;

          if (p < 0.21) {
            const t = p / 0.21;
            // power2.out ease: 1 - (1 - t)^2
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

          // Stats container fade in during liquid fill (0.10 to 0.21)
          if (statsContainerRef.current) {
            if (p < 0.10) {
              statsContainerRef.current.style.opacity = "0";
              statsContainerRef.current.style.transform = "scale(1) translateY(24px)";
            } else if (p < 0.21) {
              const fadeInNorm = (p - 0.10) / 0.11;
              statsContainerRef.current.style.opacity = `${fadeInNorm}`;
              statsContainerRef.current.style.transform = `scale(1) translateY(${24 * (1 - fadeInNorm)}px)`;
            } else {
              statsContainerRef.current.style.opacity = "1";
            }
          }

          // Hold range: 0.21 to 0.465 (~55vh, ~half a viewport of scroll)
          // Solid white, static readable numbers, scale 1, translateY 0, brightness 1
          if (p >= 0.21 && p <= 0.465) {
            if (statsContainerRef.current) {
              statsContainerRef.current.style.transform = "scale(1) translateY(0vh)";
              statsContainerRef.current.style.filter = "brightness(1)";
            }
            if (canvasRef.current) {
              canvasRef.current.style.filter = "brightness(1)";
            }
            setCoverProgress(0.0);
          }

          // Cover range: 0.465 to 1.0 (~115vh of scroll)
          // Stats section stays pinned at top: 0 while About rises from below and covers it
          // Stats reacts: scale 1 -> 0.96, translateY 0 -> -4vh, brightness 1 -> 0.75
          if (p > 0.465) {
            const c = Math.min(1.0, Math.max(0.0, (p - 0.465) / (1.0 - 0.465)));
            const scale = 1.0 - 0.04 * c;
            const transY = -4.0 * c;
            const brightness = 1.0 - 0.25 * c;

            if (statsContainerRef.current) {
              statsContainerRef.current.style.transform = `scale(${scale}) translateY(${transY}vh)`;
              statsContainerRef.current.style.filter = `brightness(${brightness})`;
            }
            if (canvasRef.current) {
              canvasRef.current.style.filter = `brightness(${brightness})`;
            }

            // Sync theme: edge passes ticker (~0.02) and navbar (~0.97)
            setCoverProgress(c);
          }
        },
        onLeave: () => {
          liquidController.forceState(1);
          setCoverProgress(1.0);
        },
        onLeaveBack: () => {
          liquidController.forceState(0);
          setCoverProgress(0.0);
          resetThemeToDark();
        },
        onEnterBack: () => {
          liquidController.forceState(1);
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
