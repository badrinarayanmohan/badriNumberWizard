import type { NextApiRequest, NextApiResponse } from 'next';
import type { JobListing } from '@/types/job';

// In-memory cache for job details
const jobCache = new Map<string, JobListing>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobListing | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    // Check cache
    const cachedJob = jobCache.get(id);
    if (cachedJob) {
      return res.status(200).json(cachedJob);
    }

    // If not in cache, return 404
    res.status(404).json({ error: 'Job not found' });
  } catch (error) {
    console.error('Get job API error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get job'
    });
  }
}
