import React, { useState, useEffect, useRef } from 'react';
import type { HeroSectionProps } from './HeroSection.types';
import fluxVideo from "@/assets/videos/flux-background.mp4";

const phrases = [
  'Future Leaders of Unbound Xperiments',
  'Innovate. Interact. Impact.'
];

const TYPING_SPEED = 120;
const ERASING_SPEED = 80;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_ERASING = 500;

const HeroSection: React.FC<HeroSectionProps> = ({ description }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!isDeleting) {
      if (charIndex < phrases[phraseIndex].length) {
        typingTimeout.current = setTimeout(() => {
          setDisplayText(phrases[phraseIndex].slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, TYPING_SPEED);
      } else {
        typingTimeout.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
      }
    } else {
      if (charIndex > 0) {
        typingTimeout.current = setTimeout(() => {
          setDisplayText(phrases[phraseIndex].slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, ERASING_SPEED);
      } else {
        setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }, PAUSE_AFTER_ERASING);
      }
    }
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.volume = 0;
          }
        }}
      >
        <source src={fluxVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content - Mobile Compatible */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center -translate-y-[1.5cm] px-4">
        {/* Title - Responsive Sizing */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
            <span className="text-white">Welcome To</span>{' '}
            <span className="text-green-400 block sm:inline">FLUX</span>
          </h1>
        </div>

        {/* Typewriter Effect - Mobile Optimized */}
        <div className="mb-8 md:mb-12 h-12 sm:h-16 md:h-20 flex items-center justify-center px-2">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-semibold min-h-[2rem] md:min-h-[3rem] flex items-center text-center">
            <span className="text-green-300">{displayText}</span>
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        {/* Caption - Mobile Responsive */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 md:px-6">
          <p className="text-xs sm:text-sm md:text-base text-white leading-relaxed text-center">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
