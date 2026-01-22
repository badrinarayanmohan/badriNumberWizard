export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const SERPLY_CONFIG = {
  baseUrl: 'https://api.serply.io/v1',
  endpoints: {
    jobSearch: '/job/search'
  }
};

export const JOB_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'remote', label: 'Remote' }
] as const;

export const DATE_POSTED_OPTIONS = [
  { value: 'any', label: 'Any time' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' }
] as const;

export const EXPERIENCE_LEVELS = [
  { value: 'all', label: 'All Levels' },
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' }
] as const;

export const DEFAULT_RESULTS_PER_PAGE = 20;
export const MAX_RESULTS_PER_PAGE = 100;
export const SEARCH_DEBOUNCE_MS = 300;
export const MAX_SEARCH_HISTORY = 10;
