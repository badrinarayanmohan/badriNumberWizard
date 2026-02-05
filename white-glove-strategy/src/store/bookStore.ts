import { create } from 'zustand';

interface BookState {
  currentPage: number;
  totalPages: number;
  isAnimating: boolean;
  direction: 'forward' | 'backward' | null;
  isBookOpen: boolean;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  setAnimating: (animating: boolean) => void;
  openBook: () => void;
}

export const useBookStore = create<BookState>((set, get) => ({
  currentPage: 0,
  totalPages: 11,
  isAnimating: false,
  direction: null,
  isBookOpen: false,

  setCurrentPage: (page) => set({ currentPage: page }),

  openBook: () => {
    const { isAnimating } = get();
    if (!isAnimating) {
      set({ isAnimating: true, isBookOpen: true, direction: 'forward' });
      setTimeout(() => {
        set({ currentPage: 1, isAnimating: false });
      }, 1200);
    }
  },

  nextPage: () => {
    const { currentPage, totalPages, isAnimating, isBookOpen } = get();
    if (isAnimating) return;
    if (!isBookOpen) {
      get().openBook();
      return;
    }
    if (currentPage < totalPages - 1) {
      set({ isAnimating: true, direction: 'forward' });
      setTimeout(() => {
        set({ currentPage: currentPage + 1, isAnimating: false });
      }, 800);
    }
  },

  previousPage: () => {
    const { currentPage, isAnimating, isBookOpen } = get();
    if (isAnimating || !isBookOpen) return;
    if (currentPage === 1) {
      set({ isAnimating: true, direction: 'backward', isBookOpen: false, currentPage: 0 });
      setTimeout(() => {
        set({ isAnimating: false });
      }, 1200);
      return;
    }
    if (currentPage > 1) {
      set({ isAnimating: true, direction: 'backward' });
      setTimeout(() => {
        set({ currentPage: currentPage - 1, isAnimating: false });
      }, 800);
    }
  },

  goToPage: (page) => {
    const { currentPage, totalPages, isAnimating, isBookOpen } = get();
    if (isAnimating) return;
    if (page === 0) {
      if (isBookOpen) {
        set({ isAnimating: true, direction: 'backward', isBookOpen: false, currentPage: 0 });
        setTimeout(() => { set({ isAnimating: false }); }, 1200);
      }
      return;
    }
    if (!isBookOpen) {
      set({ isAnimating: true, isBookOpen: true, direction: 'forward' });
      setTimeout(() => { set({ currentPage: page, isAnimating: false }); }, 1200);
      return;
    }
    if (page >= 1 && page < totalPages && page !== currentPage) {
      const direction = page > currentPage ? 'forward' : 'backward';
      set({ isAnimating: true, direction });
      setTimeout(() => { set({ currentPage: page, isAnimating: false }); }, 800);
    }
  },

  setAnimating: (animating) => set({ isAnimating: animating }),
}));
