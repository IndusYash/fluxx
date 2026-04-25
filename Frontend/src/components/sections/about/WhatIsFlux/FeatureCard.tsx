import React, { useState, useRef, memo } from 'react';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  isExpanded: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = memo(({ 
  title, 
  icon, 
  description, 
  details = [], 
  isExpanded 
}) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2, triggerOnce: true });

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // ✅ NO MORE style prop. All cards animate instantly together.
      className={`group relative p-8 bg-gray-900/60 rounded-2xl border border-green-500/20 shadow-lg backdrop-blur-md transition-all duration-500 ease-out transform will-change-transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${hovered ? 'scale-105 -translate-y-2 shadow-2xl shadow-green-500/20 border-green-500/50' : ''}
        ${isExpanded ? 'ring-2 ring-green-400/60' : ''}
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent rounded-2xl transition-opacity duration-300 ${hovered || isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gray-800 rounded-full border border-gray-700 text-green-400">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white text-center mb-4">
          {title}
        </h3>
        <p className="text-gray-400 text-center mb-4 leading-relaxed">
          {description}
        </p>
        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
          <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
            {details.map((detail, i) => (
              <div key={i} className="text-gray-300 text-sm flex items-center">
                <div className="flex-shrink-0 w-2 h-2 rounded-full mr-3 bg-green-400"></div>
                {detail}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default FeatureCard;
