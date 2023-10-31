import React from 'react';
import StUserInfo from './StUserInfo';
import StInfoLine from '../UserProfile/InfoLine';
import StField from '../UserProfile/StField';
import StCategoriesContainer from './StCategoriesContainer';
import StCategory from './StCategory';

interface UserInfoProps {
  businessName: string;
  rut: string;
  contact: string;
  address: string;
  categories: string[];
}

const UserInfo = ({
  businessName,
  rut,
  contact,
  address,
  categories,
}: UserInfoProps) => {
  return (
    <StUserInfo>
      <StInfoLine>
        <StField>
          <strong>Razón Social:</strong>
          <span>{businessName}</span>
        </StField>
        <StField>
          <strong>RUT:</strong>
          <span>{rut}</span>
        </StField>
      </StInfoLine>
      <StInfoLine>
        <StField>
          <strong>Contacto:</strong>
          <span>{contact}</span>
        </StField>
        <StField>
          <strong>Dirección:</strong>
          <span>{address}</span>
        </StField>
      </StInfoLine>
      <StField>
        <strong>Categorías:</strong>
        {categories && (
          <StCategoriesContainer>
            {categories.map(cat => (
              <StCategory key={cat}>
                <span>{cat}</span>
              </StCategory>
            ))}
          </StCategoriesContainer>
        )}
      </StField>
    </StUserInfo>
  );
};
export default UserInfo;
