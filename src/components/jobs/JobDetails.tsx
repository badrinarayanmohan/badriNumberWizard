import React from 'react';
import { formatDate, formatFullDate } from '@/utils/formatters';
import { Button } from '@/components/common/Button';
import type { JobListing } from '@/types/job';

interface JobDetailsProps {
  job: JobListing | null;
  onClose: () => void;
  onSave: (job: JobListing) => void;
  isSaved: boolean;
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  job,
  onClose,
  onSave,
  isSaved
}) => {
  if (!job) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center h-full flex items-center justify-center">
        <div>
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No job selected</h3>
          <p className="text-gray-500 mt-2">
            Click on a job listing to view details
          </p>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    window.open(job.applyLink, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `${job.title} at ${job.company}`,
          url: job.applyLink
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(job.applyLink);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {job.companyLogo && (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-16 h-16 rounded-lg object-contain bg-white border border-gray-200 mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <h2 className="text-lg text-gray-700 mt-1">{job.company}</h2>
            <p className="text-gray-500 mt-1">{job.location}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleApply} className="flex-1">
            Apply Now
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Button>

          <Button
            variant={isSaved ? 'secondary' : 'outline'}
            onClick={() => onSave(job)}
          >
            {isSaved ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                Saved
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                Save
              </>
            )}
          </Button>

          <Button variant="ghost" onClick={handleShare}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Overview Section */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            {job.salary && (
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs text-gray-500 block mb-1">Salary</span>
                <span className="text-sm font-medium text-gray-900">{job.salary}</span>
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-500 block mb-1">Posted</span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(job.postedDate)}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-500 block mb-1">Source</span>
              <span className="text-sm font-medium text-gray-900">{job.source}</span>
            </div>
            {job.state && (
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs text-gray-500 block mb-1">State</span>
                <span className="text-sm font-medium text-gray-900">{job.state}</span>
              </div>
            )}
          </div>
        </section>

        {/* Description Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{
              __html: job.description
            }}
          />
        </section>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Original posting on{' '}
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {job.source}
          </a>
        </p>
      </div>
    </div>
  );
};
