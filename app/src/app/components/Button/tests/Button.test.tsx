import React from 'react';
import Button from '../index';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

describe('Button', () => {
  it('renders correctly when action is primary', () => {
    const { container } = render(<Button text="hello" action="primary" />);

    expect(screen.getByText('hello')).not.toBeNull();
    expect(container.firstChild).toHaveStyleRule('background-color', 'white');
    // snapshot test
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when action is not primary', () => {
    const { container } = render(<Button text="hello" />);

    expect(screen.getByText('hello')).not.toBeNull();
    expect(container.firstChild).toHaveStyleRule('background-color', undefined);
    // snapshot test
    expect(container.firstChild).toMatchSnapshot();
  });
});
