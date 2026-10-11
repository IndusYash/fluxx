import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Menu, X } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";
import Container from "@/components/layout/Container";
import { useLightSectionObserver } from "@/hooks/useLightSectionObserver";

interface NavDropdownItem {
  title: string;
  path: string;
  desc?: string;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isNavbarLight } = useLightSectionObserver();

  // Search shortcuts (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const eventSubLinks: NavDropdownItem[] = [
    { title: "All Events", path: "/events", desc: "Workshops, speaker sessions, and tech meets" },
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
        className={`pointer-events-none fixed top-0 inset-x-0 h-24 z-[89] transition-opacity duration-150 ${
          isNavbarLight
            ? "opacity-0"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent opacity-100"
        }`}
        aria-hidden="true"
      />

      <header
        className="fixed top-0 inset-x-0 z-[90] pointer-events-none bg-transparent border-none"
      >
        <Container className="flex items-center justify-between pt-[clamp(14px,2vh,24px)]">
          
          {/* Left Column: Logo Chip (Small rounded square) */}
          <div className="flex-1 flex justify-start">
            <Link
              to="/"
              className="pointer-events-auto flex items-center gap-3 group"
              onClick={() => setMobileOpen(false)}
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

          {/* Center Column: Floating Pill Navigation (height 52px) */}
          <nav className={`pointer-events-auto hidden md:flex items-center gap-1.5 h-[52px] rounded-full px-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex-none border transition-colors duration-150 ${
            isNavbarLight
              ? "bg-white/90 backdrop-blur-xl border-black/15 text-black"
              : "bg-[#111111]/80 backdrop-blur-xl border-white/10 text-white"
          }`}>
            <Link
              to="/about"
              className={`px-3 py-1.5 text-xs transition-colors ${
                isNavbarLight
                  ? location.pathname === "/about" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/about" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="About" />
            </Link>

            {/* Dropdown item: Events + */}
            <div
              className="relative"
              onMouseEnter={() => setEventsOpen(true)}
              onMouseLeave={() => setEventsOpen(false)}
            >
              <Link
                to="/events"
                className={`px-3 py-1.5 text-xs flex items-center gap-1 transition-colors ${
                  isNavbarLight
                    ? location.pathname.startsWith("/events") || location.pathname === "/ideathon" || location.pathname === "/she-leads"
                      ? "text-black font-semibold"
                      : "text-neutral-600 hover:text-black"
                    : location.pathname.startsWith("/events") || location.pathname === "/ideathon" || location.pathname === "/she-leads"
                      ? "text-white font-medium"
                      : "text-[#9a9a9a] hover:text-white"
                }`}
              >
                <ScrambleText text="Events" />
                <span className="text-[10px] font-mono leading-none">+</span>
              </Link>

              {/* Hover Dropdown Panel */}
              {eventsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50">
                  <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 shadow-2xl">
                    {eventSubLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setEventsOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors group"
                      >
                        <div className="text-xs font-medium text-white flex items-center justify-between">
                          <span>{item.title}</span>
                          <ArrowRight className="w-3 h-3 text-[#9a9a9a] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
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
              className={`px-3 py-1.5 text-xs transition-colors ${
                isNavbarLight
                  ? location.pathname === "/team" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/team" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="Team" />
            </Link>

            <Link
              to="/faculty"
              className={`px-3 py-1.5 text-xs transition-colors ${
                isNavbarLight
                  ? location.pathname === "/faculty" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/faculty" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="Faculty" />
            </Link>

            <Link
              to="/gallery"
              className={`px-3 py-1.5 text-xs transition-colors ${
                isNavbarLight
                  ? location.pathname === "/gallery" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/gallery" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="Gallery" />
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-1.5 text-xs transition-colors ${
                isNavbarLight
                  ? location.pathname === "/contact" ? "text-black font-semibold" : "text-neutral-600 hover:text-black"
                  : location.pathname === "/contact" ? "text-white font-medium" : "text-[#9a9a9a] hover:text-white"
              }`}
            >
              <ScrambleText text="Contact" />
            </Link>
          </nav>

          {/* Right Column: Search Pill & Mobile Toggle */}
          <div className="flex-1 flex justify-end items-center gap-3">
            {/* Search ⌘K Pill (height 52px) */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`pointer-events-auto flex items-center gap-2.5 h-[48px] sm:h-[52px] px-4 rounded-full border text-xs transition-colors shadow-sm ${
                isNavbarLight
                  ? "border-black/15 bg-white/90 backdrop-blur-xl text-neutral-800 hover:text-black hover:border-black/40"
                  : "border-white/10 bg-[#111111]/80 backdrop-blur-xl text-[#9a9a9a] hover:text-white hover:border-white/30"
              }`}
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[12px] font-medium">Search</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                isNavbarLight ? "bg-black/10 text-black/70" : "bg-white/10 text-white/80"
              }`}>
                ⌘K
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`pointer-events-auto md:hidden flex items-center justify-center w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-xl border transition-colors shadow-sm ${
                isNavbarLight
                  ? "text-black border-black/15 bg-white/90 backdrop-blur-xl"
                  : "text-white border-white/10 bg-[#111111]/80 backdrop-blur-xl"
              }`}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </Container>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="pointer-events-auto md:hidden absolute top-[calc(clamp(14px,2vh,24px)+58px)] left-4 right-4 bg-[#0f0f0f]/95 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col gap-3 z-50">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#9a9a9a] hover:text-white py-1.5"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#9a9a9a] hover:text-white py-1.5"
            >
              About
            </Link>
            <div className="border-t border-white/5 pt-2 flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Events</span>
              {eventSubLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-white/80 hover:text-white pl-2 py-1"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <Link
              to="/team"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#9a9a9a] hover:text-white py-1.5"
            >
              Team
            </Link>
            <Link
              to="/faculty"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#9a9a9a] hover:text-white py-1.5"
            >
              Faculty
            </Link>
            <Link
              to="/gallery"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#9a9a9a] hover:text-white py-1.5"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#9a9a9a] hover:text-white py-1.5"
            >
              Contact
            </Link>
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
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(page.path);
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
