import StRegisterPage from './StRegisterPage';
import { useParams } from 'react-router-dom';
import tokenService from 'utils/tokenService';
import currentUser from 'utils/currentUser';
import RegisterModal from 'app/components/Modals/RegisterModal';
import deresLogo from '../../../resources/deres-logo.png';
import { useEffect, useState } from 'react';
import { getInvitation } from 'store/invitation/api';
import { Invitation } from 'store/invitation/types';
import { NotFoundPage } from '../NotFoundPage';

const RegisterPage = () => {
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
      {!loading && !error && (
        <StRegisterPage>
          <img src={deresLogo} alt="DERES Logo" />
          <RegisterModal
            token={token}
            email={invitation?.receiverUserEmail}
            role={invitation?.receiverUserRole}
          />
        </StRegisterPage>
      )}
    </>
  );
};

export default RegisterPage;
