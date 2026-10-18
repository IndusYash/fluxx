import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FluxLoadingScreen from "./FluxLoadingScreen";
import { introManager } from "@/lib/introState";
import { resetThemeToDark } from "@/hooks/useLightSectionObserver";
import { liquidController } from "@/components/sections/home/liquidController";

export const ROUTE_LABELS: Record<string, string> = {
  "/": "INITIALIZING FLUX CORE",
  "/about": "ACCESSING ARCHITECTURAL LEGACY",
  "/events": "SYNCHRONIZING FLUX EVENTS & CONCLAVES",
  "/events/bytebrawl-hacktoberfest": "LOADING BYTEBRAWL X HACKTOBERFEST",
  "/events/bytebrawl-hacktoberfest/register": "CONNECTING REGISTRATION PORTAL",
  "/events/fdp": "LOADING ATAL FDP RESEARCH",
  "/ideathon": "LOADING IDEATHON PROTOCOL",
  "/she-leads": "LOADING SHE LEADS CONCLAVE",
  "/sheleads": "LOADING SHE LEADS CONCLAVE",
  "/team": "LOADING FLUX TALENT CELL",
  "/faculty": "LOADING FACULTY ADVISORY",
  "/gallery": "LOADING PHOTO & MEDIA ARCHIVES",
  "/contact": "CONNECTING SECURE COMMUNICATION MATRIX",
};

/**
 * Returns a clean, high-tech cyber status label for any given pathname.
 */
export function getRouteLabel(pathname: string): string {
  if (!pathname) return "INITIALIZING FLUX CORE";
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (ROUTE_LABELS[clean]) return ROUTE_LABELS[clean];

  // Check prefix matches for nested routes
  for (const [key, label] of Object.entries(ROUTE_LABELS)) {
    if (key !== "/" && clean.startsWith(key)) {
      return label;
    }
  }

  const formatted = clean
    .replace(/^\//, "")
    .replace(/[-_/]/g, " ")
    .toUpperCase();
  return `LOADING ${formatted || "SYSTEM CORE"}`;
}

/**
 * Helper to trigger a cyber page transition from anywhere in the application.
 */
export function triggerRouteTransition(targetPath: string, customLabel?: string, duration = 460) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("flux:start-transition", {
      detail: { path: targetPath, label: customLabel, duration },
    })
  );
}

/**
 * Helper to smoothly return to the homepage top with cyber animation.
 */
export function triggerHomeNavigation() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("flux:navigate-home"));
}

export default function RouteTransitionLoader() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeLabel, setActiveLabel] = useState("");
  const prevPath = useRef(location.pathname);
  const isFirstRender = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoader = useCallback((label: string, duration = 460) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveLabel(label);
    setIsNavigating(true);

    timerRef.current = setTimeout(() => {
      setIsNavigating(false);
      timerRef.current = null;
    }, duration);
  }, []);

  // Safety watchdog: ensure loader never remains permanently stuck
  useEffect(() => {
    if (!isNavigating) return;
    const maxSafetyTimer = setTimeout(() => {
      setIsNavigating(false);
    }, 1500);
    return () => clearTimeout(maxSafetyTimer);
  }, [isNavigating]);

  // Isolate Lenis smooth-scroll & interaction while transition overlay is active
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isNavigating) {
      if ((window as any).__lenis && introManager.isDone()) {
        (window as any).__lenis.stop();
      }
    } else {
      if ((window as any).__lenis && introManager.isDone()) {
        (window as any).__lenis.start();
      }
    }
  }, [isNavigating]);

  // Listen for custom transition events and home return requests
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStartTransition = (e: Event) => {
      if (!introManager.isDone()) return;
      const customEvent = e as CustomEvent<{ path?: string; label?: string; duration?: number }>;
      const targetPath = customEvent.detail?.path || "/";

      // Do not run transition loader on judge panel admin routes
      if (targetPath.startsWith("/judge-panel")) return;

      const label = customEvent.detail?.label || getRouteLabel(targetPath);
      startLoader(label, customEvent.detail?.duration || 460);
    };

    const handleNavigateHome = () => {
      if (!introManager.isDone()) return;

      // Start cyber loader immediately
      startLoader(ROUTE_LABELS["/"] || "INITIALIZING FLUX CORE", 450);

      // Instantly reset scroll to top while loader covers screen
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Reset theme & liquid state to dark baseline
      resetThemeToDark();
      liquidController.forceState(0);

      // Redundant frame check for Lenis and browser scroll restoration
      requestAnimationFrame(() => {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    };

    window.addEventListener("flux:start-transition", handleStartTransition);
    window.addEventListener("flux:navigate-home", handleNavigateHome);

    return () => {
      window.removeEventListener("flux:start-transition", handleStartTransition);
      window.removeEventListener("flux:navigate-home", handleNavigateHome);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startLoader]);

  // Handle standard React Router pathname changes
  useEffect(() => {
    // 1. Initial mount: never show transition loading animation on initial site load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPath.current = location.pathname;
      return;
    }

    // 2. Only trigger on actual pathname changes
    if (prevPath.current === location.pathname) {
      return;
    }

    prevPath.current = location.pathname;

    // 3. Skip judge panel admin routes
    if (location.pathname.startsWith("/judge-panel")) {
      return;
    }

    // 4. If landing intro is still running, do not show loader
    if (!introManager.isDone()) {
      return;
    }

    // 5. Always display the matching FLUX cyber loading animation across all route changes
    const label = getRouteLabel(location.pathname);
    startLoader(label, 450);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname, startLoader]);

  return (
    <AnimatePresence mode="wait">
      {isNavigating && (
        <motion.div
          key="route-loader"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label={activeLabel || "Loading page"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] pointer-events-auto touch-none select-none overscroll-none"
        >
          <FluxLoadingScreen text={activeLabel} fullScreen={true} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
