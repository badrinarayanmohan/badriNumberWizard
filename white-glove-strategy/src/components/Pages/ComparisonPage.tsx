import { motion } from 'framer-motion';
import { AnimatedCounter } from '../Charts/AnimatedCounter';
import { comparison } from '../../data/metrics';

interface PageProps {
  isActive?: boolean;
}

export const ComparisonPage = ({ isActive = true }: PageProps) => {
  if (!isActive) return null;

  const metrics = [
    {
      label: 'Total Cost',
      speed: comparison.speedOptimized.totalCost,
      space: comparison.spaceOptimized.totalCost,
      format: (v: number) => `$${v.toLocaleString()}`,
      lowerIsBetter: true,
    },
    {
      label: 'Total Miles',
      speed: comparison.speedOptimized.totalMiles,
      space: comparison.spaceOptimized.totalMiles,
      format: (v: number) => v.toString(),
      lowerIsBetter: true,
    },
    {
      label: 'Total Hours',
      speed: comparison.speedOptimized.totalHours,
      space: comparison.spaceOptimized.totalHours,
      format: (v: number) => v.toFixed(2),
      lowerIsBetter: true,
    },
    {
      label: 'Truck Trips',
      speed: comparison.speedOptimized.truckTrips,
      space: comparison.spaceOptimized.truckTrips,
      format: (v: number) => v.toString(),
      lowerIsBetter: true,
    },
    {
      label: 'Avg Volume Util',
      speed: comparison.speedOptimized.avgVolumeUtil,
      space: comparison.spaceOptimized.avgVolumeUtil,
      format: (v: number) => `${v}%`,
      lowerIsBetter: false,
    },
  ];

  const costSavings = comparison.spaceOptimized.totalCost - comparison.speedOptimized.totalCost;
  const percentSavings = (costSavings / comparison.spaceOptimized.totalCost) * 100;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rh-navy mb-2">
          The Verdict: Speed vs Space
        </h1>
        <p className="text-gray-600 mb-8">
          Head-to-head comparison of both optimization strategies
        </p>
      </motion.div>

      {/* Winner Announcement */}
      <motion.div
        className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-8 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span className="text-xl font-bold">Winner: Speed-Optimized</span>
          </div>
          <p className="text-green-100">
            Saves <span className="font-bold text-white">${costSavings.toFixed(2)}</span> ({percentSavings.toFixed(1)}%) compared to space-optimized approach
          </p>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200">
          <div className="font-semibold text-gray-700">Metric</div>
          <div className="font-semibold text-speed-green text-center">Speed-Optimized</div>
          <div className="font-semibold text-space-blue text-center">Space-Optimized</div>
          <div className="font-semibold text-gray-700 text-center">Winner</div>
        </div>

        {metrics.map((metric, index) => {
          const speedWins = metric.lowerIsBetter
            ? metric.speed < metric.space
            : metric.speed > metric.space;
          const spaceWins = !speedWins && metric.speed !== metric.space;

          return (
            <motion.div
              key={index}
              className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 last:border-0 items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="text-gray-700">{metric.label}</div>
              <div className={`text-center tabular-nums font-medium ${speedWins ? 'text-speed-green' : 'text-gray-600'}`}>
                <AnimatedCounter
                  target={metric.speed}
                  decimals={metric.label.includes('Cost') ? 2 : metric.label.includes('Hours') ? 2 : 1}
                  prefix={metric.label.includes('Cost') ? '$' : ''}
                  suffix={metric.label.includes('Util') ? '%' : ''}
                  isActive={isActive}
                />
              </div>
              <div className={`text-center tabular-nums font-medium ${spaceWins ? 'text-space-blue' : 'text-gray-600'}`}>
                <AnimatedCounter
                  target={metric.space}
                  decimals={metric.label.includes('Cost') ? 2 : metric.label.includes('Hours') ? 2 : 1}
                  prefix={metric.label.includes('Cost') ? '$' : ''}
                  suffix={metric.label.includes('Util') ? '%' : ''}
                  isActive={isActive}
                />
              </div>
              <div className="text-center">
                {speedWins ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Speed
                  </span>
                ) : spaceWins ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Space
                  </span>
                ) : (
                  <span className="text-gray-400">Tie</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Cost Breakdown */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-rh-navy mb-4">Cost Breakdown - Speed</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Labor Cost (94%)</span>
                <span className="font-medium">${comparison.speedOptimized.laborCost.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-speed-green rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Fuel Cost (6%)</span>
                <span className="font-medium">${comparison.speedOptimized.fuelCost.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400 rounded-full" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-rh-navy mb-4">Cost Breakdown - Space</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Labor Cost (93%)</span>
                <span className="font-medium">${comparison.spaceOptimized.laborCost.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-space-blue rounded-full" style={{ width: '93%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Fuel Cost (7%)</span>
                <span className="font-medium">${comparison.spaceOptimized.fuelCost.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400 rounded-full" style={{ width: '7%' }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-rh-navy to-blue-800 text-white rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-rh-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          <div>
            <div className="font-semibold mb-1">Key Insight</div>
            <p className="text-gray-200">
              Speed optimization wins because <span className="font-bold text-rh-gold">labor accounts for 94% of total costs</span>.
              Minimizing hours worked has a much greater impact than maximizing truck utilization.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
