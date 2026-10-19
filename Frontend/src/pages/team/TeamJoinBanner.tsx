import React from 'react';
import { ArrowUpRight, Sparkles, Terminal, Users, Rocket, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const JOIN_PILLARS = [
  {
    num: '01',
    tag: 'COMMUNITY & DEV',
    title: 'Build With Us',
    desc: 'Work on real-world open-source software, collaborate across tech domains, and prepare for national hackathons alongside experienced seniors.',
    actionLabel: 'Join Community',
    actionHref: 'https://discord.gg/flux',
    isExternal: true,
    icon: Terminal,
  },
  {
    num: '02',
    tag: 'EVENTS & WORKSHOPS',
    title: 'Compete & Learn',
    desc: 'Participate in ByteBrawl tournaments, hands-on dev bootcamps, and technical speaker sessions organized by FLUX throughout the semester.',
    actionLabel: 'Explore Events',
    actionHref: '/events',
    isExternal: false,
    icon: Sparkles,
  },
  {
    num: '03',
    tag: 'PARTNERSHIP & OUTREACH',
    title: 'Partner & Lead',
    desc: 'Collaborate on campus initiatives, propose a tech talk, or sponsor upcoming FLUX events. Connect directly with our core leadership team.',
    actionLabel: 'Get In Touch',
    actionHref: 'mailto:contact@flux.org.in',
    isExternal: true,
    icon: Rocket,
  },
];

export const TeamJoinBanner: React.FC = () => {
  return (
    <section
      id="section-join"
      className="w-full relative pt-4 sm:pt-6 select-none"
      style={{
        paddingLeft: 'var(--pad, clamp(16px, 3.83vw, 64px))',
        paddingRight: 'var(--pad, clamp(16px, 3.83vw, 64px))',
      }}
    >
      {/* ── Heading Row (Exact same structure & font rhythm as Section 01, 02, 03) ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
        {/* Left: Numbered box + Big Title + Subtitle */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-4">
          {/* Numbered box in silver/white outline matching sections 01-03 */}
          <div
            className="flex items-center justify-center font-mono font-bold text-xs sm:text-sm px-2.5 py-1 rounded-md select-none"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
            }}
          >
            04
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
            JOIN THE CREW
          </h2>

          {/* Subtitle tag */}
          <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-neutral-400">
            GET INVOLVED // COMMUNITY & COLLABORATIONS
          </span>
        </div>

        {/* Right Status Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span>OPEN TO ALL STUDENTS</span>
          </div>
        </div>
      </div>

      {/* Thin line under the heading (identical to other sections) */}
      <div className="w-full h-[1px] bg-neutral-800/80 mb-6 sm:mb-8" />

      {/* ── 3 Harmonious Grid Cards Matching the Page DNA ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {JOIN_PILLARS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.num}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden backdrop-blur-md"
              style={{
                backgroundColor: '#0c0c0c',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.backgroundColor = '#141414';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.backgroundColor = '#0c0c0c';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Sci-Fi Micro Tech Brackets (matching YearNav cards) */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:border-white/70 transition-all" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:border-white/70 transition-all" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:border-white/70 transition-all" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:border-white/70 transition-all" />

              {/* Top Row: Icon + Monospace Tag */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-400">
                    {item.num} // {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  className="text-white text-lg sm:text-xl font-bold tracking-tight mb-2.5 transition-colors"
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Action Button */}
              <div>
                {item.isExternal ? (
                  <a
                    href={item.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl font-mono text-xs font-semibold tracking-wider text-neutral-300 group-hover:text-white bg-white/[0.04] group-hover:bg-white/15 border border-white/10 group-hover:border-white/40 transition-all duration-200 cursor-pointer"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <Link
                    to={item.actionHref}
                    className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl font-mono text-xs font-semibold tracking-wider text-neutral-300 group-hover:text-white bg-white/[0.04] group-hover:bg-white/15 border border-white/10 group-hover:border-white/40 transition-all duration-200 cursor-pointer"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Subdued Bottom Ticker Bar Matching the Page Palette ── */}
      <div className="w-full py-3 px-4 rounded-xl bg-black/40 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <span className="text-neutral-300">FLUX STUDENT HUB // MMMUT GORAKHPUR</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span>
            <strong className="text-white">50+</strong> BUILDERS
          </span>
          <span className="text-neutral-700">•</span>
          <span>
            <strong className="text-white">15+</strong> EVENTS
          </span>
          <span className="text-neutral-700">•</span>
          <span>
            <strong className="text-white">1,500+</strong> REACH
          </span>
          <span className="text-neutral-700 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-neutral-400">100% STUDENT-LED</span>
        </div>
      </div>
    </section>
  );
};
