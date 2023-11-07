import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import StProviders from './StProviders';
import Providers from '../Providers';
import { useEffect, useState } from 'react';
import { getCategories } from 'store/providers/api';
import StPageContent from 'app/components/StPageContent/StPageContent';

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
        <StPageContent>
          <Title text="Proveedores asociados" />
          <Providers categories={categories} />
        </StPageContent>
      </PageContainer>
    </StProviders>
  );
};
export default ProvidersPage;
