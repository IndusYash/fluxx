import React from "react";
import FacultyCard from "./FacultyCard";
import StatsCounter from "./StatsCounter";
import { underGuidance, facultyCoordinators } from "./facultyData";
import { motion } from "framer-motion";
import { BookOpen, Award, Users, Sparkles } from "lucide-react";

const FacultyPage: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-[#020202] text-white  pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ── Animated Background Gradient Overlay ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#020202] via-[#0a0a0a] to-[#020202] opacity-80" />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 blur-[120px] pointer-events-none rounded-full"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-[300px] h-[300px] bg-white/3 blur-[100px] pointer-events-none rounded-full"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Floating Geometric Elements ─────────────────────────────────────── */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* ── Header Area ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          className="flex items-center gap-4 mb-4 opacity-70"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/40"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <span className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
            FLUX
          </span>
          <motion.div
            className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/40"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Our Mentors
          <motion.span
            className="text-[#E5E5E5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            .
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-gray-400 text-lg sm:text-xl max-w-2xl font-light mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          "Leading with excellence, inspiring with vision, and shaping the future of tech at MMMUT."
        </motion.p>

        {/* Stats preview */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {[
            { icon: BookOpen, label: "Publications", value: "150+" },
            { icon: Award, label: "Patents", value: "25+" },
            { icon: Users, label: "Mentors", value: "10+" },
            { icon: Sparkles, label: "Awards", value: "8+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
               className="card-outline flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <stat.icon className="w-5 h-5 text-white/80" />
              <div className="text-left">
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Stats Counter ───────────────────────────────────────────────────── */}
      <motion.section
        className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <StatsCounter />
      </motion.section>

      {/* ── Under Guidance Section ─────────────────────────────────────────── */}
      {underGuidance.length > 0 && (
        <section className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/40" />
              <span className="text-white/50 text-xs font-semibold tracking-[0.3em] uppercase">Leadership</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/40" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
            >
              Under Guidance
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto mt-4 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "6rem", opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            className="flex justify-center flex-col gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {underGuidance.map((faculty, index) => (
              <FacultyCard key={faculty.id} faculty={faculty} idx={index} />
            ))}
          </motion.div>
        </section>
      )}

      {/* ── Faculty Coordinators Section ─────────────────────────────────── */}
      {facultyCoordinators.length > 0 && (
        <section className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/40" />
              <span className="text-white/50 text-xs font-semibold tracking-[0.3em] uppercase">Coordination</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/40" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
            >
              Faculty Coordinators
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto mt-4 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "6rem", opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {facultyCoordinators.map((faculty, index) => (
              <FacultyCard key={faculty.id} faculty={faculty} idx={index} />
            ))}
          </motion.div>
        </section>
      )}
    </motion.div>
  );
};

export default FacultyPage;
