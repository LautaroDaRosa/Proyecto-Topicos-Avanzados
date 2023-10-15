import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import StProviders from './StProviders';
import Providers from '../Providers';

const ProvidersPage = () => (
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
        <Providers />
      </div>
    </PageContainer>
  </StProviders>
);
export default ProvidersPage;
