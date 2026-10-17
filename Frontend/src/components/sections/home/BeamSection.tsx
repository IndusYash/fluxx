import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/components/layout/Container";
import { facultyData } from "@/pages/faculty/facultyData";

const FacultyPhotoFrame: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [blurredBg, setBlurredBg] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 40;
        canvas.height = 30;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.filter = "blur(3px)";
          ctx.drawImage(img, 0, 0, 40, 30);
          setBlurredBg(canvas.toDataURL());
        }
      } catch {
        setBlurredBg(src);
      }
    };
  }, [src]);

  return (
    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden mb-4 bg-black/90 flex items-center justify-center">
      {/* Dark heavily blurred scaled-up backdrop to fill any empty space */}
      {blurredBg ? (
        <img
          src={blurredBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-125 filter blur-sm brightness-[0.3] opacity-85 select-none pointer-events-none"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center scale-125 filter blur-md brightness-[0.25] opacity-75"
          style={{ backgroundImage: `url(${src})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Fully contained photo: whole photo visible, zero cropped heads, hands, shoulders or face */}
      <img
        src={src}
        alt={alt}
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] group-hover:scale-[1.02] transition-transform duration-500 ease-out"
      />
    </div>
  );
};

export default function BeamSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const mentorshipCards = [
    {
      slug: "satvik-vats",
      role: "ASSISTANT PROFESSOR",
      name: "Dr. Satvik Vats",
      line: "Specializing in Big Data analytics and Deep Learning applications.",
      image: facultyData.find((f) => f.slug === "satvik-vats")?.profileImage || "",
    },
    {
      slug: "anupama-kaushik-sharma",
      role: "HON'BLE VICE CHANCELLOR & PATRON",
      name: "Prof. Anupama Kaushik Sharma",
      line: "Vision for Interdisciplinary Student Research & Innovation Hubs",
      image: facultyData.find((f) => f.slug === "anupama-kaushik-sharma")?.profileImage || "",
    },
    {
      slug: "shwet-ketu",
      role: "ASSISTANT PROFESSOR",
      name: "Dr. Shwet Ketu",
      line: "Expert in IoT systems and healthcare technology integration.",
      image: facultyData.find((f) => f.slug === "shwet-ketu")?.profileImage || "",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Horizontal drift of the script words across the screen at controlled speeds
      if (word1Ref.current) {
        gsap.to(word1Ref.current, {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: prefersReducedMotion ? true : 1.2,
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
            scrub: prefersReducedMotion ? true : 1.8,
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
            scrub: prefersReducedMotion ? true : 1.4,
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

          if (prefersReducedMotion || isMobile) {
            gsap.set([leftCard, middleCard, rightCard], {
              y: 0,
              opacity: 1,
              scale: 1,
            });
          } else {
            // Middle card starts significantly higher in the upper zone (where logo was shown), then glides down to its position on scroll
            const middleStartOffset = -480;
            const leftStartOffset = 30;
            const rightStartOffset = 20;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=650",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });

            // Middle card: starts elevated in the upper area, then smoothly descends into aligned position on scroll
            tl.fromTo(
              middleCard,
              { y: middleStartOffset, opacity: 1, scale: 1.02 },
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
    if (window.innerWidth < 768) return;
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
      className="relative w-full min-h-screen bg-[#060606] overflow-hidden pt-[calc(var(--nav-h)+24px)] pb-[calc(var(--ticker-h)+36px)] safe-section-py flex flex-col justify-between select-none"
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
          2. SCRIPT WORDS DRIFTING HORIZONTALLY (Kept inside viewport, desktop only)
          Discovery, Creativity, Innovation
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex absolute inset-0 pointer-events-none z-0 overflow-hidden flex-col justify-around py-12 opacity-25">
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
          3. PERSISTENT CHROME FLUX LOGO ANCHOR IN FRONT OF THE LIGHT BEAM (Desktop only)
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex relative z-10 w-full max-w-lg mx-auto h-[40vh] min-h-[300px] items-center justify-center my-4 pointer-events-none">
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
      <Container className="relative z-20 mt-4 md:mt-8 pb-[calc(var(--ticker-h)+24px)] pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-3 md:gap-0">
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
            className="group hidden md:flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>View All Faculty</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div
          ref={cardsContainerRef}
          id="faculty-cards-container"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {mentorshipCards.map((card) => (
            <div
              key={card.slug}
              className={`will-change-transform h-full flex flex-col ${
                card.slug === "anupama-kaushik-sharma"
                  ? "order-1 md:order-2"
                  : card.slug === "satvik-vats"
                  ? "order-2 md:order-1"
                  : "order-3 md:order-3"
              }`}
            >
              <div
                tabIndex={0}
                role="button"
                aria-label={`Read profile of ${card.name}`}
                onClick={() => navigate(`/faculty#${card.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/faculty#${card.slug}`);
                  }
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative bg-[#0d0d0f] border border-white/10 hover:border-white/35 p-4 rounded-sm transition-all duration-300 ease-out cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.6)] will-change-transform h-full flex flex-col justify-between"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div>
                  {/* Card Image */}
                  <FacultyPhotoFrame src={card.image} alt={card.name} />

                  {/* Card Metadata */}
                  <span className="block font-mono text-[11px] tracking-widest uppercase text-white/65 mb-1.5">
                    {card.role}
                  </span>
                  <h4 className="font-sans font-bold text-base sm:text-lg text-white leading-snug group-hover:text-white transition-colors mb-2">
                    {card.name}
                  </h4>
                  <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                    {card.line}
                  </p>
                </div>

                {/* Arrow link */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono tracking-wider text-white/50 group-hover:text-white transition-colors">
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

