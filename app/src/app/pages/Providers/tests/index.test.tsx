import * as React from 'react';
import { render } from '@testing-library/react';

import Providers from '..';

describe('Providers', () => {
  it('should match snapshot', () => {
    const providers = render(<Providers categories={['Cat1']} />);
    expect(providers).toMatchSnapshot();
  });
});
