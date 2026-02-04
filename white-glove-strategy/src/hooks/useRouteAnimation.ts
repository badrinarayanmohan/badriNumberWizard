import { useState, useCallback, useRef, useEffect } from 'react';
import { customers, warehouse } from '../data/customers';
import type { DaySchedule } from '../data/schedules';

interface Position {
  lat: number;
  lng: number;
}

interface RouteAnimationState {
  isPlaying: boolean;
  currentPosition: Position | null;
  progress: number;
  currentSegment: number;
  totalSegments: number;
  deliveriesCompleted: number;
  milesTraveled: number;
  elapsedTime: number;
}

export const useRouteAnimation = (schedule: DaySchedule | null, speed: number = 1) => {
  const [state, setState] = useState<RouteAnimationState>({
    isPlaying: false,
    currentPosition: null,
    progress: 0,
    currentSegment: 0,
    totalSegments: 0,
    deliveriesCompleted: 0,
    milesTraveled: 0,
    elapsedTime: 0,
  });

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const getPositionFromId = (id: string): Position | null => {
    if (id === 'Warehouse') {
      return { lat: warehouse.lat, lng: warehouse.lng };
    }
    const customer = customers.find(c => c.id === id);
    return customer ? { lat: customer.lat, lng: customer.lng } : null;
  };

  const getRoutePositions = useCallback((route: string[]): Position[] => {
    return route
      .map(id => getPositionFromId(id))
      .filter((pos): pos is Position => pos !== null);
  }, []);

  const interpolate = (start: Position, end: Position, t: number): Position => {
    return {
      lat: start.lat + (end.lat - start.lat) * t,
      lng: start.lng + (end.lng - start.lng) * t,
    };
  };

  const calculateDistance = (p1: Position, p2: Position): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLng = (p2.lng - p1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const play = useCallback(() => {
    if (!schedule) return;

    setState(prev => ({ ...prev, isPlaying: true }));
    startTimeRef.current = Date.now() - state.elapsedTime * 1000;

    const positions = getRoutePositions(schedule.route);
    const totalSegments = positions.length - 1;
    const baseDuration = 10000; // 10 seconds base for full route

    const animate = () => {
      const now = Date.now();
      const elapsed = (now - (startTimeRef.current || now)) / 1000;
      const adjustedDuration = baseDuration / speed / 1000;
      const progress = Math.min(elapsed / adjustedDuration, 1);

      const segmentProgress = progress * totalSegments;
      const currentSegment = Math.min(Math.floor(segmentProgress), totalSegments - 1);
      const segmentT = segmentProgress - currentSegment;

      const currentPos = interpolate(
        positions[currentSegment],
        positions[Math.min(currentSegment + 1, positions.length - 1)],
        segmentT
      );

      // Calculate miles traveled
      let totalDistance = 0;
      for (let i = 0; i <= currentSegment; i++) {
        if (i < positions.length - 1) {
          const dist = calculateDistance(positions[i], positions[i + 1]);
          if (i < currentSegment) {
            totalDistance += dist;
          } else {
            totalDistance += dist * segmentT;
          }
        }
      }

      // Count deliveries (excluding warehouse returns)
      const deliveriesCompleted = Math.max(0, currentSegment);

      setState(prev => ({
        ...prev,
        currentPosition: currentPos,
        progress,
        currentSegment,
        totalSegments,
        deliveriesCompleted,
        milesTraveled: totalDistance * (schedule.miles / calculateTotalRouteDistance(positions)),
        elapsedTime: elapsed,
      }));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setState(prev => ({ ...prev, isPlaying: false, progress: 1 }));
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [schedule, speed, state.elapsedTime, getRoutePositions]);

  const calculateTotalRouteDistance = (positions: Position[]): number => {
    let total = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      total += calculateDistance(positions[i], positions[i + 1]);
    }
    return total;
  };

  const pause = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = null;
    setState({
      isPlaying: false,
      currentPosition: schedule ? getPositionFromId(schedule.route[0]) : null,
      progress: 0,
      currentSegment: 0,
      totalSegments: schedule ? schedule.route.length - 1 : 0,
      deliveriesCompleted: 0,
      milesTraveled: 0,
      elapsedTime: 0,
    });
  }, [schedule]);

  const setSpeed = useCallback((newSpeed: number) => {
    if (state.isPlaying) {
      // Adjust start time to maintain current progress with new speed
      const adjustedElapsed = state.elapsedTime * (speed / newSpeed);
      startTimeRef.current = Date.now() - adjustedElapsed * 1000;
    }
  }, [state.isPlaying, state.elapsedTime, speed]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (schedule) {
      reset();
    }
  }, [schedule]);

  return {
    ...state,
    play,
    pause,
    reset,
    setSpeed,
    getRoutePositions,
  };
};
