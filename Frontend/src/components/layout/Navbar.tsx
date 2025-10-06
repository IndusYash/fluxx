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

      {/* Navbar */}
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
          {/* Logo */}
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
    location.pathname === link.path
      ? "text-[#00FFC6]"
      : "text-gray-300/90 hover:text-[#00FFC6]"
  }`}
>
  {link.name === "Events" ? (
    <motion.span
      className="relative flex items-center justify-center px-3 py-1 rounded-md font-semibold"
      style={{
        border: "1px solid rgba(0,255,198,0.3)",
        background: "rgba(0,255,198,0.08)",
      }}
      animate={{
        opacity: [1, 0.6, 1],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {link.name}
    </motion.span>
  ) : (
    link.name
  )}
</Link>

              </motion.li>
            ))}
          </ul>

          {/* Social Icons (Desktop) */}
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
                    ? "https://www.instagram.com/flux.mmmut"
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
                    color: "rgba(156, 163, 175, 0.7)",
                    pointerEvents: "auto",
                    transition: "color 0.3s",
                  }}
                />
              </motion.a>
            ))}
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
                {isOpen ? (
                  <FaTimes size={20} className="text-primary/80" />
                ) : (
                  <FaBars size={20} className="text-primary/80" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Floating Neon Cursor */}
      <div className="fixed pointer-events-none z-30">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`cursor-particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: "8px",
              height: "8px",
              background: "#00FFC6",
              boxShadow: "0 0 20px #00FFC6, 0 0 40px rgba(0,255,198,0.6)",
              filter: "blur(0.5px)",
            }}
            animate={{
              x: [0, Math.random() * 25 - 12, 0],
              y: [0, Math.random() * 25 - 12, 0],
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Navbar;
