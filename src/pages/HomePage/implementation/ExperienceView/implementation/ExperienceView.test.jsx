import { render, screen } from '@testing-library/react';
import { ExperienceView } from './ExperienceView';
import { EXPERIENCE } from '../../../../../constants/portfolio';

test('lists every role with its company and dates, newest first', () => {
  render(<ExperienceView />);
  const roles = screen.getAllByRole('heading', { level: 2 });
  expect(roles.map((role) => role.textContent)).toEqual(EXPERIENCE.map(({ role }) => role));
  EXPERIENCE.forEach(({ company, period }) => {
    expect(screen.getByText(company)).toBeInTheDocument();
    expect(screen.getByText(period)).toBeInTheDocument();
  });
});

test('shows what was built in each role', () => {
  render(<ExperienceView />);
  EXPERIENCE.flatMap(({ points = [] }) => points).forEach((point) => {
    expect(screen.getByText(point)).toBeInTheDocument();
  });
});

test('marks the current role', () => {
  render(<ExperienceView />);
  const current = EXPERIENCE.filter((job) => job.current);
  expect(screen.getAllByText('Current')).toHaveLength(current.length);
});
