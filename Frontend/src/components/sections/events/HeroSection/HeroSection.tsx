import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import TrueFocus from './TrueFocusHero';

// Define the component's props interface here.
export interface HeroSectionProps { }

const HeroSection: React.FC<HeroSectionProps> = () => {
    return (
        <section className="relative overflow-hidden pt-20 pb-16 px-4">
            <div className="relative container mx-auto text-center z-10">
                <AnimatePresence>
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
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            // The h1 now has a larger font size class
                            className="text-6xl md:text-8xl font-extrabold mb-6"
                        >
                            <TrueFocus
                                sentence="Step Into the Future"
                                manualMode={false}
                                blurAmount={5}
                                borderColor="white"
                                animationDuration={0.5}
                                pauseBetweenAnimations={0.5}
                                textColorClasses="bg-gradient-to-b from-purple-800 to-blue-400 bg-clip-text text-transparent text-6xl md:text-8xl"
                            />
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
                        >
                            Explore events, workshops, and conferences crafted for innovators.
                        </motion.p>
                    </>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default HeroSection;