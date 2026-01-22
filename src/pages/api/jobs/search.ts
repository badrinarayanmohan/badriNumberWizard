import type { NextApiRequest, NextApiResponse } from 'next';
import SerplyClient from '@/services/serplyClient';
import type { JobSearchResponse } from '@/types/job';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobSearchResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { q, location, num } = req.query;

    if (!q || !location) {
      return res.status(400).json({ error: 'Query and location are required' });
    }

    const apiKey = process.env.SERPLY_API_KEY;

    if (!apiKey) {
      console.error('SERPLY_API_KEY is not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const serplyClient = new SerplyClient(apiKey);

    const jobs = await serplyClient.searchJobs({
      query: q as string,
      location: location as string,
      num: num ? parseInt(num as string) : 20
    });

    const response: JobSearchResponse = {
      jobs,
      totalResults: jobs.length,
      searchQuery: q as string,
      location: location as string
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to search jobs'
    });
  }
}
