import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import StProfile from './StProfile';
import StPageContent from 'app/components/StPageContent/StPageContent';
import UserProfile from '../../components/UserProfile';
import { roleMapper } from 'utils/roleMapper';
import UserInfo from 'app/components/UserInfo';
import ProviderScores from 'app/components/ProviderScores';
import Button from 'app/components/Button';
import StButtonContainer from './StButtonContainer';

interface ProfileProperties {
  itsOwnProfile: boolean;
}

const ProfilePage = ({ itsOwnProfile }: ProfileProperties) => {
  // Como este es el que va a repartir la informacion, tiene que hacer la request.
  const mockedProvider = {
    name: 'Canal 4',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Canal4_uy.png',
    email: 'canal4@gmail.com',
    role: 'PROVIDER',
    telephone: '094773063',
    description:
      'Canal 4 es un canal de televisión abierta uruguayo que transmite desde la localidad de La Aguada en Montevideo. Su programación es generalista, para todos los públicos. Inició sus transmisiones el 23 de abril de 1961, siendo el segundo canal más antiguo del país, y el octavo en toda Latinoamérica.',
    businessName: 'MONTE CARLO TV SA',
    rut: '633334234363643',
    contact: 'canal4@canal4.com.uy',
    address: 'Paraguay 2253. Montevideo',
    categories: [
      'Comunicaciones, Publicidad',
      'Entretenimiento, Deporte y Cultura',
      'Telecomunicaciones y Datos',
    ],
    socialScore: 4,
    environmentalScore: 8,
    governanceScore: 10,
    averageScore: 7,
  };
  return (
    <StProfile>
      <Navbar />
      <PageContainer>
        <StPageContent>
          <Title text="Perfil de usuario" />
          <UserProfile
            logo={mockedProvider.logo}
            name={mockedProvider.name}
            role={mockedProvider.role}
            telephone={mockedProvider.telephone}
            description={mockedProvider.description}
            email={mockedProvider.email}
          />
          {['PROVIDER', 'PARTNER'].includes(mockedProvider.role) && (
            <>
              <Title
                text={`Información de ${roleMapper[mockedProvider.role]}`}
              />
              <UserInfo
                businessName={mockedProvider.businessName}
                rut={mockedProvider.rut}
                contact={mockedProvider.contact}
                address={mockedProvider.address}
                categories={mockedProvider.categories}
              />
            </>
          )}
          {mockedProvider.role === 'PROVIDER' && (
            <>
              <Title text={'Resumen de scores'} />
              <ProviderScores
                socialScore={mockedProvider.socialScore}
                environmentalScore={mockedProvider.environmentalScore}
                governanceScore={mockedProvider.governanceScore}
                averageScore={mockedProvider.averageScore}
              />
            </>
          )}
          {itsOwnProfile && (
            <StButtonContainer>
              <Button
                action="secondary"
                text="Editar perfil"
                onClick={() => alert('click')}
              />
            </StButtonContainer>
          )}
        </StPageContent>
      </PageContainer>
    </StProfile>
  );
};
export default ProfilePage;
