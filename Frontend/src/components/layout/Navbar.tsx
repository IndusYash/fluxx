import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/flux-logo-silver.jpg";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Faculty", path: "/faculty" },
    { name: "Team", path: "/team" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Ideathon", path: "/ideathon" },
    { name: "She Leads", path: "/she-leads", isSpecial: true },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 opacity-100 translate-y-0"
        style={{
          height: "3rem",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.45)",
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.7)",
          zIndex: 50,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-full relative">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Left Side */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 flex-none relative group z-10"
            >
              <motion.div
                className="relative bg-black/70 backdrop-blur-md rounded-lg overflow-hidden flex items-center justify-center"
                style={{
                  width: "44px",
                  height: "44px",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={logo}
                  alt="FLUX Logo"
                  className="w-full h-full object-contain p-1"
                />
              </motion.div>
              <span
                className="text-white text-2xl font-bold tracking-[0.04em]"
              >
                FLUX
              </span>
            </Link>

            {/* Navigation - Right Side */}
            <div
              className="hidden md:flex items-center gap-8"
              style={{
                background: "transparent",
              }}
            >
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={i}
                    className="cursor-pointer"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      className={`relative z-10 inline-flex items-center gap-1.5 px-1 py-2 border-b transition-all duration-300 text-sm font-semibold tracking-wider uppercase ${isActive
                          ? (link.isSpecial ? "text-rose-300 border-rose-400" : "text-white border-white")
                          : (link.isSpecial ? "text-rose-200/80 hover:text-white border-transparent hover:border-rose-400/50" : "text-white border-transparent hover:border-white/60")
                        }`}
                      style={{
                        borderBottomWidth: "0.5px",
                      }}
                    >
                      <span>{link.name}</span>
                      {link.isSpecial && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold leading-none tracking-normal">
                          SPECIAL
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Hamburger */}
            <motion.div className="md:hidden relative z-10">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
                style={{ boxShadow: "0 0 15px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-white">
                  {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-5">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-bold tracking-wider uppercase px-1 py-3 border-b transition-all duration-300 ${isActive
                          ? "text-white border-white"
                          : "text-white border-transparent hover:border-white/60"
                        }`}
                      style={{ borderBottomWidth: "0.5px" }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
