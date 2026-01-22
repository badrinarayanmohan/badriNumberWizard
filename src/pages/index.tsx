import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/layout/Layout';
import { SearchBar } from '@/components/search/SearchBar';
import { MapLegend } from '@/components/map/MapLegend';
import { StateInfo } from '@/components/map/StateInfo';
import { JobListings } from '@/components/jobs/JobListings';
import { JobDetails } from '@/components/jobs/JobDetails';
import { SearchHistory } from '@/components/search/SearchHistory';
import { useJobStore } from '@/store/jobStore';
import type { SearchFilters, SearchHistoryItem } from '@/types/job';

// Dynamically import USMap to avoid SSR issues
const USMap = dynamic(() => import('@/components/map/USMap').then(mod => ({ default: mod.USMap })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
});

export default function Home() {
  const {
    searchQuery,
    selectedState,
    searchResults,
    isLoading,
    selectedJob,
    savedJobs,
    searchHistory,
    setSearchQuery,
    setSelectedState,
    setSelectedJob,
    toggleSaveJob,
    performSearch,
    clearSearchHistory,
    addToSearchHistory
  } = useJobStore();

  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const handleStateSelect = useCallback((stateCode: string, stateName: string) => {
    setSelectedState(stateCode);
  }, [setSelectedState]);

  const handleSearch = useCallback(async (
    query: string,
    location: string,
    filters: SearchFilters
  ) => {
    setSearchQuery(query);
    await performSearch();
  }, [setSearchQuery, performSearch]);

  const handleJobSelect = useCallback((job: any) => {
    setSelectedJob(job);
    setShowMobileDetails(true);
  }, [setSelectedJob]);

  const handleCloseDetails = useCallback(() => {
    setSelectedJob(null);
    setShowMobileDetails(false);
  }, [setSelectedJob]);

  const handleSelectHistory = useCallback((item: SearchHistoryItem) => {
    setSearchQuery(item.query);
    if (item.location !== 'United States') {
      // Try to find state code from location
      const stateCode = Object.entries(require('@/data/usStates').US_STATES)
        .find(([, name]) => name === item.location)?.[0];
      if (stateCode) {
        setSelectedState(stateCode);
      }
    }
    performSearch();
  }, [setSearchQuery, setSelectedState, performSearch]);

  const isSaved = selectedJob ? savedJobs.some(j => j.id === selectedJob.id) : false;

  return (
    <>
      <Head>
        <title>JobMap - Find Jobs Across the United States</title>
        <meta name="description" content="Search for jobs across the United States with an interactive map. Powered by Serply.io API." />
      </Head>

      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Map and Search */}
          <aside className="lg:col-span-3 space-y-4">
            <SearchBar
              onSearch={handleSearch}
              selectedState={selectedState}
              isLoading={isLoading}
            />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Select a State
              </h3>
              <USMap
                onStateSelect={handleStateSelect}
                selectedState={selectedState}
                jobCounts={{}}
              />
            </div>

            <MapLegend />

            {selectedState && (
              <StateInfo
                stateCode={selectedState}
                jobCount={searchResults.length}
              />
            )}

            {searchHistory.length > 0 && (
              <SearchHistory
                history={searchHistory}
                onSelectHistory={handleSelectHistory}
                onClearHistory={clearSearchHistory}
              />
            )}
          </aside>

          {/* Center Panel - Job Listings */}
          <section className="lg:col-span-5">
            <JobListings
              jobs={searchResults}
              isLoading={isLoading}
              selectedJob={selectedJob}
              onJobSelect={handleJobSelect}
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
