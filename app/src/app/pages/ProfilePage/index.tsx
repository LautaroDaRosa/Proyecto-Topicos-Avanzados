import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import StProfile from './StProfile';
import StPageContent from 'app/components/StPageContent/StPageContent';
import UserProfile from '../../components/UserProfile';
import { isPartner, isProvider, roleMapper } from 'utils/roleMapper';
import UserInfo from 'app/components/UserInfo';
import ProviderScores from 'app/components/ProviderScores';
import Button from 'app/components/Button';
import StButtonContainer from './StButtonContainer';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getProvider } from 'store/providers/api';
import { Profile } from 'types';
import { getMyProfile } from 'store/auth/api';
import AnswerFormModal from 'app/components/Modals/AnswerFormModal';
import CategoriesModal from 'app/components/Modals/components/CategoriesModal';
import { RingLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#fca408',
};

interface ProfileProperties {
  itsOwnProfile: boolean;
}

const ProfilePage = ({ itsOwnProfile }: ProfileProperties) => {
  const { id } = useParams();
  const [user, setUser] = useState<Profile>();
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  const fetchProvider = useCallback(async () => {
    const response = id ? await getProvider(id) : await getMyProfile();
    setUser(response);

    setLoadingProfile(false);
  }, [id]);

  useEffect(() => {
    fetchProvider();
  }, [fetchProvider, id]);

  return (
    <StProfile>
      <Navbar />
      <PageContainer>
        {(isPartner() || isProvider()) && (
          <AnswerFormModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            fetchProvider={fetchProvider}
          />
        )}
        {user && isProvider() && itsOwnProfile && (
          <CategoriesModal
            preselectedCategories={user.categories || []}
            isOpen={isCategoriesModalOpen}
            setIsOpen={setIsCategoriesModalOpen}
            fetchProfile={fetchProvider}
          />
        )}
        {loadingProfile && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100%',
            }}
          >
            <RingLoader css={override} size={50} color={'#fca408'} />
          </div>
        )}
        {!loadingProfile && user && (
          <StPageContent>
            <Title text="Perfil de usuario" />
            <UserProfile
              logo={user.logo || ''}
              name={user.username || ''}
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
                  setIsCategoriesModalOpen={setIsCategoriesModalOpen}
                  itsOwnProfile={itsOwnProfile}
                />
              </>
            )}
            {['PROVIDER', 'PARTNER'].includes(user.role) && user.score && (
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
            {itsOwnProfile && (isProvider() || isPartner()) && (
              <StButtonContainer>
                <Button
                  action="secondary"
                  text="Formulario"
                  onClick={() => setIsModalOpen(true)}
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
