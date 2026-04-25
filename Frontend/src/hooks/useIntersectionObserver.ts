import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook for intersection observer
 * Detects when elements enter viewport for animation triggers
 */
export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref, options]);

  return isIntersecting;
};