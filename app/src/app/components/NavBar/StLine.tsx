import styled from 'styled-components';
import { media } from 'styles/media';

const StLine = styled.div`
  background: #c0bfcb;
  width: 1px;
  height: 24px;
  border-radius: 1px;
  display: none;

  ${media.large} {
    display: flex;
  }
`;

export default StLine;
