import React, { useState, useRef, memo } from 'react';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';

interface PatronCardProps {
  name: string;
  title: string;
  imageUrl: string;
  visionQuote: string;
}

const PatronCard: React.FC<PatronCardProps> = memo(({ name, title, imageUrl, visionQuote }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2, triggerOnce: true });

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative max-w-4xl mx-auto bg-black/50 rounded-3xl p-8 md:p-12 cursor-pointer overflow-hidden shadow-2xl border-2 border-green-500/20 backdrop-blur-lg transition-all duration-500 ease-out transform will-change-transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
        ${hovered ? 'scale-105 shadow-2xl shadow-green-500/25 border-green-500/70' : ''}
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="relative flex-shrink-0">
          <div className={`relative transition-transform duration-500 ease-out ${isVisible ? 'scale-100' : 'scale-90'}`} style={{transitionDelay: '200ms'}}>
            <img
              src={imageUrl}
              alt={`${name} portrait`}
              className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl object-cover border-4 border-gray-700 shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-black text-xs px-3 py-1 rounded-full shadow-lg font-bold">
              VC
            </div>
          </div>
        </div>
        <div className={`flex-1 space-y-4 transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '400ms'}}>
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
              {name}
            </h3>
            <p className="text-green-400 text-base font-medium uppercase tracking-wider">
              {title}
            </p>
          </div>
          {/* Fixed quote section with proper spacing */}
          <div className="relative border-l-4 border-green-500 pl-4">
            <div className="flex">
              <svg className="w-8 h-8 text-gray-600 flex-shrink-0 mr-4 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
              <blockquote className="text-gray-300 text-base sm:text-lg leading-relaxed italic font-medium flex-1">
                {visionQuote}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PatronCard;
