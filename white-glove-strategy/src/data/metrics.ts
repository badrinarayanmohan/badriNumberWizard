export interface StrategyMetrics {
  totalCost: number;
  totalMiles: number;
  totalHours: number;
  totalDays: number;
  truckTrips: number;
  avgVolumeUtil: number;
  avgWeightUtil: number;
  laborCost: number;
  fuelCost: number;
  costPerCustomer: number;
  costPerTruckLoad: number;
}

export interface Comparison {
  speedOptimized: StrategyMetrics;
  spaceOptimized: StrategyMetrics;
}

export interface Profitability {
  currentFee: number;
  totalRevenue: number;
  speedCost: number;
  spaceCost: number;
  speedLoss: number;
  spaceLoss: number;
  lossPerCustomer: number;
  breakevenFee: number;
  recommendedFee: number;
}

export interface TruckCapacity {
  maxVolume: number;
  maxWeight: number;
  totalOrderVolume: number;
  totalOrderWeight: number;
  minTripsRequired: number;
}

export const comparison: Comparison = {
  speedOptimized: {
    totalCost: 3591.57,
    totalMiles: 154,
    totalHours: 32.75,
    totalDays: 5,
    truckTrips: 18,
    avgVolumeUtil: 62.3,
    avgWeightUtil: 55.1,
    laborCost: 3406.00,
    fuelCost: 185.57,
    costPerCustomer: 326.51,
    costPerTruckLoad: 199.53
  },
  spaceOptimized: {
    totalCost: 4097.94,
    totalMiles: 229,
    totalHours: 36.75,
    totalDays: 5,
    truckTrips: 14,
    avgVolumeUtil: 74.4,
    avgWeightUtil: 65.7,
    laborCost: 3822.00,
    fuelCost: 275.94,
    costPerCustomer: 372.54,
    costPerTruckLoad: 292.71
  }
};

export const profitability: Profitability = {
  currentFee: 299,
  totalRevenue: 3289, // 11 customers × $299
  speedCost: 3591.57,
  spaceCost: 4097.94,
  speedLoss: -302.57,
  spaceLoss: -808.94,
  lossPerCustomer: 27.51,
  breakevenFee: 327,
  recommendedFee: 349
};

export const truckCapacity: TruckCapacity = {
  maxVolume: 1700, // cu ft
  maxWeight: 7000, // lbs
  totalOrderVolume: 17713.32,
  totalOrderWeight: 64395,
  minTripsRequired: 11 // by volume constraint
};

export const getMetricComparison = (metric: keyof StrategyMetrics): {
  speedValue: number;
  spaceValue: number;
  winner: 'speed' | 'space' | 'tie';
  difference: number;
  percentDiff: number;
} => {
  const speedValue = comparison.speedOptimized[metric];
  const spaceValue = comparison.spaceOptimized[metric];
  const difference = Math.abs(speedValue - spaceValue);
  const percentDiff = (difference / Math.max(speedValue, spaceValue)) * 100;

  // For some metrics, lower is better (cost, miles, hours)
  // For others, higher is better (utilization)
  const lowerIsBetter = ['totalCost', 'totalMiles', 'totalHours', 'truckTrips', 'laborCost', 'fuelCost', 'costPerCustomer', 'costPerTruckLoad'].includes(metric);

  let winner: 'speed' | 'space' | 'tie';
  if (speedValue === spaceValue) {
    winner = 'tie';
  } else if (lowerIsBetter) {
    winner = speedValue < spaceValue ? 'speed' : 'space';
  } else {
    winner = speedValue > spaceValue ? 'speed' : 'space';
  }

  return { speedValue, spaceValue, winner, difference, percentDiff };
};

export const recommendations = [
  {
    id: 1,
    title: "Use Speed-Optimized Routing",
    icon: "speedometer",
    description: "Minimizing distance reduces labor hours (94% of costs)",
    savings: "$506 per batch vs space optimization",
    impact: "12.4% cost reduction"
  },
  {
    id: 2,
    title: "Increase Delivery Fees",
    icon: "dollar",
    description: "Premium customers won't notice 0.5% of order value",
    current: "$299",
    recommended: "$349 (+$50)",
    impact: "+$1.8M annual revenue"
  },
  {
    id: 3,
    title: "Invest in Software, Not Analysts",
    icon: "computer",
    description: "Commercial routing software ($50K/yr) beats 2-person team ($279K/yr)",
    savings: "$229K per year",
    impact: "3-month payback"
  },
  {
    id: 4,
    title: "Real-Time API Integration",
    icon: "gps",
    description: "Amazon Location Services or Route4Me for dynamic routing",
    benefits: ["Traffic adjustment", "Customer notifications", "Real-time ETAs"],
    impact: "Improved customer satisfaction"
  }
];
