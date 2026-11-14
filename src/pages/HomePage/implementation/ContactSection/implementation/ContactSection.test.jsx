import { render, screen, fireEvent, act } from '@testing-library/react';
import { ContactSection } from './ContactSection';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';

const originalClipboard = navigator.clipboard;
afterEach(() => {
  Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
});

// A mailto: link does nothing on a device with no mail app, so tapping also copies the address.
test('tapping the email copies it and says so', async () => {
  const writeText = jest.fn().mockResolvedValue();
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  render(<ContactSection />);
  const email = screen.getByRole('link', { name: new RegExp(PORTFOLIO_CONFIG.email) });
  expect(email).toHaveAttribute('href', `mailto:${PORTFOLIO_CONFIG.email}`);
  await act(async () => { fireEvent.click(email); });
  expect(writeText).toHaveBeenCalledWith(PORTFOLIO_CONFIG.email);
  expect(screen.getByText('Email copied')).toBeInTheDocument();
});
