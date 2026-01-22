export interface SerplyConfig {
  apiKey: string;
  baseUrl: string;
  endpoints: {
    jobSearch: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface SerplyJobResult {
  job_id?: string;
  title?: string;
  company_name?: string;
  location?: string;
  description?: string;
  salary?: string;
  date_posted?: string;
  job_url?: string;
  source?: string;
  company_logo?: string;
}

export interface SerplyResponse {
  jobs?: SerplyJobResult[];
  search_metadata?: {
    total_results?: number;
    query?: string;
    location?: string;
  };
}
