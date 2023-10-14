import styled from 'styled-components';

const StPusblisher = styled.div`
  display: flex;
  gap: 10px;

  div {
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default StPusblisher;
