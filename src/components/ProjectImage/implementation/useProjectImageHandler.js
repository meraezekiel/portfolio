import { useCallback, useEffect, useState } from 'react';

export const useProjectImageHandler = (slug, file) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [slug, file]);

  const handleError = useCallback(() => setFailed(true), []);

  return { failed, handleError };
};
