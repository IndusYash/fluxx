import React, { useState, useRef, memo } from 'react';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  isExpanded: boolean;
  direction?: 'left' | 'right';
}

const FeatureCard: React.FC<FeatureCardProps> = memo(({ 
  title, 
  icon, 
  description, 
  details = [], 
  isExpanded,
  direction = 'left'
}) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2, triggerOnce: true });

  const xOffset = direction === 'left' ? -80 : 80;

  const cardClassName = [
    'card-outline',
    'group',
    'relative',
    'p-8',
    'bg-white/[0.03]',
    'rounded-3xl',
    'border',
    'border-white/[0.08]',
    'shadow-lg',
    'backdrop-blur-xl',
    'transition-all',
    'duration-500',
    'ease-out',
    'transform',
    'will-change-transform',
    hovered ? 'scale-105 -translate-y-2 shadow-[0_0_40px_rgba(255,255,255,0.12)] border-white/20' : '',
    isExpanded ? 'ring-2 ring-white/40' : ''
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: xOffset, y: 40, rotateY: direction === 'left' ? 8 : -8, filter: 'blur(8px)' }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0, rotateY: 0, filter: 'blur(0px)' } : { opacity: 0, x: xOffset, y: 40, rotateY: direction === 'left' ? 8 : -8, filter: 'blur(8px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cardClassName}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-white/[0.1] to-transparent rounded-3xl transition-opacity duration-300 ${hovered || isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/[0.04] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/[0.06] rounded-2xl border border-white/[0.1] text-white group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500">
            <div className="relative">
              {icon}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white text-center mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-400 text-center mb-4 leading-relaxed">
          {description}
        </p>
        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
          <div className="border-t border-white/[0.08] pt-3 mt-3 space-y-2">
            {details.map((detail, i) => (
              <div key={i} className="text-gray-300 text-sm flex items-center">
                <div className="flex-shrink-0 w-2 h-2 rounded-full mr-3 bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                {detail}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default FeatureCard;
