import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Linkedin, Users
} from 'lucide-react';

// ─── Image Imports ─────────────────────────────────────────────────────────────

// Faculty
import shwetSirImage from "../../assets/images/shwetSir.webp";
import satvikSirImage from "../../assets/images/SatvikSir.webp";

// Alumni
import presidentImage from "../../assets/images/president.webp";

// Administration
import shivammishraImage from "../../assets/images/shivamPic.webp";
import ysvImage         from "../../assets/images/ysv.webp";
import Aviral           from "../../assets/images/Aviral.webp";
import threeMImage      from "../../assets/images/3m.webp";
import Shubham          from "../../assets/images/Shubham.webp";
import jaiKumarImage    from "../../assets/images/JaiKumar.webp";
import priyaSinghImage  from "../../assets/images/PriyaSingh.webp";
import princeSahuImage  from "../../assets/images/PrinceSahu.webp";
import sudeekshaImage   from "../../assets/images/Sudeeksha.webp";

// Development
import aryanImage    from "../../assets/images/Aryan.webp";
import Prad          from "../../assets/images/Pradyuman.webp";
import atulKumarImage from "../../assets/images/AtulThakur.webp";
import rishiImage    from "../../assets/images/Rishi.webp";

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
import devanshKumarImage from "../../assets/images/DevanshKumar.webp";
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
  admin:   '#a78bfa',   // soft violet
  domain:  '#4ade80',   // FLUX green
  dev:     '#6CFFF7',   // cyan
  design:  '#f472b6',   // pink
  photo:   '#fb923c',   // orange
  algo:    '#facc15',   // amber-yellow
  aiml:    '#818cf8',   // indigo
  content: '#34d399',   // emerald
  alumni:  '#f59e0b',   // gold
  exec:    '#94a3b8',   // slate
};

// ─── MemberCard ────────────────────────────────────────────────────────────────
const MemberCard: React.FC<{ m: Member; idx: number }> = ({ m, idx }) => {
  const [err, setErr] = useState(false);
  const src = !m.image || err
    ? `https://i.pravatar.cc/300?img=${(idx % 70) + 1}`
    : m.image;

  const color = m.color || C.dev;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.42, delay: (idx % 4) * 0.065 }}
      className="group relative"
    >
      {/* Decorative connection line (desktop only, just visual flair) */}
      <div className="absolute -top-4 left-1/2 w-[1px] h-4 bg-gradient-to-t from-white/10 to-transparent hidden lg:block" />

      <div
        className="relative rounded-[20px] p-5 h-full flex flex-col items-center text-center
          transition-all duration-300 hover:-translate-y-2"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.border = `1px solid ${color}66`;
          el.style.boxShadow = `0 12px 40px ${color}20`;
          el.style.background = `linear-gradient(180deg, ${color}10 0%, rgba(255,255,255,0.01) 100%)`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.border = '1px solid rgba(255,255,255,0.08)';
          el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
          el.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)';
        }}
      >
        {/* Photo */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300" style={{ backgroundColor: color }} />
          <img
            src={src}
            alt={m.name}
            className={`relative w-[96px] h-[96px] rounded-full object-cover ${m.imagePosition ?? 'object-center'}
              transition-transform duration-500 group-hover:scale-110`}
            style={{ border: `2px solid ${color}42`, padding: '2px', background: '#000' }}
            onError={() => setErr(true)}
          />
        </div>

        {/* Text */}
        <h3 className="text-white font-bold text-[14px] leading-snug mb-1 line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {m.name}
        </h3>
        <p className="text-[11px] font-bold mb-1.5 leading-tight line-clamp-2 tracking-wide uppercase" style={{ color }}>
          {m.role}
        </p>
        <p className="text-gray-400/80 text-[10px] font-medium tracking-widest uppercase mb-4">
          {m.branch} · {m.batch}
        </p>

        {/* Social Links */}
        <div className="flex gap-2.5 mt-auto">
          {m.email && (
            <a
              href={`mailto:${m.email}`}
              aria-label={`Email ${m.name}`}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 bg-white/5 hover:bg-white/10"
              style={{ color: '#fff' }}
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name} on LinkedIn`}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 bg-white/5 hover:bg-white/10"
              style={{ color: '#fff' }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── YearHeader ────────────────────────────────────────────────────────────────
const YearHeader: React.FC<{ title: string; subtitle: string; color: string }> = ({ title, subtitle, color }) => (
  <div className="mb-12 text-center mt-28 first:mt-0 relative">
    {/* Decorative line behind header */}
    <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 z-0 hidden sm:block" 
         style={{ background: `linear-gradient(90deg, transparent 0%, ${color}30 50%, transparent 100%)` }} />
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex flex-col items-center justify-center bg-[#070B09] px-6 sm:px-10 relative z-10"
    >
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-widest whitespace-nowrap mb-2"
        style={{ fontFamily: "'Orbitron', 'Space Grotesk', sans-serif" }}
      >
        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, #fff, ${color})` }}>
          {title}
        </span>
      </h2>
      <p className="text-gray-400 text-xs sm:text-sm tracking-[0.3em] uppercase font-bold" style={{ color: `${color}cc` }}>
        {subtitle}
      </p>
    </motion.div>
  </div>
);


// ─── ResponsiveGrid ────────────────────────────────────────────────────────────
const Grid: React.FC<{ children: React.ReactNode; cols?: string }> = ({
  children,
  cols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}) => (
  <div className={`grid ${cols} gap-5 sm:gap-6 lg:gap-8`}>{children}</div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const Team: React.FC<{ isMobile?: boolean }> = () => {

  const allMembers: Member[] = [
    // ── Alumni ──
    { name: 'Shivam Rai', role: 'President Alumni', branch: 'CSE', batch: "'26", email: 'president@flux.edu', linkedin: 'https://www.linkedin.com/in/shivam-rai-a64b84298/', image: presidentImage, color: C.alumni },

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
    { name: 'Anuradha Srivastava', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'srivastavaanu7922@gmail.com', linkedin: 'https://www.linkedin.com/in/anuradha-srivastava-514465378', image: anuradhaSrivastavaImage, color: C.exec },
    { name: 'Arpita Mishra', role: 'Executive Member', branch: 'ME', batch: "'29", email: 'vaibhavarpita987@gmail.com', linkedin: 'https://www.linkedin.com/in/arpita-mishra-3051a8378', image: arpitaMishraImage, color: C.exec },
    { name: 'Deepak Shivhare', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'dk23107575@gmail.com', linkedin: 'https://www.linkedin.com/in/deepak-shivhare-443333381', image: deepakShivhareImage, color: C.exec },
    { name: 'Himanshu Maurya', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'hm3997353@gmail.com', linkedin: 'https://linkedin.com/in/himanshumaurya29', image: himanshuMauryaImage, color: C.exec },
    { name: 'Khushi Patel', role: 'Executive Member', branch: 'IT', batch: "'29", email: 'khushiipatel657@gmail.com', linkedin: 'https://www.linkedin.com/in/khushi-patel-160462378', image: khushiPatelImage, color: C.exec },
    { name: 'Piyush Kumar', role: 'Executive Member', branch: 'ECE', batch: "'29", email: 'pk1747968@gmail.com', linkedin: 'https://www.linkedin.com/in/piyush-kumar-b46306391', image: piyushKumarImage, color: C.exec },
    { name: 'Pradumna Manu', role: 'Executive Member', branch: 'BBA', batch: "'29", email: 'pradumanmanu@gmail.com', linkedin: 'https://www.linkedin.com/in/pradumna-manu-8595643b6', image: pradumnaManuImage, color: C.exec },
    { name: 'Rishiraj Kasaudhan', role: 'Executive Member', branch: 'BBA', batch: "'29", email: 'rishirajkasaudhan5705@gmail.com', linkedin: 'https://www.linkedin.com/in/rishi-raj-kasaudhan-6615343a8', image: rishirajImage, imagePosition: "object-top", color: C.exec },
    { name: 'Ritisha Raghuvanshi', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'ritisharaghuvanshi95@gmail.com', linkedin: 'https://www.linkedin.com/in/ritisha-raghuvanshi-3612a3379', image: ritishaImage, color: C.exec },
    { name: 'Sakshi Rana', role: 'Executive Member', branch: 'CSE', batch: "'29", email: 'sakshi9696rana@gmail.com', linkedin: 'https://www.linkedin.com/in/sakshi-rana-94554a377', image: sakshiRanaImage, color: C.exec },
    { name: 'Saumyjeet Kumar', role: 'Executive Member', branch: 'CSE', batch: "'29", email: '2025021256@mmmut.ac.in', linkedin: 'https://www.linkedin.com/in/saumyjeet-kumar-pandey-602a51362/', image: saumyjeetKumarImage, color: C.exec },
    { name: 'Sundaram Dubey', role: 'Executive Member', branch: 'IT', batch: "'29", email: '2025071161@mmmut.ac.in', linkedin: 'https://www.linkedin.com/in/sundaram-dubey-a563a3378', image: sundaramDubeyImage, color: C.exec },
    { name: 'Vinit Kumar', role: 'Executive Member', branch: 'IT', batch: "'29", email: '2025071166@mmmut.ac.in', linkedin: 'https://www.linkedin.com/in/vinitkumar491/', image: vinitKumarImage, color: C.exec },
  ];

  const facultyMembers = [
    { name: 'Dr. Shwet Ketu', role: 'Faculty Co-ordinator', image: shwetSirImage },
    { name: 'Dr. Satvik Vats', role: 'Faculty Co-ordinator', image: satvikSirImage },
  ];
  const facultyGradients = [
    'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(37,99,235,0.05))',
    'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(59,130,246,0.05))',
  ];
  const facultyBorders = [
    'rgba(124,58,237,0.4)',
    'rgba(14,165,233,0.4)',
  ];

  return (
    <div className="min-h-screen bg-[#070B09] relative overflow-hidden select-none pb-24">
      {/* ── Background Glow ───────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
        bg-[#00FFC6]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-0 w-[500px] h-[500px]
        bg-[#a78bfa]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px]
        bg-[#34d399]/5 blur-[150px] pointer-events-none rounded-full" />

      {/* ── Background Grid Pattern ───────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
            bg-[#00FFC6]/10 border border-[#00FFC6]/25 text-[#00FFC6]
            text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(0,255,198,0.2)]"
        >
          <Users size={13} />
          <span>Core Team</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white mb-6"
          style={{ fontFamily: "'Orbitron', 'Space Grotesk', sans-serif" }}
        >
          FLUX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] via-[#6CFFF7] to-[#a78bfa]">
            LEADERSHIP
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-medium"
        >
          Meet the visionary minds driving innovation, building cutting-edge solutions, and shaping the tech culture at MMMUT.
        </motion.p>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-[1400px] mx-auto">
        
        {/* Central connecting line for desktop view mapping out the hierarchy */}
        <div className="absolute top-[300px] bottom-[200px] left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/5 to-transparent hidden xl:block z-0" />

        {/* ── Faculty Co-ordinators ───────────────────────────────────────── */}
        <YearHeader title="Faculty Incharge" subtitle="Academic Mentors" color="#7c3aed" />
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mb-20 relative z-10">
          {facultyMembers.map((fac, i) => (
            <motion.div
              key={fac.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: i * 0.1 }}
              className="group relative rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl"
              style={{
                background: facultyGradients[i],
                border: `1px solid ${facultyBorders[i]}`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.5)`,
              }}
            >
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="absolute inset-0 rounded-full blur-xl opacity-30 bg-white" />
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="relative w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                  style={{ border: `3px solid ${facultyBorders[i]}`, padding: '3px', background: '#000' }}
                />
              </div>
              <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{fac.name}</h3>
              <p className="text-gray-300 text-sm font-medium tracking-wide uppercase mb-5">{fac.role}</p>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white bg-white/10 border border-white/20">
                MMMUT
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Alumni ──────────────────────────────────────────────────────── */}
        <YearHeader title="Alumni" subtitle="Batch of 2026" color={C.alumni} />
        <div className="max-w-xs mx-auto mb-20 relative z-10">
          {allMembers.filter(m => m.batch === "'26").map((m, i) => (
            <MemberCard key={m.name} m={m} idx={i} />
          ))}
        </div>

        {/* ── Final Year (2027) ───────────────────────────────────────── */}
        <YearHeader title="Final Year" subtitle="Batch of 2027" color={C.admin} />
        <div className="mb-24 relative z-10">
          <Grid>
            {allMembers.filter(m => m.batch === "'27").map((m, i) => (
              <MemberCard key={m.name} m={m} idx={i} />
            ))}
          </Grid>
        </div>

        {/* ── Pre-Final Year (2028) ───────────────────────────────────────── */}
        <YearHeader title="Pre-Final Year" subtitle="Batch of 2028" color={C.domain} />
        <div className="mb-24 relative z-10">
          <Grid>
            {allMembers.filter(m => m.batch === "'28").map((m, i) => (
              <MemberCard key={m.name} m={m} idx={i} />
            ))}
          </Grid>
        </div>

        {/* ── Sophomore Year (2029) ────────────────────────────────────────── */}
        <YearHeader title="Sophomore Year" subtitle="Batch of 2029" color={C.exec} />
        <div className="mb-24 relative z-10">
          <Grid>
            {allMembers.filter(m => m.batch === "'29").map((m, i) => (
              <MemberCard key={m.name} m={m} idx={i} />
            ))}
          </Grid>
        </div>

      </section>
    </div>
  );
};

export default Team;
