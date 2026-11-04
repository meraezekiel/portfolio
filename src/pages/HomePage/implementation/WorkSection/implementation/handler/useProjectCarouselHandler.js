import { useCallback, useEffect, useState } from 'react';

const ROTATE_MS = 5000;

export const useProjectCarouselHandler = (total, stopped) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (stopped || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setCurrent((index) => (index + 1) % total), ROTATE_MS);
    return () => clearInterval(timer);
  }, [total, stopped, paused]);

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  return {
    current, select: setCurrent, pause, resume,
  };
};
