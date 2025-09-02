import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { FaWhatsapp, FaInstagram, FaBars, FaTimes, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "@/assets/images/flux_logo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Faculty", path: "/faculty" },
    { name: "Our Team", path: "/team" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
    { name: "Induction", path: "/join" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Subtle Tech Grid Background */}
      <div className="fixed top-0 left-0 w-full h-20 pointer-events-none z-40">
        <svg className="w-full h-full opacity-5">
          <defs>
            <pattern id="navGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#navGrid)" />
        </svg>
      </div>

      <motion.nav
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
          showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
        style={{
          height: "4rem",
          background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(26,26,26,0.4) 50%, rgba(0,0,0,0.3) 100%)`,
          backdropFilter: "blur(15px)",
          borderBottom: "1px solid rgba(16, 185, 129, 0.15)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.2), 0 0 15px rgba(16, 185, 129, 0.05)",
          zIndex: 50,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-3 flex-none">
            <motion.img
              src={logo}
              alt="FLUX Logo"
              className="w-12 h-12 object-contain flex-none"
              style={{ filter: "drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))" }}
              animate={{
                filter: [
                  "drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))",
                  "drop-shadow(0 0 20px rgba(16, 185, 129, 0.6))",
                  "drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.span
              className="text-2xl font-black tracking-wide text-white select-none"
              style={{ fontFamily: "'Orbitron', 'Space Grotesk', sans-serif" }}
            >
              FLUX
            </motion.span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul
            className="hidden md:flex gap-8 text-sm font-semibold tracking-wider uppercase flex-auto justify-center"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={i}
                className="cursor-pointer relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={link.path}
                  className={`relative z-10 transition-colors duration-300 flex items-center gap-2 ${
                    location.pathname === link.path ? "text-primary" : "text-gray-300/90 hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.name === "Induction" && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-90 scale-125"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-300 shadow-[0_0_6px_rgba(34,197,94,0.9)]"></span>
                    </span>
                  )}
                </Link>
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/80"
                    layoutId="activeTab"
                    style={{ boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)" }}
                  />
                )}
                <motion.span
                  className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary/70 to-green-400/70"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ boxShadow: "0 0 6px rgba(16, 185, 129, 0.4)" }}
                />
              </motion.li>
            ))}
          </ul>

          {/* Social Icons and CTA Button (desktop only) */}
          <div className="hidden md:flex items-center gap-6">
            {[SiGmail, FaWhatsapp, FaInstagram, FaLinkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href={
                  Icon === SiGmail
                    ? "mailto:flux@mmmut.ac.in"
                    : Icon === FaWhatsapp
                    ? "https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t"
                    : Icon === FaInstagram
                    ? "https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2"
                    : "https://www.linkedin.com/company/flux-mmm/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon
                  size={20}
                  style={{
                    color: "rgba(156, 163, 175, 0.7)", // Equivalent to text-gray-400/70
                    pointerEvents: "auto",
                    transition: "color 0.3s",
                  }}
                />
                {/* Background hex shape */}
                <motion.div
                  className="absolute inset-0 bg-primary/5 -z-10"
                  style={{
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    width: "130%",
                    height: "130%",
                    top: "-15%",
                    left: "-15%",
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            <motion.button
              className="relative overflow-hidden px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 group border border-primary/40"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)",
                backdropFilter: "blur(10px)",
                color: "#10b981",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)",
                background: "rgba(16, 185, 129, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Go to App</span>
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <motion.div className="md:hidden relative">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-primary/20 backdrop-blur-sm"
              style={{
                background: "rgba(16, 185, 129, 0.05)",
                boxShadow: "0 0 10px rgba(16, 185, 129, 0.15)",
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <FaTimes size={20} className="text-primary/80" /> : <FaBars size={20} className="text-primary/80" />}
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Mobile Menu */}
          <motion.div
            className={`md:hidden overflow-hidden ${isOpen ? "block" : "hidden"}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(0, 0, 0, 0.4) 0%, 
                  rgba(26, 26, 26, 0.5) 50%, 
                  rgba(0, 0, 0, 0.4) 100%
                )
              `,
              backdropFilter: "blur(15px)",
              borderTop: "1px solid rgba(16, 185, 129, 0.15)",
            }}
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-2 px-4 rounded-lg font-medium uppercase tracking-wider transition-all duration-300 ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/8 border-l-2 border-primary/60"
                        : "text-gray-300/80 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="flex gap-6 mt-6 pt-4 border-t border-primary/15 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {[SiGmail, FaWhatsapp, FaInstagram, FaLinkedin].map((Icon, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Icon
                      size={24}
                      style={{
                        color: "rgba(156, 163, 175, 0.7)",
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Subtle Tech Particles following cursor */}
      <div className="fixed pointer-events-none z-30">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`cursor-particle-${i}`}
            className="absolute w-0.5 h-0.5 bg-primary/40 rounded-full"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            animate={{
              x: [0, Math.random() * 15 - 7, 0],
              y: [0, Math.random() * 15 - 7, 0],
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Navbar;
