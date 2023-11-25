import styled from 'styled-components';

const StStepsModal = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 10;
  background: white;
  box-shadow: 0px 0px 20px 0px lightgrey;
  border-radius: 8px;
  padding: 64px 64px 36px;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  button {
    width: 200px;
  }
`;

export default StStepsModal;
