// src/components/sections/home/FacultyPreview.tsx
import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionCTA from "@/components/sectionCTA";
import { GraduationCap, BookOpen, Award, Users, Lightbulb, Target, Brain, Sparkles, Trophy, Globe, Zap, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface StatItem {
  label: string;
  value: string;
  icon: any;
  color: string;
  description: string;
}

const stats: StatItem[] = [
  { 
    label: 'Patents', 
    value: '20+', 
    icon: Users, 
    color: 'from-blue-500 to-cyan-500',
    description: 'Innovative patents filed'
  },
  { 
    label: 'Project Based Publications', 
    value: '75+', 
    icon: BookOpen, 
    color: 'from-green-500 to-emerald-500',
    description: 'Research publications'
  },
  { 
    label: 'Books(Edited & Published)', 
    value: '4+', 
    icon: Award, 
    color: 'from-purple-500 to-violet-500',
    description: 'Academic books published'
  },
  { 
    label: 'Research Projects', 
    value: '30+', 
    icon: Brain, 
    color: 'from-orange-500 to-red-500',
    description: 'Active research initiatives'
  },
  { 
    label: 'International Collaborations', 
    value: '15+', 
    icon: Globe, 
    color: 'from-teal-500 to-cyan-500',
    description: 'Global academic partnerships'
  },
  { 
    label: 'Awards & Recognition', 
    value: '8+', 
    icon: Trophy, 
    color: 'from-yellow-500 to-amber-500',
    description: 'Academic achievements'
  }
];

export default function FacultyPreview() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentStat, setCurrentStat] = useState<number>(0);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate stats
    const statsInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => {
      clearInterval(statsInterval);
    };
  }, []);

  return (
    <SectionWrapper>
      {/* Centered header section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Faculty</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Under the guidance of our Faculty Co-ordinator, our faculty team blends
          expertise with dedication — shaping the minds of tomorrow through
          innovation, research, and unwavering commitment to excellence.
        </p>

        <div className="mt-6">
          <SectionCTA
            to="/faculty"
            label="View All Faculty →"
            variant="primary"
          />
        </div>
      </div>

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Academic themed floating elements */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-academic opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 6}s`,
            }}
          >
            {i % 8 === 0 && <GraduationCap className="w-8 h-8 text-primary" />}
            {i % 8 === 1 && <BookOpen className="w-6 h-6 text-secondary" />}
            {i % 8 === 2 && <Award className="w-7 h-7 text-accent" />}
            {i % 8 === 3 && <Lightbulb className="w-5 h-5 text-primary" />}
            {i % 8 === 4 && <Sparkles className="w-6 h-6 text-secondary" />}
            {i % 8 === 5 && <Brain className="w-7 h-7 text-primary" />}
            {i % 8 === 6 && <Trophy className="w-6 h-6 text-accent" />}
            {i % 8 === 7 && <Globe className="w-5 h-5 text-secondary" />}
          </div>
        ))}

        {/* Multiple gradient orbs with different sizes */}
        <div className="absolute top-1/4 left-1/8 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/8 w-48 h-48 bg-gradient-to-br from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-accent/25 to-transparent rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "4s" }} />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="stats-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.5" fill="currentColor" className="text-primary animate-pulse" />
                <circle cx="0" cy="0" r="0.3" fill="currentColor" className="text-secondary animate-pulse" style={{animationDelay: "1s"}} />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#stats-grid)" />
          </svg>
        </div>
      </div>

      {/* Main stats grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${
                currentStat === index ? 'scale-105 z-20' : 'scale-100'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer transform ${
                currentStat === index || hoveredStat === index
                  ? 'border-primary/50 bg-gradient-to-br from-background/95 to-background/80 shadow-2xl shadow-primary/20 -translate-y-2' 
                  : 'border-border/30 bg-background/60 hover:border-primary/30 hover:-translate-y-1'
              } backdrop-blur-lg overflow-hidden`}
              onClick={() => setCurrentStat(index)}
              >
                
                {/* Dynamic background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} transition-opacity duration-500 ${
                  currentStat === index ? 'opacity-10' : 'opacity-5'
                }`} />
                
                {/* Animated border glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} transition-opacity duration-500 ${
                  currentStat === index ? 'opacity-20' : 'opacity-0'
                } blur-xl`} />

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 bg-primary/40 rounded-full transition-opacity duration-500 ${
                        hoveredStat === index ? 'animate-sparkle opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Stat icon with enhanced styling */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transition-all duration-500 ${
                      currentStat === index ? 'animate-pulse-glow scale-110' : ''
                    }`}>
                      <stat.icon className="w-8 h-8 text-white" />
                      
                      {/* Icon glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} blur-lg transition-opacity duration-500 ${
                        currentStat === index ? 'opacity-60 animate-ping' : 'opacity-30'
                      }`} />
                    </div>

                    {/* Progress indicator */}
                    <div className={`flex flex-col items-end space-y-1 transition-all duration-500 ${
                      currentStat === index ? 'opacity-100' : 'opacity-50'
                    }`}>
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500 ${
                        currentStat === index ? 'scale-125 animate-pulse' : ''
                      }`} />
                      <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${stat.color} transition-all duration-500 ${
                        currentStat === index ? 'opacity-100 scale-110' : 'opacity-40'
                      }`} />
                    </div>
                  </div>

                  {/* Stat content */}
                  <div className="space-y-3">
                    <div className={`text-4xl font-bold transition-all duration-500 ${
                      currentStat === index 
                        ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent scale-110 animate-pulse-text' 
                        : 'text-foreground'
                    }`}>
                      {stat.value}
                    </div>
                    
                    <div className="space-y-1">
                      <div className={`text-lg font-semibold transition-colors duration-300 ${
                        currentStat === index ? 'text-primary' : 'text-foreground'
                      }`}>
                        {stat.label}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {stat.description}
                      </div>
                    </div>
                  </div>

                  {/* Animated bottom accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transition-all duration-500 ${
                    currentStat === index ? 'opacity-100 scale-x-100' : 'opacity-50 scale-x-75'
                  } transform origin-center rounded-full`} />
                </div>

                {/* Hover shimmer effect */}
                <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                  hoveredStat === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shimmer" />
                </div>
              </div>

              {/* External glow for active stat */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} transition-all duration-500 ${
                currentStat === index ? 'opacity-20 blur-2xl scale-110' : 'opacity-0'
              } -z-10`} />
            </div>
          ))}
        </div>

        {/* Stats summary bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-background/90 to-background/70 border border-primary/20 backdrop-blur-lg shadow-xl">
            <Star className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Excellence in Academic Leadership
            </span>
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-academic {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-20px) translateX(15px) rotate(90deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(10px) translateX(-10px) rotate(180deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-5px) translateX(20px) rotate(270deg);
            opacity: 0.4;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.15);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.4);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes pulse-text {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
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

        .animate-float-academic {
          animation: float-academic 15s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 1.8s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2.5s ease-in-out infinite;
        }

        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}} />
    </SectionWrapper>
  );
}
