import styled from 'styled-components';

interface Props {
  color: string;
}

const StScoreText = styled.span<Props>`
  display: flex;
  position: absolute;
  font-size: 24px;
  font-weight: 400;
  color: ${props => props.color};
`;

export default StScoreText;
