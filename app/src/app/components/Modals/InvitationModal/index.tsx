import { LeftRightIcon } from 'resources/icons/left-right-icon';
import StModal from '../styles/StModal';
import { COLORS } from 'utils/colors';
import IconsContainer from './styles/IconsContainer';
import FlexColumn from './styles/FlexColumn';
import Input from './styles/Input';
import { useState } from 'react';
import ConditionRow from './styles/ConditionRow';
import { CheckIcon } from 'resources/icons/check-icon';
import Button from 'app/components/Button';
//import { respondInvitation } from 'store/invitation/api';
import { CircleCheckIcon } from 'resources/icons/circle-check-icon';
import tokenService from 'utils/tokenService';
import Title from 'app/components/Title';
import { useNavigate } from 'react-router-dom';

const conditions = [
  'Acceda a todos sus datos de usuario',
  'Acceda a sus scores ambiental, social y de gobernanza',
  'Acceda a todos sus datos de proveedor',
];

export const decisionMapper = {
  ACEPTAR: 'ACCEPTED',
  RECHAZAR: 'REJECTED',
};

interface Props {
  token?: string;
}
const InvitationModal = ({ token }: Props) => {
  const [decision, setDecision] = useState('');
  const [wasSended, setWasSended] = useState(false);
  const invitation = {
    partnerName: 'McDonalds',
    partnerLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/McDonald%27s_SVG_logo.svg/1047px-McDonald%27s_SVG_logo.svg.png',
    providerLogo:
      'https://dsof32ggjkwpf.cloudfront.net/wp-content/uploads/2022/08/10165301/McCain-logo.png',
  };

  const clearInvitation = () => {
    setWasSended(true);
    tokenService.removeLocalTokens();
  };

  const navigate = useNavigate();

  /*
    const takeDecision = () => {
      async function respondInv() {
        tokenService.setLocalTokens(token, token);
        await respondInvitation(decisionMapper[decision]);
      }
      respondInv().then(clearInvitation);
    };
  */

  const takeFakeDecision = () => {
    clearInvitation();
  };

  return (
    <StModal>
      {wasSended ? (
        <FlexColumn alignItems="center" gap={10}>
          <Title text="¡Muchas gracias!" />
          <CircleCheckIcon size={240} />
          <span>Tu respuesta ha sido procedada con éxito.</span>
          <span> Ya puedes cerrar esta página.</span>
          <Button
            action="link"
            text="Ir al login"
            onClick={() => navigate('/login')}
          />
        </FlexColumn>
      ) : (
        <FlexColumn gap={36}>
          <FlexColumn gap={12}>
            <IconsContainer>
              <img src={invitation.partnerLogo} alt="Partner Logo"></img>
              <LeftRightIcon size={26} color={COLORS.textGeneral2} />
              <img src={invitation.providerLogo} alt="Provider Logo"></img>
            </IconsContainer>
            <span>
              <strong>{invitation.partnerName}</strong> ha solicitado que formes
              parte de su grupo de proveedores.
            </span>
          </FlexColumn>
          <FlexColumn gap={2}>
            <span>Ingrese su respuesta</span>
            <Input
              placeholder="'ACEPTAR' o 'RECHAZAR'"
              value={decision}
              onChange={e => setDecision(e.target.value)}
            />
          </FlexColumn>
          <FlexColumn gap={4}>
            <span>Si aceptas, estas permitiendo que el socio:</span>
            <FlexColumn style={{ fontSize: 14, color: COLORS.textGeneral2 }}>
              {conditions.map(cond => (
                <ConditionRow key={cond}>
                  <CheckIcon size={14} color={COLORS.textGeneral2} />
                  <span>{cond}</span>
                </ConditionRow>
              ))}
            </FlexColumn>
          </FlexColumn>
          <FlexColumn alignItems="center" gap={10}>
            <span style={{ fontSize: 10, color: COLORS.textGeneral2 }}>
              Al continuar, afirmo haber leído y acepto los{' '}
              <strong>Términos y Condiciones</strong> establecidos por DERES.
            </span>
            <Button
              action="primary"
              disabled={!['ACEPTAR', 'RECHAZAR'].includes(decision)}
              onClick={takeFakeDecision}
              text="Tomar decisión"
            />
          </FlexColumn>
        </FlexColumn>
      )}
    </StModal>
  );
};

export default InvitationModal;
