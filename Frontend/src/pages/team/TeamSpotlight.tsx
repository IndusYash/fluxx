import React, { useMemo } from 'react';
import type { Member, YearSectionConfig } from './teamData';

interface TeamSpotlightProps {
  section: YearSectionConfig;
  hoveredMember: Member | null;
  forceVisible?: boolean;
}

export const TeamSpotlight: React.FC<TeamSpotlightProps> = ({
  section,
  hoveredMember,
  forceVisible = false,
}) => {
  // Compute wing breakdown for default state
  const wingBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    section.members.forEach((m) => {
      const r = m.role.toLowerCase();
      let wing = 'General';
      if (r.includes('president') || r.includes('secretary') || r.includes('coordinator') || r.includes('operations') || r.includes('treasurer')) {
        wing = 'Leadership & Ops';
      } else if (r.includes('dev')) {
        wing = 'Development';
      } else if (r.includes('ai') || r.includes('ml')) {
        wing = 'AI & ML';
      } else if (r.includes('algo')) {
        wing = 'Algorithms';
      } else if (r.includes('design')) {
        wing = 'Design';
      } else if (r.includes('photo') || r.includes('video')) {
        wing = 'Media';
      } else if (r.includes('content') || r.includes('social')) {
        wing = 'Social & Content';
      } else if (r.includes('executive')) {
        wing = 'Executive Wing';
      }
      counts[wing] = (counts[wing] || 0) + 1;
    });
    return counts;
  }, [section.members]);

  const activeMember = hoveredMember;

  return (
    <div
      className={`flux-spotlight-container ${forceVisible ? 'flux-force-visible' : ''}`}
      style={{
        position: 'absolute',
        left: '42%',
        top: '50%',
        width: 'var(--sw, 260px)',
        height: 'var(--sh, 380px)',
        margin: 'calc(var(--sh, 380px) / -2) 0 0 calc(var(--sw, 260px) / -2)',
        borderRadius: '16px',
        backgroundColor: '#0c0c0c',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow:
          '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        zIndex: 12,
      }}
    >
      {/* Corner Sci-Fi Tech Brackets */}
      <div
        className="absolute top-2 left-2 w-3 h-3 pointer-events-none"
        style={{
          borderTop: '2px solid rgba(255, 255, 255, 0.7)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.7)',
          opacity: 0.8,
        }}
      />
      <div
        className="absolute top-2 right-2 w-3 h-3 pointer-events-none"
        style={{
          borderTop: '2px solid rgba(255, 255, 255, 0.7)',
          borderRight: '2px solid rgba(255, 255, 255, 0.7)',
          opacity: 0.8,
        }}
      />
      <div
        className="absolute bottom-2 left-2 w-3 h-3 pointer-events-none"
        style={{
          borderBottom: '2px solid rgba(255, 255, 255, 0.7)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.7)',
          opacity: 0.8,
        }}
      />
      <div
        className="absolute bottom-2 right-2 w-3 h-3 pointer-events-none"
        style={{
          borderBottom: '2px solid rgba(255, 255, 255, 0.7)',
          borderRight: '2px solid rgba(255, 255, 255, 0.7)',
          opacity: 0.8,
        }}
      />

      {/* Background subtle monochrome mesh lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Content wrapper with smooth switch between Default and Member Spotlight */}
      <div className="relative w-full h-full p-5 sm:p-6 flex flex-col justify-between overflow-y-auto no-scrollbar">
        {activeMember ? (
          /* ── ACTIVE MEMBER SPOTLIGHT ── */
          <div className="flex flex-col h-full justify-between animate-in fade-in zoom-in-95 duration-200">
            {/* Top row: Status Badge & Batch */}
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/90 uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span>SPOTLIGHT</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400 px-2 py-0.5 rounded border border-white/10 bg-white/[0.03]">
                BATCH {activeMember.batch}
              </span>
            </div>

            {/* Member Large Photo - Stable & Uniform Height */}
            <div className="relative w-full flex-1 min-h-[185px] max-h-[255px] rounded-xl overflow-hidden border border-white/15 my-1.5 bg-black/60 shadow-inner flex-shrink-0">
              <img
                src={activeMember.image}
                alt={activeMember.name}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: activeMember.imagePosition || 'center 20%',
                  transform: activeMember.imageScale ? `scale(${activeMember.imageScale})` : undefined,
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 65%, rgba(12, 12, 12, 0.9) 100%)',
                }}
              />
            </div>

            {/* Under Photo: ONLY Name, Designation, and Branch */}
            <div className="pt-2 pb-0.5 flex flex-col justify-end flex-shrink-0">
              {/* Name */}
              <h3
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                className="text-white text-lg sm:text-[19px] font-extrabold tracking-tight leading-tight mb-1 truncate"
                title={activeMember.name}
              >
                {activeMember.name}
              </h3>

              {/* Designation / Role with silver double-bar */}
              <div
                className="flex items-center gap-2 font-mono text-xs sm:text-[12.5px] font-semibold text-white/85 uppercase tracking-wider truncate"
                title={activeMember.role}
              >
                <span className="inline-flex items-center justify-between w-3.5 h-2 flex-shrink-0" aria-hidden="true">
                  <span className="w-[1.5px] h-full bg-white/70 inline-block" />
                  <span className="w-[1.5px] h-full bg-white/70 inline-block" />
                </span>
                <span className="truncate">{activeMember.role}</span>
              </div>

              {/* Branch */}
              {activeMember.branch && (
                <div className="mt-2.5 flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono bg-white/[0.04] border border-white/10 text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span>Department of {activeMember.branch}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── DEFAULT BATCH & WING OVERVIEW ── */
          <div className="flex flex-col h-full justify-between animate-in fade-in duration-200">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/90 uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <span>CADRE PROFILE</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400 px-2 py-0.5 rounded border border-white/10 bg-white/[0.03]">
                  {section.num} // {section.batch}
                </span>
              </div>

              {/* Title & Stats */}
              <h3
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                className="text-white text-xl sm:text-2xl font-extrabold tracking-tight leading-tight mb-1"
              >
                {section.title}
              </h3>
              <p className="text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold mb-3">
                {section.members.length} Active Builders
              </p>

              {/* Philosophy Quote */}
              <div className="border-l-2 border-white/60 pl-3 py-1 my-3 text-[11px] sm:text-xs text-neutral-300 font-sans leading-relaxed italic bg-white/[0.02] rounded-r">
                "{section.desc}"
              </div>

              {/* Wing Distribution Chips */}
              <div className="mt-3">
                <div className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider mb-2 font-medium">
                  Wing Distribution:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(wingBreakdown).map(([wing, count]) => (
                    <span
                      key={wing}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.04] text-neutral-300"
                    >
                      <span className="text-white font-semibold">{count}</span>
                      <span>{wing}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Interaction Guide */}
            <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-neutral-400 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <span>Hover card to inspect</span>
              </span>
              <span className="text-white font-bold text-sm animate-pulse">
                →
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
