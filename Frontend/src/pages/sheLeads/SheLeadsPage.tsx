import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Heart, CheckCircle2, ArrowRight, Lock,
  Calendar, MapPin, Award, Code2, Users,
  Lightbulb, ChevronDown, Download
} from 'lucide-react';
import bannerImg from '@/assets/images/she_leads_hero_banner.jpg';
import { getLatestSheLeadsPass } from '@/lib/api/sheLeadsApi';
import type { SheLeadsRegistrationResult } from '@/lib/api/sheLeadsApi';
import SheLeadsPrintablePass, { printSheLeadsPass } from '@/components/sheLeads/SheLeadsPrintablePass';

interface SheLeadsPageProps {
  isMobile?: boolean;
}

const BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Comm. Engg. (ECE)',
  'Electrical Engineering (EE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Chemical Engineering (CHE)',
  'Master of Computer Applications (MCA)',
  'Other',
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const DOMAIN_OPTIONS = [
  'Artificial Intelligence & ML',
  'Full Stack Web Development',
  'Mobile App Development',
  'UI / UX Design',
  'Cloud & DevOps',
  'Cyber Security',
  'Competitive Programming',
  'Open Source & Git',
];

const HIGHLIGHTS = [
  {
    icon: Lightbulb,
    title: 'Visionary Keynotes',
    desc: 'Engage with accomplished women tech leaders and alumni sharing inspiring journeys, industry lessons, and career strategies.',
    gradient: 'from-rose-500/10 to-transparent',
    border: 'border-rose-500/20',
  },
  {
    icon: Code2,
    title: 'Hands-on Workshops',
    desc: 'Step-by-step masterclasses spanning AI, modern web stacks, and design workflows tailored for practical implementation.',
    gradient: 'from-purple-500/10 to-transparent',
    border: 'border-purple-500/20',
  },
  {
    icon: Users,
    title: '1-on-1 Mentorship',
    desc: 'Direct interaction with experienced senior students and faculty mentors to guide your academic and technical growth.',
    gradient: 'from-purple-500/10 to-transparent',
    border: 'border-purple-500/20',
  },
  {
    icon: Award,
    title: 'Certificates & Perks',
    desc: 'Official FLUX certificates of participation, exclusive swag, networking sessions, and project spotlight opportunities.',
    gradient: 'from-amber-500/10 to-transparent',
    border: 'border-amber-500/20',
  },
];

const TIMELINE = [
  {
    slotBadge: 'SLOT 1',
    time: '02:00 PM',
    title: 'Slot 1 (2:00 PM)',
    desc: 'Available on both days: 12 & 13 September.',
  },
  {
    slotBadge: 'SLOT 2',
    time: '03:00 PM',
    title: 'Slot 2 (3:00 PM)',
    desc: 'Available on both days: 12 & 13 September.',
  },
];

const FAQS = [
  {
    q: 'What are the event timings and slots?',
    a: 'She Leads is conducted in 2 slots on both days (12 & 13 September): Slot 1 starting at 2:00 PM and Slot 2 starting at 3:00 PM.',
  },
  {
    q: 'Who is eligible to register for She Leads – Dr. Tessy Thomas Annual Conclave?',
    a: 'She Leads – Dr. Tessy Thomas Annual Conclave is open to all students currently enrolled at MMMUT Gorakhpur across any academic branch and any year of study (B.Tech, MCA, M.Tech, etc.).',
  },
  {
    q: 'Is there any registration fee?',
    a: 'No! Registration and entry for She Leads – Dr. Tessy Thomas Annual Conclave are 100% free of cost, proudly organized by FLUX to foster diversity and leadership in computing.',
  },
  {
    q: 'Do I need prior programming experience to participate?',
    a: 'Not at all! Whether you wrote your first line of code yesterday or have built full-scale applications, the workshops and sessions are designed to empower and inspire participants of all experience levels.',
  },
  {
    q: 'Will participants receive a certificate?',
    a: 'Yes, every registered attendee who participates in the summit will receive an official Certificate of Participation from FLUX, MMMUT.',
  },
];

export const SheLeadsPage: React.FC<SheLeadsPageProps> = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [successData, setSuccessData] = useState<SheLeadsRegistrationResult | null>(null);
  const [savedPass, setSavedPass] = useState<SheLeadsRegistrationResult | null>(null);

  // Active FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Load saved pass from localStorage if available
  useEffect(() => {
    const existingPass = getLatestSheLeadsPass();
    if (existingPass) {
      setSavedPass(existingPass);
    }
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#020202] text-white selection:bg-rose-500/20 selection:text-rose-200 overflow-x-hidden">
      {/* ── Background Glows & Ambience ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden no-print">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[550px] rounded-full bg-gradient-to-tr from-rose-600/10 via-purple-600/10 to-transparent blur-[160px]" />
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-pink-600/5 blur-[140px]" />
        <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ── Hero Section ────────────────────────────────────────── */}
        <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto text-center no-print">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-rose-500/25 text-rose-300 text-xs sm:text-sm font-medium backdrop-blur-md mb-8 shadow-lg shadow-black/40"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
            </span>
            <span className="tracking-wide">TECHNOLOGY & LEADERSHIP SUMMIT • FLUX MMMUT</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-white via-rose-100 to-gray-300 bg-clip-text text-transparent">
              She Leads – Dr. Tessy Thomas Annual Conclave
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-3 bg-gradient-to-r from-zinc-100 via-rose-200 to-zinc-400 bg-clip-text text-transparent">
              Innovate • Inspire • Empower
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-base sm:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10"
          >
            A dedicated summit by <span className="text-white font-semibold">FLUX</span> created to celebrate, mentor, and accelerate tech innovators, programmers, designers, and future leaders at MMMUT Gorakhpur.
          </motion.p>

          {/* Key Facts Pill Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10"
          >
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 text-rose-300 mb-1">
                <Heart className="w-4 h-4 fill-current text-rose-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Eligibility</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">All Students</div>
              <div className="text-[11px] text-gray-400">MMMUT (All Branches)</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 text-purple-300 mb-1">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Venue</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">Online</div>
              <div className="text-[11px] text-gray-400">MMMUT Gorakhpur</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 text-pink-300 mb-1">
                <Calendar className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Schedule</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">2:00 PM & 3:00 PM</div>
              <div className="text-[11px] text-gray-400">12 - 13 September (2 Slots)</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 text-amber-300 mb-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Perks</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">Free Participation</div>
              <div className="text-[11px] text-gray-400">Certificates & Mentorship</div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-rose-200 border border-rose-500/30 font-semibold text-base shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Lock className="w-5 h-5 text-rose-400" />
              <span>Registrations Closed</span>
              <ArrowRight className="w-5 h-5 text-rose-400" />
            </button>

            <a
              href="#pillars"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-200 hover:text-white font-medium text-base transition-all duration-300 flex items-center justify-center"
            >
              Explore Summit Pillars
            </a>
          </motion.div>
        </section>

        {/* ── Banner Artwork Showcase ─────────────────────────────── */}
        <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-20 sm:mb-28 no-print">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/70 group"
          >
            <img
              src={bannerImg}
              alt="She Leads – Dr. Tessy Thomas Annual Conclave Summit Visual"
              className="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-700"
            />
            <div className="absolute inset-x-0 bottom-0 pt-16 pb-6 px-6 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pointer-events-none">
              <div>
                <span className="text-xs uppercase tracking-widest text-rose-400 font-bold">
                  Flagship Women In Technology Initiative
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Bridging Gaps, Igniting Leadership
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs text-rose-300 font-medium pointer-events-auto">
                <Heart className="w-4 h-4 fill-current text-rose-400" />
                <span>Open To All Engineers & Innovators</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Summit Pillars ───────────────────────────────────────── */}
        <section id="pillars" className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto no-print">
          <div className="text-center mb-16">
            <span className="text-rose-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
              WHAT TO EXPECT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              Four Pillars of She Leads – Dr. Tessy Thomas Annual Conclave
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-rose-500 to-purple-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${item.gradient} border ${item.border} backdrop-blur-md shadow-xl flex flex-col justify-between`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-rose-300 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Summit Schedule ─────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto no-print">
          <div className="text-center mb-14">
            <span className="text-purple-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
              EVENT TIMINGS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Event Slots (12 & 13 September)
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-lg mx-auto font-light">
              The conclave is scheduled in 2 slots on both days (12 & 13 September):
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIMELINE.map((slotItem, index) => (
              <motion.div
                key={slotItem.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-bold tracking-wider uppercase inline-block mb-2">
                      {slotItem.slotBadge}
                    </span>
                    <h4 className="text-xl font-bold text-white">{slotItem.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm font-light mt-1">{slotItem.desc}</p>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-300 font-mono text-sm font-semibold tracking-wider whitespace-nowrap">
                    {slotItem.time}
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span>Both Days (12 & 13 Sept)</span>
                  <span className="text-rose-400 font-medium">Online Mode</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Registration Section (Closed) ───────────────────────────── */}
        <section ref={formRef} id="register" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12 no-print">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/25 text-xs font-semibold mb-3">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              REGISTRATIONS CLOSED
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Registrations Closed
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-md mx-auto font-light">
              Registrations for She Leads – Dr. Tessy Thomas Annual Conclave are now officially closed.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111118]/90 to-[#0c0c12]/95 border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/80"
          >
            {successData ? (
              /* ── Registration Confirmed Pass ── */
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 rounded-full bg-rose-500/15 border-2 border-rose-500/30 text-rose-300 mx-auto flex items-center justify-center no-print">
                  <CheckCircle2 className="w-12 h-12 text-rose-400" />
                </div>

                <div className="no-print">
                  <h3 className="text-3xl font-black text-white">Registration Pass</h3>
                  <p className="text-gray-300 text-sm mt-1 max-w-md mx-auto">
                    Here is your confirmed pass for She Leads – Dr. Tessy Thomas Annual Conclave.
                  </p>
                </div>

                {/* Official She Leads – Dr. Tessy Thomas Annual Conclave Printable Pass */}
                <div className="py-2 flex justify-center">
                  <SheLeadsPrintablePass
                    data={{
                      name: successData.data?.name || name || 'Participant',
                      rollNo: successData.data?.rollNo || rollNo || '—',
                      section: successData.data?.section || section || '—',
                      branch: successData.data?.branch || branch || '—',
                      year: successData.data?.year || year || '—',
                      ticketNumber: successData.ticketNumber || 'SHE-2026',
                      venue: 'Online',
                      date: '12 & 13 September',
                      slot: '2:00 PM & 3:00 PM (Both Days)',
                    }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 no-print">
                  <button
                    type="button"
                    onClick={printSheLeadsPass}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-rose-950/50 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Print / Save Pass (PDF)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSuccessData(null)}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 text-sm font-medium transition-all cursor-pointer"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : (
              /* ── Registrations Closed Card ── */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 mx-auto flex items-center justify-center">
                  <Lock className="w-8 h-8 text-rose-400" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Registrations Are Closed
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                    We are no longer accepting new registrations for the She Leads – Dr. Tessy Thomas Annual Conclave. Thank you to everyone who registered!
                  </p>
                </div>

                {savedPass && (
                  <div className="mt-6 p-4 rounded-2xl bg-white/[0.04] border border-rose-500/25 max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md">
                    <div className="flex items-center gap-3 text-left">
                      <CheckCircle2 className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      <div className="text-xs sm:text-sm text-gray-300">
                        You have a previously generated pass for <span className="text-white font-semibold">{savedPass.data?.name}</span> ({savedPass.ticketNumber}).
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSuccessData(savedPass)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer"
                    >
                      View Pass
                    </button>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#pillars"
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-all"
                  >
                    Explore Summit Highlights
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* ── FAQ Section ─────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto no-print">
          <div className="text-center mb-12">
            <span className="text-rose-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-rose-200 font-semibold text-sm sm:text-base transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-rose-300' : ''
                        }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SheLeadsPage;
