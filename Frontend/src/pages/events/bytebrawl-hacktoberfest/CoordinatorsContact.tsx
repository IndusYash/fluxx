import React from "react";
import { Mail, Phone, MapPin, User, ShieldCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import { BYTEBRAWL_CONFIG } from "@/config/eventConfig";

export default function CoordinatorsContact() {
  return (
    <section id="coordinators-contact" className="relative py-20 sm:py-28 bg-[#0a0a0a] text-white">
      <Container>
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/[0.03] mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
              // 07 DIRECT REACH //
            </span>
          </div>

          <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight mb-3">
            Coordinators &{" "}
            <span className="font-script lowercase font-normal text-3xl sm:text-5xl text-white/90">
              support
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light max-w-xl">
            Need assistance regarding your registration, teams, or venue logistics? Connect with the FLUX event team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coordinators Cards */}
          {BYTEBRAWL_CONFIG.coordinators.map((coord, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-[#121212]/90 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-1">
                  {coord.role}
                </span>
                <h3 className="font-sans font-bold text-base text-white mb-4">
                  {coord.name}
                </h3>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{coord.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <a
                    href={`mailto:${coord.email}`}
                    className="hover:text-white transition-colors underline"
                  >
                    {coord.email}
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Department / Club Office Info */}
          <div className="p-6 rounded-xl border border-white/10 bg-[#121212]/90 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-1">
                ORGANIZING BODY
              </span>
              <h3 className="font-sans font-bold text-base text-white mb-2">
                FLUX Club
              </h3>
              <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                Department of Computer Science & Engineering, Madan Mohan Malaviya University of Technology, Gorakhpur.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 font-mono text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>MMMUT CSE Ecosystem</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

