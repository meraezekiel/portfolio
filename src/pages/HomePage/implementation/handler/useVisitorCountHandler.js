import { useEffect, useState } from 'react';

export const VISITOR_ID_KEY = 'portfolio-visitor-id';

const newId = () => (window.crypto?.randomUUID
  ? window.crypto.randomUUID()
  : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return (c === 'x' ? r : (r % 4) + 8).toString(16);
  }));

// One random id per browser, so a visitor is counted once however often they come back.
// Private windows and blocked storage get a fresh id each time; that is the trade-off for
// not tracking anything personal.
const visitorId = () => {
  try {
    const saved = window.localStorage.getItem(VISITOR_ID_KEY);
    if (saved) return saved;
    const id = newId();
    window.localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch {
    return newId();
  }
};

// Records this visit in Supabase (see supabase/visitor-counter.sql) and returns the number
// of unique visitors, or null while loading, when not configured, or when the request fails.
export const useVisitorCountHandler = ({ url, key }) => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!url || !key) return undefined;
    let cancelled = false;
    fetch(`${url}/rest/v1/rpc/portfolio_visit`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_visitor: visitorId() }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((total) => { if (!cancelled && Number.isFinite(Number(total))) setCount(Number(total)); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [url, key]);

  return count;
};
