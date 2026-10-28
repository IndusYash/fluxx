import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  Search,
  Users,
  CheckCircle2,
  FileText,
  Building2,
  ChevronRight,
  Star,
  Scale,
  HeartHandshake,
  Sprout,
  Sun,
  Languages,
  ArrowRight,
  Eye,
  X,
  Copy,
  Check,
  AlertCircle,
  Cpu,
  Lightbulb,
  Quote,
} from "lucide-react";
import Container from "@/components/layout/Container";
import {
  ROUND1_LEADERBOARD,
  SPECIAL_APPRECIATION_TEAMS,
  ROUND2_ALLOTMENTS,
  PROBLEM_STATEMENTS,
  PROBLEM_STATEMENTS_DETAILS,
  TRACKS_METADATA,
} from "@/data/bytebrawlResultsData";
import type {
  LeaderboardTeam,
  Round2Allotment,
  ProblemStatementItem,
  ProblemStatementDetail,
} from "@/data/bytebrawlResultsData";

// Icon mapping for the 5 Bharat tracks
const TRACK_ICONS: Record<string, React.ReactNode> = {
  "Satya & Pramaan Bharat": <Scale className="w-4 h-4" />,
  "Sahayak & Samman Bharat": <HeartHandshake className="w-4 h-4" />,
  "Bhoomi & Bharosa Bharat": <Sprout className="w-4 h-4" />,
  "Shital & Sajag Bharat": <Sun className="w-4 h-4" />,
  "Bhasha & Bol Bharat": <Languages className="w-4 h-4" />,
};

type ActiveTab = "allotments" | "leaderboard" | "problemStatements";

export default function ByteBrawlWinnersLeaderboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("allotments");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>("ALL");
  const [selectedCollege, setSelectedCollege] = useState<string>("ALL");

  // State for problem statement detail modal
  const [selectedModalPS, setSelectedModalPS] = useState<{
    psNo: string;
    team?: Round2Allotment | null;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const openModal = (psNo: string, team?: Round2Allotment | null) => {
    const matchedTeam = team || ROUND2_ALLOTMENTS.find((a) => a.psNo === psNo) || null;
    setSelectedModalPS({ psNo, team: matchedTeam });
  };

  const closeModal = () => setSelectedModalPS(null);

  // Keyboard navigation, Lenis scroll pause & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    const lenis = typeof window !== "undefined" ? (window as any).__lenis : null;

    if (selectedModalPS) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      if (lenis && typeof lenis.stop === "function") {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = "unset";
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, [selectedModalPS]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activePSDetail: ProblemStatementDetail | undefined = selectedModalPS
    ? PROBLEM_STATEMENTS_DETAILS[selectedModalPS.psNo]
    : undefined;

  // Unique Colleges
  const colleges = useMemo(() => {
    const list = Array.from(new Set(ROUND1_LEADERBOARD.map((t) => t.college)));
    return ["ALL", ...list];
  }, []);

  // Filtered Allotments
  const filteredAllotments = useMemo(() => {
    return ROUND2_ALLOTMENTS
      .filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          item.teamName.toLowerCase().includes(q) ||
          item.teamId.toLowerCase().includes(q) ||
          item.leader.toLowerCase().includes(q) ||
          (item.member && item.member.toLowerCase().includes(q)) ||
          item.psNo.toLowerCase().includes(q) ||
          item.problemStatement.toLowerCase().includes(q) ||
          item.track.toLowerCase().includes(q) ||
          item.college.toLowerCase().includes(q);

        const matchesTrack = selectedTrack === "ALL" || item.track === selectedTrack;
        const matchesCollege = selectedCollege === "ALL" || item.college === selectedCollege;

        return matchesSearch && matchesTrack && matchesCollege;
      })
      .sort((a, b) => a.teamName.localeCompare(b.teamName, undefined, { numeric: true, sensitivity: "base" }));
  }, [searchQuery, selectedTrack, selectedCollege]);

  // Filtered Round 1 Teams (Alphabetical Order)
  const filteredLeaderboard = useMemo(() => {
    return ROUND1_LEADERBOARD
      .filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          item.teamName.toLowerCase().includes(q) ||
          item.teamId.toLowerCase().includes(q) ||
          item.leader.toLowerCase().includes(q) ||
          (item.member && item.member.toLowerCase().includes(q)) ||
          item.college.toLowerCase().includes(q);

        const matchesCollege = selectedCollege === "ALL" || item.college === selectedCollege;

        return matchesSearch && matchesCollege;
      })
      .sort((a, b) => a.teamName.localeCompare(b.teamName, undefined, { numeric: true, sensitivity: "base" }));
  }, [searchQuery, selectedCollege]);

  // Filtered Problem Statements
  const filteredProblemStatements = useMemo(() => {
    return PROBLEM_STATEMENTS.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.psNo.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.track.toLowerCase().includes(q) ||
        item.allottedTo.toLowerCase().includes(q);

      const matchesTrack = selectedTrack === "ALL" || item.track === selectedTrack;

      return matchesSearch && matchesTrack;
    });
  }, [searchQuery, selectedTrack]);

  return (
    <section
      id="results-and-allotments"
      className="relative py-24 sm:py-32 bg-[#080808] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-amber-500/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-cyan-500/[0.03] rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      </div>

      <Container className="relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-4"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
              // QUALIFIED TEAMS & ROUND 2 ALLOTMENTS //
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.08] mb-5"
          >
            Qualified Teams of the{" "}
            <span className="font-script lowercase font-normal text-4xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
              arena
            </span>{" "}
            & Problem Allotments
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Congratulations to all qualifying teams advancing to Round 2! Teams are listed alphabetically below without scores or ranks. Inspect the qualified teams, problem allotments, and explore assigned challenges across all 5 national <strong className="text-white font-medium">Bharat Innovation Tracks</strong>.
          </motion.p>
        </div>

        {/* ── METRICS STRIP ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto mb-16">
          <div className="p-4 rounded-xl border border-white/10 bg-[#121212]/80 backdrop-blur-sm text-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-amber-400 block">
              26
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Qualified Teams
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-[#121212]/80 backdrop-blur-sm text-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 block">
              25
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              R2 Finalist Teams
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-[#121212]/80 backdrop-blur-sm text-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-cyan-400 block">
              25
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Allotted Problem Statements
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-[#121212]/80 backdrop-blur-sm text-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-purple-400 block">
              5
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Bharat Tracks
            </span>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 p-4 rounded-xl border border-white/10 bg-[#121212]/80 backdrop-blur-sm text-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-white block">
              4
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Colleges (MMMUT/MPIT/ITM/DDU)
            </span>
          </div>
        </div>

        {/* ── TAB SELECTOR & COMMAND BAR ───────────────────────────── */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl border border-white/10 bg-[#101014]/90 backdrop-blur-md">
            {/* Tab Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab("allotments")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 ${activeTab === "allotments"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Round 2 PS Allotments</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-800 text-neutral-200">
                  {ROUND2_ALLOTMENTS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 ${activeTab === "leaderboard"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Qualified Teams</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-800 text-neutral-200">
                  {ROUND1_LEADERBOARD.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("problemStatements")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 ${activeTab === "problemStatements"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>25 Problem Statements</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-800 text-neutral-200">
                  5 Tracks
                </span>
              </button>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search team, PS, person..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sub-Filters: Track & College (rendered when appropriate) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-2">
            {activeTab !== "leaderboard" && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mr-1">
                  Track:
                </span>
                <button
                  onClick={() => setSelectedTrack("ALL")}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] uppercase tracking-wider border transition-colors ${selectedTrack === "ALL"
                    ? "bg-white text-black font-bold border-white"
                    : "border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                >
                  All (25)
                </button>
                {Object.keys(TRACKS_METADATA).map((trackName) => {
                  const meta = TRACKS_METADATA[trackName];
                  const isActive = selectedTrack === trackName;
                  return (
                    <button
                      key={meta.id}
                      onClick={() => setSelectedTrack(trackName)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-[11px] uppercase tracking-wider border transition-all ${isActive
                        ? `${meta.badgeColor} font-bold shadow-sm`
                        : "border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                    >
                      {TRACK_ICONS[trackName]}
                      <span>{meta.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* College filter */}
            {activeTab !== "problemStatements" && (
              <div className="flex flex-wrap items-center gap-1.5 ml-auto">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mr-1">
                  College:
                </span>
                {colleges.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedCollege(col)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider border transition-colors ${selectedCollege === col
                      ? "bg-white text-black font-bold border-white"
                      : "border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── TAB CONTENT ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {/* TAB 1: ROUND 2 PS ALLOTMENTS */}
          {activeTab === "allotments" && (
            <motion.div
              key="allotments"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              {filteredAllotments.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border border-white/10 bg-[#121212]/50">
                  <p className="font-mono text-sm text-neutral-400">
                    No allotments found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {filteredAllotments.map((allot) => {
                    const trackMeta = TRACKS_METADATA[allot.track];
                    const isMerged = allot.teamType.includes("INDIVIDUAL");

                    return (
                      <div
                        key={allot.sno + allot.teamName}
                        className={`relative rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between ${isMerged
                          ? "border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-[#151310] to-[#0d0d0f]"
                          : "border-white/10 bg-[#121215]/90 hover:border-white/20"
                          }`}
                      >
                        <div>
                          {/* Top Bar: S.No, Team ID & College */}
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-white/10 text-white font-bold">
                                #{allot.sno}
                              </span>
                              <span className="font-mono text-xs text-neutral-400">
                                {allot.teamId}
                              </span>
                              {isMerged && (
                                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-amber-400 text-black font-bold">
                                  MERGED PAIR
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-neutral-300">
                                {allot.college}
                              </span>
                            </div>
                          </div>

                          {/* Team Name */}
                          <h4 className="font-sans font-bold text-lg sm:text-xl text-white mb-2 tracking-tight">
                            {allot.teamName}
                          </h4>

                          {/* Members */}
                          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-300 mb-4 pb-4 border-b border-white/10">
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-neutral-400" />
                              <strong>{allot.leader}</strong>
                              <span className="text-[10px] text-neutral-400 font-mono">
                                ({isMerged ? "Ayush" : "Leader"})
                              </span>
                            </span>
                            {allot.member && (
                              <span className="flex items-center gap-1.5">
                                <span className="text-neutral-500">•</span>
                                <span>{allot.member}</span>
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  ({isMerged ? "Chetna" : "Member"})
                                </span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Allotted Problem Statement Card */}
                        <div
                          className={`p-3.5 sm:p-4 rounded-xl border ${trackMeta ? trackMeta.borderColor : "border-white/10"
                            } bg-black/40 mt-auto`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-mono text-xs font-black text-amber-400 tracking-wider">
                              {allot.psNo}
                            </span>
                            <span
                              className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${trackMeta ? trackMeta.badgeColor : "text-white"
                                }`}
                            >
                              {TRACK_ICONS[allot.track]}
                              <span>{allot.track}</span>
                            </span>
                          </div>

                          <p className="font-sans text-sm text-neutral-100 font-medium leading-relaxed mb-3">
                            {allot.problemStatement}
                          </p>

                          {/* Action Button: View Description */}
                          <button
                            onClick={() => openModal(allot.psNo, allot)}
                            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/40 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 group/btn"
                          >
                            <span className="flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5 text-amber-400 group-hover/btn:scale-110 transition-transform" />
                              <span>View Problem Description</span>
                            </span>
                            <ChevronRight className="w-4 h-4 text-neutral-500 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: QUALIFIED TEAMS */}
          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto space-y-12"
            >
              {/* Teams Table / Grid */}
              <div className="rounded-2xl border border-white/10 bg-[#121215]/90 backdrop-blur-md overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      Round 1 Qualified Teams (Alphabetical Order)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">
                    Showing {filteredLeaderboard.length} of {ROUND1_LEADERBOARD.length} teams · Arranged Alphabetically (No Ranks Assigned)
                  </span>
                </div>

                <div className="divide-y divide-white/5">
                  {filteredLeaderboard.map((team) => {
                    return (
                      <div
                        key={team.teamId + team.teamName}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-white/[0.03]"
                      >
                        {/* Left: Team Initial & Info */}
                        <div className="flex items-start sm:items-center gap-4">
                          {/* Team Initial Avatar */}
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm flex-shrink-0 bg-neutral-800 text-amber-300 border border-white/10 shadow-sm">
                            {team.teamName.charAt(0).toUpperCase()}
                          </div>

                          {/* Names & College */}
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="font-sans font-bold text-base sm:text-lg text-white">
                                {team.teamName}
                              </h4>
                              <span className="font-mono text-[10px] text-neutral-400">
                                ({team.teamId})
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-300">
                              <span>
                                Leader: <strong>{team.leader}</strong>
                              </span>
                              {team.member && (
                                <span>
                                  • Member: <strong>{team.member}</strong>
                                </span>
                              )}
                              <span className="px-1.5 py-0.2 rounded bg-white/5 font-mono text-[10px] text-neutral-400">
                                {team.college}
                              </span>
                            </div>

                            {(() => {
                              const allotment = ROUND2_ALLOTMENTS.find(
                                (a) =>
                                  a.teamId.includes(team.teamId) ||
                                  a.teamName.toLowerCase().includes(team.teamName.toLowerCase())
                              );
                              if (!allotment) return null;
                              return (
                                <div className="mt-2">
                                  <button
                                    onClick={() => openModal(allotment.psNo, allotment)}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono text-[11px] transition-all duration-150 group/ps cursor-pointer"
                                  >
                                    <FileText className="w-3 h-3 text-amber-400 group-hover/ps:scale-110 transition-transform" />
                                    <span>
                                      Round 2: <strong className="text-white">{allotment.psNo}</strong> · View Description
                                    </span>
                                    <ChevronRight className="w-3 h-3 text-neutral-400 group-hover/ps:translate-x-0.5 transition-transform" />
                                  </button>
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Right: Round 2 Qualification Status */}
                        <div className="sm:text-right flex items-center sm:justify-end">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Round 2 Qualifier</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Appreciation Section */}
              <div className="p-6 sm:p-8 rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 via-[#121019] to-[#0c0a12] backdrop-blur-md">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-purple-400 fill-purple-400" />
                  <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                    Special Appreciation Honors
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-neutral-300 mb-6 max-w-2xl leading-relaxed">
                  Special commendation awarded by the jury and evaluation panel for exemplary technical execution, innovative domain thinking, and algorithmic perseverance during Round 1.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {SPECIAL_APPRECIATION_TEAMS.map((item) => (
                    <div
                      key={item.teamId}
                      className="p-4 rounded-xl border border-purple-400/20 bg-black/40 hover:border-purple-400/40 transition-colors"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block mb-1">
                        {item.teamId}
                      </span>
                      <h4 className="font-sans font-bold text-base text-white mb-2">
                        {item.teamName}
                      </h4>
                      <div className="text-xs text-neutral-300 space-y-0.5">
                        <p className="truncate">
                          <span className="text-neutral-500">1:</span> {item.leader}
                        </p>
                        {item.member && (
                          <p className="truncate">
                            <span className="text-neutral-500">2:</span> {item.member}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ALL 25 PROBLEM STATEMENTS */}
          {activeTab === "problemStatements" && (
            <motion.div
              key="problemStatements"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto space-y-8"
            >
              {Object.keys(TRACKS_METADATA).map((trackName) => {
                const meta = TRACKS_METADATA[trackName];
                const trackPS = filteredProblemStatements.filter((p) => p.track === trackName);

                if (trackPS.length === 0) return null;

                return (
                  <div
                    key={meta.id}
                    className={`rounded-2xl border ${meta.borderColor} bg-gradient-to-b ${meta.gradient} p-6 sm:p-8 backdrop-blur-md`}
                  >
                    {/* Track Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`p-1.5 rounded-lg ${meta.badgeColor}`}>
                            {TRACK_ICONS[trackName]}
                          </span>
                          <h3 className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight">
                            {meta.name}
                          </h3>
                          <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
                            · {meta.englishTheme}
                          </span>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
                          {meta.description}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 text-white font-bold">
                          {trackPS.length} Problem Statements
                        </span>
                      </div>
                    </div>

                    {/* Problem Statements Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {trackPS.map((ps) => (
                        <div
                          key={ps.psNo}
                          className="p-4 rounded-xl border border-white/10 bg-[#0e0e12]/90 hover:border-white/20 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono text-xs font-black text-amber-400">
                                {ps.psNo}
                              </span>
                              <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                                Hacktoberfest '26
                              </span>
                            </div>

                            <h4 className="font-sans font-bold text-sm sm:text-base text-white leading-snug mb-3">
                              {ps.title}
                            </h4>
                          </div>

                          <div className="pt-3 border-t border-white/10 mt-2">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                              ALLOTTED TO TEAM:
                            </span>
                            <span className="font-sans text-xs font-semibold text-emerald-300 block truncate mb-2">
                              {ps.allottedTo || "Pending allotment"}
                            </span>

                            <button
                              onClick={() => openModal(ps.psNo)}
                              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-colors"
                            >
                              <Eye className="w-3 h-3 text-amber-400" />
                              <span>View Full Description</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PROBLEM STATEMENT DETAILS MODAL DIALOG ───────────────── */}
        <AnimatePresence>
          {selectedModalPS && activePSDetail && (
            <div
              data-lenis-prevent
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
              />

              {/* Modal Card */}
              <motion.div
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl my-auto rounded-3xl border border-white/20 bg-[#0e0e13]/98 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.15)] overflow-hidden z-10 flex flex-col max-h-[88vh] sm:max-h-[85vh]"
              >
                {/* Modal Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-purple-500 z-20 flex-shrink-0" />

                {/* Modal Header */}
                <div className="p-5 sm:p-7 border-b border-white/10 bg-white/[0.02] flex-shrink-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-amber-400 text-black font-black tracking-wider">
                        {activePSDetail.psNo}
                      </span>
                      <span className="font-mono text-xs px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 flex items-center gap-1.5">
                        {TRACK_ICONS[activePSDetail.track]}
                        <span>{activePSDetail.track}</span>
                      </span>
                      <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
                        · {activePSDetail.theme}
                      </span>
                    </div>

                    <button
                      onClick={closeModal}
                      className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                      aria-label="Close dialog"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="font-sans font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-snug">
                    {activePSDetail.title}
                  </h3>

                  {/* Team Allotment Spotlight (if team assigned) */}
                  {selectedModalPS.team && (
                    <div className="mt-3.5 p-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-amber-300/80 font-bold uppercase">
                              ALLOTTED TO TEAM:
                            </span>
                            <span className="font-mono text-xs font-bold text-white">
                              {selectedModalPS.team.teamName}
                            </span>
                            <span className="font-mono text-[10px] text-neutral-400">
                              ({selectedModalPS.team.teamId})
                            </span>
                          </div>
                          <div className="text-xs text-neutral-300 mt-0.5">
                            <span>{selectedModalPS.team.leader}</span>
                            {selectedModalPS.team.member && (
                              <span> & {selectedModalPS.team.member}</span>
                            )}
                            <span className="text-neutral-500 ml-2">
                              • {selectedModalPS.team.college}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:self-center">
                        <span className="font-mono text-xs font-semibold text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Round 2 Allotted</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Body - Scrollable Content */}
                <div
                  data-lenis-prevent
                  tabIndex={0}
                  onWheel={(e) => e.stopPropagation()}
                  style={{ overscrollBehavior: "contain", scrollBehavior: "smooth" }}
                  className="p-5 sm:p-7 overflow-y-auto space-y-5 flex-1 min-h-0 overscroll-contain focus:outline-none [scrollbar-width:thin] [scrollbar-color:#f59e0b_rgba(255,255,255,0.08)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-500/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-400"
                >
                  {/* 1. Problem / Issue */}
                  <div className="p-5 rounded-2xl border border-rose-500/25 bg-rose-500/[0.03]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-300">
                        Problem // What is the issue?
                      </span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
                      {activePSDetail.problem}
                    </p>
                  </div>

                  {/* 2. Build / What to make */}
                  <div className="p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.03]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                        Build // What to make (MVP & Architecture)
                      </span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
                      {activePSDetail.build}
                    </p>
                  </div>

                  {/* 3. Key Point / Constraints */}
                  <div className="p-5 rounded-2xl border border-amber-500/25 bg-amber-500/[0.03]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                        Key Point // What to keep in mind & safeguard
                      </span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
                      {activePSDetail.keyPoint}
                    </p>
                  </div>

                  {/* 4. Guiding Building Principle */}
                  {activePSDetail.principle && (
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40 flex items-start gap-3">
                      <Quote className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                          Guiding Track Principle
                        </span>
                        <p className="font-sans text-sm text-amber-200 font-medium italic">
                          "{activePSDetail.principle}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0a0a0d] flex items-center justify-between gap-4 flex-shrink-0">
                  <button
                    onClick={() =>
                      handleCopy(
                        `${activePSDetail.psNo}: ${activePSDetail.title}\n\nTrack: ${activePSDetail.track}\nTheme: ${activePSDetail.theme}\n\nPROBLEM:\n${activePSDetail.problem}\n\nBUILD:\n${activePSDetail.build}\n\nKEY POINT:\n${activePSDetail.keyPoint}\n\nPRINCIPLE:\n${activePSDetail.principle}`
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy Brief</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={closeModal}
                    className="px-6 py-2 rounded-xl bg-white text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-neutral-200 transition-colors shadow-md cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
