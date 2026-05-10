import { useCustomCursorHandler } from './useCustomCursorHandler';
import './CustomCursor.scss';

export const CustomCursor = () => {
  const { cursorRef, ringRef } = useCustomCursorHandler();
  return (
    <>
      <div ref={cursorRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
};
