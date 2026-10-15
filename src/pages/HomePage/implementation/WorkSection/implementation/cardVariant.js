// Size of each project card in the 6-column bento grid, so any number of projects leaves no gaps:
// featured = 4 cols x 2 rows, small = 2 cols, half = 3 cols, wide = 6 cols.
export const cardVariant = (index, total) => {
  if (total === 1) return 'wide';
  if (total === 2) return 'half';
  if (index === 0) return 'featured';
  if (index <= 2) return 'small';

  // After the featured block, cards fill rows of three; a short last row stretches to fit.
  const rest = total - 3;
  const lastRowSize = rest % 3;
  const isInLastRow = index - 3 >= rest - lastRowSize;
  if (isInLastRow && lastRowSize === 1) return 'wide';
  if (isInLastRow && lastRowSize === 2) return 'half';
  return 'small';
};
