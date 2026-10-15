import { useCallback, useEffect, useRef, useState } from 'react';

const HASH_PREFIX = '#work/';

const readSlugFromHash = (projects) => {
  const { hash } = window.location;
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const slug = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  return projects.some((project) => project.slug === slug) ? slug : null;
};

export const useCaseStudyRouteHandler = (projects) => {
  const [activeSlug, setActiveSlug] = useState(() => readSlugFromHash(projects));
  const pushedRef = useRef(false);

  useEffect(() => {
    // Arriving at a #work/<slug> entry by navigation (a link click, or Forward) means the page
    // without the panel is the previous entry, so closing should go Back to it.
    const handlePopState = () => {
      const slug = readSlugFromHash(projects);
      pushedRef.current = Boolean(slug);
      setActiveSlug(slug);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projects]);

  const openProject = useCallback((slug) => {
    window.history.pushState(null, '', `${HASH_PREFIX}${slug}`);
    pushedRef.current = true;
    setActiveSlug(slug);
  }, []);

  const closeProject = useCallback(() => {
    if (pushedRef.current) {
      // Clear first: a second close before popstate arrives must not go back again (off the site).
      pushedRef.current = false;
      window.history.back();
      return;
    }
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setActiveSlug(null);
  }, []);

  return { activeSlug, openProject, closeProject };
};
