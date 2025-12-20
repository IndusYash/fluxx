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


    </>
  );
}
