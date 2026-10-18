import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FluxLoadingScreen from "./FluxLoadingScreen";
import { introManager } from "@/lib/introState";

const ROUTE_LABELS: Record<string, string> = {
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

  useEffect(() => {
    // 1. Initial mount: never show transition loading animation on initial site load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPath.current = location.pathname;
      return;
    }

    // 2. Only trigger on actual pathname changes (not in-page hash movements or section scrolling)
    if (prevPath.current === location.pathname) {
      return;
    }

    const fromPath = prevPath.current;
    prevPath.current = location.pathname;

    // 3. If landing intro is still running, do not show loader
    if (!introManager.isDone()) {
      return;
    }

    // 4. When returning to home page ("/"), ensure buttery smoothness without loading flash
    if (location.pathname === "/") {
      return;
    }

    const label =
      ROUTE_LABELS[location.pathname] ||
      `LOADING ${location.pathname.replace(/^\//, "").toUpperCase().replace(/[-/]/g, " ")}`;

    setActiveLabel(label);
    setIsNavigating(true);

    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 420);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] pointer-events-auto"
        >
          <FluxLoadingScreen text={activeLabel} fullScreen={true} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
