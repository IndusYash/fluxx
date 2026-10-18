import React, { useRef, useEffect, useState } from 'react';
import type { YearSectionConfig, Member } from './teamData';
import { TeamCard } from './TeamCard';
import { TeamSpotlight } from './TeamSpotlight';

interface TeamSectionProps {
  section: YearSectionConfig;
  sectionIndex: number;
  onRegisterSection: (index: number, handle: SectionDOMHandle) => void;
  onUnregisterSection: (index: number) => void;
}

export interface SectionDOMHandle {
  stageEl: HTMLElement;
  stackFrontEl: HTMLElement;
  cardEls: HTMLElement[];
  pathEl: SVGPathElement | null;
  nodeEls: HTMLElement[];
  arrowEl: HTMLElement | null;
  setNextMemberIndex?: (index: number) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  section,
  sectionIndex,
  onRegisterSection,
  onUnregisterSection,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const stackFrontRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRef = useRef<HTMLDivElement>(null);

  const [hoveredMember, setHoveredMember] = useState<Member | null>(null);
  const [stackMemberIndex, setStackMemberIndex] = useState<number>(0);

  // Keep array refs sized to members
  cardsRef.current = section.members.map((_, i) => cardsRef.current[i] || null);

  useEffect(() => {
    if (stageRef.current && stackFrontRef.current) {
      const validCards = cardsRef.current.filter(Boolean) as HTMLElement[];
      const validNodes = nodesRef.current.filter(Boolean) as HTMLElement[];
      onRegisterSection(sectionIndex, {
        stageEl: stageRef.current,
        stackFrontEl: stackFrontRef.current,
        cardEls: validCards,
        pathEl: pathRef.current,
        nodeEls: validNodes,
        arrowEl: arrowRef.current,
        setNextMemberIndex: (idx: number) => {
          setStackMemberIndex((prev) => (prev !== idx ? idx : prev));
        },
      });
    }

    return () => {
      onUnregisterSection(sectionIndex);
    };
  }, [sectionIndex, onRegisterSection, onUnregisterSection, section.members]);

  // Next member to be dealt on the front of the deck
  const currentStackMember = section.members[stackMemberIndex] || section.members[0];

  return (
    <section
      id={`section-${section.id}`}
      className="w-full relative scroll-mt-32 pt-8 sm:pt-14"
      style={{
        paddingLeft: 'var(--pad, clamp(16px, 3.83vw, 64px))',
        paddingRight: 'var(--pad, clamp(16px, 3.83vw, 64px))',
      }}
    >
      {/* ── Heading Row ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
        {/* Left: Numbered box + Big Title + Subtitle */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-4">
          {/* Numbered box in green outline */}
          <div
            className="flex items-center justify-center font-mono font-bold text-xs sm:text-sm px-2.5 py-1 rounded-md select-none"
            style={{
              border: '1px solid #4dff7c',
              color: '#4dff7c',
              backgroundColor: 'rgba(77, 255, 124, 0.06)',
              boxShadow: '0 0 10px rgba(77, 255, 124, 0.15)',
            }}
          >
            {section.num}
          </div>

          {/* Big Bold Uppercase Title */}
          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(26px, 2.8vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
            className="text-white uppercase"
          >
            {section.title}
          </h2>

          {/* Lighter subtitle (if provided) */}
          {section.sub && (
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(13px, 1.3vw, 18px)',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
              className="text-neutral-400 uppercase"
            >
              {section.sub}
            </span>
          )}
        </div>

        {/* Right: Short description with 2px green left border */}
        <div
          className="border-l-2 border-[#4dff7c] pl-4 max-w-md text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed"
          style={{
            borderColor: '#4dff7c',
          }}
        >
          {section.desc}
        </div>
      </div>

      {/* ── Stage = CSS Grid ── */}
      {/* >1180px: columns minmax(0,1fr) 39.8%, align-items: STRETCH */}
      {/* <=1180px: 1 column, zone above grid */}
      <div
        ref={stageRef}
        className="flux-stage w-full"
        style={{
          display: 'grid',
          alignItems: 'stretch',
        }}
      >
        {/* ── Left Cell = Zone (position: relative) ── */}
        <div className="flux-zone relative w-full h-full min-h-[220px]">
          {/* Sticky Track: scrolls naturally down with user and stops at the last row of the section */}
          <div className="flux-sticky-track relative w-full">
            {/* Green Trajectory SVG (behind cards, hidden on <=1180px) */}
            <svg
              className="flux-trajectory absolute inset-0 w-full h-full pointer-events-none z-[1]"
              viewBox="0 0 929 439"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id={`neon-glow-${section.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#4dff7c" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Layer 1: faint dotted path */}
              <path
                d="M321 60C400 12 500 8 600 48S780 150 866 199"
                fill="none"
                stroke="rgba(77, 255, 124, 0.55)"
                strokeWidth="1.2"
                strokeDasharray="1 7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* Layer 2: solid neon path */}
              <path
                ref={pathRef}
                d="M321 60C400 12 500 8 600 48S780 150 866 199"
                fill="none"
                stroke="#4dff7c"
                strokeWidth="2"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                vectorEffect="non-scaling-stroke"
                filter={`url(#neon-glow-${section.id})`}
              />
            </svg>

            {/* 4 Glowing Nodes at (34.6%, 13.7%), (47%, 4%), (75.9%, 20%), (85.7%, 36.7%) */}
            {[
              { left: '34.6%', top: '13.7%' },
              { left: '47%', top: '4%' },
              { left: '75.9%', top: '20%' },
              { left: '85.7%', top: '36.7%' },
            ].map((pos, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  nodesRef.current[idx] = el;
                }}
                className="flux-trajectory-node absolute rounded-full pointer-events-none z-[2]"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#4dff7c',
                  boxShadow: '0 0 10px #4dff7c, 0 0 18px rgba(77, 255, 124, 0.6)',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                }}
              />
            ))}

            {/* Chevron Arrow at (96.4%, 46.5%) pointing right */}
            <div
              ref={arrowRef}
              className="flux-trajectory-arrow absolute pointer-events-none z-[2]"
              style={{
                left: '96.4%',
                top: '46.5%',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                transition: 'opacity 0.2s ease',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4dff7c"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(77, 255, 124, 0.9))',
                }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {/* ── THE STACK: Positioned inside sticky track ── */}
            <div
              className={`flux-stack-anchor ${hoveredMember !== null ? 'flux-stack-hidden' : ''}`}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '42%',
                top: '50%',
                width: 0,
                height: 0,
                zIndex: 5,
              }}
            >
              {/* 9 Layers Total: 8 rear + 1 front */}
              {/* Front layer (k=0) */}
              <div
                ref={stackFrontRef}
                className="flux-stack-card flux-stack-layer-0"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 'var(--sw, 204px)',
                  height: 'var(--sh, 300px)',
                  margin: 'calc(var(--sh, 300px) / -2) 0 0 calc(var(--sw, 204px) / -2)',
                  transform: 'translate(0, 0) rotate(7.5deg)',
                  zIndex: 10,
                  borderRadius: '12px',
                  pointerEvents: 'none',
                }}
              >
                {currentStackMember && (
                  <TeamCard
                    key={currentStackMember.name}
                    member={currentStackMember}
                    isStackFront={true}
                  />
                )}
              </div>

              {/* Rear layers k=1 to k=8 */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
                <div
                  key={k}
                  className={`flux-stack-card flux-stack-layer-${k}`}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 'var(--sw, 204px)',
                    height: 'var(--sh, 300px)',
                    margin: 'calc(var(--sh, 300px) / -2) 0 0 calc(var(--sw, 204px) / -2)',
                    transform: `translate(calc(var(--sw, 204px) * -0.105 * ${k}), calc(var(--sw, 204px) * 0.0137 * ${k})) rotate(calc(7.5deg - ${4.56 * k}deg))`,
                    zIndex: 10 - k,
                    background: `linear-gradient(160deg, hsl(150 8% calc(21% - ${k * 1.7}%)), #070a09 80%)`,
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    boxShadow: '0 12px 26px rgba(0, 0, 0, 0.55)',
                    borderRadius: '12px',
                    pointerEvents: 'none',
                  }}
                />
              ))}
            </div>

            {/* ── IDEA 1: DYNAMIC MEMBER SPOTLIGHT CARD ── */}
            {/* Replaces the stack once cards are settled (.flux-settled) OR on hover */}
            <TeamSpotlight
              section={section}
              hoveredMember={hoveredMember}
              forceVisible={hoveredMember !== null}
            />
          </div>
        </div>

        {/* ── Right Cell = Card Grid ── */}
        <div
          className="flux-grid"
          style={{
            display: 'grid',
            gap: 'var(--gap, clamp(8px, 0.84vw, 14px))',
          }}
        >
          {section.members.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="flux-grid-card-wrapper"
              onMouseEnter={() => setHoveredMember(member)}
              onMouseOver={() => {
                if (hoveredMember !== member) setHoveredMember(member);
              }}
              onMouseLeave={() => setHoveredMember(null)}
              style={{
                width: '100%',
                position: 'relative',
                willChange: 'transform, opacity, filter',
              }}
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
