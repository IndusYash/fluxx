"use client";

import { Target, Lightbulb, Users, Trophy, Microscope } from "lucide-react";
import Container from "@/components/layout/Container";

export default function FluxObjectives() {
  const objectives = [
    {
      icon: <Microscope className="w-8 h-8 text-white" />,
      title: "Research-Driven Culture",
      desc: "Foster innovation and academic excellence among students and faculty through cutting-edge research initiatives.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      title: "Tech Events & Competitions",
      desc: "Organize hackathons, conferences, paper presentations, and tech conclaves that push boundaries.",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Industry Collaboration",
      desc: "Bridge academia with industry experts, researchers, and startups for real-world impact.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-white" />,
      title: "Project Incubation Hub",
      desc: "Create opportunities for interdisciplinary learning, innovation, and problem-solving initiatives.",
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Innovation Showcase",
      desc: "Provide platforms for demonstrating breakthrough ideas through competitions and symposiums.",
    },
  ];

  return (
    <section id="objectives-section" className="text-white pt-[var(--section-pad)] pb-[calc(var(--ticker-h)+48px)]">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-white font-semibold text-sm tracking-widest uppercase mb-4 block">
            Our Mission
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white">
            FLUX <span className="text-gray-400">OBJECTIVES</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Driving innovation, fostering collaboration, and shaping the future of technology through excellence
          </p>
        </div>

        {/* 3 + 2 Layout: Row 1 has 3 cards, Row 2 has 2 cards centered */}
        <div className="flex flex-wrap justify-center gap-6">
          {objectives.map((item) => (
             <div
              key={item.title}
              className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] card-outline group relative p-6 md:p-8 rounded-2xl bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_8px_0_rgba(255,255,255,0.12)] flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 inline-flex items-center justify-center bg-white/10 rounded-xl p-3">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-400 tracking-wide">
            Building tomorrow's technology leaders, today
          </p>
        </div>
      </Container>
    </section>
  );
}
