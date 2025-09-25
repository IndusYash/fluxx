import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Lightbulb } from 'lucide-react';

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
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        isUpcoming: true,
        location: 'CSED, MMMUT, Gorakhpur',
        attendees: 1000,
        category: 'Tech',
        prize: '₹50,000',
        featured: true,
    }
];

// Big White Glowing Bulb Component
const BigWhiteBulb = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative inline-block"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Outer White Glow Ring */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: isHovered 
                        ? [
                            '0 0 30px rgba(255, 255, 255, 0.3)',
                            '0 0 60px rgba(255, 255, 255, 0.5)',
                            '0 0 90px rgba(255, 255, 255, 0.4)',
                            '0 0 30px rgba(255, 255, 255, 0.3)'
                          ]
                        : ['0 0 15px rgba(255, 255, 255, 0.1)']
                }}
                transition={{
                    duration: isHovered ? 2.5 : 0.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut"
                }}
            />
            
            {/* Main Bulb Container */}
            <motion.div
                className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-white border-2 border-white/40 flex items-center justify-center overflow-hidden shadow-lg"
                animate={{
                    borderColor: isHovered 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(255, 255, 255, 0.4)',
                    background: isHovered
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(248, 250, 252, 0.9))'
                        : 'linear-gradient(135deg, rgb(243, 244, 246), rgb(255, 255, 255))'
                }}
                transition={{ duration: 0.4 }}
            >
                {/* White Light Particles */}
                {isHovered && [...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ 
                            x: 0, 
                            y: 0, 
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            x: Math.cos((i * Math.PI * 2) / 10) * 35,
                            y: Math.sin((i * Math.PI * 2) / 10) * 35,
                            opacity: [0, 0.8, 0],
                            scale: [0, 2, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut"
                        }}
                        style={{
                            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
                        }}
                    />
                ))}
                
                {/* Inner White Glow Effect */}
                <motion.div
                    className="absolute inset-2 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
                    }}
                    animate={{
                        opacity: isHovered ? [0.4, 0.8, 0.4] : 0.2,
                        scale: isHovered ? [1, 1.3, 1] : 1
                    }}
                    transition={{
                        duration: 2,
                        repeat: isHovered ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                />
                
                {/* Lightbulb Icon */}
                <motion.div
                    animate={{
                        color: isHovered ? '#ffffff' : '#6b7280',
                        filter: isHovered 
                            ? 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))'
                            : 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.1))'
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Lightbulb className="w-10 h-10 relative z-10" />
                </motion.div>
                
                {/* White Filament Lines */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                        opacity: isHovered ? 0.7 : 0.3
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white/60 rounded-full"
                            style={{
                                width: '1px',
                                height: `${14 + i * 3}px`,
                                transform: `rotate(${i * 45}deg)`
                            }}
                            animate={{
                                boxShadow: isHovered
                                    ? `0 0 6px rgba(255, 255, 255, 0.8)`
                                    : '0 0 2px rgba(255, 255, 255, 0.3)'
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </motion.div>
            </motion.div>
            
            {/* Pulsing White Base Glow */}
            <motion.div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-white/30 rounded-full blur-sm"
                animate={{
                    scaleX: isHovered ? [1, 1.8, 1] : 1,
                    opacity: isHovered ? [0.3, 0.7, 0.3] : 0.2
                }}
                transition={{
                    duration: 2.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
};

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
                     
                            
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};


const UpcomingEvents: React.FC<UpcomingEventsSectionProps> = () => {
    const upcomingEvents = events.filter(event => event.isUpcoming);

    return (
        <section className="py-20 px-4 relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100 }}
                    className="text-center mb-20"
                >
                    {/* Title with Big White Bulb */}
                    <div className="flex items-center justify-center gap-8 mb-6">
                        <BigWhiteBulb />
                        <motion.div 
                            className="relative cursor-pointer"
                            initial={{ filter: "blur(8px)", opacity: 0.3 }}
                            animate={{ filter: "blur(0px)", opacity: 1 }}
                            transition={{ 
                                duration: 2,
                                delay: 0.8,
                                ease: "easeOut"
                            }}
                        >
                            <motion.h2
                                className="text-5xl md:text-7xl font-extrabold relative z-10 transition-all duration-500"
                                style={{
                                    fontFamily: "'Orbitron', sans-serif",
                                    fontWeight: 700,
                                    fontStyle: "normal",
                                    color: '#e5e7eb',
                                    textShadow: '0 0 2px rgba(156, 163, 175, 0.5)'
                                }}
                                whileHover={{
                                    color: '#ffffff',
                                    textShadow: `
                                        0 0 5px rgba(74, 222, 128, 0.6),
                                        0 0 10px rgba(74, 222, 128, 0.4),
                                        0 0 15px rgba(74, 222, 128, 0.3),
                                        0 0 20px rgba(34, 197, 94, 0.2),
                                        0 0 30px rgba(34, 197, 94, 0.1)
                                    `,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                Upcoming Events
                            </motion.h2>
                            
                            {/* Electric Lightning Effects - Only on hover */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute bg-green-400/80 opacity-0 pointer-events-none"
                                    style={{
                                        width: '1px',
                                        height: `${Math.random() * 20 + 8}px`,
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        transform: `rotate(${Math.random() * 360}deg)`,
                                        borderRadius: '0.5px',
                                        filter: 'blur(0.3px)',
                                        boxShadow: '0 0 4px rgba(74, 222, 128, 0.6)'
                                    }}
                                />
                            ))}
                            
                            {/* Crackling Energy Lines - Only on hover */}
                            {[...Array(4)].map((_, i) => (
                                <motion.svg
                                    key={`crack-${i}`}
                                    className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
                                    viewBox="0 0 400 100"
                                >
                                    <motion.path
                                        d={`M${Math.random() * 50} ${20 + Math.random() * 60} 
                                           L${100 + Math.random() * 50} ${30 + Math.random() * 40}
                                           L${200 + Math.random() * 50} ${25 + Math.random() * 50}
                                           L${300 + Math.random() * 50} ${35 + Math.random() * 30}
                                           L${350 + Math.random() * 50} ${20 + Math.random() * 60}`}
                                        stroke="rgba(74, 222, 128, 0.7)"
                                        strokeWidth="0.8"
                                        fill="none"
                                        style={{
                                            filter: 'drop-shadow(0 0 3px rgba(74, 222, 128, 0.5))'
                                        }}
                                    />
                                </motion.svg>
                            ))}
                            
                            {/* Energy Orbs - Only on hover */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={`orb-${i}`}
                                    className="absolute w-0.5 h-0.5 bg-green-400/70 rounded-full opacity-0 pointer-events-none"
                                    style={{
                                        left: `${15 + Math.random() * 70}%`,
                                        top: `${15 + Math.random() * 70}%`,
                                        boxShadow: '0 0 4px rgba(74, 222, 128, 0.6)'
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                    
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '150px' }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mx-auto mt-4 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg shadow-green-400/50"
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