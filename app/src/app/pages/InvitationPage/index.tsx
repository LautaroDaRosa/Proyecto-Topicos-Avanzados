import InvitationModal from 'app/components/Modals/InvitationModal';
import StInvitationPage from './StInvitationPage';
import { useParams } from 'react-router-dom';
import tokenService from 'utils/tokenService';
import currentUser from 'utils/currentUser';

const InvitationPage = () => {
  const { token } = useParams();
  tokenService.removeLocalTokens();
  currentUser.remove();
  // En el useEffect obtener los datos de la invitation.
  return (
    <StInvitationPage>
      <InvitationModal token={token} />
    </StInvitationPage>
  );
};

export default InvitationPage;
