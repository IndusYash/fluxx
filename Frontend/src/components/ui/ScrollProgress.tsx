import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const p = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 right-0 w-[2px] h-screen z-[100] pointer-events-none"
      aria-hidden="true"
    >
      {/* Background track (subtle) */}
      <div className="absolute inset-0 bg-white/[0.04]" />
      
      {/* Progress fill (pure white marker) */}
      <div
        className="w-full bg-white transition-all duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}

