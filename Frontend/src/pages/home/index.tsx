import React from "react";
import FluxIntro from "@/components/intro/FluxIntro";
import PersistentChromeLogo from "@/components/3d/PersistentChromeLogo";
import Hero from "@/components/sections/home/Hero";
import ScrollTextSection from "@/components/sections/home/ScrollTextSection";
import LiquidTransition from "@/components/sections/home/LiquidTransition";
import LegacySection from "@/components/sections/home/LegacySection";
import WhatWeDoSection from "@/components/sections/home/WhatWeDoSection";
import EventSlider from "@/components/sections/home/EventSlider";
import BeamSection from "@/components/sections/home/BeamSection";
import AchievementScene from "@/components/sections/home/AchievementScene";
import Showcase from "@/components/sections/home/Showcase";
import FooterShowcase from "@/components/sections/home/FooterShowcase";

export default function HomePage({ isMobile: _isMobile }: { isMobile?: boolean }) {
  return (
    <div className="bg-[#060606] text-white overflow-x-clip relative min-h-screen">
      {/* Intro Experience (Monochrome, FBM noise dissolve, logo assemble & hero reveal) */}
      <FluxIntro />

      {/* Global Persistent 3D Chrome Logo: single fixed viewport canvas traveling across the whole page */}
      <PersistentChromeLogo isMobile={_isMobile} />

      {/* 1. Hero with Velocity Marquee & Add-ons */}
      <Hero />

      {/* 2. Scroll Text Section with 3D Chrome Logo & Masked Reveal */}
      <ScrollTextSection />

      {/* 3. Liquid Fill Wave Transition -> White Screen Stats Count-Up -> Dissolve to About */}
      <LiquidTransition />

      {/* 4. Legacy Section with Construction Lines & Floating 3D Image Card */}
      <LegacySection />

      {/* Spacer allowing WhatWeDoSection to arrive at top: 0 exactly when LegacySection dissolves */}
      <div id="legacy-spacer" className="h-[230vh] pointer-events-none" aria-hidden="true" />

      {/* 5. What We Do Section with Skew Reveal Focus Areas */}
      <WhatWeDoSection />

      {/* Spacer allowing EventSlider to arrive at top: 0 exactly when WhatWeDoSection dissolves */}
      <div id="what-we-do-spacer" className="h-[100vh] pointer-events-none" aria-hidden="true" />

      {/* 6. Events Showcase Pinned Slider (Replaces Project Slider) */}
      <EventSlider />

      {/* 7. Discovery Section with Vertical Light Beam, Drifting Words & 3D Tilt Cards */}
      <BeamSection />

      {/* 8. Achievements 3D Scene with Low-Poly Terrain, Upright Panels & Camera Glide */}
      <div id="achievement-scene-wrapper" className="relative">
        <AchievementScene />
      </div>

      {/* 9. Core Showcase */}
      <div className="bg-[#060606]">
        <Showcase />
      </div>

      {/* 10. Giant Chrome 3D Logo Footer Showcase with Let's Connect CTA */}
      <FooterShowcase />
    </div>
  );
}
