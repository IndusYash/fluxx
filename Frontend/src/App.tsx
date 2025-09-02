import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import HomePage from "@/pages/home";
import FacultyPage from "@/pages/faculty/FacultyPage";
import AboutPage from "@/pages/about/AboutPage";
import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";
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
          <MobileLayout isMobile={isMobile} />
        ) : (
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage isMobile={isMobile} />} />
              <Route path="/about" element={<AboutPage isMobile={isMobile} />} />
              <Route path="/faculty" element={<FacultyPage isMobile={isMobile} />} />
              <Route path="/events" element={<EventsPage isMobile={isMobile} />} />
              <Route path="/team" element={<TeamPage isMobile={isMobile} />} />
              <Route path="/join" element={<Application isMobile={isMobile} />} />
              <Route path="/contact" element={<ContactPage isMobile={isMobile} />} />
            </Route>
          </Routes>
        )}
      </div>
      <Toaster />
    </BrowserRouter>
  );
}
