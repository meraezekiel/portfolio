import { useContext } from 'react';
import { ViewContext } from './ViewContext';

const isPlainClick = (e) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

export const ViewLink = ({
  to, className = '', activeClassName = '', children, ...rest
}) => {
  const { view, showView } = useContext(ViewContext);
  const active = view === to;
  const classes = [className, active && activeClassName].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!showView || !isPlainClick(e)) return;
    e.preventDefault();
    showView(to);
  };

  return (
    <a
      href={`#${to}`}
      className={classes || undefined}
      aria-current={active ? 'page' : undefined}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
};
