import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageProps {
  isActive?: boolean;
}

export const StrategiesIntro = ({ isActive = true }: PageProps) => {
  const [activeStrategy, setActiveStrategy] = useState<'speed' | 'space' | null>(null);

  const strategies = {
    speed: {
      title: 'Speed-Optimized',
      subtitle: 'Minimize Distance & Time',
      color: '#48bb78',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
        </svg>
      ),
      description: 'This approach prioritizes reducing total miles driven and hours worked, resulting in lower labor costs.',
      benefits: [
        'Lower total miles (154 vs 229)',
        'Reduced labor hours (32.75 vs 36.75)',
        'Lower fuel costs',
        'Faster overall delivery time',
      ],
      tradeoffs: [
        'May require more truck trips (18 vs 14)',
        'Lower truck utilization per trip',
        'More frequent warehouse returns',
      ],
    },
    space: {
      title: 'Space-Optimized',
      subtitle: 'Maximize Truck Utilization',
      color: '#4299e1',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ),
      description: 'This approach maximizes how full each truck is before departing, reducing the total number of trips.',
      benefits: [
        'Fewer truck trips (14 vs 18)',
        'Higher volume utilization (74% vs 62%)',
        'Better weight distribution',
        'Reduced vehicle wear',
      ],
      tradeoffs: [
        'More miles driven per batch',
        'Longer working hours',
        'Higher total cost',
      ],
    },
  };

  if (!isActive) return null;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rh-navy mb-2">
          Two Optimization Approaches
        </h1>
        <p className="text-gray-600 mb-8">
          Understanding the trade-off between speed and space efficiency
        </p>
      </motion.div>

      {/* Balance Scale Visualization */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative w-64 h-32">
          {/* Scale base */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-16 bg-gray-300 rounded" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-400 rounded-full" />

          {/* Scale beam */}
          <motion.div
            className="absolute top-8 left-0 right-0 h-2 bg-gray-500 rounded origin-center"
            animate={{
              rotate: activeStrategy === 'speed' ? -5 : activeStrategy === 'space' ? 5 : 0,
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {/* Left pan (Speed) */}
            <div className="absolute -left-4 -top-6 w-20 h-8 bg-speed-green/20 rounded-full border-2 border-speed-green flex items-center justify-center">
              <span className="text-xs font-medium text-speed-green">Speed</span>
            </div>
            {/* Right pan (Space) */}
            <div className="absolute -right-4 -top-6 w-20 h-8 bg-space-blue/20 rounded-full border-2 border-space-blue flex items-center justify-center">
              <span className="text-xs font-medium text-space-blue">Space</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Strategy Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {(['speed', 'space'] as const).map((key, index) => {
          const strategy = strategies[key];
          const isActive = activeStrategy === key;

          return (
            <motion.div
              key={key}
              className={`strategy-card ${key} rounded-xl p-6 cursor-pointer ${
                isActive ? 'ring-2 ring-offset-2' : ''
              } ${isActive && key === 'speed' ? 'ring-speed-green' : ''} ${isActive && key === 'space' ? 'ring-space-blue' : ''}`}
              onClick={() => setActiveStrategy(isActive ? null : key)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: strategy.color + '20', color: strategy.color }}
                >
                  {strategy.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-rh-navy">{strategy.title}</h2>
                  <p className="text-gray-500">{strategy.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{strategy.description}</p>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4">
                      <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Benefits
                      </h3>
                      <ul className="space-y-1">
                        {strategy.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Trade-offs
                      </h3>
                      <ul className="space-y-1">
                        {strategy.tradeoffs.map((tradeoff, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            {tradeoff}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 text-sm text-center" style={{ color: strategy.color }}>
                {isActive ? 'Click to collapse' : 'Click to expand'}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Key Question */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-lg text-gray-600">
          The key question: <span className="font-semibold text-rh-navy">Which approach minimizes total cost?</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Turn the page to see both strategies in action
        </p>
      </motion.div>
    </div>
  );
};
