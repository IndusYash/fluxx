import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isLiquidCoveringY } from "@/components/sections/home/LiquidShader";

interface ThemeListener {
  (navLight: boolean, tickerLight: boolean): void;
}

const listeners = new Set<ThemeListener>();
let currentNavLight = false;
let currentTickerLight = false;
let lastLiquidProgress = 0;
let currentCoverProgress = 0;

export function resetThemeToDark() {
  currentNavLight = false;
  currentTickerLight = false;
  lastLiquidProgress = 0;
  currentCoverProgress = 0;

  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("theme-light-active");
    document.documentElement.setAttribute("data-nav-theme", "dark");
    document.documentElement.setAttribute("data-ticker-theme", "dark");
  }

  listeners.forEach((fn) => fn(false, false));
}

function updateThemeState(nextNavLight: boolean, nextTickerLight: boolean) {
  if (nextNavLight !== currentNavLight || nextTickerLight !== currentTickerLight) {
    currentNavLight = nextNavLight;
    currentTickerLight = nextTickerLight;

    if (typeof document !== "undefined") {
      if (nextNavLight) {
        document.documentElement.classList.add("theme-light-active");
        document.documentElement.setAttribute("data-nav-theme", "light");
      } else {
        document.documentElement.classList.remove("theme-light-active");
        document.documentElement.setAttribute("data-nav-theme", "dark");
      }

      if (nextTickerLight) {
        document.documentElement.setAttribute("data-ticker-theme", "light");
      } else {
        document.documentElement.setAttribute("data-ticker-theme", "dark");
      }
    }

    listeners.forEach((fn) => fn(nextNavLight, nextTickerLight));
  }
}

export function setLiquidProgress(progress: number) {
  // If not on home page ("/"), never activate light theme!
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    resetThemeToDark();
    return;
  }

  lastLiquidProgress = progress;

  // If a cover is active, let setCoverProgress drive the theme
  if (currentCoverProgress > 0.001) {
    setCoverProgress(currentCoverProgress);
    return;
  }

  const windowH = typeof window !== "undefined" ? window.innerHeight : 1080;
  const navYNorm = 36 / windowH; // center of ~72px navbar (~0.033)
  const tickerYNorm = (windowH - 20) / windowH; // center of ~40px ticker (~0.981)

  const nextNavLight = isLiquidCoveringY(progress, navYNorm);
  const nextTickerLight = isLiquidCoveringY(progress, tickerYNorm);

  updateThemeState(nextNavLight, nextTickerLight);
}

/**
 * Sync theme during Stats -> About rising cover transition.
 * coverProgress: 0.0 (Stats fully visible) to 1.0 (About fully covers screen).
 * The dark wavy edge ascends from screen bottom (y = windowH) to screen top (y = 0).
 */
export function setCoverProgress(coverProgress: number) {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    resetThemeToDark();
    return;
  }

  currentCoverProgress = Math.min(1.0, Math.max(0.0, coverProgress));

  if (currentCoverProgress >= 0.999) {
    updateThemeState(false, false);
    return;
  }

  const windowH = typeof window !== "undefined" ? window.innerHeight : 1080;

  // Exact wavy edge position on screen (Legacy top minus apron wave baseline ~60px)
  let edgeY = (1.0 - currentCoverProgress) * 1.15 * windowH - 60;
  if (typeof document !== "undefined") {
    const legacy = document.getElementById("legacy-section");
    if (legacy) {
      edgeY = legacy.getBoundingClientRect().top - 60;
    }
  }

  // Ticker center is ~20px from bottom (windowH - 20).
  // Ticker is light while edge is below it, switches to dark once edge passes it.
  const nextTickerLight = edgeY > (windowH - 20);

  // Navbar center is ~36px from top.
  // Navbar is light while edge is below it, switches to dark once edge passes it.
  const nextNavLight = edgeY > 36;

  updateThemeState(nextNavLight, nextTickerLight);
}

export function useLightSectionObserver() {
  let pathname = "/";
  try {
    const location = useLocation();
    pathname = location.pathname;
  } catch {
    if (typeof window !== "undefined") {
      pathname = window.location.pathname;
    }
  }

  const isHome = pathname === "/";
  const [isNavbarLight, setIsNavbarLight] = useState(isHome ? currentNavLight : false);
  const [isTickerLight, setIsTickerLight] = useState(isHome ? currentTickerLight : false);

  useEffect(() => {
    if (!isHome) {
      resetThemeToDark();
      setIsNavbarLight(false);
      setIsTickerLight(false);
    } else {
      setIsNavbarLight(currentNavLight);
      setIsTickerLight(currentTickerLight);
    }
  }, [isHome, pathname]);

  useEffect(() => {
    const listener: ThemeListener = (navLight, tickerLight) => {
      const currentlyOnHome = typeof window !== "undefined" && window.location.pathname === "/";
      if (!currentlyOnHome) {
        setIsNavbarLight(false);
        setIsTickerLight(false);
        return;
      }
      setIsNavbarLight(navLight);
      setIsTickerLight(tickerLight);
    };
    listeners.add(listener);

    // Initial sync
    if (isHome) {
      setIsNavbarLight(currentNavLight);
      setIsTickerLight(currentTickerLight);
    } else {
      setIsNavbarLight(false);
      setIsTickerLight(false);
    }

    return () => {
      listeners.delete(listener);
    };
  }, [isHome]);

  return {
    isNavbarLight: isHome ? isNavbarLight : false,
    isTickerLight: isHome ? isTickerLight : false,
  };
}
