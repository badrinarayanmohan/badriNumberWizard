import React, { useState } from 'react';
import { JobCard } from './JobCard';
import { Spinner } from '@/components/common/Spinner';
import { Button } from '@/components/common/Button';
import type { JobListing } from '@/types/job';

interface JobListingsProps {
  jobs: JobListing[];
  isLoading: boolean;
  selectedJob: JobListing | null;
  onJobSelect: (job: JobListing) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

type SortOption = 'relevance' | 'date' | 'salary';

export const JobListings: React.FC<JobListingsProps> = ({
  jobs,
  isLoading,
  selectedJob,
  onJobSelect,
  onLoadMore,
  hasMore = false
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const sortedJobs = React.useMemo(() => {
    const jobsCopy = [...jobs];

    switch (sortBy) {
      case 'date':
        return jobsCopy.sort(
          (a, b) =>
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
      case 'salary':
        return jobsCopy.sort((a, b) => {
          const salaryA = parseSalary(a.salary);
          const salaryB = parseSalary(b.salary);
          return salaryB - salaryA;
        });
      default:
        return jobsCopy;
    }
  }, [jobs, sortBy]);

  const parseSalary = (salary?: string): number => {
    if (!salary) return 0;
    const match = salary.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  if (isLoading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isLoading && jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-500">
          Try adjusting your search criteria or selecting a different state
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
          </span>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Date Posted</option>
              <option value="salary">Salary</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={selectedJob?.id === job.id}
            onClick={() => onJobSelect(job)}
          />
        ))}

        {hasMore && onLoadMore && (
          <div className="flex justify-center pt-4">
            <Button onClick={onLoadMore} disabled={isLoading} variant="outline">
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
