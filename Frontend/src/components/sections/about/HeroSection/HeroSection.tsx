import React from 'react';
import type { HeroSectionProps } from './HeroSection.types';
import './HeroSection.css';
import ParticleText from './ParticleText';

const HeroSection: React.FC<HeroSectionProps> = ({ description }) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center pt-[calc(var(--nav-h)+24px)] pb-[calc(var(--ticker-h)+24px)]">
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-2 sm:gap-3 w-full max-w-6xl">
        <div className="relative w-full flex-shrink-0 flex items-center justify-center min-h-[220px]">
          {/* Solid high-contrast crisp text fallback underneath */}
          <h1
            className="absolute inset-0 flex items-center justify-center font-sans font-black text-[clamp(3.5rem,13vw,9rem)] uppercase tracking-tight text-white/35 pointer-events-none select-none"
            aria-hidden="true"
          >
            Welcome To FLUX
          </h1>
          <ParticleText
            text="Welcome To FLUX"
            particleSize={3.4}
            density={5}
            color="#ffffff"
            highlightColor="#ffffff"
            scatter={150}
            gatherDuration={1400}
            stagger={300}
            pointerRepel={45}
            repelRadius={130}
            idleDrift={0.6}
            trigger="mount"
            fontSize="clamp(3.5rem, 13vw, 9rem)"
            fontWeight={900}
            fontFamily="inherit"
            glow={true}
            style={{ width: '100%', height: 220, background: 'transparent' }}
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
