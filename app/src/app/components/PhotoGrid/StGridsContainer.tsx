import styled from 'styled-components';
import { media } from 'styles/media';

const StGridsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  flex: 1;
  padding: 88px 16px;

  ${media.medium} {
    padding: 94px 24px;
  }

  ${media.large} {
    padding: 156px 156px 84px 156px;
  }
`;

export default StGridsContainer;
