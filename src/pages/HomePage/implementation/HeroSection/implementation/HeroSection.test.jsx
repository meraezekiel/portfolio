import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from './HeroSection';
import { ViewContext } from '../../../../../components/ViewLink';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';

test('shows the headline', () => {
  render(<HeroSection />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ship it clean. Keep it fast.');
});

// A mailto: link does nothing on a device with no mail app, so the button opens the
// Contact view, which shows the address with a Copy button.
test('Get in touch opens the contact view', () => {
  const showView = jest.fn();
  render(
    <ViewContext.Provider value={{ view: 'hero', showView }}>
      <HeroSection />
    </ViewContext.Provider>,
  );
  const cta = screen.getByRole('link', { name: /get in touch/i });
  expect(cta).toHaveAttribute('href', '#contact');
  fireEvent.click(cta);
  expect(showView).toHaveBeenCalledWith('contact');
});

test('offers the resume as a PDF download', () => {
  render(<HeroSection />);
  const resume = screen.getByRole('link', { name: /resume/i });
  expect(resume).toHaveAttribute('href', PORTFOLIO_CONFIG.resume);
  expect(resume).toHaveAttribute('download');
});
