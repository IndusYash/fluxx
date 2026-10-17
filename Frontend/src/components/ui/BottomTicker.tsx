import React from "react";
import { useLightSectionObserver } from "@/hooks/useLightSectionObserver";

export default function BottomTicker() {
  const { isTickerLight } = useLightSectionObserver();
  const items = ["INNOVATE", "INTERACT", "IMPACT"];

  return (
    <footer
      id="bottom-ticker"
      aria-label="Status Ticker"
      className={`fixed bottom-0 inset-x-0 z-[80] pointer-events-none select-none h-[calc(var(--ticker-h)+env(safe-area-inset-bottom,0px))] md:h-[var(--ticker-h)] pb-[env(safe-area-inset-bottom,0px)] md:pb-0 px-[var(--gutter)] flex items-center justify-between text-[11px] tracking-[0.28em] font-mono uppercase transition-colors duration-150 ${
        isTickerLight
          ? "bg-white/90 backdrop-blur-md border-t border-black/15 text-black"
          : "bg-black/75 backdrop-blur-md border-t border-white/10 text-white"
      }`}
    >
      {/* Left indicator tick marks */}
      <div className={`hidden sm:flex items-center gap-[3px] ${isTickerLight ? "opacity-60" : "opacity-40"}`}>
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className={`w-[1.5px] ${isTickerLight ? "bg-black" : "bg-white"}`}
            style={{
              height: `${4 + ((i * 7) % 10)}px`,
              opacity: i % 3 === 0 ? 0.95 : 0.45,
            }}
          />
        ))}
      </div>

      {/* Repeating words with + icons spaced across */}
      <div className="flex-1 flex items-center justify-around max-w-4xl mx-auto px-4">
        {items.map((word, index) => (
          <React.Fragment key={index}>
            <span className={`${isTickerLight ? "text-black/40" : "text-white/40"} font-light text-xs`}>✕</span>
            <span
              className={`font-medium tracking-[0.32em] transition-colors duration-150 ${
                isTickerLight ? "text-black hover:text-black/70" : "text-white/90 hover:text-white"
              }`}
            >
              {word}
            </span>
          </React.Fragment>
        ))}
        <span className={`${isTickerLight ? "text-black/40" : "text-white/40"} font-light text-xs`}>✕</span>
      </div>

      {/* Right coordinate / status */}
      <div className={`hidden sm:flex items-center gap-2 text-[11px] tracking-[0.2em] ${isTickerLight ? "text-black/60" : "text-white/60"}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isTickerLight ? "bg-black animate-pulse" : "bg-white animate-pulse"}`} />
        <span>FLUX // 2026</span>
      </div>
    </footer>
  );
}
