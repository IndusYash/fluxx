// src/components/sections/home/FacultyPreview.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "@/components/SectionWrapper";
import {
  Users,
  BookOpen,
  Award,
  Brain,
  Globe,
  Trophy,
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: any;
  description: string;
}

const stats: StatItem[] = [
  {
    label: "Patents",
    value: "25+",
    icon: Users,
    description: "Innovative patents filed",
  },
  {
    label: "Publications",
    value: "150+",
    icon: BookOpen,
    description: "Research publications",
  },
  {
    label: "Books",
    value: "8+",
    icon: Award,
    description: "Academic books published",
  },
  {
    label: "Research Projects",
    value: "100+",
    icon: Brain,
    description: "Active research initiatives",
  },
  {
    label: "Citations",
    value: "6400+",
    icon: Globe,
    description: "Global academic partnerships",
  },
  {
    label: "Awards",
    value: "8+",
    icon: Trophy,
    description: "Academic achievements",
  },
];

export default function FacultyPreview() {
  const navigate = useNavigate();

  const handleFacultyClick = () => {
    navigate("/faculty");
  };

  return (
    <SectionWrapper>
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Meet Our Faculty
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Under the guidance of our Faculty Co-ordinator, our faculty team blends expertise with dedication — shaping the minds of tomorrow through innovation, research, and unwavering commitment to excellence.
        </p>

        <div className="mt-6">
          <button
            onClick={handleFacultyClick}
            className="px-6 py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
          >
            View All Faculty →
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
             <div
              key={stat.label}
              className="card-outline p-6 rounded-2xl bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_8px_0_rgba(255,255,255,0.12)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-white mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
