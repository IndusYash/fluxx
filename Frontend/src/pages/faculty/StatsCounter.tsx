import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useCountAnimation } from "../../hooks/useCountAnimation";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { Users, Award, BookOpen, GraduationCap } from "lucide-react";

const StatsCounter: React.FC = React.memo(() => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(statsRef as React.RefObject<HTMLElement>, {
    threshold: 0.3,
  });

  const totalFaculty = useCountAnimation(47, 2000, isVisible);
  const departments = useCountAnimation(8, 2000, isVisible);
  const publications = useCountAnimation(250, 2500, isVisible);
  const awards = useCountAnimation(32, 2000, isVisible);

  const stats = [
    {
      icon: Users,
      value: totalFaculty,
      label: "Faculty Members",
      color: "text-white",
    },
    {
      icon: GraduationCap,
      value: departments,
      label: "Departments",
      color: "text-gray-300",
    },
    {
      icon: BookOpen,
      value: publications,
      label: "Publications",
      color: "text-white",
    },
    {
      icon: Award,
      value: awards,
      label: "Awards",
      color: "text-gray-300",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={statsRef}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 my-16"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="group relative text-center"
          >
            {/* Glass morphism card */}
            <motion.div
              className="relative bg-white/[0.03] backdrop-blur-[12px] rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500"
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              whileHover={{
                y: -4,
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Animated glow ring */}
              <motion.div
                className="absolute -inset-1 rounded-[1.25rem] bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.6 }}
              />

              {/* Icon container with floating animation */}
              <motion.div
                className="flex items-center justify-center mx-auto mb-4 w-12 h-12 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-500"
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  scale: 1.15,
                }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className={`text-white/70 group-hover:text-white transition-colors duration-300 ${stat.color.replace(
                    "text-",
                    "text-"
                  )}`}
                  whileHover={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" }}
                >
                  <Icon size={22} />
                </motion.div>
              </motion.div>

              {/* Value with glow on hover */}
              <motion.div
                className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} group-hover:text-white transition-colors duration-300`}
                whileHover={{
                  textShadow: "0 0 15px rgba(255,255,255,0.4)",
                  scale: 1.1,
                }}
              >
                {stat.value}
              </motion.div>

              {/* Label with underline animation */}
              <motion.div
                className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-semibold"
                whileHover={{ color: "#9ca3af", letterSpacing: "0.15em" }}
                transition={{ duration: 0.3 }}
              >
                {stat.label}
              </motion.div>

              {/* Bottom glow strip */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white/30 group-hover:w-[60%] rounded-full transition-all duration-500" />
            </motion.div>

            {/* Floating element behind the card */}
            <motion.div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/5 blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
});

StatsCounter.displayName = "StatsCounter";

export default StatsCounter;
