import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MobileLayout from "@/components/layout/mobileLayout";
import ScrollToTop from "@/components/layout/ScrollToTop"; // Keep this
import HomePage from "@/pages/home";
import FacultyPage from "@/pages/faculty/FacultyPage";
import AboutPage from "@/pages/about/AboutPage";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";
import LandingPage from "@/pages/induction/LandingPage";
import InductionForm from "@/pages/induction/InductionForm";
import { ChevronLeft } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Your existing induction flow state...
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      {/* Use custom ScrollToTop for desktop only */}
      <ScrollToTop isMobile={isMobile} />
      
      <div className="min-h-dvh flex flex-col">
        <Routes>
          <Route element={isMobile ? <MobileLayout /> : <Layout />}>
            <Route path="/" element={<HomePage isMobile={isMobile} />} />
            <Route path="/about" element={<AboutPage isMobile={isMobile} />} />
            <Route path="/faculty" element={<FacultyPage isMobile={isMobile} />} />
            <Route path="/team" element={<TeamPage isMobile={isMobile} />} />
            <Route path="/join" element={
              <div className="min-h-screen bg-[#121212] text-white">
                <div className={`transition-opacity duration-300 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
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
              </div>
            } />
            <Route path="/contact" element={<ContactPage isMobile={isMobile} />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}
