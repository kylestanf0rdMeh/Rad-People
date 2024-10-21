import React from 'react';
import { GalleryItem } from '../models/Gallery.model';
import { FiX } from 'react-icons/fi';
import {
  OverlayContainer,
  ImageGrid,
  ImageWrapper,
  Image,
  CloseButton
} from '../styles/GalleryOverlayStyles';

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
          <ImageWrapper 
            key={image.sys.id} 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event from bubbling up
              onImageClick(index);
            }}
          >
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