import React from 'react';
import type { CallToActionProps } from './CallToAction.types';

const CallToAction: React.FC<CallToActionProps> = ({ title, description }) => {
  return (
    <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
          {title}
        </h2>
        <p className="text-base md:text-lg text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mx-auto mt-12 h-1 bg-gradient-to-r from-white/60 to-gray-400 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
      </div>
    </section>
  );
};

export default CallToAction;
