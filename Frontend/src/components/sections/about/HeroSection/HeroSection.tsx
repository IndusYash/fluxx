import React from 'react';
import type { HeroSectionProps } from './HeroSection.types';
import './HeroSection.css';
import ParticleText from './ParticleText';

const HeroSection: React.FC<HeroSectionProps> = ({ description }) => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-2 sm:gap-3">
        <div className="w-full flex-shrink-0">
          <ParticleText
            text="Welcome To FLUX"
            particleSize={2.2}
            density={4}
            color="#ffffff"
            highlightColor="#9ca3af"
            scatter={190}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={42}
            repelRadius={120}
            idleDrift={0.8}
            trigger="mount"
            fontSize="clamp(3.5rem, 13vw, 9rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow
            style={{ width: '100%', height: 220, background: '#000000' }}
          />
        </div>

        <div className="flex-shrink-0">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold min-h-[1.5rem] flex items-center text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
              Future Leaders of Unbound Xperiments
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/50" />
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/50" />
        </div>

        <div className="w-full max-w-2xl flex-shrink-0">
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-center">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
