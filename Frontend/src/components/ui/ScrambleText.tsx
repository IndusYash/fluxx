import React, { useState, useRef, useCallback } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!/[]#~";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number; // ms
}

export default function ScrambleText({ text, className = "", duration = 300 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const startTime = Date.now();
    const len = text.length;

    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * len);

      let scrambled = "";
      for (let i = 0; i < len; i++) {
        if (text[i] === " " || text[i] === "+") {
          scrambled += text[i];
        } else if (i < revealedCount) {
          scrambled += text[i];
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
      }
    }, 30);
  }, [text, duration]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayText(text);
  }, [text]);

  return (
    <span
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      className={`font-mono inline-block tracking-wide transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
}

