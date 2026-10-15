import { useEffect, useRef, useState } from 'react';
import { useScrollLockHandler } from './handler/useScrollLockHandler';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const useCaseStudyPanelHandler = ({ open, onClose }) => {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);

  useScrollLockHandler(open);

  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    setActiveImage(0);
    closeButtonRef.current?.focus({ preventScroll: true });

    // Keep Tab inside the dialog so focus never lands on the page (or the pinned gallery) behind it.
    const trapTab = (e) => {
      const focusable = panelRef.current ? [...panelRef.current.querySelectorAll(FOCUSABLE)] : [];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const inside = panelRef.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'Tab') trapTab(e);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  return { panelRef, closeButtonRef, activeImage, setActiveImage };
};
