import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/layout/Container";

export default function ScrollTextSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const scriptWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masked slide up timeline pinned on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.8,
        },
      });

      // Stagger slide up of the bold lines
      const lines = wordsRef.current?.querySelectorAll(".reveal-line");
      if (lines && lines.length > 0) {
        tl.fromTo(
          lines,
          { y: "130%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.2, stagger: 0.25, ease: "power2.out" },
          0
        );
      }

      // Script word slow draw/fade and scale in
      if (scriptWordRef.current) {
        tl.fromTo(
          scriptWordRef.current,
          { opacity: 0, scale: 0.82, filter: "blur(10px)" },
          { opacity: 1, scale: 1.0, filter: "blur(0px)", duration: 1.6, ease: "power2.out" },
          0.35
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scroll-text-section"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#060606] overflow-hidden flex items-center justify-center select-none safe-fullscreen"
    >
      {/* Subtle radial background depth (hardware accelerated gradient without expensive blur filter) */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Persistent Logo Anchor: safely positioned on the right side, at least 60px away from text */}
      <div
        data-logo-anchor="statement"
        data-logo-scale="0.70"
        data-logo-opacity="0.95"
        className="hidden md:block absolute right-[6%] xl:right-[9%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] pointer-events-none z-[1]"
      />

      {/* Main Statement Typography */}
      <Container
        ref={containerRef}
        className="relative z-10 text-center flex flex-col items-center justify-center pointer-events-none"
      >
        <div ref={wordsRef} className="flex flex-col items-center gap-1 sm:gap-3">
          <div className="overflow-hidden py-1">
            <h2 className="reveal-line font-sans font-black text-[clamp(2.5rem,7vw,7rem)] tracking-[-0.04em] uppercase text-white leading-[0.95] will-change-transform">
              THIS IS WHERE
            </h2>
          </div>

          <div className="overflow-hidden py-1">
            <h2 className="reveal-line font-sans font-black text-[clamp(2.5rem,7vw,7rem)] tracking-[-0.04em] uppercase text-white/90 leading-[0.95] will-change-transform">
              IDEAS MEET
            </h2>
          </div>

          {/* Script accent word */}
          <div className="overflow-visible pt-2 pb-4">
            <span
              ref={scriptWordRef}
              className="inline-block font-script text-[clamp(4.5rem,13vw,13rem)] text-white/95 leading-none drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] will-change-transform"
            >
              Collide
            </span>
          </div>
        </div>

        {/* Small subtle sub-caption */}
        <p className="mt-4 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-white/60 max-w-md">
          MMMUT GORAKHPUR // DEPARTMENT OF CSE
        </p>
      </Container>

      {/* Edge gradient seams */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#060606] to-transparent pointer-events-none z-30" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none z-30" />
    </section>
  );
}

