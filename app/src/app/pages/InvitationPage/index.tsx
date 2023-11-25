import InvitationModal from 'app/components/Modals/InvitationModal';
import StInvitationPage from './StInvitationPage';
import { useParams } from 'react-router-dom';
import tokenService from 'utils/tokenService';
import currentUser from 'utils/currentUser';
import { useEffect, useState } from 'react';
import { getInvitation } from 'store/invitation/api';
import { Invitation } from 'store/invitation/types';
import { NotFoundPage } from '../NotFoundPage/Loadable';

const InvitationPage = () => {
  const { token } = useParams();
  const [invitation, setInvitation] = useState<Invitation>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    tokenService.removeLocalTokens();
    currentUser.remove();
    async function getInv() {
      tokenService.setLocalTokens(token, token);
      const response = await getInvitation();
      setInvitation(response);
      setLoading(false);
    }
    getInv().catch(finishFailingRequest);
  }, [token]);

  const finishFailingRequest = () => {
    setError(true);
    setLoading(false);
    tokenService.removeLocalTokens();
  };

  return (
    <>
      {error && <NotFoundPage />}
      {!error && !loading && (
        <StInvitationPage>
          <InvitationModal
            token={token}
            partnerLogo={invitation?.senderUser.logo}
            providerLogo={invitation?.receiverUser.logo}
            partnerName={invitation?.senderUser.username}
          />
        </StInvitationPage>
      )}
    </>
  );
};

export default InvitationPage;
