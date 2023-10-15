import styled from 'styled-components';
import { media } from 'styles/media';

const StProvidersGrid = styled.div`
  display: grid;
  width: 100%;
  gap: 16px;

  grid-template-columns: 1fr;

  ${media.medium} {
    grid-template-columns: 1fr 1fr 1fr;'
  }`;

export default StProvidersGrid;
