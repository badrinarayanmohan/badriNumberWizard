import React from 'react';
import { JobCard } from './JobCard';
import type { JobListing } from '@/types/job';

interface SavedJobsProps {
  jobs: JobListing[];
  selectedJob: JobListing | null;
  onJobSelect: (job: JobListing) => void;
  onRemove: (job: JobListing) => void;
}

export const SavedJobs: React.FC<SavedJobsProps> = ({
  jobs,
  selectedJob,
  onJobSelect,
  onRemove
}) => {
  if (jobs.length === 0) {
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
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
        <p className="text-gray-500">
          Jobs you save will appear here for easy access
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Saved Jobs ({jobs.length})
        </h2>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="relative group">
            <JobCard
              job={job}
              isSelected={selectedJob?.id === job.id}
              onClick={() => onJobSelect(job)}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(job);
              }}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              aria-label="Remove from saved jobs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
