import React from 'react';
import StProfile from './StProfile';
import StLogoContainer from './StLogoContainer';
import StProfileInfo from './StProfileInfo';
import StInfoLine from './InfoLine';
import StField from './StField';
import StDescription from './StDescriptionContainer';
import StRole from './StRole';
import { roleMapper } from 'utils/roleMapper';
import { roleColorMapper } from 'utils/colors';

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
