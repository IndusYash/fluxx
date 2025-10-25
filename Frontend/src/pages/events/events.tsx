import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../../components/sections/events/HeroSection';
import UpcomingEventsSection from '../../components/sections/events/UpcomingEvents';
import Timeline from '../../components/sections/events/timeline'; // Changed to uppercase 'Timeline'
import type { TimelineEvent, LatestEvent } from '../../components/sections/events/timeline';

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
      name: "AI & Machine Learning Workshop",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
      date: "October 10, 2025",
      week: "WEEK ONE",
      phase: "UNDERSTAND",
      description: "Deep dive into AI fundamentals",
      attendees: 120
    },
    {
      id: 2,
      name: "Hackathon 2025",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=200&fit=crop",
      date: "September 22, 2025",
      week: "WEEK TWO",
      phase: "DIVERGE",
      description: "48-hour coding marathon with exciting challenges",
      attendees: 200
    },
    {
      id: 3,
      name: "Design Thinking Bootcamp",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      date: "August 15, 2025",
      week: "WEEK THREE",
      phase: "CONVERGE",
      description: "Learn the art of human-centered design",
      attendees: 85
    }
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
          <UpcomingEventsSection />
          {/* <WhatWeDoSection /> */}
          <Timeline events={timelineEvents} /> {/* Changed to uppercase 'Timeline' */}
        </>
      )}
    </div>
  );
};

export default EventsPage;