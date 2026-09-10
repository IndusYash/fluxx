import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Lightbulb, Code2, Atom } from 'lucide-react';

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
};

const Timeline: React.FC<TimelineProps> = ({ events, latestEvent }) => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-28 md:pb-44"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-2xl md:text-5xl font-extrabold mb-14 text-center 
            bg-gradient-to-r from-green-300 via-emerald-500 to-gray-800 
            bg-clip-text text-transparent tracking-wider 
            drop-shadow-[0_2px_8px_rgba(0,255,128,0.15)] 
            transition-all duration-700 ease-in-out hover:scale-105"
      >
        Events Timeline
      </motion.h2>

      <div className="relative max-w-8xl mx-auto">
        {/* Vertical connector line hidden on mobile */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="hidden md:block absolute left-1/2 top-0 -bottom-20 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"
        />

        <div className="space-y-16">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={
                isMobile
                  ? { opacity: 0, y: 40 }
                  : { opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.9 }
              }
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Mobile full width card */}
              <div className="md:hidden px-0">
                <motion.div
                  whileHover={{ scale: 1.04, y: -6, boxShadow: '0px 8px 32px rgba(102,62,232,0.09)' }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                  className="relative cursor-pointer inline-block w-full"
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <motion.img
                    src={event.imageUrl}
                    alt={event.name}
                    whileHover={{ scale: 1.05, filter: 'brightness(1.12)' }}
                    transition={{ duration: 0.4, type: 'tween' }}
                    className="w-full h-52 object-cover rounded-xl shadow-2xl"
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-2 mb-1">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">{event.attendees} attended</span>
                    </div>
                    <span className="text-green-400 font-semibold text-xs uppercase tracking-wide">{event.phase}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-xs gap-1">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-300">{event.description}</div>
                </motion.div>
              </div>

              {!isMobile && (
                <>
                  {index % 2 === 0 ? (
                    <>
                      {/* Left card */}
                      <div className="md:text-right md:pr-12">
                        <motion.div
                          whileHover={{ scale: 1.04, y: -6, boxShadow: '0px 8px 32px rgba(102,62,232,0.09)' }}
                          transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                          className="relative cursor-pointer inline-block w-full"
                          onMouseEnter={() => setHoveredEvent(event.id)}
                          onMouseLeave={() => setHoveredEvent(null)}
                        >
                          <motion.img
                            src={event.imageUrl}
                            alt={event.name}
                            whileHover={{ scale: 1.05, filter: 'brightness(1.12)' }}
                            transition={{ duration: 0.4, type: 'tween' }}
                            className="w-full h-56 object-cover rounded-xl shadow-2xl"
                          />
                          <div className="mt-4">
                            <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                          </div>
                          <AnimatePresence>
                            {hoveredEvent === event.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1.04 }}
                                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 180, damping: 18, duration: 0.24 }}
                                className="absolute left-0 top-full mt-4 w-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-5 shadow-2xl z-30"
                              >
                                <motion.p
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.32, delay: 0.16 }}
                                  className="text-sm text-gray-300 mb-3 text-justify leading-relaxed"
                                >
                                  {event.description}
                                </motion.p>
                                <div className="flex items-center text-sm text-gray-400">
                                  <Users className="w-4 h-4 mr-2 text-green-400" />
                                  <span>{event.attendees} attended</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                      {/* Center node */}
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                        <motion.div
                          animate={{
                            rotate: hoveredEvent === event.id ? [0, 20, 0] : 0,
                            scale: hoveredEvent === event.id ? [1, 1.2, 1] : 1,
                            boxShadow: hoveredEvent === event.id
                              ? '0px 0px 30px 0px #a78bfa'
                              : 'none',
                          }}
                          transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            repeat: hoveredEvent === event.id ? Infinity : 0,
                            repeatType: 'reverse'
                          }}
                          className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-green-500 rounded-full flex items-center justify-center shadow-2xl"
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
                                <Icon className="w-8 h-8 text-yellow-400" />
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
                        <div className="inline-block bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-green-400 transition-colors duration-300">
                          <div className="text-green-400 font-semibold text-sm mb-2 uppercase tracking-wider">{event.phase}</div>
                          <div className="flex items-center text-gray-300">
                            <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                            <span className="text-lg">{event.date}</span>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Right info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="md:pr-12 text-right order-2 md:order-1"
                      >
                        <div className="inline-block bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-blue-400 transition-colors duration-300">
                          <div className="text-purple-400 font-semibold text-sm mb-2 uppercase tracking-wider">{event.phase}</div>
                          <div className="flex items-center justify-end text-gray-300">
                            <span className="text-lg">{event.date}</span>
                            <Calendar className="w-5 h-5 ml-3 text-blue-400" />
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
                              ? '0px 0px 30px 0px #38bdf8'
                              : 'none',
                          }}
                          transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            repeat: hoveredEvent === event.id ? Infinity : 0,
                            repeatType: 'reverse'
                          }}
                          className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-blue-500 rounded-full flex items-center justify-center shadow-2xl"
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
                                <Icon className="w-8 h-8 text-yellow-400" />
                              </motion.div>
                            );
                          })()}
                        </motion.div>
                      </div>
                      {/* Card right */}
                      <div className="md:pl-12 text-left order-1 md:order-2">
                        <motion.div
                          whileHover={{ scale: 1.04, y: -6, boxShadow: '0px 8px 32px rgba(52,160,255,0.10)' }}
                          transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                          className="relative cursor-pointer inline-block w-full"
                          onMouseEnter={() => setHoveredEvent(event.id)}
                          onMouseLeave={() => setHoveredEvent(null)}
                        >
                          <motion.img
                            src={event.imageUrl}
                            alt={event.name}
                            whileHover={{ scale: 1.05, filter: 'brightness(1.12)' }}
                            transition={{ duration: 0.4, type: 'tween' }}
                            className="w-full h-56 object-cover rounded-xl shadow-2xl"
                          />
                          <div className="mt-4">
                            <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                          </div>
                          <AnimatePresence>
                            {hoveredEvent === event.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1.04 }}
                                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 180, damping: 18, duration: 0.24 }}
                                className="absolute right-0 top-full mt-4 w-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-5 shadow-2xl z-30"
                              >
                                <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                                <div className="flex items-center text-sm text-gray-400">
                                  <Users className="w-4 h-4 mr-2 text-blue-400" />
                                  <span>{event.attendees} attended</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
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
