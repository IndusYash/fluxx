import React from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles, ExternalLink, Bot, CheckCircle2, PackageCheck } from "lucide-react";
import Container from "@/components/layout/Container";

export default function AboutHacktoberfest() {
  const themeTracks = [
    {
      title: "Open-Source Agents & Workflows",
      desc: "Architect autonomous agent swarms, tool-using bots, and structured workflows that run locally and transparently.",
    },
    {
      title: "Reusable Skills & Prompts",
      desc: "Engineer modular, versioned skill files, tool schemas, and repeatable cognitive procedures for community ecosystems.",
    },
    {
      title: "Open-Weight Models & Fine-Tuning",
      desc: "Experiment with state-of-the-art open weights, LoRA adapters, quantization, and privacy-preserving inference engines.",
    },
    {
      title: "Developer AI Tooling",
      desc: "Build CLIs, diagnostic extensions, testing harnesses, and developer experience utilities powered by open source.",
    },
  ];

  return (
    <section id="about-hacktoberfest" className="relative py-24 sm:py-32 bg-[#080808] text-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/[0.03] mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
              // 02 GLOBAL CELEBRATION //
            </span>
          </div>

          <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-6">
            Hacktoberfest 2026:{" "}
            <span className="font-script lowercase font-normal text-4xl sm:text-6xl text-cyan-300">
              AI belongs to everyone
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
            Hacktoberfest is a month-long worldwide celebration of open source every October, started by <strong className="text-white font-medium">DigitalOcean</strong> in 2014. In 2026, it is run by <strong className="text-white font-medium">Major League Hacking (MLH)</strong> and <strong className="text-white font-medium">DEV</strong> with DigitalOcean as presenting partner.
          </p>

          <p className="font-sans text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            The 2026 theme is <span className="text-white font-semibold">"AI belongs to everyone"</span> — learning and building with open-source AI and open-weight models. Hacktoberfest runs across 300+ one-day in-person Fests worldwide alongside an international online program of challenges, workshops, and livestreams.
          </p>
        </div>

        {/* 2026 Format & Reward Notice Callout */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/[0.15] backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex-shrink-0 mt-0.5">
                <PackageCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-wider font-bold text-white mb-1.5 flex items-center gap-2">
                  <span>Official 2026 Reward & Participation Format</span>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-mono">
                    NEW 2026 RULES
                  </span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Pull requests no longer count toward rewards this year. Instead, participants earn virtual stickers through hackathon tasks and community challenges that turn into a real sticker pack delivered straight to your mailbox.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Sign in on hacktoberfest.com
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Add mailing address to MyMLH account
                  </span>
                </div>
              </div>
            </div>

            <a
              href="https://hacktoberfest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 flex-shrink-0"
            >
              <span>Visit Hacktoberfest.com</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* 2026 AI Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themeTracks.map((track, i) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-white/10 bg-[#101010]/90 backdrop-blur-sm hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-cyan-400/80 tracking-widest uppercase mb-2 block">
                  // FOCUS 0{i + 1}
                </span>
                <h4 className="font-mono text-sm font-bold uppercase text-white mb-2 leading-snug">
                  {track.title}
                </h4>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                  {track.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

