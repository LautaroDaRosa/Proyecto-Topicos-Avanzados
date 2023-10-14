import styled, { css } from 'styled-components';
import { media } from 'styles/media';

const StPostContainer = styled.div<{ hasPosts: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  ${props =>
    !props.hasPosts &&
    css`
    gap: 24px:

    ${media.medium} {
      gap: 48px;
    }
  
    ${media.large} {
      gap: 60px;
    }
  `}
`;

export default StPostContainer;
