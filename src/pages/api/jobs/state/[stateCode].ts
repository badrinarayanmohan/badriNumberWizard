import type { NextApiRequest, NextApiResponse } from 'next';
import SerplyClient from '@/services/serplyClient';
import { generateMockJobs } from '@/services/mockJobData';
import { getStateName, isValidStateCode } from '@/data/usStates';
import type { JobSearchResponse } from '@/types/job';

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

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

    const stateName = getStateName(stateCode.toUpperCase());
    const query = (q as string) || '';
    const count = num ? parseInt(num as string) : 50;

    // Use mock data if configured
    if (USE_MOCK_DATA) {
      console.log(`Using mock data for state: ${stateName}`);
      const jobs = generateMockJobs(query, stateName, count);

      const response: JobSearchResponse = {
        jobs,
        totalResults: jobs.length,
        searchQuery: query,
        location: stateName
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return res.status(200).json(response);
    }

    // Use real Serply API
    const apiKey = process.env.SERPLY_API_KEY;

    if (!apiKey || apiKey === 'your_serply_api_key_here') {
      console.error('SERPLY_API_KEY is not configured');
      return res.status(500).json({
        error: 'API key not configured. Please set SERPLY_API_KEY in .env.local or set USE_MOCK_DATA=true for testing.'
      });
    }

    const serplyClient = new SerplyClient(apiKey);

    const jobs = await serplyClient.searchJobs({
      query,
      location: stateName,
      num: count
    });

    const response: JobSearchResponse = {
      jobs,
      totalResults: jobs.length,
      searchQuery: query,
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
