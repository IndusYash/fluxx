import type { Variants } from 'framer-motion';

export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export const textViewport = { once: true, amount: 0.25 };
