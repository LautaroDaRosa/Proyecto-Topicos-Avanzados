import styled from 'styled-components';
import { media } from 'styles/media';

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  padding-top: 64px;
  flex: 1;

  ${media.medium} {
    padding: 24px;
  }

  ${media.large} {
    padding: 60px;
  }
`;

export default StProfileContainer;
