import { createContext } from 'react';

// The view on show and how to change it. Outside a page there is no `showView`,
// so links fall back to plain hash links.
export const ViewContext = createContext({ view: null, showView: null });
