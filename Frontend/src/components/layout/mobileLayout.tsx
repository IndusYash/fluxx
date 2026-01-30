import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import MobileNavbar from "./MobileNavbar";
import Footer from "./Footer";

export default function MobileLayout() {
  return (
    <div className="relative">
      <ScrollToTop /> {/* ✅ Now runs on every mobile route change */}
      <MobileNavbar className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md h-16" />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
