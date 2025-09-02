import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Variants } from "framer-motion";

const textParent: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.08,
      ease: "easeInOut",
      duration: 0.4,
    },
  },
};

const textChild: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Enhanced Typewriter Component
const TypewriterMotto = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ["INNOVATE", "INTERACT", "IMPACT"];

  useEffect(() => {
    const word = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseDuration = isDeleting ? 400 : 1500;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else if (isDeleting) {
        setCurrentText(word.substring(0, currentText.length - 1));
      } else {
        setCurrentText(word.substring(0, currentText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span
      className="relative inline-block min-w-[200px] font-mono"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--primary)) 0%, #10b981 50%, #059669 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        backgroundSize: "200% 200%",
        filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.5))",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      }}
    >
      <motion.span
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "inherit",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {currentText}
      </motion.span>
      <motion.span
        className="inline-block w-0.5 h-10 sm:h-12 ml-2 align-middle"
        style={{
          background: "linear-gradient(180deg, hsl(var(--primary)), #10b981)",
          boxShadow: "0 0 10px hsl(var(--primary))",
        }}
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </span>
  );
};

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [intensity, setIntensity] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({ x, y });

        const centerX = 50;
        const centerY = 50;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(2500 + 2500);
        const newIntensity = 1 + (distance / maxDistance) * 2;
        setIntensity(newIntensity);
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Dynamically track screen width for responsiveness
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90 px-4 md:px-8"
    >
      {/* FLUX Background Watermark - hide on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span
            className="text-[clamp(18rem,35vw,30rem)] font-black leading-none tracking-tighter select-none opacity-8"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), #10b981, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% 200%",
              fontFamily: "'Orbitron', 'Exo 2', 'Inter', sans-serif",
              fontWeight: 900,
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              opacity: [0.08, 0.15, 0.08],
              scale: [1, 1 + (intensity - 1) * 0.1, 1],
            }}
            transition={{
              backgroundPosition: { duration: 15, repeat: Infinity, ease: "linear" },
              opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 2, ease: "easeOut" },
            }}
          >
            FLUX
          </motion.span>
        </div>
      )}

      {/* Hide complex animations on mobile */}
      {!isMobile && (
        <>
          {/* Interactive Tech Grid */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.5"
                    opacity={0.3 * intensity}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Animated Circuit Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.4 * intensity }}
          >
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            <motion.path
              d={`M 0,${mousePosition.y * 4} Q ${mousePosition.x * 8},${mousePosition.y * 2} ${mousePosition.x * 10},${mousePosition.y * 6}`}
              stroke="url(#circuitGradient)"
              strokeWidth={2 * intensity}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.path
              d={`M ${mousePosition.x * 12},0 Q ${mousePosition.x * 6},${mousePosition.y * 4} ${mousePosition.x * 14},${mousePosition.y * 8}`}
              stroke="url(#circuitGradient)"
              strokeWidth={1.5 * intensity}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </svg>

          {/* Binary Code Rain */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`binary-${i}`}
                className="absolute text-xs font-mono text-primary/30 whitespace-pre-line"
                style={{
                  left: `${5 + i * 8}%`,
                  top: "-10%",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                animate={{
                  y: ["0vh", "110vh"],
                  opacity: [0, 0.6 * intensity, 0],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.8,
                }}
              >
                {Array.from({ length: 20 }, () => (Math.random() > 0.5 ? "1" : "0")).join("\n")}
              </motion.div>
            ))}
          </div>

          {/* Particle Network */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => {
              const baseX = (i % 5) * 20 + 10;
              const baseY = Math.floor(i / 5) * 20 + 10;
              const distanceFromMouse = Math.sqrt(
                Math.pow(baseX - mousePosition.x, 2) + Math.pow(baseY - mousePosition.y, 2)
              );
              const influence = Math.max(0, 1 - distanceFromMouse / 50);

              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-primary/60 rounded-full"
                  style={{
                    left: `${baseX}%`,
                    top: `${baseY}%`,
                    boxShadow: `0 0 ${5 + influence * 15}px hsl(var(--primary))`,
                  }}
                  animate={{
                    scale: [1, 1.5 + influence * 2, 1],
                    opacity: [0.4, 0.8 + influence * 0.2, 0.4],
                    x: influence * (mousePosition.x - baseX) * 0.5,
                    y: influence * (mousePosition.y - baseY) * 0.5,
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                    x: { duration: 0.8, ease: "easeOut" },
                    y: { duration: 0.8, ease: "easeOut" },
                  }}
                />
              );
            })}
          </div>

          {/* Hexagonal Tech Pattern */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`hex-${i}`}
                className="absolute border border-primary/20"
                style={{
                  left: `${15 + (i % 3) * 25}%`,
                  top: `${20 + Math.floor(i / 3) * 15}%`,
                  width: "40px",
                  height: "40px",
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1 + intensity * 0.3, 1],
                  borderColor: [
                    `rgba(16, 185, 129, ${0.2 * intensity})`,
                    `rgba(16, 185, 129, ${0.6 * intensity})`,
                    `rgba(16, 185, 129, ${0.2 * intensity})`,
                  ],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                  borderColor: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                }}
              />
            ))}
          </div>

          {/* Code Snippets Floating */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {["<div>", "{code}", "func()", "&&", "||", "==="].map((code, i) => (
              <motion.div
                key={`code-${i}`}
                className="absolute text-xs font-mono text-primary/25"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7 * intensity, 0.3],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              >
                {code}
              </motion.div>
            ))}
          </div>

          {/* Glitch Effect Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(16, 185, 129, ${0.05 * intensity}) 48%, 
                rgba(16, 185, 129, ${0.1 * intensity}) 50%, 
                rgba(16, 185, 129, ${0.05 * intensity}) 52%, 
                transparent 100%
              )`,
              transform: `translateX(${mousePosition.x - 50}px)`,
            }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Cursor Following Glow (simplified for mobile) */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
          width: isMobile ? 150 : 300 + intensity * 100,
          height: isMobile ? 150 : 300 + intensity * 100,
          background: `radial-gradient(circle at center, 
            rgba(16, 185, 129, ${0.1 * intensity}) 0%,
            rgba(16, 185, 129, ${0.05 * intensity}) 50%,
            transparent 70%
          )`,
          filter: `blur(${isMobile ? 10 : 20 + intensity * 10}px)`,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-20 text-center max-w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={textParent} initial="hidden" animate="visible" className="space-y-4">
          <motion.div variants={textChild} className="space-y-3">
            <h1
              className="text-4xl sm:text-5xl md:text-[clamp(3rem,7vw,5rem)] font-black leading-tight tracking-tight text-white"
              style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              <TypewriterMotto />
            </h1>

            <motion.h2
              className="text-xl sm:text-2xl md:text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight tracking-tight"
              style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif" }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-gray-100 mr-3">Igniting Ideas,</span>
              <motion.span
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, #10b981 50%, #059669 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 200%",
                  filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))",
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  fontWeight: 700,
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Shaping Futures
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.div variants={textChild} className="space-y-4 max-w-3xl mx-auto">
            <p
              className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              <span className="text-xl mr-2">🚀</span>
              <strong
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                }}
              >
                Unleashing Innovation
              </strong>{" "}
              in Computer Science & Engineering
            </p>

            <p
              className="text-base text-gray-300 leading-relaxed"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Join{" "}
              <motion.strong
                className="font-bold text-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 100%",
                  filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                FLUX
              </motion.strong>{" "}
              – where brilliant minds converge to push the boundaries of technology, foster groundbreaking research, and build the future of computing.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-3">
              {["Innovation Hub", "Research Excellence", "Future Tech"].map((label, i) => (
                <motion.div
                  key={label}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm"
                  animate={{
                    y: [0, -3, 0],
                    borderColor: [
                      "rgba(16, 185, 129, 0.4)",
                      "rgba(16, 185, 129, 0.7)",
                      "rgba(16, 185, 129, 0.4)",
                    ],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, delay: i * 0.3 },
                    borderColor: { duration: 3, repeat: Infinity, delay: i * 0.3 },
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 8px hsl(var(--primary))" }}
                  />
                  <span className="text-gray-300 font-medium text-sm" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={textChild} className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg overflow-hidden shadow-md"
              style={{
                background: "linear-gradient(45deg, hsl(var(--primary)), #10b981)",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              }}
            >
             <a
  href="/about"
  className="px-6 py-3 inline-block bg-gradient-to-r from-[#707d7d] to-[#047481] rounded-lg hover:opacity-90 transition text-white font-semibold text-center"
  style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
>
  🔥 Explore FLUX
</a>


            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg border-2 border-primary/50 bg-primary/10 backdrop-blur-sm overflow-hidden px-6 py-3 text-center text-gray-300 font-semibold"
              style={{ boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)" }}
            >
              ⚡ Upcoming Events
            </motion.div>
          </motion.div>

          <motion.div
            variants={textChild}
            className="pt-4 overflow-hidden"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="whitespace-nowrap text-sm font-medium text-gray-500"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              animate={{ x: [0, -100] }}
              transition={{ duration: isHovered ? 30 : 12, repeat: Infinity, ease: "linear" }}
            >
              <span className="mr-8 font-bold text-gray-400">Future Leaders of Unbound Experiments</span>
              <span className="mr-8">Innovation • Research • Excellence</span>
              <span className="mr-8">Building Tomorrow's Technology</span>
              <span className="mr-8">Computer Science & Engineering</span>
              <span className="mr-8 font-bold text-primary">MMMIT Gorakhpur</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
