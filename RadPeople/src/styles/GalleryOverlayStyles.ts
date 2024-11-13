import styled from 'styled-components';
import { OverlayButton } from './GalleryStyles';

export const OverlayContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 40px; // Adjust this value to match your navbar height
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 999; // Reduced z-index to be below navbar
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
  border-top: 1px solid #000000; // Added border to match navbar
`;

export const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 25px; // Increased padding
  gap: 20px; // Increased gap between images

  @media (max-width: 768px) {
    padding: 15px;
    gap: 12px;
  }
`;

export const ImageWrapper = styled.div`
  height: 140px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 2px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 100px; // Decreased height for mobile devices
  }
`;

export const Image = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  border: 1px solid #000000; // Added border to match navbar
`;

export const CloseButton = styled(OverlayButton)`
  position: fixed;
  bottom: 15px;
  left: 15px;
  z-index: 1001;
  background-color: #0000FF;

  svg {
    stroke: white;
  }
`;