import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const NFUltraText = styled(motion.span)`
  font-family: 'NF Ultra', sans-serif;
  color: #1404FB;
  font-size: 2rem;
  font-weight: 700;
  font-stretch: expanded;
  white-space: nowrap;
  text-align: center;
  max-width: 90vw;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`

export const AnimatedChar = styled.span<{ $isVisible: boolean }>`
  display: inline-block;
  opacity: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1404FB; // Change color to blue to match NFUltraText
  transition: opacity 0.5s, transform 0.5s;
  ${props => props.$isVisible && css`
    opacity: 1;
    transform: translate(0, 0);
  `}
  margin-right: -0.05em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;


export const Text = styled(motion.h1)`
  color: white;
  font-family: 'NF Ultra', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  font-stretch: expanded;
  position: relative;
  z-index: 1001;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`

export const BlueScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  box-sizing: border-box;
  padding: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }

  @media (max-width: 480px) {
    font-size: 0.6em;
  }
`