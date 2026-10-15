import { useCallback, useEffect, useRef } from 'react';

export const useSplineVisibilityHandler = (sceneRef, visibleRef, onLoad) => {
  const appRef = useRef(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      const app = appRef.current;
      if (!app) return;
      if (entry.isIntersecting) app.play();
      else app.stop();
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [sceneRef, visibleRef]);

  const handleSplineLoad = useCallback((app) => {
    appRef.current = app;
    onLoad?.(app);
    if (!visibleRef.current) app.stop();
  }, [onLoad, visibleRef]);

  return { handleSplineLoad };
};
