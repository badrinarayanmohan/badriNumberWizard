import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { customers, warehouse, getRegion, regionColors } from '../../data/customers';
import type { Customer } from '../../data/customers';
import { dayColors } from '../../data/schedules';
import type { DaySchedule } from '../../data/schedules';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DeliveryMapProps {
  schedule?: DaySchedule[];
  selectedDay?: number | null;
  showAllCustomers?: boolean;
  showRoutes?: boolean;
  highlightedCustomer?: string | null;
  truckPosition?: { lat: number; lng: number } | null;
  isActive?: boolean;
}

const MapBounds = () => {
  const map = useMap();

  useEffect(() => {
    const allPoints: [number, number][] = [
      [warehouse.lat, warehouse.lng],
      ...customers.map((c) => [c.lat, c.lng] as [number, number]),
    ];
    const bounds = L.latLngBounds(allPoints);
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map]);

  return null;
};

const createCustomIcon = (color: string, isWarehouse: boolean = false) => {
  const size = isWarehouse ? 28 : 20;
  const svg = isWarehouse
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}">
        <polygon points="12,2 22,8.5 22,22 2,22 2,8.5" fill="${color}" stroke="#1a365d" stroke-width="2"/>
        <rect x="9" y="14" width="6" height="8" fill="#1a365d"/>
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">
        <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
      </svg>`;

  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

const createTruckIcon = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
    <rect x="1" y="8" width="14" height="10" rx="1" fill="#1a365d"/>
    <rect x="15" y="10" width="7" height="8" rx="1" fill="#2c5282"/>
    <circle cx="5" cy="18" r="2.5" fill="#333" stroke="#666"/>
    <circle cx="18" cy="18" r="2.5" fill="#333" stroke="#666"/>
    <rect x="15" y="11" width="5" height="4" fill="#87ceeb" rx="0.5"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: 'truck-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export const DeliveryMap = ({
  schedule,
  selectedDay,
  showAllCustomers = true,
  showRoutes = true,
  highlightedCustomer,
  truckPosition,
  isActive = true,
}: DeliveryMapProps) => {
  const [hoveredCustomer, setHoveredCustomer] = useState<string | null>(null);

  if (!isActive) return null;

  const getRouteCoordinates = (route: string[]): [number, number][] => {
    return route
      .map((stop) => {
        if (stop === 'Warehouse') {
          return [warehouse.lat, warehouse.lng] as [number, number];
        }
        const customer = customers.find((c) => c.id === stop);
        return customer ? ([customer.lat, customer.lng] as [number, number]) : null;
      })
      .filter((coord): coord is [number, number] => coord !== null);
  };

  const displayedSchedule = selectedDay !== null && selectedDay !== undefined && schedule
    ? [schedule[selectedDay]]
    : schedule;

  return (
    <div className="map-container rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[37.7749, -122.35]}
        zoom={11}
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapBounds />

        {/* Warehouse marker */}
        <Marker
          position={[warehouse.lat, warehouse.lng]}
          icon={createCustomIcon('#c9a227', true)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-rh-navy">{warehouse.name}</h3>
              <p className="text-sm text-gray-600">{warehouse.address}</p>
            </div>
          </Popup>
        </Marker>

        {/* Customer markers */}
        {showAllCustomers &&
          customers.map((customer) => {
            const region = getRegion(customer);
            const color = regionColors[region];
            const isHighlighted = highlightedCustomer === customer.id || hoveredCustomer === customer.id;

            return (
              <Marker
                key={customer.id}
                position={[customer.lat, customer.lng]}
                icon={createCustomIcon(isHighlighted ? '#c9a227' : color)}
                eventHandlers={{
                  mouseover: () => setHoveredCustomer(customer.id),
                  mouseout: () => setHoveredCustomer(null),
                }}
              >
                <Popup>
                  <CustomerPopup customer={customer} />
                </Popup>
              </Marker>
            );
          })}

        {/* Route lines */}
        {showRoutes &&
          displayedSchedule?.map((day, dayIndex) => {
            const coordinates = getRouteCoordinates(day.route);
            const colorIndex = (selectedDay !== null && selectedDay !== undefined) ? selectedDay : dayIndex;

            return (
              <Polyline
                key={`route-${dayIndex}`}
                positions={coordinates}
                color={dayColors[colorIndex % dayColors.length]}
                weight={4}
                opacity={0.8}
                dashArray={selectedDay === null ? '10, 10' : undefined}
              />
            );
          })}

        {/* Truck position for animation */}
        {truckPosition && (
          <Marker
            position={[truckPosition.lat, truckPosition.lng]}
            icon={createTruckIcon()}
          />
        )}
      </MapContainer>
    </div>
  );
};

const CustomerPopup = ({ customer }: { customer: Customer }) => {
  return (
    <div className="p-2 min-w-48">
      <h3 className="font-bold text-rh-navy">{customer.id}</h3>
      <p className="text-xs text-gray-500 mb-2">{customer.address}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Items:</span>
          <span className="font-medium ml-1">{customer.items}</span>
        </div>
        <div>
          <span className="text-gray-500">Loads:</span>
          <span className="font-medium ml-1">{customer.loads}</span>
        </div>
        <div>
          <span className="text-gray-500">Volume:</span>
          <span className="font-medium ml-1">{customer.volume.toFixed(0)} cu ft</span>
        </div>
        <div>
          <span className="text-gray-500">Weight:</span>
          <span className="font-medium ml-1">{customer.weight.toLocaleString()} lbs</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;
