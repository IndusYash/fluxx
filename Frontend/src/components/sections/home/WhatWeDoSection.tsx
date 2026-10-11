import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ConstructionLines from "@/components/ui/ConstructionLines";

import Container from "@/components/layout/Container";

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    const ctx = gsap.context(() => {
      // Skew and slide-up reveal of the focus area lines
      const items = listRef.current?.querySelectorAll(".focus-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: 70, skewY: 4, opacity: 0 },
          {
            y: 0,
            skewY: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Parallax float on the giant script heading (15% opacity range)
      if (scriptHeadingRef.current) {
        gsap.fromTo(
          scriptHeadingRef.current,
          { y: 50, opacity: 0.10 },
          {
            y: -40,
            opacity: 0.16,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-we-do-section"
      ref={sectionRef}
      className="relative w-full min-h-[100svh] bg-[#060606] overflow-hidden py-[var(--section-pad)] safe-section-py flex items-center select-none"
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
        <div className="lg:max-w-md">
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
    </section>
  );
}

