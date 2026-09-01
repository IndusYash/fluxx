import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import TrueFocus from './TrueFocusHero';
import { useNavigate } from 'react-router-dom';

export interface HeroSectionProps { }

const HeroSection: React.FC<HeroSectionProps> = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gradient orbs - white theme */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          filter: "blur(80px)"
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)"
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
              Events & Workshops
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            <TrueFocus
              sentence="Step Into the Future"
              manualMode={false}
              blurAmount={5}
              borderColor="white"
              animationDuration={0.5}
              pauseBetweenAnimations={0.5}
              textColorClasses="bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Discover hands-on events, immersive workshops, and high-energy competitions built for creators and technologists.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              onClick={() => {
                const el = document.getElementById('upcoming-events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Events
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={() => navigate("/ideathon")}
              className="px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest text-gray-300 border border-white/20 hover:border-white hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={16} />
              View Ideathon
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
