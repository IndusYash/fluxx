import { useEffect, useState } from "react";

export function useLightSectionObserver() {
  const [isNavbarLight, setIsNavbarLight] = useState(false);
  const [isTickerLight, setIsTickerLight] = useState(false);

  useEffect(() => {
    const checkIntersection = () => {
      const lightElements = document.querySelectorAll('[data-theme="light"]');
      if (lightElements.length === 0) {
        setIsNavbarLight(false);
        setIsTickerLight(false);
        return;
      }

      const navH = 72;
      const tickerH = 40;
      const windowH = window.innerHeight;

      let navLight = false;
      let tickerLight = false;

      lightElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Check if light section is under top navbar
        if (rect.top <= navH && rect.bottom >= 0) {
          navLight = true;
        }
        // Check if light section is under bottom ticker
        if (rect.bottom >= windowH - tickerH && rect.top <= windowH) {
          tickerLight = true;
        }
      });

      setIsNavbarLight(navLight);
      setIsTickerLight(tickerLight);

      if (navLight) {
        document.documentElement.classList.add("theme-light-active");
      } else {
        document.documentElement.classList.remove("theme-light-active");
      }
    };

    window.addEventListener("scroll", checkIntersection, { passive: true });
    window.addEventListener("resize", checkIntersection, { passive: true });
    window.addEventListener("theme-change", checkIntersection);
    checkIntersection();

    return () => {
      window.removeEventListener("scroll", checkIntersection);
      window.removeEventListener("resize", checkIntersection);
      window.removeEventListener("theme-change", checkIntersection);
      document.documentElement.classList.remove("theme-light-active");
    };
  }, []);

  return { isNavbarLight, isTickerLight };
}
