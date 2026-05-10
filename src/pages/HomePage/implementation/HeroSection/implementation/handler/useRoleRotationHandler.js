import { useEffect, useState } from 'react';

export const useRoleRotationHandler = (roles, intervalMs) => {
  const [index, setIndex] = useState(0);
  const [glitchKey, setGlitchKey] = useState(0);

  useEffect(() => {
    if (!roles || roles.length <= 1) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
      setGlitchKey((k) => k + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [roles, intervalMs]);

  return { currentRole: roles?.[index] ?? '', glitchKey };
};
