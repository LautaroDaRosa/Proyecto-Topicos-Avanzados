import styled from 'styled-components';

const StFilterBar = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 0px 20px 0px lightgrey;
  width: 100%;
  display: flex;
  justify-content: space-between;

  input {
    height: 40px;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding-left: 12px;
    padding-right: 12px;
  }

  select {
    height: 40px;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding-left: 12px;
    padding-right: 12px;
    cursor: pointer;
  }

  option {
    font-weight: normal;
    cursor: pointer;
    text-align: center;
  }

  option:checked {
    font-weight: bold;
    cursor: pointer;
    background-color: white;
  }

  button {
    height: 40px;
  }
`;

export default StFilterBar;
