import { MinimalProvider } from 'store/providers/types';
import StProviderGridCard from './StProviderGridCard';
import StProvidersGrid from './StProvidersGrid';
import Button from '../Button';
import StInfoContainer from './StInfoContainer';
import { useNavigate } from 'react-router-dom';

interface Providers {
  providers: MinimalProvider[];
}

const ProvidersGrid = ({ providers }: Providers) => {
  const navigate = useNavigate();

  return (
    <StProvidersGrid>
      {providers.map(provider => (
        <StProviderGridCard key={provider.userId}>
          <h3>{provider.name}</h3>
          <img src={provider.logo} alt={`${provider.name} Logo`} />
          <StInfoContainer>
            <span>Score: {provider.averageScore}</span>
            <span>Razon Social: {provider.businessName}</span>
            <span>RUT: {provider.rut}</span>
            <Button
              text="Ver perfil de proveedor"
              action="primary"
              onClick={() => navigate(`/provider/${provider.userId}`)}
            />
          </StInfoContainer>
        </StProviderGridCard>
      ))}
    </StProvidersGrid>
  );
};

export default ProvidersGrid;
