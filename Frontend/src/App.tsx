import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MobileLayout from "@/components/layout/mobileLayout";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== "undefined") {
  (window as any).ScrollTrigger = ScrollTrigger;
  (window as any).gsap = gsap;
}

import HomePage from "@/pages/home";
import AboutPage from "@/pages/about/AboutPage";
import FacultyPage from "@/pages/faculty/FacultyPage";
import EventsPage from "@/pages/events/events";
import ContactPage from "@/pages/contact/contact";
import TeamPage from "@/pages/team/team";
import FDPDetailsPage from "@/components/sections/events/UpcomingEvents/fdp";
import IdeathonPage from "@/pages/Ideathon/Ideathon";
import GalleryPage from "@/pages/gallery/GalleryPage";
import JudgePanel from "@/pages/judge/JudgePanel";
import SheLeadsPage from "@/pages/sheLeads/SheLeadsPage";

const ByteBrawlPage = lazy(
  () => import("@/pages/events/bytebrawl-hacktoberfest/ByteBrawlPage")
);
const ByteBrawlRegisterPage = lazy(
  () => import("@/pages/events/bytebrawl-hacktoberfest/ByteBrawlRegisterPage")
);

import { Toaster } from "@/components/ui/toaster";
import { introManager } from "@/lib/introState";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const isHome = typeof window !== "undefined" && window.location.pathname === "/";
    if (isHome && !introManager.isDone()) {
      if (typeof history !== "undefined" && "scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    } else {
      if (typeof history !== "undefined" && "scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    }

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    (window as any).__lenis = lenis;

    // If intro has not completed on homepage, keep Lenis stopped at scroll 0 until intro reveals
    if (isHome && !introManager.isDone()) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
    }

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // When ScrollTrigger recalculates pin spacers/offsets, notify Lenis of new page height
    const onSTRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onSTRefresh);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Recompute page height when DOM content or images change
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // Refresh after fonts are ready
    if (document.fonts) {
      document.fonts.ready.then(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    }

    // Refresh after window load
    const onLoad = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", onLoad);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      delete (window as any).__lenis;
      resizeObserver.disconnect();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.removeEventListener("refresh", onSTRefresh);
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
            <Route
              path="/events/bytebrawl-hacktoberfest"
              element={
                <Suspense
                  fallback={
                    <div className="min-h-screen bg-[#060606] flex items-center justify-center">
                      <div className="font-mono text-xs tracking-widest text-neutral-400 animate-pulse">
                        // LOADING BYTEBRAWL X HACKTOBERFEST //
                      </div>
                    </div>
                  }
                >
                  <ByteBrawlPage isMobile={isMobile} />
                </Suspense>
              }
            />
            <Route
              path="/events/bytebrawl-hacktoberfest/register"
              element={
                <Suspense
                  fallback={
                    <div className="min-h-screen bg-[#060606] flex items-center justify-center">
                      <div className="font-mono text-xs tracking-widest text-neutral-400 animate-pulse">
                        // LOADING REGISTRATION PORTAL //
                      </div>
                    </div>
                  }
                >
                  <ByteBrawlRegisterPage isMobile={isMobile} />
                </Suspense>
              }
            />
            <Route path="/team" element={<TeamPage isMobile={isMobile} />} />
            <Route path="/gallery" element={<GalleryPage isMobile={isMobile} />} />
            <Route path="/contact" element={<ContactPage isMobile={isMobile} />} />
            <Route path="/ideathon" element={<IdeathonPage />} />
            <Route path="/she-leads" element={<SheLeadsPage isMobile={isMobile} />} />
            <Route path="/sheleads" element={<SheLeadsPage isMobile={isMobile} />} />
            <Route path="/contact" element={<ContactPage isMobile={isMobile} />} />
          </Route>
        </Routes>
      </div>
      
      <ChatbotWidget />
      <Toaster />
    </BrowserRouter>
  );
}
