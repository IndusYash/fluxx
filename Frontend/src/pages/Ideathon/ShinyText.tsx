import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties; // <-- ADD THIS
}



const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
  style = {} // <-- ADD THIS
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`bg-clip-text inline-block ${
        disabled ? '' : 'animate-[shine]'
      } ${className}`}
      style={{
        /* DEFAULT SHINY EFFECT */
        backgroundImage:
          'linear-gradient(120deg, rgba(229,255,251,0) 40%, rgba(229,255,251,0.9) 50%, rgba(229,255,251,0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration,
        color: '#E5FFFB',

        /* TEXT GLOW */
        textShadow:
          '0 0 3px rgba(229, 255, 251, 0.35), 0 0 8px rgba(154, 245, 255, 0.45), 0 0 16px rgba(108, 255, 247, 0.55)',

        /* APPLY STYLES FROM Ideathon.tsx */
        ...style, // <-- MERGE user styles LAST to override defaults
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
