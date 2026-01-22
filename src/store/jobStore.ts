import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchJobsClient } from '@/services/jobSearchService';
import { getStateName } from '@/data/usStates';
import type { JobListing, SearchFilters, SearchHistoryItem } from '@/types/job';

interface JobState {
  // Search state
  searchQuery: string;
  selectedState: string | null;
  searchFilters: SearchFilters;
  searchResults: JobListing[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;

  // Selected job
  selectedJob: JobListing | null;

  // Saved jobs (persisted)
  savedJobs: JobListing[];

  // Search history (persisted)
  searchHistory: SearchHistoryItem[];

  // Job counts by state
  jobCountsByState: Record<string, number>;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedState: (state: string | null) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSearchResults: (results: JobListing[]) => void;
  setSelectedJob: (job: JobListing | null) => void;
  toggleSaveJob: (job: JobListing) => void;
  addToSearchHistory: (item: SearchHistoryItem) => void;
  clearSearchHistory: () => void;
  performSearch: () => Promise<void>;
  reset: () => void;
}

const initialFilters: SearchFilters = {
  jobType: 'all',
  datePosted: 'any',
  experienceLevel: 'all'
};

export const useJobStore = create<JobState>()(
  persist(
    (set, get) => ({
      // Initial state
      searchQuery: '',
      selectedState: null,
      searchFilters: initialFilters,
      searchResults: [],
      isLoading: false,
      error: null,
      totalResults: 0,
      selectedJob: null,
      savedJobs: [],
      searchHistory: [],
      jobCountsByState: {},

      // Actions
      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedState: (state) => set({ selectedState: state }),

      setFilters: (filters) =>
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters }
        })),

      setSearchResults: (results) => set({ searchResults: results }),

      setSelectedJob: (job) => set({ selectedJob: job }),

      toggleSaveJob: (job) =>
        set((state) => {
          const isSaved = state.savedJobs.some((j) => j.id === job.id);
          return {
            savedJobs: isSaved
              ? state.savedJobs.filter((j) => j.id !== job.id)
              : [...state.savedJobs, job]
          };
        }),

      addToSearchHistory: (item) =>
        set((state) => ({
          searchHistory: [
            item,
            ...state.searchHistory.filter(
              (h) => h.query !== item.query || h.location !== item.location
            )
          ].slice(0, 10)
        })),

      clearSearchHistory: () => set({ searchHistory: [] }),

      performSearch: async () => {
        const { searchQuery, selectedState } = get();

        if (!searchQuery.trim()) {
          set({ error: 'Please enter a search query' });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const location = selectedState
            ? getStateName(selectedState)
            : 'United States';

          const response = await searchJobsClient({
            query: searchQuery,
            location,
            num: 20
          });

          set({
            searchResults: response.jobs,
            totalResults: response.totalResults,
            isLoading: false
          });

          // Add to history
          get().addToSearchHistory({
            query: searchQuery,
            location,
            timestamp: new Date().toISOString(),
            resultCount: response.jobs.length
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Search failed',
            isLoading: false,
            searchResults: []
          });
        }
      },

      reset: () =>
        set({
          searchQuery: '',
          selectedState: null,
          searchFilters: initialFilters,
          searchResults: [],
          isLoading: false,
          error: null,
          totalResults: 0,
          selectedJob: null
        })
    }),
    {
      name: 'job-search-storage',
      partialize: (state) => ({
        savedJobs: state.savedJobs,
        searchHistory: state.searchHistory
      })
    }
  )
);
