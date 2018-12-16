// @flow
import styled from 'styled-components';
import { type ComponentType } from 'react';

type Props = {
  invert?: boolean,
  by?: number,
};

const getSize = size => ({ by = 1 }) => by * size;

const Dot: ComponentType<Props> = styled.div`
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(-90deg, #05f, #000);

  width: ${getSize(4)}vmax;
  height: ${getSize(4)}vmax;

  min-width: ${getSize(42)}px;
  min-height: ${getSize(42)}px;

  ${props => props.invert && 'transform: scale(-1);'}
`;

export default Dot;
