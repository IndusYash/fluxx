import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MobileLayout from "@/components/layout/mobileLayout";
import ScrollToTop from "@/components/layout/ScrollToTop";

import HomePage from "@/pages/home";
import FacultyPage from "@/pages/faculty/FacultyPage";
import AboutPage from "@/pages/about/AboutPage";
// import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";
import Application from "@/pages/induction/Application";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-dvh flex flex-col">
        <Routes>
          <Route element={isMobile ? <MobileLayout /> : <Layout />}>
            <Route path="/" element={<HomePage isMobile={isMobile} />} />
            <Route path="/about" element={<AboutPage isMobile={isMobile} />} />
            <Route path="/faculty" element={<FacultyPage isMobile={isMobile} />} />
            {/* <Route path="/events" element={<EventsPage isMobile={isMobile} />} /> */}
            <Route path="/team" element={<TeamPage isMobile={isMobile} />} />
            <Route path="/join" element={<Application isMobile={isMobile} />} />
            <Route path="/contact" element={<ContactPage isMobile={isMobile} />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}
