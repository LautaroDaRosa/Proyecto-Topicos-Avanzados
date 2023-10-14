import styled from 'styled-components';
import { media } from 'styles/media';

const StCardAndPosts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;
  padding-bottom: 72px;

  ${media.large} {
    padding: 0 32px;
    gap: 28px;
  }
`;

export default StCardAndPosts;
