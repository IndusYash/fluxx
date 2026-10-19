import React from "react";
import { motion } from "framer-motion";
import {
  Users2,
  GraduationCap,
  CalendarDays,
  Flame,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { BYTEBRAWL_CONFIG } from "@/config/eventConfig";

export default function EventDetailsGrid() {
  const detailCards = [
    {
      icon: <Flame className="w-5 h-5 text-white" />,
      label: "COMPETITION FORMAT",
      title: "Hardened Competitive Builds",
      value: BYTEBRAWL_CONFIG.format,
      meta: BYTEBRAWL_CONFIG.platform,
    },
    {
      icon: <Users2 className="w-5 h-5 text-white" />,
      label: "TEAM STRUCTURE",
      title: BYTEBRAWL_CONFIG.teamSizeText,
      value:
        "Compete in a pair of 2 developers, or register individually to compete solo or connect with a peer during orientation.",
      meta: "Max 2 members per team",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      label: "ELIGIBILITY",
      title: "MMMUT Students",
      value: BYTEBRAWL_CONFIG.eligibility,
      meta: "Valid Roll Number Required",
    },
    {
      icon: <CalendarDays className="w-5 h-5 text-white" />,
      label: "EVENT TIMELINE & VENUE",
      title: BYTEBRAWL_CONFIG.date,
      value: `Reporting & Session Time: ${BYTEBRAWL_CONFIG.time}. Location: ${BYTEBRAWL_CONFIG.venue}.`,
      meta: `Capacity: ${BYTEBRAWL_CONFIG.capacity} Teams`,
    },
  ];

  return (
    <section id="event-details" className="relative py-24 sm:py-32 bg-[#0c0c0c] text-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/[0.03] mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
              // 03 SPECIFICATIONS //
            </span>
          </div>

          <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
            Event Details &{" "}
            <span className="font-script lowercase font-normal text-4xl sm:text-6xl text-white/90">
              parameters
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 font-light max-w-xl">
            Everything you need to know about the format, eligibility, timeline, and venue logistics.
          </p>
        </div>

        {/* 4 Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailCards.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-white/10 bg-[#121212]/90 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    {item.label}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-sans font-bold text-xl uppercase tracking-wide text-white mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  {item.value}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-white/60">
                  {item.meta}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400/80">
                  VERIFIED SPEC
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

