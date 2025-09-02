import { useState, useEffect } from "react";
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

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Intersection observer for active link
  useEffect(() => {
    const options = { threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, options);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-card/80 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <img
            src={logo}
            alt="Flux Logo"
            className="h-8 w-auto"
            draggable={false}
            loading="lazy"
          />

          {/* Hamburger */}
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

      {/* Overlay Menu */}
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
