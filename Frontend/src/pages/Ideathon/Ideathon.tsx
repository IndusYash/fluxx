import { useState, useEffect, memo, useRef } from "react";
import HeroSection from "./HeroSection";
import ShinyText from "./ShinyText";
import Demo from "./Demo.tsx";
import "./Ideathon.css";

const MemoizedHeroSection = memo(HeroSection);

const Ideathon = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const globalEndTime = new Date("2025-12-10T20:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = globalEndTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
  <div
    style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",   // 👈 allow page to grow
      overflow: "hidden",
    }}
  >
    <MemoizedHeroSection />

    {/* Overlay */}
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: "55%",   // slight adjustment
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        pointerEvents: "none",
        width: "100%",
        paddingInline: "1rem",
      }}
    >
      {/* Title */}
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <ShinyText
  text="IDEATHON 2025"
  speed={4}
  className="ideathon-title"
  style={{
    fontFamily: '"Audiowide", sans-serif',
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "clamp(2rem, 8vw, 4.5rem)", // slightly tighter
    lineHeight: "1.08",
    textAlign: "center",
    maxWidth: "92vw",
    margin: 0,
  }}
/>

      </div>

      {/* Countdown */}
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <Demo timeLeft={timeLeft} />
      </div>
    </div>
  </div>
);

};

export default Ideathon;