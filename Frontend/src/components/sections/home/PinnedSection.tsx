import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Cpu, Code2, Sparkles, Terminal, Globe, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top+=80",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const techStack = [
    { name: "React", desc: "Interactive Frontend", icon: <Code2 className="w-6 h-6 text-white" /> },
    { name: "Three.js", desc: "WebGL & 3D Shaders", icon: <Layers className="w-6 h-6 text-white" /> },
    { name: "GSAP", desc: "Scroll-Scrubbed Motion", icon: <Sparkles className="w-6 h-6 text-white" /> },
    { name: "TypeScript", desc: "Type-Safe Core", icon: <Terminal className="w-6 h-6 text-white" /> },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#060606] text-white py-24 sm:py-32 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Pinned on desktop) */}
          <div
            ref={leftColRef}
            className="md:col-span-6 lg:col-span-5 md:pr-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.05] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#9a9a9a] mb-6">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>Ecosystem Architecture</span>
            </div>

            <h2 className="font-sans font-light tracking-[-0.03em] leading-[1.12] text-3xl sm:text-4xl lg:text-[2.75rem] text-white mb-6">
              Give your ideas the technological lift of an active innovation ecosystem without building one from scratch.
            </h2>

            <p className="text-[#9a9a9a] text-sm sm:text-base leading-relaxed max-w-[48ch] mb-8">
              FLUX brings together ambitious developers, researchers, and creators. We architect open workshops, cross-domain hackathons, and high-performance WebGL platforms that turn university talent into industry impact.
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs font-mono text-[#9a9a9a]">
              <div>
                <span className="text-white font-bold block text-base font-sans">01</span>
                <span>INTERACT</span>
              </div>
              <span className="text-white/20">•</span>
              <div>
                <span className="text-white font-bold block text-base font-sans">02</span>
                <span>INNOVATE</span>
              </div>
              <span className="text-white/20">•</span>
              <div>
                <span className="text-white font-bold block text-base font-sans">03</span>
                <span>IMPACT</span>
              </div>
            </div>
          </div>

          {/* Right Column (Cards scroll past) */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-6">
            
            {/* Card 1: Large Number Metric Card */}
            <div className="bg-[#111111] border border-white/[0.09] hover:border-white/20 p-8 sm:p-10 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono text-[#9a9a9a] uppercase tracking-wider mb-8">
                <span>Community Builders</span>
                <span>2026 Season</span>
              </div>
              <div className="text-6xl sm:text-7xl lg:text-8xl font-light font-sans tracking-tight text-white mb-4">
                500+
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.08] text-xs text-[#9a9a9a]">
                <span>Active innovators & developers across campus</span>
                <span className="font-mono text-white">100% Student-Driven</span>
              </div>
            </div>

            {/* Card 2: "New" Flagship Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#111111] border border-white/[0.09] hover:border-white/20 p-8 transition-colors flex flex-col justify-between">
                <span className="text-xs font-mono text-[#9a9a9a] uppercase tracking-wider">
                  Flagship
                </span>
                <div className="my-6">
                  <div className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    New
                  </div>
                  <div className="text-xs text-[#9a9a9a] mt-2">
                    Ideathon & Research Conclaves
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#e6e6e6] pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span>Annual Tech Sprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
                </div>
              </div>

              <div className="bg-[#111111] border border-white/[0.09] hover:border-white/20 p-8 transition-colors flex flex-col justify-between">
                <span className="text-xs font-mono text-[#9a9a9a] uppercase tracking-wider">
                  Access
                </span>
                <div className="my-6">
                  <div className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    Free
                  </div>
                  <div className="text-xs text-[#9a9a9a] mt-2">
                    Open to all collegiate creators
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#e6e6e6] pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span>Zero Barrier Entry</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
                </div>
              </div>
            </div>

            {/* Card 3: Small Icon Tiles (Tech Stack Logos) */}
            <div className="bg-[#111111] border border-white/[0.09] p-8">
              <div className="text-xs font-mono text-[#9a9a9a] uppercase tracking-wider mb-6">
                Technical Stack & Tooling
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="bg-[#161616] border border-white/[0.08] hover:border-white/25 p-5 flex flex-col items-center text-center transition-colors group cursor-default"
                  >
                    <div className="mb-3 p-2 bg-white/[0.04] border border-white/10 rounded-none group-hover:border-white/30 transition-colors">
                      {tech.icon}
                    </div>
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {tech.name}
                    </span>
                    <span className="text-[10px] text-[#9a9a9a] mt-1 leading-tight">
                      {tech.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Caption Rows */}
            <div className="bg-[#111111] border border-white/[0.09] divide-y divide-white/[0.08]">
              <div className="px-6 py-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white">Motion</span>
                <span className="flex items-center gap-2 text-[#9a9a9a]">
                  <span className="w-1.5 h-1.5 bg-white" />
                  <span>GSAP • ScrollTrigger</span>
                </span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white">WebGL</span>
                <span className="flex items-center gap-2 text-[#9a9a9a]">
                  <span className="w-1.5 h-1.5 bg-white" />
                  <span>Three.js • Custom Shaders</span>
                </span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white">Smooth Scroll</span>
                <span className="flex items-center gap-2 text-[#9a9a9a]">
                  <span className="w-1.5 h-1.5 bg-white" />
                  <span>Lenis Kinetic Engine</span>
                </span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white">Core Society</span>
                <span className="flex items-center gap-2 text-[#9a9a9a]">
                  <span className="w-1.5 h-1.5 bg-white" />
                  <span>FLUX Technical Society</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

