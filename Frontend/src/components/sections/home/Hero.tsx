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

// Minimalist Floating Animation
const floatingButtonVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

// Modern Minimalist Floating Button
const FloatingJoinButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleJoinNow = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate("/events");
    }, 350);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Sleek Modern Button */}
        <motion.button
          onClick={handleJoinNow}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative group"
          variants={floatingButtonVariants}
          animate="animate"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Main Button Container */}
          <div
            className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold text-white shadow-lg overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 8px 24px rgba(16, 185, 129, 0.4)",
            }}
          >
            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #059669, #047857)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="relative flex items-center gap-3">
              {/* Icon */}
              <motion.div
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20"
                animate={{
                  rotate: isClicked ? [0, 360] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xl">🚀</span>
              </motion.div>

              {/* Text */}
              <div className="text-left">
                <div className="text-sm font-bold leading-tight">
                  Expert AI Session
                </div>
                <div className="text-xs opacity-90 leading-tight">
                  Registration Open
                </div>
              </div>
            </div>

            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-white/30"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Badge Notification */}
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              !
            </motion.div>
          </motion.div>
        </motion.button>

        {/* Sleek Tooltip Card */}
        <AnimatePresence>
          {isHovered && !isClicked && (
            <motion.div
              className="absolute bottom-full right-0 mb-3 w-64"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div
                className="relative bg-white rounded-2xl shadow-xl p-5 border"
                style={{
                  borderColor: "rgba(16, 185, 129, 0.2)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                    }}
                  >
                    ✨
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-bold text-base mb-1"
                      style={{ color: "#1f2937" }}
                    >
                      Expert AI Session
                    </h4>
                    <p className="text-xs text-gray-500">
                      Limited spots available
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {[
                    { icon: "🎯", text: "Live interactive workshop" },
                    { icon: "🤝", text: "Network with experts" },
                    { icon: "🎁", text: "Exclusive resources" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center justify-between py-2 px-3 rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                  }}
                >
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#047857" }}
                  >
                    Click to register
                  </span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </div>

                {/* Arrow */}
                <div
                  className="absolute top-full right-8 w-0 h-0"
                  style={{
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: "8px solid white",
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Overlay */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  className="text-3xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{ color: "#10b981" }}
                >
                  ✓
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

// TypewriterMotto component remains the same
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const handleJoinClick = () => {
    navigate("/events");
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

      <FloatingJoinButton />
    </>
  );
}
