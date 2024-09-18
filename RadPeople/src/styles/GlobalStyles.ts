import { createGlobalStyle } from 'styled-components';
import NFUltraRegular from '../assets/NFUltra-Regular.otf';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'NF Ultra';
    src: url(${NFUltraRegular}) format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  body {
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
  }

  .nf-ultra-text {
    font-family: 'NF Ultra', sans-serif;
  }
`;

export default GlobalStyles;