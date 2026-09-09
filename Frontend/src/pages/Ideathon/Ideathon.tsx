import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ResultHeader from "./ResultHeader";
import CircuitTraceBackground from "../../components/ui/CircuitTraceBackground";

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

  return (
    <div className="min-h-screen bg-[#050505] text-white relative">
      {/* Global Page Background */}
      <div className="fixed inset-0 z-0">
        <CircuitTraceBackground />
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: isMobile ? "auto" : "100vh",
          overflow: isMobile ? "visible" : "hidden",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            minHeight: isMobile ? "auto" : "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: isMobile ? "flex-start" : "center",
            alignItems: "center",
            gap: "1.25rem",
            textAlign: "center",
            zIndex: 50,
            pointerEvents: "auto",
            paddingInline: "1rem",
            paddingTop: isMobile ? "3rem" : "0",
            paddingBottom: isMobile ? "3rem" : "2rem",
          }}
        >
          <div style={{ width: "100%", maxWidth: "800px" }}>
            <h1
              className="ideathon-title"
              style={{
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "clamp(2.5rem, 9vw, 5.5rem)",
                lineHeight: "1.05",
                textAlign: "center",
                maxWidth: "92vw",
                margin: 0,
                color: "#E5FFFB",
                textShadow:
                  "0 0 4px rgba(229, 255, 251, 0.4), 0 0 12px rgba(154, 245, 255, 0.5), 0 0 24px rgba(255, 255, 255, 0.6)",
              }}
            >
              IDEATHON 2026
            </h1>
          </div>
          <div 
            style={{ 
              width: "100%", 
              overflow: "hidden", 
              marginTop: "2rem", 
              position: "relative",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)"
            }}
          >
            <motion.div
              className="flex whitespace-nowrap text-[#9AF5FF]/80 tracking-wide font-extrabold uppercase "
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              style={{
                width: "max-content",
                fontSize: "clamp(0.85rem, 2.5vw, 1.25rem)",
                letterSpacing: "0.25em",
                color: "rgba(154, 245, 255, 0.7)",
                textShadow: "0 0 10px rgba(154, 245, 255, 0.3)",
              }}
            >
              <span>
                COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦&nbsp;
              </span>
              <span>
                COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦&nbsp;
              </span>
              <span>
                COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦ COMING SOON ✦&nbsp;
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#050505] relative">
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          pointerEvents: "none",
        }} />

        <div
          className="max-w-6xl mx-auto px-6 py-12 relative z-10"
        >
          <ResultHeader />
        </div>
      </div>
    </div>
  );
};

export default Ideathon;
