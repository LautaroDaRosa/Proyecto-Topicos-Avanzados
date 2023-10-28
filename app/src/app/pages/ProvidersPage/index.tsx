import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import StProviders from './StProviders';
import Providers from '../Providers';
import { useEffect, useState } from 'react';
import { getCategories } from 'store/providers/api';

const ProvidersPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const result = await getCategories();
      setCategories(result);
    }
    fetchCategories();
  }, []);

  return (
    <StProviders>
      <Navbar />
      <PageContainer>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            margin: 32,
            marginTop: 0,
          }}
        >
          <Title text="Proveedores asociados" />
          <Providers categories={categories} />
        </div>
      </PageContainer>
    </StProviders>
  );
};
export default ProvidersPage;
