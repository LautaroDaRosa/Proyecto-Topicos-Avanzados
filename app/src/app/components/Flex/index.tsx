import styled from 'styled-components';

interface FlexProps {
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'start'
    | 'self-start'
    | 'flex-end'
    | 'end'
    | 'self-end'
    | 'center';
  gap?: number;
  width?: number;
}

const StFlex = styled.div<{
  flexProps: FlexProps;
}>`
  display: flex;
  flex-direction: ${props => props.flexProps.flexDirection};
  justify-content: ${props => props.flexProps.justifyContent};
  align-items: ${props => props.flexProps.alignItems};
  gap: ${props => props.flexProps.gap}px;
  width: ${props => props.flexProps.width}%;
`;

export default StFlex;
