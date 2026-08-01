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
  Calendar,
  Tag,
  Camera,
  Layers,
  Users
} from "lucide-react";

// Asset imports
import hackathonImg from "@/assets/images/hackathon.webp";
import ideathonImg from "@/assets/images/ideathon.webp";
import ideathoncompImg from "@/assets/images/ideathoncomp.webp";
import atalFdpImg from "@/assets/images/atalFdp.webp";
import aiSummitImg from "@/assets/images/ai-summit.webp";
import designWorkshopImg from "@/assets/images/design-workshop.webp";
import techConferenceImg from "@/assets/images/tech-conference.webp";
import startupPitchImg from "@/assets/images/startup-pitch.webp";
import expertTalkImg from "@/assets/images/xpert_talk.webp";
import orientationImg from "@/assets/images/orientation_2.webp";
import networkingImg from "@/assets/images/networking-event.webp";
import labsImg from "@/assets/images/labsImg.webp";
import workshopImg from "@/assets/images/workshopImg.webp";
import seminarImg from "@/assets/images/seminarImg.webp";
import fluxGfgImg from "@/assets/images/flux-x-gfg.webp";

interface GalleryItem {
  id: string;
  title: string;
  category: "Events" | "Hackathons" | "Workshops" | "Team" | "Induction" | "Ideathon";
  date: string;
  description: string;
  image: string;
  aspect?: "tall" | "wide" | "square";
}

const LazyImage: React.FC<{ src: string, alt: string, className?: string }> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />;
};

const galleryData: GalleryItem[] = [
  {
    id: "1",
    title: "FLUX Ideathon 2026",
    category: "Ideathon",
    date: "Jan 2026",
    description: "Innovators pitching ground-breaking solutions during the flagship 36-hour hackathon.",
    image: ideathoncompImg,
    aspect: "wide"
  }
];

const inductionImages = import.meta.glob('@/assets/Flux Induction 2026/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;

const inductionGalleryData: GalleryItem[] = Object.entries(inductionImages).map(([path, url], index) => {
  return {
    id: `induction-${index}`,
    title: `FLUX Induction 2026`,
    category: "Induction",
    date: "Mar 2026",
    description: "Glimpses from the FLUX Induction 2026 event.",
    image: url,
    aspect: index % 3 === 0 ? "wide" : index % 2 === 0 ? "tall" : "square"
  };
});

const workshopGlobImages = import.meta.glob('@/assets/Expert session/10 October 2025/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;

const workshopGlobGalleryData: GalleryItem[] = Object.entries(workshopGlobImages).map(([path, url], index) => {
  return {
    id: `workshop-glob-${index}`,
    title: `Workshop 2025`,
    category: "Workshops",
    date: "Oct 2025",
    description: "Glimpses from the October 2025 Workshop.",
    image: url,
    aspect: index % 3 === 0 ? "wide" : index % 2 === 0 ? "tall" : "square"
  };
});

const ideathonImages = import.meta.glob('@/assets/Ideathon 2025/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;

const ideathonGalleryData: GalleryItem[] = Object.entries(ideathonImages).map(([path, url], index) => {
  return {
    id: `ideathon-2025-${index}`,
    title: `Ideathon 2025`,
    category: "Ideathon",
    date: "Dec 2025",
    description: "Glimpses from the Ideathon 2025 event.",
    image: url,
    aspect: index % 3 === 0 ? "wide" : index % 2 === 0 ? "tall" : "square"
  };
});

const allGalleryData = [...ideathonGalleryData, ...inductionGalleryData, ...workshopGlobGalleryData, ...galleryData];

const categories = ["All", "Ideathon", "Workshops", "Induction"] as const;
const ITEMS_PER_PAGE = 12;

const categoryIcons: Record<(typeof categories)[number], React.ReactNode> = {
  All: <Layers size={14} />,
  Ideathon: <Sparkles size={14} />,
  Workshops: <Tag size={14} />,
  Induction: <Users size={14} />,
};


export default function GalleryPage({ isMobile }: { isMobile?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sliderImages = useMemo(() => {
    const categoriesSet = new Set<string>();
    const selected: GalleryItem[] = [];
    for (const item of allGalleryData) {
      if (!categoriesSet.has(item.category)) {
        categoriesSet.add(item.category);
        selected.push(item);
      }
    }
    return selected;
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const filteredItems = selectedCategory === "All"
    ? allGalleryData
    : allGalleryData.filter(item => item.category === selectedCategory);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  useEffect(() => {
    setLightboxIndex(null);
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  // Background floating animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-glow-1", {
        y: 50,
        x: 30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true
      });
      gsap.to(".bg-glow-2", {
        y: -40,
        x: -20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
        force3D: true
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger for GSAP pinned elements (if any)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [visibleItems.length, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allGalleryData.length };
    for (const cat of categories) {
      if (cat !== "All") {
        counts[cat] = allGalleryData.filter((item) => item.category === cat).length;
      }
    }
    return counts;
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((current) => {
      if (current === null) return null;
      return current === 0 ? filteredItems.length - 1 : current - 1;
    });
  }, [filteredItems.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((current) => {
      if (current === null) return null;
      return current === filteredItems.length - 1 ? 0 : current + 1;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);


  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#070B09] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Background Decorative Glow Effects */}
      <div className="bg-glow-1 absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00FFC6]/10 blur-3xl pointer-events-none rounded-full will-change-transform transform-gpu" />
      <div className="bg-glow-2 absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 blur-3xl pointer-events-none rounded-full will-change-transform transform-gpu" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FFC6]/10 border border-[#00FFC6]/25 text-[#00FFC6] text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles size={14} />
            <span>Visual Journey</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4"
            style={{ fontFamily: "'Orbitron', 'Space Grotesk', sans-serif" }}
          >
            FLUX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] via-emerald-400 to-teal-300">GALLERY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg leading-relaxed"
          >
            Capturing defining moments, high-energy hackathons, expert workshops, and campus innovation at FLUX MMMUT.
          </motion.p>
        </div>

        {/* Auto Slider Hero */}
        <div className="relative w-full max-w-5xl mx-auto h-[220px] sm:h-[450px] mb-16 rounded-3xl overflow-hidden shadow-2xl shadow-[#00FFC6]/10 border border-white/10 group">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <LazyImage
                src={sliderImages[currentSlideIndex].image}
                alt={sliderImages[currentSlideIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B09] via-[#070B09]/40 to-transparent opacity-90" />

              <div className="absolute bottom-8 left-8 right-8">
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-bold uppercase tracking-widest bg-[#00FFC6]/20 border border-[#00FFC6]/40 text-[#00FFC6] backdrop-blur-sm">
                  {sliderImages[currentSlideIndex].category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {sliderImages[currentSlideIndex].title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl line-clamp-2">
                  {sliderImages[currentSlideIndex].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlideIndex ? "bg-[#00FFC6] w-6" : "bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-12 sm:mx-0"
        >
          <div
            ref={categoryScrollRef}
            className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 px-4 sm:px-0 pb-1"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  data-category={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  className={`relative flex-shrink-0 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${isActive
                    ? "text-black font-bold shadow-lg shadow-[#00FFC6]/25"
                    : "text-gray-400 hover:text-white bg-white/[0.03] border border-white/10 hover:border-[#00FFC6]/40"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-gradient-to-r from-[#00FFC6] to-emerald-400 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                    {cat === "All" && <Layers size={14} />}
                    {cat === "Ideathon" && <Sparkles size={14} />}

                    {cat === "Workshops" && <Tag size={14} />}

                    {cat === "Induction" && <Users size={14} />}
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="gallery-item will-change-transform"
              style={{ contentVisibility: "auto", containIntrinsicSize: "350px" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div
                onClick={() => setLightboxIndex(index)}
                className="group relative h-full rounded-2xl overflow-hidden bg-[#0d1511] border border-white/10 hover:border-[#00FFC6]/60 hover:-translate-y-1 hover:shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer shadow-xl will-change-transform transform-gpu"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500 ease-out will-change-transform transform-gpu"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B09] via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  <div className="absolute top-2 left-2 right-2 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 pointer-events-none">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-widest bg-black/70 border border-[#00FFC6]/40 text-[#00FFC6]">
                      {item.category}
                    </span>
                    <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-medium text-gray-300 bg-black/60 border border-white/10 flex items-center gap-1">
                      <Calendar size={10} className="text-[#00FFC6]" />
                      <span className="hidden sm:inline">{item.date}</span>
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-[#00FFC6]/90 text-black flex items-center justify-center shadow-lg shadow-[#00FFC6]/40">
                      <ZoomIn size={22} />
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 relative bg-gradient-to-b from-[#0d1511] to-[#070B09] h-full flex flex-col">
                  <h3
                    className="text-sm sm:text-lg font-bold text-white group-hover:text-[#00FFC6] transition-colors duration-300 mb-1 sm:mb-1.5 line-clamp-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
              className="px-8 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00FFC6]/50 hover:text-[#00FFC6] text-sm font-semibold uppercase tracking-wider transition-colors duration-200"
            >
              Load more ({filteredItems.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No photos found for this category.</p>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-[#00FFC6] text-white hover:text-black transition-all duration-300 border border-white/20"
              aria-label="Close Lightbox"
            >
              <X size={22} />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-[#00FFC6] text-white hover:text-black border border-white/20 transition-all duration-300"
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-[#00FFC6] text-white hover:text-black border border-white/20 transition-all duration-300"
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Modal Content Container */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] bg-[#0d1511] rounded-3xl overflow-hidden border border-[#00FFC6]/40 shadow-2xl shadow-[#00FFC6]/20 flex flex-col"
            >
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[60vh]">
                <LazyImage
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-gradient-to-r from-[#0d1511] via-[#070B09] to-[#0d1511] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#00FFC6]/15 border border-[#00FFC6]/30 text-[#00FFC6]">
                      {activeItem.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} className="text-[#00FFC6]" />
                      {activeItem.date}
                    </span>
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {activeItem.title}
                  </h2>
                  <p className="text-gray-300 text-sm mt-1 max-w-2xl leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                <div className="text-xs text-gray-500 flex items-center gap-2 self-end sm:self-center">
                  <span>{lightboxIndex !== null ? lightboxIndex + 1 : 0} of {filteredItems.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
