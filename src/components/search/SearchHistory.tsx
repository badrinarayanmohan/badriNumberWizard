import React from 'react';
import { formatDate } from '@/utils/formatters';
import type { SearchHistoryItem } from '@/types/job';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelectHistory: (item: SearchHistoryItem) => void;
  onClearHistory: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelectHistory,
  onClearHistory
}) => {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-sm text-gray-500 text-center">No search history yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
        <button
          onClick={onClearHistory}
          className="text-xs text-red-600 hover:text-red-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectHistory(item)}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.query}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.location} · {item.resultCount} results
                </p>
              </div>
              <span className="text-xs text-gray-400 ml-2">
                {formatDate(item.timestamp)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
