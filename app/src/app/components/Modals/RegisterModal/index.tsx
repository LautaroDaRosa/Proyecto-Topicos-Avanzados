import FlexColumn from './styles/FlexColumn';
import { useState } from 'react';
import Button from 'app/components/Button';
import { CircleCheckIcon } from 'resources/icons/circle-check-icon';
// import tokenService from 'utils/tokenService';
import Title from 'app/components/Title';
import { useNavigate } from 'react-router-dom';
import CredentialsStep from './CredentialsStep';
import GoBackContainer from './styles/GoBackContainer';
import { GoBackIcon } from 'resources/icons/go-back-icon';
import { COLORS } from 'utils/colors';
import StStepsModal from './styles/StStepsModal';
import RegisterContent from './styles/RegisterContent';
import GeneralInfoStep from './GeneralInfoStep';
import StepFooter from './StepFooter';
import { RegisterDataType } from 'store/auth/types';
//import { register } from 'store/auth/api';
import tokenService from 'utils/tokenService';

const stepMapping = {
  1: {
    title: 'Credenciales',
    position: 1,
  },
  2: {
    title: 'Información General',
    position: 2,
  },
};

function hasWhiteSpace(s: string) {
  return s.indexOf(' ') >= 0;
}

interface Props {
  token?: string;
}
const RegisterModal = ({ token }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [telephone, setTelephone] = useState('');
  const [contact, setContact] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [rut, setRut] = useState('');
  const [info, setInfo] = useState('');
  const [logo, setLogo] = useState('');

  const isStep1Valid =
    username !== '' &&
    !hasWhiteSpace(username) &&
    password !== '' &&
    !hasWhiteSpace(password) &&
    password === repeatPassword;

  const isStep2Valid =
    telephone !== '' &&
    contact !== '' &&
    businessName !== '' &&
    rut !== '' &&
    info !== '' &&
    logo !== '';
  const [wasSended, setWasSended] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const clearRegister = () => {
    setWasSended(true);
    tokenService.removeLocalTokens();
  };

  const navigate = useNavigate();

  const nextStep = () => {
    if (!stepMapping[currentStep + 1]) {
      const newUser: RegisterDataType = {
        username: username,
        phone: telephone,
        email: 'EmailQueVienePorCorreo',
        info: info,
        logo: logo,
        rut: rut,
        address: 'address',
        contact: contact,
        businessName: businessName,
      };
      //tokenService.setLocalTokens(token, token);
      //register(newUser).then(clearRegister);
      console.log(newUser);
      clearRegister();
    }
    setCurrentStep(currentStep + 1);
  };
  return (
    <StStepsModal>
      <form></form>
      {wasSended ? (
        <FlexColumn alignItems="center" gap={10}>
          <Title text="Usuario creado con éxito." />
          <CircleCheckIcon size={240} />
          <span> Ya puedes cerrar esta página.</span>
          <Button
            action="link"
            text="Ir al login"
            onClick={() => navigate('/login')}
          />
        </FlexColumn>
      ) : (
        <RegisterContent>
          <FlexColumn gap={12}>
            {currentStep > 1 && (
              <GoBackContainer onClick={() => setCurrentStep(currentStep - 1)}>
                <GoBackIcon color={COLORS.textGeneral2} size={16} />
              </GoBackContainer>
            )}

            <FlexColumn gap={0}>
              <span style={{ color: COLORS.textGeneral2 }}>
                Registro de usuario
              </span>
              <h2>{stepMapping[currentStep].title}</h2>
            </FlexColumn>
            {currentStep === 1 && (
              <CredentialsStep
                user={username}
                setUser={setUsername}
                password={password}
                setPassword={setPassword}
                repeatPassword={repeatPassword}
                setRepeatPassword={setRepeatPassword}
              />
            )}
            {currentStep === 2 && (
              <GeneralInfoStep
                telephone={telephone}
                setTelephone={setTelephone}
                contact={contact}
                setContact={setContact}
                businessName={businessName}
                setBusinessName={setBusinessName}
                rut={rut}
                setRut={setRut}
                info={info}
                setInfo={setInfo}
                logo={logo}
                setLogo={setLogo}
                email={'test@deres.org.uy'}
                role={'PROVIDER'}
              />
            )}
          </FlexColumn>
          <FlexColumn alignItems="center" gap={12} style={{ width: '100%' }}>
            <Button
              action="primary"
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid)
              }
              onClick={nextStep}
              text="Continuar"
            />
            <StepFooter stepsQty={2} currentStep={currentStep} />
          </FlexColumn>
        </RegisterContent>
      )}
    </StStepsModal>
  );
};

export default RegisterModal;
