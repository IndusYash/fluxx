import React, { useRef } from 'react';
import type { MissionSectionProps } from './MissionSection.types';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import ParticlesContainer from '../common/Particles';
import { motion } from 'framer-motion';

// --- Animated Mission Item Component ---
const MissionItem: React.FC<{ mission: string; index: number }> = ({ mission, index }) => {
  return (
    <motion.div
      // Updated hover effects with green shadow instead of amber
      whileHover={{ y: -8, scale: 1.05, boxShadow: "0 10px 20px rgba(34, 197, 94, 0.25)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-start space-x-6 p-6 rounded-2xl cursor-pointer
        bg-black/80 backdrop-blur-md border border-green-400/20 shadow-lg shadow-green-500/10
        hover:border-green-400/40 hover:shadow-xl hover:shadow-green-500/20 transition-colors duration-300"
    >
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg ring-2 ring-green-400/30 shadow-sm shadow-green-400/20">
        {index + 1}
      </div>
      <div>
        <p className="text-gray-300 leading-relaxed">
          {mission}
        </p>
      </div>
    </motion.div>
  );
};

// --- Main MissionSection Component ---
const MissionSection: React.FC<MissionSectionProps> = ({ title, missions, subtitle }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

  // Fixed stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
  };

  // Simplified item variants for reliable stagger
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: 40,
      y: 20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };

  if (!missions?.length) return null;

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 z-0 bg-black"></div>
      <ParticlesContainer />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with separate animation */}
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {title}
          </h2>
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
          {/* Simple green underline */}
          <div className="relative mt-6 mx-auto w-48 h-1 bg-gray-800 rounded-full">
            <div className={`absolute top-0 left-0 h-full rounded-full bg-green-400 transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`}></div>
          </div>
        </div>
        
        {/* Fixed staggered animation container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {missions.map((mission, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MissionItem mission={mission} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
