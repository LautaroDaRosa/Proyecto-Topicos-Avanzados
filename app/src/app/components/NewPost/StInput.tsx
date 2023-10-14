import styled from 'styled-components';

const StInput = styled.input`
  width: 100%;
  display: flex;
  padding: 16px;
  align-items: flex-end;
  gap: 8px;
  align-self: stretch;
  border: none;
  border-radius: 8px;
  background: var(--greyscale-colors-grey-6, #F2F2F4);
  box-sizing: border-box;
  color: #424065;
  transition: border 0.2s ease;
  border: 1px solid;
  border-color: #f2f2f4;


  :hover {
    border-color: #424065; 
  }

  :focus {
    outline: none;
    border-color: #f2f2f4;
  }
    
}
`;

export default StInput;
