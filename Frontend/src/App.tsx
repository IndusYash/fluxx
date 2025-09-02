import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import HomePage from "@/pages/home";
import FacultyPage from "@/pages/faculty/FacultyPage";
import AboutPage from "@/pages/about/AboutPage";
import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";
// import { Toaster } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import Application from "@/pages/induction/Application";
import MobileLayout from "@/components/layout/mobileLayout";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col">
        {isMobile ? (
          // Full one‑page scrolling layout
          <MobileLayout />
        ) : (
          // Original route-based desktop layout
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/join" element={<Application />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
          </Routes>
        )}
      </div>
      <Toaster />
    </BrowserRouter>
  );
}
