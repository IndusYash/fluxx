import React from "react";
import Threads from "./Threads";
import { Zap, Users, Rocket, Star } from "lucide-react";
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
      {/* Background Threads */}
      <div className="absolute inset-0 w-full h-full">
        <Threads amplitude={amplitude} distance={distance} />
      </div>

      {/* Subtle radial glow behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-[#00FFC6]/8 blur-[120px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-[#00FFC6]/10 border border-[#00FFC6]/25 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00FFC6] animate-pulse" />
            <span className="text-[#00FFC6] text-xs font-semibold tracking-widest uppercase">
              Applications Open · Flux Induction 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
            <span className="text-white">Build. Innovate.</span>
            <br />
            <span className="bg-gradient-to-r from-[#00FFC6] via-[#00e5b3] to-[#00FFC6] bg-clip-text text-transparent">
              Join Flux.
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            MMMUT's premier tech society — where curious minds converge to build
            cutting-edge projects, compete in hackathons, and shape the future.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <button
              onClick={() => navigate("/induction/apply")}
              className="group flex items-center gap-2.5 bg-[#00FFC6] hover:bg-[#00e5b3] text-black font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.03] shadow-lg shadow-[#00FFC6]/25 text-sm"
            >
              <Rocket size={16} />
              Apply Now
            </button>
            <button
              onClick={() => document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 border border-white/15 hover:border-[#00FFC6]/40 text-gray-300 hover:text-white px-8 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 bg-white/[0.03] hover:bg-[#00FFC6]/[0.06]"
            >
              Learn More
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: Users, label: "Active Members", value: "100+" },
              { icon: Star, label: "Projects Shipped", value: "20+" },
              { icon: Zap, label: "Events Per Year", value: "10+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00FFC6]/10 border border-[#00FFC6]/20 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#00FFC6]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm leading-none">{value}</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
