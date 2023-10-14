import styled from 'styled-components';
import { media } from 'styles/media';

const StDetails = styled.div`
  gap: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.medium} {
    align-items: center;
  }

  ${media.large} {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
`;

export default StDetails;
