import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

interface USMapProps {
  onStateSelect: (stateCode: string, stateName: string) => void;
  selectedState: string | null;
  jobCounts?: Record<string, number>;
}

export const USMap: React.FC<USMapProps> = ({
  onStateSelect,
  selectedState,
  jobCounts = {}
}) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getStateColor = (stateCode: string) => {
    if (stateCode === selectedState) return '#2563eb';

    if (jobCounts[stateCode]) {
      const count = jobCounts[stateCode];
      if (count > 1000) return '#22c55e';
      if (count > 500) return '#84cc16';
      if (count > 100) return '#eab308';
      return '#f97316';
    }

    return '#e5e7eb';
  };

  return (
    <div className="relative">
      <ComposableMap
        projection="geoAlbersUsa"
        className="w-full h-auto"
        projectionConfig={{
          scale: 1000
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateCode = geo.properties.postal;
              const stateName = geo.properties.name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onStateSelect(stateCode, stateName)}
                  onMouseEnter={(evt) => {
                    const { clientX, clientY } = evt;
                    const jobCount = jobCounts[stateCode] || 0;
                    setTooltipContent(
                      `${stateName}${jobCount > 0 ? ` - ${jobCount} jobs` : ''}`
                    );
                    setTooltipPosition({ x: clientX, y: clientY });
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  style={{
                    default: {
                      fill: getStateColor(stateCode),
                      stroke: '#fff',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    hover: {
                      fill: '#3b82f6',
                      stroke: '#fff',
                      strokeWidth: 1,
                      outline: 'none',
                      cursor: 'pointer'
                    },
                    pressed: {
                      fill: '#1d4ed8',
                      stroke: '#fff',
                      strokeWidth: 1,
                      outline: 'none'
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${stateName}. ${
                    jobCounts[stateCode] || 0
                  } jobs available. Click to search jobs in this state.`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onStateSelect(stateCode, stateName);
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltipContent && (
        <div
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none shadow-lg"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};
