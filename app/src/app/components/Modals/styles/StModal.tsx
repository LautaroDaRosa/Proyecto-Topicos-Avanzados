import styled from 'styled-components';

const StModal = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 10;
  background: white;
  box-shadow: 0px 0px 20px 0px lightgrey;
  border-radius: 8px;
  padding: 32px;
  box-sizing: border-box;
  top: 45%;
  left: 50%;
  transform: translate(-50%, 0%);
  button {
    width: 200px;
  }
`;

export default StModal;
