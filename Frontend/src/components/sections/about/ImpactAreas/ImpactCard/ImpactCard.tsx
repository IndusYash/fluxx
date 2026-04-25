import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi'; // Using react-icons for a clean arrow

// First, ensure you have framer-motion and react-icons installed:
// npm install framer-motion react-icons

export interface ImpactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ icon, title, description }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position states
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth transforms
  const springConfig = { damping: 15, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [0, 350], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 350], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(175); // Center of the card
    mouseY.set(175);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-[350px] w-full rounded-2xl bg-gray-900/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-[0_0_30px_#39FF14]/40"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(57, 255, 20, 0.15), transparent 80%)`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" style={{ transform: 'translateZ(50px)' }}>
        {/* Icon with a glowing backdrop */}
        <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-900/40 text-3xl text-[#39FF14] ring-1 ring-[#39FF14]/30 transition-transform duration-300 group-hover:scale-110">
          {icon}
          <div className="absolute inset-0 rounded-full bg-[#39FF14]/30 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Title */}
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-2xl font-bold text-slate-100"
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base text-slate-400"
        >
          {description}
        </motion.p>

        {/* Learn More - appears on hover */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-6 flex items-center gap-2 text-[#39FF14] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span>Explore Use Cases</span>
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImpactCard;
