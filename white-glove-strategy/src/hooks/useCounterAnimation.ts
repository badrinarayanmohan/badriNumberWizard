import { useState, useEffect, useRef } from 'react';

interface UseCounterAnimationOptions {
  duration?: number;
  delay?: number;
  startOnMount?: boolean;
  easing?: 'linear' | 'easeOut' | 'easeInOut';
}

export const useCounterAnimation = (
  target: number,
  options: UseCounterAnimationOptions = {}
) => {
  const {
    duration = 2000,
    delay = 0,
    startOnMount = true,
    easing = 'easeOut',
  } = options;

  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  const startAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsAnimating(true);
    const startTime = Date.now() + delay;
    const startValue = 0;
    const easeFn = easingFunctions[easing];

    const animate = () => {
      const now = Date.now();

      if (now < startTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeFn(progress);
      const currentValue = startValue + (target - startValue) * eased;

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setCount(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCount(0);
    setIsAnimating(false);
    hasStarted.current = false;
  };

  useEffect(() => {
    if (startOnMount && !hasStarted.current) {
      hasStarted.current = true;
      startAnimation();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, delay, startOnMount, easing]);

  return {
    count,
    isAnimating,
    startAnimation,
    reset,
  };
};

export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (value: number, decimals: number = 2): string => {
  return '$' + formatNumber(value, decimals);
};

export const formatPercent = (value: number, decimals: number = 1): string => {
  return formatNumber(value, decimals) + '%';
};
