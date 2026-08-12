import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Linkedin, Users
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3, delay: (idx % 10) * 0.05 }}
      className="group relative flex justify-center w-full"
    >
      <div
        className="w-full max-w-[280px] bg-[#111312] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
        style={{
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top Gradient Border */}
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        <div className="p-5 flex flex-col items-center text-center h-full">
          {/* Photo (Portrait) */}
          <div className="w-full aspect-[3/4] mb-5 overflow-hidden rounded-xl bg-black/50 relative border border-white/5">
            <img
              src={src}
              alt={m.name}
              className={`w-full h-full object-cover ${m.imagePosition ?? 'object-center'} transition-transform duration-700 group-hover:scale-110`}
              onError={() => setErr(true)}
            />
          </div>

          {/* Text */}
          <h3 className="text-white font-bold text-xl mb-1.5 tracking-wide line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {m.name}
          </h3>
          <p className="text-[11px] font-bold mb-1 leading-tight tracking-wider uppercase" style={{ color }}>
            {m.role}
          </p>
          <p className="text-gray-500 text-[10px] font-semibold tracking-[0.2em] uppercase mb-5">
            {m.branch}
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-auto">
            {m.email && (
              <a href={`mailto:${m.email}`} aria-label="Email" className="text-gray-500 hover:text-white transition-colors">
                <Mail size={15} />
              </a>
            )}
            {m.linkedin && (
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-white transition-colors">
                <Linkedin size={15} />
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

  const facultyMembers: Member[] = [
    { name: 'Dr. Shwet Ketu', role: 'Faculty Co-ordinator', branch: '', batch: '', email: '', linkedin: '', image: shwetSirImage, color: '#a78bfa' },
    { name: 'Dr. Satvik Vats', role: 'Faculty Co-ordinator', branch: '', batch: '', email: '', linkedin: '', image: satvikSirImage, color: '#34d399' },
  ];

  // Section header component
  const SectionHeader: React.FC<{ title: string; color: string; id: string }> = ({ title, color, id }) => (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 mt-24 first:mt-0 scroll-mt-28"
    >
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className="h-[1px] w-12 sm:w-24" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h2>
        <div className="h-[1px] w-12 sm:w-24" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      </div>
    </motion.div>
  );

  const navButtons = [
    { id: 'alumni', label: 'Alumni', batch: "'26", color: '#f59e0b' },
    { id: 'final', label: 'Final Year', batch: "'27", color: '#4ade80' },
    { id: 'prefinal', label: 'Pre-Final Year', batch: "'28", color: '#00FFC6' },
    { id: 'sophomore', label: 'Sophomore Year', batch: "'29", color: '#f472b6' },
  ];

  // null = default (show all present team on scroll), string = show only that section
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleNav = (id: string) => {
    setActiveFilter(prev => prev === id ? null : id);
  };

  // Sections to render
  const sections = [
    { id: 'alumni', title: 'Alumni', batch: "'26", color: '#f59e0b' },
    { id: 'final', title: 'Final Year', batch: "'27", color: '#4ade80' },
    { id: 'prefinal', title: 'Pre-Final Year', batch: "'28", color: '#00FFC6' },
    { id: 'sophomore', title: 'Sophomore Year', batch: "'29", color: '#f472b6' },
  ];

  // Default (no filter): show final, prefinal, sophomore. With filter: show only that one.
  const visibleSections = activeFilter
    ? sections.filter(s => s.id === activeFilter)
    : sections.filter(s => s.id !== 'alumni');

  return (
    <div className="min-h-screen bg-[#070B09] relative overflow-hidden select-none pb-24 font-sans">
      {/* ── Background Elements ──────────────────────────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00FFC6]/5 blur-[120px] pointer-events-none rounded-full" />
      
      {/* ── Header Area (Editorial Board Style) ─────────────────────────────── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Top Overline */}
        <div className="flex items-center gap-4 mb-4 opacity-70">
          <div className="h-[1px] w-8 sm:w-16 bg-white/20" />
          <span className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">FLUX</span>
          <div className="h-[1px] w-8 sm:w-16 bg-white/20" />
        </div>

        {/* Main Title */}
        <h1 
          className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Team<span className="text-[#00FFC6]">.</span>
        </h1>

        {/* Subtitle Quote */}
        <p className="text-gray-400 text-lg sm:text-xl italic max-w-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
          "Where innovation meets dedication — the minds shaping the future of tech at MMMUT."
        </p>
      </section>

      {/* ── Filter Buttons ────────────────────────────────────────────────────── */}
      <section className="px-4 relative z-10 mb-12 max-w-5xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-4">
        {navButtons.map(btn => {
          const isActive = activeFilter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => handleNav(btn.id)}
              className="relative px-6 sm:px-7 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                border: isActive ? `1.5px solid ${btn.color}88` : '1.5px solid rgba(255,255,255,0.12)',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                boxShadow: isActive ? `0 0 25px ${btn.color}25` : 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(255,255,255,0.1)';
                el.style.borderColor = `${btn.color}66`;
                el.style.color = '#fff';
                el.style.boxShadow = `0 0 20px ${btn.color}18`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)';
                el.style.borderColor = isActive ? `${btn.color}88` : 'rgba(255,255,255,0.12)';
                el.style.color = isActive ? '#fff' : 'rgba(255,255,255,0.7)';
                el.style.boxShadow = isActive ? `0 0 25px ${btn.color}25` : 'none';
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </section>

      {/* ── Members ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        {visibleSections.map(sec => {
          const members = sec.id === 'alumni' ? allMembers.filter(m => m.batch === sec.batch) : allMembers.filter(m => m.batch === sec.batch);
          return (
            <div key={sec.id}>
              <SectionHeader title={sec.title} color={sec.color} id={sec.id} />
              <div className={`grid gap-8 xl:gap-10 place-items-center mb-16 ${
                sec.id === 'alumni' 
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto' 
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}>
                {members.map((m, i) => (
                  <MemberCard key={m.name} m={m} idx={i} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Team;
