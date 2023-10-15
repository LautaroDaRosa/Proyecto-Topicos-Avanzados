import styled from 'styled-components';

const StProviderGridCard = styled.div`
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 0px 20px 0px lightgrey;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  img {
    max-width: 180px;
    max-height: 140px;
    margin: 16px;
  }
`;

export default StProviderGridCard;
