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
        <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto mb-20 mt-16 md:mt-24 animate-fade-in-up">
          <div
            className="card-outline relative rounded-3xl overflow-hidden border border-white/10 group hover:border-white/20 transition-all duration-500"
            style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(15,15,15,0.95) 50%, rgba(5,5,5,0.9) 100%)' }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
            </div>
            
            {/* top stripe */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer" />

            <div className="relative z-10 px-8 md:px-16 py-14 md:py-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* left */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/20 rounded-full px-3 py-1 mb-5">
                  <Zap size={11} className="text-gray-300" />
                  <span className="text-gray-300 text-[11px] font-semibold tracking-widest uppercase">Limited Seats</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-400">
                  Ready to join the<br />
                  <span className="text-white">next generation</span>?
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                  Become part of a community that values curiosity, creativity, and collaboration.
                  Fill out your application in under 5 minutes.
                </p>
                {/* perks */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Zero fee', 'Takes 5 mins', 'Open to all branches'].map(p => (
                    <div key={p} className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <CheckCircle2 size={13} className="text-gray-300 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* right */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <button
                  onClick={onJoinClick}
                  className="w-full relative group overflow-hidden rounded-xl p-[1px]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-400 via-white to-gray-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <div className="relative bg-black group-hover:bg-transparent transition-colors duration-300 rounded-xl px-10 py-4 flex items-center justify-center gap-3">
                    <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-300 group-hover:text-black transition-colors duration-300 tracking-wider">
                      Apply Now
                    </span>
                    <ArrowRight size={18} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </button>
                <p className="text-gray-600 text-[11px] tracking-widest uppercase font-semibold">Induction 2026 · MMMUT</p>
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
