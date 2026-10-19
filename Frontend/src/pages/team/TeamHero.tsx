import React from 'react';
import campusBuildingImg from '@/assets/images/mmmut_building_pass.jpg';

export const TeamHero: React.FC = () => {
  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: 'clamp(220px, 15.4vw, 258px)',
        backgroundColor: '#060606',
        paddingLeft: 'var(--pad, clamp(16px, 3.83vw, 64px))',
        paddingRight: 'var(--pad, clamp(16px, 3.83vw, 64px))',
      }}
    >
      {/* Dark campus-building image faded in from the left */}
      <div
        className="absolute left-0 top-0 bottom-0 pointer-events-none select-none overflow-hidden"
        style={{
          width: 'clamp(320px, 45vw, 680px)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        }}
      >
        <img
          src={campusBuildingImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left opacity-25 brightness-75 contrast-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(6,6,6,0.3) 0%, rgba(6,6,6,0.7) 100%)',
          }}
        />
      </div>

      {/* Fine monochrome grid lines */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Faint wireframe globe bottom-right */}
      <div
        className="absolute bottom-[-15%] right-[-5%] sm:right-[4%] pointer-events-none select-none opacity-25"
        aria-hidden="true"
      >
        <svg
          width="260"
          height="260"
          viewBox="0 0 200 200"
          fill="none"
          className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px]"
        >
          {/* Outer circle */}
          <circle cx="100" cy="100" r="84" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" strokeDasharray="3 3" />
          {/* Latitude lines */}
          <ellipse cx="100" cy="100" rx="84" ry="28" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
          <ellipse cx="100" cy="100" rx="84" ry="58" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.6" strokeDasharray="4 2" />
          <line x1="16" y1="100" x2="184" y2="100" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
          {/* Longitude lines */}
          <ellipse cx="100" cy="100" rx="28" ry="84" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
          <ellipse cx="100" cy="100" rx="58" ry="84" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.6" strokeDasharray="4 2" />
          <line x1="100" y1="16" x2="100" y2="184" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Hero Content (Centered) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4">
        {/* Eyebrow "F L U X" flanked by thin lines */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
          <div className="h-[1px] w-6 sm:w-8 bg-white/40" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-white/90">
            F L U X
          </span>
          <div className="h-[1px] w-6 sm:w-8 bg-white/40" />
        </div>

        {/* Heading: "Meet the minds behind FLUX." (clean white with soft silver glow) */}
        <h1
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(28px, 3.2vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
          }}
          className="text-white mb-2 sm:mb-2.5 text-center"
        >
          Meet the minds behind FLUX<span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">.</span>
        </h1>

        {/* Subtext */}
        <p
          style={{ fontFamily: 'Inter, sans-serif' }}
          className="text-neutral-400 text-xs sm:text-sm md:text-[15px] max-w-lg mx-auto leading-relaxed text-center"
        >
          A team of passionate builders, creators and problem-solvers shaping the future, together.
        </p>
      </div>

      {/* Small vertical "SCROLL" indicator positioned at far right */}
      <div
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 hidden sm:flex flex-col items-center gap-2.5 text-neutral-500 font-mono text-[9px] tracking-[0.25em] uppercase select-none"
        aria-hidden="true"
      >
        <span style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
        <div className="w-[1.5px] h-7 bg-gradient-to-b from-white/80 to-transparent animate-pulse" />
      </div>

      {/* Thin bottom divider */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.22) 30%, rgba(255, 255, 255, 0.22) 70%, transparent 100%)',
        }}
      />
    </div>
  );
};
