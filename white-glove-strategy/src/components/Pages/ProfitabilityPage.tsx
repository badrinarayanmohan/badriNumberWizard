import { motion } from 'framer-motion';
import { AnimatedCounter } from '../Charts/AnimatedCounter';
import { SimplifiedWaterfall } from '../Charts/WaterfallChart';
import { profitability, comparison } from '../../data/metrics';

interface PageProps {
  isActive?: boolean;
}

export const ProfitabilityPage = ({ isActive = true }: PageProps) => {
  if (!isActive) return null;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rh-navy mb-2">
          The Hidden Loss
        </h1>
        <p className="text-gray-600 mb-8">
          Why every delivery costs more than we charge
        </p>
      </motion.div>

      {/* Loss Alert */}
      <motion.div
        className="loss-indicator mb-8 flex items-center gap-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <svg className="w-12 h-12 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <div>
          <div className="font-bold text-xl">
            -$<AnimatedCounter target={Math.abs(profitability.speedLoss)} decimals={2} isActive={isActive} /> Loss Per Batch
          </div>
          <p className="text-red-700">
            Current delivery fee of ${profitability.currentFee} doesn't cover the ${comparison.speedOptimized.costPerCustomer.toFixed(2)} actual cost per customer
          </p>
        </div>
      </motion.div>

      {/* Revenue vs Cost Visual */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Waterfall Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-rh-navy mb-4">Cost Waterfall</h3>
          <SimplifiedWaterfall isActive={isActive} />
        </div>

        {/* Key Numbers */}
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-green-800">Revenue (11 × $299)</span>
              <span className="text-2xl font-bold text-green-600 tabular-nums">
                $<AnimatedCounter target={profitability.totalRevenue} isActive={isActive} />
              </span>
            </div>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <span className="text-red-800">Total Delivery Cost</span>
              <span className="text-2xl font-bold text-red-600 tabular-nums">
                $<AnimatedCounter target={profitability.speedCost} decimals={2} isActive={isActive} />
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Net Result</span>
              <span className="text-2xl font-bold text-red-400 tabular-nums">
                -$<AnimatedCounter target={Math.abs(profitability.speedLoss)} decimals={2} isActive={isActive} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* The Problem Explained */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold text-rh-navy mb-4">The Pricing Problem</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">$</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Cost per Truck Load</div>
                <div className="text-xl font-bold text-rh-navy tabular-nums">
                  $<AnimatedCounter target={comparison.speedOptimized.costPerTruckLoad} decimals={2} isActive={isActive} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-bold">$</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Cost per Customer</div>
                <div className="text-xl font-bold text-rh-navy tabular-nums">
                  $<AnimatedCounter target={comparison.speedOptimized.costPerCustomer} decimals={2} isActive={isActive} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <div>
                <div className="font-semibold text-amber-800 mb-1">The Gap</div>
                <p className="text-sm text-amber-700">
                  Customers pay per <strong>ORDER</strong>, not per truck trip.
                  Large orders requiring multiple loads get the same $299 fee as small single-load orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-gray-100 rounded-xl p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Current Fee</div>
          <div className="text-3xl font-bold text-gray-600">${profitability.currentFee}</div>
        </div>

        <div className="bg-yellow-100 rounded-xl p-4 text-center border-2 border-yellow-400">
          <div className="text-sm text-yellow-700 mb-1">Break-even Fee</div>
          <div className="text-3xl font-bold text-yellow-600">${profitability.breakevenFee}</div>
        </div>

        <div className="bg-green-100 rounded-xl p-4 text-center border-2 border-green-400">
          <div className="text-sm text-green-700 mb-1">Recommended Fee</div>
          <div className="text-3xl font-bold text-green-600">${profitability.recommendedFee}</div>
          <div className="text-xs text-green-600 mt-1">+$50 per delivery</div>
        </div>
      </motion.div>

      {/* Impact */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <div>
            <div className="font-semibold mb-1">Potential Impact</div>
            <p className="text-green-100">
              Raising the fee from $299 to $349 represents just <span className="font-bold text-white">0.5%</span> of average order value—
              barely noticeable to premium customers, but generates an estimated <span className="font-bold text-white">+$1.8M</span> in annual revenue.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
