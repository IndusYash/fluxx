import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ConstructionLines from "@/components/ui/ConstructionLines";
import Container from "@/components/layout/Container";
import { SectionDissolveRenderer } from "@/components/ui/SectionDissolveRenderer";

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const dissolveCanvasRef = useRef<HTMLCanvasElement>(null);
  const dissolveRendererRef = useRef<SectionDissolveRenderer | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const scriptHeadingRef = useRef<HTMLHeadingElement>(null);

  const focusAreas = [
    {
      num: "01",
      title: "TECH CONCLAVES",
      desc: "Annual symposiums featuring industry luminaries, state-of-the-art AI workshops, and technology summits.",
    },
    {
      num: "02",
      title: "HACKATHONS & SPRINTS",
      desc: "48-hour competitive builds including Ideathon and ByteBrawl — shipping prototypes under real production constraints.",
    },
    {
      num: "03",
      title: "RESEARCH MENTORSHIP",
      desc: "Faculty-backed investigation into Mechanistic Interpretability, systems engineering, and peer-reviewed publishing.",
    },
    {
      num: "04",
      title: "STUDENT PROJECTS",
      desc: "End-to-end applications built into the MMMUT campus ecosystem, powering student admissions, passes, and tooling.",
    },
  ];

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
      // Pinned ScrollTrigger for WhatWeDoSection:
      // pinSpacing: false allows EventSlider to arrive seamlessly at top: 0 underneath.
      // - p in [0.00, 0.28]: revealed in-place from Legacy dissolve, items reveal cleanly
      // - p in [0.28, 0.71]: focus areas hold solid and readable
      // - p in [0.71, 1.00]: organic single-wave noise dissolve reveals EventSlider in-place at top: 0
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=280%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Focus items reveal:
          const revealP = Math.min(1.0, p / 0.28);
          const items = listRef.current?.querySelectorAll(".focus-item");
          if (items) {
            items.forEach((item, idx) => {
              const el = item as HTMLElement;
              const delay = idx * 0.15;
              const itemP = Math.max(0, Math.min(1, (revealP - delay) / (1 - delay * 0.6)));
              const easeVal = 1 - Math.pow(1 - itemP, 3);
              el.style.opacity = `${easeVal}`;
              el.style.transform = `translateY(${(1 - easeVal) * 50}px) skewY(${(1 - easeVal) * 3}deg)`;
            });
          }

          // 2. Dissolve phase into EventSlider:
          if (p > 0.71) {
            const c = Math.min(1.0, Math.max(0.0, (p - 0.71) / 0.29));
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

            // Smoothly dissolve left-column narrative to eliminate headline collision
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
        },
        onEnterBack: () => {
          section.style.visibility = "visible";
        },
      });

      // Parallax float on the giant script heading
      if (scriptHeadingRef.current) {
        gsap.fromTo(
          scriptHeadingRef.current,
          { y: 50, opacity: 0.10 },
          {
            y: -40,
            opacity: 0.16,
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
    };
  }, []);

  return (
    <section
      id="what-we-do-section"
      ref={sectionRef}
      className="relative z-[30] w-full h-[100svh] min-h-[100svh] bg-transparent overflow-hidden flex items-center justify-center select-none safe-fullscreen"
    >
      {/* Content wrapper subjected to organic noise dissolve mask */}
      <div
        ref={contentWrapperRef}
        className="absolute inset-0 w-full h-full bg-[#060606] overflow-hidden py-[var(--section-pad)] safe-section-py flex items-center will-change-transform"
      >
        {/* Background construction lines */}
        <ConstructionLines />

        {/* Giant Script Heading ("Innovation") */}
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none z-0 overflow-hidden pl-4 lg:pl-16">
          <h2
            ref={scriptHeadingRef}
            className="font-script text-[clamp(6rem,20vw,22rem)] text-white select-none leading-none will-change-transform"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.25)",
              color: "rgba(255, 255, 255, 0.14)",
            }}
          >
            Innovation
          </h2>
        </div>

        {/* Content Container */}
        <Container className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left Sub-heading */}
          <div ref={leftColRef} className="lg:max-w-md will-change-opacity">
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-white/50 mb-3">
              // WHAT WE DO
            </p>
            <h3 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight mb-6">
              CORE DOMAINS OF ENGINEERING
            </h3>
            <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed">
              Every initiative at Flux is focused on tangible outcomes — empowering engineers to turn curiosity into resilient software and publishable research.
            </p>
          </div>

          {/* Right-aligned list of focus areas with skew reveal */}
          <div ref={listRef} className="w-full lg:max-w-2xl flex flex-col gap-6">
            {focusAreas.map((item, index) => (
              <div
                key={index}
                className="focus-item group p-6 border-b border-white/10 hover:border-white/30 transition-colors duration-300 will-change-transform"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-xs sm:text-sm text-white/40 tracking-widest">
                    {item.num}
                  </span>
                  <h4 className="font-sans font-bold text-lg sm:text-2xl text-white group-hover:text-white transition-colors tracking-tight">
                    {item.title}
                  </h4>
                </div>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed text-right pl-12">
                  {item.desc}
                </p>
              </div>
            ))}
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
