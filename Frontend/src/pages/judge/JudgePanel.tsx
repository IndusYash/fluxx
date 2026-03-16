import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LogIn, LogOut, Search, X, Check, Star, User, Paperclip, AlertCircle,
  Loader2, CheckCircle2, XCircle, Clock, Users, Eye, Trophy,
  MessageSquare, Code2, Hash, Layers, Palette, Briefcase,
} from 'lucide-react';

const API = (import.meta as any).env?.VITE_REG_API_URL || '';
const STORAGE_KEY = 'flux_judge_token';

// ── Types ─────────────────────────────────────────────────────────────────────
type Status = 'selected' | 'rejected' | 'hold';

interface CategoryScores {
  communication: number;
  webDev:        number;
  dsa:           number;
  projects:      number;
  creative:      number;
  management:    number;
}

const DEFAULT_CATS: CategoryScores = {
  communication: 5, webDev: 5, dsa: 5, projects: 5, creative: 5, management: 5,
};

const CATS: { key: keyof CategoryScores; label: string; Icon: React.FC<any>; color: string }[] = [
  { key: 'communication', label: 'Communication',     Icon: MessageSquare, color: 'text-blue-400'   },
  { key: 'webDev',        label: 'Web Dev',           Icon: Code2,         color: 'text-purple-400' },
  { key: 'dsa',           label: 'DSA / Coding',      Icon: Hash,          color: 'text-yellow-400' },
  { key: 'projects',      label: 'Projects',          Icon: Layers,        color: 'text-orange-400' },
  { key: 'creative',      label: 'Creative & Design', Icon: Palette,       color: 'text-pink-400'   },
  { key: 'management',    label: 'Management',        Icon: Briefcase,     color: 'text-green-400'  },
];

interface ScoreEntry {
  _id: string;
  overall: number;
  categories: CategoryScores;
  remarks: string;
  status: Status;
  judgeName?: string;
}

interface Application {
  _id: string;
  name: string; rollNo: string; branch: string; year: string; section: string;
  email: string; phone: string; residence: string;
  linkedinProfile?: string; githubProfile?: string;
  prevSociety?: string; domain?: string[];
  softSkills?: string; hardSkills?: string; projectsDesc?: string;
  introduction?: string; strengths?: string; weaknesses?: string;
  achievements?: string; whyJoin?: string;
  imageUrl?: string; resumeUrl?: string;
  createdAt: string;
  myScore: ScoreEntry | null;
}

interface LeaderboardEntry {
  _id: string; name: string; rollNo: string; branch: string;
  year: string; section: string; domain?: string[]; imageUrl?: string;
  judgeCount: number;
  avgOverall: number;
  avgCategories: CategoryScores;
  consensusStatus: Status | null;
  myScore: ScoreEntry | null;
}

interface JudgeInfo { name: string; email: string; }

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusBg = (s: string) =>
  s === 'selected' ? 'bg-[#00FFC6]/10 border-[#00FFC6]/30 text-[#00FFC6]'
  : s === 'rejected' ? 'bg-red-500/10 border-red-500/30 text-red-400'
  : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';

const catBg = (c: string) => c.replace('text-', 'bg-');

const Row: React.FC<{ label: string; value?: string }> = ({ label, value }) =>
  value ? (
    <div>
      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-0.5">{label}</p>
      <p className="text-sm text-gray-300 leading-relaxed">{value}</p>
    </div>
  ) : null;

const Divider: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-3 pt-1">
    <div className="flex-1 h-px bg-white/[0.05]" />
    <p className="text-[10px] font-bold text-[#00FFC6] uppercase tracking-[0.15em] shrink-0">{title}</p>
    <div className="flex-1 h-px bg-white/[0.05]" />
  </div>
);

// ── Score Chip ────────────────────────────────────────────────────────────────
const ScoreChip: React.FC<{ score: ScoreEntry | null; small?: boolean }> = ({ score, small }) => {
  if (!score) return <span className="text-[10px] text-gray-600 italic">Not scored</span>;
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className={`font-black text-white ${small ? 'text-xs' : 'text-sm'}`}>
        {score.overall.toFixed(1)}/10
      </span>
      <span className={`${small ? 'text-[9px]' : 'text-[10px]'} font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${statusBg(score.status)}`}>
        {score.status}
      </span>
    </div>
  );
};

// ── Category Row ──────────────────────────────────────────────────────────────
const CatRow: React.FC<{
  catKey: keyof CategoryScores; label: string;
  Icon: React.FC<any>; color: string;
  value: number; onChange: (v: number) => void;
}> = ({ label, Icon, color, value, onChange }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Icon size={11} className={color} />
        <span className="text-xs font-semibold text-gray-400">{label}</span>
      </div>
      <span className={`text-sm font-black ${value >= 8 ? 'text-[#00FFC6]' : value >= 5 ? 'text-white' : 'text-red-400'}`}>
        {value}
      </span>
    </div>
    <div className="flex gap-1">
      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}
          className={`flex-1 h-5 rounded text-[8px] font-black transition-all border
            ${value === n
              ? n >= 8 ? 'bg-[#00FFC6] border-[#00FFC6] text-black'
                : n >= 5 ? 'bg-white/20 border-white/40 text-white'
                : 'bg-red-500/20 border-red-500/40 text-red-400'
              : 'bg-white/[0.02] border-white/[0.08] text-gray-700 hover:border-white/20 hover:text-gray-400'}`}>
          {n}
        </button>
      ))}
    </div>
  </div>
);

// ── Score Form ────────────────────────────────────────────────────────────────
const ScoreForm: React.FC<{
  token: string;
  applicationId: string;
  existing: ScoreEntry | null;
  onSaved: (s: ScoreEntry) => void;
}> = ({ token, applicationId, existing, onSaved }) => {
  const [cats,    setCats]    = useState<CategoryScores>(existing?.categories ?? { ...DEFAULT_CATS });
  const [remarks, setRemarks] = useState(existing?.remarks ?? '');
  const [status,  setStatus]  = useState<Status>(existing?.status ?? 'hold');
  const [saving,  setSaving]  = useState(false);
  const [err,     setErr]     = useState('');

  const computedAvg = useMemo(() => {
    const vals = Object.values(cats) as number[];
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  }, [cats]);

  const setOneCat = (key: keyof CategoryScores, v: number) =>
    setCats(prev => ({ ...prev, [key]: v }));

  const save = async () => {
    setSaving(true); setErr('');
    try {
      const res = await fetch(`${API}/api/judge-auth/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ applicationId, categories: cats, overall: computedAvg, remarks, status }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.message || 'Failed to save'); return; }
      onSaved(data.score);
    } catch { setErr('Network error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-4 bg-white/[0.025] border border-white/[0.07] rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black text-[#00FFC6] uppercase tracking-[0.15em]">
          {existing ? 'Update Score' : 'Score This Candidate'}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-gray-600 uppercase tracking-wider">Avg</span>
          <span className={`text-2xl font-black ${computedAvg >= 7 ? 'text-[#00FFC6]' : computedAvg >= 5 ? 'text-white' : 'text-red-400'}`}>
            {computedAvg}
          </span>
          <span className="text-[10px] text-gray-600">/10</span>
        </div>
      </div>

      <div className="space-y-3 border border-white/[0.05] rounded-xl p-4 bg-white/[0.015]">
        {CATS.map(({ key, label, Icon, color }) => (
          <CatRow key={key} catKey={key} label={label} Icon={Icon} color={color}
            value={cats[key]} onChange={v => setOneCat(key, v)} />
        ))}
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-2">Decision</p>
        <div className="flex gap-2">
          {(['selected', 'hold', 'rejected'] as Status[]).map(s => (
            <button key={s} type="button" onClick={() => setStatus(s)}
              className={`flex-1 py-2 rounded-xl border text-xs font-bold capitalize transition-all
                ${status === s ? statusBg(s) + ' scale-[1.02]' : 'bg-white/[0.02] border-white/[0.08] text-gray-600 hover:border-white/15 hover:text-gray-300'}`}>
              {s === 'selected' && <CheckCircle2 size={11} className="inline mr-1 -mt-0.5" />}
              {s === 'rejected' && <XCircle      size={11} className="inline mr-1 -mt-0.5" />}
              {s === 'hold'     && <Clock        size={11} className="inline mr-1 -mt-0.5" />}
              {s}
            </button>
          ))}
        </div>
      </div>

      <textarea rows={3}
        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:border-[#00FFC6]/40 focus:outline-none resize-none leading-relaxed"
        placeholder="Interview notes, observations..."
        value={remarks} onChange={e => setRemarks(e.target.value)} />

      {err && <p className="text-xs text-red-400 flex items-center gap-1.5"><AlertCircle size={11} />{err}</p>}

      <button onClick={save} disabled={saving}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#00FFC6] hover:bg-[#00e5b3] disabled:bg-gray-800 disabled:text-gray-600 text-black font-bold text-sm transition-all">
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
        {saving ? 'Saving...' : existing ? 'Update Score' : 'Save Score'}
      </button>
    </div>
  );
};

// ── Detail Modal ──────────────────────────────────────────────────────────────
const DetailModal: React.FC<{
  app: Application;
  token: string;
  onClose: () => void;
  onScoreSaved: (appId: string, score: ScoreEntry) => void;
}> = ({ app, token, onClose, onScoreSaved }) => {
  const [localScore, setLocalScore] = useState<ScoreEntry | null>(app.myScore);

  const handleSaved = (s: ScoreEntry) => {
    setLocalScore(s);
    onScoreSaved(app._id, s);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
      style={{ background: 'rgba(3,5,7,0.88)', backdropFilter: 'blur(6px)' }}>
      <div className="relative w-full max-w-2xl bg-[#07090e] border border-white/[0.07] rounded-3xl shadow-2xl pb-8">

        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#07090e] border-b border-white/[0.05] rounded-t-3xl">
          <div className="flex items-center gap-3">
            {app.imageUrl
              ? <img src={app.imageUrl} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-[#00FFC6]/30" />
              : <div className="w-10 h-10 rounded-full bg-[#00FFC6]/10 border border-[#00FFC6]/20 flex items-center justify-center"><User size={16} className="text-[#00FFC6]" /></div>
            }
            <div>
              <p className="text-sm font-black text-white">{app.name}</p>
              <p className="text-[10px] text-gray-500">{app.rollNo} - {app.branch} {app.year} - Sec {app.section}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ScoreChip score={localScore} />
            <button onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Row label="Email"     value={app.email} />
            <Row label="Phone"     value={app.phone} />
            <Row label="Residence" value={app.residence} />
            {app.domain && app.domain.length > 0 && <Row label="Domain" value={app.domain.join(', ')} />}
            {app.linkedinProfile && <Row label="LinkedIn" value={app.linkedinProfile} />}
            {app.githubProfile   && <Row label="GitHub"   value={app.githubProfile} />}
          </div>

          {app.prevSociety && (
            <>
              <Divider title="Background" />
              <Row label="Society / Club" value={app.prevSociety} />
            </>
          )}

          {(app.softSkills || app.hardSkills) && (
            <>
              <Divider title="Skills" />
              <div className="grid grid-cols-2 gap-4">
                <Row label="Soft Skills" value={app.softSkills} />
                <Row label="Hard Skills" value={app.hardSkills} />
              </div>
            </>
          )}

          {app.projectsDesc && (
            <>
              <Divider title="Projects" />
              <Row label="Projects" value={app.projectsDesc} />
            </>
          )}

          {(app.introduction || app.strengths || app.weaknesses || app.achievements) && (
            <>
              <Divider title="About" />
              <div className="space-y-3">
                <Row label="Introduction" value={app.introduction} />
                <div className="grid grid-cols-2 gap-4">
                  <Row label="Strengths"  value={app.strengths} />
                  <Row label="Weaknesses" value={app.weaknesses} />
                </div>
                <Row label="Achievements" value={app.achievements} />
              </div>
            </>
          )}

          {app.whyJoin && (
            <>
              <Divider title="Why Flux?" />
              <div className="bg-[#00FFC6]/4 border border-[#00FFC6]/10 rounded-2xl p-4">
                <p className="text-sm text-gray-300 leading-relaxed">{app.whyJoin}</p>
              </div>
            </>
          )}

          {app.resumeUrl && (
            <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#00FFC6] hover:underline">
              <Paperclip size={13} /> View Resume
            </a>
          )}

          <Divider title="Your Score" />
          <ScoreForm token={token} applicationId={app._id} existing={localScore} onSaved={handleSaved} />
        </div>
      </div>
    </div>
  );
};

// ── App Card ──────────────────────────────────────────────────────────────────
const AppCard: React.FC<{ app: Application; onView: () => void }> = ({ app, onView }) => (
  <div className="bg-white/[0.02] border border-white/[0.06] hover:border-[#00FFC6]/20 rounded-2xl p-4 transition-all duration-200 hover:bg-white/[0.04] cursor-pointer group"
    onClick={onView}>
    <div className="flex items-start gap-3">
      {app.imageUrl
        ? <img src={app.imageUrl} alt="" className="w-11 h-11 rounded-full object-cover border-2 border-white/10 group-hover:border-[#00FFC6]/30 shrink-0" />
        : <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0"><User size={16} className="text-gray-600" /></div>
      }
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-white truncate">{app.name}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{app.rollNo} - {app.branch} - {app.year}</p>
          </div>
          <ScoreChip score={app.myScore} small />
        </div>
        {app.myScore?.categories && (
          <div className="mt-2 grid grid-cols-6 gap-1">
            {CATS.map(({ key, label, color }) => (
              <div key={key} title={`${label}: ${app.myScore!.categories[key]}`} className="flex flex-col items-center gap-0.5">
                <div className="w-full bg-white/[0.05] rounded-full h-1 overflow-hidden">
                  <div className={`h-full rounded-full ${catBg(color)}`}
                    style={{ width: `${app.myScore!.categories[key] * 10}%` }} />
                </div>
                <span className="text-[7px] text-gray-700">{app.myScore!.categories[key]}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <span className="text-[9px] text-gray-600 bg-white/[0.03] rounded-lg px-2 py-1 border border-white/[0.05]">Sec {app.section}</span>
          {app.domain?.map(d => (
            <span key={d} className="text-[9px] text-[#00FFC6]/60 bg-[#00FFC6]/5 rounded-lg px-2 py-1 border border-[#00FFC6]/10">{d}</span>
          ))}
          {app.resumeUrl && <span className="text-[9px] text-gray-600 bg-white/[0.03] rounded-lg px-2 py-1 border border-white/[0.05]">CV</span>}
        </div>
      </div>
      <Eye size={14} className="text-gray-700 group-hover:text-[#00FFC6] transition-colors shrink-0 mt-1" />
    </div>
  </div>
);

// ── Leaderboard Row ───────────────────────────────────────────────────────────
const LBRow: React.FC<{ entry: LeaderboardEntry; rank: number }> = ({ entry, rank }) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all
    ${rank === 1 ? 'bg-[#00FFC6]/5 border-[#00FFC6]/20' : rank === 2 ? 'bg-white/[0.03] border-white/[0.08]' : rank === 3 ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-transparent border-white/[0.04] hover:border-white/[0.08]'}`}>
    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0
      ${rank === 1 ? 'bg-[#00FFC6] text-black' : rank === 2 ? 'bg-white/20 text-white' : rank === 3 ? 'bg-white/10 text-gray-300' : 'text-gray-600'}`}>
      {rank <= 3 ? <Trophy size={12} /> : rank}
    </div>

    {entry.imageUrl
      ? <img src={entry.imageUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0" />
      : <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0"><User size={13} className="text-gray-600" /></div>
    }

    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-white truncate">{entry.name}</p>
      <p className="text-[10px] text-gray-500">{entry.rollNo} - {entry.branch}</p>
    </div>

    <div className="hidden sm:flex gap-2 items-center">
      {CATS.map(({ key, color, label }) => (
        <div key={key} title={`${label}: ${entry.avgCategories[key] || 0}`} className="flex flex-col items-center gap-0.5 w-6">
          <div className="w-full bg-white/[0.06] rounded-full h-10 flex flex-col-reverse overflow-hidden">
            <div className={`w-full rounded-b-full ${catBg(color)} opacity-70`}
              style={{ height: `${(entry.avgCategories[key] || 0) * 10}%` }} />
          </div>
          <span className="text-[7px] text-gray-700">{entry.avgCategories[key] || 0}</span>
        </div>
      ))}
    </div>

    <div className="text-right shrink-0">
      <p className={`text-xl font-black ${entry.avgOverall >= 7 ? 'text-[#00FFC6]' : entry.avgOverall >= 5 ? 'text-white' : 'text-red-400'}`}>
        {entry.avgOverall.toFixed(1)}
      </p>
      <div className="flex items-center gap-1 justify-end mt-0.5">
        {entry.consensusStatus && (
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${statusBg(entry.consensusStatus)}`}>
            {entry.consensusStatus}
          </span>
        )}
        <span className="text-[9px] text-gray-600">{entry.judgeCount}j</span>
      </div>
    </div>
  </div>
);

// ── Candidates Tab ────────────────────────────────────────────────────────────
const CandidatesTab: React.FC<{ token: string }> = ({ token }) => {
  const [apps,     setApps]     = useState<Application[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [err,      setErr]      = useState('');
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState<'all'|'scored'|'pending'|'selected'|'rejected'|'hold'>('all');
  const [selected, setSelected] = useState<Application | null>(null);
  const initialLoad = useRef(true);

  const load = useCallback(async (opts?: { showLoading?: boolean }) => {
    const showLoading = opts?.showLoading ?? initialLoad.current;
    if (showLoading) setLoading(true);
    setErr('');
    try {
      const res = await fetch(`${API}/api/judge-auth/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.message || 'Failed'); return; }
      setApps(data);
      setSelected(prev => (prev ? data.find(a => a._id === prev._id) ?? prev : prev));
    } catch { setErr('Network error'); }
    finally {
      if (showLoading) setLoading(false);
      initialLoad.current = false;
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        load({ showLoading: false });
      }
    }, 5000);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        load({ showLoading: false });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [load]);

  const handleScoreSaved = (appId: string, score: ScoreEntry) =>
    setApps(prev => prev.map(a => a._id === appId ? { ...a, myScore: score } : a));

  const total    = apps.length;
  const scored   = apps.filter(a => a.myScore).length;
  const pending  = total - scored;
  const selCount = apps.filter(a => a.myScore?.status === 'selected').length;
  const rejCount = apps.filter(a => a.myScore?.status === 'rejected').length;

  const visible = apps.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || a.name.toLowerCase().includes(q)
      || a.rollNo.toLowerCase().includes(q)
      || a.branch.toLowerCase().includes(q);
    const matchFilter =
      filter === 'all'     ? true  :
      filter === 'scored'  ? !!a.myScore :
      filter === 'pending' ? !a.myScore  :
      a.myScore?.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total',    value: total,    color: 'text-gray-300' },
          { label: 'Pending',  value: pending,  color: 'text-yellow-400' },
          { label: 'Scored',   value: scored,   color: 'text-blue-400' },
          { label: 'Selected', value: selCount, color: 'text-[#00FFC6]' },
          { label: 'Rejected', value: rejCount, color: 'text-red-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-3 text-center">
            <p className={`text-xl font-black ${color}`}>{value}</p>
            <p className="text-[9px] text-gray-600 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
          <input
            className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-700 focus:border-[#00FFC6]/40 focus:outline-none"
            placeholder="Search by name, roll, branch..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all','pending','scored','selected','hold','rejected'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border capitalize transition-all
                ${filter === f ? 'bg-[#00FFC6]/10 border-[#00FFC6]/30 text-[#00FFC6]' : 'bg-white/[0.02] border-white/[0.06] text-gray-500 hover:text-gray-300'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-600">
          <Loader2 size={18} className="animate-spin" /> Loading...
        </div>
      ) : err ? (
        <div className="flex items-center justify-center py-20 gap-2 text-red-400">
          <AlertCircle size={16} /> {err}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-16 text-gray-600">No candidates match this filter.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visible.map(app => (
            <AppCard key={app._id} app={app} onView={() => setSelected(app)} />
          ))}
        </div>
      )}

      {selected && (
        <DetailModal
          app={selected}
          token={token}
          onClose={() => setSelected(null)}
          onScoreSaved={(id, score) => {
            handleScoreSaved(id, score);
            setSelected(prev => prev?._id === id ? { ...prev, myScore: score } : prev);
          }}
        />
      )}
    </div>
  );
};

// ── Leaderboard Tab ───────────────────────────────────────────────────────────
const LeaderboardTab: React.FC<{ token: string }> = ({ token }) => {
  const [entries,  setEntries]  = useState<LeaderboardEntry[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [err,      setErr]      = useState('');
  const [search,   setSearch]   = useState('');
  const [statusF,  setStatusF]  = useState<'all'|Status>('all');
  const initialLoad = useRef(true);

  const load = useCallback(async (opts?: { showLoading?: boolean }) => {
    const showLoading = opts?.showLoading ?? initialLoad.current;
    if (showLoading) setLoading(true);
    setErr('');
    try {
      const res = await fetch(`${API}/api/judge-auth/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.message || 'Failed'); return; }
      setEntries(data);
    } catch { setErr('Network error'); }
    finally {
      if (showLoading) setLoading(false);
      initialLoad.current = false;
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        load({ showLoading: false });
      }
    }, 5000);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        load({ showLoading: false });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [load]);

  const visible = entries.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.rollNo.toLowerCase().includes(q);
    const matchStatus = statusF === 'all' || e.consensusStatus === statusF;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        {CATS.map(({ label, color, Icon }) => (
          <div key={label} className="flex items-center gap-1">
            <Icon size={10} className={color} />
            <span className="text-[9px] text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
          <input
            className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-700 focus:border-[#00FFC6]/40 focus:outline-none"
            placeholder="Search name, roll..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['all','selected','hold','rejected'] as const).map(f => (
            <button key={f} onClick={() => setStatusF(f)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border capitalize transition-all
                ${statusF === f ? 'bg-[#00FFC6]/10 border-[#00FFC6]/30 text-[#00FFC6]' : 'bg-white/[0.02] border-white/[0.06] text-gray-500 hover:text-gray-300'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-600">
          <Loader2 size={18} className="animate-spin" /> Loading leaderboard...
        </div>
      ) : err ? (
        <div className="flex items-center justify-center py-20 gap-2 text-red-400">
          <AlertCircle size={16} /> {err}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-16 text-gray-600">No scored candidates yet.</div>
      ) : (
        <div className="space-y-2">
          {visible.map((e, i) => <LBRow key={e._id} entry={e} rank={i + 1} />)}
        </div>
      )}
    </div>
  );
};

// ── Login Screen ──────────────────────────────────────────────────────────────
const LoginScreen: React.FC<{ onLogin: (token: string, judge: JudgeInfo) => void }> = ({ onLogin }) => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      const res = await fetch(`${API}/api/judge-auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.message || 'Login failed'); return; }
      onLogin(data.token, data.judge);
    } catch { setErr('Network error - is the server running?'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#030507] flex items-center justify-center px-4">
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'radial-gradient(#00FFC6 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00FFC6]/6 blur-[180px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00FFC6]/10 border border-[#00FFC6]/20 mb-4">
            <Star size={28} className="text-[#00FFC6]" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Flux Judge Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Induction Interview 2025-26</p>
        </div>

        <div className="bg-white/[0.025] border border-white/[0.07] rounded-3xl p-8">
          <p className="text-[10px] font-bold text-[#00FFC6] uppercase tracking-[0.15em] mb-6">Team Login</p>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300">Email</label>
              <input type="email" required autoFocus
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:border-[#00FFC6]/50 focus:outline-none transition-all"
                placeholder="your@email.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300">
                Password
              </label>
              <input type="text" required
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:border-[#00FFC6]/50 focus:outline-none transition-all"
                placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {err && <p className="text-xs text-red-400 flex items-center gap-1.5"><AlertCircle size={12} />{err}</p>}
            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#00FFC6] hover:bg-[#00e5b3] disabled:bg-gray-800 disabled:text-gray-600 text-black font-bold text-sm transition-all mt-2">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <LogIn size={14} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-[10px] text-gray-700 text-center mt-6">
            Only registered second-year Flux team members can access this panel.
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Dashboard Shell ───────────────────────────────────────────────────────────
type Tab = 'candidates' | 'leaderboard';

const Dashboard: React.FC<{ token: string; judge: JudgeInfo; onLogout: () => void }> = ({ token, judge, onLogout }) => {
  const navigate  = useNavigate();
  const { pathname } = useLocation();
  const tab: Tab  = pathname.endsWith('leaderboard') ? 'leaderboard' : 'candidates';
  const setTab    = (t: Tab) => navigate(`/judge-panel/${t}`, { replace: true });

  return (
    <div className="min-h-screen bg-[#030507] text-white">
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.012]"
          style={{ backgroundImage: 'radial-gradient(#00FFC6 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[#00FFC6]/4 blur-[160px]" />
      </div>

      <div className="sticky top-0 z-30 bg-[#030507]/90 border-b border-white/[0.05] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00FFC6]/10 border border-[#00FFC6]/20 flex items-center justify-center">
              <Star size={14} className="text-[#00FFC6]" />
            </div>
            <div>
              <p className="text-sm font-black text-white">Flux Judge Panel</p>
              <p className="text-[10px] text-gray-600">Induction Interviews</p>
            </div>
          </div>

          <div className="flex rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            {([
              { key: 'candidates' as Tab,  label: 'Candidates',  Icon: Users  },
              { key: 'leaderboard' as Tab, label: 'Leaderboard', Icon: Trophy },
            ]).map(({ key, label, Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-all
                  ${tab === key ? 'bg-[#00FFC6]/10 text-[#00FFC6]' : 'text-gray-500 hover:text-gray-300'}`}>
                <Icon size={12} />{label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-gray-300">{judge.name}</p>
              <p className="text-[10px] text-gray-600">{judge.email}</p>
            </div>
            <button onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors px-3 py-2 rounded-xl hover:bg-red-500/5 border border-transparent hover:border-red-500/15">
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'candidates'  ? <CandidatesTab  token={token} /> : <LeaderboardTab token={token} />}
      </div>
    </div>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
const JudgePanel: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => {
    try { return sessionStorage.getItem(STORAGE_KEY); } catch { return null; }
  });
  const [judge, setJudge] = useState<JudgeInfo | null>(() => {
    try {
      const raw = sessionStorage.getItem('flux_judge_info');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  const handleLogin = (t: string, j: JudgeInfo) => {
    sessionStorage.setItem(STORAGE_KEY, t);
    sessionStorage.setItem('flux_judge_info', JSON.stringify(j));
    setToken(t); setJudge(j);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem('flux_judge_info');
    setToken(null); setJudge(null);
  };

  if (!token || !judge) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard token={token} judge={judge} onLogout={handleLogout} />;
};

export default JudgePanel;
