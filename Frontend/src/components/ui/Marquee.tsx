import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MarqueeProps {
  text?: string;
  speed?: number; // base speed in px per frame
  outlined?: boolean;
  className?: string;
  direction?: "left" | "right";
  isHero?: boolean;
}

export default function Marquee({
  text = "WHERE IDEAS MEET IMPACT",
  speed = 1.2,
  outlined = true,
  className = "",
  direction = "left",
  isHero = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let xPos = 0;
    let targetSpeed = speed * (direction === "left" ? -1 : 1);
    let currentSpeed = targetSpeed;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      // Add scroll velocity impulse
      const boost = delta * 0.15;
      currentSpeed = targetSpeed - boost;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    let animId: number;

    const tick = () => {
      // Ease currentSpeed back towards base targetSpeed
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      xPos += currentSpeed;

      // Wrap-around seamlessly based on half the track width
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (xPos <= -halfWidth) {
          xPos += halfWidth;
        } else if (xPos >= 0) {
          xPos -= halfWidth;
        }
      }

      track.style.transform = `translate3d(${xPos}px, 0, 0)`;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, [speed, direction]);

  const repeatedText = `${text} — ${text} — ${text} — ${text} — `;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap select-none pointer-events-none w-full ${className}`}
      style={
        isHero
          ? {
              maskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 42%, #000 68%, #000 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 42%, #000 68%, #000 100%)",
            }
          : undefined
      }
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className={`inline-flex will-change-transform font-sans font-black tracking-tighter uppercase leading-none ${
          isHero ? "hero-marquee-text" : ""
        }`}
        style={
          isHero
            ? {
                fontSize: "clamp(8rem, 26vh, 22rem)",
                WebkitTextStroke: isNarrow
                  ? "1px rgba(255, 255, 255, 0.14)"
                  : "1.5px rgba(255, 255, 255, 0.22)",
                color: isNarrow
                  ? "rgba(255, 255, 255, 0.015)"
                  : "rgba(255, 255, 255, 0.025)",
              }
            : {
                fontSize: "clamp(5rem, 13vw, 15rem)",
                WebkitTextStroke: outlined ? "1px rgba(255, 255, 255, 0.05)" : "none",
                color: outlined ? "transparent" : "rgba(255, 255, 255, 0.03)",
              }
        }
      >
        <span className="pr-8">{repeatedText}</span>
        <span className="pr-8">{repeatedText}</span>
      </div>
    </div>
  );
}

