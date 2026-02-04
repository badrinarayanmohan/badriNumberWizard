import { motion } from 'framer-motion';
import { usePageNavigation } from '../../hooks/usePageNavigation';

interface PageProps {
  isActive?: boolean;
}

export const CoverPage = ({ isActive = true }: PageProps) => {
  const { nextPage } = usePageNavigation();

  if (!isActive) return null;

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center cover-bg text-white p-8 rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Truck Icon */}
        <motion.div
          className="mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <svg className="w-24 h-24 mx-auto text-rh-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          White Glove
          <span className="block gold-accent">Strategy</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          RH Unlimited Furniture Delivery Optimization
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-32 h-1 bg-rh-gold mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 text-sm mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold gold-accent">11</div>
            <div className="text-gray-400">Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gold-accent">324</div>
            <div className="text-gray-400">Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gold-accent">18</div>
            <div className="text-gray-400">Truck Loads</div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.p
          className="text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          San Francisco Bay Area
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={nextPage}
          className="btn btn-gold flex items-center gap-2 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Turn page to begin
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};
