import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../../components/sections/events/HeroSection';
import UpcomingEventsSection from '../../components/sections/events/UpcomingEvents';
import Timeline from '../../components/sections/events/timeline'; // Changed to uppercase 'Timeline'
import type { TimelineEvent, LatestEvent } from '../../components/sections/events/timeline';
import xpert_talk from '/src/assets/images/xpert_talk.jpg';
import orientation from '/src/assets/images/orientation_2.jpg';
import hackathon from '/src/assets/images/hackathon.jpg';
// import WhatWeDoSection from '../../components/sections/events/WhatWeDo';

const EventsPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);


  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      name: "Responsible AI & Sustainability Workshop",
      imageUrl: xpert_talk,
      date: "October 10, 2025",
      icon: "WEEK ONE",       
      phase: "Workshop",
      description: "The expert session on Responsible AI by Prof. Dr. Dimitrios A. Karras was a great success, with 300+ participants gaining valuable insights and earning e-certificates for their participation.",
      attendees: 300
    },
    {
      id: 2,
      name: "Ideathon 2025",
      imageUrl: hackathon,
      date: "December XX, 2025",
      icon: "WEEK TWO",
      phase: "Upcoming: HACKATHON",
      description: "Ideathon, our flagship hackathon, brought together passionate innovators and problem-solvers to design real-world tech solutions through creativity, teamwork, and cutting-edge ideas.",
      attendees: 300
    },
    {
      id: 3,
      name: "Orientation",
      imageUrl: orientation,
      date: "January XX, 20XX",
      icon: "WEEK THREE",
      phase: "Upcoming: ORIENTATION",
      description: "The Grand Level Orientation of Flux is set to welcome a new wave of innovators and tech enthusiasts. The event will introduce students to Flux’s domains and projects, inspiring collaboration, creativity, and a passion for technology.",
      attendees: 300   }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {isLoaded && (
        <>
          <HeroSection />
          {<UpcomingEventsSection />}
          {/* <WhatWeDoSection /> */}
          <Timeline events={timelineEvents} /> {/* Changed to uppercase 'Timeline' */}
        </>
      )}
    </div>
  );
};

export default EventsPage;
