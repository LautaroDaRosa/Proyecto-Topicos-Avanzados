import styled from 'styled-components';

interface Props {
  gap?: number;
  alignItems?: string;
}
const FlexColumn = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || '0'}px;
  align-items: ${props => props.alignItems || 'start'};
  width: 100%;
  h4 {
    width: 100%;
    text-align: center;
  }
`;

export default FlexColumn;
