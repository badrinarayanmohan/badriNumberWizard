import { useState } from 'react';
import { motion } from 'framer-motion';
import { DeliveryMap } from '../Maps/DeliveryMap';
import { speedOptimizedSchedule, dayColors } from '../../data/schedules';
import { comparison } from '../../data/metrics';

interface PageProps {
  isActive?: boolean;
}

export const SpeedOptimizedMap = ({ isActive = true }: PageProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  if (!isActive) return null;

  const schedule = speedOptimizedSchedule;
  const metrics = comparison.speedOptimized;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-speed-green" />
          <h1 className="text-3xl md:text-4xl font-bold text-rh-navy">
            Strategy A: Speed-Optimized
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Minimizing distance and time across 5 delivery days
        </p>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="grid grid-cols-4 gap-3 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: 'Total Cost', value: `$${metrics.totalCost.toLocaleString()}` },
          { label: 'Total Miles', value: metrics.totalMiles.toString() },
          { label: 'Total Hours', value: metrics.totalHours.toString() },
          { label: 'Truck Trips', value: metrics.truckTrips.toString() },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-green-50 to-white rounded-lg p-3 border border-green-100"
          >
            <div className="text-lg font-bold tabular-nums text-speed-green">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Day Selector */}
      <motion.div
        className="day-tabs mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          className={`day-tab ${selectedDay === null ? 'active' : ''}`}
          onClick={() => setSelectedDay(null)}
        >
          All Days
        </button>
        {schedule.map((day, index) => (
          <button
            key={index}
            className={`day-tab ${selectedDay === index ? 'active' : ''}`}
            onClick={() => setSelectedDay(index)}
            style={{
              borderLeft: selectedDay === index ? `3px solid ${dayColors[index]}` : undefined,
            }}
          >
            Day {day.day}
          </button>
        ))}
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <DeliveryMap
          schedule={schedule}
          selectedDay={selectedDay}
          showAllCustomers={true}
          showRoutes={true}
          isActive={isActive}
        />
      </motion.div>

      {/* Day Details */}
      <motion.div
        className="grid md:grid-cols-5 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {schedule.map((day, index) => (
          <motion.div
            key={index}
            className={`rounded-lg p-3 border-2 transition-all cursor-pointer ${
              selectedDay === index
                ? 'border-speed-green bg-green-50 shadow-md'
                : selectedDay === null
                ? 'border-gray-200 bg-white hover:border-gray-300'
                : 'border-gray-100 bg-gray-50 opacity-50'
            }`}
            onClick={() => setSelectedDay(selectedDay === index ? null : index)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-rh-navy">{day.dayName}</span>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dayColors[index] }}
              />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Customers:</span>
                <span className="font-medium">{day.customers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Loads:</span>
                <span className="font-medium">{day.loads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Miles:</span>
                <span className="font-medium">{day.miles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hours:</span>
                <span className="font-medium">{day.hours}</span>
              </div>
              <div className="flex justify-between border-t pt-1 mt-1">
                <span className="text-gray-500">Cost:</span>
                <span className="font-bold text-speed-green">${day.cost.toFixed(0)}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {day.customers.map(c => c.replace('CUST', '')).join(' → ')}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Route Color Legend */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-4 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {schedule.map((day, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-6 h-1 rounded"
              style={{ backgroundColor: dayColors[index] }}
            />
            <span className="text-xs text-gray-500">{day.dayName}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
