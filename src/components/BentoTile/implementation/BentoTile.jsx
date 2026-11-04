import { forwardRef } from 'react';
import './BentoTile.scss';

export const BentoTile = forwardRef(({
  as: Element = 'div', wide = false, className = '', children, ...rest
}, ref) => {
  const classes = ['bento-tile', wide && 'bento-tile--wide', className].filter(Boolean).join(' ');

  return (
    <Element ref={ref} className={classes} {...rest}>
      {children}
    </Element>
  );
});

BentoTile.displayName = 'BentoTile';
