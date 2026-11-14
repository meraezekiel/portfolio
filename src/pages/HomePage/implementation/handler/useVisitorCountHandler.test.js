import { renderHook, waitFor } from '@testing-library/react';
import { useVisitorCountHandler, VISITOR_ID_KEY } from './useVisitorCountHandler';

const CONFIG = { url: 'https://demo.supabase.co', key: 'public-anon-key' };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

let fetchMock;
beforeEach(() => {
  window.localStorage.clear();
  fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => 128 });
  global.fetch = fetchMock;
});
afterEach(() => { delete global.fetch; });

const sentId = (call) => JSON.parse(fetchMock.mock.calls[call][1].body).p_visitor;

test('records the visit and returns the unique count', async () => {
  const { result } = renderHook(() => useVisitorCountHandler(CONFIG));
  await waitFor(() => expect(result.current).toBe(128));
  const [url, init] = fetchMock.mock.calls[0];
  expect(url).toBe('https://demo.supabase.co/rest/v1/rpc/portfolio_visit');
  expect(init.method).toBe('POST');
  expect(init.headers.apikey).toBe('public-anon-key');
  expect(sentId(0)).toMatch(UUID);
});

test('the same browser always sends the same id, so it is counted once', async () => {
  const first = renderHook(() => useVisitorCountHandler(CONFIG));
  await waitFor(() => expect(first.result.current).toBe(128));
  const second = renderHook(() => useVisitorCountHandler(CONFIG));
  await waitFor(() => expect(second.result.current).toBe(128));
  expect(sentId(1)).toBe(sentId(0));
  expect(window.localStorage.getItem(VISITOR_ID_KEY)).toBe(sentId(0));
});

test('without Supabase settings it does nothing', () => {
  const { result } = renderHook(() => useVisitorCountHandler({ url: '', key: '' }));
  expect(result.current).toBeNull();
  expect(fetchMock).not.toHaveBeenCalled();
});

test('a failed request leaves the count empty instead of breaking the page', async () => {
  fetchMock.mockRejectedValue(new Error('offline'));
  const { result } = renderHook(() => useVisitorCountHandler(CONFIG));
  await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  expect(result.current).toBeNull();
});
