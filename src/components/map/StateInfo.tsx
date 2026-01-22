import React from 'react';
import { getStateName } from '@/data/usStates';

interface StateInfoProps {
  stateCode: string;
  jobCount?: number;
}

export const StateInfo: React.FC<StateInfoProps> = ({ stateCode, jobCount = 0 }) => {
  const stateName = getStateName(stateCode);

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-primary-900">{stateName}</h3>
          <p className="text-sm text-primary-700 mt-1">
            {jobCount > 0 ? `${jobCount} jobs available` : 'Search to see available jobs'}
          </p>
        </div>
        <div className="text-3xl font-bold text-primary-600">{stateCode}</div>
      </div>
    </div>
  );
};
