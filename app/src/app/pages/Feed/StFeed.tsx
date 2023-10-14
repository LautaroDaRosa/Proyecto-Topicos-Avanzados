import styled from 'styled-components';
import { media } from 'styles/media';

const StFeed = styled.div`
  flex-basis: 50%;
  flex: 1;
  margin: 16px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 72px;

  ${media.medium} {
    margin: 24px;
  }

  ${media.large} {
    margin: 30px;
    padding: 0;
  }
`;

export default StFeed;
