import React, { useRef } from 'react';
import type { WhyFluxMattersProps } from './WhyFluxMatters.types';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import ParticlesContainer from '../common/Particles';
import { motion, useAnimation } from 'framer-motion';

// --- Animated Point Component using Framer Motion ---
const AnimatedPoint: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const controls = useAnimation();

  const handleClick = () => {
    // Animate the shine effect on click
    controls.start({
      background: [
        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
        "linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.3) 150%, transparent 200%)",
      ],
      transition: { duration: 0.8, ease: "easeOut" },
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      // Enhanced hover effects with green shadow
      whileHover={{ 
        y: -12, 
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(34, 197, 94, 0.3)",
        borderColor: "rgba(34, 197, 94, 0.5)"
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative flex items-center space-x-6 p-6 rounded-2xl cursor-pointer overflow-hidden 
        bg-black/80 backdrop-blur-md border border-green-400/20 shadow-lg shadow-green-500/10"
    >
      {/* The shine effect is now a motion component */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, transparent 50%, transparent 100%)" }}
        animate={controls}
      />
      <div className="relative z-10 flex items-center space-x-6">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center ring-2 ring-green-400/30 shadow-sm shadow-green-400/20">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-300 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
};

// --- Main WhyFluxMatters Component ---
const WhyFluxMatters: React.FC<WhyFluxMattersProps> = ({ title, points = [] }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

  // Enhanced stagger animation variants for the container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // Increased delay for more pronounced stagger
        delayChildren: 0.2,    // Delay before first child starts
      },
    },
  };

  // Enhanced animation variants for each individual point
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,           // Start further down
      scale: 0.9       // Start slightly smaller
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8,      // Longer duration
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth easing
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    },
  };

  // Enhanced header animation
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  if (!points.length) return null;

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 z-0 bg-black"></div>
      <ParticlesContainer />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Animated header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Why <span className="text-green-400">FLUX</span> Matters
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            FLUX is more than a club; it's a catalyst for growth, innovation, and career-defining opportunities.
          </p>
          <div className="relative mt-6 mx-auto w-48 h-1 bg-gray-800 rounded-full">
            {/* Animated underline */}
            <motion.div 
              className="absolute top-0 left-0 h-full rounded-full bg-green-400"
              initial={{ width: 0 }}
              animate={isVisible ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            />
          </div>
        </motion.div>
        
        {/* Enhanced staggered animation for points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {points.map((point, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AnimatedPoint text={point} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyFluxMatters;
