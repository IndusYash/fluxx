import React from 'react';

// A single, more complex particle component
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
const Particles: React.FC = () => {
  const particles = React.useMemo(() => {
    const particleArray = [];
    // Type 1: Slow, floating "dust" particles
    for (let i = 0; i < 70; i++) {
      particleArray.push({
        xStart: `${Math.random() * 100}vw`,
        yStart: `${Math.random() * 100}vh`,
        xEnd: `${Math.random() * 100}vw`,
        yEnd: `${Math.random() * 100}vh`,
        size: `${Math.random() * 2 + 1}px`,
        duration: `${Math.random() * 15 + 10}s`,
        delay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    // Type 2: Faster, larger "shooting star" particles
    for (let i = 0; i < 15; i++) {
      particleArray.push({
        xStart: `${Math.random() * 100}vw`,
        yStart: `${-10}%`, // Start off-screen
        xEnd: `${Math.random() * 100}vw`,
        yEnd: `${110}%`, // End off-screen
        size: `${Math.random() * 3 + 2}px`,
        duration: `${Math.random() * 5 + 4}s`,
        delay: `${Math.random() * 10}s`,
        opacity: Math.random() * 0.5 + 0.3,
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

export default Particles;
