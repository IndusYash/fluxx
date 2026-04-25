import React, { useRef } from 'react';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import { ValuesSectionProps } from './ValuesSection.types';
import ParticlesContainer from '../common/Particles';
import { motion } from 'framer-motion';

// Individual Value Card with optimized Framer Motion animations
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(34, 197, 94, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-green-400/20 
                 shadow-lg shadow-green-500/10 hover:border-green-400/40 transition-colors duration-300"
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-gray-800 rounded-full border border-gray-700 text-green-400 
                        shadow-sm shadow-green-400/20">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-center mb-4 text-white">
        {title}
      </h3>
      <p className="text-gray-400 text-center leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

// Main ValuesSection Component
const ValuesSection: React.FC<ValuesSectionProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

  const values = [
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: 'Innovation',
      description: 'We constantly push boundaries, encouraging creative solutions and pioneering new ideas.',
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      title: 'Collaboration',
      description: 'We believe in teamwork, fostering an inclusive environment where diverse minds connect and create.',
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: 'Excellence',
      description: 'We are committed to the highest standards of quality and integrity in every project we undertake.',
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: 'Impact',
      description: 'We focus on creating meaningful and positive impact on society through technology and leadership.',
    },
  ];

  // Container animation variants for efficient staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Individual card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      } 
    },
  };

  // Header animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  // Underline animation variants
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { 
        duration: 1,
        ease: "easeOut",
        delay: 0.5
      }
    },
  };

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
      <ParticlesContainer />
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
      >
        {/* Animated Header */}
        <div className="text-center mb-20">
          <motion.h2 
            variants={headerVariants}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Our <span className="text-green-400">Core Values</span>
          </motion.h2>
          
          <motion.p 
            variants={headerVariants}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            These principles guide our actions and define our community.
          </motion.p>
          
          {/* Animated underline */}
          <div className="relative mt-6 mx-auto w-48 h-1 bg-gray-800 rounded-full">
            <motion.div 
              variants={underlineVariants}
              className="absolute left-0 top-0 h-full rounded-full bg-green-400"
            />
          </div>
        </div>

        {/* Staggered Cards Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ValueCard
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ValuesSection;
