import { usePageNavigation } from '../../hooks/usePageNavigation';
import { motion } from 'framer-motion';

interface NavigationProps {
  totalPages: number;
}

export const Navigation = ({ totalPages }: NavigationProps) => {
  const { currentPage, goToPage, nextPage, previousPage, canGoNext, canGoPrevious, isAnimating } = usePageNavigation();

  return (
    <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={previousPage}
          disabled={!canGoPrevious || isAnimating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            canGoPrevious && !isAnimating
              ? 'text-rh-navy hover:bg-gray-100'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToPage(index)}
              disabled={isAnimating}
              className={`nav-dot ${index === currentPage ? 'active' : ''}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={!canGoNext || isAnimating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            canGoNext && !isAnimating
              ? 'text-rh-navy hover:bg-gray-100'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="text-center mt-2 text-sm text-gray-500">
        Page {currentPage + 1} of {totalPages}
        <span className="hidden sm:inline text-gray-400 ml-2">(Use arrow keys to navigate)</span>
      </div>
    </div>
  );
};
