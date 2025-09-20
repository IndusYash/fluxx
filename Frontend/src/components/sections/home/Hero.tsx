import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

// Floating Animation Variants - Right side bottom mein ghoomte rahega
const floatingButtonVariants = {
  animate: {
    y: [0, -10, 0],
    scale: [1, 1.05, 1],
    rotate: [0, 2, -2, 0],
    transition: {
      y: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
      scale: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

// Floating Join Now Button - Click pe induction page redirect
const FloatingJoinButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // 3 seconds baad show hoga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleJoinNow = () => {
    setIsClicked(true);
    
    // Click animation complete hone ke baad navigate
    setTimeout(() => {
      navigate("/induction");
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0, x: 50, y: 50 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
      >
        {/* Main floating button with text - CIRCULAR with text inside */}
        <motion.button
          onClick={handleJoinNow}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative group flex flex-col items-center justify-center w-24 h-24 rounded-full font-bold text-white shadow-2xl overflow-hidden"
          variants={floatingButtonVariants}
          animate="animate"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 40px rgba(16, 185, 129, 0.6)",
          }}
          whileTap={{ 
            scale: 0.9,
            boxShadow: "0 0 50px rgba(16, 185, 129, 0.8)",
          }}
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), #10b981, #059669)",
            border: "2px solid rgba(16, 185, 129, 0.3)",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          }}
        >
          {/* Rocket icon with animation */}
          <motion.span
            className="text-xl mb-1"
            animate={{
              rotate: isClicked ? [0, 15, -15, 0] : [0, 5, -5, 0],
              scale: isClicked ? [1, 1.3, 1] : [1, 1.1, 1],
            }}
            transition={{
              duration: isClicked ? 0.5 : 2,
              repeat: isClicked ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            🚀
          </motion.span>

          {/* Induction Open Text */}
          <motion.div
            className="text-center leading-tight"
            animate={isClicked ? { x: [0, 3, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xs font-bold">Induction</div>
            <div className="text-xs font-bold">Open</div>
          </motion.div>

          {/* Glowing ring animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 0.2, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Success checkmark animation on click */}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="text-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", damping: 15 }}
                >
                  ✓
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating particles around button */}
          {!isClicked && [...Array(4)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
              style={{
                left: `${50 + Math.cos((i * 90 * Math.PI) / 180) * 40}px`,
                top: `${50 + Math.sin((i * 90 * Math.PI) / 180) * 40}px`,
              }}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.button>

        {/* Enhanced tooltip - appears on hover */}
        <AnimatePresence>
          {isHovered && !isClicked && (
            <motion.div
              className="absolute bottom-28 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap border border-primary/30"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <div className="flex items-center gap-2">
                <span>🌟</span>
                <span>Join FLUX Community!</span>
              </div>
              {/* Tooltip arrow */}
              <div
                className="absolute top-full right-6 w-0 h-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid #1f2937",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click ripple effect */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced Typewriter Component (keeping existing)
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
  const navigate = useNavigate();
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
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
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

  const handleJoinClick = () => {
    navigate("/induction");
  };

  const handleExploreClick = () => {
    if (isMobile) {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/about");
    }
  };

  const handleEventsClick = () => {
    if (isMobile) {
      document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/events");
    }
  };

  return (
    <>
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
                backgroundPosition: {
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 2, ease: "easeOut" },
              }}
            >
              FLUX
            </motion.span>
          </div>
        )}

        {/* Content - keeping all existing content same */}
        <div className="relative z-20 text-center max-w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={textParent}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={textChild} className="space-y-3">
              <h1
                className="text-4xl sm:text-5xl md:text-[clamp(3rem,7vw,5rem)] font-black leading-tight tracking-tight text-white"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                <TypewriterMotto />
              </h1>

              <motion.h2
                className="text-xl sm:text-2xl md:text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight tracking-tight"
                style={{
                  fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-gray-100 mr-3">Igniting Ideas,</span>
                <motion.span
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, #10b981 50%, #059669 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% 200%",
                    filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))",
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontWeight: 700,
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Shaping Futures
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Rest of existing content */}
            <motion.div
              variants={textChild}
              className="space-y-4 max-w-3xl mx-auto"
            >
              <p
                className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium"
                style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
              >
                <span className="text-xl mr-2">🚀</span>
                <strong
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), #10b981)",
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
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% 100%",
                    filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  FLUX
                </motion.strong>{" "}
                – where brilliant minds converge to push the boundaries of
                technology, foster groundbreaking research, and build the future
                of computing.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-3">
                {["Innovation Hub", "Research Excellence", "Future Tech"].map(
                  (label, i) => (
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
                        borderColor: {
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                        },
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full bg-primary"
                        style={{ boxShadow: "0 0 8px hsl(var(--primary))" }}
                      />
                      <span
                        className="text-gray-300 font-medium text-sm"
                        style={{
                          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                        }}
                      >
                        {label}
                      </span>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              variants={textChild}
              className="flex flex-col sm:flex-row justify-center gap-4 pt-6"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg overflow-hidden shadow-md"
                style={{
                  background:
                    "linear-gradient(45deg, hsl(var(--primary)), #10b981)",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
                }}
              >
                <button
                  onClick={handleJoinClick}
                  className="px-6 py-3 inline-block bg-gradient-to-r from-[#707d7d] to-[#047481] rounded-lg hover:opacity-90 transition text-white font-semibold text-center"
                  style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                >
                  🚀 Join FLUX
                </button>
              </motion.div>

              <motion.button
                onClick={handleExploreClick}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg border-2 border-primary/50 bg-primary/10 backdrop-blur-sm overflow-hidden px-6 py-3 text-center text-gray-300 font-semibold"
                style={{ boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)" }}
              >
                🔥 Explore FLUX
              </motion.button>

              <motion.button
                onClick={handleEventsClick}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg border-2 border-primary/50 bg-primary/10 backdrop-blur-sm overflow-hidden px-6 py-3 text-center text-gray-300 font-semibold"
                style={{ boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)" }}
              >
                ⚡ Upcoming Events
              </motion.button>
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
                transition={{
                  duration: isHovered ? 30 : 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="mr-8 font-bold text-gray-400">
                  Future Leaders of Unbound Experiments
                </span>
                <span className="mr-8">Innovation • Research • Excellence</span>
                <span className="mr-8">Building Tomorrow's Technology</span>
                <span className="mr-8">Computer Science & Engineering</span>
                <span className="mr-8 font-bold text-primary">
                  MMMIT Gorakhpur
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating JOIN NOW Button - Right Bottom Corner */}
      <FloatingJoinButton />
    </>
  );
}
