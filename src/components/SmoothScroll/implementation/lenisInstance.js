let instance = null;
let lockCount = 0;

// Child effects (e.g. a modal opened from a shared link) run before SmoothScroll creates Lenis,
// so locks are counted here and applied to whichever instance exists now or is created later.
export const setLenis = (lenis) => {
  instance = lenis;
  if (instance && lockCount > 0) instance.stop();
};

export const getLenis = () => instance;

export const requestScrollLock = () => {
  lockCount += 1;
  instance?.stop();
};

export const releaseScrollLock = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) instance?.start();
};
