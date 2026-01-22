export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  state: string;
  description: string;
  salary?: string;
  postedDate: string;
  applyLink: string;
  source: string;
  companyLogo?: string;
}

export interface JobSearchParams {
  query: string;
  location: string;
  num?: number;
}

export interface JobSearchResponse {
  jobs: JobListing[];
  totalResults: number;
  searchQuery: string;
  location: string;
}

export interface SearchFilters {
  jobType: 'full-time' | 'part-time' | 'contract' | 'remote' | 'all';
  salaryMin?: number;
  salaryMax?: number;
  datePosted: 'any' | '24h' | '7d' | '30d';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'all';
}

export interface SearchHistoryItem {
  query: string;
  location: string;
  timestamp: string;
  resultCount: number;
}
