import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MobileLayout from "@/components/layout/mobileLayout";
import ScrollToTop from "@/components/layout/ScrollToTop";

import HomePage from "@/pages/home";
import FacultyPage from "@/pages/faculty/FacultyPage";
import AboutPage from "@/pages/about/AboutPage";
import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";

// 👇 Import induction flow components
import LandingPage from "@/pages/induction/LandingPage";
import InductionForm from "@/pages/induction/InductionForm";

import { ChevronLeft } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

// Wrapper component for LandingPage with navigation
function LandingPageWrapper({ isMobile }: { isMobile: boolean }) {
  const navigate = useNavigate();
  
  const handleJoinClick = () => {
    navigate('/join/form');
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <LandingPage onJoinClick={handleJoinClick} />
    </div>
  );
}

// Wrapper component for InductionForm with back button
function InductionFormWrapper({ isMobile }: { isMobile: boolean }) {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/join');
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <button
        onClick={handleBackClick}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>
      <InductionForm />
    </div>
  );
}

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop isMobile={isMobile} />
      <div className="min-h-dvh flex flex-col">
        <Routes>
          <Route element={isMobile ? <MobileLayout /> : <Layout />}>
            <Route path="/" element={<HomePage isMobile={isMobile} />} />
            <Route path="/about" element={<AboutPage isMobile={isMobile} />} />
            <Route path="/faculty" element={<FacultyPage isMobile={isMobile} />} />
            <Route path="/events" element={<EventsPage isMobile={isMobile} />} />
            <Route path="/team" element={<TeamPage isMobile={isMobile} />} />
            <Route path="/join" element={<LandingPageWrapper isMobile={isMobile} />} />
            <Route path="/join/form" element={<InductionFormWrapper isMobile={isMobile} />} />
            <Route path="/contact" element={<ContactPage isMobile={isMobile} />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}