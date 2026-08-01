import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MobileLayout from "@/components/layout/mobileLayout";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import HomePage from "@/pages/home";
import AboutPage from "@/pages/about/AboutPage";
import FacultyPage from "@/pages/faculty/FacultyPage";
import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";
import FDPDetailsPage from "@/components/sections/events/UpcomingEvents/fdp";
import IdeathonPage from "@/pages/Ideathon/Ideathon";
import GalleryPage from "@/pages/gallery/GalleryPage";
import InductionLanding from "@/pages/induction/LandingPage";
import InductionForm from "@/pages/induction/InductionForm";
import JudgePanel from "@/pages/judge/JudgePanel";

import { Toaster } from "@/components/ui/toaster";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const AppLayout = isMobile ? MobileLayout : Layout;

  return (
    <BrowserRouter>
      <ScrollToTop isMobile={isMobile} />
      <div className="min-h-dvh flex flex-col">
        <Routes>
          {/* Standalone routes — no Layout wrapper */}
          <Route path="/judge-panel"   element={<JudgePanel />} />
          <Route path="/judge-panel/*" element={<JudgePanel />} />

          {/* All other routes — shared Layout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage isMobile={isMobile} />} />
            <Route path="/about" element={<AboutPage isMobile={isMobile} />} />
            <Route path="/faculty" element={<FacultyPage isMobile={isMobile} />} />
            <Route path="/events" element={<EventsPage isMobile={isMobile} />} />
            <Route path="/events/fdp" element={<FDPDetailsPage />} />
            <Route path="/team" element={<TeamPage isMobile={isMobile} />} />
            <Route path="/gallery" element={<GalleryPage isMobile={isMobile} />} />
            <Route path="/contact" element={<ContactPage isMobile={isMobile} />} />
            <Route path="/ideathon" element={<IdeathonPage />} />
            <Route path="/induction" element={<InductionLanding />} />
            <Route path="/induction/apply" element={<InductionForm />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}
