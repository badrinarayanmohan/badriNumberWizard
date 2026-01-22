import axios, { AxiosInstance } from 'axios';
import { SERPLY_CONFIG } from '@/utils/constants';
import type { SerplyResponse, SerplyJobResult } from '@/types/api';
import type { JobListing, JobSearchParams } from '@/types/job';
import { extractStateFromLocation } from '@/utils/formatters';

class SerplyClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: SERPLY_CONFIG.baseUrl,
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  async searchJobs(params: JobSearchParams): Promise<JobListing[]> {
    try {
      const response = await this.client.get<SerplyResponse>(
        SERPLY_CONFIG.endpoints.jobSearch,
        {
          params: {
            q: params.query,
            location: params.location,
            num: params.num || 20
          }
        }
      );

      return this.transformResponse(response.data);
    } catch (error) {
      console.error('Serply API error:', error);
      throw new Error('Failed to fetch jobs from Serply API');
    }
  }

  private transformResponse(data: SerplyResponse): JobListing[] {
    if (!data.jobs || !Array.isArray(data.jobs)) {
      return [];
    }

    return data.jobs.map((job: SerplyJobResult, index: number) => ({
      id: job.job_id || `job-${Date.now()}-${index}`,
      title: job.title || 'Unknown Position',
      company: job.company_name || 'Unknown Company',
      location: job.location || 'Location Not Specified',
      state: extractStateFromLocation(job.location || '') || '',
      description: job.description || 'No description available',
      salary: job.salary,
      postedDate: job.date_posted || new Date().toISOString(),
      applyLink: job.job_url || '#',
      source: job.source || 'Unknown',
      companyLogo: job.company_logo
    }));
  }
}

export default SerplyClient;
