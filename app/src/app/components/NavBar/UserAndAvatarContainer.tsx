import styled from 'styled-components';

const UserAndAvatarContainer = styled.div`
  display: flex;
  position: relative;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;
  :hover {
    background-color: #f1f1f5;
  }
`;

export default UserAndAvatarContainer;
