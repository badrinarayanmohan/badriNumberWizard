import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { comparison } from '../../data/metrics';

interface ComparisonChartProps {
  metric: 'cost' | 'miles' | 'hours' | 'trips' | 'utilization';
  isActive?: boolean;
}

export const ComparisonChart = ({ metric, isActive = true }: ComparisonChartProps) => {
  const metricConfig = {
    cost: {
      label: 'Total Cost ($)',
      speedKey: 'totalCost',
      spaceKey: 'totalCost',
      format: (v: number) => `$${v.toLocaleString()}`,
    },
    miles: {
      label: 'Total Miles',
      speedKey: 'totalMiles',
      spaceKey: 'totalMiles',
      format: (v: number) => v.toString(),
    },
    hours: {
      label: 'Total Hours',
      speedKey: 'totalHours',
      spaceKey: 'totalHours',
      format: (v: number) => v.toFixed(1),
    },
    trips: {
      label: 'Truck Trips',
      speedKey: 'truckTrips',
      spaceKey: 'truckTrips',
      format: (v: number) => v.toString(),
    },
    utilization: {
      label: 'Avg Volume Utilization (%)',
      speedKey: 'avgVolumeUtil',
      spaceKey: 'avgVolumeUtil',
      format: (v: number) => `${v.toFixed(1)}%`,
    },
  };

  const config = metricConfig[metric];

  const data = [
    {
      name: 'Speed-Optimized',
      value: comparison.speedOptimized[config.speedKey as keyof typeof comparison.speedOptimized],
      fill: '#48bb78',
    },
    {
      name: 'Space-Optimized',
      value: comparison.spaceOptimized[config.spaceKey as keyof typeof comparison.spaceOptimized],
      fill: '#4299e1',
    },
  ];

  if (!isActive) return null;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 120, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" tickFormatter={config.format} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => config.format(value as number)}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MultiMetricComparison = ({ isActive = true }: { isActive?: boolean }) => {
  const data = [
    { metric: 'Cost', speed: comparison.speedOptimized.totalCost, space: comparison.spaceOptimized.totalCost, winner: 'speed' },
    { metric: 'Miles', speed: comparison.speedOptimized.totalMiles, space: comparison.spaceOptimized.totalMiles, winner: 'speed' },
    { metric: 'Hours', speed: comparison.speedOptimized.totalHours, space: comparison.spaceOptimized.totalHours, winner: 'speed' },
    { metric: 'Trips', speed: comparison.speedOptimized.truckTrips, space: comparison.spaceOptimized.truckTrips, winner: 'space' },
    { metric: 'Vol Util', speed: comparison.speedOptimized.avgVolumeUtil, space: comparison.spaceOptimized.avgVolumeUtil, winner: 'space' },
  ];

  if (!isActive) return null;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="speed" name="Speed-Optimized" fill="#48bb78" radius={[4, 4, 0, 0]} />
          <Bar dataKey="space" name="Space-Optimized" fill="#4299e1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
