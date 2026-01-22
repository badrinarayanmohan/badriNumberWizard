import type { JobListing, JobSearchParams, JobSearchResponse } from '@/types/job';

// In-memory cache for API responses
const cache = new Map<string, { data: JobSearchResponse; timestamp: number }>();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export async function searchJobsClient(params: JobSearchParams): Promise<JobSearchResponse> {
  const cacheKey = `${params.query}-${params.location}-${params.num || 20}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Fetch from API
  const response = await fetch(
    `/api/jobs/search?q=${encodeURIComponent(params.query)}&location=${encodeURIComponent(params.location)}&num=${params.num || 20}`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  const data: JobSearchResponse = await response.json();

  // Update cache
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}

export async function getJobById(jobId: string): Promise<JobListing | null> {
  try {
    const response = await fetch(`/api/jobs/${jobId}`);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return null;
  }
}

export async function getJobsByState(
  stateCode: string,
  query: string = '',
  num: number = 50
): Promise<JobSearchResponse> {
  const response = await fetch(
    `/api/jobs/state/${stateCode}?q=${encodeURIComponent(query)}&num=${num}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs for state: ${response.status}`);
  }

  return await response.json();
}
