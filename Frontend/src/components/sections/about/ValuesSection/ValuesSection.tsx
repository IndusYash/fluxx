import React, { useRef } from 'react';
import { ValuesSectionProps } from './ValuesSection.types';
import { motion } from 'framer-motion';

// Individual Value Card
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] 
                 shadow-lg shadow-white/5 hover:border-white/20 transition-all duration-300 group overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-white/[0.06] rounded-2xl border border-white/[0.1] text-white 
                          shadow-lg shadow-white/5 group-hover:border-white/20 transition-all duration-300">
            <div className="relative">
              {icon}
            </div>
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-center mb-3 text-white tracking-tight">
          {title}
        </h3>
        <p className="text-gray-400 text-center leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Main ValuesSection Component
const ValuesSection: React.FC<ValuesSectionProps> = () => {
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

  return (
      <section className="relative py-20 lg:py-32 bg-[#020202] text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight">
             Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Core Values</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed text-center">
            These principles guide our actions and define our community.
          </p>
          
          <div className="relative mt-8 mx-auto w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-white to-gray-400 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
