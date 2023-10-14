import styled from 'styled-components';
import { media } from 'styles/media';

const StGrid = styled.div<{ featured: boolean }>`
  display: grid;
  width: 100%;
  gap: 10px;

  grid-template-columns: 1fr;

  ${media.medium} {
    ${props =>
      props.featured
        ? 'grid-template-columns: 1fr 1fr;'
        : ' grid-template-columns: 1fr 1fr 1fr;'}
  }
`;

export default StGrid;
