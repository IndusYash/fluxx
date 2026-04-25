// src/components/sections/home/FacultyPreview.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "@/components/SectionWrapper";
import SectionCTA from "@/components/sectionCTA";
import {
  Users,
  BookOpen,
  Award,
  Brain,
  Globe,
  Trophy,
} from "lucide-react";
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
    label: "Patents",
    value: "25+",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    description: "Innovative patents filed",
  },
  {
    label: "Project Based Publications",
    value: "150+",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    description: "Research publications",
  },
  {
    label: "Books(Edited & Published)",
    value: "8+",
    icon: Award,
    color: "from-purple-500 to-violet-500",
    description: "Academic books published",
  },
  {
    label: "Research Projects",
    value: "100+",
    icon: Brain,
    color: "from-orange-500 to-red-500",
    description: "Active research initiatives",
  },
  {
    label: "Citations",
    value: "6400+",
    icon: Globe,
    color: "from-teal-500 to-cyan-500",
    description: "Global academic partnerships",
  },
  {
    label: "Awards & Recognition",
    value: "8+",
    icon: Trophy,
    color: "from-yellow-500 to-amber-500",
    description: "Academic achievements",
  },
];

export default function FacultyPreview() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleFacultyClick = () => {
    navigate("/faculty");
  };

  return (
    <SectionWrapper>
      {/* Centered header section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Meet Our Faculty
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Under the guidance of our Faculty Co-ordinator, our faculty team
          blends expertise with dedication — shaping the minds of tomorrow
          through innovation, research, and unwavering commitment to excellence.
        </p>

        <div className="mt-6">
          <button
            onClick={handleFacultyClick}
            className="px-5 py-3 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            View All Faculty →
          </button>
        </div>
      </div>

      {/* Subtle background gradient - no floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main stats grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div
                className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer h-full ${
                  hoveredStat === index
                    ? "border-primary/60 bg-background/95 shadow-lg -translate-y-1"
                    : "border-border/40 bg-background/80 hover:border-primary/40"
                } backdrop-blur-sm`}
              >
                {/* Subtle background gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} transition-opacity duration-300 ${
                    hoveredStat === index ? "opacity-5" : "opacity-0"
                  }`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md transition-transform duration-300 ${
                        hoveredStat === index ? "scale-110" : ""
                      }`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>

                  {/* Label and description */}
                  <div className="space-y-1">
                    <div className="text-base font-semibold text-foreground">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} transition-transform duration-300 ${
                      hoveredStat === index ? "scale-x-100" : "scale-x-0"
                    } transform origin-left rounded-full`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background/80 border border-primary/30 backdrop-blur-sm">
            <span className="text-sm font-medium text-green-500">
              Excellence in Academic Leadership
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
