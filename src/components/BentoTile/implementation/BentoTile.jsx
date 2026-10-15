import { forwardRef } from 'react';
import { useBentoTileHandler } from './useBentoTileHandler';
import './BentoTile.scss';

export const BentoTile = forwardRef(({
  as: Element = 'div', accent = false, glow = false, className = '', onMouseMove, children, ...rest
}, ref) => {
  const { handleMouseMove } = useBentoTileHandler(onMouseMove);
  const classes = [
    'bento-tile',
    accent && 'bento-tile--accent',
    glow && 'bento-tile--glow',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Element ref={ref} className={classes} onMouseMove={handleMouseMove} {...rest}>
      {children}
    </Element>
  );
});

BentoTile.displayName = 'BentoTile';
