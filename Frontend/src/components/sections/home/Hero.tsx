"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";

// --- Magnetic Button Component ---
const MagneticButton = ({ children, onClick, className }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- Typing Effect Component ---
const TypingEffect = ({ words, className }: { words: string[], className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % wordsRef.current.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Find the longest word to use as the "spacer" for height
  const longestIndex = words.reduce((maxI, w, i, arr) => w.length > arr[maxI].length ? i : maxI, 0);

  return (
    <span className={`${className} relative inline-block`}>
      {/* Invisible spacer word to reserve height/width */}
      <span className="invisible">{words[longestIndex]}</span>
      {words.map((word, index) => (
        <span
          key={index}
          className="absolute left-0 top-0 whitespace-nowrap transition-all duration-700 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
            filter: index === currentIndex ? 'blur(0)' : 'blur(2px)',
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

// --- FLUX Animated Text Component ---
const FluxAnimatedText = () => {
  const [visibleLetters, setVisibleLetters] = useState<Set<number>>(new Set());
  const titleText = useMemo(() => "FLUX".split(""), []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLetters(prev => {
        const next = new Set(prev);
        const nextIndex = titleText.findIndex((_, i) => !next.has(i));
        if (nextIndex !== -1) {
          next.add(nextIndex);
        }
        return next;
      });
    }, 400);
    
    return () => clearInterval(interval);
  }, [titleText]);
  
  return (
    <motion.h1 
      className="flex text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6"
    >

      {titleText.map((char, i) => {
        const isVisible = visibleLetters.has(i);
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 60, rotateX: -90, scale: 0.8 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 60,
              rotateX: isVisible ? 0 : -90,
              scale: isVisible ? 1 : 0.8,
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            className="inline-block relative"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e5e5e5 50%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(255,255,255,0.5))",
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};

// --- FLUX Animated Boxes Component ---
const FluxAnimatedBoxes = () => {
  const [glowingBoxes, setGlowingBoxes] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<"waiting" | "glowing" | "full" | "disappearing">("waiting");
  
  const gridSize = 5;
  
  const targetBoxes = [
    [0, 0], [0, 2], [0, 3], [0, 4],
    [1, 1],
    [2, 0], [2, 3], [2, 4],
    [3, 2],
    [4, 0], [4, 1]
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowingBoxes(prev => {
        const next = new Set(prev);
        
        if (phase === "waiting") {
          setPhase("glowing");
          return next;
        } else if (phase === "glowing") {
          const offBoxes = targetBoxes.filter(([r, c]) => !next.has(`${r},${c}`));
          if (offBoxes.length > 0) {
            const [r, c] = offBoxes[Math.floor(Math.random() * offBoxes.length)];
            next.add(`${r},${c}`);
          } else {
            setPhase("full");
          }
          return next;
        } else if (phase === "full") {
          setPhase("disappearing");
          return next;
        } else if (phase === "disappearing") {
          const onBoxes = targetBoxes.filter(([r, c]) => next.has(`${r},${c}`));
          if (onBoxes.length > 0) {
            const [r, c] = onBoxes[Math.floor(Math.random() * onBoxes.length)];
            next.delete(`${r},${c}`);
          } else {
            setPhase("waiting");
          }
          return next;
        }
        
        return next;
      });
    }, phase === "glowing" || phase === "disappearing" ? 500 : 1500);
    
    return () => clearInterval(interval);
  }, [phase]);
  
  const isGlowing = (row: number, col: number) => glowingBoxes.has(`${row},${col}`);
  
  return (
    <div className="relative flex items-center justify-center">
      <div className="grid grid-cols-5 gap-0">
        {Array.from({ length: gridSize }).map((_, row) => 
          Array.from({ length: gridSize }).map((_, col) => {
            const glowing = isGlowing(row, col);
            return (
              <motion.div
                key={`${row}-${col}`}
                className="relative"
                animate={{ 
                  opacity: glowing ? 1 : 0.08,
                  scale: glowing ? 1 : 0.85,
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  className="card-outline w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative"
                  animate={{
                    backgroundColor: glowing 
                      ? ["#ffffff", "#e5e5e5", "#ffffff"]
                      : "rgba(255,255,255,0.02)",
                    boxShadow: glowing 
                      ? [
                          "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)",
                          "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)",
                          "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)"
                        ]
                      : "0 0 0px rgba(255,255,255,0)",
                  }}
                  transition={{
                    duration: glowing ? 1.5 : 0.3,
                    repeat: glowing ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  style={{
                    border: glowing ? "1px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.02)",
                  }}
                />
              </motion.div>
            );
          })
        )}
      </div>
      
      {/* Glow effect behind boxes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: glowingBoxes.size > 0 ? [0.4, 0.7, 0.4] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
};

// --- Main Hero Component ---
import Galaxy from "@/components/ui/Galaxy/Galaxy";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section 
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      {/* Dark overlay to ensure text readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.35) 100%), linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 55%)",
        }}
      />

      {/* Animated grid overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content - Split Layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20 h-full">
        
        {/* Left Section - FLUX Text */}
        <div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6"
        >
          {/* FLUX Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FluxAnimatedText />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="max-w-xl"
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              Pioneering the next era of <span className="text-white font-medium">technology</span> — where developers, innovators, and tech enthusiasts shape tomorrow's digital landscape.
            </p>
          </motion.div>

          {/* INNOVATE INTERACT IMPACT Tags with Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="w-full flex justify-center md:justify-start"
          >
            <TypingEffect 
              words={["INNOVATE", "INTERACT", "IMPACT"]}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white"
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 items-center md:items-start relative z-30 mt-2"
          >
            <button
              onClick={() => navigate("/contact")}
              className="relative group overflow-hidden rounded-2xl p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gray-400 via-white to-gray-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="relative bg-black group-hover:bg-transparent transition-colors duration-300 rounded-2xl px-8 py-3.5 flex items-center justify-center gap-2">
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-300 group-hover:text-black transition-colors duration-300 tracking-wider uppercase">
                  Contact Us
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-gray-300 group-hover:text-black transition-colors duration-300"
                >
                  <ArrowRight size={16} />
                </motion.span>
              </div>
            </button>
            
            <button
              onClick={() => navigate("/events")}
              className="flex items-center gap-2 border border-white/15 hover:border-white/40 text-gray-300 hover:text-white px-8 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 bg-white/[0.03] hover:bg-white/[0.06]"
            >
              Explore Events
            </button>
          </motion.div>
        </div>

        {/* Right Section - Animated FLUX Logo Boxes */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center hidden md:flex"
        >
          <FluxAnimatedBoxes />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
