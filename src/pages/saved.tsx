import React, { useState } from 'react';
import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { SavedJobs } from '@/components/jobs/SavedJobs';
import { JobDetails } from '@/components/jobs/JobDetails';
import { useJobStore } from '@/store/jobStore';

export default function SavedJobsPage() {
  const { savedJobs, selectedJob, setSelectedJob, toggleSaveJob } = useJobStore();
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const handleJobSelect = (job: any) => {
    setSelectedJob(job);
    setShowMobileDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
    setShowMobileDetails(false);
  };

  const handleRemove = (job: any) => {
    toggleSaveJob(job);
    if (selectedJob?.id === job.id) {
      setSelectedJob(null);
    }
  };

  const isSaved = selectedJob ? savedJobs.some(j => j.id === selectedJob.id) : false;

  return (
    <>
      <Head>
        <title>Saved Jobs - JobMap</title>
        <meta name="description" content="View your saved job listings" />
      </Head>

      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Saved Jobs List */}
          <section className="lg:col-span-8">
            <SavedJobs
              jobs={savedJobs}
              selectedJob={selectedJob}
              onJobSelect={handleJobSelect}
              onRemove={handleRemove}
            />
          </section>

          {/* Right Panel - Job Details (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-6">
              <JobDetails
                job={selectedJob}
                onClose={handleCloseDetails}
                onSave={(job) => toggleSaveJob(job)}
                isSaved={isSaved}
              />
            </div>
          </aside>
        </div>

        {/* Mobile Job Details Modal */}
        {showMobileDetails && selectedJob && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
            <JobDetails
              job={selectedJob}
              onClose={handleCloseDetails}
              onSave={(job) => toggleSaveJob(job)}
              isSaved={isSaved}
            />
          </div>
        )}
      </Layout>
    </>
  );
}
