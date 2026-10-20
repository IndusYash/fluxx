import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Copy, ArrowLeft, ShieldCheck, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export interface ConfirmedRegistrationData {
  registrationId: string;
  type: "TEAM" | "INDIVIDUAL";
  teamName?: string | null;
  leaderEmail: string;
  participants: {
    fullName: string;
    role: string;
    collegeName?: string;
    address?: string;
    branch: string;
    year: string;
    rollNumber: string;
    email?: string;
    mobile?: string;
  }[];
}

interface ConfirmationPanelProps {
  data: ConfirmedRegistrationData;
}

export default function ConfirmationPanel({ data }: ConfirmationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Scroll the confirmation panel into view smoothly
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(data.registrationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl border border-white/15 bg-[#101010]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white"
    >
      {/* Top Banner Accent */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Registration Confirmed</span>
        </div>
        <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
          ByteBrawl x Hacktoberfest '26
        </span>
      </div>

      {/* Big Script Headline */}
      <div className="text-center mb-8">
        <h2 className="font-script text-6xl sm:text-8xl text-white font-normal leading-tight tracking-wide mb-2">
          You're in.
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-300 font-light max-w-lg mx-auto">
          Your spot for <strong className="text-white font-medium">ByteBrawl x Hacktoberfest</strong> has been locked into the system.
        </p>
      </div>

      {/* Registration ID Hero Card */}
      <div className="p-6 rounded-xl border border-white/15 bg-gradient-to-r from-neutral-900 to-black mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
            OFFICIAL REGISTRATION ID
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-wider selection:bg-white selection:text-black">
            {data.registrationId}
          </span>
        </div>

        <button
          onClick={handleCopyId}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex-shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-neutral-400" />
              <span>Copy ID</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Details */}
      <div className="border border-white/10 rounded-xl bg-black/40 p-6 mb-8 divide-y divide-white/5">
        <div className="pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
            Registration Format
          </span>
          <span className="font-mono text-xs font-semibold text-white">
            {data.type === "TEAM" ? "Team Registration (2 Members)" : "Individual Registration (1 Member)"}
          </span>
        </div>

        {data.teamName && (
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Team Name
            </span>
            <span className="font-sans text-sm font-bold text-white uppercase tracking-wide">
              {data.teamName}
            </span>
          </div>
        )}

        <div className="pt-4">
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-3">
            Registered Participants ({data.participants.length})
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.participants.map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-white/10 bg-[#141414] text-xs font-mono"
              >
                <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase mb-1">
                  <span>Participant 0{idx + 1}</span>
                  <span className="text-white/60">{p.role}</span>
                </div>
                <div className="font-sans font-bold text-sm text-white mb-0.5">
                  {p.fullName}
                </div>
                {p.collegeName && (
                  <div className="text-white/80 text-[11px] font-sans truncate mb-1">
                    {p.collegeName}
                  </div>
                )}
                <div className="text-neutral-400 space-y-0.5 text-[11px]">
                  <div>Roll / ID: <span className="text-white">{p.rollNumber}</span></div>
                  <div>Branch: <span className="text-neutral-200">{p.branch}</span> ({p.year})</div>
                  {p.address && <div className="truncate">Address: <span className="text-neutral-300">{p.address}</span></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Email Notice */}
      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center gap-3 mb-8">
        <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        <p className="font-sans text-xs text-neutral-300 leading-relaxed">
          A confirmation email has been dispatched to{" "}
          <strong className="text-white font-mono">{data.leaderEmail}</strong>
          {data.type === "TEAM" && data.participants.length > 1 ? " and your team member" : ""}. Please check your inbox (and spam/junk folder) and save your Registration ID for venue check-in on event day.
        </p>
      </div>

      {/* Action Button: Back to events */}
      <div className="flex items-center justify-center pt-4 border-t border-white/10">
        <button
          onClick={() => navigate("/events/bytebrawl-hacktoberfest")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 hover:border-white bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Event Details</span>
        </button>
      </div>
    </motion.div>
  );
}

