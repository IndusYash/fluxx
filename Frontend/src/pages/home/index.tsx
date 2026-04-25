import Hero from "@/components/sections/home/Hero";
import { motion } from "framer-motion";
import Showcase from "@/components/sections/home/Showcase";
// import InductionCTA from "@/components/sections/home/InductionCTA"
import FacultyPreview from "@/components/sections/home/FacultyPreview";
import EventsPreview from "@/components/sections/home/EventsPreview";
import ContactPreview from "@/components/sections/home/ContactPreview";
{/*}
import { useState, useEffect } from "react";
import { Rocket, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
}
*/}
export default function HomePage() {
  /*
  const isMobile = useIsMobile();
  const [showIdeathonModal, setShowIdeathonModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show modal after page has fully loaded
    const initialTimeout = setTimeout(() => {
      setShowIdeathonModal(true);
    }, isMobile ? 3500 : 3000);

    return () => clearTimeout(initialTimeout);
  }, [isMobile]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Reappear after closing: only for desktop (10 seconds)
    if (!showIdeathonModal ) {
      timeoutId = setTimeout(() => {
        setShowIdeathonModal(true);
      }, 10000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showIdeathonModal]);

*/
  return (
    <>
      <Hero />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <Showcase />
        <EventsPreview />
        <FacultyPreview />
        {/* <InductionCTA /> */}
        <ContactPreview />
      </motion.div>

      {/* Induction popup disabled for desktop and mobile. */}
      {/*
      <AnimatePresence>
        {showIdeathonModal && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-end justify-end p-5 sm:p-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative z-10 w-64 rounded-2xl overflow-hidden pointer-events-auto"
              style={{
                background: "linear-gradient(135deg, #0d1510 0%, #101f16 60%, #0b1812 100%)",
                border: "1px solid rgba(29,185,84,0.3)",
                boxShadow: "0 0 40px rgba(29,185,84,0.12), 0 16px 40px rgba(0,0,0,0.9)",
                backdropFilter: "none",
              }}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#00FFC6] to-transparent" />

              <button
                onClick={() => setShowIdeathonModal(false)}
                className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                aria-label="Close"
              >
                <X size={10} />
              </button>

              <div className="px-4 pt-4 pb-4">
                <div className="inline-flex items-center gap-1.5 bg-[#00FFC6]/10 border border-[#00FFC6]/25 rounded-full px-2 py-0.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FFC6] animate-pulse" />
                  <span className="text-[#00FFC6] text-[9px] font-semibold tracking-widest uppercase">Now Open</span>
                </div>

                <h2
                  className="text-base font-black text-white mb-1 leading-tight"
                  style={{ fontFamily: "'Orbitron', 'Space Grotesk', sans-serif" }}
                >
                  Flux Induction{" "}
                  <span className="text-[#00FFC6]">2026</span>
                </h2>
                <p className="text-gray-400 text-[11px] leading-relaxed mb-3">
                  Applications are live! Join Flux — MMMUT's innovation &amp; tech society.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { label: "Applications", value: "Open" },
                    { label: "Seats", value: "Limited" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.035] border border-white/8 rounded-lg px-2 py-1 text-center">
                      <p className="text-[#00FFC6] text-[11px] font-bold">{value}</p>
                      <p className="text-gray-600 text-[8px] uppercase tracking-wider mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setShowIdeathonModal(false); navigate("/induction"); }}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#00FFC6] hover:bg-[#00e5b3] text-black font-bold py-2 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00FFC6]/25 text-xs"
                >
                  <Rocket size={12} />
                  Apply Now
                </button>

                <p className="text-center text-[9px] text-gray-700 mt-2">
                  Takes only 5 minutes · Zero fee
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </>
  );
}
