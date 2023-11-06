import { fireEvent, render, screen } from '@testing-library/react';

import App from '@/App';

test('renders the initial count value', () => {
  render(<App />);
  const countElement = screen.getByText(/Count:/i);
  expect(countElement).toBeInTheDocument();
  const initialCount = screen.getByText(/0/);
  expect(initialCount).toBeInTheDocument();
});

test('increments the count when the button is clicked', () => {
  render(<App />);
  const button = screen.getByText('click');
  const countElement = screen.getByText(/Count:/i);

  fireEvent.click(button);
  const updatedCount = screen.getByText(/1/);

  expect(countElement).toBeInTheDocument();
  expect(updatedCount).toBeInTheDocument();
});

test('renders "Hello World" in h1', () => {
  render(<App />);
  const h1Element = screen.getByText('Hello World');
  expect(h1Element).toBeInTheDocument();
});
