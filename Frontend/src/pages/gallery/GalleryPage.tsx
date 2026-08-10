import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Camera,
  Layers,
  Tag,
  Users,
} from "lucide-react";

// ─── Hero Slider Image Imports ────────────────────────────────────────────────
import slider1 from "@/assets/images/ideathoncomp.webp";
import slider3 from "@/assets/images/expert.webp";
import sliderInduction from "@/assets/Flux Induction 2026/IMG_20260321_123723_394.webp";

interface GalleryItem {
  id: string;
  title: string;
  category: "Events" | "Hackathons" | "Workshops" | "Team" | "Induction" | "Ideathon";
  date: string;
  image: string;
  aspect?: "tall" | "wide" | "square";
}

// ─── Lazy Image ────────────────────────────────────────────────────────────────
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => (
  <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />
);

// ─── Glob Imports ──────────────────────────────────────────────────────────────
const inductionImages = import.meta.glob(
  "@/assets/Flux Induction 2026/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const inductionGalleryData: GalleryItem[] = Object.entries(inductionImages).map(
  ([, url], index) => ({
    id: `induction-${index}`,
    title: "FLUX Induction 2026",
    category: "Induction",
    date: "Mar 2026",
    image: url,
    aspect: index % 5 === 0 ? "wide" : index % 3 === 0 ? "tall" : "square",
  })
);

const workshopGlobImages = import.meta.glob(
  "@/assets/Expert session/10 October 2025/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const workshopGlobGalleryData: GalleryItem[] = Object.entries(workshopGlobImages).map(
  ([, url], index) => ({
    id: `workshop-glob-${index}`,
    title: "Expert Session 2025",
    category: "Workshops",
    date: "Oct 2025",
    image: url,
    aspect: index % 4 === 0 ? "wide" : index % 3 === 0 ? "tall" : "square",
  })
);

const ideathonImages = import.meta.glob(
  "@/assets/Ideathon 2025/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const ideathonGalleryData: GalleryItem[] = Object.entries(ideathonImages).map(
  ([, url], index) => ({
    id: `ideathon-2025-${index}`,
    title: "Ideathon 2025",
    category: "Ideathon",
    date: "Dec 2025",
    image: url,
    aspect: index % 5 === 0 ? "wide" : index % 3 === 0 ? "tall" : "square",
  })
);

const allGalleryData = [
  ...ideathonGalleryData,
  ...inductionGalleryData,
  ...workshopGlobGalleryData,
];

// ─── Constants ─────────────────────────────────────────────────────────────────
const categories = ["All", "Ideathon", "Workshops", "Induction"] as const;
const ITEMS_PER_PAGE = 15;

const categoryMeta: Record<
  (typeof categories)[number],
  { icon: React.ReactNode; color: string }
> = {
  All:       { icon: <Layers      size={14} />, color: "#00FFC6" },
  Ideathon:  { icon: <Sparkles    size={14} />, color: "#a78bfa" },
  Workshops: { icon: <Tag         size={14} />, color: "#fb923c" },
  Induction: { icon: <Users       size={14} />, color: "#6CFFF7" },
};

const heroSliderData = [
  { id: 's1', image: slider1, title: 'FLUX Ideathon', subtitle: 'The Flagship Event' },
  { id: 's2', image: slider3, title: 'Expert Sessions', subtitle: 'Industry Insights & Networking' },
  { id: 's3', image: sliderInduction, title: 'Induction 2026', subtitle: 'Welcoming the Freshmen' },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function GalleryPage({ isMobile }: { isMobile?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex]       = useState<number | null>(null);
  const [visibleCount, setVisibleCount]         = useState(ITEMS_PER_PAGE);
  const containerRef   = useRef<HTMLDivElement>(null);
  const loadMoreRef    = useRef<HTMLDivElement>(null);
  const thumbStripRef  = useRef<HTMLDivElement>(null);

  // ── Hero Slider ─────────────────────────────────────────────────────────────
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlideIndex(p => (p + 1) % heroSliderData.length),
      4500
    );
    return () => clearInterval(timer);
  }, []);

  // ── Filtering ───────────────────────────────────────────────────────────────
  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? allGalleryData
        : allGalleryData.filter(item => item.category === selectedCategory),
    [selectedCategory]
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allGalleryData.length };
    for (const cat of categories) {
      if (cat !== "All")
        counts[cat] = allGalleryData.filter(i => i.category === cat).length;
    }
    return counts;
  }, []);

  // ── Reset on filter change ──────────────────────────────────────────────────
  useEffect(() => {
    setLightboxIndex(null);
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory]);

  // ── IntersectionObserver for load-more ─────────────────────────────────────
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    const el = loadMoreRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount(c => c + ITEMS_PER_PAGE);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, visibleItems.length]);

  // ── Lightbox helpers ────────────────────────────────────────────────────────
  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex(c =>
        c === null ? null : c === 0 ? filteredItems.length - 1 : c - 1
      );
    },
    [filteredItems.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex(c =>
        c === null ? null : c === filteredItems.length - 1 ? 0 : c + 1
      );
    },
    [filteredItems.length]
  );

  // Keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      setLightboxIndex(null);
      if (e.key === "ArrowLeft")   handlePrev();
      if (e.key === "ArrowRight")  handleNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, handlePrev, handleNext]);

  // Scroll lightbox thumbnail strip to keep active thumb visible
  useEffect(() => {
    if (lightboxIndex === null || !thumbStripRef.current) return;
    const strip = thumbStripRef.current;
    const active = strip.children[lightboxIndex] as HTMLElement | undefined;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [lightboxIndex]);

  // ── ScrollTrigger refresh ──────────────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, [visibleItems.length, selectedCategory]);

  // Aspect-ratio helper for masonry
  const aspectClass = (aspect?: string) => {
    if (aspect === "tall")   return "aspect-[3/4]";
    if (aspect === "wide")   return "aspect-[16/9]";
    if (aspect === "square") return "aspect-[1/1]";
    return "aspect-[4/3]";
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#070B09] text-white pt-24 pb-20
        px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
        bg-[#00FFC6]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px]
        bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Minimalist Page Header ───────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white uppercase"
            style={{ fontFamily: "'Orbitron', 'Space Grotesk', sans-serif" }}
          >
            FLUX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] via-emerald-400 to-[#a78bfa]">
              GALLERY
            </span>
          </motion.h1>
        </div>

        {/* ── Premium Hero Slider ──────────────────────────────────────────── */}
        <div className="relative w-full mx-auto h-[250px] sm:h-[450px] lg:h-[550px] mb-16
          rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <LazyImage
                src={heroSliderData[currentSlideIndex].image}
                alt={heroSliderData[currentSlideIndex].title}
                className="w-full h-full object-cover"
              />
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B09] via-[#070B09]/50 to-transparent opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070B09]/90 via-black/20 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

              <div className="absolute bottom-10 sm:bottom-16 left-8 sm:left-14 right-8 sm:right-14">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-12 h-1 mb-4 bg-gradient-to-r from-[#00FFC6] to-[#a78bfa] rounded-full"
                />
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {heroSliderData[currentSlideIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-[#00FFC6] text-base sm:text-lg lg:text-xl font-bold tracking-widest uppercase drop-shadow-lg"
                >
                  {heroSliderData[currentSlideIndex].subtitle}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          <button
            onClick={() => setCurrentSlideIndex(p => (p - 1 + heroSliderData.length) % heroSliderData.length)}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12
              rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100
              transition-all duration-300 bg-white/10 hover:bg-[#00FFC6] text-white hover:text-black
              border border-white/20 backdrop-blur-md"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentSlideIndex(p => (p + 1) % heroSliderData.length)}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12
              rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100
              transition-all duration-300 bg-white/10 hover:bg-[#00FFC6] text-white hover:text-black
              border border-white/20 backdrop-blur-md"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-6 right-8 flex gap-2 z-10">
            {heroSliderData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: idx === currentSlideIndex ? "30px" : "8px",
                  height: "8px",
                  background: idx === currentSlideIndex ? "#00FFC6" : "rgba(255,255,255,0.4)",
                  boxShadow: idx === currentSlideIndex ? "0 0 10px rgba(0,255,198,0.5)" : "none"
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Category Filters ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative mb-12 flex justify-center"
        >
          <div className="inline-flex items-center flex-wrap gap-2 sm:gap-3 p-1.5 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-xl">
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              const meta = categoryMeta[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative flex items-center gap-2 px-5 py-2.5 rounded-[16px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  style={{
                    color: isActive ? "#000" : "#a1a1aa",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCatBg"
                      className="absolute inset-0 rounded-[16px] shadow-[0_0_15px_rgba(0,255,198,0.3)]"
                      style={{ background: meta.color }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {meta.icon}
                    {cat}
                    <span
                      className="px-1.5 py-0.5 rounded-md text-[10px]"
                      style={{
                        background: isActive ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)",
                        color: isActive ? "#000" : "#a1a1aa",
                      }}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Masonry Gallery Grid ─────────────────────────────────────────── */}
        <div
          className="gap-4 sm:gap-5"
          style={{
            columns: isMobile ? 2 : "3",
            columnGap: "20px",
          }}
        >
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="break-inside-avoid mb-4 sm:mb-5"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
            >
              <div
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-3xl overflow-hidden bg-[#0d1511]
                  border border-white/5 hover:border-white/20
                  transition-all duration-500 cursor-pointer shadow-lg
                  hover:shadow-[0_10px_40px_rgba(0,255,198,0.15)]"
              >
                {/* Image */}
                <div className={`relative w-full overflow-hidden bg-black/40 ${aspectClass(item.aspect)}`}>
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center
                      group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent 
                    opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Hover reveal: full info overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-end justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-[#00FFC6] text-[10px] font-bold uppercase tracking-widest mb-1 block">
                          {item.category}
                        </span>
                        <h3
                          className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white
                        flex items-center justify-center border border-white/20 shrink-0
                        group-hover:bg-[#00FFC6] group-hover:text-black transition-colors duration-300">
                        <ZoomIn size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Load More Sentinel ───────────────────────────────────────────── */}
        {hasMore && (
          <div ref={loadMoreRef} className="mt-12 flex justify-center pb-10">
            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-3 text-white text-sm font-medium backdrop-blur-md">
              <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-[#00FFC6] animate-spin" />
              Loading amazing moments...
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            <Camera size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-medium">No photos found in this category.</p>
          </div>
        )}

      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeItem !== null && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg flex flex-col
              items-center justify-center p-4 sm:p-6 lg:p-10 select-none"
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-3.5 rounded-full
                bg-white/10 hover:bg-[#00FFC6] text-white hover:text-black
                transition-all duration-300 border border-white/20"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full
                bg-white/5 hover:bg-[#00FFC6] text-white hover:text-black backdrop-blur-md
                border border-white/10 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full
                bg-white/5 hover:bg-[#00FFC6] text-white hover:text-black backdrop-blur-md
                border border-white/10 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={28} />
            </button>

            {/* Modal card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-[32px] overflow-hidden
                border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                flex flex-col max-h-[85vh]"
            >
              {/* Main image */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black/50 p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <LazyImage
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info strip */}
              <div className="px-6 py-5 bg-gradient-to-t from-[#0a0a0a] to-transparent
                border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {activeItem.title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                    <span className="text-[#00FFC6]">{activeItem.category}</span>
                    <span>•</span>
                    <span>{activeItem.date}</span>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div
                ref={thumbStripRef}
                className="flex gap-3 p-4 bg-[#050505] overflow-x-auto scrollbar-hide border-t border-white/5"
                style={{ scrollbarWidth: "none" }}
              >
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={e => { e.stopPropagation(); setLightboxIndex(idx); }}
                    className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 relative"
                  >
                    <LazyImage src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-colors duration-300 ${idx === lightboxIndex ? 'border-2 border-[#00FFC6] bg-transparent' : 'bg-black/50 hover:bg-black/20'}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
