// src/components/sections/home/FacultyPreview.tsx
import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionCTA from "@/components/sectionCTA";
import { GraduationCap, BookOpen, Award, Users, Lightbulb, Target, Brain, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface FacultyMember {
  id: number;
  name: string;
  title: string;
  department: string;
  image: string;
  specialization: string[];
  experience: string;
  color: string;
  icon: any;
}

interface StatItem {
  label: string;
  value: string;
  icon: any;
  color: string;
}

const stats: StatItem[] = [
  { label: 'Faculty Members', value: '25+', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { label: 'Research Papers', value: '150+', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
  { label: 'Years Experience', value: '20+', icon: Award, color: 'from-purple-500 to-violet-500' }
];

export default function FacultyPreview() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentStat, setCurrentStat] = useState<number>(0);

  // Mock faculty data - replace with your actual data
  const facultyMembers: FacultyMember[] = [
    {
      id: 1,
      name: "Dr. Satvik Vats",
      title: "Faculty Coordinator",
      department: "Computer Science",
      image: "/api/placeholder/150/150", // Replace with actual image path
      specialization: ["Machine Learning", "Data Science", "AI Research"],
      experience: "15+ years",
      color: "from-blue-600 via-indigo-600 to-purple-600",
      icon: Brain
    },
    {
      id: 2,
      name: "Dr. Shwet Ketu",
      title: "Associate Professor",
      department: "Information Technology",
      image: "/api/placeholder/150/150", // Replace with actual image path
      specialization: ["Software Engineering", "Web Development", "Database Systems"],
      experience: "12+ years",
      color: "from-emerald-600 via-teal-600 to-cyan-600",
      icon: Target
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate stats
    const statsInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2500);

    // Auto-rotate faculty
    const facultyInterval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % facultyMembers.length);
    }, 4000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(facultyInterval);
    };
  }, []);

  return (
    <SectionWrapper
      cta={
        <SectionCTA to="/faculty" label="View All Faculty →" variant="primary" />
      }
    >
      {/* Centered header section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Faculty</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Under the guidance of our Faculty Co-ordinator, our faculty team blends expertise with dedication — shaping the minds of tomorrow through innovation, research, and unwavering commitment to excellence.
        </p>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Academic themed floating elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-academic opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          >
            {i % 5 === 0 && <GraduationCap className="w-8 h-8 text-primary" />}
            {i % 5 === 1 && <BookOpen className="w-6 h-6 text-secondary" />}
            {i % 5 === 2 && <Award className="w-7 h-7 text-accent" />}
            {i % 5 === 3 && <Lightbulb className="w-5 h-5 text-primary" />}
            {i % 5 === 4 && <Sparkles className="w-6 h-6 text-secondary" />}
          </div>
        ))}

        {/* Large gradient orbs */}
        <div className="absolute top-1/3 left-1/6 w-48 h-48 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/6 w-64 h-64 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Faculty showcase */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          
          {/* Left - Featured faculty spotlight */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-lg rounded-3xl p-8 border border-primary/20 shadow-2xl overflow-hidden">
              
              {/* Active background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${facultyMembers[activeTab].color} opacity-5 transition-all duration-700`} />
              
              {/* Animated mesh pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="mesh" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="1" fill="currentColor" className="text-primary animate-pulse" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#mesh)" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  
                  {/* Faculty image with decorative elements */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${facultyMembers[activeTab].color} rounded-full animate-spin-slow`} />
                    <div className="relative w-40 h-40 rounded-full bg-background p-2">
                      <img
                        src={facultyMembers[activeTab].image}
                        alt={facultyMembers[activeTab].name}
                        className="w-full h-full rounded-full object-cover border-4 border-background"
                      />
                    </div>
                    
                    {/* Academic achievement badges */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Department icon */}
                    <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                      {React.createElement(facultyMembers[activeTab].icon, { 
                        className: "w-5 h-5 text-white" 
                      })}
                    </div>

                    {/* Orbiting elements */}
                    <div className="absolute inset-0">
                      {[GraduationCap, BookOpen, Lightbulb].map((Icon, i) => (
                        <Icon
                          key={i}
                          className="absolute w-5 h-5 text-primary/40 animate-orbit-faculty"
                          style={{
                            animationDelay: `${i * 1.5}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Faculty details */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {facultyMembers[activeTab].name}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-1">{facultyMembers[activeTab].title}</p>
                    <p className="text-primary font-medium mb-4">{facultyMembers[activeTab].department}</p>
                    
                    {/* Specializations */}
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-semibold text-foreground">Specializations:</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {facultyMembers[activeTab].specialization.map((spec, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${facultyMembers[activeTab].color} text-white opacity-90 transform transition-all duration-300 hover:scale-110`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experience badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-background/80 to-background/60 border border-primary/30 backdrop-blur-sm">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      <span className="text-sm font-medium">{facultyMembers[activeTab].experience} Experience</span>
                    </div>
                  </div>
                </div>

              
              </div>
            </div>
          </div>

          {/* Right - Animated stats */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                } ${
                  currentStat === index ? 'scale-105' : 'scale-100'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`relative p-6 rounded-2xl border-2 transition-all duration-500 ${
                  currentStat === index 
                    ? 'border-primary/50 bg-gradient-to-br from-background/90 to-background/70 shadow-xl shadow-primary/20' 
                    : 'border-border/30 bg-background/50 hover:border-primary/30'
                } backdrop-blur-sm cursor-pointer`}
                onClick={() => setCurrentStat(index)}
                >
                  
                

                  <div className="flex items-center gap-4">
                    {/* Animated icon */}
                    <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${
                      currentStat === index ? 'animate-pulse-glow' : ''
                    }`}>
                      <stat.icon className="w-7 h-7 text-white" />
                      
                      {/* Icon glow effect */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${stat.color} blur-md opacity-50 ${
                        currentStat === index ? 'animate-ping' : ''
                      }`} />
                    </div>

                    {/* Stat content */}
                    <div className="flex-1">
                      <div className={`text-3xl font-bold transition-all duration-300 ${
                        currentStat === index 
                          ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent scale-110' 
                          : 'text-foreground'
                      }`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${stat.color} transition-all duration-500 ${
                      currentStat === index ? 'opacity-100 scale-110' : 'opacity-30'
                    }`} />
                  </div>

                  {/* Hover particle effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/50 rounded-full animate-sparkle"
                        style={{
                          left: `${15 + Math.random() * 70}%`,
                          top: `${15 + Math.random() * 70}%`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

          </div>

         
         

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-academic {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.1;
          }
          33% {
            transform: translateY(-15px) translateX(10px) rotate(120deg);
            opacity: 0.3;
          }
          66% {
            transform: translateY(5px) translateX(-10px) rotate(240deg);
            opacity: 0.2;
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
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

        @keyframes orbit-faculty {
          0% {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
            opacity: 0.2;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float-academic {
          animation: float-academic 12s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-orbit-faculty {
          animation: orbit-faculty 6s linear infinite;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}} />
    </SectionWrapper>
  );
}