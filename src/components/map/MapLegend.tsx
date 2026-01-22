import React from 'react';

export const MapLegend: React.FC = () => {
  const legendItems = [
    { color: '#22c55e', label: '1000+ jobs' },
    { color: '#84cc16', label: '500-1000 jobs' },
    { color: '#eab308', label: '100-500 jobs' },
    { color: '#f97316', label: '1-100 jobs' },
    { color: '#e5e7eb', label: 'No data' },
    { color: '#2563eb', label: 'Selected' }
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Job Density</h3>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
