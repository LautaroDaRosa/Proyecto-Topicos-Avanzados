import { roleColorMapper } from 'utils/colors';
import FlexColumn from './styles/FlexColumn';
import Input from './styles/Input';
import StRole from 'app/components/UserProfile/StRole';
import { roleMapper } from 'utils/roleMapper';
import GeneralInfoTwoColumns from './styles/GeneralInfoTwoColumns';

interface Props {
  email: string;
  role: string;
  telephone: string;
  setTelephone: (s: string) => void;
  contact: string;
  setContact: (s: string) => void;
  businessName: string;
  setBusinessName: (s: string) => void;
  rut: string;
  setRut: (s: string) => void;
  info: string;
  setInfo: (s: string) => void;
  logo: string;
  setLogo: (s: string) => void;
}
const GeneralInfoStep = ({
  email,
  role,
  telephone,
  setTelephone,
  contact,
  setContact,
  businessName,
  setBusinessName,
  rut,
  setRut,
  info,
  setInfo,
  logo,
  setLogo,
}: Props) => {
  function containsOnlyDigits(inputString: string) {
    const regex = /^[0-9]+$/;
    return regex.test(inputString) || inputString === '';
  }

  return (
    <FlexColumn gap={12}>
      <GeneralInfoTwoColumns>
        <FlexColumn gap={12}>
          <FlexColumn>
            <span>Email</span>
            <Input value={email} disabled={true} />
          </FlexColumn>
          <FlexColumn>
            <span>Telefono</span>
            <Input
              value={telephone}
              onChange={e =>
                containsOnlyDigits(e.target.value)
                  ? setTelephone(e.target.value)
                  : undefined
              }
            />
          </FlexColumn>
          <FlexColumn>
            <span>Razón Social</span>
            <Input
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
            />
          </FlexColumn>
        </FlexColumn>
        <FlexColumn gap={12}>
          <FlexColumn style={{ marginBottom: 9 }}>
            <span>Rol</span>
            <StRole
              color={roleColorMapper[role].text}
              background={roleColorMapper[role].background}
            >
              <span>{roleMapper[role]}</span>
            </StRole>
          </FlexColumn>
          <FlexColumn>
            <span>Contacto</span>
            <Input value={contact} onChange={e => setContact(e.target.value)} />
          </FlexColumn>
          <FlexColumn>
            <span>RUT</span>
            <Input
              value={rut}
              onChange={e =>
                containsOnlyDigits(e.target.value)
                  ? setRut(e.target.value)
                  : undefined
              }
            />
          </FlexColumn>
        </FlexColumn>
      </GeneralInfoTwoColumns>
      <FlexColumn>
        <span>Descripción</span>
        <Input value={info} onChange={e => setInfo(e.target.value)} />
      </FlexColumn>
      <FlexColumn>
        <span>Logo</span>
        <Input
          value={logo}
          onChange={e => setLogo(e.target.value)}
          placeholder="Ingrese la URL de la imagen"
        />
      </FlexColumn>
    </FlexColumn>
  );
};

export default GeneralInfoStep;
