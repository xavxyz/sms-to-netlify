import { createGlobalStyle, keyframes } from 'styled-components';

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

export const floatTo = keyframes`
  to {
    transform: translateY(1rem);
  }
`;

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Apercu;
    font-style: normal;
    font-weight: 400;
    src: url(static/apercu.ttf);
  }

  body {
    margin: 0;
    background-color: #000;
    font-family: Apercu, sans-serif;

  }
`;
