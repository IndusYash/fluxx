import React from "react";
import FacultyCard from "./FacultyCard";
<<<<<<< HEAD
import { underGuidance, facultyCoordinators } from "./facultyData";
=======
import StatsCounter from "./StatsCounter";
import { underGuidance, facultyCoordinators } from "./facultyData";
import { BookOpen, Award, Users, Trophy } from "lucide-react";
>>>>>>> cbd65cf59d845635320295e3f0f9cf723444567d

const FacultyPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020202] text-white pb-24">
      {/* ── Header Area ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4 opacity-70">
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/40" />
          <span className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
            FLUX
          </span>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/40" />
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
          Our Mentors
          <span className="text-[#E5E5E5]">.</span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl font-light mb-10">
          "Leading with excellence, inspiring with vision, and shaping the future of tech at MMMUT."
        </p>
<<<<<<< HEAD
=======

        {/* ── Quick Stats Badges ──────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { icon: <BookOpen size={20} />, value: "150+", label: "Publications" },
            { icon: <Award size={20} />, value: "25+", label: "Patents" },
            { icon: <Users size={20} />, value: "10+", label: "Mentors" },
            { icon: <Trophy size={20} />, value: "8+", label: "Awards" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm"
            >
              <span className="text-white/50">{badge.icon}</span>
              <div className="flex flex-col">
                <span className="text-white font-bold text-base leading-tight">{badge.value}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">{badge.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats Section ─────────────────────────────────────────────────── */}
      <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        <StatsCounter />
>>>>>>> cbd65cf59d845635320295e3f0f9cf723444567d
      </section>

      {/* ── Under Guidance Section ─────────────────────────────────────────── */}
      {underGuidance.length > 0 && (
        <section className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/40" />
              <span className="text-white/50 text-xs font-semibold tracking-[0.3em] uppercase">Leadership</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Under Guidance
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto mt-4 rounded-full opacity-50" />
          </div>

          <div className="flex justify-center flex-col gap-8 max-w-4xl mx-auto">
            {underGuidance.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        </section>
      )}

      {/* ── Faculty Coordinators Section ─────────────────────────────────── */}
      {facultyCoordinators.length > 0 && (
        <section className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto mt-10">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/40" />
              <span className="text-white/50 text-xs font-semibold tracking-[0.3em] uppercase">Coordination</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Faculty Coordinators
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto mt-4 rounded-full opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {facultyCoordinators.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default FacultyPage;
