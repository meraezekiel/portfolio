import { useEffect, useRef, useState } from 'react';

const SETTLE_PX = 0.1;

export const useCustomCursorHandler = () => {
  const [enabled] = useState(
    () => !window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches,
  );
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return undefined;
    let frame = null;

    const tick = () => {
      const target = targetRef.current;
      const dot = positionRef.current;
      const ring = ringPositionRef.current;
      dot.x += (target.x - dot.x) * 0.35;
      dot.y += (target.y - dot.y) * 0.35;
      ring.x += (target.x - ring.x) * 0.15;
      ring.y += (target.y - ring.y) * 0.15;

      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;

      // Stop once both have caught up; the next mousemove restarts the loop.
      const settled = Math.abs(target.x - ring.x) < SETTLE_PX && Math.abs(target.y - ring.y) < SETTLE_PX
        && Math.abs(target.x - dot.x) < SETTLE_PX && Math.abs(target.y - dot.y) < SETTLE_PX;
      frame = settled ? null : requestAnimationFrame(tick);
    };

    const handleMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    const handleEnter = (e) => {
      if (e.target.closest?.('a, button, [data-cursor-hover]')) {
        ringRef.current?.classList.add('cursor-hovered');
      }
    };

    const handleLeave = (e) => {
      if (e.target.closest?.('a, button, [data-cursor-hover]')) {
        ringRef.current?.classList.remove('cursor-hovered');
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { enabled, cursorRef, ringRef };
};
