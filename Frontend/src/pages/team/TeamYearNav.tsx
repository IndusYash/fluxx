import React, { useState, useEffect, useCallback } from 'react';
import { YEAR_SECTIONS } from './teamData';

const YEAR_SUBTITLES: Record<string, string> = {
  seniors: 'Leadership, Architecture & Society Legacy',
  'pre-final': 'Core Technical Leads & System Mentors',
  sophomores: 'Executive Builders & Emerging Innovators',
};

export const TeamYearNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(YEAR_SECTIONS[0]?.id || 'seniors');

  const handleScrollToSection = useCallback((id: string) => {
    setActiveId(id);
    const target = document.getElementById(`section-${id}`);
    if (target) {
      const navOffset = 95; // height offset below floating main navbar
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Auto-detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.35;

      for (let i = YEAR_SECTIONS.length - 1; i >= 0; i--) {
        const sec = YEAR_SECTIONS[i];
        const el = document.getElementById(`section-${sec.id}`);
        if (el) {
          const top = el.offsetTop;
          if (viewportMid >= top - 80) {
            setActiveId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 my-8 sm:my-12 select-none">
      {/* Section Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#4dff7c] uppercase tracking-widest font-semibold mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4dff7c] animate-pulse" />
            <span>COHORT DIRECTORY // SELECT TO JUMP</span>
          </div>
          <h2
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            className="text-white text-xl sm:text-2xl font-extrabold tracking-tight"
          >
            Explore FLUX by Academic Year
          </h2>
        </div>
        <p className="text-neutral-400 font-sans text-xs sm:text-sm max-w-sm sm:text-right">
          Click any batch card below to jump directly or scroll down to deal out the interactive stack.
        </p>
      </div>

      {/* 3 Interactive Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-5">
        {YEAR_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          const previewMembers = section.members.slice(0, 4);
          const remainingCount = Math.max(0, section.members.length - 4);
          const tagline = YEAR_SUBTITLES[section.id] || 'Active FLUX Builders';

          return (
            <div
              key={section.id}
              onClick={() => handleScrollToSection(section.id)}
              className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden backdrop-blur-md ${
                isActive
                  ? 'bg-gradient-to-b from-[#4dff7c]/15 to-[#0a100d] border border-[#4dff7c]/70 shadow-[0_0_35px_rgba(77,255,124,0.18)] translate-y-[-2px]'
                  : 'bg-[#0a100d]/80 border border-white/10 hover:border-[#4dff7c]/40 hover:bg-[#0c1410] hover:translate-y-[-3px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]'
              }`}
            >
              {/* Sci-Fi Micro Tech Brackets */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#4dff7c]/50 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#4dff7c]/50 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#4dff7c]/50 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#4dff7c]/50 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Active top neon glow line */}
              {isActive && (
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-[#4dff7c] shadow-[0_0_12px_#4dff7c]" />
              )}

              <div>
                {/* Header Row: Number Badge & Batch Tag */}
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`flex items-center gap-1.5 font-mono font-bold text-xs px-2.5 py-1 rounded-md border transition-all ${
                      isActive
                        ? 'border-[#4dff7c] text-[#4dff7c] bg-[#4dff7c]/15 shadow-[0_0_10px_rgba(77,255,124,0.3)]'
                        : 'border-white/10 text-neutral-400 group-hover:border-[#4dff7c]/50 group-hover:text-white bg-white/[0.03]'
                    }`}
                  >
                    <span>{section.num}</span>
                    <span className="text-neutral-500">//</span>
                    <span>BATCH {section.batch}</span>
                  </div>

                  {isActive ? (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#4dff7c] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#4dff7c]/10 border border-[#4dff7c]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4dff7c] animate-pulse" />
                      <span>CURRENT</span>
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider group-hover:text-neutral-400">
                      {section.members.length} BUILDERS
                    </span>
                  )}
                </div>

                {/* Cohort Main Title */}
                <h3
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  className={`text-lg sm:text-xl font-extrabold uppercase tracking-tight leading-snug transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                  }`}
                >
                  {section.title}
                </h3>

                {/* Tagline / Subtitle */}
                <p className="text-neutral-400 text-xs font-sans mt-1 leading-relaxed line-clamp-2">
                  {tagline}
                </p>
              </div>

              {/* Bottom Section: Avatars Stack + Jump Button */}
              <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                {/* Overlapping Avatar Stack */}
                <div className="flex items-center -space-x-2 overflow-hidden py-0.5">
                  {previewMembers.map((m, idx) => (
                    <div
                      key={idx}
                      className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#0a100d] bg-neutral-900 shadow-md transition-transform duration-200 group-hover:scale-105"
                      title={`${m.name} - ${m.role}`}
                    >
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: m.imagePosition || 'center 20%',
                        }}
                      />
                    </div>
                  ))}
                  {remainingCount > 0 && (
                    <div className="relative w-8 h-8 rounded-full border-2 border-[#0a100d] bg-neutral-800/90 text-neutral-300 font-mono text-[10px] font-bold flex items-center justify-center shadow-md">
                      +{remainingCount}
                    </div>
                  )}
                </div>

                {/* Action CTA Pill */}
                <div
                  className={`flex items-center gap-1 text-xs font-mono font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#4dff7c]'
                      : 'text-neutral-400 group-hover:text-[#4dff7c] group-hover:translate-x-1'
                  }`}
                >
                  <span>Explore</span>
                  <span className="text-sm">↓</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
