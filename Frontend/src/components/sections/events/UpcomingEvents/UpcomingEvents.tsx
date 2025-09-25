// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
// import fluxxgfgImg from '@/assets/images/flux-x-gfg.png';

// interface Event {
//     id: number;
//     title: string;
//     date: string;
//     description: string;
//     imageUrl: string;
//     isUpcoming: boolean;
//     location?: string;
//     attendees?: number;
//     category: 'Tech' | 'Design' | 'Business' | 'Research';
//     prize?: string;
//     featured?: boolean;
// }

// const events: Event[] = [
//     {
//         id: 1,
//         title: 'GFG IDEATHON 2025',
//         date: '2025-XX-XX',
//         description:
//             "Join innovators, coders, and thinkers to brainstorm, build, and showcase groundbreaking solutions. Unleash your ideas, collaborate with peers, and be part of a game- changing experience!",
//         imageUrl: fluxxgfgImg,
//         isUpcoming: true,
//         location: 'CSED, MMMUT, Gorakhpur',
//         attendees: 1000,
//         category: 'Tech',
//         prize: '₹50,000',
//         featured: true,
//     }
// ];

// const EventCard = ({ event, index }: { event: Event; index: number }) => {
//     const [isHovered, setIsHovered] = React.useState(false);

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 25 }}
//             whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
//             animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
//             exit={{ opacity: 0, y: -50, scale: 0.9, rotateX: -15 }}
//             transition={{
//                 duration: 0.8,
//                 delay: index * 0.15,
//                 type: "spring",
//                 stiffness: 80,
//                 damping: 20
//             }}
//             whileHover={{
//                 scale: 1.02,
//                 rotateY: 2,
//                 rotateX: -2,
//                 transition: { duration: 0.3 }
//             }}
//             onHoverStart={() => setIsHovered(true)}
//             onHoverEnd={() => setIsHovered(false)}
//             className="group relative rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-md p-8 border border-green-500/20 hover:border-green-400/50 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden"
//         >
//             <motion.div
//                 className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 opacity-0"
//                 animate={{
//                     opacity: isHovered ? 1 : 0,
//                     scale: isHovered ? 1.1 : 1,
//                 }}
//                 transition={{ duration: 0.5 }}
//             />
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 {[...Array(6)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute w-2 h-2 bg-green-400/30 rounded-full"
//                         style={{
//                             left: `${20 + i * 15}%`,
//                             top: `${30 + (i % 2) * 40}%`,
//                         }}
//                         animate={{
//                             y: isHovered ? [-10, -20, -10] : [0, -5, 0],
//                             opacity: isHovered ? [0.3, 0.8, 0.3] : [0.1, 0.3, 0.1],
//                             scale: isHovered ? [1, 1.5, 1] : [0.8, 1, 0.8],
//                         }}
//                         transition={{
//                             duration: 2 + i * 0.2,
//                             repeat: Infinity,
//                             delay: i * 0.3,
//                         }}
//                     />
//                 ))}
//             </div>
//             <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
//                 <motion.div
//                     initial={{ opacity: 0, x: -80, rotateY: 25 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true, amount: 0.3 }}
//                     animate={{ opacity: 1, x: 0, rotateY: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
//                     className="relative overflow-hidden rounded-2xl group/image"
//                 >
//                     <motion.div
//                         className="relative w-full h-96 overflow-hidden rounded-2xl"
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <motion.img
//                             src={event.imageUrl}
//                             alt={event.title}
//                             className="w-full h-full object-cover"
//                             animate={{
//                                 scale: isHovered ? 1.15 : 1.05,
//                             }}
//                             transition={{ duration: 0.7, ease: "easeOut" }}
//                         />
//                         <motion.div
//                             className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-green-500/20"
//                             animate={{
//                                 opacity: isHovered ? 0.8 : 0.3,
//                             }}
//                             transition={{ duration: 0.5 }}
//                         />
//                         <motion.div
//                             className="absolute inset-0 border-2 border-green-400/0 rounded-2xl"
//                             animate={{
//                                 borderColor: isHovered ? 'rgba(74, 222, 128, 0.5)' : 'rgba(74, 222, 128, 0)',
//                             }}
//                             transition={{ duration: 0.3 }}
//                         />
//                     </motion.div>
//                 </motion.div>
//                 <motion.div
//                     initial={{ opacity: 0, x: 80 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true, amount: 0.3 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
//                     className="space-y-8"
//                 >
//                     <motion.h3
//                         className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
//                         animate={isHovered ? {
//                             backgroundPosition: ['0%', '100%', '0%'],
//                         } : {}}
//                         transition={{ duration: 2, repeat: Infinity }}
//                     >
//                         {event.title.split('').map((char, i) => (
//                             <motion.span
//                                 key={i}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.15 + 0.6 + i * 0.05 }}
//                                 whileHover={{
//                                     y: -2,
//                                     color: '#4ade80',
//                                     transition: { duration: 0.2 }
//                                 }}
//                                 className="inline-block"
//                             >
//                                 {char === ' ' ? '\u00A0' : char}
//                             </motion.span>
//                         ))}
//                     </motion.h3>
//                     <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: index * 0.15 + 0.8 }}
//                         className="text-gray-300 text-lg leading-relaxed"
//                     >
//                         {event.description}
//                     </motion.p>
//                     <motion.div
//                         className="space-y-4"
//                         initial="hidden"
//                         animate="visible"
//                         variants={{
//                             visible: {
//                                 transition: {
//                                     staggerChildren: 0.1,
//                                     delayChildren: index * 0.15 + 1
//                                 }
//                             }
//                         }}
//                     >
//                         {[
//                             { icon: Calendar, text: event.date },
//                             { icon: MapPin, text: event.location },
//                             { icon: Users, text: `${event.attendees}+ innovators` }
//                         ].map((item, i) => (
//                             <motion.div
//                                 key={i}
//                                 variants={{
//                                     hidden: { opacity: 0, x: -30, scale: 0.8 },
//                                     visible: { opacity: 1, x: 0, scale: 1 }
//                                 }}
//                                 whileHover={{
//                                     x: 10,
//                                     color: '#4ade80',
//                                     transition: { duration: 0.2 }
//                                 }}
//                                 className="flex items-center gap-4 text-gray-300 cursor-pointer group/detail"
//                             >
//                                 <motion.div
//                                     whileHover={{ rotate: 360, scale: 1.2 }}
//                                     transition={{ duration: 0.5 }}
//                                 >
//                                     <item.icon className="w-6 h-6 text-green-500 group-hover/detail:text-green-400" />
//                                 </motion.div>
//                                 <span className="text-lg group-hover/detail:text-green-400 transition-colors duration-300">
//                                     {item.text}
//                                 </span>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.5, y: 30 }}
//                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                         transition={{ delay: index * 0.15 + 1.3, type: "spring", stiffness: 200 }}
//                     >
//                         <motion.button
//                             whileHover={{
//                                 scale: 1.05,
//                                 boxShadow: '0 20px 40px rgba(74, 222, 128, 0.4)',
//                             }}
//                             whileTap={{ scale: 0.95 }}
//                             className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-400 rounded-xl text-black font-semibold hover:from-green-500 hover:to-green-300 transition-all duration-300 shadow-lg overflow-hidden group/button"
//                         >
//                             <motion.div
//                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
//                                 animate={{
//                                     x: isHovered ? ['100%', '-100%'] : '-100%',
//                                 }}
//                                 transition={{ duration: 0.8, delay: 0.2 }}
//                             />
//                             <span className="relative z-10">Register Now</span>
//                             <motion.div
//                                 animate={isHovered ? { x: 5 } : { x: 0 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <ArrowRight className="w-5 h-5 relative z-10" />
//                             </motion.div>
//                         </motion.button>
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </motion.div>
//     );
// };


// const UpcomingEvents: React.FC = () => {
//     const upcomingEvents = events.filter(event => event.isUpcoming);

//     return (
//         <section className="py-20 px-4 relative">
//             <div className="container mx-auto max-w-7xl relative z-10">
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1, type: "spring", stiffness: 100 }}
//                     className="text-center mb-20 "
//                 >
//                     <motion.h2
//                         className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-400 via-white to-green-400 bg-clip-text text-transparent pb-6"
//                         style={{
//                             fontFamily: "'Orbitron', sans-serif",
//                             fontWeight: 700,
//                             fontStyle: "normal"
//                         }}
//                         animate={{
//                             backgroundPosition: ['0%', '100%', '0%'],
//                         }}
//                         transition={{
//                             duration: 8,
//                             repeat: Infinity,
//                             ease: "linear"
//                         }}
//                     >
//                         Upcoming Events
//                     </motion.h2>
//                     <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: '100px' }}
//                         transition={{ delay: 0.5, duration: 0.8 }}
//                         className="mx-auto mt-4 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
//                     />
//                 </motion.div>
//                 <div className="space-y-16">
//                     <AnimatePresence>
//                         {upcomingEvents.map((event, index) => (
//                             <EventCard key={event.id ?? index} event={event} index={index} />
//                         ))}
//                     </AnimatePresence>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default UpcomingEvents;




import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import fluxxgfgImg from '@/assets/images/flux-x-gfg.png';

// Type definitions for the UpcomingEventsSection component and its child EventCard
export interface UpcomingEventsSectionProps { }

export interface EventProps {
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

const events: EventProps[] = [
    {
        id: 1,
        title: 'GFG IDEATHON 2025',
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

const EventCard = ({ event, index }: { event: EventProps; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

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
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 opacity-0"
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
            />
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
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-green-500/20"
                            animate={{
                                opacity: isHovered ? 0.8 : 0.3,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute inset-0 border-2 border-green-400/0 rounded-2xl"
                            animate={{
                                borderColor: isHovered ? 'rgba(74, 222, 128, 0.5)' : 'rgba(74, 222, 128, 0)',
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
                    className="space-y-8"
                >
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
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.8 }}
                        className="text-gray-300 text-lg leading-relaxed"
                    >
                        {event.description}
                    </motion.p>
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


const UpcomingEvents: React.FC<UpcomingEventsSectionProps> = () => {
    const upcomingEvents = events.filter(event => event.isUpcoming);

    return (
        <section className="py-20 px-4 relative">
            <div className="container mx-auto max-w-7xl relative z-10">
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
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100px' }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mx-auto mt-4 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                    />
                </motion.div>
                <div className="space-y-16">
                    <AnimatePresence>
                        {upcomingEvents.map((event, index) => (
                            <EventCard key={event.id ?? index} event={event} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;