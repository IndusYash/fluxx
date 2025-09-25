// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Lightbulb } from 'lucide-react';

// const HeroSection: React.FC = () => {
//     return (
//         <section className="relative overflow-hidden pt-20 pb-16 px-4">
//             <div className="relative container mx-auto text-center z-10">
//                 <AnimatePresence>
//                     <>
//                         <motion.div
//                             initial={{ scale: 0, rotate: -180 }}
//                             animate={{ scale: 1, rotate: 0 }}
//                             transition={{
//                                 duration: 1,
//                                 type: "spring",
//                                 stiffness: 100
//                             }}
//                             className="mb-8"
//                         >
//                             <Lightbulb className="w-20 h-20 mx-auto text-green-500 drop-shadow-2xl" />
//                         </motion.div>

//                         <motion.h1
//                             initial={{ opacity: 0, y: 50 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                             className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-white to-green-400 bg-clip-text text-transparent"
//                         >
//                             Step Into the Future
//                         </motion.h1>

//                         <motion.p
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.4 }}
//                             className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
//                         >
//                             Explore events, workshops, and conferences crafted for innovators.
//                         </motion.p>
//                     </>
//                 </AnimatePresence>
//             </div>
//         </section>
//     );
// };

// export default HeroSection;




import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

// Define the component's props interface here.
// You can keep it empty for now, but it's good practice to have it here.
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
                    </>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default HeroSection;