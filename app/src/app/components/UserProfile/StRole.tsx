import styled from 'styled-components';

interface RoleProps {
  background: string;
  color: string;
}

const StRole = styled.div<RoleProps>`
  display: flex;
  padding: 0px 8px;
  border-radius: 8px;

  color: ${props => props.color};
  background: ${props => props.background};
`;

export default StRole;
