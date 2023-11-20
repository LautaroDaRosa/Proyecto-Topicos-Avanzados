import styled from 'styled-components';
import { COLORS } from 'utils/colors';

interface Props {
  active?: boolean;
}
const StepDot = styled.div<Props>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${props =>
    props.active ? COLORS.deresPrimary : COLORS.textGeneral2};
`;

export default StepDot;
