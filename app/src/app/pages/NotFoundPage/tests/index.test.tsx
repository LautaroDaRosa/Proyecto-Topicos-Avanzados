import React from 'react';
import { NotFoundPage } from '..';
import render from 'utils/render';
import { screen } from '@testing-library/react';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toMatchSnapshot();

    screen.getByText('Page not found.');
    screen.getByRole('link', { name: 'Return to Home Page' });
  });
});
