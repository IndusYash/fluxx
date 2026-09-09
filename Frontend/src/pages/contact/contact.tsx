import { SiGmail } from "react-icons/si";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, MessageCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
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
      className="card-outline group relative rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={{
        borderColor: `${accentColor}40`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${accentColor}10`
      }}
    >
      <div className="relative mb-5">
        <div className="relative w-14 h-14 rounded-xl flex items-center justify-center bg-white/10 border border-white/20 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      <h3 className="text-white font-bold text-lg mb-1 tracking-wide">
        {heading}
      </h3>
      <p className="text-gray-400 text-sm mb-5">{value}</p>

      <span className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:scale-105 bg-white text-black hover:bg-gray-200">
        {buttonText}
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </motion.a>
  );
}

function Contact() {
  return (
    <div className="relative min-h-screen bg-[#020202] overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[50%] right-0 w-[400px] h-[400px] bg-white/5 blur-[140px] rounded-full"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-4 opacity-70"
        >
          <motion.div
            className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/40"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <span className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
            REACH OUT
          </span>
          <motion.div
            className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/40"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight"
        >
          Get in Touch<span className="text-[#E5E5E5]">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl font-light mb-8"
        >
          We're always open to new ideas, collaborations, and conversations — let's build something extraordinary together.
        </motion.p>
      </section>

      {/* Contact Cards */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ContactCard
            icon={<Mail className="h-7 w-7 text-white" />}
            heading="Email"
            value="flux@mmmut.ac.in"
            link="mailto:flux@mmmut.ac.in"
            buttonText="Send Email"
            accentColor="#E5E5E5"
            idx={0}
          />
          <ContactCard
            icon={<MessageCircle className="h-7 w-7 text-white" />}
            heading="WhatsApp"
            value="FLUX Community"
            link="https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t"
            buttonText="Join Group"
            accentColor="#E5E5E5"
            idx={1}
          />
          <ContactCard
            icon={<FaInstagram className="h-7 w-7 text-white" />}
            heading="Instagram"
            value="@flux.mmmut"
            link="https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2"
            buttonText="Follow"
            accentColor="#E5E5E5"
            idx={2}
          />
          <ContactCard
            icon={<FaLinkedin className="h-7 w-7 text-white" />}
            heading="LinkedIn"
            value="FLUX (MMMUT)"
            link="https://www.linkedin.com/company/flux-mmm/"
            buttonText="Visit"
            accentColor="#FFFFFF"
            idx={3}
          />
        </div>
      </section>

      {/* Location */}
      <section className="px-4 sm:px-6 relative z-10 max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,255,255,0.05)",
                "0 0 40px rgba(255,255,255,0.1)",
                "0 0 20px rgba(255,255,255,0.05)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="text-white font-bold text-2xl tracking-wide">
                Our Location
              </h3>
            </motion.div>

            <p className="text-gray-400 text-base mb-6">
              CSED, MMMUT, Gorakhpur, U.P.
            </p>

            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=CSED+MMMUT+Tech+District+Gorakhpur+UP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View on Maps
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Bottom Tagline */}
      <section className="px-4 sm:px-6 relative z-10 max-w-2xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <motion.div
              className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/30"
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-white/50"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="h-[1px] w-16 bg-gradient-to-l from-transparent to-white/30"
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
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
