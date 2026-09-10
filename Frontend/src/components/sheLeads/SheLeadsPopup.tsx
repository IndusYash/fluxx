import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SheLeadsPopupProps {
  isMobile?: boolean;
}

const SheLeadsPopup: React.FC<SheLeadsPopupProps> = ({ isMobile }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/she-leads');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className='absolute bottom-4 right-4 sm:bottom-12 md:bottom-16 z-30 select-none pointer-events-auto'
      >
        <button
          onClick={handleNavigate}
          aria-label='Open She Leads – Dr. Tessy Thomas Annual Conclave Registration'
          className='group relative flex/items-center gap-3 px-5 py-3 rounded-full bg-[#0d0d12]/90 hover:bg-[#15131c] text-gray-200 hover:text-white text-xs sm:text-sm font-medium border border-white/20 hover:border-rose-400/40 shadow-xl shadow-black/50 hover:shadow-rose-950/30 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]'
        >
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60' />
            <span className='relative inline-flex rounded-full h-2 w-2 bg-rose-400' />
          </span>

          <span className='tracking-wide text-gray-100 font-semibold'>She Leads – Dr. Tessy Thomas Annual Conclave</span>

          <span className='inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10 group-hover:bg-rose-500/20 group-hover:border-rose-500/30 group-hover:text-rose-200 transition-all'>
            Register Here
            <ArrowRight className='w-3 h-3 group-hover:translate-x-0.5 transition-transform' />
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default SheLeadsPopup;