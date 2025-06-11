import { createGlobalStyle } from 'styled-components';
import NFUltraRegular from '../assets/NFUltra-Regular.otf';
import HelveticaNeueLTCom77BoldCondensed from '../assets/Helvetica Neue LT Com 77 Bold Condensed.ttf';
import SequelSans from '../assets/sequel-sans-black-display.ttf'
import SequelSansLightDisp from '../assets/Sequel Sans Book Body.ttf';
import MotoyaExCedar from '../assets/MotoyaExCedar W55 W7 KP.ttf'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'NF Ultra';
    src: url(${NFUltraRegular}) format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Helvetica Neue LT Com';
    src: url(${HelveticaNeueLTCom77BoldCondensed}) format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'MotoyaExCedar';
    src: url(${MotoyaExCedar}) format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Sequel Sans';
    src: url(${SequelSans}) format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Sequel Sans Regular';
    src: url(${SequelSansLightDisp}) format('truetype');
    font-weight: bold;  /* Light weight */
    font-style: normal;
    font-display: block;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    color: white;
    padding-top: 40px; // Adjust this value based on your navbar height
  }

  .nf-ultra-text {
    font-family: 'NF Ultra', sans-serif;
  }

  .helvetica-neue-text {
    font-family: 'Helvetica Neue LT Com', sans-serif;
    font-weight: bold;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #A9A9A9;
    border-radius: 6px;
    border: 3px solid white;
  }

  /* For Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #A9A9A9 white;
  }


  /* Hide scrollbars for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbars for Firefox */
  * {
    scrollbar-width: none;
  }

  /* Hide scrollbars for IE and Edge */
  * {
    -ms-overflow-style: none;
  }

  /* Ensure body and html can still scroll */
  html, body {
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

export default GlobalStyles;