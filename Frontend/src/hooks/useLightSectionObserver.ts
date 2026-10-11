import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isLiquidCoveringY } from "@/components/sections/home/LiquidShader";

interface ThemeListener {
  (navLight: boolean, tickerLight: boolean): void;
}

const listeners = new Set<ThemeListener>();
let currentNavLight = false;
let currentTickerLight = false;

export function resetThemeToDark() {
  currentNavLight = false;
  currentTickerLight = false;

  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("theme-light-active");
    document.documentElement.setAttribute("data-nav-theme", "dark");
    document.documentElement.setAttribute("data-ticker-theme", "dark");
  }

  listeners.forEach((fn) => fn(false, false));
}

export function setLiquidProgress(progress: number) {
  // If not on home page ("/"), never activate light theme!
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    resetThemeToDark();
    return;
  }

  const windowH = typeof window !== "undefined" ? window.innerHeight : 1080;
  const navYNorm = 36 / windowH; // center of ~72px navbar
  const tickerYNorm = (windowH - 20) / windowH; // center of ~40px ticker

  const nextNavLight = isLiquidCoveringY(progress, navYNorm);
  const nextTickerLight = isLiquidCoveringY(progress, tickerYNorm);

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
