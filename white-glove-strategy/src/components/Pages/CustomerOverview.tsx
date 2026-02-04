import { useState } from 'react';
import { motion } from 'framer-motion';
import { DeliveryMap } from '../Maps/DeliveryMap';
import { CustomerChart, CustomerSummaryCards } from '../Charts/CustomerChart';
import { customers, getRegion, regionColors } from '../../data/customers';

interface PageProps {
  isActive?: boolean;
}

export const CustomerOverview = ({ isActive = true }: PageProps) => {
  const [highlightedCustomer, setHighlightedCustomer] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'volume' | 'weight' | 'items' | 'loads'>('volume');

  // Group customers by region
  const regions = customers.reduce((acc, customer) => {
    const region = getRegion(customer);
    if (!acc[region]) acc[region] = [];
    acc[region].push(customer);
    return acc;
  }, {} as Record<string, typeof customers>);

  if (!isActive) return null;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rh-navy mb-2">
          Our Customers
        </h1>
        <p className="text-gray-600 mb-6">
          11 customers across the San Francisco Bay Area
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <CustomerSummaryCards isActive={isActive} />
      </motion.div>

      {/* Map and Chart Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-rh-navy mb-3">Customer Locations</h2>
          <DeliveryMap
            showAllCustomers={true}
            showRoutes={false}
            highlightedCustomer={highlightedCustomer}
            isActive={isActive}
          />

          {/* Region Legend */}
          <div className="mt-4 flex flex-wrap gap-3">
            {Object.entries(regionColors).map(([region, color]) => (
              <div key={region} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-600">
                  {region} ({regions[region]?.length || 0})
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-rh-navy">Order Size by Customer</h2>
            <div className="flex gap-1">
              {(['volume', 'weight', 'items', 'loads'] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedMetric === metric
                      ? 'bg-rh-navy text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <CustomerChart metric={selectedMetric} isActive={isActive} />
          </div>
        </motion.div>
      </div>

      {/* Customer List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-rh-navy mb-3">Customer Details</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
          {customers.map((customer, index) => {
            const region = getRegion(customer);
            return (
              <motion.div
                key={customer.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  highlightedCustomer === customer.id
                    ? 'border-rh-gold bg-yellow-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-rh-navy'
                }`}
                onMouseEnter={() => setHighlightedCustomer(customer.id)}
                onMouseLeave={() => setHighlightedCustomer(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-rh-navy">{customer.id}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: regionColors[region] + '20', color: regionColors[region] }}
                  >
                    {region}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                  <div>{customer.items} items</div>
                  <div>{customer.loads} loads</div>
                  <div>{customer.volume.toFixed(0)} cu ft</div>
                  <div>{customer.weight.toLocaleString()} lbs</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
