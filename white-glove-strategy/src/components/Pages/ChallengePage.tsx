import { motion } from 'framer-motion';
import { AnimatedCounter } from '../Charts/AnimatedCounter';
import { truckCapacity } from '../../data/metrics';
import { customers } from '../../data/customers';

interface PageProps {
  isActive?: boolean;
}

export const ChallengePage = ({ isActive = true }: PageProps) => {
  const totalItems = customers.reduce((sum, c) => sum + c.items, 0);
  const totalVolume = customers.reduce((sum, c) => sum + c.volume, 0);
  const totalWeight = customers.reduce((sum, c) => sum + c.weight, 0);

  const truckMultiplier = (totalVolume / truckCapacity.maxVolume).toFixed(1);

  const stats = [
    { value: 11, label: 'Customers', suffix: '' },
    { value: totalItems, label: 'Items', suffix: '' },
    { value: totalVolume, label: 'Volume (cu ft)', suffix: '', decimals: 0 },
    { value: totalWeight, label: 'Weight (lbs)', suffix: '', decimals: 0 },
  ];

  if (!isActive) return null;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rh-navy mb-2">
          The Delivery Challenge
        </h1>
        <p className="text-gray-600 mb-8">
          Understanding the scale of our delivery optimization problem
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="stat-value text-2xl md:text-3xl">
              <AnimatedCounter
                target={stat.value}
                decimals={stat.decimals || 0}
                suffix={stat.suffix}
                isActive={isActive}
              />
            </div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Truck Capacity Visualization */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold text-rh-navy mb-4">
          Truck Capacity vs Total Demand
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Single Truck Capacity</span>
              <span className="font-medium tabular-nums">{truckCapacity.maxVolume.toLocaleString()} cu ft</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-rh-navy rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Total Order Volume</span>
              <span className="font-medium tabular-nums">{totalVolume.toLocaleString()} cu ft</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-rh-gold rounded-full flex items-center justify-end pr-2"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                <span className="text-xs font-bold text-white">{truckMultiplier}x</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Truck Icons */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3">Minimum truck trips required by volume:</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: truckCapacity.minTripsRequired }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <svg className="w-8 h-8 text-rh-navy" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Constraints */}
      <motion.div
        className="grid md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-blue-900">Volume Constraint</div>
              <div className="text-sm text-blue-700">{truckCapacity.maxVolume.toLocaleString()} cu ft per truck</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-green-900">Weight Constraint</div>
              <div className="text-sm text-green-700">{truckCapacity.maxWeight.toLocaleString()} lbs per truck</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Insight */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-rh-navy to-blue-800 text-white rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-rh-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <div>
            <div className="font-semibold mb-1">Key Insight</div>
            <p className="text-gray-200">
              Total order volume exceeds single truck capacity by <span className="font-bold text-rh-gold">{truckMultiplier}x</span>,
              requiring sophisticated optimization to minimize costs while meeting all delivery constraints.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
