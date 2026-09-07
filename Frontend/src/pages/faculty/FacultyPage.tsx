import React from "react";
import FacultyCard from "./FacultyCard";
import { underGuidance, facultyCoordinators } from "./facultyData";

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
