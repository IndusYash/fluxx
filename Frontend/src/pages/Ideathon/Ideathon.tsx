import { useState, useEffect, memo } from 'react';
import HeroSection from './HeroSection';

// Memoize HeroSection so it doesn't re-render
const MemoizedHeroSection = memo(HeroSection);

const Ideathon = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <MemoizedHeroSection />
      
      {/* Content Overlay */}
      <div style={{
        position: 'absolute',
        top: 'calc(50% - 2cm)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10,
        color: 'white',
        pointerEvents: 'none'
      }}>
        <h1 style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '0 0 30px rgba(216, 86, 191, 0.8)',
          letterSpacing: '0.1em'
        }}>
          IDEATHON 2025
        </h1>
        
        <div style={{
          fontSize: '2rem',
          color: '#e0e0e0',
          fontWeight: '300',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <span>Going Live In:</span>
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#D856BF'
          }}>
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span style={{ color: '#03B3C3', fontSize: '2rem' }}>:</span>
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#03B3C3'
          }}>
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span style={{ color: '#D856BF', fontSize: '2rem' }}>:</span>
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#D856BF'
          }}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ideathon;
