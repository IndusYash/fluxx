"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";

import ideathonImg from "@/assets/images/ideathoncomp.webp";
import orientationImg from "@/assets/images/orientation_2.webp";
import xpertTalkImg from "@/assets/images/xpert_talk.webp";

const previewItems = [
  {
    id: "1",
    title: "FLUX Ideathon",
    category: "Ideathon",
    image: ideathonImg,
    featured: true,
  },
  {
    id: "2",
    title: "FLUX Orientation",
    category: "Induction",
    image: orientationImg,
  },
  {
    id: "3",
    title: "Expert Talk",
    category: "Workshops",
    image: xpertTalkImg,
  },
];

const featured = previewItems.find((item) => item.featured)!;
const stripItems = previewItems.filter((item) => !item.featured);

export default function GalleryPreview() {
  return (
    <section className="text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-white font-semibold text-sm tracking-widest uppercase mb-4 block">
            Moments & Memories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">
            LIFE AT <span className="text-gray-400">FLUX</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Hackathons, workshops, inductions, and campus innovation — captured in one visual archive.
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-300 transition-colors"
          >
            View all photos
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Featured Image */}
        <Link
          to="/gallery"
          className="card-outline group block relative rounded-2xl overflow-hidden hover:border-gray-300 transition-colors duration-300 mb-6 shadow-[0_8px_0_rgba(255,255,255,0.12)]"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
              <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest mb-3">
                <Camera size={11} />
                Featured
              </span>
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-1">
                {featured.category}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {featured.title}
              </h3>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                Open full gallery
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>

        {/* Image Strip */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stripItems.map((item, index) => (
            <Link
              key={item.id}
              to="/gallery"
              className="group flex-shrink-0 w-[260px] sm:w-[280px]"
            >
              <div className="card-outline relative rounded-xl overflow-hidden bg-white/5 group-hover:border-gray-300 transition-colors shadow-[0_6px_0_rgba(255,255,255,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    {item.category}
                  </p>
                  <h4 className="text-sm font-bold text-white group-hover:text-gray-300 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  );
}
