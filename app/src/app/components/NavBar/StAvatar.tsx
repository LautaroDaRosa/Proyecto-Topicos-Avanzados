import styled from 'styled-components';

const StAvatar = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  border: 1px solid #c0bfcb;
  overflow: hidden;
  justify-content: center;
  background-color: white;
  align-items: center;
  img {
    object-fit: cover;
    width: 100%;
  }
`;

export default StAvatar;
