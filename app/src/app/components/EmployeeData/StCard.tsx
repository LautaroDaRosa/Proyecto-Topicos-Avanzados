import styled from 'styled-components';
import { media } from 'styles/media';

const StCard = styled.div`
  display: flex;
  border-radius: 20px;
  border: 1px solid var(--greyscale-colors-white, #fff);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  padding: 20px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 2;

  ${media.medium} {
    gap: 15px;
  }

  ${media.large} {
    flex-direction: row;
    padding: 40px;
    gap: 25px;
  }
`;

export default StCard;
