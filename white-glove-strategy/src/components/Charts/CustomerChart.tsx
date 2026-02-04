import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { customers, getRegion, regionColors } from '../../data/customers';

interface CustomerChartProps {
  metric: 'volume' | 'weight' | 'items' | 'loads';
  isActive?: boolean;
}

export const CustomerChart = ({ metric, isActive = true }: CustomerChartProps) => {
  const metricConfig = {
    volume: { key: 'volume', label: 'Volume (cu ft)', format: (v: number) => `${v.toLocaleString()} cu ft` },
    weight: { key: 'weight', label: 'Weight (lbs)', format: (v: number) => `${v.toLocaleString()} lbs` },
    items: { key: 'items', label: 'Items', format: (v: number) => `${v} items` },
    loads: { key: 'loads', label: 'Truck Loads', format: (v: number) => `${v} loads` },
  };

  const config = metricConfig[metric];

  // Sort customers by the selected metric (descending)
  const sortedCustomers = [...customers].sort(
    (a, b) => (b[config.key as keyof typeof b] as number) - (a[config.key as keyof typeof a] as number)
  );

  const data = sortedCustomers.map((customer) => ({
    id: customer.id.replace('CUST', ''),
    value: customer[config.key as keyof typeof customer] as number,
    region: getRegion(customer),
    fullId: customer.id,
  }));

  if (!isActive) return null;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="id"
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tickFormatter={(v) => v.toLocaleString()} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-rh-navy">{data.fullId}</p>
                    <p className="text-sm text-gray-600">{data.region}</p>
                    <p className="text-sm font-medium mt-1">{config.format(data.value)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={regionColors[entry.region] || '#718096'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CustomerSummaryCards = ({ isActive = true }: { isActive?: boolean }) => {
  const totalItems = customers.reduce((sum, c) => sum + c.items, 0);
  const totalVolume = customers.reduce((sum, c) => sum + c.volume, 0);
  const totalWeight = customers.reduce((sum, c) => sum + c.weight, 0);
  const totalLoads = customers.reduce((sum, c) => sum + c.loads, 0);

  const stats = [
    { label: 'Total Items', value: totalItems, format: (v: number) => v.toString() },
    { label: 'Total Volume', value: totalVolume, format: (v: number) => `${v.toLocaleString()} cu ft` },
    { label: 'Total Weight', value: totalWeight, format: (v: number) => `${v.toLocaleString()} lbs` },
    { label: 'Total Loads', value: totalLoads, format: (v: number) => `${v} truck loads` },
  ];

  if (!isActive) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="text-2xl font-bold tabular-nums text-rh-navy">
            {stat.format(stat.value).split(' ')[0]}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
