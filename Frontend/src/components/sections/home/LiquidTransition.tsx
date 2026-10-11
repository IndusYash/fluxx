import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LiquidTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  const [counts, setCounts] = useState({
    events: 0,
    members: 0,
    hackathons: 0,
    projects: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Liquid fill scroll progress variable
    const scrollObj = {
      progress: 0,
      countEvents: 0,
      countMembers: 0,
      countHackathons: 0,
      countProjects: 0,
    };

    let animId: number;
    let time = 0;

    // Simplex/Harmonic noise wave helper for organic flame-like edge
    const getWaveY = (x: number, baseLevel: number, t: number, amplitude: number) => {
      const w1 = Math.sin(x * 0.005 + t * 2.2) * amplitude;
      const w2 = Math.sin(x * 0.012 - t * 1.7) * (amplitude * 0.55);
      const w3 = Math.cos(x * 0.024 + t * 3.1) * (amplitude * 0.28);
      const flamePinch = Math.sin(x * 0.008 + t) > 0 ? 1.3 : 0.8;
      return baseLevel + (w1 + w2 + w3) * flamePinch;
    };

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const p = scrollObj.progress; // 0 (hidden) -> 0.5 (full white) -> 1.0 (recedes)

      if (p > 0.001) {
        // Calculate the fluid boundary level
        // At p: 0 -> level is at height + 80
        // At p: 0.45 -> level is at -40 (completely filled)
        // At p: 0.85 -> stays filled
        // At p: 1.0 -> level lowers back to height - 80 with flame spikes
        let fillY: number;
        if (p < 0.45) {
          const norm = p / 0.45;
          fillY = height + 100 - norm * (height + 160);
        } else if (p <= 0.82) {
          fillY = -60;
        } else {
          const norm = (p - 0.82) / 0.18;
          fillY = -60 + norm * (height * 0.85);
        }

        const amp = p >= 0.42 && p <= 0.82 ? 0 : Math.min(65, 45 + Math.sin(time) * 15);

        // 1. Draw Liquid Fill Body (White #fcfcfd)
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, getWaveY(0, fillY, time, amp));

        const step = 8;
        for (let x = step; x <= width; x += step) {
          const y = getWaveY(x, fillY, time, amp);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // 2. Liquid crest highlight for viscous 3D depth
        if (fillY > -30 && fillY < height + 40) {
          ctx.beginPath();
          ctx.moveTo(0, getWaveY(0, fillY, time, amp));
          for (let x = step; x <= width; x += step) {
            ctx.lineTo(x, getWaveY(x, fillY, time, amp));
          }
          ctx.strokeStyle = "rgba(220, 225, 235, 0.7)";
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // 3. Lingering dark flame silhouettes at the bottom edge when receding
        if (p > 0.75) {
          const flameAlpha = Math.min(1.0, (p - 0.75) / 0.15);
          ctx.save();
          ctx.fillStyle = `rgba(6, 6, 6, ${flameAlpha})`;
          ctx.beginPath();
          ctx.moveTo(0, height);

          for (let x = 0; x <= width; x += 12) {
            const flameH =
              height -
              Math.abs(Math.sin(x * 0.015 + time * 1.5)) * 48 -
              Math.sin(x * 0.03 - time) * 16;
            ctx.lineTo(x, flameH);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // GSAP ScrollTrigger timeline to drive liquid progress and stat counter numbers
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          scrollObj.progress = self.progress;

          // Toggle light theme when liquid occupies majority of screen (0.24 to 0.78)
          if (container) {
            if (self.progress >= 0.24 && self.progress <= 0.78) {
              if (container.getAttribute("data-theme") !== "light") {
                container.setAttribute("data-theme", "light");
                window.dispatchEvent(new Event("theme-change"));
              }
            } else {
              if (container.getAttribute("data-theme") === "light") {
                container.removeAttribute("data-theme");
                window.dispatchEvent(new Event("theme-change"));
              }
            }
          }

          // Update React stat numbers
          setCounts({
            events: Math.round(scrollObj.countEvents),
            members: Math.round(scrollObj.countMembers),
            hackathons: Math.round(scrollObj.countHackathons),
            projects: Math.round(scrollObj.countProjects),
          });
        },
      },
    });

    // Animate stats counter numbers when progress enters the white zone (0.25 to 0.7)
    tl.to(
      scrollObj,
      {
        countEvents: 25,
        countMembers: 500,
        countHackathons: 12,
        countProjects: 18,
        duration: 1,
        ease: "power2.out",
      },
      0.22
    );

    // Fade in and out the stats container
    if (statsContainerRef.current) {
      tl.fromTo(
        statsContainerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        0.26
      );
      tl.to(
        statsContainerRef.current,
        { opacity: 0, y: -30, duration: 0.25, ease: "power2.in" },
        0.78
      );
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (container) {
        container.removeAttribute("data-theme");
      }
      tl.kill();
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

      {/* The Liquid Fill Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Stats overlay appearing on top of the white liquid */}
      <div
        ref={statsContainerRef}
        data-theme="light"
        className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center pointer-events-none pt-[calc(var(--nav-h)+24px)] pb-[calc(var(--ticker-h)+24px)]"
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Stat 1: Events */}
          <div className="flex flex-col items-center text-center">
            <span className="font-script text-6xl sm:text-8xl lg:text-9xl text-black leading-none mb-2 drop-shadow-sm tracking-[0.08em] sm:tracking-[0.14em]">
              {counts.events}+
            </span>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black">
              TECH CONCLAVES & EVENTS
            </span>
            <span className="font-mono text-xs sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1.5">
              INCLUDING ATAL FDP & SHE LEADS
            </span>
          </div>

          {/* Stat 2: Members */}
          <div className="flex flex-col items-center text-center">
            <span className="font-script text-6xl sm:text-8xl lg:text-9xl text-black leading-none mb-2 drop-shadow-sm tracking-[0.08em] sm:tracking-[0.14em]">
              {counts.members}+
            </span>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black">
              STUDENT DEVELOPERS
            </span>
            <span className="font-mono text-xs sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1.5">
              ACROSS B.TECH & M.TECH
            </span>
          </div>

          {/* Stat 3: Hackathons */}
          <div className="flex flex-col items-center text-center">
            <span className="font-script text-6xl sm:text-8xl lg:text-9xl text-black leading-none mb-2 drop-shadow-sm tracking-[0.08em] sm:tracking-[0.14em]">
              {counts.hackathons}+
            </span>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black">
              HACKATHONS & SPRINTS
            </span>
            <span className="font-mono text-xs sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1.5">
              IDEATHON, BYTEBRAWL & MORE
            </span>
          </div>

          {/* Stat 4: Projects & Papers */}
          <div className="flex flex-col items-center text-center">
            <span className="font-script text-6xl sm:text-8xl lg:text-9xl text-black leading-none mb-2 drop-shadow-sm tracking-[0.08em] sm:tracking-[0.14em]">
              {counts.projects}+
            </span>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-black">
              RESEARCH BUILDS & PAPERS
            </span>
            <span className="font-mono text-xs sm:text-[13px] text-neutral-700 font-medium tracking-wider mt-1.5">
              AI, MECHANISTIC INT. & SYSTEMS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

