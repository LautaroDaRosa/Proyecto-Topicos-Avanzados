import styled from 'styled-components';

const StLogin = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  height: 100%;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
  }

  input {
    height: 40px;
    border-radius: 8px;
    border: 1px solid lightgray;
    margin-top: 8px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export default StLogin;
