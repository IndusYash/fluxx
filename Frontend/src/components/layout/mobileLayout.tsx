import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import MobileNavbar from "./MobileNavbar";
import Footer from "./Footer";

export default function MobileLayout() {
  return (
    <div className="relative min-h-dvh bg-[#020202] text-white">
      <ScrollToTop isMobile={true} /> {/* ✅ Now runs on every mobile route change */}
      <MobileNavbar className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md h-16" />
      <main className="pt-16 bg-[#020202]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
