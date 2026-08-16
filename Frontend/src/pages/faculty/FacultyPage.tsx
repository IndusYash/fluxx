import React from "react";
import FacultyCard from "./FacultyCard";
import { underGuidance, facultyCoordinators } from "./facultyData";
import { motion } from "framer-motion";

const FacultyPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070B09] text-white font-sans pb-24">
      {/* ── Background Elements ──────────────────────────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00FFC6]/5 blur-[120px] pointer-events-none rounded-full" />
      
      {/* ── Header Area ─────────────────────────────── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        {/* Top Overline */}
        <div className="flex items-center gap-4 mb-4 opacity-70">
          <div className="h-[1px] w-8 sm:w-16 bg-white/20" />
          <span className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">FLUX</span>
          <div className="h-[1px] w-8 sm:w-16 bg-white/20" />
        </div>

        {/* Main Title */}
        <h1 
          className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Mentors<span className="text-[#00FFC6]">.</span>
        </h1>

        {/* Subtitle Quote */}
        <p className="text-gray-400 text-lg sm:text-xl italic max-w-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
          "Leading with excellence, inspiring with vision, and shaping the future of tech at MMMUT."
        </p>
      </section>

      {/* UNDER GUIDANCE SECTION */}
      {underGuidance.length > 0 && (
        <section className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Under Guidance
            </h2>
            <div className="w-24 h-1 bg-[#00FFC6]/30 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="flex justify-center flex-col gap-10 max-w-4xl mx-auto">
            {underGuidance.map((faculty, index) => (
              <FacultyCard key={faculty.id} faculty={faculty} idx={index} />
            ))}
          </div>
        </section>
      )}

      {/* FACULTY COORDINATORS SECTION */}
      {facultyCoordinators.length > 0 && (
        <section className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Faculty Coordinators
            </h2>
            <div className="w-24 h-1 bg-[#a78bfa]/30 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {facultyCoordinators.map((faculty, index) => (
              <FacultyCard key={faculty.id} faculty={faculty} idx={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default FacultyPage;
