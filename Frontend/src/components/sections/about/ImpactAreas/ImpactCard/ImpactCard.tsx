import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export interface ImpactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ icon, title, description }) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
    mouseX.set(175);
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
      className="group relative h-[350px] w-full rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.15), transparent 80%)`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/[0.04] rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" style={{ transform: 'translateZ(50px)' }}>
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.06] text-3xl text-white ring-1 ring-white/30 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          {icon}
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-3 text-xl font-bold text-slate-100 tracking-tight"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-slate-400 leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-6 flex items-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
        >
          <span className="text-sm font-medium">Explore Use Cases</span>
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImpactCard;
