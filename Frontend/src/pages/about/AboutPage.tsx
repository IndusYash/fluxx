import React from 'react';
import { 
  HeroSection, 
  WhatIsFlux,
  ValuesSection,
  ImpactAreas,
  WhyFluxMatters,
  MissionSection, 
  CallToAction 
} from "../../components/sections/about";
import { aboutPageData } from '../../utils/constants/aboutData';

import { motion } from 'framer-motion';

const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5%" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Parallax Background */}
      <HeroSection {...aboutPageData.hero} />
      
      {/* Scrolling Content - Will scroll over hero */}
      <main className="page-content bg-black overflow-hidden">
        <SectionWrapper delay={0.1}>
          <WhatIsFlux {...aboutPageData.whatIsFlux} />
        </SectionWrapper>
        <SectionWrapper delay={0.2}>
          <ValuesSection {...aboutPageData.values} />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <ImpactAreas {...aboutPageData.impactAreas} />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <WhyFluxMatters {...aboutPageData.whyFluxMatters} />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <MissionSection {...aboutPageData.mission} />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <CallToAction {...aboutPageData.callToAction} />
        </SectionWrapper>
      </main>
    </div>
  );
};

export default About;

