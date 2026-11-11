// Up-right "opens" arrow used on links and buttons. Inherits the text colour unless `color` is set.
export const ArrowIcon = ({ size = 14, color = 'currentColor', className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
