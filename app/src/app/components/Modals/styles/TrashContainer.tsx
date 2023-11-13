import styled from 'styled-components';

interface Props {
  isDeletable: boolean;
}

const TrashContainer = styled.div<Props>`
  :hover {
    cursor: ${props => (props.isDeletable ? 'pointer' : 'not-allowed')};
  }

  opacity: ${props => (!props.isDeletable ? '0.5' : '1')};
`;

export default TrashContainer;
