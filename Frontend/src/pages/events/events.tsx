import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../../components/sections/events/HeroSection';
import UpcomingEventsSection from '../../components/sections/events/UpcomingEvents';
import Timeline from '../../components/sections/events/timeline';
import type { TimelineEvent } from '../../components/sections/events/timeline';
import ideathoncomp from "/src/assets/images/ideathoncomp.webp";
import orientation from '/src/assets/images/freshmen_orientation_poster.png';
import expert from '/src/assets/images/expert.webp';
import atalFdp from '/src/assets/images/atalFdp.webp';
import sheLeadsBanner from '/src/assets/images/she_leads_hero_banner.jpg';

const EventsPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      name: "Freshmen Orientation",
      imageUrl: orientation,
      date: "September 10, 2026",
      icon: "WEEK ONE",
      phase: "Orientation",
      description:
        "FLUX Freshmen Orientation conducted to welcome new students, introduce the core pillars (Innovate • Interact • Impact), and connect with the FLUX family at Aryabhatta Hall.",
      attendees: 350,
    },
    {
      id: 2,
      name: "She Leads",
      imageUrl: sheLeadsBanner,
      date: "September 12-13, 2026",
      icon: "WEEK ONE",
      phase: "Summit",
      description:
        "An empowering leadership and tech summit designed to inspire, mentor, and connect tech innovators and future leaders with inspiring keynotes and sessions by industry leaders.",
      attendees: 250,
    },
    {
      id: 3,
      name: "ATAL Faculty Development Programme",
      imageUrl: atalFdp,
      date: "January 19-24, 2026",
      icon: "WEEK THREE",
      phase: "Workshop",
      description:
        "Advanced Deep Dive into the Hidden Mathematical Science of Mechanistic Interpretability - A comprehensive faculty development programme organized by MMMUT Gorakhpur in collaboration with leading experts in AI and machine learning.",
      attendees: 300,
    },
    {
      id: 4,
      name: "Ideathon 2025",
      imageUrl: ideathoncomp,
      date: "December 17-19, 2025",
      icon: "WEEK TWO",
      phase: "HACKATHON",
      description:
        "The Ideathon 2025, organized from 17th to 19th December 2025, was a great success, witnessing enthusiastic participation, innovative ideas, and collaborative problem-solving throughout the event.",
      attendees: 500,
    },
    {
      id: 5,
      name: "Artificial Intelligence Evolution and Future",
      imageUrl: expert,
      date: "November 16, 2025",
      icon: "WEEK TWO",
      phase: "Workshop",
      description:
        "The session with Er. Shivesh Sinha, Sr. Technical Program Manager at Intel USA, offered deep insights into the evolution of AI, emerging technological shifts and the rapidly transforming future shaped by intelligent systems.",
      attendees: 300,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#020202] text-white overflow-x-hidden">
      <div className="relative z-10">
        {isLoaded && (
          <>
            <HeroSection />
            <UpcomingEventsSection />
            <Timeline events={timelineEvents} />
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
