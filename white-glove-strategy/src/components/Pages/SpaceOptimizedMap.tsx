import { useState } from 'react';
import { motion } from 'framer-motion';
import { DeliveryMap } from '../Maps/DeliveryMap';
import { spaceOptimizedSchedule, dayColors } from '../../data/schedules';
import { comparison } from '../../data/metrics';
import { UtilizationGauge } from '../Charts/UtilizationGauge';

interface PageProps {
  isActive?: boolean;
}

export const SpaceOptimizedMap = ({ isActive = true }: PageProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  if (!isActive) return null;

  const schedule = spaceOptimizedSchedule;
  const metrics = comparison.spaceOptimized;

  const selectedDayData = selectedDay !== null ? schedule[selectedDay] : null;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-space-blue" />
          <h1 className="text-3xl md:text-4xl font-bold text-rh-navy">
            Strategy B: Space-Optimized
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Maximizing truck utilization for each trip
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
          { label: 'Avg Vol Util', value: `${metrics.avgVolumeUtil}%` },
          { label: 'Truck Trips', value: metrics.truckTrips.toString() },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-3 border border-blue-100"
          >
            <div className="text-lg font-bold tabular-nums text-space-blue">{stat.value}</div>
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

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Map */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <DeliveryMap
            schedule={schedule}
            selectedDay={selectedDay}
            showAllCustomers={true}
            showRoutes={true}
            isActive={isActive}
          />
        </motion.div>

        {/* Utilization Panel */}
        <motion.div
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold text-rh-navy mb-4">
            {selectedDayData ? `${selectedDayData.dayName} Utilization` : 'Average Utilization'}
          </h3>

          <div className="flex justify-center mb-4">
            <UtilizationGauge
              value={selectedDayData?.volUtil || metrics.avgVolumeUtil}
              label="Volume Utilization"
              color="#4299e1"
              size="lg"
              isActive={isActive}
            />
          </div>

          {selectedDayData && (
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Customers</span>
                <span className="font-medium">{selectedDayData.customers.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Truck Loads</span>
                <span className="font-medium">{selectedDayData.loads}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Miles</span>
                <span className="font-medium">{selectedDayData.miles}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Hours</span>
                <span className="font-medium">{selectedDayData.hours}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-gray-500">Cost</span>
                <span className="font-bold text-space-blue">${selectedDayData.cost.toFixed(2)}</span>
              </div>
            </div>
          )}

          {!selectedDayData && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Select a day to see detailed utilization
            </div>
          )}
        </motion.div>
      </div>

      {/* Day Details */}
      <motion.div
        className="grid md:grid-cols-5 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {schedule.map((day, index) => (
          <motion.div
            key={index}
            className={`rounded-lg p-3 border-2 transition-all cursor-pointer ${
              selectedDay === index
                ? 'border-space-blue bg-blue-50 shadow-md'
                : selectedDay === null
                ? 'border-gray-200 bg-white hover:border-gray-300'
                : 'border-gray-100 bg-gray-50 opacity-50'
            }`}
            onClick={() => setSelectedDay(selectedDay === index ? null : index)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-rh-navy">{day.dayName}</span>
              <span className="text-xs font-medium text-space-blue">{day.volUtil}%</span>
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
              <div className="flex justify-between border-t pt-1 mt-1">
                <span className="text-gray-500">Cost:</span>
                <span className="font-bold text-space-blue">${day.cost.toFixed(0)}</span>
              </div>
            </div>

            {/* Mini utilization bar */}
            <div className="mt-2">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-space-blue rounded-full"
                  style={{ width: `${day.volUtil}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
