import { useEffect, useRef } from 'react';

export const useCustomCursorHandler = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        ringRef.current?.classList.add('cursor-hovered');
      }
    };

    const handleLeave = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        ringRef.current?.classList.remove('cursor-hovered');
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);

    let frame;
    const tick = () => {
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.35;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.35;
      ringPositionRef.current.x += (targetRef.current.x - ringPositionRef.current.x) * 0.15;
      ringPositionRef.current.y += (targetRef.current.y - ringPositionRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPositionRef.current.x}px, ${ringPositionRef.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { cursorRef, ringRef };
};
