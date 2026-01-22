import type { NextApiRequest, NextApiResponse } from 'next';
import SerplyClient from '@/services/serplyClient';
import { getStateName, isValidStateCode } from '@/data/usStates';
import type { JobSearchResponse } from '@/types/job';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobSearchResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { stateCode, q, num } = req.query;

    if (!stateCode || typeof stateCode !== 'string') {
      return res.status(400).json({ error: 'State code is required' });
    }

    if (!isValidStateCode(stateCode)) {
      return res.status(400).json({ error: 'Invalid state code' });
    }

    const apiKey = process.env.SERPLY_API_KEY;

    if (!apiKey) {
      console.error('SERPLY_API_KEY is not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const stateName = getStateName(stateCode.toUpperCase());
    const serplyClient = new SerplyClient(apiKey);

    const jobs = await serplyClient.searchJobs({
      query: (q as string) || '',
      location: stateName,
      num: num ? parseInt(num as string) : 50
    });

    const response: JobSearchResponse = {
      jobs,
      totalResults: jobs.length,
      searchQuery: (q as string) || '',
      location: stateName
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('State search API error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to search jobs in state'
    });
  }
}
