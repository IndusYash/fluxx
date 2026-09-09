import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Linkedin, Users, Award, GraduationCap, Sparkles, ChevronDown
} from 'lucide-react';

// ─── Image Imports ─────────────────────────────────────────────────────────────

// Faculty
import shwetSirImage from "../../assets/images/shwetSir.webp";
import satvikSirImage from "../../assets/images/SatvikSir.webp";

// Alumni
import presidentImage from "../../assets/images/president.webp";
import anantImage from "../../assets/images/Anant Mishra.webp";
import priyaBbaImage from "../../assets/images/Priya Singh.jpg";

// Administration
import shivammishraImage from "../../assets/images/Shivam_Mishra.jpeg";
import ysvImage         from "../../assets/images/ysv.webp";
import Aviral           from "../../assets/images/Aviral.webp";
import threeMImage      from "../../assets/images/3m.webp";
import Shubham          from "../../assets/images/Shubham.webp";
import jaiKumarImage    from "../../assets/images/JaiKumar.webp";
import priyaSinghImage  from "../../assets/images/Priya.jpeg";
import princeSahuImage  from "../../assets/images/Prince.jpeg";
import sudeekshaImage   from "../../assets/images/Sudeeksha.jpeg";

// Development
import aryanImage    from "../../assets/images/Aryan.webp";
import Prad          from "../../assets/images/Pradyuman.webp";
import atulKumarImage from "../../assets/images/Atul.jpeg";
import rishiImage    from "../../assets/images/Rishi.jpeg";

// Design
import Ananya             from "../../assets/images/Ananya.webp";
import Tamanna            from "../../assets/images/Tamanna.webp";
import abhigyanVardhanImage from "../../assets/images/AbhigyanVardhan.webp";
import stutiTripathiImage from "../../assets/images/StutiTripathi .webp";

// Photography & Video
import Aman           from "../../assets/images/Aman Rawat.webp";
import surajKumarImage from "../../assets/images/SurajKumar .webp";

// Algorithms
import ashishImage       from "../../assets/images/ashish.webp";
import shivamsinghImage  from "../../assets/images/shivamsingh.webp";
import devanshKumarImage from "../../assets/images/Devansh.jpeg";
import prakharShuklaImage from "../../assets/images/PrakharShukla.webp";
import rohanJaiswalImage  from "../../assets/images/RohanJaiswal .webp";
import sameerChauhanImage from "../../assets/images/SameerSingh.webp";

// AI & ML
import RiyaImage            from "../../assets/images/Riya Verma.webp";
import vmishraImage         from "../../assets/images/Vish.webp";
import anushkaChaudharyImage from "../../assets/images/AnushkaChaudhary .webp";
import ayushSharmaImage     from "../../assets/images/AyushSharma.webp";

// Content & Social Media
import Anushka            from "../../assets/images/Anuphoto - Anushka Singh.webp";
import anshikaTripathiImage from "../../assets/images/AnshikaTripathi  .webp";
import auchityaKumarImage  from "../../assets/images/AuchityaKumar.webp";
import divejSinghImage     from "../../assets/images/DivejSingh.webp";
import harshVermaImage     from "../../assets/images/HarshVerma.webp";
import nikhilJaiswalImage  from "../../assets/images/NikhilJaiswal .webp";

// Freshmen
import sundaramDubeyImage from "../../assets/images/Sundaram Dubey.webp";
import deepakShivhareImage from "../../assets/images/Deepak Shivhare.webp";
import aashishKumarImage from "../../assets/images/Aashish kumar.webp";
import ankitKumarImage from "../../assets/images/Ankit Kumar.webp";
import saumyjeetKumarImage from "../../assets/images/Saumyjeet kumar.webp";
import anuradhaSrivastavaImage from "../../assets/images/Anuradha Srivastava.webp";
import khushiPatelImage from "../../assets/images/Khushi Patel.webp";
import anshYadavImage from "../../assets/images/Ansh Yadav.webp";
import arpitaMishraImage from "../../assets/images/Arpita Mishra.webp";
import pradumnaManuImage from "../../assets/images/Pradumna Manu.webp";
import vinitKumarImage from "../../assets/images/VINIT RAJENDRA KUMAR.webp";
import adityaGuptaImage from "../../assets/images/Aditya Gupta.webp";
import piyushKumarImage from "../../assets/images/piyush kumar.webp";
import himanshuMauryaImage from "../../assets/images/HIMANSHU MAURYA.webp";
import sakshiRanaImage from "../../assets/images/Sakshi rana.webp";
import adityaYadavImage from "../../assets/images/Aditya yadav.webp";
import rishirajImage from "../../assets/images/rishiraj.webp";
import ritishaImage from "../../assets/images/ritisha.webp";
import utkarshImage from "../../assets/images/Utkarsh.png";
import shrutiTripathiImage from "../../assets/images/struti.jpeg";
import adityaShuklaImage from "../../assets/images/AdityaShukla.jpeg";
import aditiVermaImage from "../faculty/Aditi.jpeg";
import mahakSinghImage from "../../assets/images/Mahak.jpeg";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Member {
  name: string;
  role: string;
  branch: string;
  batch: string;
  email: string;
  linkedin: string;
  image: string;
  imagePosition?: string;
  color?: string;
}

// ─── Accent Colors ─────────────────────────────────────────────────────────────
const C = {
  admin:   '#E5E5E5',
  domain:  '#E5E5E5',
  dev:     '#E5E5E5',
  design:  '#E5E5E5',
  photo:   '#E5E5E5',
  algo:    '#E5E5E5',
  aiml:    '#E5E5E5',
  content: '#E5E5E5',
  alumni:  '#E5E5E5',
  exec:    '#E5E5E5',
};

// ─── Animated Counter Hook ─────────────────────────────────────────────────────
const useCountUp = (end: number, duration = 1800) => {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  React.useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return { count, ref };
};

// ─── Floating Orb Background ──────────────────────────────────────────────────
const FloatingOrbs: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { top: '5%', left: '8%', size: 400, color: '#E5E5E5', delay: 0 },
      { top: '40%', left: '82%', size: 300, color: '#FFFFFF', delay: 2 },
      { top: '65%', left: '12%', size: 250, color: '#E5E5E5', delay: 4 },
      { top: '20%', left: '55%', size: 220, color: '#FFFFFF', delay: 1 },
      { top: '80%', left: '65%', size: 350, color: '#E5E5E5', delay: 3 },
      { top: '50%', left: '40%', size: 180, color: '#FFFFFF', delay: 5 },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          top: orb.top,
          left: orb.left,
          width: orb.size,
          height: orb.size,
          background: `radial-gradient(circle, ${orb.color}06 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
        animate={{
          y: [0, -40, 0, 40, 0],
          x: [0, 25, 0, -25, 0],
          scale: [1, 1.15, 1, 0.9, 1],
        }}
        transition={{
          duration: 25 + i * 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: orb.delay,
        }}
      />
    ))}

    {/* Grid mesh overlay */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  </div>
);

// ─── Faculty Card ──────────────────────────────────────────────────────────────
const FacultyCard: React.FC<{ m: Member; idx: number }> = ({ m, idx }) => {
  const [err, setErr] = useState(false);
  const src = !m.image || err
    ? `https://i.pravatar.cc/300?img=${(idx % 70) + 1}`
    : m.image;
  const color = m.color || '#E5E5E5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col items-center text-center"
    >
      {/* Photo with animated ring */}
      <div className="relative mb-6">
        {/* Rotating conic gradient ring */}
        <motion.div
          className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color}80, transparent 80%, ${color})`,
            filter: 'blur(3px)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Shimmer overlay */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/25 transition-all duration-500">
          <img
            src={src}
            alt={m.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            onError={() => setErr(true)}
          />
          {/* Shine sweep on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, transparent 50%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Glow behind photo */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10 blur-xl"
          style={{ background: color }}
        />
      </div>

      {/* Name */}
      <h3
        className="text-white font-bold text-xl sm:text-2xl mb-2 tracking-wide group-hover:tracking-wider transition-all duration-500"
      >
        {m.name}
      </h3>

      {/* Role badge */}
      <span
        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:scale-105"
        style={{
          backgroundColor: `${color}12`,
          color: color,
          border: `1px solid ${color}25`,
          boxShadow: `0 0 0 0 ${color}00`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLSpanElement).style.boxShadow = `0 0 20px ${color}20`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLSpanElement).style.boxShadow = `0 0 0 0 ${color}00`;
        }}
      >
        <Award size={12} />
        {m.role}
      </span>
    </motion.div>
  );
};

// ─── MemberCard with 3D Tilt ───────────────────────────────────────────────────
const MemberCard: React.FC<{ m: Member; idx: number }> = ({ m, idx }) => {
  const [err, setErr] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const src = !m.image || err
    ? `https://i.pravatar.cc/300?img=${(idx % 70) + 1}`
    : m.image;

  const color = m.color || C.dev;

  // 3D tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: (idx % 12) * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex justify-center w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card-outline group relative w-full aspect-[3/4] max-w-[280px] rounded-2xl overflow-hidden cursor-pointer will-change-transform"
        style={{
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${color}10`;
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.4)';
        }}
      >
        {/* Background Image */}
        <img
          src={src}
          alt={m.name}
          className={`absolute inset-0 w-full h-full object-cover ${m.imagePosition ?? 'object-center'} transition-transform duration-700 group-hover:scale-110`}
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          onError={() => setErr(true)}
        />

        {/* Persistent bottom gradient for name */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Full overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/75 to-[#020202]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Accent top edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Accent bottom edge glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        />

        {/* Always-visible name at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white font-bold text-lg tracking-wide line-clamp-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {m.name}
          </h3>
          <p className="text-[11px] font-semibold tracking-wider uppercase mt-0.5 drop-shadow-lg" style={{ color: `${color}cc` }}>
            {m.role}
          </p>
        </div>

        {/* Hover content - slides up */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10 text-left">

          {/* Branch badge */}
          {m.branch && (
            <span
              className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 self-start"
              style={{
                backgroundColor: `${color}18`,
                color: color,
                border: `1px solid ${color}35`,
                backdropFilter: 'blur(8px)',
                boxShadow: `0 2px 12px ${color}12`,
              }}
            >
              {m.branch}
            </span>
          )}

          <h3 className="text-white font-bold text-2xl mb-1 tracking-wide leading-tight line-clamp-1">
            {m.name}
          </h3>

          <p className="text-xs font-semibold mb-4 tracking-wider uppercase line-clamp-1" style={{ color }}>
            {m.role}
          </p>

          {/* Social Links */}
          <div className="flex gap-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
            {m.email && (
              <a
                href={`mailto:${m.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${color}25`;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}50`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 15px ${color}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                <Mail size={14} className="text-white" />
              </a>
            )}
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${color}25`;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}50`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 15px ${color}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                <Linkedin size={14} className="text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Team: React.FC<{ isMobile?: boolean }> = () => {

  const allMembers: Member[] = [
    // ── Alumni ──
    { name: 'Shivam Rai', role: 'President 2025-26', branch: 'CSE', batch: "'26", email: 'president@flux.edu', linkedin: 'https://www.linkedin.com/in/shivam-rai-a64b84298/', image: presidentImage, color: C.alumni },
    { name: 'Anant Mishra', role: "BBA'26", branch: '', batch: "'26", email: '', linkedin: '', image: anantImage, color: C.alumni },
    { name: 'Priya', role: "BBA'26", branch: '', batch: "'26", email: '', linkedin: '', image: priyaBbaImage, color: C.alumni },

    // ── Batch 2027 (Final Year) ──
    { name: 'Shivam Mishra', role: 'President', branch: 'CSE', batch: "'27", email: 'shivammishra01329@gmail.com', linkedin: 'https://www.linkedin.com/in/shiv9918', image: shivammishraImage, color: C.admin },
    { name: 'Yashasvi Sharma', role: 'Vice President', branch: 'CSE', batch: "'27", email: 'yashasvisharma650@gmail.com', linkedin: 'https://www.linkedin.com/in/yashasvi-sharma-688245294', image: ysvImage, color: C.admin },
    { name: 'Aviral Omar', role: 'Head of Operations', branch: 'ChE', batch: "'27", email: 'aviralmaster@gmail.com', linkedin: 'https://www.linkedin.com/in/aviral-omar-763878294', image: Aviral, color: C.admin },
    { name: 'Yashvardhan Ojha', role: 'Additional Coordinator', branch: 'CSE', batch: "'27", email: '2023021270@mmmut.ac.in', linkedin: 'https://www.linkedin.com/in/yashvardhann/', image: threeMImage, color: C.admin },
    { name: 'Shubham Rai', role: 'Treasurer', branch: 'CSE', batch: "'27", email: 'kuvar2003@gmail.com', linkedin: 'https://www.linkedin.com/in/shubham-rai-866b2b294/', image: Shubham, color: C.admin },
    { name: 'Aryan S. Shandilya', role: 'Development Head', branch: 'CSE', batch: "'27", email: 'aryanacc28@gmail.com', linkedin: 'https://www.linkedin.com/in/aryan-s-shandilya', image: aryanImage, color: C.dev },
    { name: 'Pradyumn Agrahari', role: 'Development Head', branch: 'CSE', batch: "'27", email: 'pradyumnagrahari111@gmail.com', linkedin: 'https://www.linkedin.com/in/pradyumn-a-09b209277', image: Prad, color: C.dev },
    { name: 'Ananya', role: 'Design Head', branch: 'CE', batch: "'27", email: 'ananyar0912@gmail.com', linkedin: 'https://www.linkedin.com/in/ananya-mmmut', image: Ananya, color: C.design },
    { name: 'Tamanna Sharma', role: 'Design Head', branch: 'EE', batch: "'27", email: 'tamanna.sharma9929knp@gmail.com', linkedin: 'https://www.linkedin.com/in/tamanna-sharma-b3290a294/', image: Tamanna, color: C.design },
    { name: 'Aman Kumar Rawat', role: 'Photography & Video Head', branch: 'ME', batch: "'27", email: 'amankrawat.ds@gmail.com', linkedin: 'https://www.linkedin.com/in/amankrrawat/', image: Aman, color: C.photo },
    { name: 'Ashish Kumar Yadav', role: 'Algorithms Head', branch: 'CSE', batch: "'27", email: 'kumaryadavashish390@gmail.com', linkedin: 'https://in.linkedin.com/in/ashish-yadav-040730225', image: ashishImage, color: C.algo },
    { name: 'Shivam Singh', role: 'Algorithms Head', branch: 'CSE', batch: "'27", email: 'shivamsingh221045@gmail.com', linkedin: 'https://www.linkedin.com/in/shivam451/', image: shivamsinghImage, color: C.algo },
    { name: 'Riya Verma', role: 'AI & ML Head', branch: 'CSE', batch: "'27", email: 'riya.verma7202@gmail.com', linkedin: 'https://www.linkedin.com/in/riya-verma-28b461289/', image: RiyaImage, color: C.aiml },
    { name: 'Vishesh Mishra', role: 'AI & ML Head', branch: 'CSE', batch: "'27", email: 'mishravishesh1403@gmail.com', linkedin: 'https://www.linkedin.com/in/vishesh-mishra-372784218/', image: vmishraImage, color: C.aiml },
    { name: 'Anushka Singh', role: 'Content & Social Media Head', branch: 'CSE', batch: "'27", email: 'anuskajiya@gmail.com', linkedin: 'https://www.linkedin.com/in/anushkasingh-a18a25318/', image: Anushka, color: C.content },

    // ── Batch 2028 (Pre-Final Year) ──
    { name: 'Jai Kumar Singh', role: 'Joint Secretary', branch: 'CSE', batch: "'28", email: 'jaikumarsingh1920@gmail.com', linkedin: 'https://www.linkedin.com/in/jai-kumar-singh-9b3152319', image: jaiKumarImage, color: C.admin },
    { name: 'Priya Singh', role: 'Joint Secretary', branch: 'CSE', batch: "'28", email: 'singhshruti4131@gmail.com', linkedin: 'https://www.linkedin.com/in/priya-singh-393bb82b7', image: priyaSinghImage, color: C.admin },
    { name: 'Prince Sahu', role: 'Operations Coordinator', branch: 'CSE', batch: "'28", email: 'sahuprinceguru@gmail.com', linkedin: 'https://linkedin.com/in/prince-sahu-552382326/', image: princeSahuImage, color: C.admin },
    { name: 'Sudeeksha', role: 'Operations Coordinator', branch: 'IT', batch: "'28", email: 'sudeeksha.prakash04@gmail.com', linkedin: 'https://www.linkedin.com/in/sudeeksha-sudeeksha-45ba4228b', image: sudeekshaImage, color: C.admin },
    { name: 'Atul Kumar Thakur', role: 'Development Lead', branch: 'IT', batch: "'28", email: 'atulkumarthakur155@gmail.com', linkedin: 'https://www.linkedin.com/in/atul1574', image: atulKumarImage, color: C.dev },
    { name: 'Rishi', role: 'Development Lead', branch: 'IT', batch: "'28", email: 'rishidiwakar925@gmail.com', linkedin: 'https://www.linkedin.com/in/rishi-diwakar-a87b86263/', image: rishiImage, color: C.dev },
    { name: 'Abhigyan Vardhan Singh', role: 'Design Lead', branch: 'IT', batch: "'28", email: 'abhigyansingh590@gmail.com', linkedin: 'https://www.linkedin.com/in/abhigyan-vardhan-singh-81aa292a5', image: abhigyanVardhanImage, color: C.design },
    { name: 'Stuti Tripathi', role: 'Design Lead', branch: 'CSE', batch: "'28", email: 'stuticse28@gmail.com', linkedin: 'https://www.linkedin.com/in/stuti-tripathi-534440328', image: stutiTripathiImage, color: C.design },
    { name: 'Suraj Kumar', role: 'Photography & Video Lead', branch: 'CSE', batch: "'28", email: 'st12365489@gmail.com', linkedin: 'https://www.linkedin.com/in/suraj-thakur7080933', image: surajKumarImage, color: C.photo },
    { name: 'Devansh Kumar Yadav', role: 'Algorithms Lead', branch: 'CSE', batch: "'28", email: 'dkyadav020806@gmail.com', linkedin: 'https://www.linkedin.com/in/devansh-kumar-yadav-4a8146329', image: devanshKumarImage, color: C.algo },
    { name: 'Prakhar Shukla', role: 'Algorithms Lead', branch: 'CSE', batch: "'28", email: 'prakharshukla89508@gmail.com', linkedin: 'https://www.linkedin.com/in/prakhar-shukla-22aa10316', image: prakharShuklaImage, color: C.algo },
    { name: 'Rohan Jaiswal', role: 'Algorithms Lead', branch: 'CSE', batch: "'28", email: 'rohanjaiswal611@gmail.com', linkedin: 'https://www.linkedin.com/in/rohan-jaiswal-807338328', image: rohanJaiswalImage, color: C.algo },
    { name: 'Sameer Singh Chauhan', role: 'Algorithms Lead', branch: 'CSE', batch: "'28", email: 'itx.sameersinghchauhan@gmail.com', linkedin: 'https://www.linkedin.com/in/sameer-singh-chauhan-606992356', image: sameerChauhanImage, color: C.algo },
    { name: 'Anushka Chaudhary', role: 'AI & ML Lead', branch: 'CSE', batch: "'28", email: 'chaudharyanushka085@gmail.com', linkedin: 'https://www.linkedin.com/in/anushka-chaudhary-2b371b316/', image: anushkaChaudharyImage, color: C.aiml },
    { name: 'Ayush Sharma', role: 'AI & ML Lead', branch: 'IT', batch: "'28", email: 'ayushsharma172005@gmail.com', linkedin: 'https://www.linkedin.com/in/ayush-sharma-20b516325', image: ayushSharmaImage, color: C.aiml },
    { name: 'Divej Singh', role: 'Content & Social Media Lead', branch: 'CSE', batch: "'28", email: 'divejsingh3@gmail.com', linkedin: 'https://www.linkedin.com/in/divej-singh-0b6261326', image: divejSinghImage, color: C.content },
    { name: 'Harsh Verma', role: 'Content & Social Media Lead', branch: 'CSE', batch: "'28", email: 'verma.harsh7370@gmail.com', linkedin: 'https://www.linkedin.com/in/harsh-verma-07974533b', image: harshVermaImage, color: C.content },
    { name: 'Nikhil Jaiswal', role: 'Content & Social Media Lead', branch: 'IT', batch: "'28", email: 'nikhiljais9984@gmail.com', linkedin: 'https://www.linkedin.com/in/nikhil-jaiswal-980a1132b', image: nikhilJaiswalImage, color: C.content },
    { name: 'Anshika Tripathi', role: 'Content & Social Media Lead', branch: 'BBA', batch: "'28", email: 'anshikaatripathiii@gmail.com', linkedin: 'https://www.linkedin.com/in/anshika-tripathi-421a26265', image: anshikaTripathiImage, color: C.content },
    { name: 'Auchitya Kumar Shukla', role: 'Content & Social Media Lead', branch: 'BBA', batch: "'28", email: 'auchityashukla16@gmail.com', linkedin: 'https://www.linkedin.com/in/auchitya-shukla-b6ab252b4', image: auchityaKumarImage, color: C.content },

    // ── Batch 2029 (Sophomore Year) ──
    { name: 'Aashish Kumar', role: 'Executive Member', branch: 'CSE', batch: "'29", email: '2025021301@mmmut.ac.in', linkedin: 'https://www.linkedin.com/in/theaashishkumar/', image: aashishKumarImage, color: C.exec },
    { name: 'Aditya Gupta', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'guptaaditya002006@gmail.com', linkedin: 'https://www.linkedin.com/in/aditya-gupta-a734ba377/', image: adityaGuptaImage, color: C.exec },
    { name: 'Aditya Shukla', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'aadityashukla2412@gmail.com', linkedin: 'https://www.linkedin.com/in/aditya-shukla-2412-sam', image: adityaShuklaImage, color: C.exec },
    { name: 'Aditi Verma', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'aditiverma9945@gmail.com', linkedin: 'https://www.linkedin.com/in/aditi-verma-a5a541328', image: aditiVermaImage, color: C.exec },
    { name: 'Anuradha Srivastava', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'srivastavaanu7922@gmail.com', linkedin: 'https://www.linkedin.com/in/anuradha-srivastava-514465378', image: anuradhaSrivastavaImage, color: C.exec },
    { name: 'Arpita Mishra', role: 'Executive Member', branch: 'ME', batch: "'29", email: 'vaibhavarpita987@gmail.com', linkedin: 'https://www.linkedin.com/in/arpita-mishra-3051a8378', image: arpitaMishraImage, color: C.exec },
    { name: 'Deepak Shivhare', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'dk23107575@gmail.com', linkedin: 'https://www.linkedin.com/in/deepak-shivhare-443333381', image: deepakShivhareImage, color: C.exec },
    { name: 'Himanshu Maurya', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'hm3997353@gmail.com', linkedin: 'https://linkedin.com/in/himanshumaurya29', image: himanshuMauryaImage, color: C.exec },
    { name: 'Khushi Patel', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'khushiipatel657@gmail.com', linkedin: 'https://www.linkedin.com/in/khushi-patel-160462378', image: khushiPatelImage, color: C.exec },
    { name: 'Mahak Singh', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'mahaksinghofficial@gmail.com', linkedin: 'https://www.linkedin.com/in/mahak-singh-814858327', image: mahakSinghImage, color: C.exec },
    { name: 'Piyush Kumar', role: 'Executive Member', branch: 'ECE', batch: "'29", email: 'pk1747968@gmail.com', linkedin: 'https://www.linkedin.com/in/piyush-kumar-b46306391', image: piyushKumarImage, color: C.exec },
    { name: 'Pradumna Manu', role: 'Executive Member', branch: 'BBA', batch: "'29", email: 'pradumanmanu@gmail.com', linkedin: 'https://www.linkedin.com/in/pradumna-manu-8595643b6', image: pradumnaManuImage, color: C.exec },
    { name: 'Rishiraj Kasaudhan', role: 'Executive Member', branch: 'BBA', batch: "'29", email: 'rishirajkasaudhan5705@gmail.com', linkedin: 'https://www.linkedin.com/in/rishi-raj-kasaudhan-6615343a8', image: rishirajImage, imagePosition: "object-top", color: C.exec },
    { name: 'Ritisha Raghuvanshi', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'ritisharaghuvanshi95@gmail.com', linkedin: 'https://www.linkedin.com/in/ritisha-raghuvanshi-3612a3379', image: ritishaImage, color: C.exec },
    { name: 'Sakshi Rana', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'sakshi9696rana@gmail.com', linkedin: 'https://www.linkedin.com/in/sakshi-rana-94554a377', image: sakshiRanaImage, color: C.exec },
    { name: 'Saumyjeet Kumar', role: 'Executive Member', branch: 'CSE', batch: "'29", email: '2025021256@mmmut.ac.in', linkedin: 'https://www.linkedin.com/in/saumyjeet-kumar-pandey-602a51362/', image: saumyjeetKumarImage, color: C.exec },
    { name: 'Shruti Tripathi', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'shrutitripathi369@gmail.com', linkedin: 'https://www.linkedin.com/in/shruti-tripathi-20342132b', image: shrutiTripathiImage, color: C.exec },
    { name: 'Sundaram Dubey', role: 'Executive Member', branch: 'IT', batch: "'29", email: '2025071161@mmmut.ac.in', linkedin: 'https://www.linkedin.com/in/sundaram-dubey-a563a3378', image: sundaramDubeyImage, color: C.exec },
    { name: 'Utkarsh Shrivastava', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'rajatshrivastava036@gmail.com', linkedin: 'https://www.linkedin.com/in/utkarsh-shrivastava-a767b8435', image: utkarshImage, color: C.exec },
    { name: 'Vinit Kumar', role: 'Executive Member', branch: 'IT', batch: "'29", email: '2025071166@mmmut.ac.in', linkedin: 'https://www.linkedin.com/in/vinitkumar491/', image: vinitKumarImage, color: C.exec },
  ];

  const facultyMembers: Member[] = [
      { name: 'Dr. Shwet Ketu', role: 'Faculty Co-ordinator', branch: '', batch: '', email: '', linkedin: '', image: shwetSirImage, color: '#E5E5E5' },
      { name: 'Dr. Satvik Vats', role: 'Faculty Co-ordinator', branch: '', batch: '', email: '', linkedin: '', image: satvikSirImage, color: '#E5E5E5' },
  ];

  // Compute member counts
  const memberCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ["'26", "'27", "'28", "'29"].forEach(batch => {
      counts[batch] = allMembers.filter(m => m.batch === batch).length;
    });
    return counts;
  }, []);

  // Section header
  const SectionHeader: React.FC<{ title: string; color: string; id: string; icon?: React.ReactNode }> = ({ title, color, id, icon }) => (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center mb-14 mt-28 first:mt-0 scroll-mt-28"
    >
      {/* Glow behind title */}
      <div className="relative inline-block">
        <div
          className="absolute -inset-x-16 -inset-y-6 rounded-full opacity-15 blur-3xl"
          style={{ background: color }}
        />
        <div className="relative flex items-center justify-center gap-4 sm:gap-6 mb-3">
          <motion.div
            className="h-[1px] w-10 sm:w-24"
            style={{ background: `linear-gradient(90deg, transparent, ${color})` }}
            initial={{ scaleX: 0, originX: 1 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          {icon && <span style={{ color }} className="opacity-80">{icon}</span>}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h2>
          {icon && <span style={{ color }} className="opacity-80">{icon}</span>}
          <motion.div
            className="h-[1px] w-10 sm:w-24"
            style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );

  const navButtons = [
    { id: 'alumni', label: 'Alumni', batch: "'26", color: '#E5E5E5', icon: <GraduationCap size={14} /> },
    { id: 'final', label: 'Final Year', batch: "'27", color: '#E5E5E5', icon: <Sparkles size={14} /> },
    { id: 'prefinal', label: 'Pre-Final Year', batch: "'28", color: '#E5E5E5', icon: null },
    { id: 'sophomore', label: 'Sophomore Year', batch: "'29", color: '#E5E5E5', icon: null },
  ];

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleNav = (id: string) => {
    setActiveFilter(prev => prev === id ? null : id);
  };

  const sections = [
    { id: 'alumni', title: 'Alumni', batch: "'26", color: '#E5E5E5', icon: <GraduationCap size={24} /> },
    { id: 'final', title: 'Final Year', batch: "'27", color: '#E5E5E5', icon: <Sparkles size={24} /> },
    { id: 'prefinal', title: 'Pre-Final Year', batch: "'28", color: '#E5E5E5', icon: null },
    { id: 'sophomore', title: 'Sophomore Year', batch: "'29", color: '#E5E5E5', icon: null },
  ];

  const visibleSections = activeFilter
    ? sections.filter(s => s.id === activeFilter)
    : sections.filter(s => s.id !== 'alumni');

  return (
    <div className="min-h-screen bg-[#020202] relative overflow-hidden select-none pb-24 ">
      {/* ── Shimmer keyframe (injected once) ─────────────────────────────────── */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ── Background ───────────────────────────────────────────────────────── */}
      <FloatingOrbs />

      {/* ── Header Area ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-8 px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">

        {/* Top Overline */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-8 sm:w-20 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-white/50 text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase">FLUX</span>
          <div className="h-[1px] w-8 sm:w-20 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-6xl sm:text-7xl lg:text-9xl font-bold text-white mb-6 tracking-tight"
        >
          Our Team<span className="text-[#E5E5E5]">.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-gray-400/80 text-lg sm:text-xl max-w-2xl font-light mb-10"
        >
          "Where innovation meets dedication — the minds shaping the future of tech at MMMUT."
        </motion.p>


      </section>


      {/* ── Sticky Filter Bar ─────────────────────────────────────────────────── */}
      <section className="sticky top-0 z-30 px-4 py-4 mb-10">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {navButtons.map(btn => {
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => handleNav(btn.id)}
                className="relative px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 flex items-center gap-2"
                style={{
                  background: isActive ? `${btn.color}25` : 'rgba(255,255,255,0.03)',
                  border: isActive ? `1.5px solid ${btn.color}` : '1.5px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: isActive ? `0 0 25px ${btn.color}25` : '0 8px 32px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  if (!isActive) {
                    el.style.background = 'rgba(255,255,255,0.08)';
                    el.style.borderColor = 'rgba(255,255,255,0.2)';
                    el.style.color = '#fff';
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  if (!isActive) {
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.color = 'rgba(255,255,255,0.6)';
                  }
                }}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reset button */}
        <AnimatePresence>
          {activeFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden flex justify-center mt-3"
            >
              <button
                onClick={() => setActiveFilter(null)}
                className="text-[10px] text-gray-500 hover:text-white transition-colors tracking-wider uppercase flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/5 bg-white/2 backdrop-blur-md"
              >
                <ChevronDown size={10} className="rotate-180" />
                Show all sections
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Members ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {visibleSections.map(sec => {
            const members = allMembers.filter(m => m.batch === sec.batch);
            return (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <SectionHeader title={sec.title} color={sec.color} id={sec.id} icon={sec.icon} />
                <div className={`grid gap-6 sm:gap-8 xl:gap-10 place-items-center mb-20 ${
                  sec.id === 'alumni'
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }`}>
                  {members.map((m, i) => (
                    <MemberCard key={m.name} m={m} idx={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Team;
