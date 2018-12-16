// @flow
import styled, { css } from 'styled-components';
import { type ComponentType } from 'react';
import { floatTo, fadeIn } from './_styles';

type Props = {
  delay?: number,
};

/* prettier-ignore */
const Floater: ComponentType<Props> = styled.div`
  animation: ${floatTo} 3s ease-in-out infinite ${props => props.delay || 0}s both alternate-reverse;
`;

export default Floater;
