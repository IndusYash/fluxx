import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Menu, X, Sparkles } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";
import Container from "@/components/layout/Container";
import { useLightSectionObserver } from "@/hooks/useLightSectionObserver";

interface NavDropdownItem {
  title: string;
  path: string;
  desc?: string;
  isNew?: boolean;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isNavbarLight } = useLightSectionObserver();

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);

    if (location.pathname === "/") {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollY > 15) {
        window.dispatchEvent(new CustomEvent("flux:navigate-home"));
      } else {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(0, { immediate: false });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } else {
      window.dispatchEvent(
        new CustomEvent("flux:start-transition", {
          detail: { path: "/", label: "INITIALIZING FLUX CORE" },
        })
      );
      setTimeout(() => {
        navigate("/");
      }, 30);
    }
  };

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setEventsOpen(false);

    if (location.pathname === path) return;

    window.dispatchEvent(
      new CustomEvent("flux:start-transition", {
        detail: { path },
      })
    );
    setTimeout(() => {
      navigate(path);
    }, 30);
  };

  // Search shortcuts (⌘K / Ctrl+K) and Escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      if ((window as any).__lenis) (window as any).__lenis.stop();
    } else {
      document.body.style.overflow = "";
      if ((window as any).__lenis) (window as any).__lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Focus trap for mobile navigation drawer
  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled])'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    }
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !mobileMenuRef.current) return;
      const elements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled])'
      );
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [mobileOpen]);

  const eventSubLinks: NavDropdownItem[] = [
    { title: "All Events", path: "/events", desc: "Workshops, speaker sessions, and tech meets" },
    {
      title: "ByteBrawl x Hacktoberfest",
      path: "/events/bytebrawl-hacktoberfest",
      desc: "Competitive coding showdown & open source",
      isNew: true,
    },
    { title: "Ideathon", path: "/ideathon", desc: "Flagship innovation competition" },
    { title: "She Leads", path: "/she-leads", desc: "Women in tech leadership conclave" },
    { title: "Faculty Dev (FDP)", path: "/events/fdp", desc: "Advanced training programs" },
  ];

  const searchablePages = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Faculty Advisory", path: "/faculty" },
    { name: "Student Team", path: "/team" },
    { name: "All Events", path: "/events" },
    { name: "ByteBrawl x Hacktoberfest", path: "/events/bytebrawl-hacktoberfest" },
    { name: "ByteBrawl Registration", path: "/events/bytebrawl-hacktoberfest/register" },
    { name: "Ideathon Conclave", path: "/ideathon" },
    { name: "She Leads Conclave", path: "/she-leads" },
    { name: "Photo Gallery", path: "/gallery" },
    { name: "Contact & Join", path: "/contact" },
  ];

  const filteredSearch = searchQuery.trim() === ""
    ? searchablePages
    : searchablePages.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {/* Pointer-events-none top gradient overlay behind navbar (neutral dark scrim in dark theme, no scrim in light theme) */}
      <div
        id="top-nav-scrim"
        className={`pointer-events-none fixed top-0 inset-x-0 h-24 z-[89] transition-opacity duration-150 ${
          isNavbarLight
            ? "opacity-0"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent opacity-100"
        }`}
        aria-hidden="true"
      />

      <header
        id="main-header"
        className="fixed top-0 inset-x-0 z-[90] pointer-events-none bg-transparent border-none"
      >
        <Container className="flex items-center justify-between pt-[clamp(14px,2vh,24px)] max-md:pt-[calc(clamp(14px,2vh,24px)+env(safe-area-inset-top,0px))]">
          
          {/* Left Column: Logo Chip (Small rounded square) */}
          <div className="flex-1 flex justify-start">
            <Link
              to="/"
              className="pointer-events-auto flex items-center gap-3 group"
              onClick={handleHomeClick}
            >
              <div className={`w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-xl border flex items-center justify-center p-2.5 transition-all duration-150 shadow-lg ${
                isNavbarLight
                  ? "bg-white/95 border-black/20 group-hover:border-black/50 text-black shadow-black/5"
                  : "bg-[#111111]/80 backdrop-blur-xl border-white/10 group-hover:border-white/30 text-white"
              }`}>
                <img
                  src="/logo.svg"
                  alt="FLUX Mark"
                  className={`w-full h-full object-contain transition-all duration-150 ${
                    isNavbarLight ? "brightness-0" : ""
                  }`}
                />
              </div>
              <span className={`font-mono text-sm tracking-[0.2em] font-bold transition-colors duration-150 ${
                isNavbarLight ? "text-black" : "text-white"
              }`}>
                FLUX
              </span>
            </Link>
          </div>

          {/* Center Column: Floating Pill Navigation */}
          <nav className={`pointer-events-auto hidden min-[701px]:flex items-center gap-1 sm:gap-1.5 h-[48px] sm:h-[52px] rounded-full px-4 sm:px-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex-none border transition-colors duration-150 ${
            isNavbarLight
              ? "bg-white/90 backdrop-blur-xl border-black/15 text-black"
              : "bg-[#111111]/80 backdrop-blur-xl border-white/10 text-white"
          }`}>
            <Link
              to="/about"
              onClick={(e) => handleNavClick("/about", e)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                isNavbarLight
                  ? location.pathname === "/about" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/about" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="ABOUT" />
            </Link>

            {/* Dropdown item: Events + */}
            <div
              className="relative"
              onMouseEnter={() => setEventsOpen(true)}
              onMouseLeave={() => setEventsOpen(false)}
            >
              <Link
                to="/events"
                onClick={(e) => handleNavClick("/events", e)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider flex items-center gap-1 transition-colors ${
                  isNavbarLight
                    ? location.pathname.startsWith("/events") || location.pathname === "/ideathon" || location.pathname === "/she-leads"
                      ? "text-black font-semibold"
                      : "text-neutral-600 hover:text-black"
                    : location.pathname.startsWith("/events") || location.pathname === "/ideathon" || location.pathname === "/she-leads"
                      ? "text-white font-medium"
                      : "text-[#9a9a9a] hover:text-white"
                }`}
              >
                <ScrambleText text="EVENTS" />
                <span className="text-[10px] font-mono leading-none">+</span>
              </Link>

              {/* Hover Dropdown Panel */}
              {eventsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[285px] z-50">
                  <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 shadow-2xl">
                    {eventSubLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={(e) => handleNavClick(item.path, e)}
                        className="block px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors group"
                      >
                        <div className="text-xs font-medium text-white flex items-center justify-between gap-1.5">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <span className="truncate">{item.title}</span>
                            {item.isNew && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-orange-500/15 border border-orange-500/35 text-amber-300 shadow-[0_0_8px_rgba(249,115,22,0.25)] flex-shrink-0">
                                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                <span>NEW</span>
                              </span>
                            )}
                          </span>
                          <ArrowRight className="w-3 h-3 text-[#9a9a9a] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </div>
                        {item.desc && (
                          <div className="text-[10px] text-[#9a9a9a] mt-0.5 line-clamp-1">
                            {item.desc}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/team"
              onClick={(e) => handleNavClick("/team", e)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                isNavbarLight
                  ? location.pathname === "/team" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/team" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="TEAM" />
            </Link>

            <Link
              to="/faculty"
              onClick={(e) => handleNavClick("/faculty", e)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                isNavbarLight
                  ? location.pathname === "/faculty" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/faculty" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="FACULTY" />
            </Link>

            <Link
              to="/gallery"
              onClick={(e) => handleNavClick("/gallery", e)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                isNavbarLight
                  ? location.pathname === "/gallery" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/gallery" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="GALLERY" />
            </Link>

            <Link
              to="/contact"
              onClick={(e) => handleNavClick("/contact", e)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                isNavbarLight
                  ? location.pathname === "/contact" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/contact" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="CONTACT" />
            </Link>
          </nav>

          {/* Right Column: Pill & Mobile Toggle */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3">
            {/* Join Us Pill */}
            <Link
              to="/team"
              onClick={(e) => handleNavClick("/team", e)}
              className={`pointer-events-auto group inline-flex items-center justify-center gap-2 h-[48px] sm:h-[52px] px-4 sm:px-6 rounded-full border text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-sm ${
                isNavbarLight
                  ? "border-black/20 bg-black text-white hover:bg-neutral-800"
                  : "border-white/20 bg-white text-black hover:bg-[#e6e6e6] shadow-[0_0_20px_rgba(255,255,255,0.15)] font-semibold"
              }`}
            >
              <span>Join Us</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`pointer-events-auto min-[701px]:hidden flex items-center justify-center w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-xl border transition-colors shadow-sm ${
                isNavbarLight
                  ? "text-black border-black/15 bg-white/90 backdrop-blur-xl"
                  : "text-white border-white/10 bg-[#111111]/80 backdrop-blur-xl"
              }`}
              aria-label={mobileOpen ? "Close navigation menu" : "Open main menu"}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </Container>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="pointer-events-auto md:hidden absolute top-[calc(clamp(14px,2vh,24px)+env(safe-area-inset-top,0px)+58px)] left-4 right-4 max-h-[calc(100svh-120px)] overflow-y-auto bg-[#0f0f0f]/98 backdrop-blur-2xl border border-white/15 p-5 rounded-2xl shadow-2xl flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-white/10">
              <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase">Navigation</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Link
              to="/"
              onClick={handleHomeClick}
              className="text-sm font-medium text-[#9a9a9a] hover:text-white min-h-[44px] flex items-center px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={(e) => handleNavClick("/about", e)}
              className="text-sm font-medium text-[#9a9a9a] hover:text-white min-h-[44px] flex items-center px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              About
            </Link>

            {/* Events + Sublinks */}
            <div className="border-t border-white/10 pt-2 pb-1 flex flex-col">
              <Link
                to="/events"
                onClick={(e) => handleNavClick("/events", e)}
                className="text-sm font-medium text-white min-h-[44px] flex items-center justify-between px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                <span>Events</span>
                <span className="text-xs text-white/40 font-mono">View All →</span>
              </Link>
              <div className="pl-3 flex flex-col border-l border-white/10 ml-2 mt-1 space-y-0.5">
                {eventSubLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={(e) => handleNavClick(item.path, e)}
                    className="text-xs text-white/75 hover:text-white min-h-[44px] flex items-center justify-between px-2 rounded-md hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.title}</span>
                      {item.isNew && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-orange-500/15 border border-orange-500/35 text-amber-300 shadow-[0_0_8px_rgba(249,115,22,0.25)] flex-shrink-0">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                          <span>NEW</span>
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/team"
              onClick={(e) => handleNavClick("/team", e)}
              className="text-sm font-medium text-[#9a9a9a] hover:text-white min-h-[44px] flex items-center px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Team
            </Link>
            <Link
              to="/faculty"
              onClick={(e) => handleNavClick("/faculty", e)}
              className="text-sm font-medium text-[#9a9a9a] hover:text-white min-h-[44px] flex items-center px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Faculty
            </Link>
            <Link
              to="/gallery"
              onClick={(e) => handleNavClick("/gallery", e)}
              className="text-sm font-medium text-[#9a9a9a] hover:text-white min-h-[44px] flex items-center px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={(e) => handleNavClick("/contact", e)}
              className="text-sm font-medium text-[#9a9a9a] hover:text-white min-h-[44px] flex items-center px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Contact
            </Link>

            {/* Join Us in mobile drawer */}
            <div className="border-t border-white/10 pt-3 mt-1">
              <Link
                to="/team"
                onClick={(e) => handleNavClick("/team", e)}
                className="w-full min-h-[44px] px-4 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Join Us</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal (⌘K) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#111111] border border-white/15 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-4 h-4 text-[#9a9a9a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FLUX pages and initiatives..."
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-[#9a9a9a] outline-none"
              />
              <span className="text-[10px] font-mono text-[#9a9a9a] border border-white/15 px-1.5 py-0.5 rounded">
                ESC
              </span>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto">
              {filteredSearch.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#9a9a9a]">No matching pages found</div>
              ) : (
                filteredSearch.map((page) => (
                  <button
                    key={page.path}
                    onClick={(e) => {
                      setSearchOpen(false);
                      if (page.path === "/") {
                        handleHomeClick(e);
                      } else {
                        handleNavClick(page.path, e);
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs text-white/90 hover:bg-white/[0.08] hover:text-white transition-colors"
                  >
                    <span>{page.name}</span>
                    <span className="font-mono text-[10px] text-[#9a9a9a]">{page.path}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
