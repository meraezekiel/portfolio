import { useCallback } from 'react';

export const useBentoTileHandler = (onMouseMove) => {
  // Position the hover spotlight under the cursor via CSS variables (no animation loop needed).
  const handleMouseMove = useCallback((e) => {
    const tile = e.currentTarget;
    const rect = tile.getBoundingClientRect();
    tile.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    tile.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    onMouseMove?.(e);
  }, [onMouseMove]);

  return { handleMouseMove };
};
