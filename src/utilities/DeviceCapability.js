export const shouldRenderSpline = ({ reducedMotion, coarsePointer, cores }) =>
  !reducedMotion && !coarsePointer && !(typeof cores === 'number' && cores <= 4);

export const readDeviceCapability = () => ({
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  coarsePointer: window.matchMedia('(pointer: coarse)').matches,
  cores: navigator.hardwareConcurrency,
});
