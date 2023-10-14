import styled, { css } from 'styled-components';
import { media } from 'styles/media';

const StTextContainer = styled.div<{ justify: 'left' | 'right' }>`
  display: flex;
  box-shadow: none;
  padding: 0px;
  align-items: center;
  margin: 0px;
  flex-direction: column;

  h2 {
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
    margin: 0px;
  }

  ${props =>
    props.justify === 'left' &&
    css`
      ${media.large} {
        align-items: flex-start;
        gap: 10px;
      }
    `}

  ${props =>
    props.justify === 'right' &&
    css`
      ${media.large} {
        align-items: flex-end;
        gap: 10px;
      }
    `}
`;

export default StTextContainer;
