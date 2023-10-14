import styled, { css } from 'styled-components';
import { media } from 'styles/media';

const StBall = styled.img<{ color: string; type: string }>`
  position: ${props => (props.type === 'home-ball' ? 'fixed' : 'absolute')};
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  z-index: -1;

  ${props =>
    props.type === 'home-ball' &&
    css`
      display: none;

      ${media.large} {
        display: flex;
        right: 81px;
        top: 408px;
      }
    `}

  ${props =>
    props.type === 'profile-ball' &&
    props.color === 'white' &&
    css`
      right: 5px;
      top: -50px;

      ${media.medium} {
        bottom: -35px;
        right: 20px;
        top: auto;
      }

      ${media.large} {
        bottom: -24px;
        left: -60px;
      }
    `}

  ${props =>
    props.type === 'profile-ball' &&
    props.color === 'blue' &&
    css`
      right: 32px;
      bottom: -32px;

      ${media.medium} {
        left: 20px;
        top: -25px;
      }
      ${media.large} {
        left: auto;
        top: -15px;
        right: -55px;
      }
    `}
`;

export default StBall;
