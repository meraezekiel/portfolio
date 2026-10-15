import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { gsap } from 'gsap';

const COPIED_MS = 2000;
const openUrl = (url) => window.location.assign(url);

export const useContactSectionHandler = ({ email, navigate = openUrl } = {}) => {
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.bento-section__heading, .bento-tile', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 85%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Copy the address; if the clipboard is unavailable or blocked, open the email app instead.
  const copyEmail = useCallback(async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      navigate(`mailto:${email}`);
    }
  }, [email, navigate]);

  return { sectionRef, copied, copyEmail };
};
