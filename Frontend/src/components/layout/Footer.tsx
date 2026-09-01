import { FaWhatsapp, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import logo from "@/assets/images/flux-logo-silver.jpg";

const socialLinks = [
  {
    icon: SiGmail,
    href: "mailto:flux@mmmut.ac.in",
    label: "Gmail"
  },
  {
    icon: FaWhatsapp,
    href: "https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t",
    label: "WhatsApp"
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2",
    label: "Instagram"
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/flux-mmm/",
    label: "LinkedIn"
  }
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Our Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Faculty", href: "/faculty" },
  { name: "Contact", href: "/contact" }
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden bg-[#020202] text-white">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          filter: "blur(60px)"
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={logo}
                alt="FLUX Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-[2.5rem] font-black text-white tracking-tight leading-none">
                FLUX
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm mb-6 relative z-10">
              Pioneering the next era of technology — where curious developers, bold innovators, and passionate tech enthusiasts unite to design, build, and shape the digital landscape of tomorrow.
            </p>
            
            <div className="flex gap-3 relative z-10">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <social.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1.5 h-1.5 bg-white/0 group-hover:bg-white rounded-full mr-3 transition-all duration-300" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Contact
            </h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <FaMapMarkerAlt className="w-5 h-5 text-white mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-white font-medium">FLUX, Center of Excellence</p>
                  <p className="text-xs text-gray-400 mt-1">Madan Mohan Malaviya University of Technology</p>
                  <p className="text-xs text-gray-400">Gorakhpur, Uttar Pradesh 273010</p>
                </div>
              </motion.div>
              
              <motion.a 
                href="mailto:flux@mmmut.ac.in"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <FaEnvelope className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  flux@mmmut.ac.in
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} FLUX. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-gray-500">Active Community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
