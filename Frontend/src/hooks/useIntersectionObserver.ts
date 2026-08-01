import { useState, useEffect, RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

/**
 * Custom hook for intersection observer
 * Detects when elements enter viewport for animation triggers
 */
export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options?: UseIntersectionObserverOptions
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { triggerOnce, ...observerOptions } = options || {};

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      
      if (entry.isIntersecting && triggerOnce) {
        observer.unobserve(element);
      }
    }, {
      threshold: 0.1,
      ...observerOptions
    });

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref, options]);

  return isIntersecting;
};