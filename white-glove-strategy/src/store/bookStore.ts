import { create } from 'zustand';

interface BookState {
  currentPage: number;
  totalPages: number;
  isAnimating: boolean;
  direction: 'forward' | 'backward' | null;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  setAnimating: (animating: boolean) => void;
}

export const useBookStore = create<BookState>((set, get) => ({
  currentPage: 0,
  totalPages: 11,
  isAnimating: false,
  direction: null,

  setCurrentPage: (page) => set({ currentPage: page }),

  nextPage: () => {
    const { currentPage, totalPages, isAnimating } = get();
    if (!isAnimating && currentPage < totalPages - 1) {
      set({ isAnimating: true, direction: 'forward' });
      setTimeout(() => {
        set({ currentPage: currentPage + 1, isAnimating: false });
      }, 800);
    }
  },

  previousPage: () => {
    const { currentPage, isAnimating } = get();
    if (!isAnimating && currentPage > 0) {
      set({ isAnimating: true, direction: 'backward' });
      setTimeout(() => {
        set({ currentPage: currentPage - 1, isAnimating: false });
      }, 800);
    }
  },

  goToPage: (page) => {
    const { currentPage, totalPages, isAnimating } = get();
    if (!isAnimating && page >= 0 && page < totalPages && page !== currentPage) {
      const direction = page > currentPage ? 'forward' : 'backward';
      set({ isAnimating: true, direction });
      setTimeout(() => {
        set({ currentPage: page, isAnimating: false });
      }, 800);
    }
  },

  setAnimating: (animating) => set({ isAnimating: animating }),
}));
