import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Presentation, FileText, Trophy, Lightbulb, Sparkles, Zap, ArrowRight } from 'lucide-react';
import MagicBentoEvents from '@/components/sections/events/WhatWeDo/MagicBentoEvents';

import hackathonImg from '@/assets/images/flux-x-gfg.webp';
import conferenceImg from '@/assets/images/conferenceImg.webp';
import labsImg from '@/assets/images/labsImg.webp';
import workshopImg from '@/assets/images/workshopImg.webp';
import seminarImg from '@/assets/images/seminarImg.webp';
import competitionImg from '@/assets/images/competitionImg.webp';

interface Activity {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    imageUrl: string;
    color: string;
}

const activities: Activity[] = [
    {
        id: 1,
        title: 'Hackathons',
        description:
            'Intensive coding competitions where innovation meets collaboration. Solve real-world problems in 24-48 hours.',
        icon: <Zap className="w-8 h-8" />,
        features: ['24-48 Hour Challenges', 'Real-world Problems'],
        imageUrl: hackathonImg,
        color: 'from-white/60 to-gray-400/60',
    },
    {
        id: 2,
        title: 'Conferences',
        description:
            'Professional gatherings featuring industry experts, thought leaders, and cutting-edge research presentations.',
        icon: <Sparkles className="w-8 h-8" />,
        features: ['Expert Speakers', 'Networking Sessions'],
        imageUrl: conferenceImg,
        color: 'from-white/60 to-gray-400/60',
    },
    {
        id: 3,
        title: 'Workshops',
        description:
            'Hands-on sessions where participants can learn practical skills, explore new tools, and enhance their expertise.',
        icon: <FileText className="w-8 h-8" />,
        features: ['Interactive Labs', 'Skill Development'],
        imageUrl: workshopImg,
        color: 'from-white/60 to-gray-400/60',
    },
    {
        id: 4,
        title: 'Seminars',
        description:
            'Focused discussions and presentations on emerging trends, research findings, and industry insights.',
        icon: <Presentation className="w-8 h-8" />,
        features: ['Knowledge Sharing', 'Interactive Q&A'],
        imageUrl: seminarImg,
        color: 'from-white/60 to-gray-400/60',
    },
    {
        id: 5,
        title: 'Competitions',
        description:
            'Engaging contests designed to challenge creativity, problem-solving, and technical skills among participants.',
        icon: <Trophy className="w-8 h-8" />,
        features: ['Prizes & Recognition', 'Skill Challenges'],
        imageUrl: competitionImg,
        color: 'from-white/60 to-gray-400/60',
    },
    {
        id: 6,
        title: 'Innovation Labs',
        description:
            'Collaborative spaces where participants experiment with new ideas, prototype solutions, and push the boundaries of creativity.',
        icon: <Lightbulb className="w-8 h-8" />,
        features: ['Hands-on Prototyping', 'Creative Collaboration'],
        imageUrl: labsImg,
        color: 'from-white/60 to-gray-400/60',
    }
  ];

const WhatWeDoSection: React.FC = () => {
    return (
        <AnimatePresence>
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
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                            What We Do
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            We organize diverse events that foster learning, innovation, and collaboration in the tech community.
                        </p>
                    </motion.div>
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
        </AnimatePresence>
    );
};

export default WhatWeDoSection;