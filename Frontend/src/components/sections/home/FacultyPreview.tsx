// src/components/sections/home/FacultyPreview.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "@/components/SectionWrapper";

export default function FacultyPreview() {
  const navigate = useNavigate();

  const handleFacultyClick = () => {
    navigate("/faculty");
  };

  return (
    <SectionWrapper>
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Meet Our Faculty
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Under the guidance of our Faculty Co-ordinator, our faculty team blends expertise with dedication — shaping the minds of tomorrow through innovation, research, and unwavering commitment to excellence.
        </p>

        <div className="mt-6">
          <button
            onClick={handleFacultyClick}
            className="px-6 py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
          >
            View All Faculty →
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
