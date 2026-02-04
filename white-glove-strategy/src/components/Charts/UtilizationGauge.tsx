import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface UtilizationGaugeProps {
  value: number;
  maxValue?: number;
  label: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
}

export const UtilizationGauge = ({
  value,
  maxValue = 100,
  label,
  color = '#48bb78',
  size = 'md',
  isActive = true,
}: UtilizationGaugeProps) => {
  const percentage = (value / maxValue) * 100;
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  const sizeConfig = {
    sm: { width: 100, height: 60, innerRadius: 30, outerRadius: 45, fontSize: '1rem' },
    md: { width: 160, height: 100, innerRadius: 50, outerRadius: 70, fontSize: '1.5rem' },
    lg: { width: 200, height: 120, innerRadius: 65, outerRadius: 90, fontSize: '2rem' },
  };

  const config = sizeConfig[size];

  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: config.width, height: config.height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={config.innerRadius}
              outerRadius={config.outerRadius}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={color} />
              <Cell fill="#e2e8f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <motion.div
        className="text-center -mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="tabular-nums font-bold" style={{ fontSize: config.fontSize, color }}>
          {value.toFixed(1)}%
        </div>
        <div className="text-xs text-gray-500 mt-1">{label}</div>
      </motion.div>
    </div>
  );
};

export const TruckFillVisualization = ({
  fillPercentage,
  label,
  isActive = true,
}: {
  fillPercentage: number;
  label: string;
  isActive?: boolean;
}) => {
  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-16 bg-gray-200 rounded-md border-2 border-gray-400 overflow-hidden">
        {/* Truck body */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-rh-navy"
          initial={{ height: 0 }}
          animate={{ height: `${fillPercentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Truck cab */}
        <div className="absolute right-0 bottom-0 w-6 h-10 bg-gray-300 border-l-2 border-gray-400" />
      </div>
      <div className="mt-2 text-center">
        <div className="text-lg font-bold tabular-nums text-rh-navy">{fillPercentage.toFixed(1)}%</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export const CapacityBar = ({
  current,
  max,
  label,
  unit,
  color = '#1a365d',
  isActive = true,
}: {
  current: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  isActive?: boolean;
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  if (!isActive) return null;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="tabular-nums font-medium">
          {current.toLocaleString()} / {max.toLocaleString()} {unit}
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
      <div className="text-right text-xs text-gray-500 mt-1">
        {percentage.toFixed(1)}% utilized
      </div>
    </div>
  );
};
