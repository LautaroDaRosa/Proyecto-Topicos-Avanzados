import styled from 'styled-components';
import { media } from 'styles/media';

const StBackgroundImage = styled.img`
  display: none;

  ${media.large} {
    display: flex;
    z-index: 2;
    postion: absolute;
    width: 52%;
    right: 0;
    top: 0;
  }
`;

export default StBackgroundImage;
