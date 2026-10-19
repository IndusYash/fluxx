import React from 'react';

interface RobotFallbackSvgProps {
  className?: string;
  mood?: string;
}

export default function RobotFallbackSvg({ className = '', mood = 'idle' }: RobotFallbackSvgProps) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
      >
        <defs>
          {/* Head gradients */}
          <radialGradient id="helmetGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#4b5563" />
          </radialGradient>
          <radialGradient id="visorGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#1e2430" />
            <stop offset="65%" stopColor="#0a0c10" />
            <stop offset="100%" stopColor="#020406" />
          </radialGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
          <filter id="svgGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit Ring */}
        <ellipse
          cx="100"
          cy="92"
          rx="72"
          ry="20"
          stroke="url(#ringGrad)"
          strokeWidth="2.5"
          transform="rotate(-15 100 92)"
          filter="url(#svgGlow)"
        />

        {/* Robot Head Body */}
        <circle cx="100" cy="92" r="50" fill="url(#helmetGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

        {/* Visor */}
        <path
          d="M 60 92 C 60 70 76 56 100 56 C 124 56 140 70 140 92 C 140 114 124 124 100 124 C 76 124 60 114 60 92 Z"
          fill="url(#visorGrad)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />

        {/* Forehead FLUX Mark */}
        <g transform="translate(93, 62) scale(0.06)" fill="#ffffff" filter="url(#svgGlow)">
          <rect x="0" y="0" width="50" height="50" rx="2" />
          <rect x="100" y="0" width="150" height="50" rx="2" />
          <rect x="50" y="50" width="50" height="50" rx="2" />
          <rect x="0" y="100" width="50" height="50" rx="2" />
          <rect x="150" y="100" width="100" height="50" rx="2" />
          <rect x="100" y="150" width="50" height="50" rx="2" />
          <rect x="0" y="200" width="100" height="50" rx="2" />
        </g>

        {/* Side Headphones */}
        <rect x="44" y="80" width="8" height="24" rx="4" fill="#374151" stroke="#9ca3af" strokeWidth="1" />
        <ellipse cx="48" cy="92" rx="2.5" ry="7" fill="none" stroke="#67e8f9" strokeWidth="1.5" filter="url(#svgGlow)" />

        <rect x="148" y="80" width="8" height="24" rx="4" fill="#374151" stroke="#9ca3af" strokeWidth="1" />
        <ellipse cx="152" cy="92" rx="2.5" ry="7" fill="none" stroke="#67e8f9" strokeWidth="1.5" filter="url(#svgGlow)" />

        {/* Glowing Eyes */}
        {mood === 'blink' ? (
          <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" filter="url(#svgGlow)">
            <line x1="78" y1="92" x2="92" y2="92" />
            <line x1="108" y1="92" x2="122" y2="92" />
          </g>
        ) : mood === 'typing' ? (
          <g fill="#ffffff" filter="url(#svgGlow)">
            <ellipse cx="85" cy="92" rx="7" ry="9" />
            <ellipse cx="115" cy="92" rx="7" ry="9" />
          </g>
        ) : mood === 'thinking' ? (
          <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" filter="url(#svgGlow)">
            <circle cx="82" cy="92" r="3" fill="#ffffff" />
            <circle cx="92" cy="92" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="108" cy="92" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="118" cy="92" r="3" fill="#ffffff" />
          </g>
        ) : (
          /* Default happy/idle ^ ^ eyes */
          <g stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#svgGlow)">
            <path d="M 77 96 Q 85 84 93 96" />
            <path d="M 107 96 Q 115 84 123 96" />
          </g>
        )}

        {/* Pedestal Base Ring */}
        <g transform="translate(0, 150)">
          <ellipse cx="100" cy="18" rx="46" ry="10" fill="#111827" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <ellipse cx="100" cy="15" rx="38" ry="7" stroke="#67e8f9" strokeWidth="2" filter="url(#svgGlow)" fill="none" />
          <ellipse cx="100" cy="14" rx="24" ry="4" fill="rgba(103,232,249,0.3)" />
        </g>
      </svg>
    </div>
  );
}
