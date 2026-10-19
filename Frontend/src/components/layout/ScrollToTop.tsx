import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { resetThemeToDark } from "@/hooks/useLightSectionObserver";
import { liquidController } from "@/components/sections/home/liquidController";
import { introManager } from "@/lib/introState";

interface ScrollToTopProps {
  isMobile?: boolean;
}

export default function ScrollToTop({ isMobile = false }: ScrollToTopProps) {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    // 1. Immediately and unconditionally reset theme to dark on any route navigation
    resetThemeToDark();
    liquidController.forceState(0);

    const isInitialMount = prevPathRef.current === null;
    prevPathRef.current = pathname;

    // On initial mount / reload when intro is already done, preserve browser scroll restoration
    if (isInitialMount && introManager.isDone()) {
      return;
    }

    // 2. High performance instant scroll reset to top on page navigation
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [pathname, isMobile]);

  return null;
}