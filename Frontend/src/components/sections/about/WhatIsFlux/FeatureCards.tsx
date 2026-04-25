import React, { useState, useRef } from 'react';
import FeatureCard from './FeatureCard';

interface FeatureData {
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

interface FeatureCardsProps {
  features: FeatureData[];
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ features }) => {
  // ✅ State to control all cards together
  const [allExpanded, setAllExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleAll = () => {
    setAllExpanded(prev => !prev);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full">
        {features.map((feature, index) => (
          <div key={index} className="flex justify-center">
            <FeatureCard
              {...feature}
              index={index}
              isExpanded={allExpanded} // ✅ All cards controlled by the same state
            />
          </div>
        ))}
      </div>

      {/* ✅ Common Button to expand/collapse all cards */}
      <div className="flex justify-center mt-16">
        <button
          onClick={handleToggleAll}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-lg border-2 border-green-500 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          <span className="relative flex items-center">
            <svg
              className={`w-6 h-6 mr-3 transition-transform duration-300 ${allExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {allExpanded ? 'Show Less Information' : 'Show More Information'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default FeatureCards;
