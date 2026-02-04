import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { profitability } from '../../data/metrics';

interface WaterfallChartProps {
  isActive?: boolean;
}

export const WaterfallChart = ({ isActive = true }: WaterfallChartProps) => {
  const data = [
    {
      name: 'Revenue',
      value: profitability.totalRevenue,
      start: 0,
      end: profitability.totalRevenue,
      color: '#48bb78',
    },
    {
      name: 'Labor Cost',
      value: -3406,
      start: profitability.totalRevenue,
      end: profitability.totalRevenue - 3406,
      color: '#fc8181',
    },
    {
      name: 'Fuel Cost',
      value: -185.57,
      start: profitability.totalRevenue - 3406,
      end: profitability.totalRevenue - 3406 - 185.57,
      color: '#fc8181',
    },
    {
      name: 'Net Loss',
      value: profitability.speedLoss,
      start: 0,
      end: profitability.speedLoss,
      color: '#e53e3e',
      isTotal: true,
    },
  ];

  if (!isActive) return null;

  // Transform data for Recharts waterfall representation
  const chartData = data.map((item, index) => ({
    name: item.name,
    value: Math.abs(item.value),
    invisible: index === 0 || item.isTotal ? 0 : data.slice(0, index).reduce((acc, d) => acc + d.value, 0),
    color: item.color,
    isPositive: item.value > 0,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v) => `$${v.toLocaleString()}`} />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'invisible') return null;
              return [`$${(value as number).toLocaleString()}`, 'Amount'];
            }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="invisible" stackId="a" fill="transparent" />
          <Bar dataKey="value" stackId="a" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SimplifiedWaterfall = ({ isActive = true }: { isActive?: boolean }) => {
  const items = [
    { label: 'Revenue (11 × $299)', value: profitability.totalRevenue, color: '#48bb78', positive: true },
    { label: 'Labor Cost', value: 3406, color: '#fc8181', positive: false },
    { label: 'Fuel Cost', value: 185.57, color: '#fc8181', positive: false },
    { label: 'Net Loss', value: Math.abs(profitability.speedLoss), color: '#e53e3e', positive: false, isResult: true },
  ];

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className={`relative ${item.isResult ? 'mt-6 pt-4 border-t-2 border-gray-200' : ''}`}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">{item.label}</span>
            <span className={`tabular-nums font-semibold ${item.positive ? 'text-green-600' : 'text-red-500'}`}>
              {item.positive ? '+' : '-'}${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                item.positive ? 'bg-green-400' : item.isResult ? 'bg-red-500' : 'bg-red-300'
              }`}
              style={{
                width: `${(item.value / profitability.totalRevenue) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
