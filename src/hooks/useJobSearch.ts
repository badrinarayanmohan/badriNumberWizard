import { useState, useCallback } from 'react';
import { searchJobsClient } from '@/services/jobSearchService';
import type { JobListing, JobSearchParams, SearchFilters } from '@/types/job';

export function useJobSearch() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const search = useCallback(async (
    query: string,
    location: string,
    filters?: SearchFilters
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const params: JobSearchParams = {
        query,
        location,
        num: 20
      };

      const response = await searchJobsClient(params);

      setJobs(response.jobs);
      setTotalResults(response.totalResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search jobs');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async (
    query: string,
    location: string,
    currentCount: number
  ) => {
    setIsLoading(true);

    try {
      const params: JobSearchParams = {
        query,
        location,
        num: Math.min(currentCount + 20, 100)
      };

      const response = await searchJobsClient(params);
      setJobs(response.jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more jobs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    jobs,
    isLoading,
    error,
    totalResults,
    search,
    loadMore
  };
}
