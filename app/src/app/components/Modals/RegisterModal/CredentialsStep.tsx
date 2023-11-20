import FlexColumn from './styles/FlexColumn';
import Input from './styles/Input';

interface Props {
  user: string;
  setUser: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
  repeatPassword: string;
  setRepeatPassword: (s: string) => void;
}
const CredentialsStep = ({
  user,
  setUser,
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
}: Props) => {
  return (
    <FlexColumn gap={12}>
      <FlexColumn>
        <span>Usuario</span>
        <Input value={user} onChange={e => setUser(e.target.value)} />
      </FlexColumn>
      <FlexColumn>
        <span>Contraseña</span>
        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </FlexColumn>
      <FlexColumn>
        <span>Repetir contraseña</span>
        <Input
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
          type="password"
        />
      </FlexColumn>
    </FlexColumn>
  );
};

export default CredentialsStep;
