import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { FilterPanel } from './FilterPanel';
import { getStateName } from '@/data/usStates';
import type { SearchFilters } from '@/types/job';

interface SearchBarProps {
  onSearch: (query: string, location: string, filters: SearchFilters) => void;
  selectedState: string | null;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  selectedState,
  isLoading
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    jobType: 'all',
    datePosted: 'any',
    experienceLevel: 'all'
  });

  useEffect(() => {
    if (selectedState) {
      setLocation(getStateName(selectedState));
    }
  }, [selectedState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, location || 'United States', filters);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Job title or keywords (e.g., Software Engineer)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            label="What"
          />
          <Input
            type="text"
            placeholder="Location (e.g., California, New York)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Where"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="flex-1 md:flex-none"
          >
            {isLoading ? 'Searching...' : 'Search Jobs'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setQuery('');
              setLocation('');
              setFilters({
                jobType: 'all',
                datePosted: 'any',
                experienceLevel: 'all'
              });
            }}
          >
            Clear
          </Button>
        </div>

        {showFilters && (
          <FilterPanel filters={filters} onFilterChange={setFilters} />
        )}
      </form>
    </div>
  );
};
