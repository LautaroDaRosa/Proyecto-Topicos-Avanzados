import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import FilterBar from '..';

describe('Filter Bar', () => {
  it('should match snapshot', () => {
    let x = 0;
    const handleSearch = (
      name: string,
      businessName: string,
      rut: string,
      score: string,
      category: string,
    ) => {
      x++;
    };

    const clearFilters = () => {
      x++;
    };
    const filterBar = render(
      <FilterBar
        clearFilters={clearFilters}
        onSearch={handleSearch}
        categories={['Cat 1', 'Cat 2']}
      />,
    );
    expect(filterBar).toMatchSnapshot();
    expect(x === 0);
  });
  it('should call the clearFilters function when the clear button is pressed.', () => {
    let x = 0;
    const handleSearch = (
      name: string,
      businessName: string,
      rut: string,
      score: string,
      category: string,
    ) => {
      x = 2;
    };

    const clearFilters = () => {
      x = 1;
    };
    const filterBar = render(
      <FilterBar
        clearFilters={clearFilters}
        onSearch={handleSearch}
        categories={['Cat 1', 'Cat 2']}
      />,
    );

    const buttonClear = filterBar.getByText('Limpiar');
    expect(x === 0);
    fireEvent.click(buttonClear);
    expect(x === 1);
  });

  it('should disable the search button if the user does not write anything', () => {
    let x = 0;
    const handleSearch = (
      name: string,
      businessName: string,
      rut: string,
      score: string,
      category: string,
    ) => {
      x = 2;
    };

    const clearFilters = () => {
      x = 1;
    };
    const filterBar = render(
      <FilterBar
        clearFilters={clearFilters}
        onSearch={handleSearch}
        categories={['Cat 1', 'Cat 2']}
      />,
    );

    const buttonSearch = filterBar.getByText('Buscar');
    expect(buttonSearch).toBeDisabled();
    expect(x === 0);
  });
  it('should enable the search button and call handleSearch if the user writes something in one input', () => {
    let x = 0;
    const handleSearch = (
      name: string,
      businessName: string,
      rut: string,
      score: string,
      category: string,
    ) => {
      x = 2;
    };

    const clearFilters = () => {
      x = 1;
    };
    const filterBar = render(
      <FilterBar
        clearFilters={clearFilters}
        onSearch={handleSearch}
        categories={['Cat 1', 'Cat 2']}
      />,
    );

    const buttonSearch = filterBar.getByText('Buscar');
    expect(buttonSearch).toBeDisabled();
    expect(x === 0);

    const nameInput = filterBar.getByPlaceholderText('Nombre');
    fireEvent.change(nameInput, { target: { value: 'Canal' } });
    expect(buttonSearch).not.toBeDisabled();
    expect(x === 2);
  });
});
