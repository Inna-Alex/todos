import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/utils-for-tests';
import App from '../components/App/App';

describe("App.js component", () => {
  test('renders header in <App />', () => {
    renderWithProviders(<App />);
    const headerElement = screen.getByText(/todo list/i);
    const addButton = screen.getByText(/add task/i);
    expect(headerElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
});