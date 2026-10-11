import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import atalFdp from "/src/assets/images/atalFdp.webp";
import ideathoncomp from "/src/assets/images/ideathoncomp.webp";
import expert from "/src/assets/images/expert.webp";
import sheLeadsBanner from "/src/assets/images/she_leads_hero_banner.jpg";
import conferenceImg from "/src/assets/images/conferenceImg.webp";

import Container from "@/components/layout/Container";

interface EventItem {
  id: string;
  name: string;
  phase: string;
  date: string;
  attendees: string;
  isUpcoming?: boolean;
  desc: string;
  image: string;
  link: string;
}

interface StackDimensions {
  mainWidth: number;
  mainHeight: number;
  peekWidth: number;
  peekHeight: number;
  yPeek: number;
  scalePeek: number;
  centerY: number;
}

export default function EventSlider() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const events: EventItem[] = [
    {
      id: "01",
      name: "ATAL FDP 2026",
      phase: "RESEARCH WORKSHOP",
      date: "JANUARY 19 - 24, 2026",
      attendees: "300+ ATTENDEES",
      desc: "Advanced deep dive into the hidden mathematical science of Mechanistic Interpretability, neural representation circuits, and explainable AI in collaboration with leading researchers.",
      image: atalFdp,
      link: "/events/fdp",
    },
    {
      id: "02",
      name: "IDEATHON 2025",
      phase: "INNOVATION SPRINT",
      date: "DECEMBER 17 - 19, 2025",
      attendees: "500+ ATTENDEES",
      desc: "Flagship 3-day hardware & software innovation sprint. Multidisciplinary student squads engineered and pitched working prototypes to industry evaluators.",
      image: ideathoncomp,
      link: "/ideathon",
    },
    {
      id: "03",
      name: "AI EVOLUTION",
      phase: "EXPERT CONCLAVE",
      date: "NOVEMBER 16, 2025",
      attendees: "300+ ATTENDEES",
      desc: "Technical keynote session with Er. Shivesh Sinha, Sr. Technical Program Manager at Intel USA, decoding next-generation silicon acceleration and emerging AI architectures.",
      image: expert,
      link: "/events",
    },
    {
      id: "04",
      name: "SHE LEADS SUMMIT",
      phase: "LEADERSHIP CONCLAVE",
      date: "SEPTEMBER 12 - 13",
      attendees: "250+ ATTENDEES",
      desc: "Annual Dr. Tessy Thomas Conclave honoring excellence in technology leadership, interactive masterclasses, and executive mentorship for rising women engineers.",
      image: sheLeadsBanner,
      link: "/she-leads",
    },
    {
      id: "05",
      name: "BYTEBRAWL",
      phase: "HACKATHON",
      date: "COMING SOON",
      attendees: "REGISTRATIONS OPENING SOON",
      isUpcoming: true,
      desc: "High-intensity competitive coding showdown where architectural resilience meets rapid implementation under strict production grading constraints.",
      image: conferenceImg,
      link: "/events",
    },
  ];

  // Map of 64px pre-rendered canvas thumbnails for smooth 60fps blur
  const blurredMap = useRef<Record<string, string>>({});

  // Dual stacked background layers for 0.8s crossfade & scale 1.15 -> 1.2
  const [bgLayers, setBgLayers] = useState<{
    activeLayer: "A" | "B";
    imageA: string;
    imageB: string;
  }>({
    activeLayer: "A",
    imageA: events[0].image,
    imageB: events[0].image,
  });

  // Dynamically computed stack dimensions so peek cards fit safe area on any screen
  const [dims, setDims] = useState<StackDimensions>({
    mainWidth: 780,
    mainHeight: 438,
    peekWidth: 220,
    peekHeight: 124,
    yPeek: 301,
    scalePeek: 220 / 780,
    centerY: 460,
  });

  const dimsRef = useRef(dims);
  dimsRef.current = dims;

  // Pre-render 64px tiny canvas thumbnails for ultra-smooth GPU blur
  useEffect(() => {
    let isMounted = true;
    const canvas = document.createElement("canvas");
    canvas.width = 64;

    events.forEach((ev) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (!isMounted) return;
        const targetH = Math.max(36, Math.round((img.naturalHeight / img.naturalWidth) * 64));
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, 64, targetH);
          try {
            const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
            blurredMap.current[ev.id] = dataUrl;
            if (ev.id === events[0].id) {
              setBgLayers((prev) => ({
                ...prev,
                imageA: dataUrl,
                imageB: dataUrl,
              }));
            }
          } catch {
            blurredMap.current[ev.id] = ev.image;
          }
        }
      };
      img.onerror = () => {
        blurredMap.current[ev.id] = ev.image;
      };
      img.src = ev.image;
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute safe area & card sizes on resize so peek cards never clip
  const calculateDimensions = () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const isDesktop = vw >= 1024;

    // Safe boundaries:
    // Top: Showcase label row bottom (~96px) + 16px buffer = 112px
    // Bottom: Ticker top (vh - 36px) - 16px buffer = vh - 52px
    const topSafe = 112;
    const bottomSafe = vh - 52;
    const availableSafeH = Math.max(280, bottomSafe - topSafe);
    const safeCenter = Math.round((topSafe + bottomSafe) / 2);

    if (isDesktop) {
      const peekW = 220;
      const peekH = 124; // 16:9
      const gap = 20;

      // Entire stack height is: peekH + gap + mainH + gap + peekH = mainH + 288px
      const maxMainH = availableSafeH - (peekH * 2 + gap * 2);

      // Target main card width: ~46% of viewport (max 880px), 16:9
      const targetMainW = Math.min(vw * 0.46, 880);
      const targetMainH = targetMainW * (9 / 16);

      // Constrain height by available safe area
      const mainH = Math.round(Math.min(targetMainH, Math.max(240, maxMainH)));
      const mainW = Math.round(mainH * (16 / 9));
      const scalePeek = peekW / mainW;
      const yPeek = Math.round((mainH / 2) + gap + (peekH / 2));

      return {
        mainWidth: mainW,
        mainHeight: mainH,
        peekWidth: peekW,
        peekHeight: peekH,
        yPeek,
        scalePeek,
        centerY: safeCenter,
      };
    } else {
      // Mobile / Tablet: scale proportionally
      const peekW = Math.min(200, Math.round(vw * 0.48));
      const peekH = Math.round(peekW * (9 / 16));
      const gap = 14;

      const maxMainH = availableSafeH - (peekH * 2 + gap * 2);
      const targetMainW = Math.min(vw - 48, 380);
      const targetMainH = targetMainW * (9 / 16);

      const mainH = Math.round(Math.min(targetMainH, Math.max(160, maxMainH)));
      const mainW = Math.round(mainH * (16 / 9));
      const scalePeek = peekW / mainW;
      const yPeek = Math.round((mainH / 2) + gap + (peekH / 2));

      return {
        mainWidth: mainW,
        mainHeight: mainH,
        peekWidth: peekW,
        peekHeight: peekH,
        yPeek,
        scalePeek,
        centerY: safeCenter,
      };
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newDims = calculateDimensions();
      setDims(newDims);
      if (scrollTriggerRef.current) {
        updateStack(scrollTriggerRef.current.progress || 0, newDims);
      }
    };

    const initialDims = calculateDimensions();
    setDims(initialDims);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Crossfade between stacked background layers on activeIndex change
  useEffect(() => {
    const currentId = events[activeIndex]?.id;
    const nextSrc = (currentId && blurredMap.current[currentId]) || events[activeIndex]?.image;
    if (!nextSrc) return;

    setBgLayers((prev) => {
      if (prev.activeLayer === "A") {
        return {
          activeLayer: "B",
          imageA: prev.imageA,
          imageB: nextSrc,
        };
      } else {
        return {
          activeLayer: "A",
          imageA: nextSrc,
          imageB: prev.imageB,
        };
      }
    });
  }, [activeIndex]);

  // Scrubbed peek stack update function (Direct DOM mutation for 60fps)
  const updateStack = (p: number, currentDims?: StackDimensions) => {
    const activeDims = currentDims || dimsRef.current;
    const numEvents = events.length;
    const continuousIndex = p * (numEvents - 1);

    const { yPeek, scalePeek } = activeDims;

    events.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;

      const delta = i - continuousIndex;

      let translateY = 0;
      let scale = 1.0;
      let opacity = 0.0;
      let zIndex = 10;
      let isCurrentCard = false;

      if (delta >= -1 && delta <= 0) {
        // Card moving from Center (0) up to Top Peek (-1)
        const t = -delta; // 0 -> 1
        translateY = -yPeek * t;
        scale = 1.0 - (1.0 - scalePeek) * t;
        opacity = 1.0 - (1.0 - 0.6) * t;
        zIndex = Math.round(25 - 10 * t);
        if (t < 0.45) isCurrentCard = true;
      } else if (delta > 0 && delta <= 1) {
        // Card moving from Bottom Peek (+1) up to Center (0)
        const t = 1.0 - delta; // 0 -> 1
        translateY = yPeek * (1.0 - t);
        scale = scalePeek + (1.0 - scalePeek) * t;
        opacity = 0.6 + (1.0 - 0.6) * t;
        zIndex = Math.round(15 + 10 * t);
        if (t >= 0.55) isCurrentCard = true;
      } else if (delta < -1 && delta >= -2) {
        // Card moving above Top Peek and fading out completely
        const t = -delta - 1.0; // 0 -> 1
        translateY = -yPeek - 75 * t;
        scale = scalePeek * (1.0 - 0.1 * t);
        opacity = 0.6 * (1.0 - t);
        zIndex = 5;
      } else if (delta > 1 && delta <= 2) {
        // Card entering from bottom towards Bottom Peek
        const t = 2.0 - delta; // 0 -> 1
        translateY = yPeek + 75 * (1.0 - t);
        scale = scalePeek * (0.9 + 0.1 * t);
        opacity = 0.6 * t;
        zIndex = 5;
      } else {
        // Far out of visible range
        opacity = 0.0;
        translateY = delta < 0 ? -yPeek - 90 : yPeek + 90;
        scale = scalePeek * 0.8;
        zIndex = 0;
      }

      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${zIndex}`;
      el.style.pointerEvents = opacity > 0.1 ? "auto" : "none";

      // Toggle mobile banner inside card
      const banner = el.querySelector(".card-mobile-banner") as HTMLElement | null;
      if (banner) {
        banner.style.opacity = isCurrentCard ? "1" : "0";
      }
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const numEvents = events.length;

    // Pin section and scrub through event cards
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${numEvents * 100}%`,
      pin: true,
      scrub: 0.5,
      snap: {
        snapTo: 1 / (numEvents - 1),
        duration: { min: 0.2, max: 0.5 },
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        const p = self.progress;
        updateStack(p);

        const idx = Math.min(
          Math.round(p * (numEvents - 1)),
          numEvents - 1
        );
        if (idx !== activeIndexRef.current) {
          activeIndexRef.current = idx;
          setActiveIndex(idx);
        }
      },
    });
    scrollTriggerRef.current = st;

    // Initial render layout
    updateStack(st.progress || 0);

    return () => {
      st.kill();
    };
  }, [events.length]);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      navigate(events[index].link);
    } else {
      const st = scrollTriggerRef.current;
      if (!st) return;
      const targetP = index / (events.length - 1);
      const targetScroll = st.start + targetP * (st.end - st.start);
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(targetScroll, { duration: 0.7 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  const currentEvent = events[activeIndex];

  // Calculate circular arc length for bottom right
  const circumference = 2 * Math.PI * 26;
  const strokeDashoffset = circumference - (circumference * ((activeIndex + 1) / events.length));

  return (
    <section
      id="events-showcase-section"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#060606] overflow-hidden select-none safe-fullscreen"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. BLURRED DUAL-LAYER CROSSFADING BACKGROUND POSTERS
          64px canvas pre-rendered thumbnails, 60px blur, brightness 0.75, saturation 0.90
          Two stacked layers crossfade over 0.8s with scale 1.15 to 1.20
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Layer A */}
        <div
          className={`absolute inset-0 transition-all duration-[800ms] ease-out will-change-transform,opacity ${
            bgLayers.activeLayer === "A"
              ? "opacity-100 scale-[1.20]"
              : "opacity-0 scale-[1.15]"
          }`}
        >
          <img
            src={bgLayers.imageA}
            alt=""
            className="w-full h-full object-cover filter blur-[60px] brightness-[0.75] saturate-[0.90] transform-gpu"
          />
        </div>

        {/* Layer B */}
        <div
          className={`absolute inset-0 transition-all duration-[800ms] ease-out will-change-transform,opacity ${
            bgLayers.activeLayer === "B"
              ? "opacity-100 scale-[1.20]"
              : "opacity-0 scale-[1.15]"
          }`}
        >
          <img
            src={bgLayers.imageB}
            alt=""
            className="w-full h-full object-cover filter blur-[60px] brightness-[0.75] saturate-[0.90] transform-gpu"
          />
        </div>

        {/* Top gradient only behind navbar (~35% black) */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/35 via-black/15 to-transparent pointer-events-none" />

        {/* Bottom gradient only behind ticker (~45% black) */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/45 via-black/20 to-transparent pointer-events-none" />

        {/* Soft edge vignette (~25%) */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.25)_100%)] pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PERSISTENT LOGO ANCHOR
          Parked far right, small, 15% opacity, >= 40px away from any text
      ───────────────────────────────────────────────────────────── */}
      <div
        data-logo-anchor="events"
        data-logo-scale="0.26"
        data-logo-opacity="0.15"
        className="hidden lg:block absolute top-[190px] right-[var(--gutter)] w-[90px] h-[90px] pointer-events-none z-[1]"
      />

      {/* ─────────────────────────────────────────────────────────────
          2. TOP HEADER ROW (Clearance from logo and peek cards)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-[calc(var(--nav-h)+16px)] inset-x-[var(--gutter)] z-20 flex items-center justify-between pointer-events-none">
        <span className="font-mono text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/80">
          // SHOWCASE // 0{activeIndex + 1} OF 0{events.length}
        </span>
        <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white/70">
          SCROLL TO EXPLORE EVENTS
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT: Left narrative, Center Card Stack, Right details
          Vertically centered in safe area between Showcase label and ticker
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 pointer-events-none z-10"
        style={{
          top: `${dims.centerY}px`,
          transform: "translateY(-50%)",
        }}
      >
        <Container className="flex items-center justify-between w-full">
          {/* LEFT COLUMN: Narrative with subtle dark scrim for crisp readability */}
          <div className="w-full max-w-[280px] xl:max-w-[320px] 2xl:max-w-[340px] hidden lg:flex flex-col items-start text-left pointer-events-auto p-4 sm:p-5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/70 mb-2.5 px-2 py-0.5 border border-white/15 bg-black/60 rounded-[2px]">
              {currentEvent.phase}
            </span>

            <h3 className="font-sans font-black text-3xl xl:text-4xl uppercase tracking-tight text-white leading-[1.08] mb-3">
              {currentEvent.name}
            </h3>

            <p className="font-mono text-xs text-white/60 tracking-widest mb-5">
              {currentEvent.date}
            </p>

            <button
              onClick={() => navigate(currentEvent.link)}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/30 hover:border-white bg-transparent hover:bg-white hover:text-black text-white text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              <span>Explore Event</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* CENTER COLUMN: Center Main Card & Peek Cards Stack Above/Below */}
          <div
            className="relative flex items-center justify-center overflow-visible pointer-events-auto mx-auto"
            style={{
              width: `${dims.mainWidth}px`,
              height: `${dims.mainHeight}px`,
            }}
          >
            {events.map((ev, index) => {
              return (
                <div
                  key={ev.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => handleCardClick(index)}
                  className="absolute inset-0 w-full h-full rounded-[2px] overflow-hidden border border-white/20 bg-neutral-900 will-change-transform shadow-[0_16px_40px_rgba(0,0,0,0.85)] cursor-pointer group"
                  style={{
                    transform: "translate3d(0, 0, 0) scale(1)",
                    opacity: index === 0 ? 1 : 0,
                    zIndex: index === 0 ? 25 : 0,
                  }}
                >
                  <img
                    src={ev.image}
                    alt={ev.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />

                  {/* Subtle sheen highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-white/10 pointer-events-none" />

                  {/* Mobile text banner inside card (visible on mobile for center card) */}
                  <div className="card-mobile-banner lg:hidden absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/85 to-transparent transition-opacity duration-300">
                    <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase">
                      {ev.phase}
                    </span>
                    <h4 className="font-sans font-bold text-lg uppercase text-white mt-0.5">
                      {ev.name}
                    </h4>
                    <p className="font-sans text-[11px] text-neutral-300 font-light mt-0.5 line-clamp-2">
                      {ev.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Description with subtle dark scrim for crisp readability */}
          <div className="w-full max-w-[280px] xl:max-w-[320px] 2xl:max-w-[340px] hidden lg:flex flex-col items-end text-right pointer-events-auto p-4 sm:p-5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[11px] tracking-widest text-white/80 uppercase mb-2.5">
              {currentEvent.isUpcoming || currentEvent.date.toLowerCase().includes("coming soon")
                ? "Registrations opening soon"
                : currentEvent.attendees}
            </span>

            <p className="font-sans text-xs sm:text-sm text-neutral-200 font-light leading-relaxed mb-6">
              {currentEvent.desc}
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/50 uppercase">
              <span>MMMUT CSE ECOSYSTEM</span>
              <span className="w-1.5 h-1.5 bg-white/40" />
              <span>FLUX</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM-RIGHT EVENT NUMBER IN ITALIC SCRIPT WITH CIRCULAR ARC
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-[calc(var(--ticker-h)+18px)] right-[var(--gutter)] z-30 flex items-center gap-3 select-none pointer-events-none">
        <div className="relative w-14 h-14 flex items-center justify-center">
          {/* SVG Circular Progress Arc */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Center number in Italic Script */}
          <span className="absolute inset-0 flex items-center justify-center font-script text-2xl sm:text-3xl text-white italic drop-shadow-md">
            {currentEvent.id}
          </span>
        </div>
      </div>
    </section>
  );
}
