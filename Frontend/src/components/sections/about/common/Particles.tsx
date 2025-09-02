import React from 'react';

// A single, dependency-free particle component
const Particle: React.FC<{ options: any }> = ({ options }) => {
  return (
    <div
      className="particle"
      style={{
        '--x-start': options.xStart,
        '--y-start': options.yStart,
        '--x-end': options.xEnd,
        '--y-end': options.yEnd,
        '--size': options.size,
        '--duration': options.duration,
        '--delay': options.delay,
        '--opacity': options.opacity,
      } as React.CSSProperties}
    />
  );
};

// The main container for all particles
const ParticlesContainer: React.FC = () => {
  const particles = React.useMemo(() => {
    const particleArray = [];
    
    // Type 1: Increased number of slow, floating "dust" particles
    for (let i = 0; i < 100; i++) { // Increased from 70 to 100
      particleArray.push({
        xStart: `${Math.random() * 100}vw`,
        yStart: `${Math.random() * 100}vh`,
        xEnd: `${Math.random() * 100}vw`,
        yEnd: `${Math.random() * 100}vh`,
        size: `${Math.random() * 3 + 1}px`, // Slightly larger size
        duration: `${Math.random() * 15 + 15}s`, // Slower, more ambient movement
        delay: `${Math.random() * 8}s`,
        opacity: Math.random() * 0.5 + 0.2, // More visible
      });
    }

    // Type 2: More and bigger "shooting star" particles
    for (let i = 0; i < 25; i++) { // Increased from 15 to 25
      particleArray.push({
        xStart: `${Math.random() * 100}vw`,
        yStart: `${-10}%`,
        xEnd: `${Math.random() * 100}vw`,
        yEnd: `${110}%`,
        size: `${Math.random() * 4 + 3}px`, // Significantly larger size
        duration: `${Math.random() * 6 + 5}s`, // Faster movement
        delay: `${Math.random() * 12}s`,
        opacity: Math.random() * 0.6 + 0.4, // More visible
      });
    }
    return particleArray;
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((options, index) => (
        <Particle key={index} options={options} />
      ))}
    </div>
  );
};

export default ParticlesContainer;
