// @flow
import styled from 'styled-components';
import { type ComponentType } from 'react';

type Props = {
  top?: number,
  left?: number,
  bottom?: number,
  right?: number,
};

const AbsolutePositioner: ComponentType<Props> = styled.div`
  position: absolute;
  ${props => props.top && `top: ${props.top}rem;`}
  ${props => props.left && `left: ${props.left}rem;`}
  ${props => props.bottom && `bottom: ${props.bottom}rem;`}
  ${props => props.right && `right: ${props.right}rem;`}
`;

export default AbsolutePositioner;
