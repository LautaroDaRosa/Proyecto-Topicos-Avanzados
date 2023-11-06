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
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProvider } from 'store/providers/api';
import { Profile } from 'types';
import { getMyProfile } from 'store/auth/api';
import AnswerFormModal from 'app/components/Modals/AnswerFormModal';

interface ProfileProperties {
  itsOwnProfile: boolean;
}

const ProfilePage = ({ itsOwnProfile }: ProfileProperties) => {
  // Como este es el que va a repartir la informacion, tiene que hacer la request.
  // Dependiendo de si el perfil es propio o no, se hace una request con el id.
  const { id } = useParams();
  const [useR, setUser] = useState<Profile>();
  console.log(useR);

  const [isModalOpenned, setIsModalOpenned] = useState(false);

  useEffect(() => {
    async function fetchProvider() {
      const response = id ? await getProvider(id) : await getMyProfile();
      setUser(response);
    }
    fetchProvider();
  }, [id]);

  const user = {
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
        <AnswerFormModal
          isOpenned={isModalOpenned}
          setIsOpenned={setIsModalOpenned}
        />
        <StPageContent>
          <Title text="Perfil de usuario" />
          <UserProfile
            logo={user.logo}
            name={user.name}
            role={user.role}
            telephone={user.telephone}
            description={user.description}
            email={user.email}
          />
          {['PROVIDER', 'PARTNER'].includes(user.role) && (
            <>
              <Title text={`Información de ${roleMapper[user.role]}`} />
              <UserInfo
                businessName={user.businessName}
                rut={user.rut}
                contact={user.contact}
                address={user.address}
                categories={user.categories}
              />
            </>
          )}
          {user.role === 'PROVIDER' && (
            <>
              <Title text={'Resumen de scores'} />
              <ProviderScores
                socialScore={user.socialScore}
                environmentalScore={user.environmentalScore}
                governanceScore={user.governanceScore}
                averageScore={user.averageScore}
              />
            </>
          )}
          {itsOwnProfile && user.role === 'PROVIDER' && (
            <StButtonContainer>
              <Button
                action="secondary"
                text="Formulario"
                onClick={() => setIsModalOpenned(true)}
              />
            </StButtonContainer>
          )}
        </StPageContent>
      </PageContainer>
    </StProfile>
  );
};
export default ProfilePage;
