import React, { useEffect, useState } from 'react';
import StProviders from './StProviders';
import FilterBar from 'app/components/FilterBar';
import ProvidersGrid from 'app/components/ProvidersGrid';
import { filterProviders, getProviders } from 'store/providers/api';
import { MinimalProvider, SearchProps } from 'store/providers/types';
import Button from 'app/components/Button';

interface ProviderProps {
  categories: string[];
}

const Providers = ({ categories }: ProviderProps) => {
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);
  const [providers, setProviders] = useState<MinimalProvider[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchProps, setSearchProps] = useState<SearchProps>({
    name: '',
    businessName: '',
    rut: '',
    score: '',
    category: '',
  });

  useEffect(() => {
    async function fetchProviders() {
      const result = !isFiltering
        ? await getProviders(currentPage, pageSize)
        : await filterProviders(currentPage, pageSize, searchProps);
      setIsFirst(result.first);
      setIsLast(result.last);
      setProviders(result.content);
    }
    fetchProviders();
  }, [pageSize, currentPage, isFiltering, searchProps]);

  const handleClearFilters = () => {
    setIsFiltering(false);
    setCurrentPage(0);
  };

  const handleSearch = (
    name: string,
    businessName: string,
    rut: string,
    score: string,
    category: string,
  ) => {
    setSearchProps({
      name: name,
      businessName: businessName,
      rut: rut,
      score: score,
      category: category,
    });
    setIsFiltering(true);
    setCurrentPage(0);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <StProviders>
      <div style={{ width: '100%' }}>
        <FilterBar
          onSearch={handleSearch}
          clearFilters={handleClearFilters}
          categories={categories}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Button
            text="Anterior"
            action="link"
            disabled={isFirst}
            onClick={previousPage}
          />
          <Button
            text="Siguiente"
            action="link"
            disabled={isLast}
            onClick={nextPage}
          />
        </div>
      </div>
      {providers.length ? (
        <ProvidersGrid providers={providers} />
      ) : (
        <span>
          No se han encontrado proveedores para los filtros de búsqueda
          aplicados.
        </span>
      )}
    </StProviders>
  );
};

export default Providers;
