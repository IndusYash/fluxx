import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/flux_logo.png";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "faculty", label: "Faculty" },
  { id: "events", label: "Events" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
  { id: "join", label: "Induction" },
];

export default function MobileNavbar() {
  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMenuOpen]);

  // Track which section is visible
  useEffect(() => {
    const options = { threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
          // Update URL without reloading
          navigate(`/${entry.target.id === "home" ? "" : entry.target.id}`, {
            replace: true,
          });
        }
      });
    }, options);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navigate]);

  // Scroll to correct section on direct URL (e.g., /join)
  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    const el = document.getElementById(path);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Retry once after render delay
      setTimeout(() => {
        const retryEl = document.getElementById(path);
        if (retryEl) retryEl.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [location.pathname]);

  const handleLinkClick = (id: string) => {
    navigate(`/${id === "home" ? "" : id}`); // update URL
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-card/80 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <img
            src={logo}
            alt="Flux Logo"
            className="h-8 w-auto"
            draggable={false}
            loading="lazy"
            onClick={() => handleLinkClick("home")}
          />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 flex items-center justify-center bg-card/95 backdrop-blur-lg transition-opacity duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-y-8">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleLinkClick(id)}
                className={`text-2xl font-medium transition-colors ${
                  active === id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
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
