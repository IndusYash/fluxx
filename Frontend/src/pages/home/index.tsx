import React from "react";
import PersistentChromeLogo from "@/components/3d/PersistentChromeLogo";
import Hero from "@/components/sections/home/Hero";
import PinnedSection from "@/components/sections/home/PinnedSection";
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
      {/* Global Persistent 3D Chrome Logo: single fixed viewport canvas traveling across the whole page */}
      <PersistentChromeLogo isMobile={_isMobile} />

      {/* 1. Hero with Velocity Marquee & Add-ons */}
      <Hero />

      {/* 2. Scroll Text Section with 3D Chrome Logo & Masked Reveal */}
      <ScrollTextSection />

      {/* 3. Liquid Fill Wave Transition -> White Screen Stats Count-Up */}
      <LiquidTransition />

      {/* 4. Legacy Section with Construction Lines & Floating 3D Image Card */}
      <LegacySection />

      {/* 5. What We Do Section with Skew Reveal Focus Areas */}
      <WhatWeDoSection />

      {/* 6. Events Showcase Pinned Slider (Replaces Project Slider) */}
      <EventSlider />

      {/* 7. Discovery Section with Vertical Light Beam, Drifting Words & 3D Tilt Cards */}
      <BeamSection />

      {/* 8. Achievements 3D Scene with Low-Poly Terrain, Upright Panels & Camera Glide */}
      <AchievementScene />

      {/* 9. Core Showcase */}
      <div className="bg-[#060606]">
        <Showcase />
      </div>

      {/* 10. Giant Chrome 3D Logo Footer Showcase with Let's Connect CTA */}
      <FooterShowcase />
    </div>
  );
}
