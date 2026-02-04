import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageProps {
  children: ReactNode;
  isVisible: boolean;
  isPrevious: boolean;
  isNext: boolean;
  isAnimating: boolean;
  pageIndex: number;
  currentPage: number;
}

export const Page = ({
  children,
  isVisible,
  pageIndex,
  currentPage,
}: PageProps) => {
  const direction = pageIndex > currentPage ? 1 : -1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      {isVisible && (
        <motion.div
          key={pageIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            rotateY: { duration: 0.5 },
          }}
          className="w-full bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{
            minHeight: '70vh',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="page-content h-full overflow-y-auto">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
