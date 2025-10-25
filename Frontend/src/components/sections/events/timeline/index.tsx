import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, X, ChevronRight } from 'lucide-react';

// Event interface
interface TimelineEvent {
  id: number;
  name: string;
  image: string;
  date: string;
  week: string;
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

const Timeline: React.FC<TimelineProps> = ({ events, latestEvent }) => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Events Timeline
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-500 via-blue-500 to-purple-500" />

          {/* Timeline Events */}
          <div className="space-y-16">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* Left Side Content */}
                {index % 2 === 0 ? (
                  <>
                    {/* Event Card - Left */}
                    <div className="md:text-right md:pr-12">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="relative cursor-pointer inline-block w-full"
                        onMouseEnter={() => setHoveredEvent(event.id)}
                        onMouseLeave={() => setHoveredEvent(null)}
                      >
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-56 object-cover rounded-xl shadow-2xl"
                        />
                        <div className="mt-4">
                          <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                        </div>

                        {/* Hover Popup */}
                        <AnimatePresence>
                          {hoveredEvent === event.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute left-0 top-full mt-4 w-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-5 shadow-2xl z-30"
                            >
                              <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                              <div className="flex items-center text-sm text-gray-400">
                                <Users className="w-4 h-4 mr-2 text-green-400" />
                                <span>{event.attendees} attended</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Timeline Node - Center */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-green-500 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <span className="text-sm font-bold text-center leading-tight text-white">
                          {event.week.split(' ')[1]}
                        </span>
                      </motion.div>
                    </div>

                    {/* Date and Phase - Right */}
                    <div className="md:pl-12 text-left">
                      <div className="inline-block bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                        <div className="text-green-400 font-semibold text-sm mb-2 uppercase tracking-wider">{event.phase}</div>
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                          <span className="text-lg">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Date and Phase - Left */}
                    <div className="md:pr-12 text-right order-2 md:order-1">
                      <div className="inline-block bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                        <div className="text-purple-400 font-semibold text-sm mb-2 uppercase tracking-wider">{event.phase}</div>
                        <div className="flex items-center justify-end text-gray-300">
                          <span className="text-lg">{event.date}</span>
                          <Calendar className="w-5 h-5 ml-3 text-blue-400" />
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node - Center */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-blue-500 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <span className="text-sm font-bold text-center leading-tight text-white">
                          {event.week.split(' ')[1]}
                        </span>
                      </motion.div>
                    </div>

                    {/* Event Card - Right */}
                    <div className="md:pl-12 text-left order-1 md:order-2">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="relative cursor-pointer inline-block w-full"
                        onMouseEnter={() => setHoveredEvent(event.id)}
                        onMouseLeave={() => setHoveredEvent(null)}
                      >
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-56 object-cover rounded-xl shadow-2xl"
                        />
                        <div className="mt-4">
                          <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                        </div>

                        {/* Hover Popup */}
                        <AnimatePresence>
                          {hoveredEvent === event.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Details Modal - Only shown if latestEvent is provided */}
      {latestEvent && (
        <AnimatePresence>
          {detailsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setDetailsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
              >
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm p-6 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">{latestEvent.name}</h3>
                  <button
                    onClick={() => setDetailsOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3 text-white">Event Highlights</h4>
                    <ul className="space-y-2">
                      {latestEvent.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-gray-300">
                          <ChevronRight className="w-5 h-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Gallery & Glimpses</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {latestEvent.gallery.map((image, idx) => (
                        <motion.img
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          src={image}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default Timeline;
export type { TimelineEvent, LatestEvent, TimelineProps };