import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/flux-logo-silver.jpg";
import "./Navbar.css"; // 👈 make sure this is imported

const sections = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "faculty", label: "Faculty", path: "/faculty" },
  { id: "team", label: "Team", path: "/team" },
  { id: "events", label: "Events", path: "/events" },
  { id: "gallery", label: "Gallery", path: "/gallery" },
  { id: "ideathon", label: "Ideathon", path: "/ideathon" },
  { id: "she-leads", label: "She Leads", path: "/she-leads" },
  { id: "contact", label: "Contact", path: "/contact" },
];

export default function MobileNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  // Lock/unlock scroll
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMenuOpen]);

  // Highlight from route
  useEffect(() => {
    const match = sections.find((sec) => sec.path === location.pathname);
    if (match) setActive(match.id);
  }, [location.pathname]);

  // Scroll highlight only on home
  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleLinkClick = (id: string, path: string) => {
    setActive(id);
    navigate(path);
    setIsMenuOpen(false);

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-card/80 backdrop-blur">
        <div
          className="flex items-center justify-between h-16 px-4"
          style={{ borderBottom: "0.5px solid rgba(255, 255, 255, 0.7)" }}
        >
          <div
            className="flex items-center gap-1.5 h-12 cursor-pointer"
            onClick={() => handleLinkClick("home", "/")}
          >
            <div className="h-11 w-11 overflow-hidden rounded-lg bg-black/70 p-0.5">
              <img
                src={logo}
                alt="Flux Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span
              className="text-primary text-[1.75rem] leading-none font-bold tracking-[0.04em]"
            >
              FLUX
            </span>
          </div>

          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="p-2 text-primary rounded"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-card/95 backdrop-blur-lg transition-opacity duration-300 ${isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col items-center gap-y-8 text-center">
          {sections.map(({ id, label, path }) => (
            <li key={id}>
              <button
                onClick={() => handleLinkClick(id, path)}
                className={`mobile-nav-item inline-flex items-center gap-2 ${active === id ? "active" : ""
                  }`}
              >
                <span>{label}</span>
                {id === "she-leads" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30 leading-none">
                    SPECIAL
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
