export interface Customer {
  id: string;
  address: string;
  lat: number;
  lng: number;
  items: number;
  volume: number;
  weight: number;
  loads: number;
  distance: number;
}

export interface Warehouse {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export const customers: Customer[] = [
  { id: "CUST1133", address: "13397 Campus Drive, Oakland, CA 94619", lat: 37.7983, lng: -122.2108, items: 17, volume: 565.12, weight: 2647, loads: 1, distance: 16 },
  { id: "CUST1155", address: "945 Green St UNIT 8, San Francisco, CA 94133", lat: 37.7989, lng: -122.4108, items: 25, volume: 863.09, weight: 3159, loads: 1, distance: 4 },
  { id: "CUST2286", address: "295 South Street, Sausalito, CA 94965", lat: 37.8591, lng: -122.4853, items: 32, volume: 1330.97, weight: 5303, loads: 1, distance: 11 },
  { id: "CUST2663", address: "1520 165th Ave, San Leandro, CA 94578", lat: 37.6969, lng: -122.1150, items: 32, volume: 2004.30, weight: 6688, loads: 2, distance: 21 },
  { id: "CUST5040", address: "1728 Cambridge Drive, Alameda, CA 94501", lat: 37.7652, lng: -122.2416, items: 48, volume: 2943.89, weight: 11770, loads: 2, distance: 15 },
  { id: "CUST5385", address: "1500 La Loma Ave, Berkeley, CA 94708", lat: 37.8805, lng: -122.2514, items: 45, volume: 2535.35, weight: 8711, loads: 2, distance: 14 },
  { id: "CUST7706", address: "5 Drury Road, Berkeley, CA 94705", lat: 37.8615, lng: -122.2510, items: 10, volume: 138.94, weight: 506, loads: 1, distance: 13 },
  { id: "CUST8164", address: "1070 Green St UNIT 1501, San Francisco, CA 94133", lat: 37.7994, lng: -122.4110, items: 39, volume: 4034.23, weight: 10484, loads: 3, distance: 4 },
  { id: "CUST8575", address: "3800 Washington Street, San Francisco, CA 94118", lat: 37.7879, lng: -122.4508, items: 40, volume: 1701.03, weight: 8512, loads: 2, distance: 5.5 },
  { id: "CUST9283", address: "13367 Campus Drive, Oakland, CA 94619", lat: 37.7981, lng: -122.2105, items: 17, volume: 242.74, weight: 1160, loads: 1, distance: 16 },
  { id: "CUST9602", address: "13427 Campus Drive, Oakland, CA 94619", lat: 37.7985, lng: -122.2102, items: 19, volume: 1353.66, weight: 5455, loads: 1, distance: 16 }
];

export const warehouse: Warehouse = {
  name: "RH Warehouse",
  address: "590 20th St, San Francisco, CA 94107",
  lat: 37.7604,
  lng: -122.3871
};

export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find(c => c.id === id);
};

export const getTotalStats = () => {
  return customers.reduce((acc, c) => ({
    totalItems: acc.totalItems + c.items,
    totalVolume: acc.totalVolume + c.volume,
    totalWeight: acc.totalWeight + c.weight,
    totalLoads: acc.totalLoads + c.loads,
  }), { totalItems: 0, totalVolume: 0, totalWeight: 0, totalLoads: 0 });
};

export const getRegion = (customer: Customer): string => {
  if (customer.address.includes('San Francisco')) return 'San Francisco';
  if (customer.address.includes('Oakland')) return 'Oakland';
  if (customer.address.includes('Berkeley')) return 'East Bay';
  if (customer.address.includes('Alameda')) return 'East Bay';
  if (customer.address.includes('San Leandro')) return 'East Bay';
  if (customer.address.includes('Sausalito')) return 'North Bay';
  return 'Other';
};

export const regionColors: Record<string, string> = {
  'San Francisco': '#1a365d',
  'Oakland': '#2c5282',
  'East Bay': '#4299e1',
  'North Bay': '#48bb78',
  'Other': '#718096'
};
