import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Images, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import ideathonImg from "@/assets/images/ideathoncomp.webp";
import orientationImg from "@/assets/Flux Induction 2026/IMG_20260321_112538_287.webp";
import xpertTalkImg from "@/assets/images/xpert_talk.webp";
import fluxGfgImg from "@/assets/images/flux-x-gfg.webp";
import hackathonImg from "@/assets/images/hackathon.webp";

const previewItems = [
  {
    id: "1",
    title: "FLUX Ideathon 2025",
    category: "Hackathons",
    image: ideathonImg,
    featured: true,
  },
  {
    id: "2",
    title: "FLUX Induction 2026",
    category: "Events",
    image: orientationImg,
  },
  {
    id: "3",
    title: "Expert Sessions",
    category: "Workshops",
    image: xpertTalkImg,
  },
  // {
  //   id: "4",
  //   title: "FLUX x GeeksforGeeks",
  //   category: "Collaboration",
  //   image: fluxGfgImg,
  // },
  // {
  //   id: "5",
  //   title: "Tech Hackathons",
  //   category: "Events",
  //   image: hackathonImg,
  // },
];

const featured = previewItems.find((item) => item.featured)!;
const stripItems = previewItems.filter((item) => !item.featured);

const stats = [
  { label: "Events", value: "12+" },
  { label: "Hackathons", value: "8+" },
  { label: "Workshops", value: "15+" },
];

export default function GalleryPreview() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on hero image
      gsap.to(".gallery-hero-img", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: ".gallery-hero-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Stagger reveal for strip items
      gsap.fromTo(
        ".gallery-strip-item",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-strip-container",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 bg-[#070B09] text-white overflow-hidden select-none">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(0,255,198,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00FFC6]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent" />
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-[#00FFC6]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FFC6]/10 border border-[#00FFC6]/20 text-[#00FFC6] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
              <Camera size={13} />
              <span>Moments & Memories</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.1] text-white mb-3"
              style={{ fontFamily: "'Orbitron', 'Space Grotesk', sans-serif" }}
            >
              LIFE AT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-emerald-300">
                FLUX
              </span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Hackathons, workshops, inductions, and campus innovation — captured in one visual archive.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 min-w-[88px] text-center"
              >
                <p className="text-lg font-black text-[#00FFC6]">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <Link
          to="/gallery"
          className="gallery-hero-container group block relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#00FFC6]/40 transition-colors duration-300 mb-8"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#0d1511]">
            <img
              src={featured.image}
              alt={featured.title}
              className="gallery-hero-img absolute w-full h-[120%] -top-[10%] object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070B09]/95 via-[#070B09]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B09]/80 via-transparent to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
              <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FFC6] text-black text-[10px] font-black uppercase tracking-widest mb-3">
                <Sparkles size={11} />
                Featured
              </span>
              <p className="text-[#00FFC6] text-xs font-semibold uppercase tracking-[0.15em] mb-1">
                {featured.category}
              </p>
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 max-w-xl group-hover:text-[#00FFC6] transition-colors duration-300"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {featured.title}
              </h3>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-[#00FFC6] transition-colors duration-200">
                Open full gallery
                <ArrowRight
                  size={16}
                  style={{ willChange: "transform", transform: "translateZ(0)" }}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </span>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-[11px] text-gray-300">
              <Images size={13} className="text-[#00FFC6]" />
              50+ photos
            </div>
          </div>
        </Link>

        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-10">
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#070B09] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#070B09] to-transparent z-10 pointer-events-none" />

          <div className="gallery-strip-container gallery-scroll-x flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2">
            {stripItems.map((item, index) => (
              <Link
                key={item.id}
                to="/gallery"
                className="gallery-strip-item group flex-shrink-0 w-[260px] sm:w-[280px] snap-start"
              >
                <div className="relative rounded-2xl overflow-hidden bg-[#0d1511] border border-white/10 group-hover:border-[#00FFC6]/40 transition-colors duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="gallery-card-img w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-mono text-[#00FFC6]/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-4 border-t border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#00FFC6]/80 mb-1">
                      {item.category}
                    </p>
                    <h4
                      className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#00FFC6] transition-colors duration-300"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            Browse hackathons, inductions, workshops, and team moments in the complete archive.
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00FFC6] hover:bg-[#00e5b3] text-black font-bold text-xs uppercase tracking-wider transition-colors duration-200 shrink-0"
          >
            View all photos
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
