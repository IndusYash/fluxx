import { useEffect, useState } from "react";
import { isLiquidCoveringY } from "@/components/sections/home/LiquidShader";

interface ThemeListener {
  (navLight: boolean, tickerLight: boolean): void;
}

const listeners = new Set<ThemeListener>();
let currentNavLight = false;
let currentTickerLight = false;

export function setLiquidProgress(progress: number) {
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
    }

    listeners.forEach((fn) => fn(nextNavLight, nextTickerLight));
  }
}

export function useLightSectionObserver() {
  const [isNavbarLight, setIsNavbarLight] = useState(currentNavLight);
  const [isTickerLight, setIsTickerLight] = useState(currentTickerLight);

  useEffect(() => {
    const listener: ThemeListener = (navLight, tickerLight) => {
      setIsNavbarLight(navLight);
      setIsTickerLight(tickerLight);
    };
    listeners.add(listener);

    // Initial sync
    setIsNavbarLight(currentNavLight);
    setIsTickerLight(currentTickerLight);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return { isNavbarLight, isTickerLight };
}
