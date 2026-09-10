import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading skeleton component for faculty cards
 * Provides smooth loading animations while content loads
 */
const LoadingSkeleton: React.FC = React.memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          {/* Color bar skeleton */}
          <motion.div
            className="h-2 bg-gray-200 dark:bg-gray-700 rounded-t-xl mb-4 -mx-6 -mt-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Avatar skeleton */}
          <motion.div
            className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />

          {/* Name skeleton */}
          <motion.div
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />

          {/* Position skeleton */}
          <motion.div
            className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2 mx-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />

          {/* Department skeleton */}
          <motion.div
            className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
          />

          {/* Contact buttons skeleton */}
          <div className="flex justify-center gap-3 mb-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 + i * 0.1 }}
              />
            ))}
          </div>

          {/* Specialties skeleton */}
          <div className="flex justify-center gap-1">
            {Array.from({ length: 2 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 + i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default LoadingSkeleton;