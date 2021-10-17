import React from 'react';
import { render, screen } from './util/test-utils';
import App from './App';

test('Renders "add stock" button', () => {
  render(<App />);
  expect(screen.getByText(/add stock/i)).toBeInTheDocument();
});
