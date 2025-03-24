import styled from 'styled-components';
import { ControlBar, OverlayButton } from './GalleryStyles';
import { motion } from 'framer-motion';

export const OverlayContainer = styled(motion.div)<{ isOpen: boolean }>`
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  border-top: 1px solid #000000;
  flex-direction: column; // Keep this which is helping
`;

export const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 25px;
  padding-bottom: 250px; // Space for control bar on desktop
  column-gap: 20px;
  row-gap: 8px;
  
  @media (max-width: 768px) {
    padding: 15px;
    padding-bottom: 7vh; // Much larger padding to ensure no overlap
    column-gap: 12px;
    row-gap: 8px;
  }
`;

export const ImageWrapper = styled.div`
  height: 140px;
  flex-grow: 0;
  flex-shrink: 0;
  cursor: pointer;
  
  @media (max-width: 768px) {
    height: 100px;
  }
`;

export const Image = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  display: block; // Remove default inline spacing
  margin: 0;
  padding: 0;
  line-height: 0;
`;

// Update the CloseButton styling
export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  margin: 0; // Remove any margin
  color: black; // Explicitly set text color to black
  font-size: 12px;
  font-family: 'Sequel Sans Regular', sans-serif;
  text-transform: uppercase;
  
  svg {
    width: 24px; // Smaller icon size
    height: 24px;
    stroke: black;
    stroke-width: 1.5; // Slightly thicker for visibility
    fill: none;
  }

  &:focus {
    outline: none;
  }
`;

// Add the OverlayControlBar component
export const OverlayControlBar = styled(ControlBar)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1002;
`;

// Add the ImageCounter component
export const ImageCounter = styled.span`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  color: black;
  margin-right: 15px;
`;