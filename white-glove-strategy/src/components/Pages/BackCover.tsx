import { motion } from 'framer-motion';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import { comparison } from '../../data/metrics';

interface PageProps {
  isActive?: boolean;
}

export const BackCover = ({ isActive = true }: PageProps) => {
  const { goToPage } = usePageNavigation();

  if (!isActive) return null;

  const summaryStats = [
    { label: 'Customers Analyzed', value: '11' },
    { label: 'Items Scheduled', value: '324' },
    { label: 'Optimized Cost', value: `$${comparison.speedOptimized.totalCost.toLocaleString()}` },
    { label: 'Miles Optimized', value: comparison.speedOptimized.totalMiles.toString() },
  ];

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center cover-bg text-white p-8 rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        {/* Thank You */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Thank You
        </motion.h1>

        <motion.div
          className="w-32 h-1 bg-rh-gold mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        {/* Summary Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {summaryStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className="text-2xl font-bold gold-accent">{stat.value}</div>
              <div className="text-xs text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Attribution */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-300 mb-2">
            Analysis prepared for
          </p>
          <p className="text-xl font-semibold">
            RH Operations Management
          </p>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          className="text-sm text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>Data sources: RH delivery records, customer order data, route optimization model</p>
          <p className="mt-1">San Francisco Bay Area | Q1 2024</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <motion.button
            onClick={() => goToPage(0)}
            className="btn btn-gold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Restart Tour
          </motion.button>

          <motion.button
            onClick={() => window.print()}
            className="btn btn-secondary bg-white/10 border-white/30 text-white hover:bg-white/20 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Print Report
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-rh-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
            <span className="text-sm">White Glove Strategy</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
