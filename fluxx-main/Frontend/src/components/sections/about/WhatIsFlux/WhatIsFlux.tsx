import React, { useRef } from 'react';
import type { WhatIsFluxProps } from './WhatIsFlux.types';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import PatronCard from './PatronCard';
import FeatureCards from './FeatureCards';
import ParticlesContainer from '../common/Particles';
import { motion } from 'framer-motion';
import JpSainiImg from "@/assets/images/jpsaini.jpeg"

const WhatIsFlux: React.FC<WhatIsFluxProps> = ({ description, patron }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1, triggerOnce: true });

  const featureData = [
    {
      title: 'Innovation Catalyst',
      description: 'Driving breakthroughs with cutting-edge research and creative problem-solving.',
      details: [
        'Advanced research methodologies',
        'Creative problem-solving workshops',
        'Innovation incubation programs'
      ],
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15H9v-2l6.293-6.293a1 1 0 011.414 0L19 9m-6 6v-2m-3-3H9m-3 0h.01M17 17h.01" /></svg>
    },
    {
      title: 'Interdisciplinary Platform',
      description: 'Fostering collaboration across multiple disciplines for comprehensive solutions.',
      details: [
        'Cross-departmental projects',
        'Industry-academia partnerships',
        'International research networks'
      ],
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    {
      title: 'Research Excellence',
      description: 'Maintaining the highest standards in research quality and academic integrity.',
      details: [
        'Peer-reviewed publications',
        'International conference presentations',
        'Acquisition of research grants'
      ],
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    }
  ];

  return (
    <section ref={containerRef} className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
      <ParticlesContainer />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative text-4xl md:text-6xl font-bold mb-8 text-white"
          >
            What is <span className="text-green-400">FLUX?</span>
            <div className="relative mt-4 mx-auto w-48 h-1 bg-green-800 rounded-full">
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-full origin-left"
              />
            </div>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <FeatureCards features={featureData} />
        </motion.div>

        {patron && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-32"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Leadership & <span className="text-green-400">Vision</span>
              </h3>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                FLUX is conceptualized and nurtured under the distinguished guidance of our esteemed Vice Chancellor.
              </p>
            </div>
            <PatronCard
              name="Prof. J. P. Saini"
              title="Hon'ble Vice Chancellor, MMMUT Gorakhpur"
              imageUrl={JpSainiImg}
              visionQuote="FLUX represents our unwavering commitment to fostering innovation and research excellence, creating leaders who will drive technological advancement and make meaningful contributions to society."
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WhatIsFlux;
