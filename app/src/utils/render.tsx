import React from 'react';
import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

const store = configureAppStore();

const renderWithWrappers = (content: React.ReactNode) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <HelmetProvider>{content}</HelmetProvider>
      </MemoryRouter>
      ,
    </Provider>,
  );
};

export default renderWithWrappers;
