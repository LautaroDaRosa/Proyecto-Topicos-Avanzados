import styled from 'styled-components';

interface Props {
  gap?: number;
  alignItems?: string;
}
const FlexColumn = styled.div<Props>`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: ${props => props.gap || '0'}px;
  align-items: ${props => props.alignItems || 'start'};
  width: 100%;

  h2 {
    margin: 0;
  }
`;

export default FlexColumn;
