import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { recommendations } from '../../data/metrics';

interface PageProps {
  isActive?: boolean;
}

const iconMap: Record<string, ReactNode> = {
  speedometer: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm1 10.75c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM12 6c-3.31 0-6 2.69-6 6 0 1.01.26 1.97.7 2.8l1.46-1.46c-.1-.42-.16-.86-.16-1.34 0-2.21 1.79-4 4-4s4 1.79 4 4c0 .48-.06.92-.16 1.34l1.46 1.46c.44-.83.7-1.79.7-2.8 0-3.31-2.69-6-6-6z"/>
    </svg>
  ),
  dollar: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
  ),
  computer: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
    </svg>
  ),
  gps: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
};

export const RecommendationsPage = ({ isActive = true }: PageProps) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  if (!isActive) return null;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rh-navy mb-2">
          The Path Forward
        </h1>
        <p className="text-gray-600 mb-8">
          Strategic recommendations for optimizing RH delivery operations
        </p>
      </motion.div>

      {/* Recommendation Cards */}
      <div className="space-y-4 mb-8">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            className="recommendation-card cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            onClick={() => setExpandedCard(expandedCard === rec.id ? null : rec.id)}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rh-gold/10 rounded-xl text-rh-gold flex-shrink-0">
                {iconMap[rec.icon]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-rh-navy">{rec.title}</h3>
                  <motion.svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: expandedCard === rec.id ? 180 : 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
                <p className="text-gray-600 mt-1">{rec.description}</p>

                <AnimatePresence>
                  {expandedCard === rec.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-100"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        {rec.savings && (
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-xs text-green-600 font-medium">SAVINGS</div>
                            <div className="text-lg font-bold text-green-700">{rec.savings}</div>
                          </div>
                        )}
                        {rec.impact && (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-xs text-blue-600 font-medium">IMPACT</div>
                            <div className="text-lg font-bold text-blue-700">{rec.impact}</div>
                          </div>
                        )}
                        {rec.current && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 font-medium">CURRENT</div>
                            <div className="text-lg font-bold text-gray-700">{rec.current}</div>
                          </div>
                        )}
                        {rec.recommended && (
                          <div className="bg-rh-gold/10 rounded-lg p-3">
                            <div className="text-xs text-rh-gold font-medium">RECOMMENDED</div>
                            <div className="text-lg font-bold text-rh-navy">{rec.recommended}</div>
                          </div>
                        )}
                        {rec.benefits && (
                          <div className="md:col-span-2">
                            <div className="text-xs text-gray-500 font-medium mb-2">KEY BENEFITS</div>
                            <div className="flex flex-wrap gap-2">
                              {rec.benefits.map((benefit, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                                >
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Dashboard */}
      <motion.div
        className="bg-gradient-to-br from-rh-navy to-blue-900 text-white rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-rh-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
          Executive Summary
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-rh-gold">$506</div>
            <div className="text-sm text-gray-300">Cost Savings per Batch</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-rh-gold">12.4%</div>
            <div className="text-sm text-gray-300">Efficiency Improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-rh-gold">$1.8M</div>
            <div className="text-sm text-gray-300">Annual Revenue Potential</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-rh-gold">3mo</div>
            <div className="text-sm text-gray-300">Software ROI Payback</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <h4 className="font-semibold mb-3">Action Items</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Implement speed-optimized routing immediately',
              'Propose fee increase to $349 to finance committee',
              'Evaluate Route4Me and Amazon Location Services',
              'Build business case for routing software investment',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-rh-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-rh-gold">{index + 1}</span>
                </div>
                <span className="text-sm text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
