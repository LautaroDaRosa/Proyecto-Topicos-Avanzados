import styled from 'styled-components';

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  select {
    border-radius: 8px;
    border: 1px solid lightgray;
    padding-left: 4px;
    padding-right: 4px;
    cursor: pointer;
  }
`;

export default RowContainer;
