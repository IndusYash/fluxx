import React, { useRef, memo } from 'react';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import { motion } from 'framer-motion';

interface PatronCardProps {
  name: string;
  title: string;
  imageUrl: string;
  visionQuote: string;
}

const PatronCard: React.FC<PatronCardProps> = memo(({ name, title, imageUrl, visionQuote }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)' }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="card-outline relative max-w-5xl mx-auto bg-[#171717] rounded-3xl p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl border-2 border-white/30"
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-center text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-8">
        <motion.div 
          className="relative flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="relative">
            <img
              src={imageUrl}
              alt={`${name} portrait`}
              className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl object-cover border-4 border-white/10 shadow-2xl shadow-black/50"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white text-black text-xs px-3 py-1 rounded-full shadow-lg font-bold tracking-wide">
            VC
          </div>
        </motion.div>
        <motion.div 
          className="flex-1 space-y-4"
          initial={{ opacity: 0, x: 30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
              {name}
            </h3>
            <p className="text-white text-sm font-medium uppercase tracking-widest">
              {title}
            </p>
          </div>
          <div className="relative border-l-2 border-white/30 pl-4">
            <div className="flex">
              <svg className="w-6 h-6 text-gray-500 flex-shrink-0 mr-4 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
              <blockquote className="text-gray-300 text-base sm:text-lg leading-relaxed italic font-medium flex-1">
                {visionQuote}
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default PatronCard;
