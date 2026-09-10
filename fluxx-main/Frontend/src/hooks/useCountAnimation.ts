import { useState, useEffect } from 'react';

/**
 * Custom hook for animated counter with easing
 * Provides smooth counting animation from 0 to target value
 */
export const useCountAnimation = (target: number, duration: number = 2000, startAnimation: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number;
    const startCount = 0;
    const countDiff = target - startCount;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startCount + (countDiff * easeOutQuart);
      
      setCount(Math.floor(currentCount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, startAnimation]);

  return count;
};