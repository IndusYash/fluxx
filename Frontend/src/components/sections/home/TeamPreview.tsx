// src/components/sections/home/TeamPreview.tsx
import SectionWrapper from "@/components/SectionWrapper";
import SectionCTA from "@/components/sectionCTA";
import { Users, Star, Zap, Heart, Code, Rocket, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import vish from "@/assets/images/myself_new.webp";
import shiv from "@/assets/images/shiv.webp";
import ysv from "@/assets/images/ysv.webp";

interface TeamMember {
  id: number;
  role: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  speciality: string;
  emoji: string;
}

interface StatItem {
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { label: "Team Members", value: "10+" },
  { label: "Projects", value: "20+" },
  { label: "Events", value: "15+" },
];

export default function TeamPreview() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const teamMembers: TeamMember[] = [
    {
      id: 0,
      role: "Pre-final Year",
      name: "Vishesh Mishra",
      icon: vish,
      color: "from-white/60 to-gray-400/60",
      bgColor: "bg-white/20",
      speciality: "Full Stack Developer",
      emoji: "🚀",
    },
    {
      id: 1,
      role: "Pre-final Year",
      name: "Yashasvi Sharma",
      icon: ysv,
      color: "from-white/60 to-gray-400/60",
      bgColor: "bg-white/20",
      speciality: "UI/UX Designer",
      emoji: "🎨",
    },
    {
      id: 2,
      role: "Pre-final Year",
      name: "Shivam Mishra",
      icon: shiv,
      color: "from-white/60 to-gray-400/60",
      bgColor: "bg-white/20",
      speciality: "Backend Engineer",
      emoji: "⚡",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [teamMembers.length]);

  return (
    <SectionWrapper background="bg-[#020202]">
      {/* Centered header section */}
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Our Team
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A glimpse at the people driving Flux forward — blending creativity,
          tech expertise, and a shared vision for innovation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionCTA to="/team" label="Meet the Full Team →" variant="primary" />
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {i % 4 === 0 && <Code className="w-6 h-6 text-white" />}
            {i % 4 === 1 && <Zap className="w-4 h-4 text-white" />}
            {i % 4 === 2 && <Star className="w-5 h-5 text-white" />}
            {i % 4 === 3 && <Rocket className="w-4 h-4 text-white" />}
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-white/15 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Team showcase grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Interactive team cards */}
          <div className="space-y-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                  <motion.div
                    className={`card-outline relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
                      activeIndex === index
                        ? "border-white bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-white/20"
                        : "border-white bg-white/5 hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                  {/* Active indicator */}
                  {activeIndex === index && (
                    <motion.div 
                      className="absolute -left-1 top-6 w-1 h-16 bg-gradient-to-b from-white to-gray-400 rounded-full"
                      animate={{ scaleY: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  <div className="flex items-center gap-4">
                    {/* Profile image with animated border */}
                    <div className="relative">
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.color} p-1`}
                        animate={activeIndex === index ? { rotate: 360 } : {}}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-16 h-16 rounded-full bg-[#020202]" />
                      </motion.div>
                      <img
                        src={member.icon}
                        alt={member.name}
                        className="relative w-16 h-16 rounded-full object-cover border-2 border-[#020202] z-10"
                      />

                      {/* Specialty emoji badge */}
                      <motion.div
                        className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-sm font-bold`}
                        animate={activeIndex === index ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {member.emoji}
                      </motion.div>
                    </div>

                    {/* Member info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-1">
                        {member.role}
                      </p>
                      <p className="text-sm font-medium text-gray-300">
                        {member.speciality}
                      </p>
                    </div>

                    {/* Animated arrow */}
                    <motion.div
                      animate={activeIndex === index ? { x: [0, 5, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                    animate={activeIndex === index ? { opacity: 0.1 } : {}}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Featured member spotlight */}
          <div className="relative">
          <motion.div 
            className="card-outline relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
              {/* Animated background pattern */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${teamMembers[activeIndex].color} opacity-5`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Floating dots pattern */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full"
                      style={{
                        left: `${20 + (i % 4) * 20}%`,
                        top: `${20 + Math.floor(i / 4) * 25}%`,
                      }}
                      animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Large profile image */}
                <div className="relative mx-auto mb-6 w-32 h-32">
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${teamMembers[activeIndex].color}`}
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img
                    src={teamMembers[activeIndex].icon}
                    alt={teamMembers[activeIndex].name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-[#020202] shadow-xl z-10"
                  />

                  {/* Orbiting elements */}
                  <div className="absolute inset-0">
                    {[Heart, Star, Zap].map((Icon, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8 + i * 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          top: "50%",
                          left: "50%",
                          marginTop: "-40px",
                          marginLeft: "-40px",
                        }}
                      >
                        <Icon
                          className="w-4 h-4 text-white/60 absolute"
                          style={{
                            transform: `rotate(${i * 120}deg) translateX(80px) rotate(-${i * 120}deg)`,
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Member details */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {teamMembers[activeIndex].name}
                  </h3>
                  <p className="text-gray-400">
                    {teamMembers[activeIndex].role}
                  </p>
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-2xl">
                      {teamMembers[activeIndex].emoji}
                    </span>
                    <span className="font-medium text-sm text-gray-300">
                      {teamMembers[activeIndex].speciality}
                    </span>
                  </motion.div>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {teamMembers.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="relative w-3 h-3 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-full transition-all duration-300 ${
                          activeIndex === i ? "bg-white" : "bg-white/30"
                        }`}
                        animate={activeIndex === i ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating skill badges */}
            {[
              { icon: Code, className: "-top-4 -left-4", delay: 0 },
              { icon: Rocket, className: "-top-2 -right-6", delay: 1 },
              { icon: Zap, className: "-bottom-4 right-8", delay: 2 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.className} bg-gradient-to-r from-white to-gray-300 rounded-full p-3 shadow-lg`}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                }}
              >
                <item.icon className="w-5 h-5 text-black" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated stats section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="card-outline relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl"
                    animate={{ scale: [0, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div 
                      className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{ y: [0, -20, 0], scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team collaboration visualization */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className={`w-8 h-8 rounded-full border-2 border-[#020202] overflow-hidden`}
                  animate={{
                    scale: index <= activeIndex ? 1 : 0.75,
                    opacity: index <= activeIndex ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img
                    src={member.icon}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-gray-200">
                Building the Future Together
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float-geometric {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) translateX(5px) rotate(90deg);
          }
          50% {
            transform: translateY(-5px) translateX(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(5px) translateX(10px) rotate(270deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(80px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(80px) rotate(-360deg);
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.5);
            opacity: 1;
          }
        }

        .animate-float-geometric {
          animation: float-geometric 10s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-orbit {
          animation: orbit 4s linear infinite;
        }

        .animate-particle-float {
          animation: particle-float 2s ease-in-out infinite;
        }
      `,
        }}
      />
    </SectionWrapper>
  );
}
