// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion'; 
// import {
//   HeroSection,
//   UpcomingEvents,
//   WhatWeDo
// } from "../../components/sections/events";

// const EventsPage: React.FC = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoaded(true), 100);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans overflow-hidden">
//       {/* Enhanced Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div
//           className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.4, 0.7, 0.4],
//           }}
//           transition={{
//             duration: 5,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1
//           }}
//         />
//         <motion.div
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"
//           animate={{
//             rotate: [0, 360],
//             scale: [1, 1.3, 1],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//       </div>

//       {isLoaded && (
//         <>
//           <HeroSection />
//           <UpcomingEventsSection />
//           <WhatWeDoSection />
//         </>
//       )}
//     </div>
//   );
// };

// export default EventsPage;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import the sections using the new file structure.
// I've used the same import style as your about.tsx example.
import HeroSection from '../../components/sections/events/HeroSection';
import UpcomingEventsSection from '../../components/sections/events/UpcomingEvents';
import WhatWeDoSection from '../../components/sections/events/WhatWeDo';

const EventsPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
          <WhatWeDoSection />
        </>
      )}
    </div>
  );
};

export default EventsPage;