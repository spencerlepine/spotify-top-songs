import { render, screen } from '@testing-library/react';
import App from './App';

test('renders twitter handle', () => {
  render(<App />);
  const twitterElement = screen.getByText(/@SpencerLepine/i);
  expect(twitterElement).toBeInTheDocument();
});
