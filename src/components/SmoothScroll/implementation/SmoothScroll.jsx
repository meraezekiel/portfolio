import { useSmoothScrollHandler } from './useSmoothScrollHandler';

export const SmoothScroll = ({ children }) => {
  useSmoothScrollHandler();
  return children;
};
