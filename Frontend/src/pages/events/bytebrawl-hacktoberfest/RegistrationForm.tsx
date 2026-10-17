import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  Users,
  User,
  Mail,
  Phone,
  Hash,
  GraduationCap,
  GitBranch,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  Edit2,
  KeyRound,
  RefreshCw,
  Lock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BYTEBRAWL_CONFIG } from "@/config/eventConfig";
import type { ConfirmedRegistrationData } from "./ConfirmationPanel";

interface RegistrationFormProps {
  isOpen: boolean;
  onSuccess: (data: ConfirmedRegistrationData) => void;
}

const BRANCH_OPTIONS = [
  "CSE",
  "IT",
  "ECE",
  "EE",
  "ME",
  "CE",
  "Chemical",
  "Biotech",
  "Other",
];

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

// Client-side phone validator
function checkClientPhone(phone: string) {
  if (!phone) return { valid: false, error: "Mobile number is required" };
  let clean = phone.trim().replace(/[\s\-().]/g, "");
  if (clean.startsWith("+91")) clean = clean.slice(3);
  else if (clean.startsWith("91") && clean.length === 12) clean = clean.slice(2);
  else if (clean.startsWith("0") && clean.length === 11) clean = clean.slice(1);

  if (!/^\d{10}$/.test(clean)) {
    return { valid: false, error: "Mobile number must be a 10-digit Indian number" };
  }
  if (!/^[6-9]/.test(clean)) {
    return { valid: false, error: "Indian mobile numbers must start with 6, 7, 8, or 9" };
  }

  const parsed = parsePhoneNumberFromString(clean, "IN");
  if (!parsed || !parsed.isValid()) {
    return { valid: false, error: "Please enter a valid Indian mobile number" };
  }

  // Fake patterns
  if (/^(\d)\1{9}$/.test(clean)) {
    return { valid: false, error: "Fake or test phone number detected (all same digits)" };
  }
  const sequential = ["1234567890", "0123456789", "9876543210", "8765432109"];
  if (sequential.includes(clean)) {
    return { valid: false, error: "Fake or test phone number detected (sequential digits)" };
  }
  const pair = clean.slice(0, 2);
  if (clean === pair.repeat(5)) {
    return { valid: false, error: "Fake phone number detected (repeated pattern)" };
  }

  return { valid: true, clean };
}

// Client-side email typo checker
const COMMON_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmai.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "mmut.ac.in": "mmmut.ac.in",
};

export default function RegistrationForm({ isOpen, onSuccess }: RegistrationFormProps) {
  // Step State
  const [currentStep, setCurrentStep] = useState(1);
  const [regType, setRegType] = useState<"TEAM" | "INDIVIDUAL">("TEAM");

  // Step 2 (Team): Team Details
  const [teamName, setTeamName] = useState("");
  const [teamNameStatus, setTeamNameStatus] = useState<"idle" | "checking" | "available" | "taken" | "error">("idle");
  const [teamNameMsg, setTeamNameMsg] = useState("");

  // Step 3 (or 2 for Individual): Participant 1 (Leader)
  const [p1, setP1] = useState({
    fullName: "",
    rollNumber: "",
    branch: "",
    year: "",
    mobile: "",
    email: "",
    verificationToken: "",
  });
  const [p1Verified, setP1Verified] = useState(false);
  const [p1OtpState, setP1OtpState] = useState({
    active: false,
    code: "",
    sending: false,
    verifying: false,
    error: "",
    timer: 0,
    devOtp: "",
  });
  const [p1TypoHint, setP1TypoHint] = useState<string | null>(null);

  // Step 4 (Team only): Teammate (Participant 2)
  const [hasTeammate, setHasTeammate] = useState(false);
  const [p2, setP2] = useState({
    fullName: "",
    rollNumber: "",
    branch: "",
    year: "",
    mobile: "",
    email: "",
    verificationToken: "",
  });
  const [p2Verified, setP2Verified] = useState(false);
  const [p2OtpState, setP2OtpState] = useState({
    active: false,
    code: "",
    sending: false,
    verifying: false,
    error: "",
    timer: 0,
    devOtp: "",
  });
  const [p2TypoHint, setP2TypoHint] = useState<string | null>(null);

  // Step 5 (or 3 for Individual): Confirmation
  const [agreedRules, setAgreedRules] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Calculate total steps dynamically (always 1..N without gaps)
  const totalSteps = regType === "TEAM" ? 5 : 4;

  // Timers for OTP resend cooldown
  useEffect(() => {
    let t: any;
    if (p1OtpState.timer > 0) {
      t = setTimeout(() => {
        setP1OtpState((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearTimeout(t);
  }, [p1OtpState.timer]);

  useEffect(() => {
    let t: any;
    if (p2OtpState.timer > 0) {
      t = setTimeout(() => {
        setP2OtpState((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearTimeout(t);
  }, [p2OtpState.timer]);

  // Debounce team name live check
  useEffect(() => {
    const clean = teamName.trim();
    if (clean.length < 2) {
      setTeamNameStatus("idle");
      setTeamNameMsg("");
      return;
    }

    setTeamNameStatus("checking");
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/events/bytebrawl-hacktoberfest/check-team-name?name=${encodeURIComponent(clean)}`
        );
        const data = await res.json();
        if (data.available) {
          setTeamNameStatus("available");
          setTeamNameMsg("Team name is available");
        } else {
          setTeamNameStatus("taken");
          setTeamNameMsg(data.message || data.error || "Team name is already taken");
        }
      } catch {
        setTeamNameStatus("error");
        setTeamNameMsg("Unable to verify team name at this time");
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [teamName, regType]);

  // Check email typo hints on blur
  const checkTypo = (email: string, setter: (val: string | null) => void) => {
    if (!email || !email.includes("@")) {
      setter(null);
      return;
    }
    const domain = email.trim().toLowerCase().split("@")[1];
    if (COMMON_TYPOS[domain]) {
      const prefix = email.split("@")[0];
      setter(`${prefix}@${COMMON_TYPOS[domain]}`);
    } else {
      setter(null);
    }
  };

  // OTP handlers for Participant 1
  const handleSendP1Otp = async () => {
    const email = p1.email.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      setP1OtpState((prev) => ({ ...prev, error: "Please enter a valid email address first" }));
      return;
    }

    setP1OtpState((prev) => ({ ...prev, sending: true, error: "" }));
    try {
      const res = await fetch("/api/events/bytebrawl-hacktoberfest/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setP1OtpState((prev) => ({
          ...prev,
          sending: false,
          error: data.error || "Failed to send verification code",
        }));
      } else {
        setP1OtpState((prev) => ({
          ...prev,
          sending: false,
          active: true,
          timer: 60,
          error: "",
          devOtp: data.devOtp || "",
        }));
        if (data.typoHint) {
          setP1TypoHint(data.typoHint);
        }
      }
    } catch {
      setP1OtpState((prev) => ({
        ...prev,
        sending: false,
        error: "Network error sending verification code",
      }));
    }
  };

  const handleVerifyP1Otp = async () => {
    const email = p1.email.trim().toLowerCase();
    const code = p1OtpState.code.trim();
    if (!code || code.length !== 6) {
      setP1OtpState((prev) => ({ ...prev, error: "Please enter the 6-digit code" }));
      return;
    }

    setP1OtpState((prev) => ({ ...prev, verifying: true, error: "" }));
    try {
      const res = await fetch("/api/events/bytebrawl-hacktoberfest/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        setP1OtpState((prev) => ({
          ...prev,
          verifying: false,
          error: data.error || "Invalid code",
        }));
      } else {
        setP1((prev) => ({ ...prev, verificationToken: data.token }));
        setP1Verified(true);
        setP1OtpState((prev) => ({ ...prev, verifying: false, active: false, code: "", error: "" }));
      }
    } catch {
      setP1OtpState((prev) => ({
        ...prev,
        verifying: false,
        error: "Network error verifying code",
      }));
    }
  };

  // OTP handlers for Participant 2 (Teammate)
  const handleSendP2Otp = async () => {
    const email = p2.email.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      setP2OtpState((prev) => ({ ...prev, error: "Please enter a valid teammate email address first" }));
      return;
    }
    if (email === p1.email.trim().toLowerCase()) {
      setP2OtpState((prev) => ({ ...prev, error: "Teammate cannot have the same email as Team Leader" }));
      return;
    }

    setP2OtpState((prev) => ({ ...prev, sending: true, error: "" }));
    try {
      const res = await fetch("/api/events/bytebrawl-hacktoberfest/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setP2OtpState((prev) => ({
          ...prev,
          sending: false,
          error: data.error || "Failed to send verification code",
        }));
      } else {
        setP2OtpState((prev) => ({
          ...prev,
          sending: false,
          active: true,
          timer: 60,
          error: "",
          devOtp: data.devOtp || "",
        }));
        if (data.typoHint) {
          setP2TypoHint(data.typoHint);
        }
      }
    } catch {
      setP2OtpState((prev) => ({
        ...prev,
        sending: false,
        error: "Network error sending verification code",
      }));
    }
  };

  const handleVerifyP2Otp = async () => {
    const email = p2.email.trim().toLowerCase();
    const code = p2OtpState.code.trim();
    if (!code || code.length !== 6) {
      setP2OtpState((prev) => ({ ...prev, error: "Please enter the 6-digit code" }));
      return;
    }

    setP2OtpState((prev) => ({ ...prev, verifying: true, error: "" }));
    try {
      const res = await fetch("/api/events/bytebrawl-hacktoberfest/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        setP2OtpState((prev) => ({
          ...prev,
          verifying: false,
          error: data.error || "Invalid code",
        }));
      } else {
        setP2((prev) => ({ ...prev, verificationToken: data.token }));
        setP2Verified(true);
        setP2OtpState((prev) => ({ ...prev, verifying: false, active: false, code: "", error: "" }));
      }
    } catch {
      setP2OtpState((prev) => ({
        ...prev,
        verifying: false,
        error: "Network error verifying code",
      }));
    }
  };

  // Step Validation logic before proceeding to next step
  const canProceedStep = () => {
    if (currentStep === 1) {
      return true;
    }

    if (currentStep === 2) {
      // Team Details (both TEAM and INDIVIDUAL)
      return teamName.trim().length >= 2 && teamName.trim().length <= 40 && teamNameStatus === "available";
    }

    if (currentStep === 3) {
      // Participant 1 (Leader / Your Details)
      const phoneCheck = checkClientPhone(p1.mobile);
      return (
        p1.fullName.trim().length >= 2 &&
        /^[A-Za-z0-9]{6,14}$/.test(p1.rollNumber.trim()) &&
        p1.branch !== "" &&
        p1.year !== "" &&
        phoneCheck.valid &&
        p1.email.includes("@") &&
        p1Verified
      );
    }

    if (regType === "TEAM") {
      if (currentStep === 4) {
        // Participant 2 (Teammate)
        if (!hasTeammate) return false;
        const phoneCheck = checkClientPhone(p2.mobile);
        const p1Phone = checkClientPhone(p1.mobile);
        const distinctRoll = p2.rollNumber.trim().toUpperCase() !== p1.rollNumber.trim().toUpperCase();
        const distinctEmail = p2.email.trim().toLowerCase() !== p1.email.trim().toLowerCase();
        const distinctPhone = phoneCheck.valid && p1Phone.valid && phoneCheck.clean !== p1Phone.clean;

        return (
          p2.fullName.trim().length >= 2 &&
          /^[A-Za-z0-9]{6,14}$/.test(p2.rollNumber.trim()) &&
          distinctRoll &&
          p2.branch !== "" &&
          p2.year !== "" &&
          phoneCheck.valid &&
          distinctPhone &&
          p2.email.includes("@") &&
          distinctEmail &&
          p2Verified
        );
      }

      if (currentStep === 5) {
        return agreedRules && confirmedDetails;
      }
    } else {
      // INDIVIDUAL
      if (currentStep === 4) {
        return agreedRules && confirmedDetails;
      }
    }

    return true;
  };

  // Handle switching to Individual from team teammate step
  const handleSwitchToIndividual = () => {
    setRegType("INDIVIDUAL");
    setHasTeammate(false);
    setP2({
      fullName: "",
      rollNumber: "",
      branch: "",
      year: "",
      mobile: "",
      email: "",
      verificationToken: "",
    });
    setP2Verified(false);
    setCurrentStep(2); // Jump to Your Details step in Individual mode
  };

  // Final Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedRules || !confirmedDetails) return;

    setIsSubmitting(true);
    setServerError(null);
    setFieldErrors({});

    const p1Phone = checkClientPhone(p1.mobile);
    const payload: any = {
      type: regType,
      teamName: teamName.trim(),
      participant1: {
        fullName: p1.fullName.trim(),
        rollNumber: p1.rollNumber.trim().toUpperCase(),
        branch: p1.branch,
        year: p1.year,
        mobile: p1Phone.valid ? p1Phone.clean : p1.mobile.trim(),
        email: p1.email.trim().toLowerCase(),
        verificationToken: p1.verificationToken,
      },
      agreedRules: true,
      confirmedDetails: true,
      hp_website: honeypot || undefined,
    };

    if (regType === "TEAM" && hasTeammate) {
      const p2Phone = checkClientPhone(p2.mobile);
      payload.participant2 = {
        fullName: p2.fullName.trim(),
        rollNumber: p2.rollNumber.trim().toUpperCase(),
        branch: p2.branch,
        year: p2.year,
        mobile: p2Phone.valid ? p2Phone.clean : p2.mobile.trim(),
        email: p2.email.trim().toLowerCase(),
        verificationToken: p2.verificationToken,
      };
    }

    try {
      const res = await fetch("/api/events/bytebrawl-hacktoberfest/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsSubmitting(false);
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          const firstErr = Object.values(data.fieldErrors)[0] as string;
          setServerError(firstErr || data.error || "Validation failed");
        } else {
          setServerError(data.error || "Registration failed. Please check your details.");
        }
        return;
      }

      // Success! Clear state completely to protect privacy
      setTeamName("");
      setP1({
        fullName: "",
        rollNumber: "",
        branch: "",
        year: "",
        mobile: "",
        email: "",
        verificationToken: "",
      });
      setP2({
        fullName: "",
        rollNumber: "",
        branch: "",
        year: "",
        mobile: "",
        email: "",
        verificationToken: "",
      });
      setIsSubmitting(false);

      onSuccess({
        registrationId: data.registrationId,
        type: data.type,
        teamName: data.teamName,
        leaderEmail: p1.email.trim().toLowerCase(),
        participants: data.participants,
      });
    } catch {
      setIsSubmitting(false);
      setServerError("Network error while connecting to FLUX server. Please try again.");
    }
  };

  // Step labels
  const getStepTitle = () => {
    if (regType === "TEAM") {
      switch (currentStep) {
        case 1:
          return "Select Registration Format";
        case 2:
          return "Team Details";
        case 3:
          return "Participant 1 (Team Leader)";
        case 4:
          return "Team Members (1 / 2)";
        case 5:
          return "Review & Confirmation";
        default:
          return "";
      }
    } else {
      switch (currentStep) {
        case 1:
          return "Select Registration Format";
        case 2:
          return "Team Details";
        case 3:
          return "Your Details";
        case 4:
          return "Review & Confirmation";
        default:
          return "";
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/15 bg-[#101010]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white relative">
      {/* Honeypot field for anti-bot protection */}
      <input
        type="text"
        name="hp_website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      {/* Progress Bar & Header */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2.5">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-white font-bold">{getStepTitle()}</span>
        </div>
        
        {/* Progress Track */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={false}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </div>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-xl border border-rose-500/40 bg-rose-950/20 text-rose-300 text-xs font-mono flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* STEP 1: Registration Format */}
      {currentStep === 1 && (
        <motion.div
          key="step-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white mb-2">
              How do you want to register?
            </h3>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed mb-6">
              Pick your preferred competition format. Both members in a team must be students of MMMUT Gorakhpur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Team */}
            <div
              id="card-reg-team"
              onClick={() => setRegType("TEAM")}
              className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                regType === "TEAM"
                  ? "border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.1)]"
                  : "border-white/15 bg-[#141414] hover:border-white/40"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <Users className="w-6 h-6 text-white" />
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    regType === "TEAM" ? "border-white bg-white" : "border-white/40"
                  }`}
                >
                  {regType === "TEAM" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Create a Team (2 members)
                </h4>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                  Collaborative format with a Team Leader and 1 Teammate.
                </p>
              </div>
            </div>

            {/* Card 2: Individual */}
            <div
              id="card-reg-individual"
              onClick={() => {
                setRegType("INDIVIDUAL");
                setHasTeammate(false);
              }}
              className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                regType === "INDIVIDUAL"
                  ? "border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.1)]"
                  : "border-white/15 bg-[#141414] hover:border-white/40"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <User className="w-6 h-6 text-white" />
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    regType === "INDIVIDUAL" ? "border-white bg-white" : "border-white/40"
                  }`}
                >
                  {regType === "INDIVIDUAL" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Register Individually
                </h4>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                  Compete as a solo participant if you do not have a teammate.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: Team Details */}
      {currentStep === 2 && (
        <motion.div
          key="step-2-team"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white mb-1">
              Team Details
            </h3>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed">
              {regType === "TEAM"
                ? "Choose a unique name for your squad (2 to 40 characters)."
                : "Choose a team or handle name for your individual participation (2 to 40 characters)."}
            </p>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
              Team Name <span className="text-neutral-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. ByteCraft / NeuralForce"
                className={`w-full px-4 py-3 rounded-xl bg-[#161616] border text-white placeholder:text-neutral-500 font-sans text-sm focus:outline-none transition-colors ${
                  teamNameStatus === "taken"
                    ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500"
                    : teamNameStatus === "available"
                    ? "border-emerald-500/80 focus:ring-1 focus:ring-emerald-500"
                    : "border-white/15 focus:border-white focus:ring-1 focus:ring-white"
                }`}
              />
              <div className="absolute right-3.5 top-3.5 flex items-center">
                {teamNameStatus === "checking" && <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />}
                {teamNameStatus === "available" && <Check className="w-4 h-4 text-emerald-400" />}
                {teamNameStatus === "taken" && <AlertTriangle className="w-4 h-4 text-rose-400" />}
              </div>
            </div>

            {teamNameMsg && (
              <p
                className={`font-mono text-xs mt-1.5 ${
                  teamNameStatus === "available" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {teamNameMsg}
              </p>
            )}
            {fieldErrors.teamName && (
              <p className="font-mono text-xs text-rose-400 mt-1.5">{fieldErrors.teamName}</p>
            )}
          </div>
        </motion.div>
      )}

      {/* STEP 3: Your Details (Participant 1) */}
      {currentStep === 3 && (
        <motion.div
          key="step-participant-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white mb-1">
              {regType === "TEAM" ? "Team Leader Details" : "Your Details"}
            </h3>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed">
              Enter your official academic and contact details. Email must be verified via a 6-digit OTP.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                Full Name <span className="text-neutral-400">*</span>
              </label>
              <input
                type="text"
                value={p1.fullName}
                onChange={(e) => setP1({ ...p1, fullName: e.target.value })}
                placeholder="e.g. Devansh Mishra"
                className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/15 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-neutral-500 font-sans text-sm focus:outline-none transition-colors"
              />
            </div>

            {/* University Roll Number */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                University Roll Number <span className="text-neutral-400">*</span>
              </label>
              <input
                type="text"
                value={p1.rollNumber}
                onChange={(e) => setP1({ ...p1, rollNumber: e.target.value.toUpperCase() })}
                placeholder="e.g. 2024CSE310"
                className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/15 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-neutral-500 font-sans text-sm uppercase focus:outline-none transition-colors"
              />
            </div>

            {/* Branch / Department (Custom Select) */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                Branch / Department <span className="text-neutral-400">*</span>
              </label>
              <Select value={p1.branch} onValueChange={(val) => setP1({ ...p1, branch: val })}>
                <SelectTrigger className="w-full h-11 px-4 py-3 rounded-xl bg-[#161616] border border-white/15 text-white font-sans text-sm focus:border-white focus:ring-1 focus:ring-white">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border border-white/15 text-white z-50">
                  {BRANCH_OPTIONS.map((branch) => (
                    <SelectItem key={branch} value={branch} className="text-white hover:bg-white/10 cursor-pointer">
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year of Study (Custom Select) */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                Year of Study <span className="text-neutral-400">*</span>
              </label>
              <Select value={p1.year} onValueChange={(val) => setP1({ ...p1, year: val })}>
                <SelectTrigger className="w-full h-11 px-4 py-3 rounded-xl bg-[#161616] border border-white/15 text-white font-sans text-sm focus:border-white focus:ring-1 focus:ring-white">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border border-white/15 text-white z-50">
                  {YEAR_OPTIONS.map((year) => (
                    <SelectItem key={year} value={year} className="text-white hover:bg-white/10 cursor-pointer">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                Mobile Number <span className="text-neutral-400">*</span>
              </label>
              <input
                type="tel"
                value={p1.mobile}
                onChange={(e) => setP1({ ...p1, mobile: e.target.value })}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/15 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-neutral-500 font-sans text-sm focus:outline-none transition-colors"
              />
              {p1.mobile && !checkClientPhone(p1.mobile).valid && (
                <p className="font-mono text-xs text-rose-400 mt-1">
                  {checkClientPhone(p1.mobile).error}
                </p>
              )}
            </div>

            {/* Email Address with OTP Verify */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                Email Address <span className="text-neutral-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  disabled={p1Verified}
                  value={p1.email}
                  onChange={(e) => {
                    setP1({ ...p1, email: e.target.value.toLowerCase() });
                    checkTypo(e.target.value, setP1TypoHint);
                  }}
                  onBlur={() => checkTypo(p1.email, setP1TypoHint)}
                  placeholder="e.g. student@mmmut.ac.in"
                  className={`w-full px-4 py-3 rounded-xl bg-[#161616] border text-white placeholder:text-neutral-500 font-sans text-sm focus:outline-none transition-colors ${
                    p1Verified
                      ? "border-emerald-500/60 bg-emerald-950/10 text-emerald-200 cursor-not-allowed"
                      : "border-white/15 focus:border-white focus:ring-1 focus:ring-white"
                  }`}
                />
                
                {p1Verified ? (
                  <button
                    type="button"
                    onClick={() => {
                      setP1Verified(false);
                      setP1({ ...p1, verificationToken: "" });
                    }}
                    className="px-3.5 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors flex-shrink-0"
                  >
                    Change
                  </button>
                ) : (
                  <button
                    type="button"
                    id="btn-verify-p1"
                    disabled={p1OtpState.sending || !p1.email.includes("@")}
                    onClick={handleSendP1Otp}
                    className="px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    {p1OtpState.sending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <KeyRound className="w-3.5 h-3.5" />
                    )}
                    <span>Verify</span>
                  </button>
                )}
              </div>

              {p1Verified && (
                <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 mt-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Email verified with OTP</span>
                </div>
              )}

              {p1TypoHint && !p1Verified && (
                <div className="flex items-center gap-1.5 text-xs text-amber-300 mt-1.5">
                  <span>{p1TypoHint}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const corrected = p1TypoHint.replace("Did you mean ", "").replace("?", "").trim();
                      setP1({ ...p1, email: corrected });
                      setP1TypoHint(null);
                    }}
                    className="underline hover:text-white font-mono uppercase text-[10px]"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Inline OTP Input Box for Participant 1 */}
          <AnimatePresence>
            {p1OtpState.active && !p1Verified && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-xl border border-white/20 bg-[#161616] space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                  <span>Enter 6-digit code sent to <strong className="text-white">{p1.email}</strong></span>
                  {p1OtpState.timer > 0 ? (
                    <span className="text-neutral-400">Resend in {p1OtpState.timer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendP1Otp}
                      className="text-white hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Resend</span>
                    </button>
                  )}
                </div>

                {p1OtpState.devOtp && (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 uppercase font-semibold">Dev Note</span>
                      Email service unconfigured. Test OTP: <strong className="text-white tracking-widest">{p1OtpState.devOtp}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setP1OtpState((prev) => ({ ...prev, code: prev.devOtp }))}
                      className="px-2.5 py-1 rounded bg-amber-400 text-black text-[10px] uppercase font-bold hover:bg-amber-300 transition-colors"
                    >
                      Auto-fill
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    value={p1OtpState.code}
                    onChange={(e) => setP1OtpState({ ...p1OtpState, code: e.target.value.replace(/\D/g, "") })}
                    placeholder="123456"
                    className="w-40 px-3 py-2 rounded-lg bg-black border border-white/30 text-white font-mono text-center tracking-[0.3em] text-base focus:outline-none focus:border-white"
                  />
                  <button
                    type="button"
                    id="btn-confirm-otp-p1"
                    disabled={p1OtpState.verifying || p1OtpState.code.length !== 6}
                    onClick={handleVerifyP1Otp}
                    className="px-4 py-2 rounded-lg bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 disabled:opacity-40"
                  >
                    {p1OtpState.verifying ? "Checking..." : "Confirm OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setP1OtpState({ ...p1OtpState, active: false, error: "" })}
                    className="text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <p className="font-mono text-[11px] text-neutral-400">
                  Tip: If not in your primary inbox, please check your <span className="text-neutral-300">Spam</span> or <span className="text-neutral-300">Promotions</span> folder.
                </p>

                {p1OtpState.error && (
                  <p className="font-mono text-xs text-rose-400">{p1OtpState.error}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* STEP 4 (TEAM ONLY): Teammate Details */}
      {regType === "TEAM" && currentStep === 4 && (
        <motion.div
          key="step-4-teammate"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white mb-1">
                Team Members ({hasTeammate ? "2 / 2" : "1 / 2"})
              </h3>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                A team requires exactly 2 members to submit.
              </p>
            </div>
          </div>

          {/* Leader Summary Pill */}
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono font-bold text-white">
                1
              </div>
              <div>
                <p className="font-sans font-bold text-white">{p1.fullName} (Leader)</p>
                <p className="font-mono text-neutral-400 text-[11px]">
                  {p1.rollNumber} • {p1.branch} ({p1.year})
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] uppercase tracking-wider">
              Verified
            </span>
          </div>

          {/* Add Teammate Button OR Teammate Form */}
          {!hasTeammate ? (
            <div className="space-y-4">
              <button
                type="button"
                id="btn-add-teammate"
                onClick={() => setHasTeammate(true)}
                className="w-full py-6 rounded-xl border border-dashed border-white/30 hover:border-white bg-white/[0.02] hover:bg-white/[0.06] text-white flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  + Add Teammate (Participant 2)
                </span>
                <span className="font-sans text-[11px] text-neutral-400">
                  Required: Teams must have exactly 2 members.
                </span>
              </button>

              <div className="p-3.5 rounded-lg border border-white/10 bg-[#141414] text-center">
                <p className="font-sans text-xs text-neutral-400">
                  No teammate available?{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToIndividual}
                    className="text-white underline hover:text-neutral-200 font-medium cursor-pointer"
                  >
                    Switch to Individual Registration
                  </button>{" "}
                  (your details will be kept).
                </p>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl border border-white/20 bg-[#141414] space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Participant 2 (Teammate Details)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setHasTeammate(false);
                    setP2({
                      fullName: "",
                      rollNumber: "",
                      branch: "",
                      year: "",
                      mobile: "",
                      email: "",
                      verificationToken: "",
                    });
                    setP2Verified(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-rose-400 font-mono transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Teammate</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                    Full Name <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={p2.fullName}
                    onChange={(e) => setP2({ ...p2, fullName: e.target.value })}
                    placeholder="e.g. Sakshi Tiwari"
                    className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/15 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-neutral-500 font-sans text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* University Roll Number */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                    University Roll Number <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={p2.rollNumber}
                    onChange={(e) => setP2({ ...p2, rollNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. 2024IT320"
                    className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/15 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-neutral-500 font-sans text-sm uppercase focus:outline-none transition-colors"
                  />
                  {p2.rollNumber && p2.rollNumber.toUpperCase() === p1.rollNumber.toUpperCase() && (
                    <p className="font-mono text-xs text-rose-400 mt-1">
                      Teammate cannot have the same roll number as Team Leader
                    </p>
                  )}
                </div>

                {/* Branch / Department (Custom Select) */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                    Branch / Department <span className="text-neutral-400">*</span>
                  </label>
                  <Select value={p2.branch} onValueChange={(val) => setP2({ ...p2, branch: val })}>
                    <SelectTrigger className="w-full h-11 px-4 py-3 rounded-xl bg-[#161616] border border-white/15 text-white font-sans text-sm focus:border-white focus:ring-1 focus:ring-white">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border border-white/15 text-white z-50">
                      {BRANCH_OPTIONS.map((branch) => (
                        <SelectItem key={branch} value={branch} className="text-white hover:bg-white/10 cursor-pointer">
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year of Study (Custom Select) */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                    Year of Study <span className="text-neutral-400">*</span>
                  </label>
                  <Select value={p2.year} onValueChange={(val) => setP2({ ...p2, year: val })}>
                    <SelectTrigger className="w-full h-11 px-4 py-3 rounded-xl bg-[#161616] border border-white/15 text-white font-sans text-sm focus:border-white focus:ring-1 focus:ring-white">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border border-white/15 text-white z-50">
                      {YEAR_OPTIONS.map((year) => (
                        <SelectItem key={year} value={year} className="text-white hover:bg-white/10 cursor-pointer">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                    Mobile Number <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={p2.mobile}
                    onChange={(e) => setP2({ ...p2, mobile: e.target.value })}
                    placeholder="e.g. 9876543222"
                    className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/15 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-neutral-500 font-sans text-sm focus:outline-none transition-colors"
                  />
                  {p2.mobile && !checkClientPhone(p2.mobile).valid && (
                    <p className="font-mono text-xs text-rose-400 mt-1">
                      {checkClientPhone(p2.mobile).error}
                    </p>
                  )}
                  {p2.mobile && checkClientPhone(p2.mobile).clean === checkClientPhone(p1.mobile).clean && (
                    <p className="font-mono text-xs text-rose-400 mt-1">
                      Teammate cannot have the same mobile number as Team Leader
                    </p>
                  )}
                </div>

                {/* Email Address with OTP Verify */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-300 mb-2">
                    Email Address <span className="text-neutral-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      disabled={p2Verified}
                      value={p2.email}
                      onChange={(e) => {
                        setP2({ ...p2, email: e.target.value.toLowerCase() });
                        checkTypo(e.target.value, setP2TypoHint);
                      }}
                      onBlur={() => checkTypo(p2.email, setP2TypoHint)}
                      placeholder="e.g. teammate@mmmut.ac.in"
                      className={`w-full px-4 py-3 rounded-xl bg-[#161616] border text-white placeholder:text-neutral-500 font-sans text-sm focus:outline-none transition-colors ${
                        p2Verified
                          ? "border-emerald-500/60 bg-emerald-950/10 text-emerald-200 cursor-not-allowed"
                          : "border-white/15 focus:border-white focus:ring-1 focus:ring-white"
                      }`}
                    />

                    {p2Verified ? (
                      <button
                        type="button"
                        onClick={() => {
                          setP2Verified(false);
                          setP2({ ...p2, verificationToken: "" });
                        }}
                        className="px-3.5 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors flex-shrink-0"
                      >
                        Change
                      </button>
                    ) : (
                      <button
                        type="button"
                        id="btn-verify-p2"
                        disabled={p2OtpState.sending || !p2.email.includes("@")}
                        onClick={handleSendP2Otp}
                        className="px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 flex-shrink-0"
                      >
                        {p2OtpState.sending ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <KeyRound className="w-3.5 h-3.5" />
                        )}
                        <span>Verify</span>
                      </button>
                    )}
                  </div>

                  {p2Verified && (
                    <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 mt-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Email verified with OTP</span>
                    </div>
                  )}

                  {p2.email && p2.email.toLowerCase() === p1.email.toLowerCase() && (
                    <p className="font-mono text-xs text-rose-400 mt-1">
                      Teammate cannot have the same email as Team Leader
                    </p>
                  )}

                  {p2TypoHint && !p2Verified && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 mt-1.5">
                      <span>{p2TypoHint}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const corrected = p2TypoHint.replace("Did you mean ", "").replace("?", "").trim();
                          setP2({ ...p2, email: corrected });
                          setP2TypoHint(null);
                        }}
                        className="underline hover:text-white font-mono uppercase text-[10px]"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Inline OTP Input Box for Participant 2 */}
              <AnimatePresence>
                {p2OtpState.active && !p2Verified && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl border border-white/20 bg-[#161616] space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                      <span>Enter 6-digit code sent to <strong className="text-white">{p2.email}</strong></span>
                      {p2OtpState.timer > 0 ? (
                        <span className="text-neutral-400">Resend in {p2OtpState.timer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendP2Otp}
                          className="text-white hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Resend</span>
                        </button>
                      )}
                    </div>

                    {p2OtpState.devOtp && (
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 uppercase font-semibold">Dev Note</span>
                          Email service unconfigured. Test OTP: <strong className="text-white tracking-widest">{p2OtpState.devOtp}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => setP2OtpState((prev) => ({ ...prev, code: prev.devOtp }))}
                          className="px-2.5 py-1 rounded bg-amber-400 text-black text-[10px] uppercase font-bold hover:bg-amber-300 transition-colors"
                        >
                          Auto-fill
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        maxLength={6}
                        value={p2OtpState.code}
                        onChange={(e) => setP2OtpState({ ...p2OtpState, code: e.target.value.replace(/\D/g, "") })}
                        placeholder="123456"
                        className="w-40 px-3 py-2 rounded-lg bg-black border border-white/30 text-white font-mono text-center tracking-[0.3em] text-base focus:outline-none focus:border-white"
                      />
                      <button
                        type="button"
                        id="btn-confirm-otp-p2"
                        disabled={p2OtpState.verifying || p2OtpState.code.length !== 6}
                        onClick={handleVerifyP2Otp}
                        className="px-4 py-2 rounded-lg bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 disabled:opacity-40"
                      >
                        {p2OtpState.verifying ? "Checking..." : "Confirm OTP"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setP2OtpState({ ...p2OtpState, active: false, error: "" })}
                        className="text-xs font-mono text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <p className="font-mono text-[11px] text-neutral-400">
                      Tip: If not in your primary inbox, please check your <span className="text-neutral-300">Spam</span> or <span className="text-neutral-300">Promotions</span> folder.
                    </p>

                    {p2OtpState.error && (
                      <p className="font-mono text-xs text-rose-400">{p2OtpState.error}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      )}

      {/* FINAL STEP: Confirmation & Submission */}
      {((regType === "TEAM" && currentStep === 5) || (regType === "INDIVIDUAL" && currentStep === 4)) && (
        <motion.div
          key="step-confirmation"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white mb-1">
              Review Your Registration Summary
            </h3>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed">
              Verify all details carefully before submitting. Use [Edit] links to make any changes.
            </p>
          </div>

          <div className="space-y-4">
            {/* Format & Team Name Card */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414] flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  Registration Format
                </p>
                <p className="font-sans font-bold text-white text-sm">
                  {regType === "TEAM" ? `Team Registration: "${teamName}"` : `Individual Registration: "${teamName}"`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white font-mono uppercase underline"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            {/* Participant 1 Summary */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414] flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  {regType === "TEAM" ? "Team Leader" : "Participant"}
                </p>
                <p className="font-sans font-bold text-white text-sm">{p1.fullName}</p>
                <p className="font-mono text-neutral-400 text-xs mt-0.5">
                  Roll: {p1.rollNumber} • {p1.branch} ({p1.year})
                </p>
                <p className="font-mono text-neutral-400 text-xs">
                  {p1.mobile} • {p1.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white font-mono uppercase underline"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            {/* Participant 2 Summary (Team only) */}
            {regType === "TEAM" && hasTeammate && (
              <div className="p-4 rounded-xl border border-white/10 bg-[#141414] flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    Teammate
                  </p>
                  <p className="font-sans font-bold text-white text-sm">{p2.fullName}</p>
                  <p className="font-mono text-neutral-400 text-xs mt-0.5">
                    Roll: {p2.rollNumber} • {p2.branch} ({p2.year})
                  </p>
                  <p className="font-mono text-neutral-400 text-xs">
                    {p2.mobile} • {p2.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white font-mono uppercase underline"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>

          {/* Confirmation Checkboxes */}
          <div className="space-y-4 pt-3 border-t border-white/10">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                id="agree-rules"
                checked={agreedRules}
                onChange={(e) => setAgreedRules(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-black text-white focus:ring-white accent-white cursor-pointer"
              />
              <span className="font-sans text-xs sm:text-sm text-neutral-300 group-hover:text-white transition-colors">
                I agree to the <strong className="text-white">event rules and regulations</strong>, architectural constraints, and open-source licensing principles. <span className="text-neutral-400">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                id="confirm-details"
                checked={confirmedDetails}
                onChange={(e) => setConfirmedDetails(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-black text-white focus:ring-white accent-white cursor-pointer"
              />
              <span className="font-sans text-xs sm:text-sm text-neutral-300 group-hover:text-white transition-colors">
                I confirm that all submitted details (roll numbers, emails, and contacts) are <strong className="text-white">accurate and belong to MMMUT students</strong>. <span className="text-neutral-400">*</span>
              </span>
            </label>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons (Back / Next / Submit) */}
      <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
        {currentStep > 1 ? (
          <button
            type="button"
            id="btn-back-step"
            disabled={isSubmitting}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < totalSteps ? (
          <button
            type="button"
            id="btn-next-step"
            disabled={!canProceedStep()}
            onClick={() => {
              if (canProceedStep()) {
                setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
              }
            }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            id="btn-submit-registration"
            disabled={isSubmitting || !agreedRules || !confirmedDetails}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Submitting Registration...</span>
              </>
            ) : (
              <span>Register Now // Submit</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
