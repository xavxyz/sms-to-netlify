// @flow
import styled from 'styled-components';
import { fadeIn } from './_styles';

const Background = styled.div`
  position: fixed;
  background-image: url(static/top-right.svg), url(static/bottom-left.svg);
  background-position-x: right, left;
  background-position-y: top, bottom;
  background-repeat: no-repeat;
  background-size: 50%, 50%;
  width: 100vw;
  height: 100vh;
  transition: background-size 0.6s ease-out;
  min-height: 600px;

  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;

  @media (max-width: 768px) {
    background-size: 100%, 100%;
  }
`;

export default Background;
