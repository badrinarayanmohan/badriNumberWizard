import { useEffect, useCallback } from 'react';
import { useBookStore } from '../store/bookStore';

export const usePageNavigation = () => {
  const { currentPage, totalPages, nextPage, previousPage, goToPage, isAnimating } = useBookStore();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isAnimating) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        nextPage();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        previousPage();
        break;
      case 'Home':
        event.preventDefault();
        goToPage(0);
        break;
      case 'End':
        event.preventDefault();
        goToPage(totalPages - 1);
        break;
      default:
        // Check for number keys 1-9 for quick navigation
        const num = parseInt(event.key);
        if (num >= 1 && num <= 9 && num <= totalPages) {
          goToPage(num - 1);
        }
        break;
    }
  }, [isAnimating, nextPage, previousPage, goToPage, totalPages]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    isAnimating,
    canGoNext: currentPage < totalPages - 1,
    canGoPrevious: currentPage > 0,
  };
};
