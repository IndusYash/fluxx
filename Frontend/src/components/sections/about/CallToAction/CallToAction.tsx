import React, { useRef } from 'react';
import type { CallToActionProps } from './CallToAction.types';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import { motion } from 'framer-motion';

const CallToAction: React.FC<CallToActionProps> = ({ title, description, primaryButton, secondaryButton }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    triggerOnce: true,
  });

  // Container animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Individual element animation variants
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for smooth easing
      } 
    },
  };

  // Special animation for buttons (slide up from different directions)
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    },
  };

  return (
    <section ref={ref} className="relative pt-20 pb-40 lg:pt-32 lg:pb-40 bg-black text-white overflow-hidden">
      {/* Pure black background with subtle animated gradient overlay */}
      <div className="absolute inset-0 z-0 bg-black"></div>
      
      {/* Animated background accent */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 0.1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(circle at center, rgba(34, 197, 94, 0.3) 0%, transparent 70%)"
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Animated Title */}
        <motion.h2 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
        >
          {title}
        </motion.h2>

        {/* Animated Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
        
        {/* Animated Buttons Container */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary Button with enhanced animations */}
          <motion.a
            href="/induction"
            variants={buttonVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-green-500/30
                       transform transition-all duration-300 ease-out"
          >
            {primaryButton}
          </motion.a>
          
          {/* Secondary Button with enhanced animations */}
          <motion.a
            href="/events"
            variants={buttonVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              backgroundColor: "#4ade80",
              color: "#000",
              boxShadow: "0 15px 30px rgba(34, 197, 94, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-block px-8 py-4 border-2 border-green-400 text-green-400 font-semibold rounded-lg 
                       transform transition-all duration-300 ease-out"
          >
            {secondaryButton}
          </motion.a>
        </motion.div>

        {/* Animated decorative element */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isVisible ? { width: "100px", opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          className="mx-auto mt-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default CallToAction;
