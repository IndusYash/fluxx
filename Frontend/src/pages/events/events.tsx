import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import MagicBentoEvents from '@/components/ui/MagicBentoEvents';
import {
  Calendar, MapPin, Users, ArrowRight, Code, Presentation, FileText, Trophy, Lightbulb, Sparkles, Zap
} from 'lucide-react';
import { gsap } from 'gsap';

// Mock images for the example
// const fluxxgfgImg = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop';
import fluxxgfgImg from '@/assets/images/flux-x-gfg.png';
const techConferenceImg = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop';
const designWorkshopImg = 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop';
const workshopImg = 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop';
const seminarImg = 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  isUpcoming: boolean;
  location?: string;
  attendees?: number;
  category: 'Tech' | 'Design' | 'Business' | 'Research';
  prize?: string;
  featured?: boolean;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  imageUrl: string;
  color: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'IDEATHON 2025',
    date: '2025-XX-XX',
    description:
      "Join innovators, coders, and thinkers to brainstorm, build, and showcase groundbreaking solutions. Unleash your ideas, collaborate with peers, and be part of a game- changing experience!",
    imageUrl: fluxxgfgImg,
    isUpcoming: true,
    location: 'CSED, MMMUT, Gorakhpur',
    attendees: 1000,
    category: 'Tech',
    prize: '₹50,000',
    featured: true,
  }
];

const activities: Activity[] = [
  {
    id: 1,
    title: 'Hackathons',
    description:
      'Intensive coding competitions where innovation meets collaboration. Solve real-world problems in 24-48 hours.',
    icon: <Zap className="w-8 h-8" />,
    features: ['24-48 Hour Challenges', 'Real-world Problems'],
    imageUrl: techConferenceImg,
    color: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    title: 'Conferences',
    description:
      'Professional gatherings featuring industry experts, thought leaders, and cutting-edge research presentations.',
    icon: <Sparkles className="w-8 h-8" />,
    features: ['Expert Speakers', 'Networking Sessions'],
    imageUrl: designWorkshopImg,
    color: 'from-green-600 to-teal-600',
  },
  {
    id: 3,
    title: 'Workshops',
    description:
      'Hands-on sessions where participants can learn practical skills, explore new tools, and enhance their expertise.',
    icon: <FileText className="w-8 h-8" />,
    features: ['Interactive Labs', 'Skill Development'],
    imageUrl: workshopImg,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: 'Seminars',
    description:
      'Focused discussions and presentations on emerging trends, research findings, and industry insights.',
    icon: <Presentation className="w-8 h-8" />,
    features: ['Knowledge Sharing', 'Interactive Q&A'],
    imageUrl: seminarImg,
    color: 'from-yellow-400 to-orange-400',
  },
  {
    id: 5,
    title: 'Competitions',
    description:
      'Engaging contests designed to challenge creativity, problem-solving, and technical skills among participants.',
    icon: <Trophy className="w-8 h-8" />,
    features: ['Prizes & Recognition', 'Skill Challenges'],
    imageUrl: Code,
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 6,
    title: 'Innovation Labs',
    description:
      'Collaborative spaces where participants experiment with new ideas, prototype solutions, and push the boundaries of creativity.',
    icon: <Lightbulb className="w-8 h-8" />,
    features: ['Hands-on Prototyping', 'Creative Collaboration'],
    imageUrl: techConferenceImg,
    color: 'from-blue-500 to-indigo-500',
  }
];

// Enhanced Event Card Component with Advanced Animations
const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 25 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.9, rotateX: -15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
        damping: 20
      }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        rotateX: -2,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-md p-8 border border-green-500/20 hover:border-green-400/50 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: isHovered ? [-10, -20, -10] : [0, -5, 0],
              opacity: isHovered ? [0.3, 0.8, 0.3] : [0.1, 0.3, 0.1],
              scale: isHovered ? [1, 1.5, 1] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Enhanced Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotateY: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          className="relative overflow-hidden rounded-2xl group/image"
        >
          <motion.div
            className="relative w-full h-96 overflow-hidden rounded-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.15 : 1.05,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />

            {/* Dynamic Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-green-500/20"
              animate={{
                opacity: isHovered ? 0.8 : 0.3,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 border-2 border-green-400/0 rounded-2xl"
              animate={{
                borderColor: isHovered ? 'rgba(74, 222, 128, 0.5)' : 'rgba(74, 222, 128, 0)',
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
          className="space-y-8"
        >
          {/* Title with Character Animation */}
          <motion.h3
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            animate={isHovered ? {
              backgroundPosition: ['0%', '100%', '0%'],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {event.title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.6 + i * 0.05 }}
                whileHover={{
                  y: -2,
                  color: '#4ade80',
                  transition: { duration: 0.2 }
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h3>

          {/* Description with Typewriter Effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.8 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            {event.description}
          </motion.p>

          {/* Event Details with Staggered Animation */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: index * 0.15 + 1
                }
              }
            }}
          >
            {[
              // { icon: Calendar, text: formatDate(event.date) },
              { icon: Calendar, text: event.date },
              { icon: MapPin, text: event.location },
              { icon: Users, text: `${event.attendees}+ innovators` }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -30, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 }
                }}
                whileHover={{
                  x: 10,
                  color: '#4ade80',
                  transition: { duration: 0.2 }
                }}
                className="flex items-center gap-4 text-gray-300 cursor-pointer group/detail"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-6 h-6 text-green-500 group-hover/detail:text-green-400" />
                </motion.div>
                <span className="text-lg group-hover/detail:text-green-400 transition-colors duration-300">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Register Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 1.3, type: "spring", stiffness: 200 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(74, 222, 128, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-400 rounded-xl text-black font-semibold hover:from-green-500 hover:to-green-300 transition-all duration-300 shadow-lg overflow-hidden group/button"
            >
              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{
                  x: isHovered ? ['100%', '-100%'] : '-100%',
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <span className="relative z-10">Register Now</span>
              <motion.div
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Bento Grid Component
const MagicBentoGrid = ({ activities }: { activities: Activity[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: index * 0.2,
            type: "spring",
            stiffness: 100
          }}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 hover:border-green-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(135deg, ${activity.color.replace('from-', '').replace(' to-', ', ')})` }} />

          <div className="relative p-8 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 group-hover:from-green-400/30 group-hover:to-blue-400/30 transition-all duration-500">
                {activity.icon}
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                {activity.title}
              </h3>
            </div>

            <p className="text-gray-300 text-lg mb-6 flex-grow group-hover:text-white transition-colors duration-300">
              {activity.description}
            </p>

            <div className="space-y-2 mb-6">
              {activity.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.2) + (idx * 0.1) }}
                  className="flex items-center gap-2 text-gray-400 group-hover:text-green-300 transition-colors duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {feature}
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end">
              <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-green-400 transform group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const EventsPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [showFeaturedEvent, setShowFeaturedEvent] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsLoaded(true), 100),
      setTimeout(() => setShowHero(true), 300),
      setTimeout(() => setShowFeaturedEvent(true), 800),
      setTimeout(() => setShowActivities(true), 1200),
    ];

    return () => timers.forEach(clearTimeout);
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="relative container mx-auto text-center z-10">
          <AnimatePresence>
            {showHero && (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="mb-8"
                >
                  <Lightbulb className="w-20 h-20 mx-auto text-green-500 drop-shadow-2xl" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-white to-green-400 bg-clip-text text-transparent"
                >
                  Step Into the Future
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
                >
                  Explore events, workshops, and conferences crafted for innovators.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-green-600 to-green-400 rounded-full text-black font-semibold hover:from-green-500 hover:to-green-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 cursor-pointer"
                >
                  Explore Events
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced Upcoming Events Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <AnimatePresence>
            {showFeaturedEvent && (
              <>
                {/* Enhanced Section Title */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, type: "spring", stiffness: 100 }}
                  className="text-center mb-20 "
                >
                  <motion.h2
                    className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-400 via-white to-green-400 bg-clip-text text-transparent pb-6"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 700,
                      fontStyle: "normal"
                    }}
                    animate={{
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    Upcoming Events
                  </motion.h2>


                  {/* Animated Underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100px' }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mx-auto mt-4 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                  />
                </motion.div>

                {/* Enhanced Events Grid */}
                <div className="space-y-16">
                  <AnimatePresence>
                    {events.map((event, index) => (
                      <EventCard key={event.id ?? index} event={event} index={index} />
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* What We Do Section */}
      <AnimatePresence>
        {showActivities && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-20 px-4"
          >
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
                  What We Do
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  We organize diverse events that foster learning, innovation, and collaboration in the tech community.
                </p>
              </motion.div>

              {/* React Bits Magic Bento Grid */}
              <MagicBentoEvents
                activities={activities}             
                textAutoHide={true}                 
                enableStars={true}                  
                enableSpotlight={true}              
                enableBorderGlow={true}             
                disableAnimations={false}           
                spotlightRadius={300}               
                particleCount={12}                  
                enableTilt={true}                   
                glowColor="255, 255, 255"             
                clickEffect={true}                  
                enableMagnetism={true}              
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EventsPage;