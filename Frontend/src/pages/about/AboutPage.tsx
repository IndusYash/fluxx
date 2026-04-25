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

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Parallax Background */}
      <HeroSection {...aboutPageData.hero} />
      
      {/* Scrolling Content - Will scroll over hero */}
      <main className="page-content">
        <WhatIsFlux {...aboutPageData.whatIsFlux} />
        <ValuesSection {...aboutPageData.values} />
        <ImpactAreas {...aboutPageData.impactAreas} />
        <WhyFluxMatters {...aboutPageData.whyFluxMatters} />
        <MissionSection {...aboutPageData.mission} />
        <CallToAction {...aboutPageData.callToAction} />
      </main>
    </div>
  );
};

export default About;

