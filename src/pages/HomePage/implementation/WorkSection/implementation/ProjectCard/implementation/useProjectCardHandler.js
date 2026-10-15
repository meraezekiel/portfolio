import { useCallback } from 'react';

export const useProjectCardHandler = (slug, onOpen) => {
  const handleOpen = useCallback(() => onOpen(slug), [slug, onOpen]);
  return { handleOpen };
};
