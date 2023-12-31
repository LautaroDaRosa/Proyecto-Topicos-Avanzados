import styled from 'styled-components';

const StModal = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  z-index: 10;
  background: white;
  box-shadow: 0px 0px 20px 0px lightgrey;
  border-radius: 8px;
  padding: 32px 48px;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  button {
    width: 200px;
  }
`;

export default StModal;
