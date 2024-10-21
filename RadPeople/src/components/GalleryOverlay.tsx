import React from 'react';
import styled from 'styled-components';
import { GalleryItem } from '../models/Gallery.model';
import { OverlayButton } from '../styles/GalleryStyles';
import { FiX } from 'react-icons/fi';

const OverlayContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 40px; // Adjust this value to match your navbar height
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 1000;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
//   HERE TO ADJUST WHITE-SPACE
  padding: 30px; // Increased padding
  gap: 20px; // Increased gap between images
`;

const ImageWrapper = styled.div`
// HERE TO INCREASE/DECREASE IMAGE MAX HEIGHT
  height: 140px; // Decreased maximum height
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 5px; // Increased bottom margin
`;

const Image = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
`;

const CloseButton = styled(OverlayButton)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1001;
  background-color: #0000FF;

  svg {
    stroke: white;
  }
`;

interface GalleryOverlayProps {
  isOpen: boolean;
  images: GalleryItem[];
  onClose: () => void;
  onImageClick: (index: number) => void;
}

const GalleryOverlay: React.FC<GalleryOverlayProps> = ({ isOpen, images, onClose, onImageClick }) => {
  return (
    <OverlayContainer isOpen={isOpen}>
      <ImageGrid>
        {images.map((image, index) => (
          <ImageWrapper key={image.sys.id} onClick={() => onImageClick(index)}>
            <Image src={`https:${image.fields.image.fields.file.url}`} alt={image.fields.descriptions || ''} />
          </ImageWrapper>
        ))}
      </ImageGrid>
      <CloseButton onClick={onClose}>
        <FiX />
      </CloseButton>
    </OverlayContainer>
  );
};

export default GalleryOverlay;