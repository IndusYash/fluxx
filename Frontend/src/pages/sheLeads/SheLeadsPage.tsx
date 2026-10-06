import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Heart, CheckCircle2, ArrowRight, Lock,
  Calendar, MapPin, Award, Code2, Users,
  Lightbulb, ChevronDown, Download, Linkedin, ExternalLink,
  Clock, Briefcase, GraduationCap
} from 'lucide-react';
import bannerImg from '@/assets/images/she_leads_hero_banner.jpg';
import speakerNityaAvatar from '@/assets/images/she_leads/avatar_nitya_anand.png';
import speakerIpshitaAvatar from '@/assets/images/she_leads/avatar_ipshita_gupta.png';
import speakerArpitaAvatar from '@/assets/images/she_leads/avatar_arpita_varshneya.png';
import speakerAnjaliAvatar from '@/assets/images/she_leads/avatar_anjali_sharma.png';

import { getLatestSheLeadsPass } from '@/lib/api/sheLeadsApi';
import type { SheLeadsRegistrationResult } from '@/lib/api/sheLeadsApi';
import SheLeadsPrintablePass, { printSheLeadsPass } from '@/components/sheLeads/SheLeadsPrintablePass';

interface SheLeadsPageProps {
  isMobile?: boolean;
}

interface SpeakerInfo {
  name: string;
  role: string;
  company: string;
  education: string;
  badge: string;
  badgeType: 'chief' | 'alumni' | 'speaker';
  date: string;
  time: string;
  mode: string;
  linkedin: string;
  avatar: string;
}

const SPEAKERS: SpeakerInfo[] = [
  {
    name: 'Nitya Anand',
    role: 'Strategy Consultant',
    company: 'Monitor Deloitte',
    education: "IIM Udaipur MBA '24 • MMMUT B.Tech '21",
    badge: 'Chief Speaker',
    badgeType: 'chief',
    date: '12th September, 2026',
    time: '02:00 PM Onwards',
    mode: 'Online',
    linkedin: 'https://www.linkedin.com/in/nitya-anand-3525211ba/',
    avatar: speakerNityaAvatar,
  },
  {
    name: 'Ipshita Gupta',
    role: 'Software Development Engineer (SDE 1)',
    company: 'Amazon',
    education: "MMMUT B.Tech '26",
    badge: 'Alumni Speaker',
    badgeType: 'alumni',
    date: '13th September, 2026',
    time: '02:00 PM Onwards',
    mode: 'Online',
    linkedin: 'https://www.linkedin.com/in/ipshita-gupta-873214253/',
    avatar: speakerIpshitaAvatar,
  },
  {
    name: 'Arpita Varshneya',
    role: 'Software Development Engineer (SDE 1)',
    company: 'Flipkart',
    education: "MMMUT B.Tech '24",
    badge: 'Alumni Speaker',
    badgeType: 'alumni',
    date: '13th September, 2026',
    time: '03:00 PM Onwards',
    mode: 'Online',
    linkedin: 'https://www.linkedin.com/in/arpitavarshney8/',
    avatar: speakerArpitaAvatar,
  },
  {
    name: 'Anjali Sharma',
    role: 'Software Development Engineer (SDE 1)',
    company: 'Microsoft',
    education: "MNNIT Allahabad B.Tech '26",
    badge: 'Speaker',
    badgeType: 'speaker',
    date: '4th October, 2026',
    time: '02:30 PM Onwards',
    mode: 'Online',
    linkedin: 'https://www.linkedin.com/in/anjali-sh/',
    avatar: speakerAnjaliAvatar,
  },
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
    slotBadge: 'SESSION 1',
    time: '02:00 PM',
    date: '12th September, 2026',
    speaker: 'Nitya Anand',
    company: 'Monitor Deloitte',
    title: 'Keynote & Strategic Career Navigation',
    desc: 'Navigating consulting, management paths, and leadership fundamentals from MMMUT to IIM Udaipur and Deloitte.',
  },
  {
    slotBadge: 'SESSION 2',
    time: '02:00 PM',
    date: '13th September, 2026',
    speaker: 'Ipshita Gupta',
    company: 'Amazon',
    title: 'Software Engineering at Amazon Scale',
    desc: 'Cracking tech interviews, system fundamentals, and mastering competitive programming for product powerhouses.',
  },
  {
    slotBadge: 'SESSION 3',
    time: '03:00 PM',
    date: '13th September, 2026',
    speaker: 'Arpita Varshneya',
    company: 'Flipkart',
    title: 'Building Scalable Systems at Flipkart',
    desc: 'High-volume distributed architecture, career transitions, and practical engineering skills for students.',
  },
  {
    slotBadge: 'SESSION 4',
    time: '02:30 PM',
    date: '4th October, 2026',
    speaker: 'Anjali Sharma',
    company: 'Microsoft',
    title: 'Engineering Excellence at Microsoft',
    desc: 'Cloud architectures, interview insights, and stepping boldly into top-tier tech roles.',
  },
];

const FAQS = [
  {
    q: 'What are the event timings and conducted sessions?',
    a: 'She Leads featured four high-impact sessions: Nitya Anand (Monitor Deloitte) on 12th Sept at 2:00 PM, Ipshita Gupta (Amazon) on 13th Sept at 2:00 PM, Arpita Varshneya (Flipkart) on 13th Sept at 3:00 PM, and Anjali Sharma (Microsoft) on 4th Oct at 2:30 PM.',
  },
  {
    q: 'Who is eligible to register for She Leads?',
    a: 'She Leads is open to all students currently enrolled at MMMUT Gorakhpur across any academic branch and any year of study (B.Tech, MCA, M.Tech, etc.).',
  },
  {
    q: 'Is there any registration fee?',
    a: 'No! Registration and entry for She Leads are 100% free of cost, proudly organized by FLUX to foster diversity and leadership in computing.',
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
            <span className="tracking-wide">WOMEN IN TECHNOLOGY & LEADERSHIP SUMMIT • FLUX MMMUT</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-white via-rose-100 to-gray-300 bg-clip-text text-transparent">
              She Leads
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
            A dedicated flagship initiative by <span className="text-white font-semibold">FLUX</span> created to celebrate, mentor, and accelerate tech innovators, programmers, designers, and future leaders at MMMUT Gorakhpur.
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
              <div className="text-sm sm:text-base font-bold text-white">Online Mode</div>
              <div className="text-[11px] text-gray-400">Live Virtual Interactive</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 text-pink-300 mb-1">
                <Calendar className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Conducted</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">4 Key Sessions</div>
              <div className="text-[11px] text-gray-400">12-13 Sept & 4 Oct</div>
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
            <a
              href="#speakers"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base shadow-xl shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-pink-200" />
              <span>Meet the Speakers</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-200 hover:text-white font-medium text-base transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-rose-400" />
              <span>Registration Status</span>
            </button>
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
              alt="She Leads Summit Visual"
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
                <span>Real Conversations | Bolder Paths</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Conducted Sessions & Distinguished Speakers Section ─── */}
        <section id="speakers" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto no-print">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-3"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              CONCLAVE GUEST SPEAKERS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black text-white"
            >
              Distinguished Speakers & Leaders
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Learn from inspiring industry leaders, alumni, and software engineers from top tech companies who conducted transformative sessions for She Leads.
            </motion.p>
            <div className="w-20 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 mx-auto mt-5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPEAKERS.map((speaker, idx) => {
              const isChief = speaker.badgeType === 'chief';
              return (
                <motion.div
                  key={speaker.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl border ${
                    isChief
                      ? 'bg-gradient-to-b from-[#18131e]/90 via-[#100d16]/95 to-[#0b090f]/95 border-rose-500/40 shadow-xl shadow-rose-950/30 ring-1 ring-rose-500/20'
                      : 'bg-gradient-to-b from-[#12121a]/90 via-[#0e0e15]/95 to-[#09090e]/95 border-white/10 hover:border-rose-400/30 shadow-xl shadow-black/60'
                  }`}
                >
                  {/* Top Badge & Company Pill */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isChief
                          ? 'bg-amber-500/15 text-amber-300 border-amber-400/30'
                          : 'bg-rose-500/15 text-rose-300 border-rose-400/30'
                      }`}
                    >
                      {speaker.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-300 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10">
                      <Briefcase className="w-3 h-3 text-rose-400" />
                      {speaker.company}
                    </span>
                  </div>

                  {/* Speaker Avatar & Image Container */}
                  <div className="relative mx-auto mb-5">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/15 group-hover:border-rose-400/50 transition-all duration-300 shadow-lg shadow-black/70 bg-gradient-to-tr from-rose-950/30 to-purple-950/30">
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{speaker.name}</h3>
                      <p className="text-xs sm:text-sm font-semibold text-rose-300 mt-1">{speaker.role}</p>
                      <p className="text-xs text-gray-300 font-medium">{speaker.company}</p>

                      <div className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-gray-400 font-light max-w-full">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                        <span className="truncate">{speaker.education}</span>
                      </div>
                    </div>

                    {/* Session Date & Time */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 text-left space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <span className="flex items-center gap-1.5 text-gray-400">
                          <Calendar className="w-3.5 h-3.5 text-rose-400" />
                          <span>{speaker.date}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-gray-400">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          <span>{speaker.time}</span>
                        </span>
                        <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          Conducted
                        </span>
                      </div>
                    </div>

                    {/* Action Link: LinkedIn */}
                    <div className="mt-5 pt-3 border-t border-white/10">
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2] text-[#70b5f9] hover:text-white border border-[#0A66C2]/35 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-black/40 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Linkedin className="w-4 h-4 fill-current flex-shrink-0" />
                        <span>Connect on LinkedIn</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Summit Pillars ───────────────────────────────────────── */}
        <section id="pillars" className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto no-print">
          <div className="text-center mb-16">
            <span className="text-rose-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
              WHAT TO EXPECT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              Four Pillars of She Leads
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
              SESSION TIMELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Conducted Summit Sessions
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-lg mx-auto font-light">
              Overview of speaker keynotes and workshops held as part of She Leads:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIMELINE.map((slotItem, index) => (
              <motion.div
                key={slotItem.slotBadge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-bold tracking-wider uppercase inline-block">
                        {slotItem.slotBadge}
                      </span>
                      <span className="text-xs text-rose-300/80 font-medium">{slotItem.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{slotItem.title}</h4>
                    <p className="text-rose-300 text-xs font-medium mt-0.5">
                      {slotItem.speaker} ({slotItem.company})
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm font-light mt-2">{slotItem.desc}</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-300 font-mono text-xs font-semibold tracking-wider whitespace-nowrap">
                    {slotItem.time}
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span>{slotItem.date}</span>
                  <span className="text-emerald-400 font-medium">Session Completed</span>
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
              Registrations for She Leads are now officially closed.
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
                    Here is your confirmed pass for She Leads.
                  </p>
                </div>

                {/* Official She Leads Printable Pass */}
                <div className="py-2 flex justify-center">
                  <SheLeadsPrintablePass
                    data={{
                      name: successData.data?.name || 'Participant',
                      rollNo: successData.data?.rollNo || '—',
                      section: successData.data?.section || '—',
                      branch: successData.data?.branch || '—',
                      year: successData.data?.year || '—',
                      ticketNumber: successData.ticketNumber || 'SHE-2026',
                      venue: 'Online',
                      date: '12 & 13 September / 4 October',
                      slot: 'Conducted Sessions',
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
                    We are no longer accepting new registrations for She Leads. Thank you to everyone who participated and registered!
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
                    href="#speakers"
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-all"
                  >
                    View Guest Speakers
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
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-rose-300' : ''
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
