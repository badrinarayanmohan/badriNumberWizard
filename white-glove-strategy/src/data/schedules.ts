export interface DaySchedule {
  day: number;
  dayName: string;
  customers: string[];
  loads: number;
  miles: number;
  hours: number;
  cost: number;
  route: string[];
  volUtil?: number;
}

export const speedOptimizedSchedule: DaySchedule[] = [
  {
    day: 1,
    dayName: "Tuesday",
    customers: ["CUST8164", "CUST1155", "CUST8575"],
    loads: 5,
    miles: 12,
    hours: 7.75,
    cost: 820.47,
    route: ["Warehouse", "CUST1155", "CUST8164", "CUST8575", "Warehouse"]
  },
  {
    day: 2,
    dayName: "Wednesday",
    customers: ["CUST1133", "CUST9283", "CUST9602", "CUST8575"],
    loads: 4,
    miles: 41,
    hours: 7.0,
    cost: 777.41,
    route: ["Warehouse", "CUST8575", "CUST1133", "CUST9283", "CUST9602", "Warehouse"]
  },
  {
    day: 3,
    dayName: "Thursday",
    customers: ["CUST5040", "CUST5385", "CUST7706"],
    loads: 4,
    miles: 37,
    hours: 7.0,
    cost: 772.59,
    route: ["Warehouse", "CUST5040", "CUST5385", "CUST7706", "Warehouse"]
  },
  {
    day: 4,
    dayName: "Friday",
    customers: ["CUST5040", "CUST2663"],
    loads: 4,
    miles: 42,
    hours: 7.5,
    cost: 830.61,
    route: ["Warehouse", "CUST5040", "CUST2663", "Warehouse"]
  },
  {
    day: 5,
    dayName: "Saturday",
    customers: ["CUST2286"],
    loads: 1,
    miles: 22,
    hours: 3.5,
    cost: 390.51,
    route: ["Warehouse", "CUST2286", "Warehouse"]
  }
];

export const spaceOptimizedSchedule: DaySchedule[] = [
  {
    day: 1,
    dayName: "Tuesday",
    customers: ["CUST5040", "CUST7706", "CUST8164"],
    loads: 3,
    miles: 35,
    hours: 8.25,
    cost: 883.41,
    volUtil: 94.8,
    route: ["Warehouse", "CUST7706", "CUST5040", "CUST8164", "Warehouse"]
  },
  {
    day: 2,
    dayName: "Wednesday",
    customers: ["CUST8164", "CUST9283", "CUST9602", "CUST2286"],
    loads: 4,
    miles: 40,
    hours: 9.0,
    cost: 948.24,
    volUtil: 93.9,
    route: ["Warehouse", "CUST8164", "CUST9283", "CUST9602", "CUST2286", "Warehouse"]
  },
  {
    day: 3,
    dayName: "Thursday",
    customers: ["CUST5385", "CUST2663"],
    loads: 3,
    miles: 98,
    hours: 8.25,
    cost: 953.53,
    volUtil: 92.2,
    route: ["Warehouse", "CUST5385", "CUST2663", "Warehouse"]
  },
  {
    day: 4,
    dayName: "Friday",
    customers: ["CUST1155", "CUST2663", "CUST1133", "CUST8575"],
    loads: 3,
    miles: 46,
    hours: 8.25,
    cost: 920.01,
    volUtil: 91.7,
    route: ["Warehouse", "CUST1155", "CUST2663", "CUST1133", "CUST8575", "Warehouse"]
  },
  {
    day: 5,
    dayName: "Saturday",
    customers: ["CUST8575"],
    loads: 1,
    miles: 11,
    hours: 2.75,
    cost: 392.75,
    volUtil: 50.0,
    route: ["Warehouse", "CUST8575", "Warehouse"]
  }
];

export const dayColors = [
  '#1a365d', // Navy - Day 1
  '#2c5282', // Blue - Day 2
  '#48bb78', // Green - Day 3
  '#c9a227', // Gold - Day 4
  '#e53e3e', // Red - Day 5
];

export const getScheduleTotals = (schedule: DaySchedule[]) => {
  return schedule.reduce((acc, day) => ({
    totalMiles: acc.totalMiles + day.miles,
    totalHours: acc.totalHours + day.hours,
    totalCost: acc.totalCost + day.cost,
    totalLoads: acc.totalLoads + day.loads,
  }), { totalMiles: 0, totalHours: 0, totalCost: 0, totalLoads: 0 });
};
