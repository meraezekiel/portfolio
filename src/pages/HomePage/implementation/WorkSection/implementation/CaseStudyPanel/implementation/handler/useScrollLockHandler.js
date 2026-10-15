import { useEffect } from 'react';
import {
  requestScrollLock,
  releaseScrollLock,
} from '../../../../../../../../components/SmoothScroll/implementation/lenisInstance';

export const useScrollLockHandler = (locked) => {
  useEffect(() => {
    if (!locked) return undefined;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    requestScrollLock();
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previousOverflow;
      releaseScrollLock();
    };
  }, [locked]);
};
