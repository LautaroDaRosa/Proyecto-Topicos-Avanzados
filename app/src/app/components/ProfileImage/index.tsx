import styled from 'styled-components';

const StProfileImage = styled.img<{
  type: 'profile' | 'post-publisher';
}>`
  display: flex;
  object-fit: cover;
  ${props =>
    props.type === 'profile' &&
    `
      height: 122px;
      width: 122px;
      border-radius: 350px;
    `}

  ${props =>
    props.type === 'post-publisher' &&
    `
      height: 48px;
      width: 48px;
      border-radius: 50%;
    `}
`;

export default StProfileImage;
