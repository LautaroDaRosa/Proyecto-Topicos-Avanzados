import { Provider } from 'store/providers/types';
import StProviderGridCard from './StProviderGridCard';
import StProvidersGrid from './StProvidersGrid';
import Button from '../Button';
import StInfoContainer from './StInfoContainer';

interface Providers {
  providers: Provider[];
}

const ProvidersGrid = ({ providers }: Providers) => {
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
              disabled={true}
              text="Ver perfil de proveedor"
              action="primary"
            />
          </StInfoContainer>
        </StProviderGridCard>
      ))}
    </StProvidersGrid>
  );
};

export default ProvidersGrid;
