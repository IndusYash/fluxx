import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  X, Sparkles, Heart, CheckCircle2, AlertCircle, ArrowRight,
  User, Mail, Phone, Hash, BookOpen, Layers, ShieldCheck,
  Calendar, MapPin, Award
} from 'lucide-react';
import bannerImg from '@/assets/images/she_leads_hero_banner.jpg';
import { submitSheLeadsRegistration, SheLeadsRegistrationResult } from '@/lib/api/sheLeadsApi';

interface SheLeadsPopupProps {
  forceOpen?: boolean;
  onClose?: () => void;
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

export const SheLeadsPopup: React.FC<SheLeadsPopupProps> = ({ forceOpen, onClose }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [section, setSection] = useState('A');
  const [year, setYear] = useState('1st Year');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [genderVerified, setGenderVerified] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successResult, setSuccessResult] = useState<SheLeadsRegistrationResult | null>(null);

  // Check dismissal in localStorage & trigger initial auto-open
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    const dismissedTimestamp = localStorage.getItem('flux_sheleads_dismissed_at');
    if (dismissedTimestamp) {
      const hoursSince = (Date.now() - parseInt(dismissedTimestamp, 10)) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        setHasDismissed(true);
        return;
      }
    }

    // Auto-open after a smooth 1.8s delay on home
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('flux_sheleads_dismissed_at', Date.now().toString());
    setHasDismissed(true);
    if (onClose) onClose();
  };

  const handleReopen = () => {
    setIsOpen(true);
    setSuccessResult(null);
    setErrorMessage('');
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
    if (!genderVerified) {
      setErrorMessage('She Leads registration is strictly reserved for female candidates.');
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
      const result = await submitSheLeadsRegistration({
        name: name.trim(),
        rollNo: rollNo.trim().toUpperCase(),
        branch,
        section: section.trim().toUpperCase(),
        year,
        email: email.trim().toLowerCase(),
        phone: phone.trim().replace(/[^0-9]/g, ''),
        gender: 'Female',
        registrationSource: 'home-popup',
      });

      setSuccessResult(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Non-sticky Subtle Trigger Button (Positioned in Hero) ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-24 right-4 sm:bottom-28 sm:right-8 md:bottom-32 md:right-10 z-30 select-none pointer-events-auto"
          >
            <button
              onClick={handleReopen}
              aria-label="Open She Leads – Tessy Thomas Registration"
              className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-[#0d0d12]/90 hover:bg-[#15131c] text-gray-200 hover:text-white text-xs sm:text-sm font-medium border border-white/20 hover:border-rose-400/40 shadow-xl shadow-black/50 hover:shadow-rose-950/30 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              {/* Subtle rose indicator dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
              </span>

              <span className="tracking-wide text-gray-100 font-semibold">She Leads – Tessy Thomas</span>

              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10 group-hover:bg-rose-500/20 group-hover:border-rose-500/30 group-hover:text-rose-200 transition-all">
                Register Here
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pop-up Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0b0b0f] border border-white/15 text-white shadow-2xl shadow-black/80 z-10 custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close Registration Modal"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-white/20 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Header */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={bannerImg}
                  alt="She Leads Summit"
                  className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/60 to-transparent" />

                {/* Floating Chips */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/70 border border-rose-500/30 text-rose-200 shadow-lg backdrop-blur-md">
                    <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                    Only for Female Students
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 border border-white/15 text-gray-200 backdrop-blur-md">
                    FLUX • MMMUT
                  </span>
                </div>

                {/* Title on Banner */}
                <div className="absolute bottom-3 left-5 right-5">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                    She Leads
                    <span className="text-xs px-2 py-0.5 rounded-md bg-rose-500/25 border border-rose-400/30 text-rose-200 uppercase font-bold tracking-wider">
                      2026
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-light line-clamp-1">
                    Empowering Women in Technology, Innovation & Leadership
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-5">
                {successResult ? (
                  /* ── Success Card ── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-rose-400" />
                    </div>

                    <div>
                      <h4 className="text-2xl font-bold text-white">Registration Confirmed!</h4>
                      <p className="text-gray-300 text-sm mt-1 max-w-sm mx-auto">
                        Welcome to She Leads! Your registration has been recorded successfully.
                      </p>
                    </div>

                    {/* Pass Badge */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-xs mx-auto text-left space-y-2">
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>PASS CODE</span>
                        <span className="font-mono text-rose-400 font-bold tracking-wider">
                          {successResult.ticketNumber}
                        </span>
                      </div>
                      <div className="font-semibold text-white text-base">
                        {successResult.data?.name || name}
                      </div>
                      <div className="text-xs text-gray-400">
                        Roll: <span className="text-gray-200">{successResult.data?.rollNo || rollNo}</span> •{' '}
                        Sec: <span className="text-gray-200">{successResult.data?.section || section}</span> •{' '}
                        Branch: <span className="text-gray-200">{successResult.data?.branch || branch}</span>
                      </div>
                      {successResult.isOfflineFallback && (
                        <div className="text-[11px] text-amber-400/90 pt-1">
                          * Saved offline; automatically syncs with FLUX portal.
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        onClick={handleClose}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => {
                          handleClose();
                          navigate('/she-leads');
                        }}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-black text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md border border-rose-200/40"
                      >
                        <span>View She Leads Page</span>
                        <ArrowRight className="w-4 h-4 text-rose-500" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Registration Form ── */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Error Banner */}
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Quick Info Bar */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>MMMUT Gorakhpur</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-purple-400" />
                        <span>Free Entry + Certificates</span>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                      />
                    </div>

                    {/* Roll No & Section */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5 text-gray-400" />
                          Roll Number <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={rollNo}
                          onChange={(e) => setRollNo(e.target.value)}
                          placeholder="e.g. 2024011001"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-gray-400" />
                          Section (Sec) <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={section}
                          onChange={(e) => setSection(e.target.value)}
                          placeholder="e.g. A, B, C"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Branch & Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                          Branch <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                        >
                          {BRANCHES.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          Year <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                        >
                          {YEARS.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@mmmut.ac.in"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          Mobile Number <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="10-digit number"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Female-Only Confirmation Enforcer */}
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-rose-500/20">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={genderVerified}
                          onChange={(e) => setGenderVerified(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded text-rose-500 focus:ring-rose-400/20 border-white/20 bg-white/10 cursor-pointer"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                            Female Participant Verification (Mandatory)
                          </span>
                          <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">
                            I confirm that I am a female student of MMMUT. She Leads is organized exclusively to uplift and empower women in technology and engineering.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="submit"
                        disabled={loading || !genderVerified}
                        className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${loading || !genderVerified
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                            : 'bg-white hover:bg-zinc-100 text-black shadow-lg shadow-black/40 hover:scale-[1.01] border border-rose-200/40'
                          }`}
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-rose-500" />
                            <span>Confirm Registration</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 px-1">
                        <Link
                          to="/she-leads"
                          onClick={handleClose}
                          className="text-rose-300 hover:text-rose-200 hover:underline flex items-center gap-1 transition-colors"
                        >
                          <span>Explore Full Event Details & Schedule</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="text-gray-400 hover:text-gray-200 transition-colors"
                        >
                          Maybe Later
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SheLeadsPopup;
