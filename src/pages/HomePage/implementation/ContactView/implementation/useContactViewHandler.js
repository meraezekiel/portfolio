import {
  useCallback, useEffect, useRef, useState,
} from 'react';

const COPIED_FOR_MS = 2000;

export const useContactViewHandler = (email) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // No clipboard access (old browser, permission denied): the mailto link still works.
      return;
    }
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), COPIED_FOR_MS);
  }, [email]);

  return { copied, copyEmail };
};
