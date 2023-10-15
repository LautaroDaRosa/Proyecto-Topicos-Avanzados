import React, { useState } from 'react';
import StProviders from './StProviders';
import FilterBar from 'app/components/FilterBar';
import ProvidersGrid from 'app/components/ProvidersGrid';
/* import { useDispatch, useSelector } from 'react-redux';
import { getProvidersSelector } from 'store/providers/selectors';
import { ProvidersSlice } from 'store/providers/slice'; */
import { Provider } from 'store/providers/types';

const Providers = () => {
  const mockedProviders: Provider[] = [
    {
      name: 'Canal 10',
      businessName: 'CANAL 10 S.A.',
      rut: '734879753738964',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Canal_10_Uruguay_Logo_1960.webp/640px-Canal_10_Uruguay_Logo_1960.webp.png',
      address: 'Lorenzo Carnelli 1234',
      id: 1,
      score: 9,
      categories: ['Comunicaciones, Publicidad'],
    },
    {
      name: 'Canal 4',
      businessName: 'CANAL 4 S.A.',
      rut: '633334234363643',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Canal4_uy.png',
      address: 'Paraguay, 2253, Montevideo, Uruguay',
      id: 2,
      score: 6,
      categories: ['Comunicaciones, Publicidad'],
    },
    {
      name: 'Teledoce',
      businessName: 'TELEDOCE S.A.',
      rut: '3457385937529',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Teledoce_2022.png',
      address: 'Enriqueta Compte y Riqué 1276',
      id: 3,
      score: 7,
      categories: ['Comunicaciones, Publicidad'],
    },
    {
      name: 'Banco Santander del Uruguay',
      businessName: 'SANTANDER S.A.',
      rut: '5765384337675',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Banco_santander_logo.svg/2560px-Banco_santander_logo.svg.png',
      address: '18 de Julio 1321',
      id: 4,
      score: 9,
      categories: ['Servicios Financieros y Afines'],
    },
  ];
  /* const allProviders: Provider[] = useSelector(getProvidersSelector); */
  const [filteredProviders, setFilteredProviders] = useState(mockedProviders);
  /* const { actions } = ProvidersSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchProviders());
  }, [dispatch, actions]); */

  console.log(mockedProviders);

  const handleSearch = (
    name: string,
    businessName: string,
    rut: string,
    score: string,
    category: string,
  ) => {
    const filterFn = p => {
      return (
        (name === '' || p.name.toLowerCase().includes(name.toLowerCase())) &&
        (businessName === '' ||
          p.businessName.toLowerCase().includes(businessName.toLowerCase())) &&
        (rut === '' || p.rut === rut) &&
        (score === '' || p.score === parseInt(score)) &&
        (category === '' || p.categories.includes(category))
      );
    };

    setFilteredProviders(mockedProviders.filter(filterFn));
  };

  const handleClearFilters = () => {
    setFilteredProviders(mockedProviders);
  };
  return (
    <StProviders>
      <FilterBar onSearch={handleSearch} clearFilters={handleClearFilters} />
      {filteredProviders.length ? (
        <ProvidersGrid providers={filteredProviders} />
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
