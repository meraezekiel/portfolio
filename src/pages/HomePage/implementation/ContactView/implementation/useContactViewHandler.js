import {
  useCallback, useEffect, useRef, useState,
} from 'react';

const COPIED_FOR_MS = 2000;

const legacyCopy = (text) => {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
  document.body.appendChild(field);
  field.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
  }
};

export const useContactViewHandler = (email) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // No clipboard API (old browser, in-app browsers like Messenger, permission denied):
      // fall back to the older copy command before giving up.
      if (!legacyCopy(email)) return;
    }
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), COPIED_FOR_MS);
  }, [email]);

  return { copied, copyEmail };
};
