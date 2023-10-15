import * as React from 'react';

import { Link } from '../index';
import renderWithWrappers from 'utils/render';
import { screen } from '@testing-library/react';

describe('Link', () => {
  it('should render correctly', () => {
    const { container } = renderWithWrappers(
      <Link to="/test">HeaderLink</Link>,
    );
    expect(container).toMatchSnapshot();
    const link = screen.getByRole('link', { name: 'HeaderLink' });
    expect(link).toHaveAttribute('href', '/test');
  });
});
