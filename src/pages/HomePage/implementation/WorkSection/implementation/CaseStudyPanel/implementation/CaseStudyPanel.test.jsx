import { render, screen, fireEvent } from '@testing-library/react';
import { CaseStudyPanel } from './CaseStudyPanel';

const project = {
  slug: 'qr',
  title: 'QR Code Generator',
  pitch: 'Pitch text',
  problem: 'Problem text',
  built: 'Built text',
  features: ['Live preview', 'Download'],
  tags: ['React'],
  link: 'https://example.com',
  images: ['cover.png', 'two.png'],
};

test('shows the case study when open', () => {
  render(<CaseStudyPanel project={project} open onClose={() => {}} />);
  expect(screen.getByRole('dialog', { name: 'QR Code Generator' })).toBeInTheDocument();
  expect(screen.getByText('Live preview')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /visit live site/i })).toHaveAttribute('href', 'https://example.com');
});

test('lets the panel scroll while the page is locked', () => {
  render(<CaseStudyPanel project={project} open onClose={() => {}} />);
  expect(screen.getByRole('dialog')).toHaveAttribute('data-lenis-prevent');
});

test('Escape and backdrop close it', () => {
  const onClose = jest.fn();
  render(<CaseStudyPanel project={project} open onClose={onClose} />);
  fireEvent.keyDown(document, { key: 'Escape' });
  fireEvent.click(screen.getByTestId('case-study-backdrop'));
  expect(onClose).toHaveBeenCalledTimes(2);
});

test('Escape does nothing while closed', () => {
  const onClose = jest.fn();
  render(<CaseStudyPanel project={project} open={false} onClose={onClose} />);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).not.toHaveBeenCalled();
});

test('thumbnails switch the main screenshot', () => {
  render(<CaseStudyPanel project={project} open onClose={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: 'Show screenshot 2' }));
  expect(screen.getByRole('img', { name: 'QR Code Generator screenshot 2' })).toHaveAttribute('src', '/projects/qr/two.png');
});

test('Tab from the last control wraps back to the close button', () => {
  render(<CaseStudyPanel project={project} open onClose={() => {}} />);
  const link = screen.getByRole('link', { name: /visit live site/i });
  link.focus();
  fireEvent.keyDown(document, { key: 'Tab' });
  expect(screen.getByRole('button', { name: 'Close case study' })).toHaveFocus();
});

test('Shift+Tab from the close button wraps to the last control', () => {
  render(<CaseStudyPanel project={project} open onClose={() => {}} />);
  expect(screen.getByRole('button', { name: 'Close case study' })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
  expect(screen.getByRole('link', { name: /visit live site/i })).toHaveFocus();
});

test('renders nothing without a project', () => {
  render(<CaseStudyPanel project={null} open={false} onClose={() => {}} />);
  expect(screen.queryByRole('dialog', { hidden: true })).toBeNull();
});
