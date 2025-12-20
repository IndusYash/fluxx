import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/flux_logo.png";
import "./Navbar.css"; // 👈 make sure this is imported

const sections = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "faculty", label: "Faculty", path: "/faculty" },
  { id: "events", label: "Events", path: "/events" },
  { id: "team", label: "Team", path: "/team" },
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
          <nav className="fixed top-0 left-0 right-0 z-[9999] bg-card/80 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <img
            src={logo}
            alt="Flux Logo"
            className="h-8 w-auto cursor-pointer"
            onClick={() => handleLinkClick("home", "/")}
          />

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
        className={`fixed inset-0 z-50 flex items-center justify-center bg-card/95 backdrop-blur-lg transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-y-8 text-center">
          {sections.map(({ id, label, path }) => (
            <li key={id}>
              <button
                onClick={() => handleLinkClick(id, path)}
                className={`mobile-nav-item ${
                  active === id ? "active" : ""
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
