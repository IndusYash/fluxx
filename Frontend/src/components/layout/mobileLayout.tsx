import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileNavbar from "./MobileNavbar";

import HomePage from "@/pages/home";
import AboutPage from "@/pages/about/AboutPage";
import FacultyPage from "@/pages/faculty/FacultyPage";
// import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";

import LandingPage from "@/pages/induction/LandingPage";
import InductionForm from "@/pages/induction/InductionForm";

import { ChevronLeft } from "lucide-react";

interface MobileLayoutProps {
  isMobile: boolean;
}

export default function MobileLayout({ isMobile }: MobileLayoutProps) {
  const location = useLocation();

  // 🔥 State for induction flow
  const [currentPage, setCurrentPage] = useState<"landing" | "form">("landing");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateToForm = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage("form");
      setIsTransitioning(false);
    }, 300);
  };

  const navigateToLanding = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage("landing");
      setIsTransitioning(false);
    }, 300);
  };

  // 👇 Auto-scroll to corresponding section when route changes
  useEffect(() => {
    // Map of routes to section IDs
    const routeToSectionMap: { [key: string]: string } = {
      "/": "home",
      "/about": "about",
      "/faculty": "faculty",
      "/events": "events",
      "/team": "team",
      "/join": "join",
      "/contact": "contact"
    };

    const sectionId = routeToSectionMap[location.pathname];
    
    if (sectionId) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          });
        }
      }, 100);
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      <MobileNavbar className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md h-16" />

      <section id="home" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <HomePage isMobile={isMobile} />
      </section>

      <section id="about" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <AboutPage isMobile={isMobile} />
      </section>

      <section id="faculty" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <FacultyPage isMobile={isMobile} />
      </section>

      {/* <section id="events" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <EventsPage isMobile={isMobile} />
      </section> */}

      <section id="team" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <TeamPage isMobile={isMobile} />
      </section>

      <section
        id="join"
        className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto min-h-screen bg-[#121212] text-white"
      >
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentPage === "form" && (
            <button
              onClick={navigateToLanding}
              className="fixed top-6 left-6 z-50 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
          )}

          {currentPage === "landing" ? (
            <LandingPage onJoinClick={navigateToForm} />
          ) : (
            <InductionForm />
          )}
        </div>
      </section>

      <section id="contact" className="pt-16 scroll-mt-16 px-4 max-w-md mx-auto">
        <ContactPage isMobile={isMobile} />
      </section>
    </div>
  );
}