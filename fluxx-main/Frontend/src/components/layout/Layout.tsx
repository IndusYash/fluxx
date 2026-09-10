import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/Loader";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading. You can replace this logic with actual data fetching/loading indicators.
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 flex-1 bg-card/60">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
