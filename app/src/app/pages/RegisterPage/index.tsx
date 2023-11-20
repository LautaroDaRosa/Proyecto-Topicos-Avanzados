import StRegisterPage from './StRegisterPage';
import { useParams } from 'react-router-dom';
import tokenService from 'utils/tokenService';
import currentUser from 'utils/currentUser';
import RegisterModal from 'app/components/Modals/RegisterModal';
import deresLogo from '../../../resources/deres-logo.png';

const RegisterPage = () => {
  const { token } = useParams();
  tokenService.removeLocalTokens();
  currentUser.remove();
  // En el useEffect obtener los datos del registro.
  return (
    <StRegisterPage>
      <img src={deresLogo} alt="DERES Logo" />
      <RegisterModal token={token} />
    </StRegisterPage>
  );
};

export default RegisterPage;
