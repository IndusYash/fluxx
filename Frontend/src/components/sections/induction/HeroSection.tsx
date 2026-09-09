 import React from "react";
import Threads from "./Threads";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  amplitude?: number;
  distance?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  amplitude = 5,
  distance = 0.5,
}) => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-full overflow-hidden">
      {/* Background Threads (hidden on mobile) */}
      <div className="absolute inset-0 w-full h-full hidden sm:block">
        <Threads amplitude={amplitude} distance={distance} />
      </div>

      {/* Subtle radial glow behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-[#E5E5E5]/8 blur-[120px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
            <span className="text-gray-300 text-xs font-semibold tracking-widest uppercase">
              Applications Open · Flux Induction 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-white">Build. Innovate.</span>
            <br />
            <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Join Flux.
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            MMMUT's premier tech society — where curious minds converge to build
            cutting-edge projects, compete in hackathons, and shape the future.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => navigate("/induction/apply")}
              className="relative group overflow-hidden rounded-2xl p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gray-400 via-white to-gray-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="relative bg-black group-hover:bg-transparent transition-colors duration-300 rounded-2xl px-8 py-3.5 flex items-center justify-center gap-2">
                <Rocket size={16} className="text-gray-300 group-hover:text-black transition-colors" />
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-300 group-hover:text-black transition-colors duration-300 tracking-wider uppercase">
                  Apply Now
                </span>
              </div>
            </button>
            <button
              onClick={() => document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 border border-white/15 hover:border-[#E5E5E5]/40 text-gray-300 hover:text-white px-8 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 bg-white/[0.03] hover:bg-[#E5E5E5]/[0.06]"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
