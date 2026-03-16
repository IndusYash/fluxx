import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, X, User, Mail, Phone, ExternalLink, GitBranch,
    Loader2, AlertCircle, Users, ChevronDown, ChevronUp, Eye, EyeOff,
    Linkedin,
} from 'lucide-react';

const API = (import.meta as any).env?.VITE_REG_API_URL || '';
const ADMIN_PASSWORD = 'flux@admin2025';

interface Candidate {
    _id: string;
    name: string;
    rollNo: string;
    branch: string;
    year: string;
    section?: string;
    email: string;
    phone: string;
    residence?: string;
    linkedinProfile?: string;
    githubProfile?: string;
    domain?: string[];
    domainReason?: string;
    prevSociety?: string;
    prevRole?: string;
    availability?: string;
    softSkills?: string;
    hardSkills?: string;
    dsaLevel?: string;
    leetcodeHandle?: string;
    codeforcesHandle?: string;
    codechefHandle?: string;
    projectsDesc?: string;
    achievements?: string;
    introduction?: string;
    strengths?: string;
    weaknesses?: string;
    whyJoin?: string;
    expectation?: string;
    imageUrl?: string;
    resumeUrl?: string;
    createdAt: string;
}

const Field: React.FC<{ label: string; value?: string | string[] }> = ({ label, value }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    const display = Array.isArray(value) ? value.join(', ') : value;
    return (
        <div className="mb-3">
            <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
            <p className="text-sm text-gray-200 mt-0.5 whitespace-pre-wrap">{display}</p>
        </div>
    );
};

const CandidateModal: React.FC<{ candidate: Candidate; onClose: () => void }> = ({ candidate, onClose }) => (
    <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        onClick={onClose}
    >
        <div
            className="relative bg-[#0d0d0d] border border-[#4ade80]/20 rounded-2xl w-full max-w-2xl my-8 p-6"
            onClick={e => e.stopPropagation()}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
                <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                {candidate.imageUrl ? (
                    <img
                        src={candidate.imageUrl}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#4ade80]/40"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center">
                        <User size={28} className="text-[#4ade80]" />
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
                    <p className="text-sm text-gray-400">{candidate.rollNo} · {candidate.branch} · {candidate.year}</p>
                    {candidate.domain && candidate.domain.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                            {candidate.domain.map(d => (
                                <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80]">
                                    {d}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mb-6">
                <a href={`mailto:${candidate.email}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                    <Mail size={13} /> {candidate.email}
                </a>
                <a href={`tel:${candidate.phone}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                    <Phone size={13} /> {candidate.phone}
                </a>
                {candidate.linkedinProfile && (
                    <a href={candidate.linkedinProfile} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        <Linkedin size={13} /> LinkedIn
                    </a>
                )}
                {candidate.githubProfile && (
                    <a href={candidate.githubProfile} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                        <GitBranch size={13} /> GitHub
                    </a>
                )}
                {candidate.resumeUrl && (
                    <a href={candidate.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                        <ExternalLink size={13} /> Resume
                    </a>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <div>
                    <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider mb-3 border-b border-[#4ade80]/10 pb-1">Personal</p>
                    <Field label="Section" value={candidate.section} />
                    <Field label="Residence" value={candidate.residence} />
                    <Field label="Availability" value={candidate.availability} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider mb-3 border-b border-[#4ade80]/10 pb-1">Previous Experience</p>
                    <Field label="Society" value={candidate.prevSociety} />
                    <Field label="Role" value={candidate.prevRole} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider mb-3 border-b border-[#4ade80]/10 pb-1">Skills</p>
                    <Field label="Hard Skills" value={candidate.hardSkills} />
                    <Field label="Soft Skills" value={candidate.softSkills} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider mb-3 border-b border-[#4ade80]/10 pb-1">Coding</p>
                    <Field label="DSA Level" value={candidate.dsaLevel} />
                    <Field label="LeetCode" value={candidate.leetcodeHandle} />
                    <Field label="Codeforces" value={candidate.codeforcesHandle} />
                    <Field label="CodeChef" value={candidate.codechefHandle} />
                </div>
            </div>

            <div className="mt-4 space-y-1">
                <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider mb-3 border-b border-[#4ade80]/10 pb-1">Essays</p>
                <Field label="Introduction" value={candidate.introduction} />
                <Field label="Domain Reason" value={candidate.domainReason} />
                <Field label="Why Join" value={candidate.whyJoin} />
                <Field label="Strengths" value={candidate.strengths} />
                <Field label="Weaknesses" value={candidate.weaknesses} />
                <Field label="Expectation" value={candidate.expectation} />
                <Field label="Projects" value={candidate.projectsDesc} />
                <Field label="Achievements" value={candidate.achievements} />
            </div>

            <p className="text-xs text-gray-600 mt-4">
                Applied: {new Date(candidate.createdAt).toLocaleString('en-IN')}
            </p>
        </div>
    </div>
);

const CandidateRow: React.FC<{ candidate: Candidate; index: number; onClick: () => void }> = ({ candidate, index, onClick }) => (
    <tr
        className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
        onClick={onClick}
    >
        <td className="px-4 py-3 text-sm text-gray-500 w-10">{index + 1}</td>
        <td className="px-4 py-3">
            <div className="flex items-center gap-3">
                {candidate.imageUrl ? (
                    <img src={candidate.imageUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-[#4ade80]/30 flex-shrink-0" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-[#4ade80]" />
                    </div>
                )}
                <div>
                    <p className="text-sm font-medium text-white">{candidate.name}</p>
                    <p className="text-xs text-gray-500">{candidate.email}</p>
                </div>
            </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-300 hidden sm:table-cell">{candidate.rollNo}</td>
        <td className="px-4 py-3 text-sm text-gray-300 hidden md:table-cell">{candidate.branch}</td>
        <td className="px-4 py-3 text-sm text-gray-300 hidden lg:table-cell">{candidate.year}</td>
        <td className="px-4 py-3 hidden md:table-cell">
            <div className="flex flex-wrap gap-1">
                {(candidate.domain || []).slice(0, 2).map(d => (
                    <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80]">
                        {d}
                    </span>
                ))}
                {(candidate.domain || []).length > 2 && (
                    <span className="text-xs text-gray-500">+{candidate.domain!.length - 2}</span>
                )}
            </div>
        </td>
        <td className="px-4 py-3">
            <button className="text-xs text-[#4ade80]/70 hover:text-[#4ade80] flex items-center gap-1 transition-colors">
                <Eye size={13} /> View
            </button>
        </td>
    </tr>
);

export default function CandidatesPage() {
    const [authed, setAuthed] = useState(false);
    const [pwInput, setPwInput] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [pwError, setPwError] = useState('');

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [filterBranch, setFilterBranch] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterDomain, setFilterDomain] = useState('');
    const [selected, setSelected] = useState<Candidate | null>(null);

    const [sortField, setSortField] = useState<'name' | 'branch' | 'year' | 'createdAt'>('createdAt');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    // Check session
    useEffect(() => {
        if (sessionStorage.getItem('flux_admin_ok') === '1') setAuthed(true);
    }, []);

    const handleLogin = () => {
        if (pwInput === ADMIN_PASSWORD) {
            sessionStorage.setItem('flux_admin_ok', '1');
            setAuthed(true);
            setPwError('');
        } else {
            setPwError('Incorrect password.');
        }
    };

    useEffect(() => {
        if (!authed) return;
        setLoading(true);
        setError('');
        fetch(`${API}/api/applications`)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data: Candidate[]) => setCandidates(data))
            .catch(e => setError(e.message || 'Failed to fetch candidates'))
            .finally(() => setLoading(false));
    }, [authed]);

    // Derived values for filters
    const branches = useMemo(() => [...new Set(candidates.map(c => c.branch))].sort(), [candidates]);
    const years = useMemo(() => [...new Set(candidates.map(c => c.year))].sort(), [candidates]);
    const domains = useMemo(() => {
        const all = candidates.flatMap(c => c.domain || []);
        return [...new Set(all)].sort();
    }, [candidates]);

    const filtered = useMemo(() => {
        let list = [...candidates];

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.rollNo.toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q) ||
                c.branch.toLowerCase().includes(q)
            );
        }
        if (filterBranch) list = list.filter(c => c.branch === filterBranch);
        if (filterYear) list = list.filter(c => c.year === filterYear);
        if (filterDomain) list = list.filter(c => (c.domain || []).includes(filterDomain));

        list.sort((a, b) => {
            const va = a[sortField] ?? '';
            const vb = b[sortField] ?? '';
            const cmp = String(va).localeCompare(String(vb));
            return sortDir === 'asc' ? cmp : -cmp;
        });

        return list;
    }, [candidates, search, filterBranch, filterYear, filterDomain, sortField, sortDir]);

    const toggleSort = (field: typeof sortField) => {
        if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortField(field); setSortDir('asc'); }
    };

    const SortIcon = ({ field }: { field: typeof sortField }) =>
        sortField === field
            ? sortDir === 'asc' ? <ChevronUp size={13} className="inline ml-1" /> : <ChevronDown size={13} className="inline ml-1" />
            : null;

    // ── Login screen ──────────────────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-[#0d0d0d] border border-[#4ade80]/20 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center">
                            <Users size={20} className="text-[#4ade80]" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white">Candidates Panel</h1>
                            <p className="text-xs text-gray-500">Admin access required</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={pwInput}
                                onChange={e => setPwInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                                placeholder="Enter admin password"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#4ade80]/50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(s => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>

                        {pwError && (
                            <p className="text-xs text-red-400 flex items-center gap-1">
                                <AlertCircle size={12} /> {pwError}
                            </p>
                        )}

                        <button
                            onClick={handleLogin}
                            className="w-full bg-[#4ade80] text-black font-semibold py-3 rounded-lg text-sm hover:bg-[#22c55e] transition-colors"
                        >
                            Access Panel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Main panel ────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-black text-white">
            {selected && <CandidateModal candidate={selected} onClose={() => setSelected(null)} />}

            {/* Header */}
            <div className="border-b border-white/10 bg-[#0a0a0a] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center">
                        <Users size={18} className="text-[#4ade80]" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-white">Candidates</h1>
                        <p className="text-xs text-gray-500">Flux Induction {new Date().getFullYear()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80] px-3 py-1 rounded-full">
                        {filtered.length} / {candidates.length} candidates
                    </span>
                    <button
                        onClick={() => { sessionStorage.removeItem('flux_admin_ok'); setAuthed(false); }}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <div className="relative flex-1 min-w-48">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search name, roll no, email..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#4ade80]/40"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <select
                        value={filterBranch}
                        onChange={e => setFilterBranch(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4ade80]/40"
                    >
                        <option value="">All Branches</option>
                        {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>

                    <select
                        value={filterYear}
                        onChange={e => setFilterYear(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4ade80]/40"
                    >
                        <option value="">All Years</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>

                    <select
                        value={filterDomain}
                        onChange={e => setFilterDomain(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4ade80]/40"
                    >
                        <option value="">All Domains</option>
                        {domains.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                {/* Content */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={32} className="text-[#4ade80] animate-spin" />
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="rounded-xl border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                                        <th
                                            className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-white"
                                            onClick={() => toggleSort('name')}
                                        >
                                            Candidate <SortIcon field="name" />
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Roll No</th>
                                        <th
                                            className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell cursor-pointer hover:text-white"
                                            onClick={() => toggleSort('branch')}
                                        >
                                            Branch <SortIcon field="branch" />
                                        </th>
                                        <th
                                            className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:text-white"
                                            onClick={() => toggleSort('year')}
                                        >
                                            Year <SortIcon field="year" />
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Domain</th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((c, i) => (
                                        <CandidateRow
                                            key={c._id}
                                            candidate={c}
                                            index={i}
                                            onClick={() => setSelected(c)}
                                        />
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-12 text-center text-gray-500 text-sm">
                                                No candidates match the current filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
