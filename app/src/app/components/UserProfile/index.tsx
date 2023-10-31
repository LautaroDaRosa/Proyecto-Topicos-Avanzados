import React from 'react';
import StProfile from './StProfile';
import StLogoContainer from './StLogoContainer';
import StProfileInfo from './StProfileInfo';
import StInfoLine from './InfoLine';
import StField from './StField';
import StDescription from './StDescriptionContainer';
import StRole from './StRole';
import { roleMapper } from 'utils/roleMapper';

interface UserProfileProps {
  logo: string;
  name: string;
  role: string;
  email: string;
  telephone: string;
  description: string;
}

const UserProfile = ({
  logo,
  name,
  role,
  email,
  telephone,
  description,
}: UserProfileProps) => {
  const roleColorMapper = {
    PROVIDER: {
      text: '#008744',
      background: '#18e881',
    },
    PARTNER: {
      text: '#0057e7',
      background: '#669bf2',
    },
    ADMIN: {
      text: '#d62d20',
      background: '#f88d85',
    },
  };
  return (
    <StProfile>
      <StLogoContainer>
        <img src={logo} alt="Profile logo" />
      </StLogoContainer>
      <StProfileInfo>
        <StInfoLine>
          <StField>
            <strong>{'Nombre:  '}</strong>
            <span>{name}</span>
          </StField>
          <StRole
            color={roleColorMapper[role].text}
            background={roleColorMapper[role].background}
          >
            <span>{roleMapper[role]}</span>
          </StRole>
        </StInfoLine>
        <StInfoLine>
          <StField>
            <strong>{'Email:'}</strong>
            <span>{email}</span>
          </StField>
          <StField>
            <strong>{'Telefono:'}</strong>
            <span>{telephone}</span>
          </StField>
        </StInfoLine>

        <StDescription>
          <strong>{'Descripcion:'}</strong>
          <span>{description}</span>
        </StDescription>
      </StProfileInfo>
    </StProfile>
  );
};
export default UserProfile;
