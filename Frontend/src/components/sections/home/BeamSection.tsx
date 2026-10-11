import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/components/layout/Container";

import vcMaam from "/src/assets/images/Prof. Anupama Kaushik Sharma vc maam.jpeg";
import shwetSir from "/src/assets/images/shwetSir.webp";
import expert from "/src/assets/images/expert.webp";

export default function BeamSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const facultyNews = [
    {
      id: 1,
      image: vcMaam,
      name: "Prof. Anupama Kaushik Sharma",
      role: "Hon'ble Vice Chancellor & Patron",
      date: "OCTOBER 2025",
      title: "Vision for Interdisciplinary Student Research & Innovation Hubs",
      link: "/about",
    },
    {
      id: 2,
      image: shwetSir,
      name: "Dr. Shweta Srivastava",
      role: "Faculty Advisor, Dept. of CSE",
      date: "JANUARY 2026",
      title: "ATAL FDP: Leading Frontiers in Mechanistic Interpretability",
      link: "/events/fdp",
    },
    {
      id: 3,
      image: expert,
      name: "Er. Shivesh Sinha",
      role: "Sr. Technical Program Manager, Intel USA",
      date: "NOVEMBER 2025",
      title: "Industry Keynote: Silicon Acceleration and Foundation Models",
      link: "/events",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal drift of the script words across the screen at controlled speeds
      if (word1Ref.current) {
        gsap.to(word1Ref.current, {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (word2Ref.current) {
        gsap.to(word2Ref.current, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      }

      if (word3Ref.current) {
        gsap.to(word3Ref.current, {
          xPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }

      // Staggered parallax for the three faculty cards
      if (cardsContainerRef.current) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isMobile = window.innerWidth < 768;
        const cards = Array.from(cardsContainerRef.current.children) as HTMLElement[];

        if (cards.length >= 3) {
          const leftCard = cards[0];
          const middleCard = cards[1];
          const rightCard = cards[2];

          if (prefersReducedMotion) {
            gsap.set([leftCard, middleCard, rightCard], {
              y: 0,
              opacity: 1,
              scale: 1,
            });
          } else {
            // Middle card starts significantly higher in the upper zone, then glides down to its position on scroll
            const middleStartOffset = isMobile ? -50 : -180;
            const leftStartOffset = isMobile ? 15 : 30;
            const rightStartOffset = isMobile ? 10 : 20;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=550",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });

            // Middle card: starts elevated in the upper area, then smoothly descends into aligned position on scroll
            tl.fromTo(
              middleCard,
              { y: middleStartOffset, opacity: 0.95, scale: 1.02 },
              { y: 0, opacity: 1, scale: 1, ease: "power2.out" },
              0
            );

            // Left card: slides up smoothly to meet baseline
            tl.fromTo(
              leftCard,
              { y: leftStartOffset, opacity: 0.85 },
              { y: 0, opacity: 1, ease: "power2.out" },
              0
            );

            // Right card: slides up smoothly to meet baseline
            tl.fromTo(
              rightCard,
              { y: rightStartOffset, opacity: 0.85 },
              { y: 0, opacity: 1, ease: "power2.out" },
              0
            );
          }
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Hover tilt handler for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <section
      id="beam-section"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#060606] overflow-hidden pt-[calc(var(--nav-h)+24px)] pb-[calc(var(--ticker-h)+36px)] flex flex-col justify-between select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. VERTICAL WHITE LIGHT BEAM IN CENTER
          Glowing light strip piercing vertically from floor to ceiling
      ───────────────────────────────────────────────────────────── */}
      <div
        id="beam-light"
        data-beam
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-white/0 via-white/80 to-white/0 pointer-events-none z-0"
      />
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-48 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-[35px] pointer-events-none z-0" />

      {/* ─────────────────────────────────────────────────────────────
          2. SCRIPT WORDS DRIFTING HORIZONTALLY (Kept inside viewport)
          Discovery, Creativity, Innovation
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-around py-12 opacity-25">
        <div className="overflow-hidden whitespace-nowrap">
          <span
            ref={word1Ref}
            className="inline-block font-script text-[clamp(5rem,14vw,14rem)] text-white/50 will-change-transform pl-12"
          >
            Discovery
          </span>
        </div>
        <div className="overflow-hidden whitespace-nowrap text-center">
          <span
            ref={word2Ref}
            className="inline-block font-script text-[clamp(4.5rem,12vw,11rem)] text-white/45 will-change-transform"
          >
            Creativity
          </span>
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <span
            ref={word3Ref}
            className="inline-block font-script text-[clamp(5rem,14vw,14rem)] text-white/50 will-change-transform pl-32"
          >
            Innovation
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. PERSISTENT CHROME FLUX LOGO ANCHOR IN FRONT OF THE LIGHT BEAM
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-lg mx-auto h-[40vh] min-h-[300px] flex items-center justify-center my-4 pointer-events-none">
        <div
          data-logo-anchor="faculty"
          data-logo-scale="0.88"
          data-logo-opacity="1.0"
          className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] pointer-events-none"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. ROW OF 3 FEATURED FACULTY & RESEARCH LEADERS (3D Hover Tilt)
          Safely ends >= var(--ticker-h) + 24px above viewport bottom
      ───────────────────────────────────────────────────────────── */}
      <Container className="relative z-20 mt-8 pb-[calc(var(--ticker-h)+24px)] pointer-events-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/50 mb-1">
              // ACADEMIC LEADERSHIP & ADVISORS
            </p>
            <h3
              id="research-mentorship-heading"
              className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white"
            >
              RESEARCH MENTORSHIP
            </h3>
          </div>
          <button
            onClick={() => navigate("/faculty")}
            className="group hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors"
          >
            <span>View All Faculty</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div
          ref={cardsContainerRef}
          id="faculty-cards-container"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {facultyNews.map((card) => (
            <div key={card.id} className="will-change-transform">
              <div
                onClick={() => navigate(card.link)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative bg-[#0d0d0f] border border-white/10 hover:border-white/35 p-4 rounded-sm transition-all duration-300 ease-out cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.6)] will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Image */}
                <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden mb-4 bg-black">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 left-2.5 font-mono text-[11px] uppercase tracking-widest text-white/90 px-2 py-0.5 bg-black/60 backdrop-blur-sm">
                    {card.date}
                  </span>
                </div>

                {/* Card Metadata */}
                <span className="block font-mono text-[11px] tracking-widest uppercase text-white/65 mb-1">
                  {card.role}
                </span>
                <h4 className="font-sans font-bold text-base sm:text-lg text-white leading-snug group-hover:text-white transition-colors mb-2">
                  {card.name}
                </h4>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">
                  {card.title}
                </p>

                {/* Arrow link */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono tracking-wider text-white/40 group-hover:text-white transition-colors">
                  <span>READ PROFILE</span>
                  <span>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

