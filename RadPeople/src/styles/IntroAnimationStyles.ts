import styled, { keyframes, css } from 'styled-components'
import { motion } from 'framer-motion'
import NFUltraRegular from '../assets/NFUltra-Regular.otf'

export const NFUltraText = styled(motion.span)`
  @font-face {
    font-family: 'NF Ultra';
    src: url(${NFUltraRegular}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'NF Ultra', sans-serif;
  color: white;
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

export const diagonalAppear = keyframes`
  0% {
    opacity: 0;
    transform: translate(-10px, 10px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`

export const diagonalDisappear = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-10px, 10px);
  }
`

export const AnimatedChar = styled.span<{ $isVisible: boolean; $isDisappearing: boolean }>`
  display: inline-block;
  opacity: 0;
  ${props => props.$isVisible && css`
    animation: ${diagonalAppear} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  `}
  ${props => props.$isDisappearing && css`
    animation: ${diagonalDisappear} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  `}
  margin-right: -0.05em;
`

/**
 export const AnimatedChar = styled.span<{ $isVisible: boolean; $isDisappearing: boolean }>`
   display: inline-block;
   opacity: 0;
   font-size: 2rem;
   font-weight: 700;
   color: white;
   ${props => props.$isVisible && css`
     animation: ${diagonalAppear} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
   `}
   ${props => props.$isDisappearing && css`
     animation: ${diagonalDisappear} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
   `}
   margin-right: -0.05em;
 
   @media (max-width: 768px) {
     font-size: 1.5rem;
   }
 
   @media (max-width: 480px) {
     font-size: 1.2rem;
   }
 `
 */

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
  background-color: #1404FB;
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