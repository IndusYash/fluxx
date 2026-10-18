import React, { useEffect, useState, useRef } from "react";
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

export default function RouteTransitionLoader() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeLabel, setActiveLabel] = useState("");
  const prevPath = useRef(location.pathname);
  const isFirstRender = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startLoader = (label: string, duration = 450) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveLabel(label);
    setIsNavigating(true);

    timerRef.current = setTimeout(() => {
      setIsNavigating(false);
      timerRef.current = null;
    }, duration);
  };

  // Listen for custom transition events and home return requests
  useEffect(() => {
    const handleStartTransition = (e: Event) => {
      if (!introManager.isDone()) return;
      const customEvent = e as CustomEvent<{ path?: string; label?: string; duration?: number }>;
      const targetPath = customEvent.detail?.path || "/";
      const label = customEvent.detail?.label || ROUTE_LABELS[targetPath] || "INITIALIZING FLUX CORE";
      startLoader(label, customEvent.detail?.duration || 480);
    };

    const handleNavigateHome = () => {
      if (!introManager.isDone()) return;

      // Start loader immediately
      startLoader(ROUTE_LABELS["/"] || "INITIALIZING FLUX CORE", 450);

      // Instantly reset scroll to top while loader covers screen
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Reset theme & liquid state
      resetThemeToDark();
      liquidController.forceState(0);

      // Redundant frame check for Lenis / browser scroll
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
  }, []);

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

    // 3. If landing intro is still running, do not show loader
    if (!introManager.isDone()) {
      return;
    }

    // 4. Always display the matching FLUX cyber loading animation across all route changes including "/"
    const label =
      ROUTE_LABELS[location.pathname] ||
      `LOADING ${location.pathname.replace(/^\//, "").toUpperCase().replace(/[-/]/g, " ")}`;

    startLoader(label, 450);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] pointer-events-auto"
        >
          <FluxLoadingScreen text={activeLabel} fullScreen={true} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

