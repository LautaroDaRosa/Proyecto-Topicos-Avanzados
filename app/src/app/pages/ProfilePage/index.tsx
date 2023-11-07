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
  const [user, setUser] = useState<Profile>();

  const [isModalOpenned, setIsModalOpenned] = useState(false);

  useEffect(() => {
    async function fetchProvider() {
      const response = id ? await getProvider(id) : await getMyProfile();
      setUser(response);
    }
    fetchProvider();
  }, [id]);

  return (
    <StProfile>
      <Navbar />
      <PageContainer>
        <AnswerFormModal
          isOpenned={isModalOpenned}
          setIsOpenned={setIsModalOpenned}
        />
        {user !== undefined && (
          <StPageContent>
            <Title text="Perfil de usuario" />
            <UserProfile
              logo={user.logo || ''}
              name={user.name || ''}
              role={user.role || ''}
              telephone={user.phone}
              description={user.info}
              email={user.email}
            />
            {['PROVIDER', 'PARTNER'].includes(user.role) && (
              <>
                <Title text={`Información de ${roleMapper[user.role]}`} />
                <UserInfo
                  businessName={user.businessName || ''}
                  rut={user.rut || ''}
                  contact={user.contact || ''}
                  address={user.address || ''}
                  categories={user.categories || []}
                />
              </>
            )}
            {user.role === 'PROVIDER' && user.score && (
              <>
                <Title text={'Resumen de scores'} />
                <ProviderScores
                  socialScore={user.score.social}
                  environmentalScore={user.score.environmental}
                  governanceScore={user.score.governance}
                  averageScore={user.score.average}
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
        )}
      </PageContainer>
    </StProfile>
  );
};
export default ProfilePage;
