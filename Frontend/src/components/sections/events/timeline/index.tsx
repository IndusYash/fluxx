import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, Lightbulb, Code2, Atom, Mic2 } from 'lucide-react';

interface TimelineEvent {
  id: number;
  name: string;
  imageUrl: string;
  date: string;
  icon: string;
  phase: string;
  description: string;
  attendees: number;
}

interface LatestEvent {
  id: number;
  name: string;
  poster: string;
  date: string;
  time: string;
  location: string;
  status: 'live' | 'completed';
  description: string;
  attendees: number;
  gallery: string[];
  highlights: string[];
}

interface TimelineProps {
  events: TimelineEvent[];
  latestEvent?: LatestEvent;
}

const iconMap: Record<string, React.ElementType> = {
  'WEEK ONE': Lightbulb,
  'WEEK TWO': Code2,
  'WEEK THREE': Atom,
  'Summit': Mic2,
};

/* ── Shared Event Card ── */
const EventCard: React.FC<{
  event: TimelineEvent;
  align: 'left' | 'right';
}> = ({ event, align }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="card-outline relative cursor-pointer w-full rounded-xl overflow-hidden
                 bg-gradient-to-br from-gray-800/60 to-gray-900/80
                 border border-gray-700/50 hover:border-white/30
                 shadow-lg hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]
                 transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={event.imageUrl}
        alt={event.name}
        className="w-full h-52 md:h-56 object-cover"
        animate={{ scale: hovered ? 1.05 : 1, filter: hovered ? 'brightness(1.1)' : 'brightness(1)' }}
        transition={{ duration: 0.4 }}
      />

      {/* Content – always visible, no absolute positioning */}
      <div className="p-5">
        <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 ${align === 'left' ? 'md:text-right' : 'text-left'}`}>
          {event.name}
        </h3>

        <p className={`text-sm text-gray-300 leading-relaxed mb-4 ${align === 'left' ? 'md:text-right' : 'text-left'} text-justify`}>
          {event.description}
        </p>

        <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-400 ${align === 'left' ? 'md:justify-end' : 'justify-start'}`}>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-white/70" />
            <span>{event.attendees} attended</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-28 md:pb-44 relative"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-2xl md:text-5xl font-extrabold mb-14 text-center 
            bg-gradient-to-r from-white via-gray-300 to-gray-500 
            bg-clip-text text-transparent tracking-wider 
            drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] 
            transition-all duration-700 ease-in-out hover:scale-105"
      >
        Events Timeline
      </motion.h2>

      <div className="relative max-w-8xl mx-auto pb-10">
        {/* Vertical connector line hidden on mobile - Background */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 bg-white/5 rounded-full"
        />
        
        {/* Animated Progress Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.7)] rounded-full z-0 origin-top"
        />

        <div className="space-y-20 md:space-y-24">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={
                isMobile
                  ? { opacity: 0, y: 40 }
                  : { opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.9 }
              }
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Mobile full width card */}
              <div className="md:hidden px-0">
                <EventCard event={event} align="left" />
              </div>

              {!isMobile && (
                <>
                  {index % 2 === 0 ? (
                    <>
                      {/* Left card */}
                      <div className="md:pr-12">
                        <EventCard event={event} align="left" />
                      </div>
                      {/* Center node */}
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                        <motion.div
                          animate={{
                            rotate: hoveredEvent === event.id ? [0, 20, 0] : 0,
                            scale: hoveredEvent === event.id ? [1, 1.2, 1] : 1,
                             boxShadow: hoveredEvent === event.id
                               ? '0px 0px 30px 0px rgba(255,255,255,0.3)'
                               : 'none',
                          }}
                          transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            repeat: hoveredEvent === event.id ? Infinity : 0,
                            repeatType: 'reverse'
                          }}
                          className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-white/40 rounded-full flex items-center justify-center shadow-2xl"
                          onMouseEnter={() => setHoveredEvent(event.id)}
                          onMouseLeave={() => setHoveredEvent(null)}
                        >
                          {(() => {
                            const Icon = iconMap[event.icon] || Lightbulb;
                            return (
                              <motion.div
                                animate={{
                                  scale: hoveredEvent === event.id ? [1, 1.11, 1] : 1,
                                }}
                                transition={{
                                  duration: 1.1,
                                  repeat: hoveredEvent === event.id ? Infinity : 0,
                                  repeatType: 'reverse'
                                }}
                              >
                                <Icon className="w-8 h-8 text-white" />
                              </motion.div>
                            );
                          })()}
                        </motion.div>
                      </div>
                      {/* Right info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="md:pl-12 text-left"
                      >
                        <div className="inline-block bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-white/40 transition-colors duration-300">
                          <div className="text-white font-semibold text-sm mb-2 uppercase tracking-wider">{event.phase}</div>
                          <div className="flex items-center text-gray-300">
                            <Calendar className="w-5 h-5 mr-3 text-white" />
                            <span className="text-lg">{event.date}</span>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Left info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="md:pr-12 text-right order-2 md:order-1"
                      >
                        <div className="inline-block bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-white/40 transition-colors duration-300">
                          <div className="text-white font-semibold text-sm mb-2 uppercase tracking-wider">{event.phase}</div>
                          <div className="flex items-center justify-end text-gray-300">
                            <span className="text-lg">{event.date}</span>
                            <Calendar className="w-5 h-5 ml-3 text-white" />
                          </div>
                        </div>
                      </motion.div>
                      {/* Center node */}
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                        <motion.div
                          animate={{
                            rotate: hoveredEvent === event.id ? [0, -20, 0] : 0,
                            scale: hoveredEvent === event.id ? [1, 1.2, 1] : 1,
                             boxShadow: hoveredEvent === event.id
                               ? '0px 0px 30px 0px rgba(255,255,255,0.3)'
                               : 'none',
                          }}
                          transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            repeat: hoveredEvent === event.id ? Infinity : 0,
                            repeatType: 'reverse'
                          }}
                          className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-white/40 rounded-full flex items-center justify-center shadow-2xl"
                          onMouseEnter={() => setHoveredEvent(event.id)}
                          onMouseLeave={() => setHoveredEvent(null)}
                        >
                          {(() => {
                            const Icon = iconMap[event.icon] || Lightbulb;
                            return (
                              <motion.div
                                animate={{
                                  scale: hoveredEvent === event.id ? [1, 1.11, 1] : 1,
                                }}
                                transition={{
                                  duration: 1.1,
                                  repeat: hoveredEvent === event.id ? Infinity : 0,
                                  repeatType: 'reverse'
                                }}
                              >
                                <Icon className="w-8 h-8 text-white" />
                              </motion.div>
                            );
                          })()}
                        </motion.div>
                      </div>
                      {/* Right card */}
                      <div className="md:pl-12 text-left order-1 md:order-2">
                        <EventCard event={event} align="right" />
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
export type { TimelineEvent, LatestEvent, TimelineProps };
