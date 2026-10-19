import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

import BottomTicker from "@/components/ui/BottomTicker";

export default function MobileLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-dvh bg-[#060606] text-white flex flex-col">
      <ScrollToTop isMobile={true} />
      <ScrollProgress />
      <Navbar />
      <main className={`flex-1 bg-[#060606] ${isHome ? "" : "pt-20"}`}>
        <Outlet />
      </main>
      <BottomTicker />
      <Footer />
    </div>
  );
}
