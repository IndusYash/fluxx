import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCountAnimation } from '../../hooks/useCountAnimation';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Users, Award, BookOpen, GraduationCap } from 'lucide-react';

/**
 * Animated statistics counter component
 * Shows key faculty statistics with smooth counting animations
 */
const StatsCounter: React.FC = React.memo(() => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(statsRef as React.RefObject<HTMLElement>, { threshold: 0.3 });

  const totalFaculty = useCountAnimation(47, 2000, isVisible);
  const departments = useCountAnimation(8, 2000, isVisible);
  const publications = useCountAnimation(250, 2500, isVisible);
  const awards = useCountAnimation(32, 2000, isVisible);

  const stats = [
    {
      icon: Users,
      value: totalFaculty,
      label: 'Faculty Members',
      color: 'text-blue-600'
    },
    {
      icon: GraduationCap,
      value: departments,
      label: 'Departments',
      color: 'text-emerald-600'
    },
    {
      icon: BookOpen,
      value: publications,
      label: 'Publications',
      color: 'text-purple-600'
    },
    {
      icon: Award,
      value: awards,
      label: 'Awards',
      color: 'text-orange-600'
    }
  ];

  return (
    <motion.div
      ref={statsRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 my-16"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="text-center group"
        >
        
        </motion.div>
      ))}
    </motion.div>
  );
});

StatsCounter.displayName = 'StatsCounter';

export default StatsCounter;