import React from 'react';
import { Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/sections/induction/HeroSection';
import WhatWeDo from '../../components/sections/induction/WhatWeDo';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const onJoinClick = () => navigate('/induction/apply');
  return (
    <div className="min-h-screen">
      {/* Space for Navbar */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section - Full page minus navbar space */}
      <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        <HeroSection />
      </div>

      {/* Main Content */}
      <main id="what-we-do" className="mt-16 pt-8">
        {/* What We Do Section */}
        <div className="relative overflow-hidden">
          <WhatWeDo />
        </div>

        {/* CTA Section */}
        <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto mb-20 mt-16 md:mt-24">
          <div
            className="relative rounded-3xl overflow-hidden border border-[#00FFC6]/20"
            style={{ background: 'linear-gradient(135deg, #0a120e 0%, #0d1a12 50%, #080f0b 100%)' }}
          >
            {/* top stripe */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#00FFC6]/70 to-transparent" />
            {/* glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#00FFC6]/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10 px-8 md:px-16 py-14 md:py-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* left */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#00FFC6]/10 border border-[#00FFC6]/20 rounded-full px-3 py-1 mb-5">
                  <Zap size={11} className="text-[#00FFC6]" />
                  <span className="text-[#00FFC6] text-[11px] font-semibold tracking-widest uppercase">Limited Seats</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  Ready to join the<br />
                  <span className="text-[#00FFC6]">next generation</span>?
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                  Become part of a community that values curiosity, creativity, and collaboration.
                  Fill out your application in under 5 minutes.
                </p>
                {/* perks */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Zero fee', 'Takes 5 mins', 'Open to all branches'].map(p => (
                    <div key={p} className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <CheckCircle2 size={13} className="text-[#00FFC6] shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* right */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <button
                  onClick={onJoinClick}
                  className="group flex items-center gap-3 bg-[#00FFC6] hover:bg-[#00e5b3] text-black font-bold px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.03] shadow-xl shadow-[#00FFC6]/25 text-base"
                >
                  Apply Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <p className="text-gray-700 text-[11px]">Induction 2026 · MMMUT</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-white/[0.06]">
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; 2026 Flux Society · MMMUT Gorakhpur</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
