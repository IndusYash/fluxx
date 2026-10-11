import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RevealText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const statement =
    "What makes a university experience memorable is what happens when students build: how an idea takes shape, how a team connects, how code transforms into software, and how ambition turns into";
  const accentWord = "Impact.";

  const words = statement.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const wordSpans = textEl.querySelectorAll(".reveal-word");

    const ctx = gsap.context(() => {
      // Pin the section while scrolling through and scrub opacity word by word
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        wordSpans,
        { opacity: 0.15, y: 3 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center bg-[#060606] text-white overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Monochrome Dot-Matrix Halftone Horizon Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at center 75%, rgba(255, 255, 255, 0.14) 0%, transparent 60%),
            radial-gradient(circle at 1.5px 1.5px, rgba(255, 255, 255, 0.2) 1.5px, transparent 0)
          `,
          backgroundSize: "100% 100%, 16px 16px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 65%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 65%, black 40%, transparent 80%)",
        }}
      />

      {/* Top subtle fade */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#060606] to-transparent pointer-events-none" />

      {/* Center Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center">
        
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-[0.2em] text-[#9a9a9a] mb-10">
          <span className="w-1.5 h-1.5 bg-white" />
          <span>The FLUX Philosophy</span>
        </div>

        {/* Big Statement Text revealed word by word on scroll */}
        <h2
          ref={textRef}
          className="font-sans font-light tracking-[-0.035em] leading-[1.2] text-[clamp(2rem,4.8vw,4.5rem)] text-white"
        >
          {words.map((w, idx) => (
            <span
              key={idx}
              className="reveal-word inline-block mr-[0.28em] will-change-[opacity,transform] transition-colors"
            >
              {w}
            </span>
          ))}
          {/* Last word in the accent */}
          <span className="reveal-word inline-block text-[#e6e6e6] font-normal drop-shadow-[0_0_30px_rgba(255,255,255,0.65)] underline decoration-white/20 underline-offset-8">
            {accentWord}
          </span>
        </h2>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
    </section>
  );
}

