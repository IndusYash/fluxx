import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { introManager, type IntroState } from "@/lib/introState";
import { DissolveRenderer } from "./DissolveShader";

export default function FluxIntro() {
  const [introState, setIntroState] = useState<IntroState>(introManager.getState());
  const [displayCount, setDisplayCount] = useState("000");
  const [isReadyToActivate, setIsReadyToActivate] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const dissolveRendererRef = useRef<DissolveRenderer | null>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const unsubscribe = introManager.subscribe((st) => {
      setIntroState(st);
    });
    return unsubscribe;
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 1. COUNTER STAGE (0 - 3.5s)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (introManager.isDone()) return;

    // Set manual scroll restoration and lock scroll at top top
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
      window.__lenis.stop();
    }

    // Lock page scroll
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-intro", "loading");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      introManager.skip();
      return;
    }

    let isCancelled = false;
    const progressObj = { value: 0 };

    // Real asset loading checkpoints
    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const heroImagePromise = new Promise((resolve) => {
      const img = new Image();
      img.src = "/src/assets/images/flux-logo-new.png";
      img.onload = resolve;
      img.onerror = resolve;
      setTimeout(resolve, 1500); // safety fallback
    });

    const assetsPromise = Promise.all([fontPromise, heroImagePromise]);

    // Counter animation with small organic stutters (takes ~3.2s)
    const counterTl = gsap.timeline({
      onUpdate: () => {
        if (isCancelled) return;
        const currentVal = Math.round(progressObj.value);
        const formatted = String(currentVal).padStart(3, "0");
        setDisplayCount(formatted);
      },
    });

    // Segment 1: rapid start
    counterTl.to(progressObj, {
      value: 28,
      duration: 0.65,
      ease: "power2.out",
    });
    // Micro-stutter dwell
    counterTl.to(progressObj, {
      value: 34,
      duration: 0.35,
      ease: "none",
    });
    // Segment 2: climb through 60s
    counterTl.to(progressObj, {
      value: 68,
      duration: 0.85,
      ease: "power1.inOut",
    });
    // Brief dwell
    counterTl.to(progressObj, {
      value: 74,
      duration: 0.3,
      ease: "none",
    });
    // Segment 3: surge to 94
    counterTl.to(progressObj, {
      value: 94,
      duration: 0.7,
      ease: "power2.out",
    });

    // Segment 4: sync with real asset loading before snapping to 100
    counterTl.call(() => {
      assetsPromise.then(() => {
        if (isCancelled) return;
        gsap.to(progressObj, {
          value: 100,
          duration: 0.45,
          ease: "power2.out",
          onUpdate: () => {
            if (isCancelled) return;
            const currentVal = Math.round(progressObj.value);
            setDisplayCount(String(currentVal).padStart(3, "0"));
          },
          onComplete: () => {
            if (isCancelled) return;
            introManager.setState("ready");
            setIsReadyToActivate(true);
          },
        });
      });
    });

    return () => {
      isCancelled = true;
      counterTl.kill();
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 2. ACTIVATION TRIGGER: DISSOLVE -> ASSEMBLE -> REVEAL
  // ─────────────────────────────────────────────────────────────
  const triggerMasterExperience = () => {
    if (introManager.getState() !== "ready") return;

    introManager.setState("dissolving");

    const canvas = shaderCanvasRef.current;
    if (canvas) {
      dissolveRendererRef.current = new DissolveRenderer(canvas);
    }

    const master = gsap.timeline();
    masterTimelineRef.current = master;

    const dissolveObj = { progress: 0 };
    const hooks = introManager.getHooks();

    // 1. DISSOLVE (1.4s): light screen dissolves through smoky noise edge
    master.to(dissolveObj, {
      progress: 1.0,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (dissolveRendererRef.current) {
          dissolveRendererRef.current.render(dissolveObj.progress);
        }
      },
      onComplete: () => {
        // Dispose dissolve WebGL canvas cleanly
        if (dissolveRendererRef.current) {
          dissolveRendererRef.current.dispose();
          dissolveRendererRef.current = null;
        }
      },
    });

    // 2. BLACK BEAT (0.5s pause in pure darkness)
    master.call(() => {
      introManager.setState("assembling");
    }, undefined, "+=0.1");

    master.to({}, { duration: 0.4 }); // quiet beat

    // 3. LOGO ASSEMBLE (1.3s)
    const assembleStartTime = master.duration();

    // Hook to PersistentChromeLogo to build the logo blocks
    if (hooks.onAssemble) {
      hooks.onAssemble(master, assembleStartTime);
    }

    // At assembly snap point: Short additive glow on the logo itself + camera shake
    master.call(() => {
      if (hooks.flashLogo) {
        hooks.flashLogo();
      }
      if (hooks.shakeCamera) {
        hooks.shakeCamera();
      }
    }, undefined, assembleStartTime + 1.28);

    // 4. HERO REVEAL (1.3s): Logo glides to hero and hero content manifests TOGETHER
    const revealStartTime = assembleStartTime + 1.35;

    master.call(() => {
      introManager.setState("revealing");
    }, undefined, revealStartTime);

    // Glide logo to hero position (duration 1.3s)
    if (hooks.onGlideToHero) {
      hooks.onGlideToHero(master, revealStartTime);
    }

    // Hero elements choreography: Starts at the EXACT SAME TIME as logo glide!
    master.call(() => {
      // Navbar slides down from y: -80, opacity: 0
      const nav = document.querySelector("#main-header") || document.querySelector("header");
      const scrim = document.getElementById("top-nav-scrim");
      if (nav) {
        gsap.set(nav, { visibility: "visible" });
        gsap.fromTo(nav, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" });
      }
      if (scrim) {
        gsap.set(scrim, { visibility: "visible" });
        gsap.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 1.0, ease: "power2.out" });
      }

      // Marquee sweeps in and settles
      const marquee = document.querySelector(".hero-marquee-wrapper");
      if (marquee) {
        gsap.fromTo(marquee, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" });
      }

      // Headline lines slide up from overflow masks (y: +100% to 0, stagger 0.12s)
      const lines = document.querySelectorAll(".reveal-line-inner");
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.1, stagger: 0.12, ease: "power3.out" }
        );
      }

      // Paragraphs and action buttons fade up (y: +24px to 0, stagger 0.08s)
      const fades = document.querySelectorAll(".hero-fade-item");
      if (fades.length > 0) {
        gsap.fromTo(
          fades,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.08, ease: "power2.out" }
        );
      }

      // Bottom ticker slides up from y: 40, opacity: 0
      const ticker = document.getElementById("bottom-ticker") || document.querySelector("footer[aria-label='Status Ticker']");
      if (ticker) {
        gsap.set(ticker, { visibility: "visible" });
        gsap.fromTo(ticker, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
      }
    }, undefined, revealStartTime);

    // Finalize intro completion
    master.call(() => {
      // Ensure scroll is at 0 before unlocking
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      introManager.setState("done");

      // Start Lenis smooth scroll
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
        window.__lenis.start();
      }

      // Enable custom cursor
      window.dispatchEvent(new CustomEvent("intro-complete"));
    }, undefined, revealStartTime + 1.25);
  };

  const handleSkip = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (masterTimelineRef.current) {
      masterTimelineRef.current.kill();
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
      window.__lenis.start();
    }
    introManager.skip();
  }, []);

  const handleActivation = useCallback(() => {
    if (introState === "ready") {
      triggerMasterExperience();
    }
  }, [introState]);

  // Keyboard and click activations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      } else if ((e.key === "Enter" || e.key === " ") && introState === "ready") {
        triggerMasterExperience();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [introState, handleSkip]);

  if (introState === "done") {
    return null;
  }

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. FULLSCREEN INTRO OVERLAY CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        onClick={handleActivation}
        className={`fixed inset-0 z-[120] select-none ${
          introState === "ready" ? "cursor-pointer" : "cursor-default"
        } ${introState === "assembling" || introState === "revealing" ? "pointer-events-none" : "pointer-events-auto"}`}
        aria-label="FLUX Intro Experience"
      >
        {/* LIGHT SCREEN BACKGROUND (0 to 3.5s + DISSOLVE SHADER) */}
        {(introState === "loading" || introState === "ready") && (
          <div className="absolute inset-0 bg-[#ededed] flex flex-col items-center justify-center transition-colors">
            {/* Centered numerals in Poiret One */}
            <div className="relative w-full max-w-2xl h-48 sm:h-64 flex items-center justify-center">
              <span
                className="font-poiret text-[clamp(5.5rem,20vw,19rem)] leading-none text-black absolute inset-0 flex items-center justify-center select-none"
              >
                {displayCount}
              </span>
            </div>

            {/* Tiny mono text below at low opacity */}
            {!isReadyToActivate ? (
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-black/40 uppercase mt-12 transition-opacity duration-300">
                FLUX // LOADING
              </span>
            ) : (
              <span id="flux-activate-prompt" className="font-mono text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.28em] text-black/80 uppercase mt-12 animate-pulse transition-opacity duration-500 text-center px-4">
                TAP ANYWHERE TO ACTIVATE
              </span>
            )}

            {/* Visible SKIP link in corner */}
            <button
              onClick={handleSkip}
              className="absolute top-6 right-6 sm:right-8 font-mono text-xs tracking-[0.2em] uppercase text-black/60 hover:text-black transition-colors cursor-pointer py-2 px-3.5 min-h-[44px] min-w-[44px] flex items-center justify-center border border-black/20 hover:border-black/50"
            >
              SKIP
            </button>
          </div>
        )}

        {/* WEBGL DISSOLVE SHADER CANVAS */}
        <canvas
          ref={shaderCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ display: introState === "dissolving" ? "block" : "none" }}
        />
      </div>
    </>
  );
}

