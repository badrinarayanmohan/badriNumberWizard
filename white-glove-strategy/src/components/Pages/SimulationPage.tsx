import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DeliveryMap } from '../Maps/DeliveryMap';
import { speedOptimizedSchedule, spaceOptimizedSchedule } from '../../data/schedules';
import { customers, warehouse } from '../../data/customers';

interface PageProps {
  isActive?: boolean;
}

interface SimulationState {
  isPlaying: boolean;
  currentDay: number;
  progress: number;
  truckPosition: { lat: number; lng: number } | null;
  deliveriesCompleted: number;
  milesTraveled: number;
  totalCost: number;
}

export const SimulationPage = ({ isActive = true }: PageProps) => {
  const [strategy, setStrategy] = useState<'speed' | 'space'>('speed');
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [speed, setSpeed] = useState(1);
  const [state, setState] = useState<SimulationState>({
    isPlaying: false,
    currentDay: 0,
    progress: 0,
    truckPosition: null,
    deliveriesCompleted: 0,
    milesTraveled: 0,
    totalCost: 0,
  });

  const schedule = strategy === 'speed' ? speedOptimizedSchedule : spaceOptimizedSchedule;
  const currentDaySchedule = schedule[selectedDay];

  const getPositionFromId = useCallback((id: string) => {
    if (id === 'Warehouse') {
      return { lat: warehouse.lat, lng: warehouse.lng };
    }
    const customer = customers.find(c => c.id === id);
    return customer ? { lat: customer.lat, lng: customer.lng } : null;
  }, []);

  const interpolate = (start: { lat: number; lng: number }, end: { lat: number; lng: number }, t: number) => ({
    lat: start.lat + (end.lat - start.lat) * t,
    lng: start.lng + (end.lng - start.lng) * t,
  });

  useEffect(() => {
    if (!state.isPlaying || !isActive) return;

    const route = currentDaySchedule.route;
    const positions = route.map(id => getPositionFromId(id)).filter(Boolean) as { lat: number; lng: number }[];
    const totalSegments = positions.length - 1;
    const baseDuration = 8000 / speed;

    let startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / baseDuration, 1);

      const segmentProgress = progress * totalSegments;
      const currentSegment = Math.min(Math.floor(segmentProgress), totalSegments - 1);
      const segmentT = segmentProgress - currentSegment;

      const currentPos = interpolate(
        positions[currentSegment],
        positions[Math.min(currentSegment + 1, positions.length - 1)],
        segmentT
      );

      setState(prev => ({
        ...prev,
        progress,
        truckPosition: currentPos,
        deliveriesCompleted: Math.max(0, currentSegment),
        milesTraveled: currentDaySchedule.miles * progress,
        totalCost: currentDaySchedule.cost * progress,
      }));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setState(prev => ({ ...prev, isPlaying: false, progress: 1 }));
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [state.isPlaying, currentDaySchedule, speed, isActive, getPositionFromId]);

  const play = () => {
    if (state.progress >= 1) {
      reset();
    }
    setState(prev => ({ ...prev, isPlaying: true }));
  };

  const pause = () => {
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const reset = () => {
    setState({
      isPlaying: false,
      currentDay: selectedDay,
      progress: 0,
      truckPosition: getPositionFromId(currentDaySchedule.route[0]),
      deliveriesCompleted: 0,
      milesTraveled: 0,
      totalCost: 0,
    });
  };

  useEffect(() => {
    reset();
  }, [selectedDay, strategy]);

  if (!isActive) return null;

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rh-navy mb-2">
          Watch the Delivery in Action
        </h1>
        <p className="text-gray-600 mb-6">
          Simulate delivery routes and track progress in real-time
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="flex flex-wrap gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Strategy Toggle */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              strategy === 'speed' ? 'bg-speed-green text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setStrategy('speed')}
          >
            Speed-Optimized
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              strategy === 'space' ? 'bg-space-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setStrategy('space')}
          >
            Space-Optimized
          </button>
        </div>

        {/* Day Selector */}
        <div className="day-tabs">
          {schedule.map((day, index) => (
            <button
              key={index}
              className={`day-tab ${selectedDay === index ? 'active' : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              {day.dayName}
            </button>
          ))}
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-gray-500">Speed:</span>
          {[1, 2, 5, 10].map((s) => (
            <button
              key={s}
              className={`speed-btn ${speed === s ? 'active' : ''}`}
              onClick={() => setSpeed(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      </motion.div>

      {/* Map and Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <DeliveryMap
            schedule={[currentDaySchedule]}
            selectedDay={0}
            showAllCustomers={true}
            showRoutes={true}
            truckPosition={state.truckPosition}
            isActive={isActive}
          />

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={reset}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Reset"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
            </button>

            <button
              onClick={state.isPlaying ? pause : play}
              className={`p-4 rounded-full transition-colors ${
                state.isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : strategy === 'speed'
                  ? 'bg-speed-green hover:bg-green-600'
                  : 'bg-space-blue hover:bg-blue-600'
              } text-white`}
            >
              {state.isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${strategy === 'speed' ? 'bg-speed-green' : 'bg-space-blue'}`}
                style={{ width: `${state.progress * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Live Dashboard */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-rh-navy mb-4 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${state.isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            Live Dashboard
          </h3>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Current Day</div>
              <div className="text-2xl font-bold text-rh-navy">{currentDaySchedule.dayName}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Deliveries</div>
                <div className="text-xl font-bold tabular-nums text-rh-navy">
                  {state.deliveriesCompleted} / {currentDaySchedule.customers.length}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Miles</div>
                <div className="text-xl font-bold tabular-nums text-rh-navy">
                  {state.milesTraveled.toFixed(1)}
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-4 ${strategy === 'speed' ? 'bg-green-50' : 'bg-blue-50'}`}>
              <div className="text-xs text-gray-500">Running Cost</div>
              <div className={`text-2xl font-bold tabular-nums ${strategy === 'speed' ? 'text-speed-green' : 'text-space-blue'}`}>
                ${state.totalCost.toFixed(2)}
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="text-sm text-gray-500 mb-2">Route Progress</div>
              <div className="space-y-1">
                {currentDaySchedule.route.map((stop, index) => {
                  const isCompleted = index < state.deliveriesCompleted + 1;
                  const isCurrent = index === Math.floor(state.deliveriesCompleted);

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-sm ${
                        isCompleted ? 'text-gray-800' : 'text-gray-400'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        isCompleted
                          ? strategy === 'speed' ? 'bg-speed-green' : 'bg-space-blue'
                          : 'bg-gray-300'
                      } ${isCurrent ? 'animate-pulse' : ''}`} />
                      <span className={isCurrent ? 'font-medium' : ''}>
                        {stop === 'Warehouse' ? 'RH Warehouse' : stop}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
