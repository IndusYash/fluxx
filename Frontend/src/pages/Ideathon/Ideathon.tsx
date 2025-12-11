import { useState, useEffect, memo, useRef } from "react";
import HeroSection from "./HeroSection";
import ShinyText from "./ShinyText";
import Demo from "./Demo.tsx";
import "./Ideathon.css";
import IdeathonInfo from "./IdeathonInfo.tsx";

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
    const globalEndTime = new Date("2025-12-16T23:59:59+05:30").getTime();

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
    <div>
  <div
    style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",   // 👈 allow page to grow
      overflow: "hidden",
      zIndex: 1,
    }}
  >
    <MemoizedHeroSection />

    {/* Overlay */}
   <div
  ref={containerRef}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5rem",
    textAlign: "center",
    zIndex: 50,
    pointerEvents: "auto",
    paddingInline: "1rem",
    paddingTop: "5rem", // ensures content never hides under navbar
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
      {/* View Details button below the timer */}
      <div style={{ width: "100%", maxWidth: "300px", pointerEvents: 'auto' }}>
        <style>{`
          .view-details-btn {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            width: 100%;
            padding: 0.75rem 1.5rem;
            background: rgba(150,255,245,0.05);
            border: 1.5px solid rgba(150,255,245,0.25);
            border-radius: 12px;
            backdrop-filter: blur(12px);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            font-size: 1.15rem;
            font-weight: 700;
            color: #fff;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 0.5rem;
            box-shadow: 0 0 14px rgba(150,255,245,0.15);
            overflow: hidden;
          }
          .view-details-btn::before {
            content: '';
            position: absolute;
            inset: -1px;
            background: linear-gradient(135deg, rgba(229,255,251,0.25), rgba(154,245,255,0.4), rgba(229,255,251,0.25));
            border-radius: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }
          .view-details-btn:hover::before {
            opacity: 1;
          }
          .view-details-btn:hover {
            transform: translateY(-2px);
            border-color: rgba(150,255,245,0.45);
            box-shadow: 0 0 14px rgba(150,255,245,0.25), 0 6px 24px rgba(0,0,0,0.4);
          }
          .view-details-btn-text {
            background: linear-gradient(135deg, #E5FFFB 0%, #6CFFF7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.15rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            text-align: center;
          }
        `}</style>
        <button
          className="view-details-btn"
          onClick={() => {
            const el = document.getElementById("ideathon-info");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="view-details-btn-text">View Details</span>
        </button>
      </div>
    </div>
    
  </div>
  <IdeathonInfo />
  </div>
);

};

export default Ideathon;
