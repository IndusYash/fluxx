import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, ShieldCheck, Calendar, Users, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import RegistrationForm from "./RegistrationForm";
import ConfirmationPanel, { type ConfirmedRegistrationData } from "./ConfirmationPanel";
import { BYTEBRAWL_CONFIG } from "@/config/eventConfig";

interface ByteBrawlRegisterPageProps {
  isMobile?: boolean;
}

export default function ByteBrawlRegisterPage({ isMobile: _isMobile }: ByteBrawlRegisterPageProps) {
  const [confirmedData, setConfirmedData] = useState<ConfirmedRegistrationData | null>(null);
  const [isOpen, setIsOpen] = useState(!BYTEBRAWL_CONFIG.isRegistrationClosed);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/events/bytebrawl-hacktoberfest/status")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data.open === "boolean") {
          setIsOpen(data.open);
        }
      })
      .catch((err) => {
        console.warn("Could not query server status; defaulting to local config:", err);
        const isClosedLocally = BYTEBRAWL_CONFIG.isRegistrationClosed || new Date() > new Date(BYTEBRAWL_CONFIG.registrationDeadline);
        setIsOpen(!isClosedLocally);

      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060606] text-white selection:bg-white selection:text-black overflow-x-clip pt-24 sm:pt-28 md:pt-32 pb-32 sm:pb-36">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] bg-cyan-500/[0.02] rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      </div>

      <Container className="relative z-10">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-8 sm:mb-12">
          <Link
            to="/events/bytebrawl-hacktoberfest"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border border-white/10 bg-[#111111]/80 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>← Back to Event Details</span>
          </Link>
        </div>

        {/* Page Header */}
        {!confirmedData && (
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md mb-4">
              <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
                // {isOpen ? "REGISTRATIONS OPEN" : "REGISTRATIONS CLOSED"} //
              </span>
              <span className="text-[10px] text-white/40 font-mono hidden sm:inline">
                | CSE DEPT MMMUT
              </span>
            </div>

            <h1 className="font-sans font-black text-3xl sm:text-5xl xl:text-6xl uppercase tracking-tight text-white leading-tight mb-4">
              ByteBrawl{" "}
              <span className="font-script lowercase font-normal text-3xl sm:text-5xl text-white/80 tracking-normal px-1">
                x
              </span>{" "}
              <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Hacktoberfest
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto mb-6">
              {isOpen
                ? "Complete your entry below. All details are securely validated and processed in a single transactional database commit."
                : "Registrations for ByteBrawl x Hacktoberfest are now officially closed. All confirmed entries remain secure."}
            </p>

            {/* Quick parameters badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] border border-white/10">
                <Users className="w-3.5 h-3.5 text-neutral-300" />
                <span>{BYTEBRAWL_CONFIG.teamSizeText}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                <span>{BYTEBRAWL_CONFIG.date}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-neutral-300" />
                <span>{BYTEBRAWL_CONFIG.venue}</span>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Registration Form or Confirmation Panel */}
        <div className="relative">
          {confirmedData ? (
            <ConfirmationPanel data={confirmedData} />
          ) : (
            <RegistrationForm
              isOpen={isOpen}
              onSuccess={(data) => {
                setConfirmedData(data);
              }}
            />
          )}
        </div>

        {/* Support Help Footer */}
        <div className="mt-16 text-center">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            Need help or facing issues? Contact the organizers at{" "}
            <a
              href={`mailto:${BYTEBRAWL_CONFIG.contactEmail}`}
              className="text-neutral-300 hover:text-white underline underline-offset-4"
            >
              {BYTEBRAWL_CONFIG.contactEmail}
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}

