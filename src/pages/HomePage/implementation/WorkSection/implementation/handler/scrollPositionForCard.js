// Page scroll position at which the pinned track has moved `cardLeft` into view at the left gutter.
export const scrollPositionForCard = ({ start, end, distance, gutter, cardLeft }) => {
  if (distance <= 0) return start;
  const progress = Math.min(1, Math.max(0, (cardLeft - gutter) / distance));
  return start + progress * (end - start);
};
