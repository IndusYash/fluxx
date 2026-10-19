import React, { useEffect, useImperativeHandle, useRef } from "react";

import ideathoncomp from "/src/assets/images/ideathoncomp.webp";
import atalFdp from "/src/assets/images/atalFdp.webp";
import expert from "/src/assets/images/expert.webp";
import hackathon from "/src/assets/images/hackathon.webp";

export interface FloatingPlaneHandle {
  updateProgress: (progress: number) => void;
}

interface FloatingPlaneProps {
  className?: string;
}

export const photos = [
  {
    src: ideathoncomp,
    label: "IDEATHON // 2025",
    tag: "01 / 04",
    title: "IDEATHON 2025",
    desc: "Flagship Ideation & Innovation Sprint",
  },
  {
    src: atalFdp,
    label: "ATAL FDP // RESEARCH",
    tag: "02 / 04",
    title: "ATAL FDP RESEARCH",
    desc: "AI & Mechanistic Interpretability Symposium",
  },
  {
    src: expert,
    label: "EXPERT TALK // INTEL USA",
    tag: "03 / 04",
    title: "EXPERT TALK INTEL",
    desc: "Global Systems Architecture & Mentorship",
  },
  {
    src: hackathon,
    label: "BYTEBRAWL // HACKATHON",
    tag: "04 / 04",
    title: "BYTEBRAWL HACKATHON",
    desc: "48-Hour Competitive Code Clash",
  },
];

export function computePos(p: number): number {
  const clamped = Math.max(0, Math.min(1, p));
  // 3 segments between 4 photos: [0, 1/3], [1/3, 2/3], [2/3, 1]
  const segment = Math.min(2, Math.floor(clamped * 3));
  const segStart = segment / 3;
  const segProgress = (clamped - segStart) * 3; // 0 to 1 within this segment

  // Dwell plateau at start (0-30%) and end (85-100%), smooth Hermite transition in-between (30-85%)
  const tDwellStart = 0.28;
  const tDwellEnd = 0.85;

  let ease = 0;
  if (segProgress < tDwellStart) {
    ease = 0;
  } else if (segProgress > tDwellEnd) {
    ease = 1;
  } else {
    const u = (segProgress - tDwellStart) / (tDwellEnd - tDwellStart);
    ease = u * u * (3 - 2 * u);
  }

  return segment + ease;
}

const FloatingPlane = React.forwardRef<FloatingPlaneHandle, FloatingPlaneProps>(
  ({ className = "" }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const counterRef = useRef<HTMLSpanElement>(null);
    const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const labelRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);

    // 3D tilt tracking
    const tiltRef = useRef({
      baseRotX: 10,
      baseRotY: -14,
      baseRotZ: 2,
      mouseTiltX: 0,
      mouseTiltY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
    });

    const applyTransforms = (pos: number, p: number) => {
      // 1. Move & scale the 4 image layers
      for (let i = 0; i < photos.length; i++) {
        const el = imgRefs.current[i];
        if (!el) continue;

        const delta = i - pos;
        const translateY = delta * 102; // in %
        const scale = 1 - Math.min(0.12, Math.abs(delta) * 0.08);
        const opacity = Math.max(0, 1 - Math.abs(delta) * 1.4);
        const zIndex = Math.round((1 - Math.min(1, Math.abs(delta))) * 10);

        el.style.transform = `translate3d(0, ${translateY}%, 0) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      }

      // 2. Active metadata updates
      const activeIdx = Math.min(3, Math.max(0, Math.round(pos)));

      if (counterRef.current) {
        counterRef.current.innerText = `0${activeIdx + 1} / 04`;
      }

      for (let d = 0; d < 4; d++) {
        const dot = dotsRef.current[d];
        if (dot) {
          if (d === activeIdx) {
            dot.className = "w-1.5 h-1.5 rounded-full bg-white ring-2 ring-white/40 transition-all duration-200";
          } else {
            dot.className = "w-1.5 h-1.5 rounded-full bg-white/20 transition-all duration-200";
          }
        }
      }

      if (labelRef.current) {
        labelRef.current.innerText = photos[activeIdx].label;
      }
      if (subRef.current) {
        subRef.current.innerText = photos[activeIdx].desc;
      }
      if (progressLineRef.current) {
        progressLineRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      }

      // 3. Update 3D card tilt base angles
      const rotProgress = pos / 3;
      tiltRef.current.baseRotY = -14 + rotProgress * 28;
      tiltRef.current.baseRotX = 10 - rotProgress * 20;
      tiltRef.current.baseRotZ = 2 + Math.sin(rotProgress * Math.PI) * 4;
    };

    useImperativeHandle(
      ref,
      () => ({
        updateProgress: (p: number) => {
          const pos = computePos(p);
          applyTransforms(pos, p);
        },
      }),
      []
    );

    useEffect(() => {
      // Initialize with Photo 0 resting
      applyTransforms(0, 0);

      // Smooth mouse tilt loop
      let animId: number;
      const onMouseMove = (e: MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normX = (e.clientX - centerX) / (window.innerWidth / 2);
        const normY = (e.clientY - centerY) / (window.innerHeight / 2);
        tiltRef.current.targetMouseX = Math.max(-1, Math.min(1, normX)) * 8;
        tiltRef.current.targetMouseY = Math.max(-1, Math.min(1, normY)) * -8;
      };

      const loop = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          if (cardRef.current) cardRef.current.style.transform = "none";
          return;
        }

        const t = tiltRef.current;
        t.mouseTiltX += (t.targetMouseY - t.mouseTiltX) * 0.08;
        t.mouseTiltY += (t.targetMouseX - t.mouseTiltY) * 0.08;

        if (cardRef.current) {
          const totalRotX = t.baseRotX + t.mouseTiltX;
          const totalRotY = t.baseRotY + t.mouseTiltY;
          const totalRotZ = t.baseRotZ;
          cardRef.current.style.transform = `perspective(1000px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(${totalRotZ.toFixed(2)}deg)`;
        }

        animId = requestAnimationFrame(loop);
      };

      if (window.innerWidth >= 768) {
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        animId = requestAnimationFrame(loop);
      } else if (cardRef.current) {
        cardRef.current.style.transform = "none";
      }

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animId);
      };
    }, []);

    return (
      <div
        className={`relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] will-change-transform select-none ${className}`}
        style={{ perspective: "1000px" }}
      >
        {/* 3D Glass Card Container (flat on mobile) */}
        <div
          ref={cardRef}
          data-testid="legacy-floating-card"
          className="relative w-full aspect-[4/3] rounded-2xl p-2 sm:p-2.5 bg-gradient-to-br from-white/20 via-white/5 to-white/10 backdrop-blur-md border border-white/25 shadow-[0_30px_70px_rgba(0,0,0,0.85)] group transition-transform duration-75 ease-out max-md:!transform-none"
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1000px) rotateX(10deg) rotateY(-14deg) rotateZ(2deg)",
          }}
        >
          {/* Inner Image Viewport */}
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-950">
            {photos.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => (imgRefs.current[idx] = el)}
                data-photo-index={idx}
                className="absolute inset-0 w-full h-full will-change-transform transition-none"
                style={{
                  transform: idx === 0 ? "translate3d(0, 0%, 0) scale(1)" : "translate3d(0, 102%, 0) scale(0.92)",
                  opacity: idx === 0 ? 1 : 0,
                  zIndex: idx === 0 ? 10 : 0,
                }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full min-w-full min-h-full object-cover select-none pointer-events-none"
                  loading="eager"
                />
              </div>
            ))}

            {/* Subtle Glare overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-white/15 pointer-events-none z-20" />

            {/* Top Card Metadata Pill */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-white/90 uppercase px-2.5 py-1.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-md z-30">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">FLUX ARCHIVE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3].map((d) => (
                    <span
                      key={d}
                      ref={(el) => (dotsRef.current[d] = el)}
                      className={`w-1.5 h-1.5 rounded-full ${d === 0 ? "bg-white ring-2 ring-white/40" : "bg-white/20"}`}
                    />
                  ))}
                </div>
                <span ref={counterRef} data-card-counter="true" className="text-white font-medium">
                  01 / 04
                </span>
              </div>
            </div>

            {/* Bottom Card Caption & Scrub Bar */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-2 bg-black/85 backdrop-blur-md border border-white/15 rounded-md z-30">
              <div
                ref={labelRef}
                data-card-label="true"
                className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-white uppercase truncate"
              >
                {photos[0].label}
              </div>
              <div
                ref={subRef}
                data-card-sub="true"
                className="text-[10px] sm:text-[11px] text-neutral-400 font-light truncate mt-0.5"
              >
                {photos[0].desc}
              </div>

              {/* Progress Line */}
              <div className="mt-1.5 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={progressLineRef}
                  data-card-progress="true"
                  className="h-full bg-white transition-all duration-75 ease-out"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Outer Ambient Glow */}
          <div className="absolute -inset-1.5 rounded-2xl bg-white/5 blur-lg -z-10 pointer-events-none" />
        </div>
      </div>
    );
  }
);

FloatingPlane.displayName = "FloatingPlane";

export default FloatingPlane;
