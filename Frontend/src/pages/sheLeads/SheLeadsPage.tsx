import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Heart, CheckCircle2, AlertCircle, ArrowRight,
  User, Mail, Phone, Hash, BookOpen, Layers, ShieldCheck,
  Calendar, MapPin, Award, Terminal, Code2, Users, Rocket,
  Lightbulb, ChevronDown, Check, Download, Share2, Compass
} from 'lucide-react';
import bannerImg from '@/assets/images/she_leads_hero_banner.jpg';
import { submitSheLeadsRegistration, SheLeadsRegistrationResult, getLatestSheLeadsPass, clearLatestSheLeadsPass } from '@/lib/api/sheLeadsApi';
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
  { time: '10:00 AM', title: 'Inauguration & Welcome', desc: 'Opening address by FLUX faculty mentors and society coordinators.' },
  { time: '10:45 AM', title: 'Keynote: Women Shaping the Tech Horizon', desc: 'Inspiring keynote talk followed by interactive Q&A.' },
  { time: '12:00 PM', title: 'Hands-On Tech Masterclass', desc: 'Guided live coding and design sprint for all skill levels.' },
  { time: '02:00 PM', title: 'Panel: Breaking Glass Ceilings', desc: 'Candid conversation on campus placements, open source, and leadership.' },
  { time: '03:30 PM', title: 'Idea Pitch & Project Showcase', desc: 'Flash presentations and recognition of creative solutions.' },
  { time: '04:30 PM', title: 'Felicitation & Certificate Distribution', desc: 'Award ceremony and closing networking session.' },
];

const FAQS = [
  {
    q: 'Who is eligible to register for She Leads?',
    a: 'She Leads is exclusively open to all female students currently enrolled at MMMUT Gorakhpur across any academic branch and any year of study (B.Tech, MCA, M.Tech, etc.).',
  },
  {
    q: 'Is there any registration fee?',
    a: 'No! Registration and entry for She Leads are 100% free of cost, proudly organized by FLUX to foster gender diversity and women leadership in computing.',
  },
  {
    q: 'Do I need prior programming experience to participate?',
    a: 'Not at all! Whether you wrote your first line of code yesterday or have built full-scale applications, the workshops and sessions are designed to empower and inspire participants of all experience levels.',
  },
  {
    q: 'Will participants receive a certificate?',
    a: 'Yes, every registered attendee who participates in the summit will receive an official Certificate of Participation from FLUX, MMMUT.',
  },
  {
    q: 'What should I bring along on the day of the event?',
    a: 'Please carry your valid University Student ID Card. If you wish to follow along with the hands-on coding workshop, we encourage bringing your laptop.',
  },
];

export const SheLeadsPage: React.FC<SheLeadsPageProps> = () => {
  const formRef = useRef<HTMLDivElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [section, setSection] = useState('A');
  const [year, setYear] = useState('1st Year');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([DOMAIN_OPTIONS[0]]);
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [isFemaleConfirmed, setIsFemaleConfirmed] = useState(true);

  // Submission states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<SheLeadsRegistrationResult | null>(null);
  const [savedPass, setSavedPass] = useState<SheLeadsRegistrationResult | null>(null);

  // Active FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Keep saved pass in memory if user wishes to view it, but keep the registration form open by default
  useEffect(() => {
    const existingPass = getLatestSheLeadsPass();
    if (existingPass) {
      setSavedPass(existingPass);
    }
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleInterest = (domain: string) => {
    if (selectedInterests.includes(domain)) {
      setSelectedInterests(selectedInterests.filter((d) => d !== domain));
    } else {
      setSelectedInterests([...selectedInterests, domain]);
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!rollNo.trim()) {
      setErrorMessage('Please enter your university roll number.');
      return false;
    }
    if (!section.trim()) {
      setErrorMessage('Please enter your section.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!isFemaleConfirmed) {
      setErrorMessage('Registration is exclusively restricted to female candidates.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await submitSheLeadsRegistration({
        name: name.trim(),
        rollNo: rollNo.trim().toUpperCase(),
        branch,
        section: section.trim().toUpperCase(),
        year,
        email: email.trim().toLowerCase(),
        phone: phone.trim().replace(/[^0-9]/g, ''),
        gender: 'Female',
        interests: selectedInterests,
        experienceLevel,
        registrationSource: 'web-form',
      });

      setSuccessData(res);
      setSavedPass(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAnother = () => {
    clearLatestSheLeadsPass();
    setSavedPass(null);
    setSuccessData(null);
    setName('');
    setRollNo('');
    setSection('A');
    setEmail('');
    setPhone('');
    setErrorMessage('');
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
            <span className="tracking-wide">WOMEN IN TECH & LEADERSHIP SUMMIT • FLUX MMMUT</span>
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
            A dedicated summit by <span className="text-white font-semibold">FLUX</span> created to celebrate, mentor, and accelerate female tech innovators, programmers, designers, and future leaders at MMMUT Gorakhpur.
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
              <div className="text-sm sm:text-base font-bold text-white">Female Students Only</div>
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
              <div className="text-sm sm:text-base font-bold text-white">Full-Day Summit</div>
              <div className="text-[11px] text-gray-400">Date Announced Soon</div>
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
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-black font-semibold text-base shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-rose-200/40"
            >
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span>Register For She Leads</span>
              <ArrowRight className="w-5 h-5 text-rose-500" />
            </button>

            <a
              href="#pillars"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-200 hover:text-white font-medium text-base transition-all duration-300"
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
                <span>Exclusively for Female Engineers & Innovators</span>
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
              AGENDA PREVIEW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              A Day of Impact & Learning
            </h2>
          </div>

          <div className="space-y-4">
            {TIMELINE.map((slot, index) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-300 font-mono text-xs font-semibold tracking-wider whitespace-nowrap">
                    {slot.time}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{slot.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm font-light mt-0.5">{slot.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Registration Form Section ───────────────────────────── */}
        <section ref={formRef} id="register" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12 no-print">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/25 text-xs font-semibold mb-3">
              <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
              RESTRICTED ENTRY • FEMALE STUDENTS ONLY
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Claim Your Free Pass
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-md mx-auto font-light">
              Fill in your university credentials to confirm your registration for She Leads 2026.
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
                  <h3 className="text-3xl font-black text-white">You're Registered!</h3>
                  <p className="text-gray-300 text-sm mt-1 max-w-md mx-auto">
                    We look forward to seeing you at She Leads! Your registration pass has been generated.
                  </p>
                </div>

                {/* Official She Leads Printable Pass */}
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
                      date: 'To be announced',
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
                    Back to Form
                  </button>
                  <button
                    type="button"
                    onClick={handleRegisterAnother}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-black text-sm font-semibold transition-all border border-rose-200/40 cursor-pointer"
                  >
                    Register Another Participant
                  </button>
                </div>
              </div>
            ) : (
              /* ── Registration Form ── */
              <>
                {savedPass && (
                  <div className="mb-6 p-4 rounded-2xl bg-white/[0.04] border border-rose-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      <div className="text-xs sm:text-sm text-gray-300">
                        You have a previously generated pass for <span className="text-white font-semibold">{savedPass.data?.name}</span> ({savedPass.ticketNumber}).
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSuccessData(savedPass)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-semibold transition-all"
                      >
                        View Pass
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          clearLatestSheLeadsPass();
                          setSavedPass(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Banner */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Section 1: Personal Credentials */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-rose-400" />
                      <span>Personal & University Details</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Anushka Sharma"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Roll Number */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          University Roll Number <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Hash className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="e.g. 2024021045"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Section */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Section (Sec) <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Layers className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            placeholder="e.g. A, B, C, CSE-1"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Branch */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Branch <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <BookOpen className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#14141c] border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                          >
                            {BRANCHES.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Year */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Year of Study <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#14141c] border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                          >
                            {YEARS.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-rose-400" />
                      <span>Contact Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. yourname@mmmut.ac.in"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Mobile No */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Mobile Number <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="10-digit number"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Tech Interests & Experience Level */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-purple-400" />
                      <span>Areas of Interest & Experience (Optional)</span>
                    </h3>

                    <div className="mb-4">
                      <span className="text-xs text-gray-400 block mb-2">
                        Select domains you are curious about or currently learning:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {DOMAIN_OPTIONS.map((domain) => {
                          const isSelected = selectedInterests.includes(domain);
                          return (
                            <button
                              type="button"
                              key={domain}
                              onClick={() => toggleInterest(domain)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${isSelected
                                ? 'bg-rose-500/20 text-rose-200 border border-rose-400/40 shadow-sm'
                                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300'
                                }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                              <span>{domain}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Your Technical Comfort Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setExperienceLevel(lvl)}
                            className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${experienceLevel === lvl
                              ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
                              }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Strict Female Eligibility Declaration */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-rose-500/20">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFemaleConfirmed}
                        onChange={(e) => setIsFemaleConfirmed(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-rose-500 focus:ring-rose-400/20 border-white/20 bg-white/10 cursor-pointer"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-zinc-200 flex items-center gap-1.5 text-sm">
                          <ShieldCheck className="w-4 h-4 text-rose-400" />
                          Female Participant Eligibility Verification (Mandatory)
                        </span>
                        <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                          I hereby declare that I am a female student of MMMUT Gorakhpur. I acknowledge that She Leads is an affirmative initiative exclusively intended for women in STEM to promote female representation and leadership in computing.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !isFemaleConfirmed}
                      className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${loading || !isFemaleConfirmed
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5'
                        : 'bg-white hover:bg-zinc-100 text-black shadow-lg shadow-black/40 hover:scale-[1.01] border border-rose-200/40'
                        }`}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-rose-500" />
                          <span>Submit Registration & Get Pass</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-gray-500 mt-3">
                      By submitting, your details will be registered with the FLUX computing society event desk.
                    </p>
                  </div>
                </form>
              </>
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
