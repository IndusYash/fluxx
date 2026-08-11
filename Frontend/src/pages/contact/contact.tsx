import { SiGmail } from "react-icons/si";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface ContactCardProps {
  icon: React.ReactNode;
  heading: string;
  value: string;
  link: string;
  buttonText: string;
  accentColor: string;
  idx: number;
}

function ContactCard({ icon, heading, value, link, buttonText, accentColor, idx }: ContactCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      custom={idx}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative rounded-2xl p-7 flex flex-col items-center text-center transition-all duration-400 hover:-translate-y-2 cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accentColor}55`;
        el.style.boxShadow = `0 12px 40px ${accentColor}18, 0 0 60px ${accentColor}08`;
        el.style.background = `linear-gradient(180deg, ${accentColor}08 0%, rgba(255,255,255,0.02) 100%)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.boxShadow = 'none';
        el.style.background = 'rgba(255,255,255,0.025)';
      }}
    >
      {/* Icon with glow */}
      <div className="relative mb-5">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}30`,
          }}
        >
          {icon}
        </div>
      </div>

      <h3
        className="text-white font-bold text-lg mb-1 tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {heading}
      </h3>
      <p className="text-gray-400 text-sm mb-5">{value}</p>

      <span
        className="mt-auto inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:scale-105"
        style={{
          background: `${accentColor}15`,
          color: accentColor,
          border: `1px solid ${accentColor}30`,
        }}
      >
        {buttonText}
        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </motion.a>
  );
}

function Contact() {
  return (
    <div className="relative min-h-screen bg-[#070B09] overflow-hidden select-none">
      {/* ── Background Glow ──────────────────────────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00FFC6]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[50%] right-0 w-[400px] h-[400px] bg-[#a78bfa]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#34d399]/5 blur-[150px] pointer-events-none rounded-full" />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-4 opacity-70"
        >
          <div className="h-[1px] w-8 sm:w-16 bg-white/20" />
          <span className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
            REACH OUT
          </span>
          <div className="h-[1px] w-8 sm:w-16 bg-white/20" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Get in Touch<span className="text-[#00FFC6]">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl italic max-w-2xl font-light"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          "We're always open to new ideas, collaborations, and conversations — let's build something extraordinary together."
        </motion.p>
      </section>

      {/* ── Contact Cards ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ContactCard
            icon={<SiGmail className="h-7 w-7" style={{ color: '#00FFC6' }} />}
            heading="Email"
            value="flux@mmmut.ac.in"
            link="mailto:flux@mmmut.ac.in"
            buttonText="Send Email"
            accentColor="#00FFC6"
            idx={0}
          />
          <ContactCard
            icon={<FaWhatsapp className="h-7 w-7" style={{ color: '#34d399' }} />}
            heading="WhatsApp"
            value="FLUX Community"
            link="https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t"
            buttonText="Join Group"
            accentColor="#34d399"
            idx={1}
          />
          <ContactCard
            icon={<FaInstagram className="h-7 w-7" style={{ color: '#f472b6' }} />}
            heading="Instagram"
            value="@flux.mmmut"
            link="https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2"
            buttonText="Follow"
            accentColor="#f472b6"
            idx={2}
          />
          <ContactCard
            icon={<FaLinkedin className="h-7 w-7" style={{ color: '#6CFFF7' }} />}
            heading="LinkedIn"
            value="FLUX (MMMUT)"
            link="https://www.linkedin.com/company/flux-mmm/"
            buttonText="Visit"
            accentColor="#6CFFF7"
            idx={3}
          />
        </div>
      </section>

      {/* ── Location ─────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 relative z-10 max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 sm:p-10 text-center"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#a78bfa]/10 border border-[#a78bfa]/30">
              <svg className="w-5 h-5 text-[#a78bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3
              className="text-white font-bold text-2xl tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Location
            </h3>
          </div>

          <p className="text-gray-300 text-base mb-6">
            CSED, MMMUT, Tech District, Gorakhpur, U.P.
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=CSED+MMMUT+Tech+District+Gorakhpur+UP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: '#a78bfa15',
              color: '#a78bfa',
              border: '1px solid #a78bfa30',
            }}
          >
            View on Maps
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* ── Bottom Tagline ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 relative z-10 max-w-2xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#00FFC6]/30" />
            <div className="w-2 h-2 rounded-full bg-[#00FFC6]/50" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#00FFC6]/30" />
          </div>
          <h3
            className="text-2xl sm:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Making Tomorrow's Technology, Today
          </h3>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            From hackathons to workshops, mentoring to innovation — FLUX is your community for impact and growth.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;
