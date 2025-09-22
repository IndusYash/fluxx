import Hero from "@/components/sections/home/Hero"
import { motion } from "framer-motion"
import Showcase from "@/components/sections/home/Showcase"
import InductionCTA from "@/components/sections/home/InductionCTA"
import FacultyPreview from "@/components/sections/home/FacultyPreview"
import EventsPreview from "@/components/sections/home/EventsPreview"
import ContactPreview from "@/components/sections/home/ContactPreview"
import { useState, useEffect } from "react"

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < breakpoint)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [breakpoint])

  return isMobile
}

export default function HomePage() {
  const isMobile = useIsMobile()

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
        <InductionCTA />
        {!isMobile && <ContactPreview />}
      </motion.div>
    </>
  )
}
