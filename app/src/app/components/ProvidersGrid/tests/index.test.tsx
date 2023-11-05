import * as React from 'react';
import { render } from '@testing-library/react';

import ProvidersGrid from '..';
import { MinimalProvider } from 'store/providers/types';
import { MemoryRouter } from 'react-router-dom';

const mockedProviders: MinimalProvider[] = [
  {
    name: 'Canal 10',
    businessName: 'CANAL 10 S.A.',
    rut: '734879753738964',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Canal_10_Uruguay_Logo_1960.webp/640px-Canal_10_Uruguay_Logo_1960.webp.png',
    userId: 1,
    averageScore: 9,
  },
  {
    name: 'Canal 4',
    businessName: 'CANAL 4 S.A.',
    rut: '633334234363643',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Canal4_uy.png',
    userId: 2,
    averageScore: 6,
  },
];

describe('Filter Bar', () => {
  it('should match snapshot', () => {
    const providersGrid = render(
      <MemoryRouter>
        <ProvidersGrid providers={mockedProviders} />
      </MemoryRouter>,
    );
    expect(providersGrid).toMatchSnapshot();
  });
  it('should show all the providers information', () => {
    const providersGrid = render(
      <MemoryRouter>
        <ProvidersGrid providers={mockedProviders} />
      </MemoryRouter>,
    );
    providersGrid.getByText('Canal 10');
    providersGrid.getByText('Razon Social: CANAL 10 S.A.');
    providersGrid.getByText('RUT: 734879753738964');
    providersGrid.getByText('Score: 9');

    providersGrid.getByText('Canal 4');
    providersGrid.getByText('Razon Social: CANAL 4 S.A.');
    providersGrid.getByText('RUT: 633334234363643');
    providersGrid.getByText('Score: 6');
  });
});
