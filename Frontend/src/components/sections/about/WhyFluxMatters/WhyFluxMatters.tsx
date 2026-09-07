import React from 'react';
import type { WhyFluxMattersProps } from './WhyFluxMatters.types';

const AnimatedPoint: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  return (
    <div
      className="relative flex items-start space-x-5 p-6 md:p-7 rounded-2xl
        bg-white/[0.04] border border-white/[0.12] shadow-lg shadow-white/5 group overflow-hidden"
    >
      <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black font-bold text-sm ring-2 ring-white/30 shadow-lg shadow-white/10">
        {index + 1}
      </div>
      <p className="relative z-10 text-gray-200 leading-relaxed text-sm md:text-base">{text}</p>
    </div>
  );
};

const WhyFluxMatters: React.FC<WhyFluxMattersProps> = ({ title, points = [] }) => {
  if (!points.length) return null;

  return (
      <section className="relative py-20 lg:py-32 bg-[#020202] text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-white tracking-tight">
             Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">FLUX</span> Matters
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed text-center">
            FLUX is more than a club; it's a catalyst for growth, innovation, and career-defining opportunities.
          </p>
          <div className="relative mt-8 mx-auto w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-white to-gray-400"></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {points.map((point, index) => (
            <AnimatedPoint key={index} text={point} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFluxMatters;
