import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import BottomTicker from "@/components/ui/BottomTicker";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Initial load screen
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        ScrollTrigger.refresh();
        (window as any).__lenis?.resize();
      }, 100);
      setTimeout(() => {
        ScrollTrigger.refresh();
        (window as any).__lenis?.resize();
      }, 500);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-[#060606] text-white">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className={`flex-1 bg-[#060606] ${isHome ? "" : "pt-24 sm:pt-28"}`}>
        <Outlet />
      </main>
      <BottomTicker />
      <Footer />
    </div>
  );
}
