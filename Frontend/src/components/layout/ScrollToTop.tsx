import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetThemeToDark } from "@/hooks/useLightSectionObserver";
import { liquidController } from "@/components/sections/home/liquidController";

interface ScrollToTopProps {
  isMobile?: boolean;
}

export default function ScrollToTop({ isMobile = false }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Immediately and unconditionally reset theme to dark on any route navigation
    resetThemeToDark();
    liquidController.forceState(0);

    // 2. High performance instant scroll reset to top
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