import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/flux_logo.png";

// 📌 Updated Sections with proper routing paths
const sections = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "faculty", label: "Faculty", path: "/faculty" },
  { id: "events", label: "Events", path: "/events" },
  { id: "team", label: "Team", path: "/team" },
  { id: "contact", label: "Contact", path: "/contact" },
  // { id: "join", label: "Induction", path: "/join" },

  { id: "ideathon", label: "Ideathon", path: "/ideathon" },
];

export default function MobileNavbar() {
  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Disable scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMenuOpen]);

  // Observe scroll only for locally-present sections
  useEffect(() => {
    const options = { threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ⬇️ Handles both scrolling & routing properly
  const handleLinkClick = (id: string, path: string) => {
    navigate(path); // always navigate first
    setIsMenuOpen(false);

    // scroll only if the element exists on page
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-card/80 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <img
            src={logo}
            alt="Flux Logo"
            className="h-8 w-auto"
            onClick={() => handleLinkClick("home", "/")}
          />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-primary rounded"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-card/95 backdrop-blur-lg transition-opacity duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-y-8">
          {sections.map(({ id, label, path }) => (
            <li key={id}>
              <button
                onClick={() => handleLinkClick(id, path)}
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
