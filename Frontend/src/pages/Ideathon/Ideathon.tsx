import { useState, useEffect, memo, useRef } from "react";
import HeroSection from "./HeroSection";
import ShinyText from "./ShinyText";
// import Demo from "./Demo.tsx";
import "./Ideathon.css";
// import IdeathonInfo from "./IdeathonInfo.tsx";
import ResultHeader from "./ResultHeader";

const MemoizedHeroSection = memo(HeroSection);

const Ideathon = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // const [timeLeft, setTimeLeft] = useState({
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });

  // useEffect(() => {
  //   const globalEndTime = new Date("2025-12-16T23:59:59+05:30").getTime();

  //   const updateCountdown = () => {
  //     const now = new Date().getTime();
  //     const distance = globalEndTime - now;

  //     if (distance > 0) {
  //       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //       setTimeLeft({ days, hours, minutes, seconds });
  //     } else {
  //       setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //     }
  //   };

  //   updateCountdown();
  //   const timer = setInterval(updateCountdown, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div>
  <div
    style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      overflow: "hidden",
      zIndex: 1,
    }}
  >
    {!isMobile && <MemoizedHeroSection />}
    
    {/* Mobile: Terminal/System output style */}
    {isMobile && (
      <>
        {/* Base gradient with more green */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at top, #0d2a15 0%, #051008 40%, #000000 100%)",
        }} />
        
        {/* Grid pattern - more visible */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.06,
          backgroundImage: `linear-gradient(rgba(74, 222, 128, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(74, 222, 128, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        
        {/* Diagonal lines overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(74, 222, 128, 0.3) 40px,
            rgba(74, 222, 128, 0.3) 41px
          )`,
        }} />
        
        {/* Larger radial glow effects - multiple layers */}
        <div style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "80%",
          background: "radial-gradient(ellipse, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.06) 40%, transparent 70%)",
          filter: "blur(50px)",
        }} />
        
        <div style={{
          position: "absolute",
          top: "60%",
          left: "30%",
          width: "60%",
          height: "50%",
          background: "radial-gradient(circle, rgba(74, 222, 128, 0.08) 0%, transparent 50%)",
          filter: "blur(40px)",
        }} />
        
        {/* Corner accent - top left */}
        <div style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          width: "60px",
          height: "60px",
          borderTop: "2px solid rgba(74, 222, 128, 0.4)",
          borderLeft: "2px solid rgba(74, 222, 128, 0.4)",
        }} />
        
        {/* Corner accent - bottom right */}
        <div style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          width: "60px",
          height: "60px",
          borderBottom: "2px solid rgba(74, 222, 128, 0.4)",
          borderRight: "2px solid rgba(74, 222, 128, 0.4)",
        }} />
        
        {/* Additional corner accents - top right small */}
        <div style={{
          position: "absolute",
          top: "3rem",
          right: "1.5rem",
          width: "30px",
          height: "30px",
          borderTop: "1px solid rgba(74, 222, 128, 0.3)",
          borderRight: "1px solid rgba(74, 222, 128, 0.3)",
        }} />
        
        {/* Horizontal line accent - top */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: 0,
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.4), transparent)",
        }} />
        
        {/* Vertical line accent - right side */}
        <div style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: "1px",
          height: "40%",
          background: "linear-gradient(180deg, transparent, rgba(74, 222, 128, 0.3), transparent)",
        }} />
      </>
    )}

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
    paddingTop: isMobile ? "3rem" : "5rem",
    paddingBottom: "2rem",
  }}
>

      {/* Title - Moved up by reducing top padding */}
      <div style={{ width: "100%", maxWidth: "800px", marginTop: isMobile ? "-2rem" : "-4rem" }}>
        {isMobile ? (
          <div style={{
            fontFamily: '"Fira Code", "JetBrains Mono", monospace',
            background: "rgba(10, 10, 10, 0.8)",
            border: "1px solid rgba(74, 222, 128, 0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(74, 222, 128, 0.1)",
          }}>
            {/* Terminal header bar */}
            <div style={{
              background: "rgba(20, 20, 20, 0.9)",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(74, 222, 128, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }}></div>
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(150, 150, 150, 0.6)" }}>
                ideathon-results.sh
              </div>
            </div>
            
            {/* Terminal content */}
            <div style={{ padding: "1.5rem", color: "rgba(255, 255, 255, 0.9)" }}>
              {/* Command prompt */}
              <div style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>
                <span style={{ color: "#4ade80" }}>flux@mmmut</span>
                <span style={{ color: "rgba(150, 150, 150, 0.6)" }}>:</span>
                <span style={{ color: "#6CFFF7" }}>~/events</span>
                <span style={{ color: "rgba(150, 150, 150, 0.6)" }}>$</span>
                <span style={{ color: "rgba(255, 255, 255, 0.9)" }}> cat ideathon_2025.txt</span>
              </div>
              
              {/* Divider */}
              <div style={{ 
                height: "1px", 
                background: "linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.3), transparent)",
                marginBottom: "1rem"
              }} />
              
              {/* Event info grid */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "auto 1fr",
                  gap: "0.5rem 1rem",
                  fontSize: "0.8rem",
                  marginBottom: "1rem"
                }}>
                  <span style={{ color: "rgba(150, 150, 150, 0.6)" }}>┌ EVENT:</span>
                  <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>Innovation Challenge</span>
                  
                  <span style={{ color: "rgba(150, 150, 150, 0.6)" }}>├ YEAR:</span>
                  <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>2025</span>
                  
                  <span style={{ color: "rgba(150, 150, 150, 0.6)" }}>├ STATUS:</span>
                  <span style={{ color: "#27c93f" }}>● COMPLETED</span>
                  
                  <span style={{ color: "rgba(150, 150, 150, 0.6)" }}>└ TEAMS:</span>
                  <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>10 Participating</span>
                </div>
              </div>
              
              {/* Main title section */}
              <div style={{
                background: "rgba(74, 222, 128, 0.05)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                borderLeft: "3px solid #4ade80",
                padding: "1.25rem 1rem",
                marginBottom: "1rem",
              }}>
                <div style={{ 
                  fontSize: "0.7rem", 
                  color: "rgba(74, 222, 128, 0.7)", 
                  marginBottom: "0.5rem",
                  letterSpacing: "0.05em"
                }}>
                  # EVENT_TITLE
                </div>
                <h1 style={{
                  fontFamily: '"Audiowide", sans-serif',
                  fontSize: "clamp(1.6rem, 6.5vw, 2.2rem)",
                  fontWeight: 700,
                  color: "#4ade80",
                  margin: 0,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}>
                  IDEATHON 2025
                </h1>
              </div>
              
              {/* Stats bar */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                padding: "0.75rem",
                background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ color: "rgba(150, 150, 150, 0.6)", marginBottom: "0.2rem" }}>Winners</div>
                  <div style={{ color: "#FFD700", fontWeight: 700 }}>3</div>
                </div>
                <div style={{ width: "1px", background: "rgba(74, 222, 128, 0.2)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ color: "rgba(150, 150, 150, 0.6)", marginBottom: "0.2rem" }}>Special</div>
                  <div style={{ color: "#6CFFF7", fontWeight: 700 }}>7</div>
                </div>
                <div style={{ width: "1px", background: "rgba(74, 222, 128, 0.2)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ color: "rgba(150, 150, 150, 0.6)", marginBottom: "0.2rem" }}>Total</div>
                  <div style={{ color: "#4ade80", fontWeight: 700 }}>10</div>
                </div>
              </div>
              
              {/* Footer prompt */}
              <div style={{ 
                fontSize: "0.8rem",
                color: "rgba(74, 222, 128, 0.7)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span>→</span>
                <span>Scroll down to view results</span>
              </div>
            </div>
          </div>
        ) : (
          <ShinyText
            text="IDEATHON 2025"
            speed={4}
            className="ideathon-title"
            style={{
              fontFamily: '"Audiowide", sans-serif',
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: "clamp(2rem, 8vw, 4.5rem)",
              lineHeight: "1.08",
              textAlign: "center",
              maxWidth: "92vw",
              margin: 0,
            }}
          />
        )}
      </div>

      {/* Countdown - COMMENTED OUT */}
      {/* <div style={{ width: "100%", maxWidth: "300px" }}>
        <Demo timeLeft={timeLeft} />
      </div> */}
      
      {/* View Details button - COMMENTED OUT */}
      {/* <div style={{ width: "100%", maxWidth: "300px", pointerEvents: 'auto' }}>
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
      </div> */}
    </div>
    
  </div>

  {/* Results Content Section - Modern Design */}
  <div className="min-h-screen bg-black relative">
    {/* Subtle grid background */}
    <div style={{
      position: "absolute",
      inset: 0,
      opacity: 0.03,
      backgroundImage: `linear-gradient(rgba(74, 222, 128, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(74, 222, 128, 0.1) 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      pointerEvents: "none",
    }} />

    <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
      {/* Winners Section */}
      <section className="mb-12">
        {/* Terminal-style header */}
        <div className="mb-16 text-center">
          
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white">
            Our <span className="text-[#4ade80]">Winners</span>
          </h2>
        </div>

        {/* Winners Grid - Top 3 with size based on rank */}
        
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-8">
          {/* 2nd Place - Left - Medium Size */}
          <div className="w-full md:w-[360px] bg-gradient-to-br from-gray-900/50 to-black border-2 border-[#4ade80]/30 rounded-lg p-6 hover:border-[#4ade80]/60 hover:shadow-2xl hover:shadow-[#4ade80]/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 group cursor-pointer md:mt-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl group-hover:scale-110 transition-transform">🥈</div>
              <div className="flex-1">
                <div className="text-[#4ade80] text-sm font-mono mb-1">SECOND PLACE</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#4ade80] transition-colors">Team TRINETRA</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-400 text-sm font-mono">TEAM_MEMBERS = 3</div>
              <div className="pl-4 border-l-[3px] border-[#4ade80]/30 group-hover:border-[#4ade80]/60 transition-colors space-y-1">
                <div className="text-gray-300 text-sm">Aniket Sahu</div>
                <div className="text-gray-300 text-sm">Amit Kumar Patel</div>
                <div className="text-gray-300 text-sm">Manish Verma</div>
              </div>
            </div>
          </div>

          {/* 1st Place - Center - Largest */}
          <div className="w-full md:w-[380px] bg-gradient-to-br from-gray-900/50 to-black border-t-[6px] border-t-yellow-500 border-x-2 border-b-2 border-gray-800/50 rounded-lg p-8 hover:border-t-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-105 hover:-translate-y-3 transition-all duration-300 group cursor-pointer md:relative md:z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl group-hover:scale-125 transition-transform">🥇</div>
              <div className="flex-1">
                <div className="text-yellow-500 text-sm font-mono mb-1 group-hover:text-yellow-400 transition-colors">FIRST PLACE</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-100 transition-colors">ZenTechs</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-400 text-sm font-mono">TEAM_MEMBERS = 5</div>
              <div className="pl-4 border-l-[3px] border-yellow-500/30 group-hover:border-yellow-500/70 transition-colors space-y-1">
                <div className="text-gray-300 text-sm">Devansh Ranjan</div>
                <div className="text-gray-300 text-sm">Bhavesh Agrawal</div>
                <div className="text-gray-300 text-sm">Asmit Srivastav</div>
                <div className="text-gray-300 text-sm">Ashutosh Kumar Nigam</div>
                <div className="text-gray-300 text-sm">Ishika Saroj</div>
              </div>
            </div>
          </div>

          {/* 3rd Place - Right - Smallest */}
          <div className="w-full md:w-[340px] bg-gradient-to-br from-gray-900/50 to-black border-2 border-[#4ade80]/30 rounded-lg p-6 hover:border-[#4ade80]/60 hover:shadow-2xl hover:shadow-[#4ade80]/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 group cursor-pointer md:mt-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl group-hover:scale-110 transition-transform">🥉</div>
              <div className="flex-1">
                <div className="text-[#4ade80] text-sm font-mono mb-1 group-hover:text-[#6CFFF7] transition-colors">THIRD PLACE</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#4ade80] transition-colors">SpiralForge</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-400 text-sm font-mono">TEAM_MEMBERS = 4</div>
              <div className="pl-4 border-l-[3px] border-[#4ade80]/30 group-hover:border-[#4ade80]/60 transition-colors space-y-1">
                <div className="text-gray-300 text-sm">Kavya Saxena</div>
                <div className="text-gray-300 text-sm">Siddhant Singh</div>
                <div className="text-gray-300 text-sm">Nyasi</div>
                <div className="text-gray-300 text-sm">Pranav Sharma</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Appreciation Section */}
      <section>
        <div className="mb-12 text-center">
          
          <h3 className="text-3xl md:text-4xl font-bold font-mono text-white">
            Special <span className="text-[#4ade80]">Appreciation</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["TEAM NAVTECH", "Team BLITZ", "Kavach Nexus", "W.I.S.E", "VISIONARY VANGAURDS", "NexSight", "QuadCore"].map((team, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-gray-900/30 to-black border border-gray-800 rounded-lg p-4 hover:border-[#4ade80]/70 hover:shadow-xl hover:shadow-[#4ade80]/15 hover:scale-105 hover:-translate-y-1 transition-all duration-300 group text-center cursor-pointer"
            >
              <div className="text-gray-300 font-semibold text-sm group-hover:text-[#4ade80] group-hover:scale-110 transition-all duration-300">
                {team}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>

  {/* <IdeathonInfo /> */}
  </div>
);

};

export default Ideathon;
