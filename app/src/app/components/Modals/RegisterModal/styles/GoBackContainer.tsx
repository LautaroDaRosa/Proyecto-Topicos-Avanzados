import styled from 'styled-components';

interface Props {
  gap?: number;
  alignItems?: string;
}
const GoBackContainer = styled.div<Props>`
  display: flex;
  position: absolute;
  left: -24px;
  top: -10px;
  z-index: 10;

  :hover {
    cursor: pointer;
  }
`;

export default GoBackContainer;
