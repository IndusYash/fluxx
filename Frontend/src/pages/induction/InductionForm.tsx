import React, { useState, useRef } from 'react';
import {
  Upload, X, Check, ArrowRight, ArrowLeft,
  User, Phone, MapPin, Github, Zap,
  Building2, ShieldCheck, Sparkles,
  Star, AlertCircle, Trophy, FileText, Camera,
  Linkedin, Paperclip,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string; rollNo: string; branch: string; year: string; section: string;
  phone: string; email: string; linkedinProfile: string; githubProfile: string; residence: string;
  prevSociety: string;
  softSkills: string; hardSkills: string;
  projectsDesc: string;
  introduction: string; strengths: string; weaknesses: string; achievements: string;
  whyJoin: string;
  imageFile: File | null;
  resumeFile: File | null;
}

const STEPS = [
  { id: 1, title: 'Personal & Contact', icon: User,        desc: 'Your info & how to reach you'    },
  { id: 2, title: 'About You',          icon: Star,        desc: 'Skills, background & motivation'  },
  { id: 3, title: 'Review',             icon: ShieldCheck, desc: 'Final check'                      },
];

const cw = (t: string) => (t.trim() === '' ? 0 : t.trim().split(/\s+/).length);

// Background
const Bg: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#030507]" />
    <div className="absolute inset-0 opacity-[0.02]"
      style={{ backgroundImage: 'radial-gradient(#00FFC6 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
    <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#00FFC6]/5 blur-[180px]" />
    <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full bg-indigo-600/4 blur-[140px]" />
    <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-violet-700/4 blur-[120px]" />
  </div>
);

// Step bar
const TopStepper: React.FC<{ current: number }> = ({ current }) => {
  const pct = ((current - 1) / (STEPS.length - 1)) * 100;
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-4 inset-x-0 h-px bg-white/6 z-0" />
        <div className="absolute top-4 left-0 h-px bg-gradient-to-r from-[#00FFC6] to-[#00FFC6]/40 z-0 transition-all duration-700" style={{ width: pct + '%' }} />
        {STEPS.map((s) => {
          const Icon = s.icon;
          const done = current > s.id;
          const active = current === s.id;
          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-1.5">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${done ? 'bg-[#00FFC6] border-[#00FFC6] shadow-lg shadow-[#00FFC6]/25'
                  : active ? 'bg-[#030507] border-[#00FFC6] shadow-[0_0_12px_rgba(0,255,198,0.25)]'
                  : 'bg-[#030507] border-white/10'}`}>
                {done ? <Check size={10} strokeWidth={3} className="text-black" /> : <Icon size={10} className={active ? 'text-[#00FFC6]' : 'text-gray-700'} />}
              </div>
              <span className={`hidden xl:block text-[9px] font-semibold whitespace-nowrap transition-colors
                ${active ? 'text-[#00FFC6]' : done ? 'text-gray-500' : 'text-gray-700'}`}>{s.title}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="xl:hidden text-xs font-bold text-[#00FFC6]">{current}. {STEPS[current-1].title}</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-28 h-1 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00FFC6] to-[#00e5b3] rounded-full transition-all duration-700" style={{ width: pct + '%' }} />
          </div>
          <span className="text-[10px] text-gray-600 w-8 text-right">{Math.round(pct)}%</span>
        </div>
      </div>
    </div>
  );
};

// Field
const Field: React.FC<{ label: string; error?: string; required?: boolean; hint?: string; sub?: string; children: React.ReactNode }> =
  ({ label, error, required, hint, sub, children }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-baseline">
      <div className="flex items-baseline gap-2">
        <label className="text-sm font-semibold text-gray-200">
          {label}{required && <span className="text-[#00FFC6] ml-0.5">*</span>}
        </label>
        {sub && <span className="text-[10px] text-gray-600">{sub}</span>}
      </div>
      {hint && <span className="text-[10px] text-gray-600 tabular-nums">{hint}</span>}
    </div>
    {children}
    {error && (
      <p className="text-[11px] text-red-400 flex items-center gap-1.5 animate-fi">
        <AlertCircle size={10} className="shrink-0" /> {error}
      </p>
    )}
  </div>
);

const inp  = 'w-full bg-white/[0.035] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:border-[#00FFC6]/50 focus:bg-[#00FFC6]/[0.03] focus:outline-none transition-all duration-200 hover:border-white/14';
const sel  = inp + ' [&>option]:bg-[#07090e] [&>option]:text-white cursor-pointer';
const iInp = inp + ' pl-10';

const SectionHeader: React.FC<{ icon: React.FC<any>; title: string; sub: string }> = ({ icon: Icon, title, sub }) => (
  <div className="flex items-center gap-3 pb-4 border-b border-white/[0.05] mb-2">
    <div className="w-11 h-11 rounded-2xl bg-[#00FFC6]/10 border border-[#00FFC6]/20 flex items-center justify-center shrink-0">
      <Icon size={18} className="text-[#00FFC6]" />
    </div>
    <div>
      <h2 className="text-[15px] font-black text-white tracking-tight">{title}</h2>
      <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>
    </div>
  </div>
);


const PhotoUpload: React.FC<{ preview: string; file: File | null; onFile: (f: File | null) => void; error?: string }> =
  ({ preview, file, onFile, error }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="relative group cursor-pointer" onClick={() => !preview && document.getElementById('imgup')?.click()}>
      <div className={`w-28 h-28 rounded-full border-2 overflow-hidden flex items-center justify-center transition-all duration-300
        ${preview ? 'border-[#00FFC6]/60 shadow-lg shadow-[#00FFC6]/10' : 'border-dashed border-white/15 bg-white/[0.02] group-hover:border-[#00FFC6]/30'}`}>
        {preview ? <img src={preview} alt="Profile" className="w-full h-full object-cover" />
          : <div className="flex flex-col items-center gap-1.5">
              <Camera size={22} className="text-gray-700 group-hover:text-[#00FFC6] transition-colors" />
              <span className="text-[9px] text-gray-700 group-hover:text-gray-500">Upload</span>
            </div>}
      </div>
      {preview && (
        <button type="button"
          onClick={(e) => { e.stopPropagation(); onFile(null); (document.getElementById('imgup') as HTMLInputElement).value = ''; }}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500/90 hover:bg-red-400 flex items-center justify-center shadow-md transition-colors">
          <X size={11} className="text-white" />
        </button>
      )}
    </div>
    <input type="file" accept=".jpg,.jpeg,.png" className="hidden" id="imgup" onChange={e => onFile(e.target.files?.[0] || null)} />
    <label htmlFor="imgup" className="flex items-center gap-1.5 cursor-pointer text-xs text-gray-500 hover:text-[#00FFC6] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#00FFC6]/5 border border-transparent hover:border-[#00FFC6]/15">
      <Upload size={11} /> {preview ? 'Change photo' : 'Choose photo'}
    </label>
    {file && <p className="text-[10px] text-gray-700">{file.name} · {(file.size/1024).toFixed(0)} KB</p>}
    <p className="text-[10px] text-gray-700">JPG/PNG · max 5 MB · optional</p>
    {error && <p className="text-[11px] text-red-400">{error}</p>}
  </div>
);

// Main
const InductionForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '', rollNo: '', branch: '', year: '', section: '',
    phone: '', email: '', linkedinProfile: '', githubProfile: '', residence: '',
    prevSociety: '',
    softSkills: '', hardSkills: '',
    projectsDesc: '',
    introduction: '', strengths: '', weaknesses: '', achievements: '',
    whyJoin: '',
    imageFile: null,
    resumeFile: null,
  });
  const [errors, setErrors]               = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [isSubmitted, setIsSubmitted]     = useState(false);
  const [imagePreview, setImagePreview]   = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof FormData, v: any) => {
    setFormData(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k as string]; return n; });
  };

  const handleFile = (file: File | null) => {
    set('imageFile', file);
    if (file) { const r = new FileReader(); r.onload = e => setImagePreview(e.target?.result as string); r.readAsDataURL(file); }
    else setImagePreview('');
  };

  const handleResume = (file: File | null) => {
    set('resumeFile', file);
  };

  const validateStep = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!/^[a-zA-Z\s]+$/.test(formData.name.trim()))                                        e.name    = 'Enter valid name';
      if (!formData.rollNo || !/^\d{10}$/.test(formData.rollNo))           e.rollNo  = 'Must be exactly 10 digits';
      if (!formData.branch)                                             e.branch  = 'Select a branch';
      if (!formData.year)                                               e.year    = 'Select a year';
      if (!formData.section || !/^[ABCDabcd]$/.test(formData.section.trim()))                                     e.section = 'Enter your section (e.g. A, B)';
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required';
      if (!formData.phone || !/^(\d{10}|\+91\s\d{10})$/.test(formData.phone))         e.phone = 'Valid phone number required (e.g. 98XXXXXXXX or +91 98XXXXXXXX)';
      if (!formData.residence.trim())                                   e.residence = 'Residence required';
      if (formData.imageFile) {
        if (!['image/jpeg','image/jpg','image/png'].includes(formData.imageFile.type)) e.imageFile = 'Only JPG/PNG allowed';
        else if (formData.imageFile.size > 5*1024*1024)                               e.imageFile = 'Max size is 5 MB';
      }
    }
    if (s === 2) {
      if (!formData.softSkills.trim())                                  e.softSkills = 'Required';
      else if (cw(formData.softSkills) > 100)                          e.softSkills = 'Max 100 words';
      if (!formData.hardSkills.trim())                                  e.hardSkills = 'Required';
      else if (cw(formData.hardSkills) > 100)                          e.hardSkills = 'Max 100 words';
      if (formData.projectsDesc.trim() && cw(formData.projectsDesc) > 200) e.projectsDesc = 'Max 200 words';
      if (!formData.introduction.trim())                                e.introduction = 'Required';
      else if (cw(formData.introduction) > 100)                        e.introduction = 'Max 100 words';
      if (!formData.strengths.trim())                                   e.strengths = 'Required';
      else if (cw(formData.strengths) > 100)                           e.strengths = 'Max 100 words';
      if (!formData.weaknesses.trim())                                  e.weaknesses = 'Required';
      else if (cw(formData.weaknesses) > 100)                          e.weaknesses = 'Max 100 words';
      const wjc = cw(formData.whyJoin);
      if (!formData.whyJoin.trim())                                     e.whyJoin = 'This field is required';
      else if (wjc < 10)                                               e.whyJoin = `Write at least 10 words (currently ${wjc} word${wjc !== 1 ? 's' : ''})`;
      else if (wjc > 200)                                              e.whyJoin = 'Max 200 words';
      if (formData.resumeFile) {
        if (formData.resumeFile.type !== 'application/pdf')             e.resumeFile = 'Only PDF allowed';
        else if (formData.resumeFile.size > 5*1024*1024)               e.resumeFile = 'Max size is 5 MB';
      }
    }
    return e;
  };

  const scrollTop = () => setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);

  const goNext = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length) { setErrors(errs); scrollTop(); return; }
    setStep(s => Math.min(s + 1, STEPS.length));
    scrollTop();
  };
  const goBack = () => { setStep(s => Math.max(s - 1, 1)); scrollTop(); };

  // Called when form submits on step 2 (Review Application button)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const step2Errors = validateStep(2);
    if (Object.keys(step2Errors).length) { setErrors(step2Errors); scrollTop(); return; }
    const step1Errors = validateStep(1);
    if (Object.keys(step1Errors).length) {
      setErrors(step1Errors);
      toast.error('Please fix errors in Step 1 first.');
      setStep(1); scrollTop(); return;
    }
    setStep(3); scrollTop();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

      let imageUrl = '';
      if (formData.imageFile) {
        try {
          const uploadFormData = new FormData();
          uploadFormData.append('file', formData.imageFile);
          uploadFormData.append('rollNo', formData.rollNo);
          const uploadResponse = await fetch(`${API_BASE}/api/upload/induction-photo`, {
            method: 'POST', body: uploadFormData,
          });
          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            throw new Error(errorData.message || 'Image upload failed');
          }
          const uploadResult = await uploadResponse.json();
          imageUrl = uploadResult.url;
          toast.success('Image uploaded successfully!');
        } catch (err: any) {
          console.error('Image upload error:', err);
          toast.error(`Image upload failed: ${err.message}. Continuing without photo.`);
        }
      }

      const payload = {
        name: formData.name,
        rollNo: formData.rollNo,
        branch: formData.branch,
        year: formData.year,
        section: formData.section,
        phone: formData.phone,
        email: formData.email,
        linkedinProfile: formData.linkedinProfile,
        githubProfile: formData.githubProfile,
        residence: formData.residence,
        prevSociety: formData.prevSociety,
        softSkills: formData.softSkills,
        hardSkills: formData.hardSkills,
        projectsDesc: formData.projectsDesc,
        achievements: formData.achievements,
        introduction: formData.introduction,
        strengths: formData.strengths,
        weaknesses: formData.weaknesses,
        whyJoin: formData.whyJoin,
        imageUrl: imageUrl,
        resumeUrl: '',
      };

      const response = await fetch(`${API_BASE}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error('You have already applied. Duplicate entry detected.');
        } else {
          throw new Error(data.error || 'Failed to submit application');
        }
      } else {
        setIsSubmitted(true);
        toast.success('Application submitted successfully!');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      toast.error(`Submission failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false); setStep(1);
    setFormData({ name:'',rollNo:'',branch:'',year:'',section:'',phone:'',email:'',linkedinProfile:'',githubProfile:'',
      residence:'',prevSociety:'',softSkills:'',hardSkills:'',projectsDesc:'',
      introduction:'',strengths:'',weaknesses:'',achievements:'',whyJoin:'',imageFile:null,resumeFile:null });
    setImagePreview('');
  };

  // Success screen
  if (isSubmitted) return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <Bg />
      <div className="relative z-10 max-w-sm w-full text-center">
        <div className="relative inline-flex mb-8">
          <div className="w-32 h-32 rounded-full bg-[#00FFC6]/8 border border-[#00FFC6]/20 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#00FFC6]/15 flex items-center justify-center">
              <Check size={36} className="text-[#00FFC6]" strokeWidth={2.5} />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full animate-ping bg-[#00FFC6]/4" />
        </div>
        <div className="inline-flex items-center gap-2 bg-[#00FFC6]/10 border border-[#00FFC6]/20 rounded-full px-3 py-1 text-[#00FFC6] text-[11px] font-bold tracking-widest uppercase mb-5">
          <Sparkles size={10} /> Application Submitted
        </div>
        <h2 className="text-3xl font-black text-white mb-3">You're all set!</h2>
        <p className="text-gray-400 text-sm mb-1.5">Application received by <span className="text-white font-semibold">Flux</span>.</p>
        <p className="text-gray-600 text-sm mb-8">We'll reach out to <span className="text-[#00FFC6]">{formData.email}</span>.</p>
        <button onClick={resetForm}
          className="inline-flex items-center gap-2 bg-[#00FFC6] hover:bg-[#00e5b3] text-black font-bold py-3 px-8 rounded-2xl transition-all duration-200 hover:scale-[1.03] shadow-lg shadow-[#00FFC6]/20 text-sm">
          Submit Another <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white relative">
      <Bg />
      <ToastContainer theme="dark" position="top-center" aria-label="Notifications" />

      <div ref={topRef} className="relative z-10 max-w-3xl mx-auto px-0 sm:px-4 pb-8 pt-6 sm:pt-8">

        {/* Header */}
        <div className="text-center mb-12 px-4 sm:px-0">
          <div className="inline-flex items-center gap-2 bg-[#00FFC6]/8 border border-[#00FFC6]/20 rounded-full px-4 py-1.5 text-[#00FFC6] text-[11px] font-bold tracking-[0.15em] uppercase mb-5">
            <Zap size={10} /> Applications Open
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 tracking-tight leading-none">
            Flux<span className="text-[#00FFC6]">.</span>
          </h1>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
            Induction 2026 — Join the community where future tech leaders are built.
          </p>
        </div>

        {/* Stepper card */}
        <div className="bg-white/[0.015] border-0 sm:border border-white/[0.06] rounded-none sm:rounded-2xl px-3 sm:px-6 py-4 sm:py-5 mb-3 sm:mb-5 backdrop-blur-sm overflow-x-auto">
          <TopStepper current={step} />
        </div>

        {/* Form card */}
        <div className="relative bg-white/[0.02] border-0 sm:border border-white/[0.07] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#00FFC6]/70 to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#00FFC6]/4 blur-[60px] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative px-4 py-5 sm:p-6 md:p-10">

            {/* ── STEP 1 — Personal & Contact ── */}
            {step === 1 && (
              <div className="space-y-7 animate-fi">
                <SectionHeader icon={User} title="Personal & Contact" sub="Your academic identity and how we reach you" />

                {/* Photo — centered full-width row */}
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-2">Photo</p>
                  <PhotoUpload preview={imagePreview} file={formData.imageFile} onFile={handleFile} error={errors.imageFile} />
                </div>

                {/* Personal fields — full width grid */}
                <div className="pt-2 border-t border-white/[0.05]">
                  <p className="text-[11px] font-bold text-[#00FFC6] uppercase tracking-widest mb-4">Personal Information</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Full Name" required error={errors.name}>
                      <div className="relative">
                        <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        <input className={iInp} value={formData.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
                      </div>
                    </Field>
                    <Field label="Roll Number" required error={errors.rollNo} hint="10 chars">
                      <input className={inp} value={formData.rollNo} onChange={e => set('rollNo', e.target.value.toUpperCase())} maxLength={10} placeholder="23XXXXXXXX" />
                    </Field>
                    <Field label="Branch" required error={errors.branch}>
                      <select className={sel} value={formData.branch} onChange={e => set('branch', e.target.value)}>
                        <option value="">Select branch</option>
                        {['CSE','IT','ECE','IOT','EE','ME','CE','CHE','BBA'].map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </Field>
                    <Field label="Year" required error={errors.year}>
                      <select className={sel} value={formData.year} onChange={e => set('year', e.target.value)}>
                        <option value="">Select year</option>
                        <option value="1st Year">1st Year</option>
                      </select>
                    </Field>
                    <Field label="Section" required error={errors.section} sub="(A, B, C…)">
                      <input className={inp} value={formData.section} onChange={e => set('section', e.target.value.toUpperCase())} maxLength={4} placeholder="A" />
                    </Field>
                  </div>
                </div>

                {/* Contact fields merged into Step 1 */}
                <div className="pt-2 border-t border-white/[0.05]">
                  <p className="text-[11px] font-bold text-[#00FFC6] uppercase tracking-widest mb-4">Contact & Social</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Email Address" required error={errors.email}>
                      <input className={inp} type="email" value={formData.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
                    </Field>
                    <Field label="Phone Number" required error={errors.phone}>
                      <div className="relative">
                        <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        <input className={iInp} type="tel" value={formData.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
                      </div>
                    </Field>
                    <Field label="Current Residence" required error={errors.residence}>
                      <div className="relative">
                        <MapPin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        <input className={iInp} value={formData.residence} onChange={e => set('residence', e.target.value)} placeholder="City, State" />
                      </div>
                    </Field>
                    <Field label="LinkedIn Profile" hint="optional">
                      <div className="relative">
                        <Linkedin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        <input className={iInp} value={formData.linkedinProfile} onChange={e => set('linkedinProfile', e.target.value)} placeholder="linkedin.com/in/username" />
                      </div>
                    </Field>
                    <Field label="GitHub / Portfolio" hint="optional">
                      <div className="relative">
                        <Github size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        <input className={iInp} value={formData.githubProfile} onChange={e => set('githubProfile', e.target.value)} placeholder="github.com/username" />
                      </div>
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2 — About You ── */}
            {step === 2 && (
              <div className="space-y-6 animate-fi">
                <SectionHeader icon={Star} title="About You" sub="Skills, background & why you want to join Flux" />

                {/* Society */}
                <Field label="Society / Club you're part of" hint="optional">
                  <div className="relative">
                    <Building2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                    <input className={iInp} value={formData.prevSociety} onChange={e => set('prevSociety', e.target.value)} placeholder="e.g. Robotics Club, NSS, GDSC — or leave blank" />
                  </div>
                </Field>

                {/* Skills */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Soft Skills" required error={errors.softSkills} hint={`${cw(formData.softSkills)}/100`}>
                    <textarea className={`${inp} resize-none leading-relaxed`} rows={4}
                      value={formData.softSkills} onChange={e => set('softSkills', e.target.value)}
                      placeholder="Leadership, communication, teamwork, event management, public speaking..." />
                  </Field>
                  <Field label="Technical Skills & Languages" required error={errors.hardSkills} hint={`${cw(formData.hardSkills)}/100`}>
                    <textarea className={`${inp} resize-none leading-relaxed`} rows={4}
                      value={formData.hardSkills} onChange={e => set('hardSkills', e.target.value)}
                      placeholder="C++, Python, React, Figma, video editing, SQL, machine learning..." />
                  </Field>
                </div>

                {/* Projects — optional */}
                <Field label="Projects" hint={`optional · ${cw(formData.projectsDesc)}/200 words`} sub="Describe your top 1–3 projects" error={errors.projectsDesc}>
                  <textarea className={`${inp} resize-none leading-relaxed`} rows={4}
                    value={formData.projectsDesc} onChange={e => set('projectsDesc', e.target.value)}
                    placeholder="Project name, tech stack, what it does, your role, live link or GitHub URL..." />
                </Field>

                {/* About — introduction, strengths, weaknesses */}
                <Field label="Brief Introduction" required error={errors.introduction} hint={`${cw(formData.introduction)}/100 words`}>
                  <textarea className={`${inp} resize-none leading-relaxed`} rows={3}
                    value={formData.introduction} onChange={e => set('introduction', e.target.value)}
                    placeholder="Your background, interests, passions, and what makes you unique..." />
                </Field>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Your Strengths" required error={errors.strengths} hint={`${cw(formData.strengths)}/100`}>
                    <textarea className={`${inp} resize-none leading-relaxed`} rows={4}
                      value={formData.strengths} onChange={e => set('strengths', e.target.value)}
                      placeholder="What are you great at? What do others rely on you for?" />
                  </Field>
                  <Field label="Your Weaknesses" required error={errors.weaknesses} hint={`${cw(formData.weaknesses)}/100`}>
                    <textarea className={`${inp} resize-none leading-relaxed`} rows={4}
                      value={formData.weaknesses} onChange={e => set('weaknesses', e.target.value)}
                      placeholder="What are you actively improving? Be genuine and self-aware." />
                  </Field>
                </div>
                <Field label="Achievements" hint={`optional · ${cw(formData.achievements)}/100 words`}>
                  <div className="relative">
                    <Trophy size={13} className="absolute left-3.5 top-3.5 text-gray-600 pointer-events-none" />
                    <textarea className={`${inp} resize-none leading-relaxed pl-10`} rows={3}
                      value={formData.achievements} onChange={e => set('achievements', e.target.value)}
                      placeholder="Hackathons, competitions, certifications, awards, publications..." />
                  </div>
                </Field>

                {/* Why Flux */}
                <div className="bg-gradient-to-br from-[#00FFC6]/6 to-transparent border border-[#00FFC6]/12 rounded-2xl p-5 text-sm text-gray-500 leading-relaxed">
                  <p className="text-[#00FFC6] font-bold text-[11px] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={10} /> Your moment to shine
                  </p>
                  Be specific. What projects do you want to build? What problems do you want to solve? Why is Flux the right community for you?
                </div>
                <Field label="Why do you want to join Flux?" required error={errors.whyJoin} hint={`${cw(formData.whyJoin)}/200 words`}>
                  <textarea className={`${inp} resize-none leading-relaxed`} rows={6}
                    value={formData.whyJoin} onChange={e => set('whyJoin', e.target.value)}
                    placeholder="Your motivations, goals, ideas you want to build, impact you want to create..." />
                </Field>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Paperclip size={14} className="text-[#00FFC6]" /> Resume
                      <span className="text-[10px] text-gray-600 font-normal">optional · PDF only · max 5 MB</span>
                    </p>
                    {formData.resumeFile && (
                      <button type="button"
                        onClick={() => { set('resumeFile', null); (document.getElementById('resumeup') as HTMLInputElement).value = ''; }}
                        className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 transition-colors">
                        <X size={11} /> Remove
                      </button>
                    )}
                  </div>
                  <input type="file" accept=".pdf" className="hidden" id="resumeup" onChange={e => handleResume(e.target.files?.[0] || null)} />
                  {formData.resumeFile ? (
                    <div className="flex items-center gap-3 p-3.5 bg-[#00FFC6]/5 border border-[#00FFC6]/20 rounded-xl">
                      <div className="w-9 h-9 rounded-lg bg-[#00FFC6]/10 border border-[#00FFC6]/20 flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-[#00FFC6]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 font-semibold truncate">{formData.resumeFile.name}</p>
                        <p className="text-[10px] text-gray-600">{(formData.resumeFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <Check size={14} className="text-[#00FFC6] shrink-0" />
                    </div>
                  ) : (
                    <label htmlFor="resumeup"
                      className="flex items-center justify-center gap-2.5 w-full py-4 border border-dashed border-white/12 rounded-xl text-sm text-gray-600 hover:text-gray-400 hover:border-white/25 hover:bg-white/[0.02] transition-all duration-200 cursor-pointer">
                      <Upload size={15} /> Click to upload your resume (PDF)
                    </label>
                  )}
                  {errors.resumeFile && <p className="text-[11px] text-red-400 flex items-center gap-1.5"><AlertCircle size={10} />{errors.resumeFile}</p>}
                </div>
              </div>
            )}

            {/* ── STEP 3 — Review ── */}
            {step === 3 && (
              <div className="space-y-5 animate-fi">
                <SectionHeader icon={ShieldCheck} title="Review & Submit" sub="Take a final look before sending" />

                <div className="bg-gradient-to-br from-[#00FFC6]/6 to-transparent border border-[#00FFC6]/12 rounded-2xl p-5 text-sm text-gray-400 leading-relaxed">
                  <p className="text-[#00FFC6] font-bold text-[11px] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={10} /> Review Your Application
                  </p>
                  <p className="text-xs">Review all information carefully. Click "Edit" on any section to go back and fix it.</p>
                </div>

                {imagePreview && (
                  <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                    <img src={imagePreview} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-[#00FFC6]/30" />
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">Profile Photo</p>
                      <p className="text-sm text-gray-300 font-semibold">{formData.imageFile?.name}</p>
                    </div>
                  </div>
                )}

                {/* Personal & Contact block */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold text-[#00FFC6] uppercase tracking-[0.12em]">Personal & Contact</p>
                    <button type="button" onClick={() => { setStep(1); scrollTop(); }}
                      className="text-[10px] text-gray-500 hover:text-[#00FFC6] font-semibold uppercase tracking-wider transition-colors">Edit</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-2.5">
                    {[
                      { l: 'Name',      v: formData.name },
                      { l: 'Roll No',   v: formData.rollNo },
                      { l: 'Branch',    v: formData.branch },
                      { l: 'Year',      v: formData.year },
                      { l: 'Section',   v: formData.section },
                      { l: 'Email',     v: formData.email },
                      { l: 'Phone',     v: formData.phone },
                      { l: 'Residence', v: formData.residence },
                      { l: 'LinkedIn',  v: formData.linkedinProfile || '—' },
                      { l: 'GitHub',    v: formData.githubProfile    || '—' },
                    ].map(({ l, v }) => (
                      <div key={l}>
                        <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block">{l}</span>
                        <span className="text-sm text-gray-300 font-medium">{v || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About You block */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold text-[#00FFC6] uppercase tracking-[0.12em]">About You</p>
                    <button type="button" onClick={() => { setStep(2); scrollTop(); }}
                      className="text-[10px] text-gray-500 hover:text-[#00FFC6] font-semibold uppercase tracking-wider transition-colors">Edit</button>
                  </div>
                  <div className="space-y-3">
                    {formData.prevSociety && (
                      <div>
                        <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Society / Club</span>
                        <p className="text-sm text-gray-300 font-medium">{formData.prevSociety}</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                      <div>
                        <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Soft Skills</span>
                        <p className="text-sm text-gray-400 leading-relaxed">{formData.softSkills}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Hard Skills</span>
                        <p className="text-sm text-gray-400 leading-relaxed">{formData.hardSkills}</p>
                      </div>
                    </div>
                    {formData.projectsDesc && (
                      <div>
                        <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Projects</span>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{formData.projectsDesc}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Introduction</span>
                      <p className="text-sm text-gray-400 leading-relaxed">{formData.introduction}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                      <div>
                        <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Strengths</span>
                        <p className="text-sm text-gray-400 leading-relaxed">{formData.strengths}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Weaknesses</span>
                        <p className="text-sm text-gray-400 leading-relaxed">{formData.weaknesses}</p>
                      </div>
                    </div>
                    {formData.achievements && (
                      <div>
                        <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Achievements</span>
                        <p className="text-sm text-gray-400 leading-relaxed">{formData.achievements}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-[9px] text-gray-700 uppercase tracking-wider font-semibold block mb-0.5">Why Flux?</span>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">{formData.whyJoin}</p>
                    </div>
                  </div>
                </div>

                {formData.resumeFile && (
                  <div className="flex items-center gap-3 p-3.5 bg-[#00FFC6]/5 border border-[#00FFC6]/15 rounded-2xl">
                    <Paperclip size={16} className="text-[#00FFC6] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">Resume</p>
                      <p className="text-sm text-gray-300 font-semibold truncate">{formData.resumeFile.name}</p>
                    </div>
                    <Check size={13} className="text-[#00FFC6] shrink-0" />
                  </div>
                )}

                <div className="flex items-start gap-3 bg-[#00FFC6]/5 border border-[#00FFC6]/15 rounded-2xl p-4">
                  <Check size={14} className="text-[#00FFC6] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By submitting, you confirm all information is accurate and agree to be contacted by the Flux team regarding your application.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className={`flex mt-8 sm:mt-10 gap-3 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
              {step > 1 && (
                <button type="button" onClick={goBack}
                  className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl border border-white/8 text-gray-500 hover:text-white hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 text-sm font-semibold">
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              {step === 1 && (
                <button type="button" onClick={goNext}
                  className="flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-8 py-3 rounded-xl bg-[#00FFC6] hover:bg-[#00e5b3] text-black font-bold transition-all duration-200 text-sm hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-[#00FFC6]/15">
                  Continue <ArrowRight size={14} />
                </button>
              )}
              {step === 2 && (
                <button type="submit"
                  className="flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-8 py-3 rounded-xl bg-[#00FFC6] hover:bg-[#00e5b3] text-black font-bold transition-all duration-200 text-sm hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-[#00FFC6]/15">
                  Review Application <ShieldCheck size={14} />
                </button>
              )}
              {step === 3 && (
                <button type="button" onClick={handleFinalSubmit} disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-10 py-3 rounded-xl bg-[#00FFC6] hover:bg-[#00e5b3] disabled:bg-gray-800 disabled:text-gray-600 text-black font-bold transition-all duration-200 text-sm hover:scale-[1.02] disabled:scale-100 active:scale-[0.99] shadow-lg shadow-[#00FFC6]/15">
                  {isSubmitting ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting...</>
                  ) : (
                    <><Check size={14} /> Submit Application</>
                  )}
                </button>
              )}
            </div>

          </form>
        </div>

        <p className="text-center text-[11px] text-gray-700 mt-4">
          Step {step} of {STEPS.length} — {STEPS[step-1].desc}
        </p>
      </div>

      <style>{`
        @keyframes fi { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
        .animate-fi { animation: fi 0.22s ease both; }
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .line-clamp-4 { display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>
    </div>
  );
};

export default InductionForm;
