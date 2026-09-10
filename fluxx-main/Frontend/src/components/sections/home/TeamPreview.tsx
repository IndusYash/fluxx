// src/components/sections/home/TeamPreview.tsx
import SectionWrapper from "@/components/SectionWrapper";
import SectionCTA from "@/components/sectionCTA";
import { Users, Star, Zap, Heart, Code, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import vish from "@/assets/images/myself_new.jpg";
import shiv from "@/assets/images/shiv.jpg";
import ysv from "@/assets/images/ysv.jpg";

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
      color: "from-orange-500 via-red-500 to-pink-500",
      bgColor: "bg-orange-500",
      speciality: "Full Stack Developer",
      emoji: "🚀",
    },
    {
      id: 1,
      role: "Pre-final Year",
      name: "Yashasvi Sharma",
      icon: ysv,
      color: "from-blue-500 via-purple-500 to-indigo-500",
      bgColor: "bg-blue-500",
      speciality: "UI/UX Designer",
      emoji: "🎨",
    },
    {
      id: 2,
      role: "Pre-final Year",
      name: "Shivam Mishra",
      icon: shiv,
      color: "from-green-500 via-teal-500 to-cyan-500",
      bgColor: "bg-green-500",
      speciality: "Backend Engineer",
      emoji: "⚡",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [teamMembers.length]);

  return (
    <SectionWrapper>
      {/* Centered header section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          A glimpse at the people driving Flux forward — blending creativity,
          tech expertise, and a shared vision for innovation.
        </p>
        <SectionCTA to="/team" label="Meet the Full Team →" variant="primary" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-geometric opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {i % 4 === 0 && <Code className="w-6 h-6 text-primary" />}
            {i % 4 === 1 && <Zap className="w-4 h-4 text-secondary" />}
            {i % 4 === 2 && <Star className="w-5 h-5 text-accent" />}
            {i % 4 === 3 && <Rocket className="w-4 h-4 text-primary" />}
          </div>
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Team showcase grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Interactive team cards */}
          <div className="space-y-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group relative cursor-pointer transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                } ${
                  activeIndex === index
                    ? "scale-105"
                    : "scale-100 hover:scale-102"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Card background with gradient border */}
                <div
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-500 ${
                    activeIndex === index
                      ? "border-primary/50 bg-gradient-to-br from-background/80 to-background/60 shadow-2xl shadow-primary/20"
                      : "border-border/50 bg-background/40 hover:border-primary/30"
                  } backdrop-blur-sm`}
                >
                  {/* Active indicator */}
                  {activeIndex === index && (
                    <div className="absolute -left-1 top-6 w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full animate-pulse" />
                  )}

                  <div className="flex items-center gap-4">
                    {/* Profile image with animated border */}
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${
                          member.color
                        } p-1 ${
                          activeIndex === index ? "animate-spin-slow" : ""
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full bg-background"></div>
                      </div>
                      <img
                        src={member.icon}
                        alt={member.name}
                        className="relative w-16 h-16 rounded-full object-cover border-2 border-background z-10"
                      />

                      {/* Specialty emoji badge */}
                      <div
                        className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br ${
                          member.color
                        } flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                          activeIndex === index
                            ? "scale-110 animate-bounce"
                            : "scale-100"
                        }`}
                      >
                        {member.emoji}
                      </div>
                    </div>

                    {/* Member info */}
                    <div className="flex-1">
                      <h3
                        className={`font-bold text-lg transition-colors duration-300 ${
                          activeIndex === index
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {member.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-1">
                        {member.role}
                      </p>
                      <p
                        className={`text-sm font-medium transition-all duration-300 ${
                          activeIndex === index
                            ? "text-secondary opacity-100"
                            : "opacity-70"
                        }`}
                      >
                        {member.speciality}
                      </p>
                    </div>

                    {/* Animated arrow */}
                    <div
                      className={`transition-all duration-300 ${
                        activeIndex === index
                          ? "translate-x-0 opacity-100"
                          : "translate-x-2 opacity-50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Featured member spotlight */}
          <div className="relative">
            {/* Main spotlight card */}
            <div className="relative bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-lg rounded-3xl p-8 border border-primary/20 shadow-2xl">
              {/* Animated background pattern */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${teamMembers[activeIndex].color} opacity-5 transition-all duration-700`}
                />

                {/* Floating dots pattern */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float-dots"
                      style={{
                        left: `${20 + (i % 4) * 20}%`,
                        top: `${20 + Math.floor(i / 4) * 25}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Large profile image */}
                <div className="relative mx-auto mb-6 w-32 h-32">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${teamMembers[activeIndex].color} animate-pulse-glow`}
                  />
                  <img
                    src={teamMembers[activeIndex].icon}
                    alt={teamMembers[activeIndex].name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-background shadow-xl z-10 transition-all duration-700"
                  />

                  {/* Orbiting elements */}
                  <div className="absolute inset-0">
                    {[Heart, Star, Zap].map((Icon, i) => (
                      <Icon
                        key={i}
                        className={`absolute w-4 h-4 text-primary/60 animate-orbit transition-all duration-700`}
                        style={{
                          animationDelay: `${i * 1}s`,
                          animationDuration: "3s",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Member details */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {teamMembers[activeIndex].name}
                  </h3>
                  <p className="text-muted-foreground">
                    {teamMembers[activeIndex].role}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                    <span className="text-2xl">
                      {teamMembers[activeIndex].emoji}
                    </span>
                    <span className="font-medium text-sm">
                      {teamMembers[activeIndex].speciality}
                    </span>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {teamMembers.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeIndex === i
                          ? "bg-primary scale-125"
                          : "bg-primary/30 hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating skill badges */}
            <div className="absolute -top-4 -left-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-3 shadow-lg animate-bounce-slow">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div
              className="absolute -top-2 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 shadow-lg animate-bounce-slow"
              style={{ animationDelay: "1s" }}
            >
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div
              className="absolute -bottom-4 right-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full p-3 shadow-lg animate-bounce-slow"
              style={{ animationDelay: "2s" }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Animated stats section */}
        <div
          className={`mt-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group cursor-pointer"
                style={{ transitionDelay: `${1000 + index * 100}ms` }}
              >
                <div className="relative">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl scale-0 group-hover:scale-110 transition-transform duration-500 ease-out" />

                  {/* Content */}
                  <div className="relative p-6 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm group-hover:border-primary/30 transition-all duration-300">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/60 rounded-full animate-particle-float"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team collaboration visualization */}
        <div
          className={`mt-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`w-8 h-8 rounded-full border-2 border-background overflow-hidden transition-all duration-500 ${
                    index <= activeIndex
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-60"
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                    zIndex: teamMembers.length - index,
                  }}
                >
                  <img
                    src={member.icon}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-foreground">
                Building the Future Together
              </span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
          </div>
        </div>
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
