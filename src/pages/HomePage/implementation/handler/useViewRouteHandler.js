import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { NAV_LINKS } from '../../../../constants/portfolio';
import { getLenis } from '../../../../components/SmoothScroll/implementation/lenisInstance';

export const HOME_VIEW = 'hero';
const VIEW_IDS = NAV_LINKS.map(({ id }) => id);

// '#services' -> 'services'. A deeper hash such as '#work/<slug>' is a case study opening
// on top of whatever view is showing, so it keeps `current`.
const readView = (current) => {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (id.includes('/')) return current;
  return VIEW_IDS.includes(id) ? id : HOME_VIEW;
};

// Scroll to where the content starts: the page top on desktop, below the stacked sidebar on phones.
const scrollToContent = (contentRef) => {
  const content = contentRef?.current;
  const top = content ? Math.max(0, content.getBoundingClientRect().top + window.scrollY) : 0;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(top, { immediate: true });
  else window.scrollTo(0, top);
};

export const useViewRouteHandler = (contentRef) => {
  const [view, setView] = useState(() => readView(HOME_VIEW));
  const firstRender = useRef(true);

  useEffect(() => {
    const handlePopState = () => setView((current) => readView(current));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToContent(contentRef);
  }, [view, contentRef]);

  const showView = useCallback((id) => {
    if (id === view) return;
    const { pathname, search } = window.location;
    window.history.pushState(null, '', id === HOME_VIEW ? `${pathname}${search}` : `#${id}`);
    setView(id);
  }, [view]);

  return { view, showView };
};
