"use client";

import { Target, Lightbulb, Users, Trophy, Microscope } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function FluxObjectives() {
  const objectives = [
    {
      icon: <Microscope className="w-8 h-8 text-primary" />,
      title: "Research-Driven Culture",
      desc: "Foster innovation and academic excellence among students and faculty through cutting-edge research initiatives.",
      gradient: "from-green-500/40 to-emerald-400/40",
      glowColor: "rgba(34, 197, 94, 0.3)", // soft blue glow tint
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: "Tech Events & Competitions",
      desc: "Organize hackathons, conferences, paper presentations, and tech conclaves that push boundaries.",
      gradient: "from-green-500/40 to-emerald-400/40",
      glowColor:"rgba(34, 197, 94, 0.3)", // soft pink glow tint
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Industry Collaboration",
      desc: "Bridge academia with industry experts, researchers, and startups for real-world impact.",
      gradient: "from-green-500/40 to-emerald-400/40",
      glowColor: "rgba(34, 197, 94, 0.3)", // soft green glow tint
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Project Incubation Hub",
      desc: "Create opportunities for interdisciplinary learning, innovation, and problem-solving initiatives.",
      gradient: "from-green-500/40 to-emerald-400/40",
      glowColor: "rgba(34, 197, 94, 0.3)", // soft yellow/orange glow tint
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Innovation Showcase",
      desc: "Provide platforms for demonstrating breakthrough ideas through competitions and symposiums.",
      gradient: "from-green-500/40 to-emerald-400/40",
      glowColor: "rgba(34, 197, 94, 0.3)", // soft violet glow tint
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111827] to-[#0a0a0a] text-white">
      {/* --- Animated Gradient Blobs --- */}
      <div className="absolute inset-0 -z-20">
        <motion.div
          className="absolute bottom-0 left-[-20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-700/25 via-pink-600/30 to-pink-500/20 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[-10%] right-[-15%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/30 via-cyan-400/30 to-cyan-300/20 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-green-500/20 via-emerald-400/25 to-emerald-300/15 blur-3xl"
          animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          style={{ translateX: "-50%" }}
        />

        {/* Subtle noise overlay */}
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-5" />

        {/* Radial vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70" />
      </div>

      {/* --- Content --- */}
      <div className="relative px-6 sm:px-8 lg:px-12 py-20 container-max z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center space-x-3 mb-5 justify-center">
            <div className="w-10 h-1 bg-primary rounded-full" />
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              Our Mission
            </span>
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ffffff, #9ca3af)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FLUX <span className="text-primary">OBJECTIVES</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto mt-6 text-lg leading-relaxed tracking-wide">
            Driving innovation, fostering collaboration, and shaping the future of technology through excellence
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
        >
          {objectives.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group relative min-h-[320px] flex flex-col rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-8 shadow-md transition-shadow duration-400"
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: `0 0 20px ${item.glowColor}, inset 0 0 10px ${item.glowColor}`,
              }}
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex items-center justify-center bg-primary/20 rounded-xl p-4 w-fit mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground/80 text-center leading-relaxed flex-grow">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
          className="text-center mt-20 pt-10 border-t border-border/70"
        >
          <div className="inline-flex items-center space-x-3 text-sm text-muted-foreground/75">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="tracking-wide font-medium">
              Building tomorrow's technology leaders, today
            </span>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}