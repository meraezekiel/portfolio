import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { ContactView } from './ContactView';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';

const originalClipboard = navigator.clipboard;
afterEach(() => {
  Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
});

test('the email link writes to me', () => {
  render(<ContactView />);
  expect(screen.getByRole('link', { name: PORTFOLIO_CONFIG.email })).toHaveAttribute('href', `mailto:${PORTFOLIO_CONFIG.email}`);
});

test('copy puts the address on the clipboard and says so', async () => {
  const writeText = jest.fn(() => Promise.resolve());
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  render(<ContactView />);
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
  });
  expect(writeText).toHaveBeenCalledWith(PORTFOLIO_CONFIG.email);
  expect(screen.getByRole('button', { name: 'Copy email address' })).toHaveTextContent('Copied');
});

test('copy fails quietly when the clipboard is blocked', async () => {
  Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) }, configurable: true });
  render(<ContactView />);
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
  });
  expect(screen.getByRole('button', { name: 'Copy email address' })).toHaveTextContent('Copy');
});

test('lists the resume with the other links', () => {
  render(<ContactView />);
  const links = within(screen.getByRole('navigation', { name: 'Elsewhere' }));
  expect(links.getByRole('link', { name: /resume/i })).toHaveAttribute('href', PORTFOLIO_CONFIG.resume);
});

// mailto: does nothing without a mail app, so the Email link also copies the address.
test('the Email link under Elsewhere copies the address too', async () => {
  const writeText = jest.fn().mockResolvedValue();
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  render(<ContactView />);
  const links = within(screen.getByRole('navigation', { name: 'Elsewhere' }));
  await act(async () => { fireEvent.click(links.getByRole('link', { name: /^email/i })); });
  expect(writeText).toHaveBeenCalledWith(PORTFOLIO_CONFIG.email);
  expect(screen.getByRole('button', { name: 'Copy email address' })).toHaveTextContent('Copied');
});
