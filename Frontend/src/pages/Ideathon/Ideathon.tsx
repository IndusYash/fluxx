import { useState, useEffect, memo, useRef } from 'react';
import HeroSection from './HeroSection';
import ShinyText  from './ShinyText';
import Demo from './Demo.tsx';

const MemoizedHeroSection = memo(HeroSection);

const Ideathon = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});


  useEffect(() => {
  const globalEndTime = new Date('2025-12-10T20:00:00+05:30').getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = globalEndTime - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
  return () => clearInterval(timer);
}, []);


  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <MemoizedHeroSection />

      {/* Overlay Content */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: '45%', // lifted slightly to center visually
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem', // spacing between title & timer
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {/* TITLE */}
        <ShinyText
  text="IDEATHON 2025"
  speed={4}
  style={{
    fontSize: '6rem',
    fontFamily: '"Audiowide", sans-serif',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    marginBottom: '1rem'
  }}
/>



        {/* COUNTDOWN */}
        <Demo timeLeft={timeLeft} />

      </div>
    </div>
  );
};

export default Ideathon;
