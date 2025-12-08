import Hero from "@/components/sections/home/Hero";
import { motion, AnimatePresence } from "framer-motion";
import Showcase from "@/components/sections/home/Showcase";
// import InductionCTA from "@/components/sections/home/InductionCTA"
import FacultyPreview from "@/components/sections/home/FacultyPreview";
import EventsPreview from "@/components/sections/home/EventsPreview";
import ContactPreview from "@/components/sections/home/ContactPreview";
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

export default function HomePage() {
  const isMobile = useIsMobile();
  const [showIdeathonModal, setShowIdeathonModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show modal on initial load: 2 seconds for mobile, immediately for desktop
    const initialTimeout = setTimeout(() => {
      setShowIdeathonModal(true);
    }, isMobile ? 2000 : 0);

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

      {/* Ideathon Modal */}
      <AnimatePresence>
        {showIdeathonModal && (
          <>
            {/* Backdrop blur - only on mobile */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIdeathonModal(false)}
            />
            
            <motion.div
              className="fixed top-1/2 left-0 right-0 -translate-y-1/2 flex justify-center items-center sm:top-auto sm:left-auto sm:right-6 sm:bottom-6 sm:translate-y-0 sm:block z-50"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
            <div 
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center w-[250px] sm:w-[340px] border-2 border-white/25"
              style={{ 
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3), 0 0 25px 5px rgba(255, 255, 255, 0.25), 0 0 45px 10px rgba(255, 255, 255, 0.12), inset 0 0 35px rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowIdeathonModal(false)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </button>
              
              {/* Attention Badge */}
              <div className="mb-2 sm:mb-3">
                <motion.span 
                  className="inline-block px-2 py-1 sm:px-4 sm:py-1.5 text-green-400 text-xs sm:text-xl font-black uppercase tracking-wide drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 10px rgba(34,197,94,0.8)',
                      '0 0 20px rgba(34,197,94,1)',
                      '0 0 10px rgba(34,197,94,0.8)'
                    ]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  ⚡ Attention
                </motion.span>
              </div>
              
              {/* Rocket icon and heading */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                <motion.div
                  animate={{ 
                    y: [-2, 2, -2],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket className="w-4 h-4 sm:w-7 sm:h-7 text-green-400 drop-shadow-lg" />
                </motion.div>
                <h2 className="text-xs sm:text-xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
                  Ideathon 2025 is Here!
                </h2>
              </div>
              
              <button
                onClick={() => { setShowIdeathonModal(false); navigate('/ideathon'); }}
                className="px-3 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-full font-bold text-[9px] sm:text-sm transition-all duration-300 shadow-lg shadow-green-500/40 hover:shadow-green-400/60 hover:scale-105"
              >
                <span className="hidden lg:inline">Go to Ideathon Page →</span>
                <span className="lg:hidden">Ideathon Page →</span>
              </button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
